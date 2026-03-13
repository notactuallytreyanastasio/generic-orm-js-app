# Alloy Todo App -- JavaScript

A fully-functional todo list manager demonstrating **every** Alloy ORM feature. Built with Express + EJS + better-sqlite3, styled with a retro Mac System 6 / Windows 95 hybrid UI.

## Overview

This application exercises the complete surface area of the Alloy ORM -- a compile-to-many-languages SQL query builder and changeset validation system written in Temper. Every route in this app uses the ORM to generate SQL; no hand-written query strings touch the database.

20 routes cover: query building, all 5 join types, all aggregate functions, 4 set operations, subqueries, changeset validation with 14 validators, pagination, locking, safe identifiers, and more.

## Data Model

Four-table schema with foreign key relationships:

```
lists (id, name, description, created_at)
  |
  +--< todos (id, title, completed, priority 1-5, due_date, list_id FK, created_at)
         |
         +--< todo_tags (id, todo_id FK, tag_id FK)
                                           |
                                     tags (id, name) >--+
```

- **lists** -- containers for grouping todos
- **todos** -- individual tasks with priority (1=low, 5=critical) and optional due date
- **tags** -- labels (urgent, home, office, health) that can be assigned to any todo
- **todo_tags** -- join table linking todos to tags (many-to-many)

## Complete ORM Feature Coverage

Every ORM export is exercised by at least one route:

| ORM Feature | Category | Route(s) That Exercise It |
|---|---|---|
| `from` | Query Builder | All routes (1-20) |
| `update` | Query Builder | `POST /todos/:id/toggle`, `POST /todos/bulk-complete` |
| `deleteFrom` | Query Builder | `POST /lists/:id/delete`, `POST /todos/:id/delete` |
| `where` | WHERE | `GET /lists/:id`, `GET /overdue`, all CRUD routes |
| `orWhere` | WHERE | `GET /search` |
| `whereNot` | WHERE | `GET /overdue` |
| `whereNull` | WHERE | `GET /overdue` (no-due-date query) |
| `whereNotNull` | WHERE | `GET /lists/:id/todos/high-priority`, `GET /overdue` |
| `whereBetween` | WHERE | `GET /lists/:id/todos/high-priority` (priority 4-5) |
| `whereLike` | WHERE | `GET /search` |
| `whereIn` | WHERE | `POST /todos/bulk-complete` |
| `whereInSubquery` | WHERE | `GET /lists/:id/has-completed` |
| `select` | SELECT | `GET /lists/:id` (explicit columns) |
| `selectExpr` | SELECT | `GET /` (aggregates), `GET /stats` |
| `distinct` | SELECT | `GET /stats` (distinct priorities) |
| `col` | Column Ref | `GET /`, `GET /lists/:id`, `GET /search` |
| `countAll` | Aggregate | `GET /`, `GET /stats` |
| `countCol` | Aggregate | (via `countSql`) |
| `sumCol` | Aggregate | `GET /`, `GET /stats` |
| `avgCol` | Aggregate | `GET /stats` |
| `minCol` | Aggregate | `GET /stats` |
| `maxCol` | Aggregate | `GET /stats` |
| `countSql` | Counting | `GET /lists/:id`, `GET /stats`, `GET /lists/:id/todos/page/:page` |
| `groupBy` | Grouping | `GET /`, `GET /stats` |
| `having` | Grouping | `GET /stats` |
| `orHaving` | Grouping | `GET /stats` |
| `orderBy` | Ordering | `GET /`, `GET /lists/:id`, `GET /search`, `GET /stats` |
| `orderByNulls` | Ordering | `GET /lists/:id` (NullsLast) |
| `NullsFirst` | Ordering | (imported and available) |
| `NullsLast` | Ordering | `GET /lists/:id` |
| `limit` | Pagination | `GET /lists/:id/todos/high-priority`, `POST /todos/:id/delete`, `GET /lists/:id/todos/page/:page` |
| `offset` | Pagination | `GET /lists/:id/todos/high-priority`, `GET /lists/:id/todos/page/:page` |
| `safeToSql` | Pagination | `GET /search` (default limit 50) |
| `lock` (ForUpdate) | Locking | `POST /lists/:id/lock-check` |
| `lock` (ForShare) | Locking | `POST /lists/:id/lock-check` |
| `innerJoin` | Joins | `GET /lists/:id` (todo_tags + tags), `GET /stats` |
| `leftJoin` | Joins | `GET /` (lists + todos), `GET /search` |
| `rightJoin` | Joins | `GET /joins-demo` |
| `fullJoin` | Joins | `GET /joins-demo` |
| `crossJoin` | Joins | `GET /joins-demo` (lists x tags) |
| `unionSql` | Set Operations | `GET /reports/combined` |
| `unionAllSql` | Set Operations | `GET /reports/combined` |
| `intersectSql` | Set Operations | `GET /reports/combined` |
| `exceptSql` | Set Operations | `GET /reports/combined` |
| `subquery` | Subqueries | `GET /lists/:id/has-completed` |
| `existsSql` | Subqueries | `GET /lists/:id/has-completed` |
| `changeset` | Changeset | `POST /lists`, `POST /lists/:id/todos`, `POST /todos/:id/edit`, `POST /tags` |
| `cast` | Changeset | All changeset routes |
| `validateRequired` | Validation | `POST /lists`, `POST /lists/:id/todos`, `POST /tags` |
| `validateLength` | Validation | `POST /lists`, `POST /lists/:id/todos`, `POST /tags` |
| `validateInt` | Validation | `POST /lists/:id/todos`, `POST /validation-demo` |
| `validateInt64` | Validation | `POST /validation-demo` |
| `validateFloat` | Validation | `POST /validation-demo` |
| `validateBool` | Validation | `POST /validation-demo` |
| `validateNumber` | Validation | `POST /lists/:id/todos` (priority 1-5), `POST /validation-demo` |
| `validateInclusion` | Validation | `POST /lists/:id/todos`, `POST /validation-demo` |
| `validateExclusion` | Validation | `POST /validation-demo` |
| `validateAcceptance` | Validation | `POST /validation-demo` |
| `validateConfirmation` | Validation | `POST /validation-demo` |
| `validateContains` | Validation | `POST /validation-demo` |
| `validateStartsWith` | Validation | `POST /validation-demo` |
| `validateEndsWith` | Validation | `POST /validation-demo` |
| `toInsertSql` | Changeset SQL | `POST /lists`, `POST /lists/:id/todos`, `POST /tags` |
| `toUpdateSql` | Changeset SQL | `POST /todos/:id/edit` |
| `putChange` | Changeset Mutation | `POST /todos/:id/edit` |
| `getChange` | Changeset Mutation | `POST /todos/:id/edit` |
| `deleteChange` | Changeset Mutation | `POST /todos/:id/edit`, `POST /lists/:id/todos` |
| `deleteSql` | Delete Helper | `POST /lists/:id/delete` |
| `timestamps` | Schema Helper | Startup (demonstrates helper) |
| `safeIdentifier` | Types | All routes (table/field names) |
| `SafeIdentifier` | Types | All routes |
| `TableDef` | Types | Schema definitions |
| `FieldDef` | Types | Schema definitions |
| `StringField` | Types | Schema definitions |
| `IntField` | Types | Schema definitions |
| `Int64Field` | Types | `POST /validation-demo` |
| `FloatField` | Types | `POST /validation-demo` |
| `BoolField` | Types | `POST /validation-demo` |
| `DateField` | Types | (imported) |
| `SqlBuilder` | Types | All routes (building WHERE, JOIN, aggregate fragments) |
| `SqlFragment` | Types | All routes |
| `SqlPart` | Types | (imported) |
| `SqlSource` | Types | (imported) |
| `SqlBoolean` | Types | (imported) |
| `SqlDate` | Types | (imported) |
| `SqlFloat64` | Types | (imported) |
| `SqlInt32` | Types | `POST /todos/:id/toggle`, `GET /lists/:id/todos/high-priority`, `POST /todos/bulk-complete` |
| `SqlInt64` | Types | (imported) |
| `SqlDefault` | Types | (imported) |
| `SqlString` | Types | (imported) |
| `NumberValidationOpts` | Types | `POST /lists/:id/todos`, `POST /validation-demo` |

