# SQL Security Analysis: JavaScript Todo App

SQL injection analysis of the JavaScript todo app built on the Generic Temper ORM. This analysis focuses exclusively on SQL generation and execution — the core value proposition of the ORM.

**Analysis Date:** 2026-03-12
**Framework:** Express + EJS + better-sqlite3
**ORM:** Generic Temper ORM (compiled to JavaScript)

---

## How This App Uses the ORM

All user-facing CRUD operations flow through the Temper ORM's type-safe SQL generation:

| Operation | Method | SQL Source |
|-----------|--------|------------|
| SELECT lists/todos | `from(safeIdentifier("...")).where(...).toSql()` | ORM |
| INSERT list/todo | `changeset(table, params).cast(fields).validateRequired(fields).toInsertSql()` | ORM |
| UPDATE todo | `changeset(table, params).cast(fields).toUpdateSql(id)` | ORM |
| DELETE list/todo | `deleteSql(table, id)` | ORM |
| WHERE clauses | `SqlBuilder.appendSafe()` + `appendInt32()` / `appendString()` | ORM |
| Toggle completed | `UPDATE todos SET completed = CASE WHEN ...` with `?` | Raw (parameterized) |
| JOIN + aggregate | `SELECT l.*, COUNT(t.id) ... LEFT JOIN ...` with `?` | Raw (parameterized) |
| DDL | `CREATE TABLE IF NOT EXISTS ...` | Raw (static) |

### ORM SQL Generation Path

User input flows through these validation layers before reaching SQL:

```
User input (form field)
  → Express body parser (string)
    → changeset(tableDef, paramsMap)         [factory — sealed interface]
      → .cast(allowedFields)                 [SafeIdentifier whitelist]
        → .validateRequired(fields)          [non-null enforcement]
          → .toInsertSql()                   [type-dispatched escaping]
            → SqlFragment.toString()         [rendered SQL string]
              → db.prepare(sql).run()        [SQLite execution]
```

For queries:
```
Route parameter (e.g. /lists/:id)
  → parseInt(id)
    → SqlBuilder.appendInt32(id)             [bare integer — no quotes]
      → SqlFragment (WHERE id = 42)
        → from(safeIdentifier("lists")).where(fragment).toSql()
          → db.prepare(sql).all()
```

---

## SQL Injection Analysis

### ORM-Generated SQL: Protected

**SafeIdentifier validation** — Table/column names (`"lists"`, `"todos"`, `"title"`, etc.) are validated against `[a-zA-Z_][a-zA-Z0-9_]*` at app startup. The internal `ValidatedIdentifier` class is not exported, so identifiers cannot bypass validation.

**SqlString escaping** — String values from changeset are rendered as `SqlString`, which escapes single quotes by doubling (`'` → `''`). An input like `'; DROP TABLE todos; --` becomes `'''; DROP TABLE todos; --'` — a valid string literal, not a SQL injection.

**SqlInt32 rendering** — Integer values (IDs, completed flags) are rendered as bare integers via `.toString()`. Since JavaScript's `parseInt` returns `NaN` for non-numeric input, and the ORM's `SqlInt32` calls `.toString()` on a Temper `Int32`, injection through integer fields is not possible.

**Changeset field whitelisting** — `cast([safeIdentifier("title"), safeIdentifier("list_id")])` ensures only whitelisted columns appear in INSERT/UPDATE. An attacker cannot inject additional columns (mass assignment).

### Raw SQL: Also Protected

All raw SQL in this app uses better-sqlite3's parameterized queries:

```javascript
// Toggle — parameterized
db.prepare("UPDATE todos SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END WHERE id = ?").run(id);

// JOIN aggregate — parameterized
db.prepare("SELECT ... FROM lists l LEFT JOIN todos t ON t.list_id = l.id WHERE l.id = ?").get(id);

// Seed data — parameterized
db.prepare("INSERT INTO todos (title, completed, list_id) VALUES (?, ?, ?)").run(title, completed, listId);
```

No raw SQL in this app concatenates user input.

### DDL: Static

Schema creation uses hardcoded `CREATE TABLE` statements with no dynamic content.

---

## Findings

| # | Severity | CWE | Finding |
|---|----------|-----|---------|
| JS-SQL-1 | LOW | CWE-20 | `parseInt(req.params.id)` can return `NaN`. If passed to `SqlBuilder.appendInt32()`, behavior depends on Temper's `Int32` handling. In practice, `NaN` would fail at the ORM level (not a valid Int32), but the app doesn't check for `NaN` before calling ORM functions. |
| JS-SQL-2 | INFO | CWE-89 | ORM-generated SQL is executed via `db.prepare(sql).run()` — the rendered string is passed as the full statement. While escaping is correct, using `db.prepare()` with `?` placeholders for ORM output too would add defense-in-depth. |
| JS-SQL-3 | INFO | CWE-400 | All SELECT queries use `toSql()` instead of `safeToSql(defaultLimit)`. The ORM provides bounded queries via `safeToSql()` but this app doesn't use them. |

### ORM-Level Concerns (shared across all apps)

| # | Severity | CWE | Finding |
|---|----------|-----|---------|
| ORM-1 | MEDIUM | CWE-89 | `toInsertSql`/`toUpdateSql` pass `pair.key` (a `String`) to `appendSafe`. Safe by construction — keys come from `cast()` which requires `SafeIdentifier` — but the type system doesn't enforce this at the call site. |
| ORM-2 | LOW | CWE-89 | `SqlDate.formatTo` wraps `value.toString()` in quotes without escaping. Safe because date format is `YYYY-MM-DD`. |
| ORM-3 | LOW | CWE-20 | `SqlFloat64.formatTo` can produce `NaN`/`Infinity` — not valid SQL literals. |

---

## Verdict

**No SQL injection vulnerabilities found.** The ORM's type-safe generation covers all user-input-to-SQL paths, and raw SQL consistently uses parameterized queries. The app achieves 100% parameterized raw SQL.
