import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, changeset, col, from, safeIdentifier
} from "../src.js";
import {
  Test as Test_495
} from "@temperlang/std/testing";
import {
  panic as panic_492, mapConstructor as mapConstructor_473, pairConstructor as pairConstructor_497, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_489
 * @returns {SafeIdentifier}
 */
function csid_488(name_489) {
  let return_490;
  let t_491;
  try {
    t_491 = safeIdentifier(name_489);
    return_490 = t_491;
  } catch {
    return_490 = panic_492();
  }
  return return_490;
}
/** @returns {TableDef} */
function userTable_493() {
  return new TableDef(csid_488("users"), Object.freeze([new FieldDef(csid_488("name"), new StringField(), false), new FieldDef(csid_488("email"), new StringField(), false), new FieldDef(csid_488("age"), new IntField(), true), new FieldDef(csid_488("score"), new FloatField(), true), new FieldDef(csid_488("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_494 = new Test_495();
    try {
      const params_496 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Alice"), pairConstructor_497("email", "alice@example.com"), pairConstructor_497("admin", "true")]));
      let t_498 = userTable_493();
      let t_499 = csid_488("name");
      let t_500 = csid_488("email");
      const cs_501 = changeset(t_498, params_496).cast(Object.freeze([t_499, t_500]));
      let t_502 = cs_501.changes.has("name");
      function fn_503() {
        return "name should be in changes";
      }
      test_494.assert(t_502, fn_503);
      let t_504 = cs_501.changes.has("email");
      function fn_505() {
        return "email should be in changes";
      }
      test_494.assert(t_504, fn_505);
      let t_506 = ! cs_501.changes.has("admin");
      function fn_507() {
        return "admin must be dropped (not in whitelist)";
      }
      test_494.assert(t_506, fn_507);
      let t_508 = cs_501.isValid;
      function fn_509() {
        return "should still be valid";
      }
      test_494.assert(t_508, fn_509);
      return;
    } finally {
      test_494.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_510 = new Test_495();
    try {
      const params_511 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Alice"), pairConstructor_497("email", "alice@example.com")]));
      let t_512 = userTable_493();
      let t_513 = csid_488("name");
      const cs_514 = changeset(t_512, params_511).cast(Object.freeze([t_513])).cast(Object.freeze([csid_488("email")]));
      let t_515 = ! cs_514.changes.has("name");
      function fn_516() {
        return "name must be excluded by second cast";
      }
      test_510.assert(t_515, fn_516);
      let t_517 = cs_514.changes.has("email");
      function fn_518() {
        return "email should be present";
      }
      test_510.assert(t_517, fn_518);
      return;
    } finally {
      test_510.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_519 = new Test_495();
    try {
      const params_520 = mapConstructor_473(Object.freeze([pairConstructor_497("name", ""), pairConstructor_497("email", "bob@example.com")]));
      let t_521 = userTable_493();
      let t_522 = csid_488("name");
      let t_523 = csid_488("email");
      const cs_524 = changeset(t_521, params_520).cast(Object.freeze([t_522, t_523]));
      let t_525 = ! cs_524.changes.has("name");
      function fn_526() {
        return "empty name should not be in changes";
      }
      test_519.assert(t_525, fn_526);
      let t_527 = cs_524.changes.has("email");
      function fn_528() {
        return "email should be in changes";
      }
      test_519.assert(t_527, fn_528);
      return;
    } finally {
      test_519.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_529 = new Test_495();
    try {
      const params_530 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Alice")]));
      let t_531 = userTable_493();
      let t_532 = csid_488("name");
      const cs_533 = changeset(t_531, params_530).cast(Object.freeze([t_532])).validateRequired(Object.freeze([csid_488("name")]));
      let t_534 = cs_533.isValid;
      function fn_535() {
        return "should be valid";
      }
      test_529.assert(t_534, fn_535);
      let t_536 = cs_533.errors.length === 0;
      function fn_537() {
        return "no errors expected";
      }
      test_529.assert(t_536, fn_537);
      return;
    } finally {
      test_529.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_538 = new Test_495();
    try {
      const params_539 = mapConstructor_473(Object.freeze([]));
      let t_540 = userTable_493();
      let t_541 = csid_488("name");
      const cs_542 = changeset(t_540, params_539).cast(Object.freeze([t_541])).validateRequired(Object.freeze([csid_488("name")]));
      let t_543 = ! cs_542.isValid;
      function fn_544() {
        return "should be invalid";
      }
      test_538.assert(t_543, fn_544);
      let t_545 = cs_542.errors.length === 1;
      function fn_546() {
        return "should have one error";
      }
      test_538.assert(t_545, fn_546);
      let t_547 = listedGet_179(cs_542.errors, 0).field === "name";
      function fn_548() {
        return "error should name the field";
      }
      test_538.assert(t_547, fn_548);
      return;
    } finally {
      test_538.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_549 = new Test_495();
    try {
      const params_550 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Alice")]));
      let t_551 = userTable_493();
      let t_552 = csid_488("name");
      const cs_553 = changeset(t_551, params_550).cast(Object.freeze([t_552])).validateLength(csid_488("name"), 2, 50);
      let t_554 = cs_553.isValid;
      function fn_555() {
        return "should be valid";
      }
      test_549.assert(t_554, fn_555);
      return;
    } finally {
      test_549.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_556 = new Test_495();
    try {
      const params_557 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "A")]));
      let t_558 = userTable_493();
      let t_559 = csid_488("name");
      const cs_560 = changeset(t_558, params_557).cast(Object.freeze([t_559])).validateLength(csid_488("name"), 2, 50);
      let t_561 = ! cs_560.isValid;
      function fn_562() {
        return "should be invalid";
      }
      test_556.assert(t_561, fn_562);
      return;
    } finally {
      test_556.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_563 = new Test_495();
    try {
      const params_564 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_565 = userTable_493();
      let t_566 = csid_488("name");
      const cs_567 = changeset(t_565, params_564).cast(Object.freeze([t_566])).validateLength(csid_488("name"), 2, 10);
      let t_568 = ! cs_567.isValid;
      function fn_569() {
        return "should be invalid";
      }
      test_563.assert(t_568, fn_569);
      return;
    } finally {
      test_563.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_570 = new Test_495();
    try {
      const params_571 = mapConstructor_473(Object.freeze([pairConstructor_497("age", "30")]));
      let t_572 = userTable_493();
      let t_573 = csid_488("age");
      const cs_574 = changeset(t_572, params_571).cast(Object.freeze([t_573])).validateInt(csid_488("age"));
      let t_575 = cs_574.isValid;
      function fn_576() {
        return "should be valid";
      }
      test_570.assert(t_575, fn_576);
      return;
    } finally {
      test_570.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_577 = new Test_495();
    try {
      const params_578 = mapConstructor_473(Object.freeze([pairConstructor_497("age", "not-a-number")]));
      let t_579 = userTable_493();
      let t_580 = csid_488("age");
      const cs_581 = changeset(t_579, params_578).cast(Object.freeze([t_580])).validateInt(csid_488("age"));
      let t_582 = ! cs_581.isValid;
      function fn_583() {
        return "should be invalid";
      }
      test_577.assert(t_582, fn_583);
      return;
    } finally {
      test_577.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_584 = new Test_495();
    try {
      const params_585 = mapConstructor_473(Object.freeze([pairConstructor_497("score", "9.5")]));
      let t_586 = userTable_493();
      let t_587 = csid_488("score");
      const cs_588 = changeset(t_586, params_585).cast(Object.freeze([t_587])).validateFloat(csid_488("score"));
      let t_589 = cs_588.isValid;
      function fn_590() {
        return "should be valid";
      }
      test_584.assert(t_589, fn_590);
      return;
    } finally {
      test_584.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_591 = new Test_495();
    try {
      const params_592 = mapConstructor_473(Object.freeze([pairConstructor_497("age", "9999999999")]));
      let t_593 = userTable_493();
      let t_594 = csid_488("age");
      const cs_595 = changeset(t_593, params_592).cast(Object.freeze([t_594])).validateInt64(csid_488("age"));
      let t_596 = cs_595.isValid;
      function fn_597() {
        return "should be valid";
      }
      test_591.assert(t_596, fn_597);
      return;
    } finally {
      test_591.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_598 = new Test_495();
    try {
      const params_599 = mapConstructor_473(Object.freeze([pairConstructor_497("age", "not-a-number")]));
      let t_600 = userTable_493();
      let t_601 = csid_488("age");
      const cs_602 = changeset(t_600, params_599).cast(Object.freeze([t_601])).validateInt64(csid_488("age"));
      let t_603 = ! cs_602.isValid;
      function fn_604() {
        return "should be invalid";
      }
      test_598.assert(t_603, fn_604);
      return;
    } finally {
      test_598.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_605 = new Test_495();
    try {
      function fn_606(v_607) {
        const params_608 = mapConstructor_473(Object.freeze([pairConstructor_497("active", v_607)]));
        let t_609 = userTable_493();
        let t_610 = csid_488("active");
        const cs_611 = changeset(t_609, params_608).cast(Object.freeze([t_610])).validateBool(csid_488("active"));
        let t_612 = cs_611.isValid;
        function fn_613() {
          return "should accept: " + v_607;
        }
        test_605.assert(t_612, fn_613);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_606);
      return;
    } finally {
      test_605.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_614 = new Test_495();
    try {
      function fn_615(v_616) {
        const params_617 = mapConstructor_473(Object.freeze([pairConstructor_497("active", v_616)]));
        let t_618 = userTable_493();
        let t_619 = csid_488("active");
        const cs_620 = changeset(t_618, params_617).cast(Object.freeze([t_619])).validateBool(csid_488("active"));
        let t_621 = cs_620.isValid;
        function fn_622() {
          return "should accept: " + v_616;
        }
        test_614.assert(t_621, fn_622);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_615);
      return;
    } finally {
      test_614.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_623 = new Test_495();
    try {
      function fn_624(v_625) {
        const params_626 = mapConstructor_473(Object.freeze([pairConstructor_497("active", v_625)]));
        let t_627 = userTable_493();
        let t_628 = csid_488("active");
        const cs_629 = changeset(t_627, params_626).cast(Object.freeze([t_628])).validateBool(csid_488("active"));
        let t_630 = ! cs_629.isValid;
        function fn_631() {
          return "should reject ambiguous: " + v_625;
        }
        test_623.assert(t_630, fn_631);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_624);
      return;
    } finally {
      test_623.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_632 = new Test_495();
    try {
      let t_633;
      const params_634 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Robert'); DROP TABLE users;--"), pairConstructor_497("email", "bobby@evil.com")]));
      let t_635 = userTable_493();
      let t_636 = csid_488("name");
      let t_637 = csid_488("email");
      const cs_638 = changeset(t_635, params_634).cast(Object.freeze([t_636, t_637])).validateRequired(Object.freeze([csid_488("name"), csid_488("email")]));
      let sqlFrag_639;
      try {
        t_633 = cs_638.toInsertSql();
        sqlFrag_639 = t_633;
      } catch {
        sqlFrag_639 = panic_492();
      }
      const s_640 = sqlFrag_639.toString();
      let t_641 = s_640.indexOf("''") >= 0;
      function fn_642() {
        return "single quote must be doubled: " + s_640;
      }
      test_632.assert(t_641, fn_642);
      return;
    } finally {
      test_632.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_643 = new Test_495();
    try {
      let t_644;
      const params_645 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Alice"), pairConstructor_497("email", "a@example.com")]));
      let t_646 = userTable_493();
      let t_647 = csid_488("name");
      let t_648 = csid_488("email");
      const cs_649 = changeset(t_646, params_645).cast(Object.freeze([t_647, t_648])).validateRequired(Object.freeze([csid_488("name"), csid_488("email")]));
      let sqlFrag_650;
      try {
        t_644 = cs_649.toInsertSql();
        sqlFrag_650 = t_644;
      } catch {
        sqlFrag_650 = panic_492();
      }
      const s_651 = sqlFrag_650.toString();
      let t_652 = s_651.indexOf("INSERT INTO users") >= 0;
      function fn_653() {
        return "has INSERT INTO: " + s_651;
      }
      test_643.assert(t_652, fn_653);
      let t_654 = s_651.indexOf("'Alice'") >= 0;
      function fn_655() {
        return "has quoted name: " + s_651;
      }
      test_643.assert(t_654, fn_655);
      return;
    } finally {
      test_643.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_656 = new Test_495();
    try {
      let t_657;
      const params_658 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Bob"), pairConstructor_497("email", "b@example.com"), pairConstructor_497("age", "25")]));
      let t_659 = userTable_493();
      let t_660 = csid_488("name");
      let t_661 = csid_488("email");
      let t_662 = csid_488("age");
      const cs_663 = changeset(t_659, params_658).cast(Object.freeze([t_660, t_661, t_662])).validateRequired(Object.freeze([csid_488("name"), csid_488("email")]));
      let sqlFrag_664;
      try {
        t_657 = cs_663.toInsertSql();
        sqlFrag_664 = t_657;
      } catch {
        sqlFrag_664 = panic_492();
      }
      const s_665 = sqlFrag_664.toString();
      let t_666 = s_665.indexOf("25") >= 0;
      function fn_667() {
        return "age rendered unquoted: " + s_665;
      }
      test_656.assert(t_666, fn_667);
      return;
    } finally {
      test_656.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_668 = new Test_495();
    try {
      const params_669 = mapConstructor_473(Object.freeze([]));
      let t_670 = userTable_493();
      let t_671 = csid_488("name");
      const cs_672 = changeset(t_670, params_669).cast(Object.freeze([t_671])).validateRequired(Object.freeze([csid_488("name")]));
      let didBubble_673;
      try {
        cs_672.toInsertSql();
        didBubble_673 = false;
      } catch {
        didBubble_673 = true;
      }
      function fn_674() {
        return "invalid changeset should bubble";
      }
      test_668.assert(didBubble_673, fn_674);
      return;
    } finally {
      test_668.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_675 = new Test_495();
    try {
      const strictTable_676 = new TableDef(csid_488("posts"), Object.freeze([new FieldDef(csid_488("title"), new StringField(), false), new FieldDef(csid_488("body"), new StringField(), true)]));
      const params_677 = mapConstructor_473(Object.freeze([pairConstructor_497("body", "hello")]));
      let t_678 = csid_488("body");
      const cs_679 = changeset(strictTable_676, params_677).cast(Object.freeze([t_678]));
      let t_680 = cs_679.isValid;
      function fn_681() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_675.assert(t_680, fn_681);
      let didBubble_682;
      try {
        cs_679.toInsertSql();
        didBubble_682 = false;
      } catch {
        didBubble_682 = true;
      }
      function fn_683() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_675.assert(didBubble_682, fn_683);
      return;
    } finally {
      test_675.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_684 = new Test_495();
    try {
      let t_685;
      const params_686 = mapConstructor_473(Object.freeze([pairConstructor_497("name", "Bob")]));
      let t_687 = userTable_493();
      let t_688 = csid_488("name");
      const cs_689 = changeset(t_687, params_686).cast(Object.freeze([t_688])).validateRequired(Object.freeze([csid_488("name")]));
      let sqlFrag_690;
      try {
        t_685 = cs_689.toUpdateSql(42);
        sqlFrag_690 = t_685;
      } catch {
        sqlFrag_690 = panic_492();
      }
      const s_691 = sqlFrag_690.toString();
      let t_692 = s_691 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_693() {
        return "got: " + s_691;
      }
      test_684.assert(t_692, fn_693);
      return;
    } finally {
      test_684.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_694 = new Test_495();
    try {
      const params_695 = mapConstructor_473(Object.freeze([]));
      let t_696 = userTable_493();
      let t_697 = csid_488("name");
      const cs_698 = changeset(t_696, params_695).cast(Object.freeze([t_697])).validateRequired(Object.freeze([csid_488("name")]));
      let didBubble_699;
      try {
        cs_698.toUpdateSql(1);
        didBubble_699 = false;
      } catch {
        didBubble_699 = true;
      }
      function fn_700() {
        return "invalid changeset should bubble";
      }
      test_694.assert(didBubble_699, fn_700);
      return;
    } finally {
      test_694.softFailToHard();
    }
});
/**
 * @param {string} name_709
 * @returns {SafeIdentifier}
 */
function sid_708(name_709) {
  let return_710;
  let t_711;
  try {
    t_711 = safeIdentifier(name_709);
    return_710 = t_711;
  } catch {
    return_710 = panic_492();
  }
  return return_710;
}
it("bare from produces SELECT *", function () {
    const test_712 = new Test_495();
    try {
      const q_713 = from(sid_708("users"));
      let t_714 = q_713.toSql().toString() === "SELECT * FROM users";
      function fn_715() {
        return "bare query";
      }
      test_712.assert(t_714, fn_715);
      return;
    } finally {
      test_712.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_716 = new Test_495();
    try {
      let t_717 = sid_708("users");
      let t_718 = sid_708("id");
      let t_719 = sid_708("name");
      const q_720 = from(t_717).select(Object.freeze([t_718, t_719]));
      let t_721 = q_720.toSql().toString() === "SELECT id, name FROM users";
      function fn_722() {
        return "select columns";
      }
      test_716.assert(t_721, fn_722);
      return;
    } finally {
      test_716.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_723 = new Test_495();
    try {
      let t_724 = sid_708("users");
      let t_725 = new SqlBuilder();
      t_725.appendSafe("age > ");
      t_725.appendInt32(18);
      let t_726 = t_725.accumulated;
      const q_727 = from(t_724).where(t_726);
      let t_728 = q_727.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_729() {
        return "where int";
      }
      test_723.assert(t_728, fn_729);
      return;
    } finally {
      test_723.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_730 = new Test_495();
    try {
      let t_731 = sid_708("users");
      let t_732 = new SqlBuilder();
      t_732.appendSafe("active = ");
      t_732.appendBoolean(true);
      let t_733 = t_732.accumulated;
      const q_734 = from(t_731).where(t_733);
      let t_735 = q_734.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_736() {
        return "where bool";
      }
      test_730.assert(t_735, fn_736);
      return;
    } finally {
      test_730.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_737 = new Test_495();
    try {
      let t_738 = sid_708("users");
      let t_739 = new SqlBuilder();
      t_739.appendSafe("age > ");
      t_739.appendInt32(18);
      let t_740 = t_739.accumulated;
      let t_741 = from(t_738).where(t_740);
      let t_742 = new SqlBuilder();
      t_742.appendSafe("active = ");
      t_742.appendBoolean(true);
      const q_743 = t_741.where(t_742.accumulated);
      let t_744 = q_743.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_745() {
        return "chained where";
      }
      test_737.assert(t_744, fn_745);
      return;
    } finally {
      test_737.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_746 = new Test_495();
    try {
      let t_747 = sid_708("users");
      let t_748 = sid_708("name");
      const q_749 = from(t_747).orderBy(t_748, true);
      let t_750 = q_749.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_751() {
        return "order asc";
      }
      test_746.assert(t_750, fn_751);
      return;
    } finally {
      test_746.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_752 = new Test_495();
    try {
      let t_753 = sid_708("users");
      let t_754 = sid_708("created_at");
      const q_755 = from(t_753).orderBy(t_754, false);
      let t_756 = q_755.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_757() {
        return "order desc";
      }
      test_752.assert(t_756, fn_757);
      return;
    } finally {
      test_752.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_758 = new Test_495();
    try {
      let t_759;
      let t_760;
      let q_761;
      try {
        t_759 = from(sid_708("users")).limit(10);
        t_760 = t_759.offset(20);
        q_761 = t_760;
      } catch {
        q_761 = panic_492();
      }
      let t_762 = q_761.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_763() {
        return "limit/offset";
      }
      test_758.assert(t_762, fn_763);
      return;
    } finally {
      test_758.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_764 = new Test_495();
    try {
      let didBubble_765;
      try {
        from(sid_708("users")).limit(-1);
        didBubble_765 = false;
      } catch {
        didBubble_765 = true;
      }
      function fn_766() {
        return "negative limit should bubble";
      }
      test_764.assert(didBubble_765, fn_766);
      return;
    } finally {
      test_764.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_767 = new Test_495();
    try {
      let didBubble_768;
      try {
        from(sid_708("users")).offset(-1);
        didBubble_768 = false;
      } catch {
        didBubble_768 = true;
      }
      function fn_769() {
        return "negative offset should bubble";
      }
      test_767.assert(didBubble_768, fn_769);
      return;
    } finally {
      test_767.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_770 = new Test_495();
    try {
      let t_771;
      let t_772;
      let t_773;
      let t_774;
      let t_775;
      let t_776;
      let t_777;
      let t_778;
      let t_779;
      let t_780;
      const minAge_781 = 21;
      let q_782;
      try {
        t_771 = sid_708("users");
        t_772 = sid_708("id");
        t_773 = sid_708("name");
        t_774 = sid_708("email");
        t_775 = from(t_771).select(Object.freeze([t_772, t_773, t_774]));
        t_776 = new SqlBuilder();
        t_776.appendSafe("age >= ");
        t_776.appendInt32(21);
        t_777 = t_775.where(t_776.accumulated);
        t_778 = new SqlBuilder();
        t_778.appendSafe("active = ");
        t_778.appendBoolean(true);
        t_779 = t_777.where(t_778.accumulated).orderBy(sid_708("name"), true).limit(25);
        t_780 = t_779.offset(0);
        q_782 = t_780;
      } catch {
        q_782 = panic_492();
      }
      let t_783 = q_782.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_784() {
        return "complex query";
      }
      test_770.assert(t_783, fn_784);
      return;
    } finally {
      test_770.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_785 = new Test_495();
    try {
      let t_786;
      let t_787;
      const q_788 = from(sid_708("users"));
      try {
        t_786 = q_788.safeToSql(100);
        t_787 = t_786;
      } catch {
        t_787 = panic_492();
      }
      const s_789 = t_787.toString();
      let t_790 = s_789 === "SELECT * FROM users LIMIT 100";
      function fn_791() {
        return "should have limit: " + s_789;
      }
      test_785.assert(t_790, fn_791);
      return;
    } finally {
      test_785.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_792 = new Test_495();
    try {
      let t_793;
      let t_794;
      let t_795;
      let q_796;
      try {
        t_793 = from(sid_708("users")).limit(5);
        q_796 = t_793;
      } catch {
        q_796 = panic_492();
      }
      try {
        t_794 = q_796.safeToSql(100);
        t_795 = t_794;
      } catch {
        t_795 = panic_492();
      }
      const s_797 = t_795.toString();
      let t_798 = s_797 === "SELECT * FROM users LIMIT 5";
      function fn_799() {
        return "explicit limit preserved: " + s_797;
      }
      test_792.assert(t_798, fn_799);
      return;
    } finally {
      test_792.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_800 = new Test_495();
    try {
      let didBubble_801;
      try {
        from(sid_708("users")).safeToSql(-1);
        didBubble_801 = false;
      } catch {
        didBubble_801 = true;
      }
      function fn_802() {
        return "negative defaultLimit should bubble";
      }
      test_800.assert(didBubble_801, fn_802);
      return;
    } finally {
      test_800.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_803 = new Test_495();
    try {
      const evil_804 = "'; DROP TABLE users; --";
      let t_805 = sid_708("users");
      let t_806 = new SqlBuilder();
      t_806.appendSafe("name = ");
      t_806.appendString("'; DROP TABLE users; --");
      let t_807 = t_806.accumulated;
      const q_808 = from(t_805).where(t_807);
      const s_809 = q_808.toSql().toString();
      let t_810 = s_809.indexOf("''") >= 0;
      function fn_811() {
        return "quotes must be doubled: " + s_809;
      }
      test_803.assert(t_810, fn_811);
      let t_812 = s_809.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_813() {
        return "structure intact: " + s_809;
      }
      test_803.assert(t_812, fn_813);
      return;
    } finally {
      test_803.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_814 = new Test_495();
    try {
      const attack_815 = "users; DROP TABLE users; --";
      let didBubble_816;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_816 = false;
      } catch {
        didBubble_816 = true;
      }
      function fn_817() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_814.assert(didBubble_816, fn_817);
      return;
    } finally {
      test_814.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_818 = new Test_495();
    try {
      let t_819 = sid_708("users");
      let t_820 = sid_708("orders");
      let t_821 = new SqlBuilder();
      t_821.appendSafe("users.id = orders.user_id");
      let t_822 = t_821.accumulated;
      const q_823 = from(t_819).innerJoin(t_820, t_822);
      let t_824 = q_823.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_825() {
        return "inner join";
      }
      test_818.assert(t_824, fn_825);
      return;
    } finally {
      test_818.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_826 = new Test_495();
    try {
      let t_827 = sid_708("users");
      let t_828 = sid_708("profiles");
      let t_829 = new SqlBuilder();
      t_829.appendSafe("users.id = profiles.user_id");
      let t_830 = t_829.accumulated;
      const q_831 = from(t_827).leftJoin(t_828, t_830);
      let t_832 = q_831.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_833() {
        return "left join";
      }
      test_826.assert(t_832, fn_833);
      return;
    } finally {
      test_826.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_834 = new Test_495();
    try {
      let t_835 = sid_708("orders");
      let t_836 = sid_708("users");
      let t_837 = new SqlBuilder();
      t_837.appendSafe("orders.user_id = users.id");
      let t_838 = t_837.accumulated;
      const q_839 = from(t_835).rightJoin(t_836, t_838);
      let t_840 = q_839.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_841() {
        return "right join";
      }
      test_834.assert(t_840, fn_841);
      return;
    } finally {
      test_834.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_842 = new Test_495();
    try {
      let t_843 = sid_708("users");
      let t_844 = sid_708("orders");
      let t_845 = new SqlBuilder();
      t_845.appendSafe("users.id = orders.user_id");
      let t_846 = t_845.accumulated;
      const q_847 = from(t_843).fullJoin(t_844, t_846);
      let t_848 = q_847.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_849() {
        return "full join";
      }
      test_842.assert(t_848, fn_849);
      return;
    } finally {
      test_842.softFailToHard();
    }
});
it("chained joins", function () {
    const test_850 = new Test_495();
    try {
      let t_851 = sid_708("users");
      let t_852 = sid_708("orders");
      let t_853 = new SqlBuilder();
      t_853.appendSafe("users.id = orders.user_id");
      let t_854 = t_853.accumulated;
      let t_855 = from(t_851).innerJoin(t_852, t_854);
      let t_856 = sid_708("profiles");
      let t_857 = new SqlBuilder();
      t_857.appendSafe("users.id = profiles.user_id");
      const q_858 = t_855.leftJoin(t_856, t_857.accumulated);
      let t_859 = q_858.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_860() {
        return "chained joins";
      }
      test_850.assert(t_859, fn_860);
      return;
    } finally {
      test_850.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_861 = new Test_495();
    try {
      let t_862;
      let t_863;
      let t_864;
      let t_865;
      let t_866;
      let t_867;
      let t_868;
      let q_869;
      try {
        t_862 = sid_708("users");
        t_863 = sid_708("orders");
        t_864 = new SqlBuilder();
        t_864.appendSafe("users.id = orders.user_id");
        t_865 = t_864.accumulated;
        t_866 = from(t_862).innerJoin(t_863, t_865);
        t_867 = new SqlBuilder();
        t_867.appendSafe("orders.total > ");
        t_867.appendInt32(100);
        t_868 = t_866.where(t_867.accumulated).orderBy(sid_708("name"), true).limit(10);
        q_869 = t_868;
      } catch {
        q_869 = panic_492();
      }
      let t_870 = q_869.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_871() {
        return "join with where/order/limit";
      }
      test_861.assert(t_870, fn_871);
      return;
    } finally {
      test_861.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_872 = new Test_495();
    try {
      const c_873 = col(sid_708("users"), sid_708("id"));
      let t_874 = c_873.toString() === "users.id";
      function fn_875() {
        return "col helper";
      }
      test_872.assert(t_874, fn_875);
      return;
    } finally {
      test_872.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_876 = new Test_495();
    try {
      const onCond_877 = col(sid_708("users"), sid_708("id"));
      const b_878 = new SqlBuilder();
      b_878.appendFragment(onCond_877);
      b_878.appendSafe(" = ");
      b_878.appendFragment(col(sid_708("orders"), sid_708("user_id")));
      let t_879 = sid_708("users");
      let t_880 = sid_708("orders");
      let t_881 = b_878.accumulated;
      const q_882 = from(t_879).innerJoin(t_880, t_881);
      let t_883 = q_882.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_884() {
        return "join with col";
      }
      test_876.assert(t_883, fn_884);
      return;
    } finally {
      test_876.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_885 = new Test_495();
    try {
      let t_886;
      let id_887;
      try {
        t_886 = safeIdentifier("user_name");
        id_887 = t_886;
      } catch {
        id_887 = panic_492();
      }
      let t_888 = id_887.sqlValue === "user_name";
      function fn_889() {
        return "value should round-trip";
      }
      test_885.assert(t_888, fn_889);
      return;
    } finally {
      test_885.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_890 = new Test_495();
    try {
      let didBubble_891;
      try {
        safeIdentifier("");
        didBubble_891 = false;
      } catch {
        didBubble_891 = true;
      }
      function fn_892() {
        return "empty string should bubble";
      }
      test_890.assert(didBubble_891, fn_892);
      return;
    } finally {
      test_890.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_893 = new Test_495();
    try {
      let didBubble_894;
      try {
        safeIdentifier("1col");
        didBubble_894 = false;
      } catch {
        didBubble_894 = true;
      }
      function fn_895() {
        return "leading digit should bubble";
      }
      test_893.assert(didBubble_894, fn_895);
      return;
    } finally {
      test_893.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_896 = new Test_495();
    try {
      const cases_897 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_898(c_899) {
        let didBubble_900;
        try {
          safeIdentifier(c_899);
          didBubble_900 = false;
        } catch {
          didBubble_900 = true;
        }
        function fn_901() {
          return "should reject: " + c_899;
        }
        test_896.assert(didBubble_900, fn_901);
        return;
      }
      cases_897.forEach(fn_898);
      return;
    } finally {
      test_896.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_902 = new Test_495();
    try {
      let t_903;
      let t_904;
      let t_905;
      let t_906;
      let t_907;
      let t_908;
      let t_909;
      try {
        t_903 = safeIdentifier("users");
        t_904 = t_903;
      } catch {
        t_904 = panic_492();
      }
      try {
        t_905 = safeIdentifier("name");
        t_906 = t_905;
      } catch {
        t_906 = panic_492();
      }
      let t_910 = new StringField();
      let t_911 = new FieldDef(t_906, t_910, false);
      try {
        t_907 = safeIdentifier("age");
        t_908 = t_907;
      } catch {
        t_908 = panic_492();
      }
      let t_912 = new IntField();
      let t_913 = new FieldDef(t_908, t_912, false);
      const td_914 = new TableDef(t_904, Object.freeze([t_911, t_913]));
      let f_915;
      try {
        t_909 = td_914.field("age");
        f_915 = t_909;
      } catch {
        f_915 = panic_492();
      }
      let t_916 = f_915.name.sqlValue === "age";
      function fn_917() {
        return "should find age field";
      }
      test_902.assert(t_916, fn_917);
      return;
    } finally {
      test_902.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_918 = new Test_495();
    try {
      let t_919;
      let t_920;
      let t_921;
      let t_922;
      try {
        t_919 = safeIdentifier("users");
        t_920 = t_919;
      } catch {
        t_920 = panic_492();
      }
      try {
        t_921 = safeIdentifier("name");
        t_922 = t_921;
      } catch {
        t_922 = panic_492();
      }
      let t_923 = new StringField();
      let t_924 = new FieldDef(t_922, t_923, false);
      const td_925 = new TableDef(t_920, Object.freeze([t_924]));
      let didBubble_926;
      try {
        td_925.field("nonexistent");
        didBubble_926 = false;
      } catch {
        didBubble_926 = true;
      }
      function fn_927() {
        return "unknown field should bubble";
      }
      test_918.assert(didBubble_926, fn_927);
      return;
    } finally {
      test_918.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_928 = new Test_495();
    try {
      let t_929;
      let t_930;
      let t_931;
      let t_932;
      try {
        t_929 = safeIdentifier("email");
        t_930 = t_929;
      } catch {
        t_930 = panic_492();
      }
      let t_933 = new StringField();
      const required_934 = new FieldDef(t_930, t_933, false);
      try {
        t_931 = safeIdentifier("bio");
        t_932 = t_931;
      } catch {
        t_932 = panic_492();
      }
      let t_935 = new StringField();
      const optional_936 = new FieldDef(t_932, t_935, true);
      let t_937 = ! required_934.nullable;
      function fn_938() {
        return "required field should not be nullable";
      }
      test_928.assert(t_937, fn_938);
      let t_939 = optional_936.nullable;
      function fn_940() {
        return "optional field should be nullable";
      }
      test_928.assert(t_939, fn_940);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("string escaping", function () {
    const test_941 = new Test_495();
    try {
      function build_942(name_943) {
        let t_944 = new SqlBuilder();
        t_944.appendSafe("select * from hi where name = ");
        t_944.appendString(name_943);
        return t_944.accumulated.toString();
      }
      function buildWrong_945(name_946) {
        return "select * from hi where name = '" + name_946 + "'";
      }
      const actual_947 = build_942("world");
      let t_948 = actual_947 === "select * from hi where name = 'world'";
      function fn_949() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_947 + ")";
      }
      test_941.assert(t_948, fn_949);
      const bobbyTables_950 = "Robert'); drop table hi;--";
      const actual_951 = build_942("Robert'); drop table hi;--");
      let t_952 = actual_951 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_953() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_951 + ")";
      }
      test_941.assert(t_952, fn_953);
      function fn_954() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_941.assert(true, fn_954);
      return;
    } finally {
      test_941.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_955 = new Test_495();
    try {
      let t_956 = new SqlBuilder();
      t_956.appendSafe("v = ");
      t_956.appendString("");
      const actual_957 = t_956.accumulated.toString();
      let t_958 = actual_957 === "v = ''";
      function fn_959() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_957 + ")";
      }
      test_955.assert(t_958, fn_959);
      let t_960 = new SqlBuilder();
      t_960.appendSafe("v = ");
      t_960.appendString("a''b");
      const actual_961 = t_960.accumulated.toString();
      let t_962 = actual_961 === "v = 'a''''b'";
      function fn_963() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_961 + ")";
      }
      test_955.assert(t_962, fn_963);
      let t_964 = new SqlBuilder();
      t_964.appendSafe("v = ");
      t_964.appendString("Hello 世界");
      const actual_965 = t_964.accumulated.toString();
      let t_966 = actual_965 === "v = 'Hello 世界'";
      function fn_967() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_965 + ")";
      }
      test_955.assert(t_966, fn_967);
      let t_968 = new SqlBuilder();
      t_968.appendSafe("v = ");
      t_968.appendString("Line1\nLine2");
      const actual_969 = t_968.accumulated.toString();
      let t_970 = actual_969 === "v = 'Line1\nLine2'";
      function fn_971() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_969 + ")";
      }
      test_955.assert(t_970, fn_971);
      return;
    } finally {
      test_955.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_972 = new Test_495();
    try {
      let t_973;
      let t_974 = new SqlBuilder();
      t_974.appendSafe("select ");
      t_974.appendInt32(42);
      t_974.appendSafe(", ");
      t_974.appendInt64(BigInt("43"));
      t_974.appendSafe(", ");
      t_974.appendFloat64(19.99);
      t_974.appendSafe(", ");
      t_974.appendBoolean(true);
      t_974.appendSafe(", ");
      t_974.appendBoolean(false);
      const actual_975 = t_974.accumulated.toString();
      let t_976 = actual_975 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_977() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_975 + ")";
      }
      test_972.assert(t_976, fn_977);
      let date_978;
      try {
        t_973 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_978 = t_973;
      } catch {
        date_978 = panic_492();
      }
      let t_979 = new SqlBuilder();
      t_979.appendSafe("insert into t values (");
      t_979.appendDate(date_978);
      t_979.appendSafe(")");
      const actual_980 = t_979.accumulated.toString();
      let t_981 = actual_980 === "insert into t values ('2024-12-25')";
      function fn_982() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_980 + ")";
      }
      test_972.assert(t_981, fn_982);
      return;
    } finally {
      test_972.softFailToHard();
    }
});
it("lists", function () {
    const test_983 = new Test_495();
    try {
      let t_984;
      let t_985;
      let t_986;
      let t_987;
      let t_988 = new SqlBuilder();
      t_988.appendSafe("v IN (");
      t_988.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_988.appendSafe(")");
      const actual_989 = t_988.accumulated.toString();
      let t_990 = actual_989 === "v IN ('a', 'b', 'c''d')";
      function fn_991() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_989 + ")";
      }
      test_983.assert(t_990, fn_991);
      let t_992 = new SqlBuilder();
      t_992.appendSafe("v IN (");
      t_992.appendInt32List(Object.freeze([1, 2, 3]));
      t_992.appendSafe(")");
      const actual_993 = t_992.accumulated.toString();
      let t_994 = actual_993 === "v IN (1, 2, 3)";
      function fn_995() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_993 + ")";
      }
      test_983.assert(t_994, fn_995);
      let t_996 = new SqlBuilder();
      t_996.appendSafe("v IN (");
      t_996.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_996.appendSafe(")");
      const actual_997 = t_996.accumulated.toString();
      let t_998 = actual_997 === "v IN (1, 2)";
      function fn_999() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_997 + ")";
      }
      test_983.assert(t_998, fn_999);
      let t_1000 = new SqlBuilder();
      t_1000.appendSafe("v IN (");
      t_1000.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1000.appendSafe(")");
      const actual_1001 = t_1000.accumulated.toString();
      let t_1002 = actual_1001 === "v IN (1.0, 2.0)";
      function fn_1003() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1001 + ")";
      }
      test_983.assert(t_1002, fn_1003);
      let t_1004 = new SqlBuilder();
      t_1004.appendSafe("v IN (");
      t_1004.appendBooleanList(Object.freeze([true, false]));
      t_1004.appendSafe(")");
      const actual_1005 = t_1004.accumulated.toString();
      let t_1006 = actual_1005 === "v IN (TRUE, FALSE)";
      function fn_1007() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1005 + ")";
      }
      test_983.assert(t_1006, fn_1007);
      try {
        t_984 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_985 = t_984;
      } catch {
        t_985 = panic_492();
      }
      try {
        t_986 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_987 = t_986;
      } catch {
        t_987 = panic_492();
      }
      const dates_1008 = Object.freeze([t_985, t_987]);
      let t_1009 = new SqlBuilder();
      t_1009.appendSafe("v IN (");
      t_1009.appendDateList(dates_1008);
      t_1009.appendSafe(")");
      const actual_1010 = t_1009.accumulated.toString();
      let t_1011 = actual_1010 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1012() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1010 + ")";
      }
      test_983.assert(t_1011, fn_1012);
      return;
    } finally {
      test_983.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1013 = new Test_495();
    try {
      let nan_1014;
      nan_1014 = 0.0 / 0.0;
      let t_1015 = new SqlBuilder();
      t_1015.appendSafe("v = ");
      t_1015.appendFloat64(nan_1014);
      const actual_1016 = t_1015.accumulated.toString();
      let t_1017 = actual_1016 === "v = NULL";
      function fn_1018() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1016 + ")";
      }
      test_1013.assert(t_1017, fn_1018);
      return;
    } finally {
      test_1013.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1019 = new Test_495();
    try {
      let inf_1020;
      inf_1020 = 1.0 / 0.0;
      let t_1021 = new SqlBuilder();
      t_1021.appendSafe("v = ");
      t_1021.appendFloat64(inf_1020);
      const actual_1022 = t_1021.accumulated.toString();
      let t_1023 = actual_1022 === "v = NULL";
      function fn_1024() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1022 + ")";
      }
      test_1019.assert(t_1023, fn_1024);
      return;
    } finally {
      test_1019.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1025 = new Test_495();
    try {
      let ninf_1026;
      ninf_1026 = -1.0 / 0.0;
      let t_1027 = new SqlBuilder();
      t_1027.appendSafe("v = ");
      t_1027.appendFloat64(ninf_1026);
      const actual_1028 = t_1027.accumulated.toString();
      let t_1029 = actual_1028 === "v = NULL";
      function fn_1030() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1028 + ")";
      }
      test_1025.assert(t_1029, fn_1030);
      return;
    } finally {
      test_1025.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1031 = new Test_495();
    try {
      let t_1032 = new SqlBuilder();
      t_1032.appendSafe("v = ");
      t_1032.appendFloat64(3.14);
      const actual_1033 = t_1032.accumulated.toString();
      let t_1034 = actual_1033 === "v = 3.14";
      function fn_1035() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1033 + ")";
      }
      test_1031.assert(t_1034, fn_1035);
      let t_1036 = new SqlBuilder();
      t_1036.appendSafe("v = ");
      t_1036.appendFloat64(0.0);
      const actual_1037 = t_1036.accumulated.toString();
      let t_1038 = actual_1037 === "v = 0.0";
      function fn_1039() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1037 + ")";
      }
      test_1031.assert(t_1038, fn_1039);
      let t_1040 = new SqlBuilder();
      t_1040.appendSafe("v = ");
      t_1040.appendFloat64(-42.5);
      const actual_1041 = t_1040.accumulated.toString();
      let t_1042 = actual_1041 === "v = -42.5";
      function fn_1043() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1041 + ")";
      }
      test_1031.assert(t_1042, fn_1043);
      return;
    } finally {
      test_1031.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1044 = new Test_495();
    try {
      let t_1045;
      let d_1046;
      try {
        t_1045 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1046 = t_1045;
      } catch {
        d_1046 = panic_492();
      }
      let t_1047 = new SqlBuilder();
      t_1047.appendSafe("v = ");
      t_1047.appendDate(d_1046);
      const actual_1048 = t_1047.accumulated.toString();
      let t_1049 = actual_1048 === "v = '2024-06-15'";
      function fn_1050() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1048 + ")";
      }
      test_1044.assert(t_1049, fn_1050);
      return;
    } finally {
      test_1044.softFailToHard();
    }
});
it("nesting", function () {
    const test_1051 = new Test_495();
    try {
      const name_1052 = "Someone";
      let t_1053 = new SqlBuilder();
      t_1053.appendSafe("where p.last_name = ");
      t_1053.appendString("Someone");
      const condition_1054 = t_1053.accumulated;
      let t_1055 = new SqlBuilder();
      t_1055.appendSafe("select p.id from person p ");
      t_1055.appendFragment(condition_1054);
      const actual_1056 = t_1055.accumulated.toString();
      let t_1057 = actual_1056 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1058() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1056 + ")";
      }
      test_1051.assert(t_1057, fn_1058);
      let t_1059 = new SqlBuilder();
      t_1059.appendSafe("select p.id from person p ");
      t_1059.appendPart(condition_1054.toSource());
      const actual_1060 = t_1059.accumulated.toString();
      let t_1061 = actual_1060 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1062() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1060 + ")";
      }
      test_1051.assert(t_1061, fn_1062);
      const parts_1063 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1064 = new SqlBuilder();
      t_1064.appendSafe("select ");
      t_1064.appendPartList(parts_1063);
      const actual_1065 = t_1064.accumulated.toString();
      let t_1066 = actual_1065 === "select 'a''b', 3";
      function fn_1067() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1065 + ")";
      }
      test_1051.assert(t_1066, fn_1067);
      return;
    } finally {
      test_1051.softFailToHard();
    }
});