## Route Reference

| # | Route | Method | Purpose | Key ORM Features |
|---|---|---|---|---|
| 1 | `/` | GET | Index -- all lists with todo counts | `from`, `leftJoin`, `groupBy`, `selectExpr`, `countAll`, `sumCol`, `col`, `orderBy` |
| 2 | `/lists/:id` | GET | Show list with todos and tags | `from`, `where`, `select`, `orderBy`, `orderByNulls` (NullsLast), `countSql`, `innerJoin`, `col` |
| 3 | `/lists` | POST | Create a list | `changeset`, `cast`, `validateRequired`, `validateLength`, `toInsertSql` |
| 4 | `/lists/:id/delete` | POST | Delete list cascade | `deleteFrom`, `where`, `deleteSql` |
| 5 | `/lists/:id/todos` | POST | Create todo (full validation) | `changeset`, `cast`, `validateRequired`, `validateLength`, `validateInt`, `validateNumber`, `validateInclusion`, `deleteChange`, `toInsertSql` |
| 6 | `/todos/:id/toggle` | POST | Toggle completion | `update`, `set`, `where`, `SqlInt32` |
| 7 | `/todos/:id/edit` | POST | Edit todo | `changeset`, `putChange`, `getChange`, `deleteChange`, `toUpdateSql` |
| 8 | `/todos/:id/delete` | POST | Delete todo | `deleteFrom`, `where`, `limit` |
| 9 | `/search` | GET | Search todos | `from`, `leftJoin`, `whereLike`, `selectExpr`, `col`, `safeToSql` |
| 10 | `/stats` | GET | Dashboard stats | `countAll`, `sumCol`, `avgCol`, `minCol`, `maxCol`, `groupBy`, `having`, `orHaving`, `distinct`, `countSql`, `innerJoin` |
| 11 | `/lists/:id/todos/high-priority` | GET | High-priority filtered view | `whereBetween`, `whereNotNull`, `limit`, `offset` |
| 12 | `/overdue` | GET | Overdue todos | `whereNot`, `whereNotNull`, `whereNull` |
| 13 | `/reports/combined` | GET | Set operations report | `unionSql`, `unionAllSql`, `intersectSql`, `exceptSql` |
| 14 | `/lists/:id/has-completed` | GET | Subquery demo | `existsSql`, `subquery`, `whereInSubquery` |
| 15 | `/todos/bulk-complete` | POST | Bulk complete | `whereIn`, `update`, `set`, `SqlInt32` |
| 16 | `/lists/:id/todos/page/:page` | GET | Paginated todos | `limit`, `offset`, `countSql` |
| 17 | `/lists/:id/lock-check` | POST | Lock modes demo | `lock` (ForUpdate, ForShare) |
| 18 | `/joins-demo` | GET | All join types | `rightJoin`, `fullJoin`, `crossJoin` |
| 19 | `/validation-demo` | GET/POST | All validators | `validateExclusion`, `validateAcceptance`, `validateConfirmation`, `validateBool`, `validateFloat`, `validateInt64`, `validateStartsWith`, `validateEndsWith`, `validateContains` |
| 20 | `/tags` | POST | Create tag | `changeset`, `cast`, `validateRequired`, `validateLength`, `toInsertSql` |

