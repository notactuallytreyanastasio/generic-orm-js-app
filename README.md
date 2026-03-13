# Alloy — JavaScript Demo App

A todo-list application built with Express, EJS, and better-sqlite3, demonstrating the [Alloy](https://github.com/notactuallytreyanastasio/alloy) compiled from Temper to JavaScript.

## Stack

| Component | Technology |
|-----------|-----------|
| Framework | Express 4.x |
| Templates | EJS |
| Database | SQLite via better-sqlite3 |
| ORM | [Alloy](https://github.com/notactuallytreyanastasio/alloy) (vendored) |
| Port | 5006 |

## ORM Usage

All user-facing CRUD operations flow through the ORM's type-safe SQL generation:

```javascript
import { from, safeIdentifier, changeset, deleteSql, SqlBuilder } from 'orm/src';

// SELECT — type-safe query builder
const q = from(safeIdentifier("todos"))
  .where(whereFragment)
  .orderBy(safeIdentifier("created_at"), true)
  .toSql().toString();

// INSERT — changeset pipeline with field whitelisting
const cs = changeset(tableDef, params)
  .cast([safeIdentifier("title"), safeIdentifier("list_id")])
  .validateRequired([safeIdentifier("title")]);
const sql = cs.toInsertSql().toString();

// DELETE — validated identifier
const sql = deleteSql(tableDef, id).toString();
```

## Security Model

- **Zero SQL injection vulnerabilities** — all queries generated through the ORM
- `SafeIdentifier` validates table/column names against `[a-zA-Z_][a-zA-Z0-9_]*`
- `SqlPart` sealed hierarchy handles per-type value escaping
- `Changeset.cast()` enforces field whitelisting (CWE-915 mass assignment prevention)
- DDL (`CREATE TABLE`) is the only raw SQL — static strings with no user input

## Running

```bash
npm install
node app.js
# Open http://localhost:5006
```

## Vendored ORM

The `vendor/` directory contains the ORM compiled from Temper to JavaScript ES modules. Updated automatically by CI when the ORM source changes.

---

Part of the [Alloy](https://github.com/notactuallytreyanastasio/alloy) project — write once in Temper, secure everywhere.
