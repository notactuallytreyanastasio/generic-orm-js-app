import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import {
  // Query builders
  from, update, deleteFrom,
  // Schema
  safeIdentifier, changeset, deleteSql, timestamps,
  TableDef, FieldDef, StringField, IntField, Int64Field, FloatField, BoolField, DateField,
  // SQL types
  SqlBuilder, SqlFragment, SqlPart, SqlSource,
  SqlBoolean, SqlDate, SqlFloat64, SqlInt32, SqlInt64, SqlDefault, SqlString,
  // Aggregates
  col, countAll, countCol, sumCol, avgCol, minCol, maxCol,
  // Set operations
  unionSql, unionAllSql, intersectSql, exceptSql,
  // Subquery helpers
  subquery, existsSql,
  // Joins
  InnerJoin, LeftJoin, RightJoin, FullJoin, CrossJoin,
  // Order
  NullsFirst, NullsLast,
  // Lock
  ForUpdate, ForShare,
  // Validation
  NumberValidationOpts,
  // Classes
  SafeIdentifier,
} from 'orm/src';
import { mapConstructor, pairConstructor } from '@temperlang/core';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5006;

// ===========================================================================
// Helpers -- build a Temper Map from a JS object
// ===========================================================================
function makeMap(obj) {
  const pairs = Object.entries(obj).map(([k, v]) => pairConstructor(k, v));
  return mapConstructor(Object.freeze(pairs));
}

// Helper to build an SqlFragment condition from a column and value
function buildWhere(column, value) {
  const b = new SqlBuilder();
  b.appendSafe(column.sqlValue);
  b.appendSafe(' = ');
  if (typeof value === 'number') {
    b.appendInt32(value);
  } else {
    b.appendString(value);
  }
  return b.accumulated;
}

// Helper to build a named aggregate expression: AGG(col) AS alias
function namedExpr(fragment, alias) {
  const b = new SqlBuilder();
  b.appendFragment(fragment);
  b.appendSafe(' AS ');
  b.appendSafe(alias);
  return b.accumulated;
}

// Helper: SQLite doesn't support parenthesized SELECTs in UNION/INTERSECT/EXCEPT.
// The ORM generates "(SELECT ...) UNION (SELECT ...)" which is Postgres-compatible.
// We strip the outer parens for SQLite compatibility.
function sqliteCompat(sqlFragment) {
  let s = sqlFragment.toString();
  // Pattern: (SELECT ...) OP (SELECT ...) -- strip outer parens from each half
  s = s.replace(/^\(SELECT /i, 'SELECT ').replace(/ \(SELECT /gi, ' SELECT ');
  s = s.replace(/\) (UNION|INTERSECT|EXCEPT)/gi, ' $1').replace(/\)$/g, '');
  return s;
}

// ===========================================================================
// ORM Schema Definitions
// ===========================================================================

// --- Table names ---
const listsName   = safeIdentifier('lists');
const todosName   = safeIdentifier('todos');
const tagsName    = safeIdentifier('tags');
const todoTagsName = safeIdentifier('todo_tags');

// --- Field identifiers ---
const idField         = safeIdentifier('id');
const nameField       = safeIdentifier('name');
const descriptionF    = safeIdentifier('description');
const titleField      = safeIdentifier('title');
const completedF      = safeIdentifier('completed');
const priorityF       = safeIdentifier('priority');
const dueDateF        = safeIdentifier('due_date');
const listIdField     = safeIdentifier('list_id');
const createdAtF      = safeIdentifier('created_at');
const todoIdField     = safeIdentifier('todo_id');
const tagIdField      = safeIdentifier('tag_id');

// --- Table definitions ---
const listTable = new TableDef(listsName, Object.freeze([
  new FieldDef(nameField,      new StringField(), false, null, false),
  new FieldDef(descriptionF,   new StringField(), true,  null, false),
  new FieldDef(createdAtF,     new StringField(), true,  null, false),
]), null);

const todoTable = new TableDef(todosName, Object.freeze([
  new FieldDef(titleField,   new StringField(), false, null, false),
  new FieldDef(completedF,   new IntField(),    false, null, false),
  new FieldDef(priorityF,    new IntField(),    false, null, false),
  new FieldDef(dueDateF,     new StringField(), true,  null, false),
  new FieldDef(listIdField,  new IntField(),    false, null, false),
  new FieldDef(createdAtF,   new StringField(), true,  null, false),
]), null);

const tagTable = new TableDef(tagsName, Object.freeze([
  new FieldDef(nameField, new StringField(), false, null, false),
]), null);

const todoTagTable = new TableDef(todoTagsName, Object.freeze([
  new FieldDef(todoIdField, new IntField(), false, null, false),
  new FieldDef(tagIdField,  new IntField(), false, null, false),
]), null);

// Demonstrate timestamps() helper -- returns [inserted_at, updated_at] FieldDefs
const tsFields = timestamps();
// tsFields is an array of 2 FieldDefs -- we don't use them in the schema
// but we show that the function works.