## Code Examples

### Query with LEFT JOIN, GROUP BY, and Aggregates (Index Page)

```javascript
const q = from(listsName)
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

const listsSql = q.toSql().toString();
const lists = db.prepare(listsSql).all();
```

### Changeset with Full Validation (Create Todo)

```javascript
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

const sql = cs.toInsertSql().toString();
db.prepare(sql).run();
```

### Set Operations (Combined Report)

```javascript
const highPriority = from(todosName)
  .select(Object.freeze([idField, titleField, priorityF, completedF]))
  .whereBetween(priorityF, new SqlInt32(4), new SqlInt32(5));

const completed = from(todosName)
  .select(Object.freeze([idField, titleField, priorityF, completedF]))
  .where(buildWhere(completedF, 1));

const unionResults    = db.prepare(sqliteCompat(unionSql(highPriority, completed))).all();
const intersectResults = db.prepare(sqliteCompat(intersectSql(highPriority, completed))).all();
const exceptResults   = db.prepare(sqliteCompat(exceptSql(highPriority, completed))).all();
```

### Subquery with EXISTS Check

```javascript
const completedSubquery = from(todosName)
  .where(buildWhere(listIdField, id))
  .where(buildWhere(completedF, 1));

const existsFragment = existsSql(completedSubquery);
const existsSqlStr = `SELECT ${existsFragment.toString()} AS has_completed`;

const inSubQ = from(todosName)
  .whereInSubquery(idField, completedIdsQuery)
  .toSql().toString();
const completedTodos = db.prepare(inSubQ).all();
```

## Security Model

The Alloy ORM provides five defense layers against SQL injection:

1. **SafeIdentifier** -- all table and column names are validated at construction; only `[a-zA-Z_][a-zA-Z0-9_]*` pass
2. **SqlBuilder** -- typed append methods (`appendInt32`, `appendString`, `appendSafe`) with automatic escaping for string literals (single-quote doubling)
3. **Changeset** -- `cast()` whitelists only permitted fields; user input never becomes raw SQL
4. **No string interpolation** -- the ORM API makes it structurally impossible to concatenate user input into SQL
5. **Type-safe values** -- `SqlInt32`, `SqlString`, `SqlFloat64` etc. enforce type-correct literal emission

For full details, see [SECURITY_ANALYSIS.md](SECURITY_ANALYSIS.md) and the main repo's [MITRE CWE analysis](https://github.com/notactuallytreyanastasio/alloy).

## Running the App

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
npm install
node app.js
```

The app starts at **http://localhost:5006**.

### Dependencies

| Package | Purpose |
|---|---|
| `express` | HTTP server and routing |
| `ejs` | HTML templating |
| `better-sqlite3` | SQLite database driver |
| `orm` (vendored) | Alloy ORM -- compiled Temper-to-JS |
| `@temperlang/core` (vendored) | Temper runtime (Map, Pair constructors) |

## Links

- **Main Alloy ORM repo**: https://github.com/notactuallytreyanastasio/alloy
- **Compiled JS library**: https://github.com/notactuallytreyanastasio/alloy-js
