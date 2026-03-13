# SQL Security Analysis: JavaScript Todo App

SQL security analysis of the JavaScript todo app built on the Generic Temper ORM. This analysis focuses exclusively on SQL generation and execution -- the core value proposition of the ORM.

**Analysis Date:** 2026-03-12
**Updated:** 2026-03-13 (JOIN feature analysis, SQL-focused scope)
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
  -> Express body parser (string)
    -> changeset(tableDef, paramsMap)         [factory -- sealed interface]
      -> .cast(allowedFields)                 [SafeIdentifier whitelist]
        -> .validateRequired(fields)          [non-null enforcement]
          -> .toInsertSql()                   [type-dispatched escaping]
            -> SqlFragment.toString()         [rendered SQL string]
              -> db.prepare(sql).run()        [SQLite execution]
```

For queries:
```
Route parameter (e.g. /lists/:id)
  -> parseInt(id)
    -> SqlBuilder.appendInt32(id)             [bare integer -- no quotes]
      -> SqlFragment (WHERE id = 42)
        -> from(safeIdentifier("lists")).where(fragment).toSql()
          -> db.prepare(sql).all()
```

---

## SQL Injection Analysis

### ORM-Generated SQL: Protected

**SafeIdentifier validation** -- Table/column names (`"lists"`, `"todos"`, `"title"`, etc.) are validated against `[a-zA-Z_][a-zA-Z0-9_]*` at app startup. The internal `ValidatedIdentifier` class is not exported, so identifiers cannot bypass validation.

**SqlString escaping** -- String values from changeset are rendered as `SqlString`, which escapes single quotes by doubling (`'` -> `''`). An input like `'; DROP TABLE todos; --` becomes `'''; DROP TABLE todos; --'` -- a valid string literal, not a SQL injection.

**SqlInt32 rendering** -- Integer values (IDs, completed flags) are rendered as bare integers via `.toString()`. Since JavaScript's `parseInt` returns `NaN` for non-numeric input, and the ORM's `SqlInt32` calls `.toString()` on a Temper `Int32`, injection through integer fields is not possible.

**Changeset field whitelisting** -- `cast([safeIdentifier("title"), safeIdentifier("list_id")])` ensures only whitelisted columns appear in INSERT/UPDATE. An attacker cannot inject additional columns (mass assignment).

### Raw SQL: Also Protected

All raw SQL in this app uses better-sqlite3's parameterized queries:

```javascript
// Toggle -- parameterized
db.prepare("UPDATE todos SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END WHERE id = ?").run(id);

// JOIN aggregate -- parameterized
db.prepare("SELECT ... FROM lists l LEFT JOIN todos t ON t.list_id = l.id WHERE l.id = ?").get(id);

// Seed data -- parameterized
db.prepare("INSERT INTO todos (title, completed, list_id) VALUES (?, ?, ?)").run(title, completed, listId);
```

No raw SQL in this app concatenates user input.

### DDL: Static

Schema creation uses hardcoded `CREATE TABLE` statements with no dynamic content.

---

## SQL Findings

| # | Severity | CWE | Finding |
|---|----------|-----|---------|
| JS-SQL-1 | LOW | CWE-20 | `parseInt(req.params.id)` can return `NaN`. If passed to `SqlBuilder.appendInt32()`, behavior depends on Temper's `Int32` handling. In practice, `NaN` would fail at the ORM level (not a valid Int32), but the app doesn't check for `NaN` before calling ORM functions. |
| JS-SQL-2 | INFO | CWE-89 | ORM-generated SQL is executed via `db.prepare(sql).run()` -- the rendered string is passed as the full statement. While escaping is correct, using `db.prepare()` with `?` placeholders for ORM output too would add defense-in-depth. |
| JS-SQL-3 | INFO | CWE-400 | All SELECT queries use `toSql()` instead of `safeToSql(defaultLimit)`. The ORM provides bounded queries via `safeToSql()` but this app doesn't use them. |

### ORM-Level Concerns (shared across all apps)

| # | Severity | CWE | Finding |
|---|----------|-----|---------|
| ORM-1 | MEDIUM | CWE-89 | `toInsertSql`/`toUpdateSql` pass `pair.key` (a `String`) to `appendSafe`. Safe by construction -- keys come from `cast()` which requires `SafeIdentifier` -- but the type system doesn't enforce this at the call site. |
| ORM-2 | LOW | CWE-89 | `SqlDate.formatTo` wraps `value.toString()` in quotes without escaping. Safe because date format is `YYYY-MM-DD`. |
| ORM-3 | LOW | CWE-20 | `SqlFloat64.formatTo` can produce `NaN`/`Infinity` -- not valid SQL literals. |

---

## JOIN Feature Security Analysis

The ORM recently added JOIN support with four join types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, and `FULL OUTER JOIN`. This section analyzes the security properties of the JOIN implementation.

### Architecture

The JOIN feature adds three new constructs to the ORM:

1. **`JoinType`** -- A sealed interface with four implementations (`InnerJoin`, `LeftJoin`, `RightJoin`, `FullJoin`), each returning a hardcoded SQL keyword string.
2. **`JoinClause`** -- A value object holding `(joinType: JoinType, table: SafeIdentifier, onCondition: SqlFragment)`.
3. **`Query.join()`** / convenience methods (`innerJoin`, `leftJoin`, `rightJoin`, `fullJoin`) -- Immutable builder methods that append `JoinClause` instances to the query.

### SQL Generation Path for JOINs

```
Query.innerJoin(table, onCondition)
  -> JoinClause(InnerJoin(), table, onCondition)
    -> toSql() renders:
      b.appendSafe(" ")                     [hardcoded space]
      b.appendSafe(jc.joinType.keyword())   [hardcoded "INNER JOIN"]
      b.appendSafe(" ")                     [hardcoded space]
      b.appendSafe(jc.table.sqlValue)       [SafeIdentifier-validated table name]
      b.appendSafe(" ON ")                  [hardcoded keyword]
      b.appendFragment(jc.onCondition)      [SqlFragment -- pre-built safe SQL]
```

### Security Properties

| Component | Input Type | Validation | Injection Risk |
|-----------|-----------|------------|----------------|
| JOIN keyword | `JoinType.keyword()` | Sealed interface, hardcoded strings only | None -- `"INNER JOIN"`, `"LEFT JOIN"`, `"RIGHT JOIN"`, `"FULL OUTER JOIN"` are compile-time constants |
| Table name | `SafeIdentifier` | `[a-zA-Z_][a-zA-Z0-9_]*` regex validation at construction | None -- validated at creation; `ValidatedIdentifier` is not exported |
| ON condition | `SqlFragment` | Must be constructed via `SqlBuilder` methods (`appendSafe`, `appendString`, `appendInt32`, etc.) | Depends on how the caller constructs the fragment (see below) |

### ON Condition Analysis

The `onCondition` parameter accepts a `SqlFragment`. This is the same type used for `WHERE` conditions, so the security properties are identical:

**Safe usage patterns (as demonstrated in tests):**
```javascript
// Using col() helper -- both sides are SafeIdentifier-validated
const cond = col(safeIdentifier("users"), safeIdentifier("id"));
// Renders: users.id

// Building ON condition with SqlBuilder
const b = new SqlBuilder();
b.appendFragment(col(sid("users"), sid("id")));
b.appendSafe(" = ");
b.appendFragment(col(sid("orders"), sid("user_id")));
query.innerJoin(sid("orders"), b.accumulated);
// Renders: INNER JOIN orders ON users.id = orders.user_id
```

**The `col()` helper** is a new addition that produces qualified column references (`table.column`) with both components validated as `SafeIdentifier`. This is the recommended way to build ON conditions.

**Potential misuse pattern (not present in this app):**
```javascript
// DANGEROUS -- if someone passed raw user input to appendSafe
const b = new SqlBuilder();
b.appendSafe(userInput);  // BAD -- appendSafe trusts its input
query.innerJoin(sid("orders"), b.accumulated);
```

This is the same risk as exists for WHERE conditions -- `appendSafe` is inherently trusted. The ORM's security model relies on developers never passing user input to `appendSafe`. This is documented in the ORM's security comments and enforced by convention, not by the type system.

### JOIN-Specific Findings

| # | Severity | CWE | Finding |
|---|----------|-----|---------|
| JOIN-1 | INFO | CWE-89 | The `JoinType` sealed interface is well-designed -- the JOIN keyword is a hardcoded string from a closed set of implementations. No user input can influence the JOIN type keyword. |
| JOIN-2 | INFO | CWE-89 | The joined table name requires `SafeIdentifier`, enforcing the same `[a-zA-Z_][a-zA-Z0-9_]*` validation as the primary table. No injection possible through table names. |
| JOIN-3 | LOW | CWE-89 | The ON condition uses `SqlFragment`, which is trusted by construction. The `col()` helper provides a safe way to build qualified column references. However, if a future developer passes raw user input to `SqlBuilder.appendSafe()` when building ON conditions, it would bypass all escaping. This is a design limitation (convention-based safety) shared with WHERE conditions. |
| JOIN-4 | INFO | CWE-400 | JOIN operations can amplify result set sizes (e.g., a many-to-many join can produce O(n*m) rows). The existing `safeToSql(defaultLimit)` mechanism applies LIMIT to the final result, which bounds output size, but intermediate join processing in SQLite is unbounded. For this app, table sizes are small (user-created todo lists) so this is informational only. |
| JOIN-5 | INFO | N/A | This todo app does not currently use the ORM's JOIN feature in any route. The raw SQL aggregate queries in `stmts.allLists` and `stmts.countTodosByList` use subqueries and parameterized raw SQL instead. The JOIN feature is available via the vendored ORM but unused. |

### JOIN Feature Verdict

The JOIN implementation follows the same security patterns as the rest of the ORM. Table names are `SafeIdentifier`-validated, JOIN keywords are hardcoded from a sealed interface, and ON conditions use the same `SqlFragment` type as WHERE conditions. No new attack surface is introduced beyond what already exists in the Query builder.

The `col()` helper function is a positive security addition -- it provides a convenient, safe way to build qualified column references for ON conditions without resorting to raw string manipulation.

---

## SQL-Relevant CWE Mapping

This section maps SQL-related Common Weakness Enumerations (CWE) to this application's status.

| CWE ID | CWE Name | Status | Details |
|--------|----------|--------|---------|
| CWE-89 | Improper Neutralization of Special Elements used in an SQL Command (SQL Injection) | **Mitigated** | All user input to SQL goes through either (a) the ORM's `SafeIdentifier` + `SqlString`/`SqlInt32` escaping pipeline or (b) better-sqlite3 parameterized queries (`?` placeholders). No string concatenation of user input into SQL. See detailed SQL analysis above. |
| CWE-20 | Improper Input Validation | **Partially Mitigated** | `parseInt()` is used for route parameter IDs but `NaN` results are not explicitly checked (see JS-SQL-1). Form inputs are trimmed and checked for emptiness. The ORM's changeset validates required fields and type constraints. However, no length limits are enforced on user-provided `name` or `title` strings at the app level. |
| CWE-400 | Uncontrolled Resource Consumption | **Partially Mitigated** | All SELECT queries use `toSql()` instead of `safeToSql(defaultLimit)`. The ORM provides bounded queries via `safeToSql()` but this app doesn't use them (see JS-SQL-3). JOIN operations can amplify result set sizes but table sizes are small in this app (see JOIN-4). |
| CWE-915 | Improperly Controlled Modification of Dynamically-Determined Object Attributes | **Mitigated** | Changeset field whitelisting via `cast([safeIdentifier("title"), safeIdentifier("list_id")])` ensures only whitelisted columns appear in INSERT/UPDATE. Mass assignment attacks are prevented by the ORM's explicit field list requirement. |
| CWE-190 | Integer Overflow or Wraparound | **Mitigated** | JavaScript's `parseInt()` with radix 10 returns `NaN` for overflow values rather than wrapping. SQLite's INTEGER type handles large values natively. The ORM's `appendInt32()` renders via `.toString()` which produces the correct decimal. |

### Summary

| Status | Count | CWEs |
|--------|-------|------|
| **Mitigated** | 3 | CWE-89, CWE-915, CWE-190 |
| **Partially Mitigated** | 2 | CWE-20, CWE-400 |

---

## Verdict

**No SQL injection vulnerabilities found.** The ORM's type-safe generation covers all user-input-to-SQL paths, and raw SQL consistently uses parameterized queries. The app achieves 100% parameterized raw SQL.

**Total SQL-related findings: 11** (3 app-level, 3 ORM-level, 5 JOIN-specific)

| Category | Critical | High | Medium | Low | Info |
|----------|----------|------|--------|-----|------|
| SQL Injection | 0 | 0 | 0 | 0 | 2 |
| Input Validation | 0 | 0 | 0 | 1 | 0 |
| ORM Core | 0 | 0 | 1 | 2 | 0 |
| JOIN Feature | 0 | 0 | 0 | 1 | 4 |
| **Total** | **0** | **0** | **1** | **4** | **6** |

The app's **SQL security is strong**: SQL injection is comprehensively mitigated through the ORM's type-safe SQL generation. The primary areas for improvement are input validation edge cases (NaN handling) and adopting the ORM's `safeToSql()` method for bounded queries.

---

## Evolution: Temper-Level Remediation

**Date:** 2026-03-12
**Commit:** [`1df8c7a`](https://github.com/notactuallytreyanastasio/generic_orm/commit/1df8c7a)

The security analysis above identified 3 ORM-level concerns (ORM-1, ORM-2, ORM-3) shared across all 6 app implementations. Because the ORM is written once in Temper and compiled to all backends, fixing these issues at the Temper source level automatically resolves them in every language -- including this JavaScript app.

### What Changed

**ORM-1 (MEDIUM -> RESOLVED): Column name type safety in INSERT/UPDATE SQL**

The `toInsertSql()` and `toUpdateSql()` methods previously passed `pair.key` (a raw `String`) to `appendSafe()`. While safe by construction (keys originated from `cast()` via `SafeIdentifier.sqlValue`), the type system didn't enforce this. A future refactor could have silently introduced an unvalidated code path.

The fix routes column names through the looked-up `FieldDef.name.sqlValue` -- a `SafeIdentifier` -- so the column name in the generated SQL always comes from a validated identifier, not a raw map key.

**ORM-2 (LOW -> RESOLVED): SqlDate quote escaping**

`SqlDate.formatTo()` previously wrapped `value.toString()` in quotes without escaping. The fix adds character-by-character quote escaping identical to `SqlString.formatTo()`, ensuring defense-in-depth against any future Date format that might contain single quotes.

**ORM-3 (LOW -> RESOLVED): SqlFloat64 NaN/Infinity handling**

`SqlFloat64.formatTo()` previously called `value.toString()` directly, which could produce `NaN`, `Infinity`, or `-Infinity` -- none valid SQL literals. The fix checks for these values and renders `NULL` instead, which is the safest SQL representation for non-representable floating-point values.

### Why This Matters

This is the core value proposition of a cross-compiled ORM: **one fix in Temper source propagates to all 6 backends simultaneously.** The same commit that fixed the JavaScript compiled output also fixed Python, Rust, Java, Lua, and C#. No per-language patches needed. No risk of inconsistent fixes across implementations.

### Updated Status

| Finding | Original | Current | Resolution |
|---------|----------|---------|------------|
| ORM-1 | MEDIUM | RESOLVED | Column names routed through `SafeIdentifier` |
| ORM-2 | LOW | RESOLVED | `SqlDate.formatTo()` now escapes quotes |
| ORM-3 | LOW | RESOLVED | `SqlFloat64.formatTo()` renders NaN/Infinity as `NULL` |
| ORM-4 | INFO | ACKNOWLEDGED | Design limitation -- escaping-based, not parameterized |
