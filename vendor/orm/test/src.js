import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, changeset, from, safeIdentifier
} from "../src.js";
import {
  Test as Test_452
} from "@temperlang/std/testing";
import {
  panic as panic_449, mapConstructor as mapConstructor_430, pairConstructor as pairConstructor_454, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_446
 * @returns {SafeIdentifier}
 */
function csid_445(name_446) {
  let return_447;
  let t_448;
  try {
    t_448 = safeIdentifier(name_446);
    return_447 = t_448;
  } catch {
    return_447 = panic_449();
  }
  return return_447;
}
/** @returns {TableDef} */
function userTable_450() {
  return new TableDef(csid_445("users"), Object.freeze([new FieldDef(csid_445("name"), new StringField(), false), new FieldDef(csid_445("email"), new StringField(), false), new FieldDef(csid_445("age"), new IntField(), true), new FieldDef(csid_445("score"), new FloatField(), true), new FieldDef(csid_445("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_451 = new Test_452();
    try {
      const params_453 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Alice"), pairConstructor_454("email", "alice@example.com"), pairConstructor_454("admin", "true")]));
      let t_455 = userTable_450();
      let t_456 = csid_445("name");
      let t_457 = csid_445("email");
      const cs_458 = changeset(t_455, params_453).cast(Object.freeze([t_456, t_457]));
      let t_459 = cs_458.changes.has("name");
      function fn_460() {
        return "name should be in changes";
      }
      test_451.assert(t_459, fn_460);
      let t_461 = cs_458.changes.has("email");
      function fn_462() {
        return "email should be in changes";
      }
      test_451.assert(t_461, fn_462);
      let t_463 = ! cs_458.changes.has("admin");
      function fn_464() {
        return "admin must be dropped (not in whitelist)";
      }
      test_451.assert(t_463, fn_464);
      let t_465 = cs_458.isValid;
      function fn_466() {
        return "should still be valid";
      }
      test_451.assert(t_465, fn_466);
      return;
    } finally {
      test_451.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_467 = new Test_452();
    try {
      const params_468 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Alice"), pairConstructor_454("email", "alice@example.com")]));
      let t_469 = userTable_450();
      let t_470 = csid_445("name");
      const cs_471 = changeset(t_469, params_468).cast(Object.freeze([t_470])).cast(Object.freeze([csid_445("email")]));
      let t_472 = ! cs_471.changes.has("name");
      function fn_473() {
        return "name must be excluded by second cast";
      }
      test_467.assert(t_472, fn_473);
      let t_474 = cs_471.changes.has("email");
      function fn_475() {
        return "email should be present";
      }
      test_467.assert(t_474, fn_475);
      return;
    } finally {
      test_467.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_476 = new Test_452();
    try {
      const params_477 = mapConstructor_430(Object.freeze([pairConstructor_454("name", ""), pairConstructor_454("email", "bob@example.com")]));
      let t_478 = userTable_450();
      let t_479 = csid_445("name");
      let t_480 = csid_445("email");
      const cs_481 = changeset(t_478, params_477).cast(Object.freeze([t_479, t_480]));
      let t_482 = ! cs_481.changes.has("name");
      function fn_483() {
        return "empty name should not be in changes";
      }
      test_476.assert(t_482, fn_483);
      let t_484 = cs_481.changes.has("email");
      function fn_485() {
        return "email should be in changes";
      }
      test_476.assert(t_484, fn_485);
      return;
    } finally {
      test_476.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_486 = new Test_452();
    try {
      const params_487 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Alice")]));
      let t_488 = userTable_450();
      let t_489 = csid_445("name");
      const cs_490 = changeset(t_488, params_487).cast(Object.freeze([t_489])).validateRequired(Object.freeze([csid_445("name")]));
      let t_491 = cs_490.isValid;
      function fn_492() {
        return "should be valid";
      }
      test_486.assert(t_491, fn_492);
      let t_493 = cs_490.errors.length === 0;
      function fn_494() {
        return "no errors expected";
      }
      test_486.assert(t_493, fn_494);
      return;
    } finally {
      test_486.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_495 = new Test_452();
    try {
      const params_496 = mapConstructor_430(Object.freeze([]));
      let t_497 = userTable_450();
      let t_498 = csid_445("name");
      const cs_499 = changeset(t_497, params_496).cast(Object.freeze([t_498])).validateRequired(Object.freeze([csid_445("name")]));
      let t_500 = ! cs_499.isValid;
      function fn_501() {
        return "should be invalid";
      }
      test_495.assert(t_500, fn_501);
      let t_502 = cs_499.errors.length === 1;
      function fn_503() {
        return "should have one error";
      }
      test_495.assert(t_502, fn_503);
      let t_504 = listedGet_179(cs_499.errors, 0).field === "name";
      function fn_505() {
        return "error should name the field";
      }
      test_495.assert(t_504, fn_505);
      return;
    } finally {
      test_495.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_506 = new Test_452();
    try {
      const params_507 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Alice")]));
      let t_508 = userTable_450();
      let t_509 = csid_445("name");
      const cs_510 = changeset(t_508, params_507).cast(Object.freeze([t_509])).validateLength(csid_445("name"), 2, 50);
      let t_511 = cs_510.isValid;
      function fn_512() {
        return "should be valid";
      }
      test_506.assert(t_511, fn_512);
      return;
    } finally {
      test_506.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_513 = new Test_452();
    try {
      const params_514 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "A")]));
      let t_515 = userTable_450();
      let t_516 = csid_445("name");
      const cs_517 = changeset(t_515, params_514).cast(Object.freeze([t_516])).validateLength(csid_445("name"), 2, 50);
      let t_518 = ! cs_517.isValid;
      function fn_519() {
        return "should be invalid";
      }
      test_513.assert(t_518, fn_519);
      return;
    } finally {
      test_513.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_520 = new Test_452();
    try {
      const params_521 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_522 = userTable_450();
      let t_523 = csid_445("name");
      const cs_524 = changeset(t_522, params_521).cast(Object.freeze([t_523])).validateLength(csid_445("name"), 2, 10);
      let t_525 = ! cs_524.isValid;
      function fn_526() {
        return "should be invalid";
      }
      test_520.assert(t_525, fn_526);
      return;
    } finally {
      test_520.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_527 = new Test_452();
    try {
      const params_528 = mapConstructor_430(Object.freeze([pairConstructor_454("age", "30")]));
      let t_529 = userTable_450();
      let t_530 = csid_445("age");
      const cs_531 = changeset(t_529, params_528).cast(Object.freeze([t_530])).validateInt(csid_445("age"));
      let t_532 = cs_531.isValid;
      function fn_533() {
        return "should be valid";
      }
      test_527.assert(t_532, fn_533);
      return;
    } finally {
      test_527.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_534 = new Test_452();
    try {
      const params_535 = mapConstructor_430(Object.freeze([pairConstructor_454("age", "not-a-number")]));
      let t_536 = userTable_450();
      let t_537 = csid_445("age");
      const cs_538 = changeset(t_536, params_535).cast(Object.freeze([t_537])).validateInt(csid_445("age"));
      let t_539 = ! cs_538.isValid;
      function fn_540() {
        return "should be invalid";
      }
      test_534.assert(t_539, fn_540);
      return;
    } finally {
      test_534.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_541 = new Test_452();
    try {
      const params_542 = mapConstructor_430(Object.freeze([pairConstructor_454("score", "9.5")]));
      let t_543 = userTable_450();
      let t_544 = csid_445("score");
      const cs_545 = changeset(t_543, params_542).cast(Object.freeze([t_544])).validateFloat(csid_445("score"));
      let t_546 = cs_545.isValid;
      function fn_547() {
        return "should be valid";
      }
      test_541.assert(t_546, fn_547);
      return;
    } finally {
      test_541.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_548 = new Test_452();
    try {
      const params_549 = mapConstructor_430(Object.freeze([pairConstructor_454("age", "9999999999")]));
      let t_550 = userTable_450();
      let t_551 = csid_445("age");
      const cs_552 = changeset(t_550, params_549).cast(Object.freeze([t_551])).validateInt64(csid_445("age"));
      let t_553 = cs_552.isValid;
      function fn_554() {
        return "should be valid";
      }
      test_548.assert(t_553, fn_554);
      return;
    } finally {
      test_548.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_555 = new Test_452();
    try {
      const params_556 = mapConstructor_430(Object.freeze([pairConstructor_454("age", "not-a-number")]));
      let t_557 = userTable_450();
      let t_558 = csid_445("age");
      const cs_559 = changeset(t_557, params_556).cast(Object.freeze([t_558])).validateInt64(csid_445("age"));
      let t_560 = ! cs_559.isValid;
      function fn_561() {
        return "should be invalid";
      }
      test_555.assert(t_560, fn_561);
      return;
    } finally {
      test_555.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_562 = new Test_452();
    try {
      function fn_563(v_564) {
        const params_565 = mapConstructor_430(Object.freeze([pairConstructor_454("active", v_564)]));
        let t_566 = userTable_450();
        let t_567 = csid_445("active");
        const cs_568 = changeset(t_566, params_565).cast(Object.freeze([t_567])).validateBool(csid_445("active"));
        let t_569 = cs_568.isValid;
        function fn_570() {
          return "should accept: " + v_564;
        }
        test_562.assert(t_569, fn_570);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_563);
      return;
    } finally {
      test_562.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_571 = new Test_452();
    try {
      function fn_572(v_573) {
        const params_574 = mapConstructor_430(Object.freeze([pairConstructor_454("active", v_573)]));
        let t_575 = userTable_450();
        let t_576 = csid_445("active");
        const cs_577 = changeset(t_575, params_574).cast(Object.freeze([t_576])).validateBool(csid_445("active"));
        let t_578 = cs_577.isValid;
        function fn_579() {
          return "should accept: " + v_573;
        }
        test_571.assert(t_578, fn_579);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_572);
      return;
    } finally {
      test_571.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_580 = new Test_452();
    try {
      function fn_581(v_582) {
        const params_583 = mapConstructor_430(Object.freeze([pairConstructor_454("active", v_582)]));
        let t_584 = userTable_450();
        let t_585 = csid_445("active");
        const cs_586 = changeset(t_584, params_583).cast(Object.freeze([t_585])).validateBool(csid_445("active"));
        let t_587 = ! cs_586.isValid;
        function fn_588() {
          return "should reject ambiguous: " + v_582;
        }
        test_580.assert(t_587, fn_588);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_581);
      return;
    } finally {
      test_580.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_589 = new Test_452();
    try {
      let t_590;
      const params_591 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Robert'); DROP TABLE users;--"), pairConstructor_454("email", "bobby@evil.com")]));
      let t_592 = userTable_450();
      let t_593 = csid_445("name");
      let t_594 = csid_445("email");
      const cs_595 = changeset(t_592, params_591).cast(Object.freeze([t_593, t_594])).validateRequired(Object.freeze([csid_445("name"), csid_445("email")]));
      let sqlFrag_596;
      try {
        t_590 = cs_595.toInsertSql();
        sqlFrag_596 = t_590;
      } catch {
        sqlFrag_596 = panic_449();
      }
      const s_597 = sqlFrag_596.toString();
      let t_598 = s_597.indexOf("''") >= 0;
      function fn_599() {
        return "single quote must be doubled: " + s_597;
      }
      test_589.assert(t_598, fn_599);
      return;
    } finally {
      test_589.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_600 = new Test_452();
    try {
      let t_601;
      const params_602 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Alice"), pairConstructor_454("email", "a@example.com")]));
      let t_603 = userTable_450();
      let t_604 = csid_445("name");
      let t_605 = csid_445("email");
      const cs_606 = changeset(t_603, params_602).cast(Object.freeze([t_604, t_605])).validateRequired(Object.freeze([csid_445("name"), csid_445("email")]));
      let sqlFrag_607;
      try {
        t_601 = cs_606.toInsertSql();
        sqlFrag_607 = t_601;
      } catch {
        sqlFrag_607 = panic_449();
      }
      const s_608 = sqlFrag_607.toString();
      let t_609 = s_608.indexOf("INSERT INTO users") >= 0;
      function fn_610() {
        return "has INSERT INTO: " + s_608;
      }
      test_600.assert(t_609, fn_610);
      let t_611 = s_608.indexOf("'Alice'") >= 0;
      function fn_612() {
        return "has quoted name: " + s_608;
      }
      test_600.assert(t_611, fn_612);
      return;
    } finally {
      test_600.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_613 = new Test_452();
    try {
      let t_614;
      const params_615 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Bob"), pairConstructor_454("email", "b@example.com"), pairConstructor_454("age", "25")]));
      let t_616 = userTable_450();
      let t_617 = csid_445("name");
      let t_618 = csid_445("email");
      let t_619 = csid_445("age");
      const cs_620 = changeset(t_616, params_615).cast(Object.freeze([t_617, t_618, t_619])).validateRequired(Object.freeze([csid_445("name"), csid_445("email")]));
      let sqlFrag_621;
      try {
        t_614 = cs_620.toInsertSql();
        sqlFrag_621 = t_614;
      } catch {
        sqlFrag_621 = panic_449();
      }
      const s_622 = sqlFrag_621.toString();
      let t_623 = s_622.indexOf("25") >= 0;
      function fn_624() {
        return "age rendered unquoted: " + s_622;
      }
      test_613.assert(t_623, fn_624);
      return;
    } finally {
      test_613.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_625 = new Test_452();
    try {
      const params_626 = mapConstructor_430(Object.freeze([]));
      let t_627 = userTable_450();
      let t_628 = csid_445("name");
      const cs_629 = changeset(t_627, params_626).cast(Object.freeze([t_628])).validateRequired(Object.freeze([csid_445("name")]));
      let didBubble_630;
      try {
        cs_629.toInsertSql();
        didBubble_630 = false;
      } catch {
        didBubble_630 = true;
      }
      function fn_631() {
        return "invalid changeset should bubble";
      }
      test_625.assert(didBubble_630, fn_631);
      return;
    } finally {
      test_625.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_632 = new Test_452();
    try {
      const strictTable_633 = new TableDef(csid_445("posts"), Object.freeze([new FieldDef(csid_445("title"), new StringField(), false), new FieldDef(csid_445("body"), new StringField(), true)]));
      const params_634 = mapConstructor_430(Object.freeze([pairConstructor_454("body", "hello")]));
      let t_635 = csid_445("body");
      const cs_636 = changeset(strictTable_633, params_634).cast(Object.freeze([t_635]));
      let t_637 = cs_636.isValid;
      function fn_638() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_632.assert(t_637, fn_638);
      let didBubble_639;
      try {
        cs_636.toInsertSql();
        didBubble_639 = false;
      } catch {
        didBubble_639 = true;
      }
      function fn_640() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_632.assert(didBubble_639, fn_640);
      return;
    } finally {
      test_632.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_641 = new Test_452();
    try {
      let t_642;
      const params_643 = mapConstructor_430(Object.freeze([pairConstructor_454("name", "Bob")]));
      let t_644 = userTable_450();
      let t_645 = csid_445("name");
      const cs_646 = changeset(t_644, params_643).cast(Object.freeze([t_645])).validateRequired(Object.freeze([csid_445("name")]));
      let sqlFrag_647;
      try {
        t_642 = cs_646.toUpdateSql(42);
        sqlFrag_647 = t_642;
      } catch {
        sqlFrag_647 = panic_449();
      }
      const s_648 = sqlFrag_647.toString();
      let t_649 = s_648 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_650() {
        return "got: " + s_648;
      }
      test_641.assert(t_649, fn_650);
      return;
    } finally {
      test_641.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_651 = new Test_452();
    try {
      const params_652 = mapConstructor_430(Object.freeze([]));
      let t_653 = userTable_450();
      let t_654 = csid_445("name");
      const cs_655 = changeset(t_653, params_652).cast(Object.freeze([t_654])).validateRequired(Object.freeze([csid_445("name")]));
      let didBubble_656;
      try {
        cs_655.toUpdateSql(1);
        didBubble_656 = false;
      } catch {
        didBubble_656 = true;
      }
      function fn_657() {
        return "invalid changeset should bubble";
      }
      test_651.assert(didBubble_656, fn_657);
      return;
    } finally {
      test_651.softFailToHard();
    }
});
/**
 * @param {string} name_663
 * @returns {SafeIdentifier}
 */
function sid_662(name_663) {
  let return_664;
  let t_665;
  try {
    t_665 = safeIdentifier(name_663);
    return_664 = t_665;
  } catch {
    return_664 = panic_449();
  }
  return return_664;
}
it("bare from produces SELECT *", function () {
    const test_666 = new Test_452();
    try {
      const q_667 = from(sid_662("users"));
      let t_668 = q_667.toSql().toString() === "SELECT * FROM users";
      function fn_669() {
        return "bare query";
      }
      test_666.assert(t_668, fn_669);
      return;
    } finally {
      test_666.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_670 = new Test_452();
    try {
      let t_671 = sid_662("users");
      let t_672 = sid_662("id");
      let t_673 = sid_662("name");
      const q_674 = from(t_671).select(Object.freeze([t_672, t_673]));
      let t_675 = q_674.toSql().toString() === "SELECT id, name FROM users";
      function fn_676() {
        return "select columns";
      }
      test_670.assert(t_675, fn_676);
      return;
    } finally {
      test_670.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_677 = new Test_452();
    try {
      let t_678 = sid_662("users");
      let t_679 = new SqlBuilder();
      t_679.appendSafe("age > ");
      t_679.appendInt32(18);
      let t_680 = t_679.accumulated;
      const q_681 = from(t_678).where(t_680);
      let t_682 = q_681.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_683() {
        return "where int";
      }
      test_677.assert(t_682, fn_683);
      return;
    } finally {
      test_677.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_684 = new Test_452();
    try {
      let t_685 = sid_662("users");
      let t_686 = new SqlBuilder();
      t_686.appendSafe("active = ");
      t_686.appendBoolean(true);
      let t_687 = t_686.accumulated;
      const q_688 = from(t_685).where(t_687);
      let t_689 = q_688.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_690() {
        return "where bool";
      }
      test_684.assert(t_689, fn_690);
      return;
    } finally {
      test_684.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_691 = new Test_452();
    try {
      let t_692 = sid_662("users");
      let t_693 = new SqlBuilder();
      t_693.appendSafe("age > ");
      t_693.appendInt32(18);
      let t_694 = t_693.accumulated;
      let t_695 = from(t_692).where(t_694);
      let t_696 = new SqlBuilder();
      t_696.appendSafe("active = ");
      t_696.appendBoolean(true);
      const q_697 = t_695.where(t_696.accumulated);
      let t_698 = q_697.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_699() {
        return "chained where";
      }
      test_691.assert(t_698, fn_699);
      return;
    } finally {
      test_691.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_700 = new Test_452();
    try {
      let t_701 = sid_662("users");
      let t_702 = sid_662("name");
      const q_703 = from(t_701).orderBy(t_702, true);
      let t_704 = q_703.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_705() {
        return "order asc";
      }
      test_700.assert(t_704, fn_705);
      return;
    } finally {
      test_700.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_706 = new Test_452();
    try {
      let t_707 = sid_662("users");
      let t_708 = sid_662("created_at");
      const q_709 = from(t_707).orderBy(t_708, false);
      let t_710 = q_709.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_711() {
        return "order desc";
      }
      test_706.assert(t_710, fn_711);
      return;
    } finally {
      test_706.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_712 = new Test_452();
    try {
      let t_713;
      let t_714;
      let q_715;
      try {
        t_713 = from(sid_662("users")).limit(10);
        t_714 = t_713.offset(20);
        q_715 = t_714;
      } catch {
        q_715 = panic_449();
      }
      let t_716 = q_715.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_717() {
        return "limit/offset";
      }
      test_712.assert(t_716, fn_717);
      return;
    } finally {
      test_712.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_718 = new Test_452();
    try {
      let didBubble_719;
      try {
        from(sid_662("users")).limit(-1);
        didBubble_719 = false;
      } catch {
        didBubble_719 = true;
      }
      function fn_720() {
        return "negative limit should bubble";
      }
      test_718.assert(didBubble_719, fn_720);
      return;
    } finally {
      test_718.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_721 = new Test_452();
    try {
      let didBubble_722;
      try {
        from(sid_662("users")).offset(-1);
        didBubble_722 = false;
      } catch {
        didBubble_722 = true;
      }
      function fn_723() {
        return "negative offset should bubble";
      }
      test_721.assert(didBubble_722, fn_723);
      return;
    } finally {
      test_721.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_724 = new Test_452();
    try {
      let t_725;
      let t_726;
      let t_727;
      let t_728;
      let t_729;
      let t_730;
      let t_731;
      let t_732;
      let t_733;
      let t_734;
      const minAge_735 = 21;
      let q_736;
      try {
        t_725 = sid_662("users");
        t_726 = sid_662("id");
        t_727 = sid_662("name");
        t_728 = sid_662("email");
        t_729 = from(t_725).select(Object.freeze([t_726, t_727, t_728]));
        t_730 = new SqlBuilder();
        t_730.appendSafe("age >= ");
        t_730.appendInt32(21);
        t_731 = t_729.where(t_730.accumulated);
        t_732 = new SqlBuilder();
        t_732.appendSafe("active = ");
        t_732.appendBoolean(true);
        t_733 = t_731.where(t_732.accumulated).orderBy(sid_662("name"), true).limit(25);
        t_734 = t_733.offset(0);
        q_736 = t_734;
      } catch {
        q_736 = panic_449();
      }
      let t_737 = q_736.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_738() {
        return "complex query";
      }
      test_724.assert(t_737, fn_738);
      return;
    } finally {
      test_724.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_739 = new Test_452();
    try {
      let t_740;
      let t_741;
      const q_742 = from(sid_662("users"));
      try {
        t_740 = q_742.safeToSql(100);
        t_741 = t_740;
      } catch {
        t_741 = panic_449();
      }
      const s_743 = t_741.toString();
      let t_744 = s_743 === "SELECT * FROM users LIMIT 100";
      function fn_745() {
        return "should have limit: " + s_743;
      }
      test_739.assert(t_744, fn_745);
      return;
    } finally {
      test_739.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_746 = new Test_452();
    try {
      let t_747;
      let t_748;
      let t_749;
      let q_750;
      try {
        t_747 = from(sid_662("users")).limit(5);
        q_750 = t_747;
      } catch {
        q_750 = panic_449();
      }
      try {
        t_748 = q_750.safeToSql(100);
        t_749 = t_748;
      } catch {
        t_749 = panic_449();
      }
      const s_751 = t_749.toString();
      let t_752 = s_751 === "SELECT * FROM users LIMIT 5";
      function fn_753() {
        return "explicit limit preserved: " + s_751;
      }
      test_746.assert(t_752, fn_753);
      return;
    } finally {
      test_746.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_754 = new Test_452();
    try {
      let didBubble_755;
      try {
        from(sid_662("users")).safeToSql(-1);
        didBubble_755 = false;
      } catch {
        didBubble_755 = true;
      }
      function fn_756() {
        return "negative defaultLimit should bubble";
      }
      test_754.assert(didBubble_755, fn_756);
      return;
    } finally {
      test_754.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_757 = new Test_452();
    try {
      const evil_758 = "'; DROP TABLE users; --";
      let t_759 = sid_662("users");
      let t_760 = new SqlBuilder();
      t_760.appendSafe("name = ");
      t_760.appendString("'; DROP TABLE users; --");
      let t_761 = t_760.accumulated;
      const q_762 = from(t_759).where(t_761);
      const s_763 = q_762.toSql().toString();
      let t_764 = s_763.indexOf("''") >= 0;
      function fn_765() {
        return "quotes must be doubled: " + s_763;
      }
      test_757.assert(t_764, fn_765);
      let t_766 = s_763.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_767() {
        return "structure intact: " + s_763;
      }
      test_757.assert(t_766, fn_767);
      return;
    } finally {
      test_757.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_768 = new Test_452();
    try {
      const attack_769 = "users; DROP TABLE users; --";
      let didBubble_770;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_770 = false;
      } catch {
        didBubble_770 = true;
      }
      function fn_771() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_768.assert(didBubble_770, fn_771);
      return;
    } finally {
      test_768.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_772 = new Test_452();
    try {
      let t_773;
      let id_774;
      try {
        t_773 = safeIdentifier("user_name");
        id_774 = t_773;
      } catch {
        id_774 = panic_449();
      }
      let t_775 = id_774.sqlValue === "user_name";
      function fn_776() {
        return "value should round-trip";
      }
      test_772.assert(t_775, fn_776);
      return;
    } finally {
      test_772.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_777 = new Test_452();
    try {
      let didBubble_778;
      try {
        safeIdentifier("");
        didBubble_778 = false;
      } catch {
        didBubble_778 = true;
      }
      function fn_779() {
        return "empty string should bubble";
      }
      test_777.assert(didBubble_778, fn_779);
      return;
    } finally {
      test_777.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_780 = new Test_452();
    try {
      let didBubble_781;
      try {
        safeIdentifier("1col");
        didBubble_781 = false;
      } catch {
        didBubble_781 = true;
      }
      function fn_782() {
        return "leading digit should bubble";
      }
      test_780.assert(didBubble_781, fn_782);
      return;
    } finally {
      test_780.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_783 = new Test_452();
    try {
      const cases_784 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_785(c_786) {
        let didBubble_787;
        try {
          safeIdentifier(c_786);
          didBubble_787 = false;
        } catch {
          didBubble_787 = true;
        }
        function fn_788() {
          return "should reject: " + c_786;
        }
        test_783.assert(didBubble_787, fn_788);
        return;
      }
      cases_784.forEach(fn_785);
      return;
    } finally {
      test_783.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_789 = new Test_452();
    try {
      let t_790;
      let t_791;
      let t_792;
      let t_793;
      let t_794;
      let t_795;
      let t_796;
      try {
        t_790 = safeIdentifier("users");
        t_791 = t_790;
      } catch {
        t_791 = panic_449();
      }
      try {
        t_792 = safeIdentifier("name");
        t_793 = t_792;
      } catch {
        t_793 = panic_449();
      }
      let t_797 = new StringField();
      let t_798 = new FieldDef(t_793, t_797, false);
      try {
        t_794 = safeIdentifier("age");
        t_795 = t_794;
      } catch {
        t_795 = panic_449();
      }
      let t_799 = new IntField();
      let t_800 = new FieldDef(t_795, t_799, false);
      const td_801 = new TableDef(t_791, Object.freeze([t_798, t_800]));
      let f_802;
      try {
        t_796 = td_801.field("age");
        f_802 = t_796;
      } catch {
        f_802 = panic_449();
      }
      let t_803 = f_802.name.sqlValue === "age";
      function fn_804() {
        return "should find age field";
      }
      test_789.assert(t_803, fn_804);
      return;
    } finally {
      test_789.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_805 = new Test_452();
    try {
      let t_806;
      let t_807;
      let t_808;
      let t_809;
      try {
        t_806 = safeIdentifier("users");
        t_807 = t_806;
      } catch {
        t_807 = panic_449();
      }
      try {
        t_808 = safeIdentifier("name");
        t_809 = t_808;
      } catch {
        t_809 = panic_449();
      }
      let t_810 = new StringField();
      let t_811 = new FieldDef(t_809, t_810, false);
      const td_812 = new TableDef(t_807, Object.freeze([t_811]));
      let didBubble_813;
      try {
        td_812.field("nonexistent");
        didBubble_813 = false;
      } catch {
        didBubble_813 = true;
      }
      function fn_814() {
        return "unknown field should bubble";
      }
      test_805.assert(didBubble_813, fn_814);
      return;
    } finally {
      test_805.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_815 = new Test_452();
    try {
      let t_816;
      let t_817;
      let t_818;
      let t_819;
      try {
        t_816 = safeIdentifier("email");
        t_817 = t_816;
      } catch {
        t_817 = panic_449();
      }
      let t_820 = new StringField();
      const required_821 = new FieldDef(t_817, t_820, false);
      try {
        t_818 = safeIdentifier("bio");
        t_819 = t_818;
      } catch {
        t_819 = panic_449();
      }
      let t_822 = new StringField();
      const optional_823 = new FieldDef(t_819, t_822, true);
      let t_824 = ! required_821.nullable;
      function fn_825() {
        return "required field should not be nullable";
      }
      test_815.assert(t_824, fn_825);
      let t_826 = optional_823.nullable;
      function fn_827() {
        return "optional field should be nullable";
      }
      test_815.assert(t_826, fn_827);
      return;
    } finally {
      test_815.softFailToHard();
    }
});
it("string escaping", function () {
    const test_828 = new Test_452();
    try {
      function build_829(name_830) {
        let t_831 = new SqlBuilder();
        t_831.appendSafe("select * from hi where name = ");
        t_831.appendString(name_830);
        return t_831.accumulated.toString();
      }
      function buildWrong_832(name_833) {
        return "select * from hi where name = '" + name_833 + "'";
      }
      const actual_834 = build_829("world");
      let t_835 = actual_834 === "select * from hi where name = 'world'";
      function fn_836() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_834 + ")";
      }
      test_828.assert(t_835, fn_836);
      const bobbyTables_837 = "Robert'); drop table hi;--";
      const actual_838 = build_829("Robert'); drop table hi;--");
      let t_839 = actual_838 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_840() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_838 + ")";
      }
      test_828.assert(t_839, fn_840);
      function fn_841() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_828.assert(true, fn_841);
      return;
    } finally {
      test_828.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_842 = new Test_452();
    try {
      let t_843 = new SqlBuilder();
      t_843.appendSafe("v = ");
      t_843.appendString("");
      const actual_844 = t_843.accumulated.toString();
      let t_845 = actual_844 === "v = ''";
      function fn_846() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_844 + ")";
      }
      test_842.assert(t_845, fn_846);
      let t_847 = new SqlBuilder();
      t_847.appendSafe("v = ");
      t_847.appendString("a''b");
      const actual_848 = t_847.accumulated.toString();
      let t_849 = actual_848 === "v = 'a''''b'";
      function fn_850() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_848 + ")";
      }
      test_842.assert(t_849, fn_850);
      let t_851 = new SqlBuilder();
      t_851.appendSafe("v = ");
      t_851.appendString("Hello 世界");
      const actual_852 = t_851.accumulated.toString();
      let t_853 = actual_852 === "v = 'Hello 世界'";
      function fn_854() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_852 + ")";
      }
      test_842.assert(t_853, fn_854);
      let t_855 = new SqlBuilder();
      t_855.appendSafe("v = ");
      t_855.appendString("Line1\nLine2");
      const actual_856 = t_855.accumulated.toString();
      let t_857 = actual_856 === "v = 'Line1\nLine2'";
      function fn_858() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_856 + ")";
      }
      test_842.assert(t_857, fn_858);
      return;
    } finally {
      test_842.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_859 = new Test_452();
    try {
      let t_860;
      let t_861 = new SqlBuilder();
      t_861.appendSafe("select ");
      t_861.appendInt32(42);
      t_861.appendSafe(", ");
      t_861.appendInt64(BigInt("43"));
      t_861.appendSafe(", ");
      t_861.appendFloat64(19.99);
      t_861.appendSafe(", ");
      t_861.appendBoolean(true);
      t_861.appendSafe(", ");
      t_861.appendBoolean(false);
      const actual_862 = t_861.accumulated.toString();
      let t_863 = actual_862 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_864() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_862 + ")";
      }
      test_859.assert(t_863, fn_864);
      let date_865;
      try {
        t_860 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_865 = t_860;
      } catch {
        date_865 = panic_449();
      }
      let t_866 = new SqlBuilder();
      t_866.appendSafe("insert into t values (");
      t_866.appendDate(date_865);
      t_866.appendSafe(")");
      const actual_867 = t_866.accumulated.toString();
      let t_868 = actual_867 === "insert into t values ('2024-12-25')";
      function fn_869() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_867 + ")";
      }
      test_859.assert(t_868, fn_869);
      return;
    } finally {
      test_859.softFailToHard();
    }
});
it("lists", function () {
    const test_870 = new Test_452();
    try {
      let t_871;
      let t_872;
      let t_873;
      let t_874;
      let t_875 = new SqlBuilder();
      t_875.appendSafe("v IN (");
      t_875.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_875.appendSafe(")");
      const actual_876 = t_875.accumulated.toString();
      let t_877 = actual_876 === "v IN ('a', 'b', 'c''d')";
      function fn_878() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_876 + ")";
      }
      test_870.assert(t_877, fn_878);
      let t_879 = new SqlBuilder();
      t_879.appendSafe("v IN (");
      t_879.appendInt32List(Object.freeze([1, 2, 3]));
      t_879.appendSafe(")");
      const actual_880 = t_879.accumulated.toString();
      let t_881 = actual_880 === "v IN (1, 2, 3)";
      function fn_882() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_880 + ")";
      }
      test_870.assert(t_881, fn_882);
      let t_883 = new SqlBuilder();
      t_883.appendSafe("v IN (");
      t_883.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_883.appendSafe(")");
      const actual_884 = t_883.accumulated.toString();
      let t_885 = actual_884 === "v IN (1, 2)";
      function fn_886() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_884 + ")";
      }
      test_870.assert(t_885, fn_886);
      let t_887 = new SqlBuilder();
      t_887.appendSafe("v IN (");
      t_887.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_887.appendSafe(")");
      const actual_888 = t_887.accumulated.toString();
      let t_889 = actual_888 === "v IN (1.0, 2.0)";
      function fn_890() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_888 + ")";
      }
      test_870.assert(t_889, fn_890);
      let t_891 = new SqlBuilder();
      t_891.appendSafe("v IN (");
      t_891.appendBooleanList(Object.freeze([true, false]));
      t_891.appendSafe(")");
      const actual_892 = t_891.accumulated.toString();
      let t_893 = actual_892 === "v IN (TRUE, FALSE)";
      function fn_894() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_892 + ")";
      }
      test_870.assert(t_893, fn_894);
      try {
        t_871 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_872 = t_871;
      } catch {
        t_872 = panic_449();
      }
      try {
        t_873 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_874 = t_873;
      } catch {
        t_874 = panic_449();
      }
      const dates_895 = Object.freeze([t_872, t_874]);
      let t_896 = new SqlBuilder();
      t_896.appendSafe("v IN (");
      t_896.appendDateList(dates_895);
      t_896.appendSafe(")");
      const actual_897 = t_896.accumulated.toString();
      let t_898 = actual_897 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_899() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_897 + ")";
      }
      test_870.assert(t_898, fn_899);
      return;
    } finally {
      test_870.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_900 = new Test_452();
    try {
      let nan_901;
      nan_901 = 0.0 / 0.0;
      let t_902 = new SqlBuilder();
      t_902.appendSafe("v = ");
      t_902.appendFloat64(nan_901);
      const actual_903 = t_902.accumulated.toString();
      let t_904 = actual_903 === "v = NULL";
      function fn_905() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_903 + ")";
      }
      test_900.assert(t_904, fn_905);
      return;
    } finally {
      test_900.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_906 = new Test_452();
    try {
      let inf_907;
      inf_907 = 1.0 / 0.0;
      let t_908 = new SqlBuilder();
      t_908.appendSafe("v = ");
      t_908.appendFloat64(inf_907);
      const actual_909 = t_908.accumulated.toString();
      let t_910 = actual_909 === "v = NULL";
      function fn_911() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_909 + ")";
      }
      test_906.assert(t_910, fn_911);
      return;
    } finally {
      test_906.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_912 = new Test_452();
    try {
      let ninf_913;
      ninf_913 = -1.0 / 0.0;
      let t_914 = new SqlBuilder();
      t_914.appendSafe("v = ");
      t_914.appendFloat64(ninf_913);
      const actual_915 = t_914.accumulated.toString();
      let t_916 = actual_915 === "v = NULL";
      function fn_917() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_915 + ")";
      }
      test_912.assert(t_916, fn_917);
      return;
    } finally {
      test_912.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_918 = new Test_452();
    try {
      let t_919 = new SqlBuilder();
      t_919.appendSafe("v = ");
      t_919.appendFloat64(3.14);
      const actual_920 = t_919.accumulated.toString();
      let t_921 = actual_920 === "v = 3.14";
      function fn_922() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_920 + ")";
      }
      test_918.assert(t_921, fn_922);
      let t_923 = new SqlBuilder();
      t_923.appendSafe("v = ");
      t_923.appendFloat64(0.0);
      const actual_924 = t_923.accumulated.toString();
      let t_925 = actual_924 === "v = 0.0";
      function fn_926() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_924 + ")";
      }
      test_918.assert(t_925, fn_926);
      let t_927 = new SqlBuilder();
      t_927.appendSafe("v = ");
      t_927.appendFloat64(-42.5);
      const actual_928 = t_927.accumulated.toString();
      let t_929 = actual_928 === "v = -42.5";
      function fn_930() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_928 + ")";
      }
      test_918.assert(t_929, fn_930);
      return;
    } finally {
      test_918.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_931 = new Test_452();
    try {
      let t_932;
      let d_933;
      try {
        t_932 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_933 = t_932;
      } catch {
        d_933 = panic_449();
      }
      let t_934 = new SqlBuilder();
      t_934.appendSafe("v = ");
      t_934.appendDate(d_933);
      const actual_935 = t_934.accumulated.toString();
      let t_936 = actual_935 === "v = '2024-06-15'";
      function fn_937() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_935 + ")";
      }
      test_931.assert(t_936, fn_937);
      return;
    } finally {
      test_931.softFailToHard();
    }
});
it("nesting", function () {
    const test_938 = new Test_452();
    try {
      const name_939 = "Someone";
      let t_940 = new SqlBuilder();
      t_940.appendSafe("where p.last_name = ");
      t_940.appendString("Someone");
      const condition_941 = t_940.accumulated;
      let t_942 = new SqlBuilder();
      t_942.appendSafe("select p.id from person p ");
      t_942.appendFragment(condition_941);
      const actual_943 = t_942.accumulated.toString();
      let t_944 = actual_943 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_945() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_943 + ")";
      }
      test_938.assert(t_944, fn_945);
      let t_946 = new SqlBuilder();
      t_946.appendSafe("select p.id from person p ");
      t_946.appendPart(condition_941.toSource());
      const actual_947 = t_946.accumulated.toString();
      let t_948 = actual_947 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_949() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_947 + ")";
      }
      test_938.assert(t_948, fn_949);
      const parts_950 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_951 = new SqlBuilder();
      t_951.appendSafe("select ");
      t_951.appendPartList(parts_950);
      const actual_952 = t_951.accumulated.toString();
      let t_953 = actual_952 === "select 'a''b', 3";
      function fn_954() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_952 + ")";
      }
      test_938.assert(t_953, fn_954);
      return;
    } finally {
      test_938.softFailToHard();
    }
});