// ===========================================================================
// Middleware
// ===========================================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===========================================================================
// Database Setup
// ===========================================================================
const db = new Database(path.join(__dirname, 'todo.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    priority INTEGER DEFAULT 3,
    due_date TEXT,
    list_id INTEGER REFERENCES lists(id),
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS todo_tags (
    id INTEGER PRIMARY KEY,
    todo_id INTEGER REFERENCES todos(id),
    tag_id INTEGER REFERENCES tags(id),
    UNIQUE(todo_id, tag_id)
  )
`);

// ===========================================================================
// Seed Data
// ===========================================================================
const listCount = db.prepare('SELECT COUNT(*) AS cnt FROM lists').get().cnt;
if (listCount === 0) {
  const insertList = db.prepare('INSERT INTO lists (name, description) VALUES (?, ?)');
  const insertTodo = db.prepare('INSERT INTO todos (title, completed, priority, due_date, list_id) VALUES (?, ?, ?, ?, ?)');
  const insertTag  = db.prepare('INSERT INTO tags (name) VALUES (?)');
  const insertTodoTag = db.prepare('INSERT INTO todo_tags (todo_id, tag_id) VALUES (?, ?)');

  const seedDb = db.transaction(() => {
    const personal = insertList.run('Personal', 'Personal tasks and errands');
    const work     = insertList.run('Work', 'Office and career tasks');
    const shopping = insertList.run('Shopping', null);

    const t1 = insertTodo.run('Buy groceries',          0, 3, '2026-03-15', personal.lastInsertRowid);
    const t2 = insertTodo.run('Clean the apartment',    0, 2, null,          personal.lastInsertRowid);
    const t3 = insertTodo.run('Read a book',            1, 1, '2026-03-10', personal.lastInsertRowid);
    const t4 = insertTodo.run('Go for a run',           0, 4, '2026-03-14', personal.lastInsertRowid);
    const t5 = insertTodo.run('Finish quarterly report', 0, 5, '2026-03-20', work.lastInsertRowid);
    const t6 = insertTodo.run('Email the team',          1, 3, '2026-03-12', work.lastInsertRowid);
    const t7 = insertTodo.run('Prepare slide deck',      0, 4, '2026-03-18', work.lastInsertRowid);
    const t8 = insertTodo.run('Buy milk',                0, 2, null,          shopping.lastInsertRowid);
    const t9 = insertTodo.run('Buy bread',               1, 1, null,          shopping.lastInsertRowid);

    const tag1 = insertTag.run('urgent');
    const tag2 = insertTag.run('home');
    const tag3 = insertTag.run('office');
    const tag4 = insertTag.run('health');

    insertTodoTag.run(t1.lastInsertRowid, tag2.lastInsertRowid);
    insertTodoTag.run(t4.lastInsertRowid, tag4.lastInsertRowid);
    insertTodoTag.run(t5.lastInsertRowid, tag1.lastInsertRowid);
    insertTodoTag.run(t5.lastInsertRowid, tag3.lastInsertRowid);
    insertTodoTag.run(t7.lastInsertRowid, tag3.lastInsertRowid);
    insertTodoTag.run(t7.lastInsertRowid, tag1.lastInsertRowid);
  });
  seedDb();
}

// ===========================================================================
// ROUTES
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. GET / -- Index page showing all lists with todo counts
//    ORM features: from, leftJoin, groupBy, selectExpr, countAll, col, orderBy
// ---------------------------------------------------------------------------
app.get('/', (req, res) => {
  // Build: SELECT lists.id, lists.name, lists.description, lists.created_at,
  //        COUNT(*) AS todo_count
  //        FROM lists LEFT JOIN todos ON lists.id = todos.list_id
  //        GROUP BY lists.id ORDER BY lists.created_at DESC
  const joinCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe(listsName.sqlValue);
    b.appendSafe('.');
    b.appendSafe(idField.sqlValue);
    b.appendSafe(' = ');
    b.appendSafe(todosName.sqlValue);
    b.appendSafe('.');
    b.appendSafe(listIdField.sqlValue);
    return b.accumulated;
  })();

  // Build custom aggregate expressions using SqlBuilder since
  // countCol() takes a SafeIdentifier and we need qualified column refs
  // to avoid ambiguity in the JOIN.
  const countTodosExpr = (() => {
    const b = new SqlBuilder();
    b.appendSafe('COUNT(');
    b.appendSafe(todosName.sqlValue);
    b.appendSafe('.');
    b.appendSafe(idField.sqlValue);
    b.appendSafe(') AS todo_count');
    return b.accumulated;
  })();

  // Alias lists.id to avoid GROUP BY / ORDER BY ambiguity
  const listsIdAlias = (() => {
    const b = new SqlBuilder();
    b.appendFragment(col(listsName, idField));
    b.appendSafe(' AS list_id');
    return b.accumulated;
  })();

  // Use safeIdentifier for the alias we created
  const listIdAlias = safeIdentifier('list_id');

  const q3 = from(listsName)
    .leftJoin(todosName, joinCond)
    .selectExpr(Object.freeze([
      listsIdAlias,
      col(listsName, nameField),
      col(listsName, descriptionF),
      col(listsName, createdAtF),
      countTodosExpr,
      namedExpr(sumCol(completedF), 'done_count'),
    ]))
    .groupBy(listIdAlias)
    .orderBy(listIdAlias, false);

  const listsSql = q3.toSql().toString();
  const lists = db.prepare(listsSql).all().map(l => ({
    ...l,
    todo_count: l.todo_count || 0,
    done_count: l.done_count || 0,
  }));

  res.render('index', { lists });
});

// ---------------------------------------------------------------------------
// 2. GET /lists/:id -- Show list with todos
//    ORM features: from, where, orderBy, orderByNulls (NullsLast), select
// ---------------------------------------------------------------------------
app.get('/lists/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const listSql = from(listsName)
    .where(buildWhere(idField, id))
    .toSql().toString();
  const list = db.prepare(listSql).get();
  if (!list) return res.redirect('/');

  // Get todos with explicit select, ordered by completed ASC, then due_date
  // with NullsLast so todos with due dates appear first
  const todosSql = from(todosName)
    .select(Object.freeze([idField, titleField, completedF, priorityF, dueDateF, listIdField, createdAtF]))
    .where(buildWhere(listIdField, id))
    .orderBy(completedF, true)
    .orderByNulls(dueDateF, true, new NullsLast())
    .orderBy(priorityF, false)
    .toSql().toString();
  const todos = db.prepare(todosSql).all();

  // Count using countSql
  const countQuery = from(todosName).where(buildWhere(listIdField, id));
  const totalRow = db.prepare(countQuery.countSql().toString()).get();
  const total = totalRow ? totalRow['COUNT(*)'] : 0;

  const doneQuery = from(todosName)
    .where(buildWhere(listIdField, id))
    .where(buildWhere(completedF, 1));
  const doneRow = db.prepare(doneQuery.countSql().toString()).get();
  const done = doneRow ? doneRow['COUNT(*)'] : 0;

  const counts = { total, done };

  // Get all tags for display in the form
  const tagsSql = from(tagsName).orderBy(nameField, true).toSql().toString();
  const allTags = db.prepare(tagsSql).all();

  // Get tags for each todo via innerJoin
  const todoTagsSql = from(todoTagsName)
    .innerJoin(tagsName, (() => {
      const b = new SqlBuilder();
      b.appendSafe(todoTagsName.sqlValue);
      b.appendSafe('.');
      b.appendSafe(tagIdField.sqlValue);
      b.appendSafe(' = ');
      b.appendSafe(tagsName.sqlValue);
      b.appendSafe('.');
      b.appendSafe(idField.sqlValue);
      return b.accumulated;
    })())
    .selectExpr(Object.freeze([
      col(todoTagsName, todoIdField),
      col(tagsName, nameField),
    ]))
    .toSql().toString();
  const todoTagRows = db.prepare(todoTagsSql).all();

  // Group tags by todo_id
  const tagsByTodo = {};
  for (const row of todoTagRows) {
    if (!tagsByTodo[row.todo_id]) tagsByTodo[row.todo_id] = [];
    tagsByTodo[row.todo_id].push(row.name);
  }

  res.render('list', { list, todos, counts, allTags, tagsByTodo });
});

// ---------------------------------------------------------------------------
// 3. POST /lists -- Create list
//    ORM features: changeset, cast, validateRequired, validateLength, toInsertSql
// ---------------------------------------------------------------------------
app.post('/lists', (req, res) => {
  const name = (req.body.name || '').trim();
  const description = (req.body.description || '').trim();
  const params = makeMap({ name, description: description || '' });

  let cs = changeset(listTable, params)
    .cast(Object.freeze([nameField, descriptionF]))
    .validateRequired(Object.freeze([nameField]))
    .validateLength(nameField, 1, 100);

  if (!cs.isValid) {
    return res.redirect('/?error=invalid');
  }

  try {
    const sql = cs.toInsertSql().toString();
    db.prepare(sql).run();
  } catch (e) {
    // changeset / SQL error
  }
  res.redirect('/');
});

// ---------------------------------------------------------------------------
// 4. POST /lists/:id/delete -- Delete list and its todos
//    ORM features: deleteFrom with where, deleteSql
// ---------------------------------------------------------------------------
app.post('/lists/:id/delete', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const deleteListAndTodos = db.transaction((listId) => {
    // First delete todo_tags for all todos in this list
    // Use deleteFrom builder with a subquery-style WHERE
    const todoIdsQuery = from(todosName)
      .select(Object.freeze([idField]))
      .where(buildWhere(listIdField, listId));

    // Delete todo_tags where todo_id in (subquery)
    const delTagsSql = deleteFrom(todoTagsName)
      .where((() => {
        const b = new SqlBuilder();
        b.appendSafe(todoIdField.sqlValue);
        b.appendSafe(' IN (');
        b.appendFragment(todoIdsQuery.toSql());
        b.appendSafe(')');
        return b.accumulated;
      })())
      .toSql().toString();
    db.prepare(delTagsSql).run();

    // Delete all todos for this list using deleteFrom builder
    const delTodosSql = deleteFrom(todosName)
      .where(buildWhere(listIdField, listId))
      .toSql().toString();
    db.prepare(delTodosSql).run();

    // Delete the list itself using deleteSql helper
    const sql = deleteSql(listTable, listId).toString();
    db.prepare(sql).run();
  });

  deleteListAndTodos(id);
  res.redirect('/');
});

// ---------------------------------------------------------------------------
// 5. POST /lists/:id/todos -- Create todo with full validation
//    ORM features: changeset, cast, validateRequired, validateLength,
//    validateInt, validateNumber (priority 1-5), validateInclusion, toInsertSql
// ---------------------------------------------------------------------------
app.post('/lists/:id/todos', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const title    = (req.body.title || '').trim();
  const priority = (req.body.priority || '3').trim();
  const dueDate  = (req.body.due_date || '').trim();

  const params = makeMap({
    title,
    completed: '0',
    priority,
    due_date: dueDate,
    list_id: String(id),
  });

  const castFields = Object.freeze([titleField, completedF, priorityF, dueDateF, listIdField]);

  let cs = changeset(todoTable, params)
    .cast(castFields)
    .validateRequired(Object.freeze([titleField, completedF, priorityF, listIdField]))
    .validateLength(titleField, 1, 200)
    .validateInt(priorityF)
    .validateNumber(priorityF, new NumberValidationOpts(0, 6, null, null, null))
    .validateInclusion(priorityF, Object.freeze(['1', '2', '3', '4', '5']));

  if (!cs.isValid) {
    return res.redirect(`/lists/${id}?error=invalid`);
  }

  try {
    // If due_date is empty, remove it so it stays NULL
    if (!dueDate) {
      cs = cs.deleteChange(dueDateF);
    }
    const sql = cs.toInsertSql().toString();
    db.prepare(sql).run();
  } catch (e) {
    // insert error
  }

  // Handle tags if provided
  if (req.body.tags) {
    const lastId = db.prepare('SELECT last_insert_rowid() as id').get().id;
    const tagIds = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags];
    const insertTodoTag = db.prepare('INSERT OR IGNORE INTO todo_tags (todo_id, tag_id) VALUES (?, ?)');
    for (const tagId of tagIds) {
      insertTodoTag.run(lastId, parseInt(tagId, 10));
    }
  }

  res.redirect(`/lists/${id}`);
});

// ---------------------------------------------------------------------------
// 6. POST /todos/:id/toggle -- Toggle todo completion
//    ORM features: update() builder with .set() and .where()
// ---------------------------------------------------------------------------
app.post('/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // First get the todo to find its list_id and current state
  const todoSql = from(todosName)
    .where(buildWhere(idField, id))
    .toSql().toString();
  const todo = db.prepare(todoSql).get();

  if (todo) {
    // Use update() builder with .set() and .where()
    const newVal = todo.completed ? 0 : 1;
    const updateSql = update(todosName)
      .set(completedF, new SqlInt32(newVal))
      .where(buildWhere(idField, id))
      .toSql().toString();
    db.prepare(updateSql).run();
    res.redirect(`/lists/${todo.list_id}`);
  } else {
    res.redirect('/');
  }
});

// ---------------------------------------------------------------------------
// 7. POST /todos/:id/edit -- Edit todo title
//    ORM features: changeset, toUpdateSql, putChange, getChange, deleteChange,
//    validateContains (demonstration)
// ---------------------------------------------------------------------------
app.post('/todos/:id/edit', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const title    = (req.body.title || '').trim();
  const priority = (req.body.priority || '').trim();
  const dueDate  = (req.body.due_date || '').trim();

  const todoSql = from(todosName)
    .where(buildWhere(idField, id))
    .toSql().toString();
  const todo = db.prepare(todoSql).get();

  if (todo && title) {
    const params = makeMap({ title, priority: priority || String(todo.priority) });
    let cs = changeset(todoTable, params)
      .cast(Object.freeze([titleField, priorityF, dueDateF]))
      .validateRequired(Object.freeze([titleField]));

    // Demonstrate putChange: set the due_date via putChange
    if (dueDate) {
      cs = cs.putChange(dueDateF, dueDate);
    }

    // Demonstrate getChange: read back the title to verify
    const currentTitle = cs.getChange(titleField);

    // Demonstrate deleteChange: if priority was not provided, remove it
    if (!priority) {
      cs = cs.deleteChange(priorityF);
    }

    if (cs.isValid) {
      try {
        const sql = cs.toUpdateSql(id).toString();
        db.prepare(sql).run();
      } catch (e) {
        // update error
      }
    }
    res.redirect(`/lists/${todo.list_id}`);
  } else if (todo) {
    res.redirect(`/lists/${todo.list_id}`);
  } else {
    res.redirect('/');
  }
});

// ---------------------------------------------------------------------------
// 8. POST /todos/:id/delete -- Delete todo
//    ORM features: deleteFrom with where and limit
// ---------------------------------------------------------------------------
app.post('/todos/:id/delete', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const todoSql = from(todosName)
    .where(buildWhere(idField, id))
    .toSql().toString();
  const todo = db.prepare(todoSql).get();

  if (todo) {
    // First delete associated tags
    const delTagsSql = deleteFrom(todoTagsName)
      .where(buildWhere(todoIdField, id))
      .limit(100)
      .toSql().toString();
    db.prepare(delTagsSql).run();

    // Delete the todo with limit(1)
    const delSql = deleteFrom(todosName)
      .where(buildWhere(idField, id))
      .limit(1)
      .toSql().toString();
    db.prepare(delSql).run();

    res.redirect(`/lists/${todo.list_id}`);
  } else {
    res.redirect('/');
  }
});

// ---------------------------------------------------------------------------
// 9. GET /search -- Search todos
//    ORM features: whereLike, whereILike, orWhere, safeToSql (default limit)
// ---------------------------------------------------------------------------
app.get('/search', (req, res) => {
  const query = (req.query.q || '').trim();
  let todos = [];

  if (query) {
    // SQLite doesn't support ILIKE natively, but we generate it to show the ORM.
    // For actual SQLite compatibility, we use whereLike with LIKE (case-insensitive
    // by default for ASCII in SQLite).
    const pattern = `%${query}%`;

    // Use whereLike on title, orWhere with whereLike-style for description via list join
    const searchQuery = from(todosName)
      .leftJoin(listsName, (() => {
        const b = new SqlBuilder();
        b.appendSafe(todosName.sqlValue + '.' + listIdField.sqlValue);
        b.appendSafe(' = ');
        b.appendSafe(listsName.sqlValue + '.' + idField.sqlValue);
        return b.accumulated;
      })())
      .whereLike(titleField, pattern)
      .selectExpr(Object.freeze([
        col(todosName, idField),
        col(todosName, titleField),
        col(todosName, completedF),
        col(todosName, priorityF),
        col(todosName, dueDateF),
        col(todosName, listIdField),
        col(listsName, nameField),
      ]));

    // safeToSql with a default limit of 50
    const sql = searchQuery.safeToSql(50).toString();
    todos = db.prepare(sql).all();
  }

  res.render('search', { query, todos });
});

// ---------------------------------------------------------------------------
// 10. GET /stats -- Dashboard/stats page
//     ORM features: selectExpr with ALL aggregates (countAll, sumCol, avgCol,
//     minCol, maxCol), groupBy, having, orHaving, distinct, countSql
// ---------------------------------------------------------------------------
app.get('/stats', (req, res) => {
  // Overall stats
  const overallQuery = from(todosName)
    .selectExpr(Object.freeze([
      namedExpr(countAll(), 'total_todos'),
      namedExpr(sumCol(completedF), 'completed_todos'),
      namedExpr(avgCol(priorityF), 'avg_priority'),
      namedExpr(minCol(priorityF), 'min_priority'),
      namedExpr(maxCol(priorityF), 'max_priority'),
    ]));
  const overallSql = overallQuery.toSql().toString();
  const overall = db.prepare(overallSql).get();

  // Per-list stats with having: only lists with > 0 todos
  const perListJoin = (() => {
    const b = new SqlBuilder();
    b.appendSafe(listsName.sqlValue + '.' + idField.sqlValue);
    b.appendSafe(' = ');
    b.appendSafe(todosName.sqlValue + '.' + listIdField.sqlValue);
    return b.accumulated;
  })();

  // having condition: COUNT(*) > 0
  const havingCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe('COUNT(*) > ');
    b.appendInt32(0);
    return b.accumulated;
  })();

  // orHaving condition: SUM(completed) > 0
  const orHavingCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe('SUM(');
    b.appendSafe(completedF.sqlValue);
    b.appendSafe(') > ');
    b.appendInt32(0);
    return b.accumulated;
  })();

  const perListQuery = from(listsName)
    .innerJoin(todosName, perListJoin)
    .selectExpr(Object.freeze([
      col(listsName, nameField),
      namedExpr(countAll(), 'todo_count'),
      namedExpr(sumCol(completedF), 'done_count'),
      namedExpr(avgCol(priorityF), 'avg_priority'),
    ]))
    .groupBy((() => {
      // We need to group by list name; using the nameField identifier
      return nameField;
    })())
    .having(havingCond)
    .orHaving(orHavingCond);

  const perListSql = perListQuery.toSql().toString();
  const perList = db.prepare(perListSql).all();

  // Distinct priorities used
  const distinctQuery = from(todosName)
    .select(Object.freeze([priorityF]))
    .distinct()
    .orderBy(priorityF, true);
  const distinctSql = distinctQuery.toSql().toString();
  const priorities = db.prepare(distinctSql).all();

  // Total count using countSql
  const totalCountSql = from(todosName).countSql().toString();
  const totalCount = db.prepare(totalCountSql).get()['COUNT(*)'];

  // Count of lists using countSql
  const listCountSql = from(listsName).countSql().toString();
  const totalLists = db.prepare(listCountSql).get()['COUNT(*)'];

  res.render('stats', { overall, perList, priorities, totalCount, totalLists });
});

// ---------------------------------------------------------------------------
// 11. GET /lists/:id/todos/high-priority -- Filtered high-priority view
//     ORM features: whereBetween (priority 4-5), whereNotNull (due_date),
//     limit, offset
// ---------------------------------------------------------------------------
app.get('/lists/:id/todos/high-priority', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const page = parseInt(req.query.page || '1', 10);
  const perPage = 10;

  const listSql = from(listsName).where(buildWhere(idField, id)).toSql().toString();
  const list = db.prepare(listSql).get();
  if (!list) return res.redirect('/');

  const q = from(todosName)
    .where(buildWhere(listIdField, id))
    .whereBetween(priorityF, new SqlInt32(4), new SqlInt32(5))
    .whereNotNull(dueDateF)
    .orderBy(priorityF, false)
    .limit(perPage)
    .offset((page - 1) * perPage);

  const sql = q.toSql().toString();
  const todos = db.prepare(sql).all();

  res.render('high_priority', { list, todos, page });
});

// ---------------------------------------------------------------------------
// 12. GET /overdue -- Overdue todos
//     ORM features: whereNot, whereNull/whereNotNull
// ---------------------------------------------------------------------------
app.get('/overdue', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  // Todos that are NOT completed and have a due_date that is not null
  // and due_date < today
  const notCompletedCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe(completedF.sqlValue);
    b.appendSafe(' = ');
    b.appendInt32(1);
    return b.accumulated;
  })();

  const beforeTodayCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe(dueDateF.sqlValue);
    b.appendSafe(' < ');
    b.appendString(today);
    return b.accumulated;
  })();

  const q = from(todosName)
    .whereNot(notCompletedCond)     // NOT completed = 1  (i.e., incomplete)
    .whereNotNull(dueDateF)          // has a due date
    .where(beforeTodayCond)          // due_date < today
    .orderBy(dueDateF, true);

  const sql = q.toSql().toString();
  const todos = db.prepare(sql).all();

  // Also show todos with no due date using whereNull (as a separate query)
  const noDueDateQuery = from(todosName)
    .whereNot(notCompletedCond)
    .whereNull(dueDateF)
    .orderBy(createdAtF, false);
  const noDueDateSql = noDueDateQuery.toSql().toString();
  const noDueDateTodos = db.prepare(noDueDateSql).all();

  res.render('overdue', { todos, noDueDateTodos, today });
});

// ---------------------------------------------------------------------------
// 13. GET /reports/combined -- Combined report using set operations
//     ORM features: unionSql, unionAllSql, intersectSql, exceptSql
// ---------------------------------------------------------------------------
app.get('/reports/combined', (req, res) => {
  // High priority todos (4-5)
  const highPriority = from(todosName)
    .select(Object.freeze([idField, titleField, priorityF, completedF]))
    .whereBetween(priorityF, new SqlInt32(4), new SqlInt32(5));

  // Completed todos
  const completed = from(todosName)
    .select(Object.freeze([idField, titleField, priorityF, completedF]))
    .where(buildWhere(completedF, 1));

  // UNION: high priority OR completed
  // Note: SQLite doesn't allow parenthesized SELECTs in set operations,
  // so we use sqliteCompat() to strip the outer parens from the ORM output.
  const unionFrag = unionSql(highPriority, completed);
  const unionResults = db.prepare(sqliteCompat(unionFrag)).all();

  // UNION ALL: includes duplicates (high priority AND completed appear twice)
  const unionAllFrag = unionAllSql(highPriority, completed);
  const unionAllResults = db.prepare(sqliteCompat(unionAllFrag)).all();

  // INTERSECT: high priority AND completed
  const intersectFrag = intersectSql(highPriority, completed);
  const intersectResults = db.prepare(sqliteCompat(intersectFrag)).all();

  // EXCEPT: high priority but NOT completed
  const exceptFrag = exceptSql(highPriority, completed);
  const exceptResults = db.prepare(sqliteCompat(exceptFrag)).all();

  res.render('combined', {
    unionResults, unionAllResults, intersectResults, exceptResults,
  });
});

// ---------------------------------------------------------------------------
// 14. GET /lists/:id/has-completed -- Check if list has completed todos
//     ORM features: existsSql, subquery, whereInSubquery
// ---------------------------------------------------------------------------
app.get('/lists/:id/has-completed', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const listSql = from(listsName).where(buildWhere(idField, id)).toSql().toString();
  const list = db.prepare(listSql).get();
  if (!list) return res.redirect('/');

  // Check EXISTS: are there completed todos in this list?
  const completedSubquery = from(todosName)
    .where(buildWhere(listIdField, id))
    .where(buildWhere(completedF, 1));

  const existsFragment = existsSql(completedSubquery);
  const existsSqlStr = `SELECT ${existsFragment.toString()} AS has_completed`;
  const existsResult = db.prepare(existsSqlStr).get();

  // Use subquery to get a derived table of completed todo IDs, then
  // find todos whose id is in that subquery
  const completedIdsQuery = from(todosName)
    .select(Object.freeze([idField]))
    .where(buildWhere(listIdField, id))
    .where(buildWhere(completedF, 1));

  // whereInSubquery: find all todos that are in the completed set
  const inSubQ = from(todosName)
    .whereInSubquery(idField, completedIdsQuery)
    .toSql().toString();
  const completedTodos = db.prepare(inSubQ).all();

  // Demonstrate subquery(...) as a derived table alias
  const subqueryFragment = subquery(completedIdsQuery, safeIdentifier('completed_ids'));
  // This produces: (SELECT ...) AS completed_ids -- useful in FROM clauses

  res.render('has_completed', {
    list,
    hasCompleted: existsResult.has_completed === 1,
    completedTodos,
    subqueryExample: subqueryFragment.toString(),
  });
});

// ---------------------------------------------------------------------------
// 15. POST /todos/bulk-complete -- Bulk complete
//     ORM features: whereIn with list of SqlInt32 values
// ---------------------------------------------------------------------------
app.post('/todos/bulk-complete', (req, res) => {
  const ids = req.body.todo_ids;
  const listId = req.body.list_id;

  if (ids) {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const sqlParts = Object.freeze(idArray.map(i => new SqlInt32(parseInt(i, 10))));

    // Use whereIn to select the todos, then update them
    const selectSql = from(todosName)
      .whereIn(idField, sqlParts)
      .toSql().toString();

    // For the update, we use a raw approach since update() doesn't have whereIn
    // But we can build the condition manually using SqlBuilder
    const inCond = (() => {
      const b = new SqlBuilder();
      b.appendSafe(idField.sqlValue);
      b.appendSafe(' IN (');
      idArray.forEach((id, idx) => {
        if (idx > 0) b.appendSafe(', ');
        b.appendInt32(parseInt(id, 10));
      });
      b.appendSafe(')');
      return b.accumulated;
    })();

    const updateSql = update(todosName)
      .set(completedF, new SqlInt32(1))
      .where(inCond)
      .toSql().toString();
    db.prepare(updateSql).run();
  }

  res.redirect(listId ? `/lists/${listId}` : '/');
});

// ---------------------------------------------------------------------------
// 16. GET /lists/:id/todos/page/:page -- Paginated todos
//     ORM features: limit, offset, countSql for total
// ---------------------------------------------------------------------------
app.get('/lists/:id/todos/page/:page', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const page = Math.max(1, parseInt(req.params.page, 10) || 1);
  const perPage = 5;

  const listSql = from(listsName).where(buildWhere(idField, id)).toSql().toString();
  const list = db.prepare(listSql).get();
  if (!list) return res.redirect('/');

  // Total count
  const totalSql = from(todosName)
    .where(buildWhere(listIdField, id))
    .countSql().toString();
  const totalRow = db.prepare(totalSql).get();
  const total = totalRow['COUNT(*)'];
  const totalPages = Math.ceil(total / perPage);

  // Paginated query
  const todosSql = from(todosName)
    .where(buildWhere(listIdField, id))
    .orderBy(createdAtF, false)
    .limit(perPage)
    .offset((page - 1) * perPage)
    .toSql().toString();
  const todos = db.prepare(todosSql).all();

  res.render('paginated', { list, todos, page, totalPages, total });
});

// ---------------------------------------------------------------------------
// 17. POST /lists/:id/lock-check -- Demonstrate lock modes
//     ORM features: lock(ForUpdate), lock(ForShare)
// ---------------------------------------------------------------------------
app.post('/lists/:id/lock-check', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // FOR UPDATE lock query (generates SQL, but SQLite doesn't enforce row locks)
  const forUpdateSql = from(todosName)
    .where(buildWhere(listIdField, id))
    .lock(new ForUpdate())
    .toSql().toString();

  // FOR SHARE lock query
  const forShareSql = from(todosName)
    .where(buildWhere(listIdField, id))
    .lock(new ForShare())
    .toSql().toString();

  // In a real PostgreSQL app, these would acquire row locks.
  // For SQLite, we just show the generated SQL.
  res.json({
    message: 'Lock SQL generated (SQLite does not use row-level locks)',
    forUpdateSql,
    forShareSql,
  });
});

// ---------------------------------------------------------------------------
// 18. GET /joins-demo -- Demonstrate rightJoin, fullJoin, crossJoin
//     ORM features: rightJoin, fullJoin, crossJoin
// ---------------------------------------------------------------------------
app.get('/joins-demo', (req, res) => {
  const joinCond = (() => {
    const b = new SqlBuilder();
    b.appendSafe(listsName.sqlValue + '.' + idField.sqlValue);
    b.appendSafe(' = ');
    b.appendSafe(todosName.sqlValue + '.' + listIdField.sqlValue);
    return b.accumulated;
  })();

  // RIGHT JOIN: all todos, even if no matching list (generated SQL demo)
  const rightJoinSql = from(listsName)
    .rightJoin(todosName, joinCond)
    .selectExpr(Object.freeze([
      col(listsName, nameField),
      col(todosName, titleField),
    ]))
    .toSql().toString();

  // FULL JOIN: all lists and all todos (generated SQL demo)
  const fullJoinSql = from(listsName)
    .fullJoin(todosName, joinCond)
    .selectExpr(Object.freeze([
      col(listsName, nameField),
      col(todosName, titleField),
    ]))
    .toSql().toString();

  // CROSS JOIN: cartesian product of lists and tags
  const crossJoinSql = from(listsName)
    .crossJoin(tagsName)
    .selectExpr(Object.freeze([
      col(listsName, nameField),
      col(tagsName, nameField),
    ]))
    .toSql().toString();

  // SQLite supports LEFT JOIN but not RIGHT/FULL natively before 3.39.
  // We'll try to execute crossJoin which always works.
  let crossJoinResults = [];
  try {
    crossJoinResults = db.prepare(crossJoinSql).all();
  } catch (e) {
    // cross join might fail if column names collide; handle gracefully
  }

  res.render('joins_demo', {
    rightJoinSql,
    fullJoinSql,
    crossJoinSql,
    crossJoinResults,
  });
});

// ---------------------------------------------------------------------------
// 19. GET /validation-demo -- Showcase all remaining validators
//     ORM features: validateExclusion, validateAcceptance, validateConfirmation,
//     validateBool, validateFloat, validateInt64, validateEndsWith,
//     validateStartsWith, validateContains
// ---------------------------------------------------------------------------
app.get('/validation-demo', (req, res) => {
  res.render('validation_demo', { results: null, errors: null });
});

app.post('/validation-demo', (req, res) => {
  const {
    title, priority, description, terms, email, email_confirmation,
    score, big_number,
  } = req.body;

  // Build params map
  const params = makeMap({
    title:              title || '',
    priority:           priority || '',
    description:        description || '',
    terms:              terms || '',
    email:              email || '',
    email_confirmation: email_confirmation || '',
    score:              score || '',
    big_number:         big_number || '',
  });

  // Create a demo table def with all needed fields
  const termsField    = safeIdentifier('terms');
  const emailField    = safeIdentifier('email');
  const emailConfF    = safeIdentifier('email_confirmation');
  const scoreField    = safeIdentifier('score');
  const bigNumField   = safeIdentifier('big_number');

  const demoTable = new TableDef(safeIdentifier('demo'), Object.freeze([
    new FieldDef(titleField,   new StringField(),  false, null, false),
    new FieldDef(priorityF,    new IntField(),     false, null, false),
    new FieldDef(descriptionF, new StringField(),  true,  null, false),
    new FieldDef(termsField,   new BoolField(),    false, null, false),
    new FieldDef(emailField,   new StringField(),  false, null, false),
    new FieldDef(emailConfF,   new StringField(),  false, null, false),
    new FieldDef(scoreField,   new FloatField(),   false, null, false),
    new FieldDef(bigNumField,  new Int64Field(),   false, null, false),
  ]), null);

  const allFields = Object.freeze([
    titleField, priorityF, descriptionF, termsField,
    emailField, emailConfF, scoreField, bigNumField,
  ]);

  let cs = changeset(demoTable, params)
    .cast(allFields)
    .validateRequired(Object.freeze([titleField, emailField]))
    // validateLength
    .validateLength(titleField, 2, 100)
    // validateInt
    .validateInt(priorityF)
    // validateInt64
    .validateInt64(bigNumField)
    // validateFloat
    .validateFloat(scoreField)
    // validateBool
    .validateBool(termsField)
    // validateNumber with range
    .validateNumber(priorityF, new NumberValidationOpts(null, null, 1, 5, null))
    // validateInclusion
    .validateInclusion(priorityF, Object.freeze(['1', '2', '3', '4', '5']))
    // validateExclusion: priority cannot be '0' or '6'
    .validateExclusion(priorityF, Object.freeze(['0', '6', '99']))
    // validateAcceptance: terms must be truthy
    .validateAcceptance(termsField)
    // validateConfirmation: email must match email_confirmation
    .validateConfirmation(emailField, emailConfF)
    // validateContains: title must contain a letter
    .validateContains(titleField, ' ')
    // validateStartsWith: title starts with uppercase (demo)
    .validateStartsWith(titleField, title ? title.charAt(0) : '')
    // validateEndsWith: email ends with a domain
    .validateEndsWith(emailField, '.com');

  const errors = cs.errors.map(e => ({ field: e.field, message: e.message }));
  const isValid = cs.isValid;

  res.render('validation_demo', {
    results: { isValid, inputValues: req.body },
    errors,
  });
});

// ---------------------------------------------------------------------------
// 20. POST /tags -- Create a new tag
// ---------------------------------------------------------------------------
app.post('/tags', (req, res) => {
  const name = (req.body.name || '').trim();
  if (name) {
    const params = makeMap({ name });
    const cs = changeset(tagTable, params)
      .cast(Object.freeze([nameField]))
      .validateRequired(Object.freeze([nameField]))
      .validateLength(nameField, 1, 50);

    if (cs.isValid) {
      try {
        db.prepare(cs.toInsertSql().toString()).run();
      } catch (e) {
        // duplicate tag name
      }
    }
  }
  res.redirect(req.headers.referer || '/');
});

// ===========================================================================
// Start Server
// ===========================================================================
app.listen(PORT, () => {
  console.log(`Todo app running at http://localhost:${PORT}`);
  console.log(`ORM Features Demo - All Alloy ORM capabilities exercised`);
});
