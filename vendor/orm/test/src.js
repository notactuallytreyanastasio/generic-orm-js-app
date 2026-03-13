import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, changeset, col, from, safeIdentifier
} from "../src.js";
import {
  Test as Test_547
} from "@temperlang/std/testing";
import {
  panic as panic_544, mapConstructor as mapConstructor_525, pairConstructor as pairConstructor_549, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_541
 * @returns {SafeIdentifier}
 */
function csid_540(name_541) {
  let return_542;
  let t_543;
  try {
    t_543 = safeIdentifier(name_541);
    return_542 = t_543;
  } catch {
    return_542 = panic_544();
  }
  return return_542;
}
/** @returns {TableDef} */
function userTable_545() {
  return new TableDef(csid_540("users"), Object.freeze([new FieldDef(csid_540("name"), new StringField(), false), new FieldDef(csid_540("email"), new StringField(), false), new FieldDef(csid_540("age"), new IntField(), true), new FieldDef(csid_540("score"), new FloatField(), true), new FieldDef(csid_540("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_546 = new Test_547();
    try {
      const params_548 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Alice"), pairConstructor_549("email", "alice@example.com"), pairConstructor_549("admin", "true")]));
      let t_550 = userTable_545();
      let t_551 = csid_540("name");
      let t_552 = csid_540("email");
      const cs_553 = changeset(t_550, params_548).cast(Object.freeze([t_551, t_552]));
      let t_554 = cs_553.changes.has("name");
      function fn_555() {
        return "name should be in changes";
      }
      test_546.assert(t_554, fn_555);
      let t_556 = cs_553.changes.has("email");
      function fn_557() {
        return "email should be in changes";
      }
      test_546.assert(t_556, fn_557);
      let t_558 = ! cs_553.changes.has("admin");
      function fn_559() {
        return "admin must be dropped (not in whitelist)";
      }
      test_546.assert(t_558, fn_559);
      let t_560 = cs_553.isValid;
      function fn_561() {
        return "should still be valid";
      }
      test_546.assert(t_560, fn_561);
      return;
    } finally {
      test_546.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_562 = new Test_547();
    try {
      const params_563 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Alice"), pairConstructor_549("email", "alice@example.com")]));
      let t_564 = userTable_545();
      let t_565 = csid_540("name");
      const cs_566 = changeset(t_564, params_563).cast(Object.freeze([t_565])).cast(Object.freeze([csid_540("email")]));
      let t_567 = ! cs_566.changes.has("name");
      function fn_568() {
        return "name must be excluded by second cast";
      }
      test_562.assert(t_567, fn_568);
      let t_569 = cs_566.changes.has("email");
      function fn_570() {
        return "email should be present";
      }
      test_562.assert(t_569, fn_570);
      return;
    } finally {
      test_562.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_571 = new Test_547();
    try {
      const params_572 = mapConstructor_525(Object.freeze([pairConstructor_549("name", ""), pairConstructor_549("email", "bob@example.com")]));
      let t_573 = userTable_545();
      let t_574 = csid_540("name");
      let t_575 = csid_540("email");
      const cs_576 = changeset(t_573, params_572).cast(Object.freeze([t_574, t_575]));
      let t_577 = ! cs_576.changes.has("name");
      function fn_578() {
        return "empty name should not be in changes";
      }
      test_571.assert(t_577, fn_578);
      let t_579 = cs_576.changes.has("email");
      function fn_580() {
        return "email should be in changes";
      }
      test_571.assert(t_579, fn_580);
      return;
    } finally {
      test_571.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_581 = new Test_547();
    try {
      const params_582 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Alice")]));
      let t_583 = userTable_545();
      let t_584 = csid_540("name");
      const cs_585 = changeset(t_583, params_582).cast(Object.freeze([t_584])).validateRequired(Object.freeze([csid_540("name")]));
      let t_586 = cs_585.isValid;
      function fn_587() {
        return "should be valid";
      }
      test_581.assert(t_586, fn_587);
      let t_588 = cs_585.errors.length === 0;
      function fn_589() {
        return "no errors expected";
      }
      test_581.assert(t_588, fn_589);
      return;
    } finally {
      test_581.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_590 = new Test_547();
    try {
      const params_591 = mapConstructor_525(Object.freeze([]));
      let t_592 = userTable_545();
      let t_593 = csid_540("name");
      const cs_594 = changeset(t_592, params_591).cast(Object.freeze([t_593])).validateRequired(Object.freeze([csid_540("name")]));
      let t_595 = ! cs_594.isValid;
      function fn_596() {
        return "should be invalid";
      }
      test_590.assert(t_595, fn_596);
      let t_597 = cs_594.errors.length === 1;
      function fn_598() {
        return "should have one error";
      }
      test_590.assert(t_597, fn_598);
      let t_599 = listedGet_179(cs_594.errors, 0).field === "name";
      function fn_600() {
        return "error should name the field";
      }
      test_590.assert(t_599, fn_600);
      return;
    } finally {
      test_590.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_601 = new Test_547();
    try {
      const params_602 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Alice")]));
      let t_603 = userTable_545();
      let t_604 = csid_540("name");
      const cs_605 = changeset(t_603, params_602).cast(Object.freeze([t_604])).validateLength(csid_540("name"), 2, 50);
      let t_606 = cs_605.isValid;
      function fn_607() {
        return "should be valid";
      }
      test_601.assert(t_606, fn_607);
      return;
    } finally {
      test_601.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_608 = new Test_547();
    try {
      const params_609 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "A")]));
      let t_610 = userTable_545();
      let t_611 = csid_540("name");
      const cs_612 = changeset(t_610, params_609).cast(Object.freeze([t_611])).validateLength(csid_540("name"), 2, 50);
      let t_613 = ! cs_612.isValid;
      function fn_614() {
        return "should be invalid";
      }
      test_608.assert(t_613, fn_614);
      return;
    } finally {
      test_608.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_615 = new Test_547();
    try {
      const params_616 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_617 = userTable_545();
      let t_618 = csid_540("name");
      const cs_619 = changeset(t_617, params_616).cast(Object.freeze([t_618])).validateLength(csid_540("name"), 2, 10);
      let t_620 = ! cs_619.isValid;
      function fn_621() {
        return "should be invalid";
      }
      test_615.assert(t_620, fn_621);
      return;
    } finally {
      test_615.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_622 = new Test_547();
    try {
      const params_623 = mapConstructor_525(Object.freeze([pairConstructor_549("age", "30")]));
      let t_624 = userTable_545();
      let t_625 = csid_540("age");
      const cs_626 = changeset(t_624, params_623).cast(Object.freeze([t_625])).validateInt(csid_540("age"));
      let t_627 = cs_626.isValid;
      function fn_628() {
        return "should be valid";
      }
      test_622.assert(t_627, fn_628);
      return;
    } finally {
      test_622.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_629 = new Test_547();
    try {
      const params_630 = mapConstructor_525(Object.freeze([pairConstructor_549("age", "not-a-number")]));
      let t_631 = userTable_545();
      let t_632 = csid_540("age");
      const cs_633 = changeset(t_631, params_630).cast(Object.freeze([t_632])).validateInt(csid_540("age"));
      let t_634 = ! cs_633.isValid;
      function fn_635() {
        return "should be invalid";
      }
      test_629.assert(t_634, fn_635);
      return;
    } finally {
      test_629.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_636 = new Test_547();
    try {
      const params_637 = mapConstructor_525(Object.freeze([pairConstructor_549("score", "9.5")]));
      let t_638 = userTable_545();
      let t_639 = csid_540("score");
      const cs_640 = changeset(t_638, params_637).cast(Object.freeze([t_639])).validateFloat(csid_540("score"));
      let t_641 = cs_640.isValid;
      function fn_642() {
        return "should be valid";
      }
      test_636.assert(t_641, fn_642);
      return;
    } finally {
      test_636.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_643 = new Test_547();
    try {
      const params_644 = mapConstructor_525(Object.freeze([pairConstructor_549("age", "9999999999")]));
      let t_645 = userTable_545();
      let t_646 = csid_540("age");
      const cs_647 = changeset(t_645, params_644).cast(Object.freeze([t_646])).validateInt64(csid_540("age"));
      let t_648 = cs_647.isValid;
      function fn_649() {
        return "should be valid";
      }
      test_643.assert(t_648, fn_649);
      return;
    } finally {
      test_643.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_650 = new Test_547();
    try {
      const params_651 = mapConstructor_525(Object.freeze([pairConstructor_549("age", "not-a-number")]));
      let t_652 = userTable_545();
      let t_653 = csid_540("age");
      const cs_654 = changeset(t_652, params_651).cast(Object.freeze([t_653])).validateInt64(csid_540("age"));
      let t_655 = ! cs_654.isValid;
      function fn_656() {
        return "should be invalid";
      }
      test_650.assert(t_655, fn_656);
      return;
    } finally {
      test_650.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_657 = new Test_547();
    try {
      function fn_658(v_659) {
        const params_660 = mapConstructor_525(Object.freeze([pairConstructor_549("active", v_659)]));
        let t_661 = userTable_545();
        let t_662 = csid_540("active");
        const cs_663 = changeset(t_661, params_660).cast(Object.freeze([t_662])).validateBool(csid_540("active"));
        let t_664 = cs_663.isValid;
        function fn_665() {
          return "should accept: " + v_659;
        }
        test_657.assert(t_664, fn_665);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_658);
      return;
    } finally {
      test_657.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_666 = new Test_547();
    try {
      function fn_667(v_668) {
        const params_669 = mapConstructor_525(Object.freeze([pairConstructor_549("active", v_668)]));
        let t_670 = userTable_545();
        let t_671 = csid_540("active");
        const cs_672 = changeset(t_670, params_669).cast(Object.freeze([t_671])).validateBool(csid_540("active"));
        let t_673 = cs_672.isValid;
        function fn_674() {
          return "should accept: " + v_668;
        }
        test_666.assert(t_673, fn_674);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_667);
      return;
    } finally {
      test_666.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_675 = new Test_547();
    try {
      function fn_676(v_677) {
        const params_678 = mapConstructor_525(Object.freeze([pairConstructor_549("active", v_677)]));
        let t_679 = userTable_545();
        let t_680 = csid_540("active");
        const cs_681 = changeset(t_679, params_678).cast(Object.freeze([t_680])).validateBool(csid_540("active"));
        let t_682 = ! cs_681.isValid;
        function fn_683() {
          return "should reject ambiguous: " + v_677;
        }
        test_675.assert(t_682, fn_683);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_676);
      return;
    } finally {
      test_675.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_684 = new Test_547();
    try {
      let t_685;
      const params_686 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Robert'); DROP TABLE users;--"), pairConstructor_549("email", "bobby@evil.com")]));
      let t_687 = userTable_545();
      let t_688 = csid_540("name");
      let t_689 = csid_540("email");
      const cs_690 = changeset(t_687, params_686).cast(Object.freeze([t_688, t_689])).validateRequired(Object.freeze([csid_540("name"), csid_540("email")]));
      let sqlFrag_691;
      try {
        t_685 = cs_690.toInsertSql();
        sqlFrag_691 = t_685;
      } catch {
        sqlFrag_691 = panic_544();
      }
      const s_692 = sqlFrag_691.toString();
      let t_693 = s_692.indexOf("''") >= 0;
      function fn_694() {
        return "single quote must be doubled: " + s_692;
      }
      test_684.assert(t_693, fn_694);
      return;
    } finally {
      test_684.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_695 = new Test_547();
    try {
      let t_696;
      const params_697 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Alice"), pairConstructor_549("email", "a@example.com")]));
      let t_698 = userTable_545();
      let t_699 = csid_540("name");
      let t_700 = csid_540("email");
      const cs_701 = changeset(t_698, params_697).cast(Object.freeze([t_699, t_700])).validateRequired(Object.freeze([csid_540("name"), csid_540("email")]));
      let sqlFrag_702;
      try {
        t_696 = cs_701.toInsertSql();
        sqlFrag_702 = t_696;
      } catch {
        sqlFrag_702 = panic_544();
      }
      const s_703 = sqlFrag_702.toString();
      let t_704 = s_703.indexOf("INSERT INTO users") >= 0;
      function fn_705() {
        return "has INSERT INTO: " + s_703;
      }
      test_695.assert(t_704, fn_705);
      let t_706 = s_703.indexOf("'Alice'") >= 0;
      function fn_707() {
        return "has quoted name: " + s_703;
      }
      test_695.assert(t_706, fn_707);
      return;
    } finally {
      test_695.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_708 = new Test_547();
    try {
      let t_709;
      const params_710 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Bob"), pairConstructor_549("email", "b@example.com"), pairConstructor_549("age", "25")]));
      let t_711 = userTable_545();
      let t_712 = csid_540("name");
      let t_713 = csid_540("email");
      let t_714 = csid_540("age");
      const cs_715 = changeset(t_711, params_710).cast(Object.freeze([t_712, t_713, t_714])).validateRequired(Object.freeze([csid_540("name"), csid_540("email")]));
      let sqlFrag_716;
      try {
        t_709 = cs_715.toInsertSql();
        sqlFrag_716 = t_709;
      } catch {
        sqlFrag_716 = panic_544();
      }
      const s_717 = sqlFrag_716.toString();
      let t_718 = s_717.indexOf("25") >= 0;
      function fn_719() {
        return "age rendered unquoted: " + s_717;
      }
      test_708.assert(t_718, fn_719);
      return;
    } finally {
      test_708.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_720 = new Test_547();
    try {
      const params_721 = mapConstructor_525(Object.freeze([]));
      let t_722 = userTable_545();
      let t_723 = csid_540("name");
      const cs_724 = changeset(t_722, params_721).cast(Object.freeze([t_723])).validateRequired(Object.freeze([csid_540("name")]));
      let didBubble_725;
      try {
        cs_724.toInsertSql();
        didBubble_725 = false;
      } catch {
        didBubble_725 = true;
      }
      function fn_726() {
        return "invalid changeset should bubble";
      }
      test_720.assert(didBubble_725, fn_726);
      return;
    } finally {
      test_720.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_727 = new Test_547();
    try {
      const strictTable_728 = new TableDef(csid_540("posts"), Object.freeze([new FieldDef(csid_540("title"), new StringField(), false), new FieldDef(csid_540("body"), new StringField(), true)]));
      const params_729 = mapConstructor_525(Object.freeze([pairConstructor_549("body", "hello")]));
      let t_730 = csid_540("body");
      const cs_731 = changeset(strictTable_728, params_729).cast(Object.freeze([t_730]));
      let t_732 = cs_731.isValid;
      function fn_733() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_727.assert(t_732, fn_733);
      let didBubble_734;
      try {
        cs_731.toInsertSql();
        didBubble_734 = false;
      } catch {
        didBubble_734 = true;
      }
      function fn_735() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_727.assert(didBubble_734, fn_735);
      return;
    } finally {
      test_727.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_736 = new Test_547();
    try {
      let t_737;
      const params_738 = mapConstructor_525(Object.freeze([pairConstructor_549("name", "Bob")]));
      let t_739 = userTable_545();
      let t_740 = csid_540("name");
      const cs_741 = changeset(t_739, params_738).cast(Object.freeze([t_740])).validateRequired(Object.freeze([csid_540("name")]));
      let sqlFrag_742;
      try {
        t_737 = cs_741.toUpdateSql(42);
        sqlFrag_742 = t_737;
      } catch {
        sqlFrag_742 = panic_544();
      }
      const s_743 = sqlFrag_742.toString();
      let t_744 = s_743 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_745() {
        return "got: " + s_743;
      }
      test_736.assert(t_744, fn_745);
      return;
    } finally {
      test_736.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_746 = new Test_547();
    try {
      const params_747 = mapConstructor_525(Object.freeze([]));
      let t_748 = userTable_545();
      let t_749 = csid_540("name");
      const cs_750 = changeset(t_748, params_747).cast(Object.freeze([t_749])).validateRequired(Object.freeze([csid_540("name")]));
      let didBubble_751;
      try {
        cs_750.toUpdateSql(1);
        didBubble_751 = false;
      } catch {
        didBubble_751 = true;
      }
      function fn_752() {
        return "invalid changeset should bubble";
      }
      test_746.assert(didBubble_751, fn_752);
      return;
    } finally {
      test_746.softFailToHard();
    }
});
/**
 * @param {string} name_761
 * @returns {SafeIdentifier}
 */
function sid_760(name_761) {
  let return_762;
  let t_763;
  try {
    t_763 = safeIdentifier(name_761);
    return_762 = t_763;
  } catch {
    return_762 = panic_544();
  }
  return return_762;
}
it("bare from produces SELECT *", function () {
    const test_764 = new Test_547();
    try {
      const q_765 = from(sid_760("users"));
      let t_766 = q_765.toSql().toString() === "SELECT * FROM users";
      function fn_767() {
        return "bare query";
      }
      test_764.assert(t_766, fn_767);
      return;
    } finally {
      test_764.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_768 = new Test_547();
    try {
      let t_769 = sid_760("users");
      let t_770 = sid_760("id");
      let t_771 = sid_760("name");
      const q_772 = from(t_769).select(Object.freeze([t_770, t_771]));
      let t_773 = q_772.toSql().toString() === "SELECT id, name FROM users";
      function fn_774() {
        return "select columns";
      }
      test_768.assert(t_773, fn_774);
      return;
    } finally {
      test_768.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_775 = new Test_547();
    try {
      let t_776 = sid_760("users");
      let t_777 = new SqlBuilder();
      t_777.appendSafe("age > ");
      t_777.appendInt32(18);
      let t_778 = t_777.accumulated;
      const q_779 = from(t_776).where(t_778);
      let t_780 = q_779.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_781() {
        return "where int";
      }
      test_775.assert(t_780, fn_781);
      return;
    } finally {
      test_775.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_782 = new Test_547();
    try {
      let t_783 = sid_760("users");
      let t_784 = new SqlBuilder();
      t_784.appendSafe("active = ");
      t_784.appendBoolean(true);
      let t_785 = t_784.accumulated;
      const q_786 = from(t_783).where(t_785);
      let t_787 = q_786.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_788() {
        return "where bool";
      }
      test_782.assert(t_787, fn_788);
      return;
    } finally {
      test_782.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_789 = new Test_547();
    try {
      let t_790 = sid_760("users");
      let t_791 = new SqlBuilder();
      t_791.appendSafe("age > ");
      t_791.appendInt32(18);
      let t_792 = t_791.accumulated;
      let t_793 = from(t_790).where(t_792);
      let t_794 = new SqlBuilder();
      t_794.appendSafe("active = ");
      t_794.appendBoolean(true);
      const q_795 = t_793.where(t_794.accumulated);
      let t_796 = q_795.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_797() {
        return "chained where";
      }
      test_789.assert(t_796, fn_797);
      return;
    } finally {
      test_789.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_798 = new Test_547();
    try {
      let t_799 = sid_760("users");
      let t_800 = sid_760("name");
      const q_801 = from(t_799).orderBy(t_800, true);
      let t_802 = q_801.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_803() {
        return "order asc";
      }
      test_798.assert(t_802, fn_803);
      return;
    } finally {
      test_798.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_804 = new Test_547();
    try {
      let t_805 = sid_760("users");
      let t_806 = sid_760("created_at");
      const q_807 = from(t_805).orderBy(t_806, false);
      let t_808 = q_807.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_809() {
        return "order desc";
      }
      test_804.assert(t_808, fn_809);
      return;
    } finally {
      test_804.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_810 = new Test_547();
    try {
      let t_811;
      let t_812;
      let q_813;
      try {
        t_811 = from(sid_760("users")).limit(10);
        t_812 = t_811.offset(20);
        q_813 = t_812;
      } catch {
        q_813 = panic_544();
      }
      let t_814 = q_813.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_815() {
        return "limit/offset";
      }
      test_810.assert(t_814, fn_815);
      return;
    } finally {
      test_810.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_816 = new Test_547();
    try {
      let didBubble_817;
      try {
        from(sid_760("users")).limit(-1);
        didBubble_817 = false;
      } catch {
        didBubble_817 = true;
      }
      function fn_818() {
        return "negative limit should bubble";
      }
      test_816.assert(didBubble_817, fn_818);
      return;
    } finally {
      test_816.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_819 = new Test_547();
    try {
      let didBubble_820;
      try {
        from(sid_760("users")).offset(-1);
        didBubble_820 = false;
      } catch {
        didBubble_820 = true;
      }
      function fn_821() {
        return "negative offset should bubble";
      }
      test_819.assert(didBubble_820, fn_821);
      return;
    } finally {
      test_819.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_822 = new Test_547();
    try {
      let t_823;
      let t_824;
      let t_825;
      let t_826;
      let t_827;
      let t_828;
      let t_829;
      let t_830;
      let t_831;
      let t_832;
      const minAge_833 = 21;
      let q_834;
      try {
        t_823 = sid_760("users");
        t_824 = sid_760("id");
        t_825 = sid_760("name");
        t_826 = sid_760("email");
        t_827 = from(t_823).select(Object.freeze([t_824, t_825, t_826]));
        t_828 = new SqlBuilder();
        t_828.appendSafe("age >= ");
        t_828.appendInt32(21);
        t_829 = t_827.where(t_828.accumulated);
        t_830 = new SqlBuilder();
        t_830.appendSafe("active = ");
        t_830.appendBoolean(true);
        t_831 = t_829.where(t_830.accumulated).orderBy(sid_760("name"), true).limit(25);
        t_832 = t_831.offset(0);
        q_834 = t_832;
      } catch {
        q_834 = panic_544();
      }
      let t_835 = q_834.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_836() {
        return "complex query";
      }
      test_822.assert(t_835, fn_836);
      return;
    } finally {
      test_822.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_837 = new Test_547();
    try {
      let t_838;
      let t_839;
      const q_840 = from(sid_760("users"));
      try {
        t_838 = q_840.safeToSql(100);
        t_839 = t_838;
      } catch {
        t_839 = panic_544();
      }
      const s_841 = t_839.toString();
      let t_842 = s_841 === "SELECT * FROM users LIMIT 100";
      function fn_843() {
        return "should have limit: " + s_841;
      }
      test_837.assert(t_842, fn_843);
      return;
    } finally {
      test_837.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_844 = new Test_547();
    try {
      let t_845;
      let t_846;
      let t_847;
      let q_848;
      try {
        t_845 = from(sid_760("users")).limit(5);
        q_848 = t_845;
      } catch {
        q_848 = panic_544();
      }
      try {
        t_846 = q_848.safeToSql(100);
        t_847 = t_846;
      } catch {
        t_847 = panic_544();
      }
      const s_849 = t_847.toString();
      let t_850 = s_849 === "SELECT * FROM users LIMIT 5";
      function fn_851() {
        return "explicit limit preserved: " + s_849;
      }
      test_844.assert(t_850, fn_851);
      return;
    } finally {
      test_844.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_852 = new Test_547();
    try {
      let didBubble_853;
      try {
        from(sid_760("users")).safeToSql(-1);
        didBubble_853 = false;
      } catch {
        didBubble_853 = true;
      }
      function fn_854() {
        return "negative defaultLimit should bubble";
      }
      test_852.assert(didBubble_853, fn_854);
      return;
    } finally {
      test_852.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_855 = new Test_547();
    try {
      const evil_856 = "'; DROP TABLE users; --";
      let t_857 = sid_760("users");
      let t_858 = new SqlBuilder();
      t_858.appendSafe("name = ");
      t_858.appendString("'; DROP TABLE users; --");
      let t_859 = t_858.accumulated;
      const q_860 = from(t_857).where(t_859);
      const s_861 = q_860.toSql().toString();
      let t_862 = s_861.indexOf("''") >= 0;
      function fn_863() {
        return "quotes must be doubled: " + s_861;
      }
      test_855.assert(t_862, fn_863);
      let t_864 = s_861.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_865() {
        return "structure intact: " + s_861;
      }
      test_855.assert(t_864, fn_865);
      return;
    } finally {
      test_855.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_866 = new Test_547();
    try {
      const attack_867 = "users; DROP TABLE users; --";
      let didBubble_868;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_868 = false;
      } catch {
        didBubble_868 = true;
      }
      function fn_869() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_866.assert(didBubble_868, fn_869);
      return;
    } finally {
      test_866.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_870 = new Test_547();
    try {
      let t_871 = sid_760("users");
      let t_872 = sid_760("orders");
      let t_873 = new SqlBuilder();
      t_873.appendSafe("users.id = orders.user_id");
      let t_874 = t_873.accumulated;
      const q_875 = from(t_871).innerJoin(t_872, t_874);
      let t_876 = q_875.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_877() {
        return "inner join";
      }
      test_870.assert(t_876, fn_877);
      return;
    } finally {
      test_870.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_878 = new Test_547();
    try {
      let t_879 = sid_760("users");
      let t_880 = sid_760("profiles");
      let t_881 = new SqlBuilder();
      t_881.appendSafe("users.id = profiles.user_id");
      let t_882 = t_881.accumulated;
      const q_883 = from(t_879).leftJoin(t_880, t_882);
      let t_884 = q_883.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_885() {
        return "left join";
      }
      test_878.assert(t_884, fn_885);
      return;
    } finally {
      test_878.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_886 = new Test_547();
    try {
      let t_887 = sid_760("orders");
      let t_888 = sid_760("users");
      let t_889 = new SqlBuilder();
      t_889.appendSafe("orders.user_id = users.id");
      let t_890 = t_889.accumulated;
      const q_891 = from(t_887).rightJoin(t_888, t_890);
      let t_892 = q_891.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_893() {
        return "right join";
      }
      test_886.assert(t_892, fn_893);
      return;
    } finally {
      test_886.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_894 = new Test_547();
    try {
      let t_895 = sid_760("users");
      let t_896 = sid_760("orders");
      let t_897 = new SqlBuilder();
      t_897.appendSafe("users.id = orders.user_id");
      let t_898 = t_897.accumulated;
      const q_899 = from(t_895).fullJoin(t_896, t_898);
      let t_900 = q_899.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_901() {
        return "full join";
      }
      test_894.assert(t_900, fn_901);
      return;
    } finally {
      test_894.softFailToHard();
    }
});
it("chained joins", function () {
    const test_902 = new Test_547();
    try {
      let t_903 = sid_760("users");
      let t_904 = sid_760("orders");
      let t_905 = new SqlBuilder();
      t_905.appendSafe("users.id = orders.user_id");
      let t_906 = t_905.accumulated;
      let t_907 = from(t_903).innerJoin(t_904, t_906);
      let t_908 = sid_760("profiles");
      let t_909 = new SqlBuilder();
      t_909.appendSafe("users.id = profiles.user_id");
      const q_910 = t_907.leftJoin(t_908, t_909.accumulated);
      let t_911 = q_910.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_912() {
        return "chained joins";
      }
      test_902.assert(t_911, fn_912);
      return;
    } finally {
      test_902.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_913 = new Test_547();
    try {
      let t_914;
      let t_915;
      let t_916;
      let t_917;
      let t_918;
      let t_919;
      let t_920;
      let q_921;
      try {
        t_914 = sid_760("users");
        t_915 = sid_760("orders");
        t_916 = new SqlBuilder();
        t_916.appendSafe("users.id = orders.user_id");
        t_917 = t_916.accumulated;
        t_918 = from(t_914).innerJoin(t_915, t_917);
        t_919 = new SqlBuilder();
        t_919.appendSafe("orders.total > ");
        t_919.appendInt32(100);
        t_920 = t_918.where(t_919.accumulated).orderBy(sid_760("name"), true).limit(10);
        q_921 = t_920;
      } catch {
        q_921 = panic_544();
      }
      let t_922 = q_921.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_923() {
        return "join with where/order/limit";
      }
      test_913.assert(t_922, fn_923);
      return;
    } finally {
      test_913.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_924 = new Test_547();
    try {
      const c_925 = col(sid_760("users"), sid_760("id"));
      let t_926 = c_925.toString() === "users.id";
      function fn_927() {
        return "col helper";
      }
      test_924.assert(t_926, fn_927);
      return;
    } finally {
      test_924.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_928 = new Test_547();
    try {
      const onCond_929 = col(sid_760("users"), sid_760("id"));
      const b_930 = new SqlBuilder();
      b_930.appendFragment(onCond_929);
      b_930.appendSafe(" = ");
      b_930.appendFragment(col(sid_760("orders"), sid_760("user_id")));
      let t_931 = sid_760("users");
      let t_932 = sid_760("orders");
      let t_933 = b_930.accumulated;
      const q_934 = from(t_931).innerJoin(t_932, t_933);
      let t_935 = q_934.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_936() {
        return "join with col";
      }
      test_928.assert(t_935, fn_936);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_937 = new Test_547();
    try {
      let t_938 = sid_760("users");
      let t_939 = new SqlBuilder();
      t_939.appendSafe("status = ");
      t_939.appendString("active");
      let t_940 = t_939.accumulated;
      const q_941 = from(t_938).orWhere(t_940);
      let t_942 = q_941.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_943() {
        return "orWhere basic";
      }
      test_937.assert(t_942, fn_943);
      return;
    } finally {
      test_937.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_944 = new Test_547();
    try {
      let t_945 = sid_760("users");
      let t_946 = new SqlBuilder();
      t_946.appendSafe("age > ");
      t_946.appendInt32(18);
      let t_947 = t_946.accumulated;
      let t_948 = from(t_945).where(t_947);
      let t_949 = new SqlBuilder();
      t_949.appendSafe("vip = ");
      t_949.appendBoolean(true);
      const q_950 = t_948.orWhere(t_949.accumulated);
      let t_951 = q_950.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_952() {
        return "where then orWhere";
      }
      test_944.assert(t_951, fn_952);
      return;
    } finally {
      test_944.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_953 = new Test_547();
    try {
      let t_954 = sid_760("users");
      let t_955 = new SqlBuilder();
      t_955.appendSafe("active = ");
      t_955.appendBoolean(true);
      let t_956 = t_955.accumulated;
      let t_957 = from(t_954).where(t_956);
      let t_958 = new SqlBuilder();
      t_958.appendSafe("role = ");
      t_958.appendString("admin");
      let t_959 = t_957.orWhere(t_958.accumulated);
      let t_960 = new SqlBuilder();
      t_960.appendSafe("role = ");
      t_960.appendString("moderator");
      const q_961 = t_959.orWhere(t_960.accumulated);
      let t_962 = q_961.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_963() {
        return "multiple orWhere";
      }
      test_953.assert(t_962, fn_963);
      return;
    } finally {
      test_953.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_964 = new Test_547();
    try {
      let t_965 = sid_760("users");
      let t_966 = new SqlBuilder();
      t_966.appendSafe("age > ");
      t_966.appendInt32(18);
      let t_967 = t_966.accumulated;
      let t_968 = from(t_965).where(t_967);
      let t_969 = new SqlBuilder();
      t_969.appendSafe("active = ");
      t_969.appendBoolean(true);
      let t_970 = t_968.where(t_969.accumulated);
      let t_971 = new SqlBuilder();
      t_971.appendSafe("vip = ");
      t_971.appendBoolean(true);
      const q_972 = t_970.orWhere(t_971.accumulated);
      let t_973 = q_972.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_974() {
        return "mixed where and orWhere";
      }
      test_964.assert(t_973, fn_974);
      return;
    } finally {
      test_964.softFailToHard();
    }
});
it("whereNull", function () {
    const test_975 = new Test_547();
    try {
      let t_976 = sid_760("users");
      let t_977 = sid_760("deleted_at");
      const q_978 = from(t_976).whereNull(t_977);
      let t_979 = q_978.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_980() {
        return "whereNull";
      }
      test_975.assert(t_979, fn_980);
      return;
    } finally {
      test_975.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_981 = new Test_547();
    try {
      let t_982 = sid_760("users");
      let t_983 = sid_760("email");
      const q_984 = from(t_982).whereNotNull(t_983);
      let t_985 = q_984.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_986() {
        return "whereNotNull";
      }
      test_981.assert(t_985, fn_986);
      return;
    } finally {
      test_981.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_987 = new Test_547();
    try {
      let t_988 = sid_760("users");
      let t_989 = new SqlBuilder();
      t_989.appendSafe("active = ");
      t_989.appendBoolean(true);
      let t_990 = t_989.accumulated;
      const q_991 = from(t_988).where(t_990).whereNull(sid_760("deleted_at"));
      let t_992 = q_991.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_993() {
        return "whereNull chained";
      }
      test_987.assert(t_992, fn_993);
      return;
    } finally {
      test_987.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_994 = new Test_547();
    try {
      let t_995 = sid_760("users");
      let t_996 = sid_760("deleted_at");
      let t_997 = from(t_995).whereNull(t_996);
      let t_998 = new SqlBuilder();
      t_998.appendSafe("role = ");
      t_998.appendString("admin");
      const q_999 = t_997.orWhere(t_998.accumulated);
      let t_1000 = q_999.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1001() {
        return "whereNotNull with orWhere";
      }
      test_994.assert(t_1000, fn_1001);
      return;
    } finally {
      test_994.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1002 = new Test_547();
    try {
      let t_1003 = sid_760("users");
      let t_1004 = sid_760("id");
      let t_1005 = new SqlInt32(1);
      let t_1006 = new SqlInt32(2);
      let t_1007 = new SqlInt32(3);
      const q_1008 = from(t_1003).whereIn(t_1004, Object.freeze([t_1005, t_1006, t_1007]));
      let t_1009 = q_1008.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1010() {
        return "whereIn ints";
      }
      test_1002.assert(t_1009, fn_1010);
      return;
    } finally {
      test_1002.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1011 = new Test_547();
    try {
      let t_1012 = sid_760("users");
      let t_1013 = sid_760("name");
      let t_1014 = new SqlString("Alice");
      let t_1015 = new SqlString("Bob's");
      const q_1016 = from(t_1012).whereIn(t_1013, Object.freeze([t_1014, t_1015]));
      let t_1017 = q_1016.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1018() {
        return "whereIn strings";
      }
      test_1011.assert(t_1017, fn_1018);
      return;
    } finally {
      test_1011.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1019 = new Test_547();
    try {
      let t_1020 = sid_760("users");
      let t_1021 = sid_760("id");
      const q_1022 = from(t_1020).whereIn(t_1021, Object.freeze([]));
      let t_1023 = q_1022.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1024() {
        return "whereIn empty";
      }
      test_1019.assert(t_1023, fn_1024);
      return;
    } finally {
      test_1019.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1025 = new Test_547();
    try {
      let t_1026 = sid_760("users");
      let t_1027 = new SqlBuilder();
      t_1027.appendSafe("active = ");
      t_1027.appendBoolean(true);
      let t_1028 = t_1027.accumulated;
      const q_1029 = from(t_1026).where(t_1028).whereIn(sid_760("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1030 = q_1029.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1031() {
        return "whereIn chained";
      }
      test_1025.assert(t_1030, fn_1031);
      return;
    } finally {
      test_1025.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1032 = new Test_547();
    try {
      let t_1033 = sid_760("users");
      let t_1034 = sid_760("id");
      let t_1035 = new SqlInt32(42);
      const q_1036 = from(t_1033).whereIn(t_1034, Object.freeze([t_1035]));
      let t_1037 = q_1036.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1038() {
        return "whereIn single";
      }
      test_1032.assert(t_1037, fn_1038);
      return;
    } finally {
      test_1032.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1039 = new Test_547();
    try {
      let t_1040 = sid_760("users");
      let t_1041 = new SqlBuilder();
      t_1041.appendSafe("active = ");
      t_1041.appendBoolean(true);
      let t_1042 = t_1041.accumulated;
      const q_1043 = from(t_1040).whereNot(t_1042);
      let t_1044 = q_1043.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1045() {
        return "whereNot";
      }
      test_1039.assert(t_1044, fn_1045);
      return;
    } finally {
      test_1039.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1046 = new Test_547();
    try {
      let t_1047 = sid_760("users");
      let t_1048 = new SqlBuilder();
      t_1048.appendSafe("age > ");
      t_1048.appendInt32(18);
      let t_1049 = t_1048.accumulated;
      let t_1050 = from(t_1047).where(t_1049);
      let t_1051 = new SqlBuilder();
      t_1051.appendSafe("banned = ");
      t_1051.appendBoolean(true);
      const q_1052 = t_1050.whereNot(t_1051.accumulated);
      let t_1053 = q_1052.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1054() {
        return "whereNot chained";
      }
      test_1046.assert(t_1053, fn_1054);
      return;
    } finally {
      test_1046.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1055 = new Test_547();
    try {
      let t_1056 = sid_760("users");
      let t_1057 = sid_760("age");
      let t_1058 = new SqlInt32(18);
      let t_1059 = new SqlInt32(65);
      const q_1060 = from(t_1056).whereBetween(t_1057, t_1058, t_1059);
      let t_1061 = q_1060.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1062() {
        return "whereBetween ints";
      }
      test_1055.assert(t_1061, fn_1062);
      return;
    } finally {
      test_1055.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1063 = new Test_547();
    try {
      let t_1064 = sid_760("users");
      let t_1065 = new SqlBuilder();
      t_1065.appendSafe("active = ");
      t_1065.appendBoolean(true);
      let t_1066 = t_1065.accumulated;
      const q_1067 = from(t_1064).where(t_1066).whereBetween(sid_760("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1068 = q_1067.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1069() {
        return "whereBetween chained";
      }
      test_1063.assert(t_1068, fn_1069);
      return;
    } finally {
      test_1063.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1070 = new Test_547();
    try {
      let t_1071 = sid_760("users");
      let t_1072 = sid_760("name");
      const q_1073 = from(t_1071).whereLike(t_1072, "John%");
      let t_1074 = q_1073.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1075() {
        return "whereLike";
      }
      test_1070.assert(t_1074, fn_1075);
      return;
    } finally {
      test_1070.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1076 = new Test_547();
    try {
      let t_1077 = sid_760("users");
      let t_1078 = sid_760("email");
      const q_1079 = from(t_1077).whereILike(t_1078, "%@gmail.com");
      let t_1080 = q_1079.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1081() {
        return "whereILike";
      }
      test_1076.assert(t_1080, fn_1081);
      return;
    } finally {
      test_1076.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1082 = new Test_547();
    try {
      let t_1083 = sid_760("users");
      let t_1084 = sid_760("name");
      const q_1085 = from(t_1083).whereLike(t_1084, "'; DROP TABLE users; --");
      const s_1086 = q_1085.toSql().toString();
      let t_1087 = s_1086.indexOf("''") >= 0;
      function fn_1088() {
        return "like injection escaped: " + s_1086;
      }
      test_1082.assert(t_1087, fn_1088);
      let t_1089 = s_1086.indexOf("LIKE") >= 0;
      function fn_1090() {
        return "like structure intact: " + s_1086;
      }
      test_1082.assert(t_1089, fn_1090);
      return;
    } finally {
      test_1082.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1091 = new Test_547();
    try {
      let t_1092 = sid_760("users");
      let t_1093 = sid_760("name");
      const q_1094 = from(t_1092).whereLike(t_1093, "%son%");
      let t_1095 = q_1094.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1096() {
        return "whereLike wildcard";
      }
      test_1091.assert(t_1095, fn_1096);
      return;
    } finally {
      test_1091.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1097 = new Test_547();
    try {
      let t_1098;
      let id_1099;
      try {
        t_1098 = safeIdentifier("user_name");
        id_1099 = t_1098;
      } catch {
        id_1099 = panic_544();
      }
      let t_1100 = id_1099.sqlValue === "user_name";
      function fn_1101() {
        return "value should round-trip";
      }
      test_1097.assert(t_1100, fn_1101);
      return;
    } finally {
      test_1097.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1102 = new Test_547();
    try {
      let didBubble_1103;
      try {
        safeIdentifier("");
        didBubble_1103 = false;
      } catch {
        didBubble_1103 = true;
      }
      function fn_1104() {
        return "empty string should bubble";
      }
      test_1102.assert(didBubble_1103, fn_1104);
      return;
    } finally {
      test_1102.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1105 = new Test_547();
    try {
      let didBubble_1106;
      try {
        safeIdentifier("1col");
        didBubble_1106 = false;
      } catch {
        didBubble_1106 = true;
      }
      function fn_1107() {
        return "leading digit should bubble";
      }
      test_1105.assert(didBubble_1106, fn_1107);
      return;
    } finally {
      test_1105.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1108 = new Test_547();
    try {
      const cases_1109 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_1110(c_1111) {
        let didBubble_1112;
        try {
          safeIdentifier(c_1111);
          didBubble_1112 = false;
        } catch {
          didBubble_1112 = true;
        }
        function fn_1113() {
          return "should reject: " + c_1111;
        }
        test_1108.assert(didBubble_1112, fn_1113);
        return;
      }
      cases_1109.forEach(fn_1110);
      return;
    } finally {
      test_1108.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1114 = new Test_547();
    try {
      let t_1115;
      let t_1116;
      let t_1117;
      let t_1118;
      let t_1119;
      let t_1120;
      let t_1121;
      try {
        t_1115 = safeIdentifier("users");
        t_1116 = t_1115;
      } catch {
        t_1116 = panic_544();
      }
      try {
        t_1117 = safeIdentifier("name");
        t_1118 = t_1117;
      } catch {
        t_1118 = panic_544();
      }
      let t_1122 = new StringField();
      let t_1123 = new FieldDef(t_1118, t_1122, false);
      try {
        t_1119 = safeIdentifier("age");
        t_1120 = t_1119;
      } catch {
        t_1120 = panic_544();
      }
      let t_1124 = new IntField();
      let t_1125 = new FieldDef(t_1120, t_1124, false);
      const td_1126 = new TableDef(t_1116, Object.freeze([t_1123, t_1125]));
      let f_1127;
      try {
        t_1121 = td_1126.field("age");
        f_1127 = t_1121;
      } catch {
        f_1127 = panic_544();
      }
      let t_1128 = f_1127.name.sqlValue === "age";
      function fn_1129() {
        return "should find age field";
      }
      test_1114.assert(t_1128, fn_1129);
      return;
    } finally {
      test_1114.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1130 = new Test_547();
    try {
      let t_1131;
      let t_1132;
      let t_1133;
      let t_1134;
      try {
        t_1131 = safeIdentifier("users");
        t_1132 = t_1131;
      } catch {
        t_1132 = panic_544();
      }
      try {
        t_1133 = safeIdentifier("name");
        t_1134 = t_1133;
      } catch {
        t_1134 = panic_544();
      }
      let t_1135 = new StringField();
      let t_1136 = new FieldDef(t_1134, t_1135, false);
      const td_1137 = new TableDef(t_1132, Object.freeze([t_1136]));
      let didBubble_1138;
      try {
        td_1137.field("nonexistent");
        didBubble_1138 = false;
      } catch {
        didBubble_1138 = true;
      }
      function fn_1139() {
        return "unknown field should bubble";
      }
      test_1130.assert(didBubble_1138, fn_1139);
      return;
    } finally {
      test_1130.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1140 = new Test_547();
    try {
      let t_1141;
      let t_1142;
      let t_1143;
      let t_1144;
      try {
        t_1141 = safeIdentifier("email");
        t_1142 = t_1141;
      } catch {
        t_1142 = panic_544();
      }
      let t_1145 = new StringField();
      const required_1146 = new FieldDef(t_1142, t_1145, false);
      try {
        t_1143 = safeIdentifier("bio");
        t_1144 = t_1143;
      } catch {
        t_1144 = panic_544();
      }
      let t_1147 = new StringField();
      const optional_1148 = new FieldDef(t_1144, t_1147, true);
      let t_1149 = ! required_1146.nullable;
      function fn_1150() {
        return "required field should not be nullable";
      }
      test_1140.assert(t_1149, fn_1150);
      let t_1151 = optional_1148.nullable;
      function fn_1152() {
        return "optional field should be nullable";
      }
      test_1140.assert(t_1151, fn_1152);
      return;
    } finally {
      test_1140.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1153 = new Test_547();
    try {
      function build_1154(name_1155) {
        let t_1156 = new SqlBuilder();
        t_1156.appendSafe("select * from hi where name = ");
        t_1156.appendString(name_1155);
        return t_1156.accumulated.toString();
      }
      function buildWrong_1157(name_1158) {
        return "select * from hi where name = '" + name_1158 + "'";
      }
      const actual_1159 = build_1154("world");
      let t_1160 = actual_1159 === "select * from hi where name = 'world'";
      function fn_1161() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_1159 + ")";
      }
      test_1153.assert(t_1160, fn_1161);
      const bobbyTables_1162 = "Robert'); drop table hi;--";
      const actual_1163 = build_1154("Robert'); drop table hi;--");
      let t_1164 = actual_1163 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_1165() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_1163 + ")";
      }
      test_1153.assert(t_1164, fn_1165);
      function fn_1166() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1153.assert(true, fn_1166);
      return;
    } finally {
      test_1153.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1167 = new Test_547();
    try {
      let t_1168 = new SqlBuilder();
      t_1168.appendSafe("v = ");
      t_1168.appendString("");
      const actual_1169 = t_1168.accumulated.toString();
      let t_1170 = actual_1169 === "v = ''";
      function fn_1171() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1169 + ")";
      }
      test_1167.assert(t_1170, fn_1171);
      let t_1172 = new SqlBuilder();
      t_1172.appendSafe("v = ");
      t_1172.appendString("a''b");
      const actual_1173 = t_1172.accumulated.toString();
      let t_1174 = actual_1173 === "v = 'a''''b'";
      function fn_1175() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1173 + ")";
      }
      test_1167.assert(t_1174, fn_1175);
      let t_1176 = new SqlBuilder();
      t_1176.appendSafe("v = ");
      t_1176.appendString("Hello 世界");
      const actual_1177 = t_1176.accumulated.toString();
      let t_1178 = actual_1177 === "v = 'Hello 世界'";
      function fn_1179() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1177 + ")";
      }
      test_1167.assert(t_1178, fn_1179);
      let t_1180 = new SqlBuilder();
      t_1180.appendSafe("v = ");
      t_1180.appendString("Line1\nLine2");
      const actual_1181 = t_1180.accumulated.toString();
      let t_1182 = actual_1181 === "v = 'Line1\nLine2'";
      function fn_1183() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1181 + ")";
      }
      test_1167.assert(t_1182, fn_1183);
      return;
    } finally {
      test_1167.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1184 = new Test_547();
    try {
      let t_1185;
      let t_1186 = new SqlBuilder();
      t_1186.appendSafe("select ");
      t_1186.appendInt32(42);
      t_1186.appendSafe(", ");
      t_1186.appendInt64(BigInt("43"));
      t_1186.appendSafe(", ");
      t_1186.appendFloat64(19.99);
      t_1186.appendSafe(", ");
      t_1186.appendBoolean(true);
      t_1186.appendSafe(", ");
      t_1186.appendBoolean(false);
      const actual_1187 = t_1186.accumulated.toString();
      let t_1188 = actual_1187 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_1189() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1187 + ")";
      }
      test_1184.assert(t_1188, fn_1189);
      let date_1190;
      try {
        t_1185 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_1190 = t_1185;
      } catch {
        date_1190 = panic_544();
      }
      let t_1191 = new SqlBuilder();
      t_1191.appendSafe("insert into t values (");
      t_1191.appendDate(date_1190);
      t_1191.appendSafe(")");
      const actual_1192 = t_1191.accumulated.toString();
      let t_1193 = actual_1192 === "insert into t values ('2024-12-25')";
      function fn_1194() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1192 + ")";
      }
      test_1184.assert(t_1193, fn_1194);
      return;
    } finally {
      test_1184.softFailToHard();
    }
});
it("lists", function () {
    const test_1195 = new Test_547();
    try {
      let t_1196;
      let t_1197;
      let t_1198;
      let t_1199;
      let t_1200 = new SqlBuilder();
      t_1200.appendSafe("v IN (");
      t_1200.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_1200.appendSafe(")");
      const actual_1201 = t_1200.accumulated.toString();
      let t_1202 = actual_1201 === "v IN ('a', 'b', 'c''d')";
      function fn_1203() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1201 + ")";
      }
      test_1195.assert(t_1202, fn_1203);
      let t_1204 = new SqlBuilder();
      t_1204.appendSafe("v IN (");
      t_1204.appendInt32List(Object.freeze([1, 2, 3]));
      t_1204.appendSafe(")");
      const actual_1205 = t_1204.accumulated.toString();
      let t_1206 = actual_1205 === "v IN (1, 2, 3)";
      function fn_1207() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1205 + ")";
      }
      test_1195.assert(t_1206, fn_1207);
      let t_1208 = new SqlBuilder();
      t_1208.appendSafe("v IN (");
      t_1208.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_1208.appendSafe(")");
      const actual_1209 = t_1208.accumulated.toString();
      let t_1210 = actual_1209 === "v IN (1, 2)";
      function fn_1211() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1209 + ")";
      }
      test_1195.assert(t_1210, fn_1211);
      let t_1212 = new SqlBuilder();
      t_1212.appendSafe("v IN (");
      t_1212.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1212.appendSafe(")");
      const actual_1213 = t_1212.accumulated.toString();
      let t_1214 = actual_1213 === "v IN (1.0, 2.0)";
      function fn_1215() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1213 + ")";
      }
      test_1195.assert(t_1214, fn_1215);
      let t_1216 = new SqlBuilder();
      t_1216.appendSafe("v IN (");
      t_1216.appendBooleanList(Object.freeze([true, false]));
      t_1216.appendSafe(")");
      const actual_1217 = t_1216.accumulated.toString();
      let t_1218 = actual_1217 === "v IN (TRUE, FALSE)";
      function fn_1219() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1217 + ")";
      }
      test_1195.assert(t_1218, fn_1219);
      try {
        t_1196 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_1197 = t_1196;
      } catch {
        t_1197 = panic_544();
      }
      try {
        t_1198 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_1199 = t_1198;
      } catch {
        t_1199 = panic_544();
      }
      const dates_1220 = Object.freeze([t_1197, t_1199]);
      let t_1221 = new SqlBuilder();
      t_1221.appendSafe("v IN (");
      t_1221.appendDateList(dates_1220);
      t_1221.appendSafe(")");
      const actual_1222 = t_1221.accumulated.toString();
      let t_1223 = actual_1222 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1224() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1222 + ")";
      }
      test_1195.assert(t_1223, fn_1224);
      return;
    } finally {
      test_1195.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1225 = new Test_547();
    try {
      let nan_1226;
      nan_1226 = 0.0 / 0.0;
      let t_1227 = new SqlBuilder();
      t_1227.appendSafe("v = ");
      t_1227.appendFloat64(nan_1226);
      const actual_1228 = t_1227.accumulated.toString();
      let t_1229 = actual_1228 === "v = NULL";
      function fn_1230() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1228 + ")";
      }
      test_1225.assert(t_1229, fn_1230);
      return;
    } finally {
      test_1225.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1231 = new Test_547();
    try {
      let inf_1232;
      inf_1232 = 1.0 / 0.0;
      let t_1233 = new SqlBuilder();
      t_1233.appendSafe("v = ");
      t_1233.appendFloat64(inf_1232);
      const actual_1234 = t_1233.accumulated.toString();
      let t_1235 = actual_1234 === "v = NULL";
      function fn_1236() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1234 + ")";
      }
      test_1231.assert(t_1235, fn_1236);
      return;
    } finally {
      test_1231.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1237 = new Test_547();
    try {
      let ninf_1238;
      ninf_1238 = -1.0 / 0.0;
      let t_1239 = new SqlBuilder();
      t_1239.appendSafe("v = ");
      t_1239.appendFloat64(ninf_1238);
      const actual_1240 = t_1239.accumulated.toString();
      let t_1241 = actual_1240 === "v = NULL";
      function fn_1242() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1240 + ")";
      }
      test_1237.assert(t_1241, fn_1242);
      return;
    } finally {
      test_1237.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1243 = new Test_547();
    try {
      let t_1244 = new SqlBuilder();
      t_1244.appendSafe("v = ");
      t_1244.appendFloat64(3.14);
      const actual_1245 = t_1244.accumulated.toString();
      let t_1246 = actual_1245 === "v = 3.14";
      function fn_1247() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1245 + ")";
      }
      test_1243.assert(t_1246, fn_1247);
      let t_1248 = new SqlBuilder();
      t_1248.appendSafe("v = ");
      t_1248.appendFloat64(0.0);
      const actual_1249 = t_1248.accumulated.toString();
      let t_1250 = actual_1249 === "v = 0.0";
      function fn_1251() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1249 + ")";
      }
      test_1243.assert(t_1250, fn_1251);
      let t_1252 = new SqlBuilder();
      t_1252.appendSafe("v = ");
      t_1252.appendFloat64(-42.5);
      const actual_1253 = t_1252.accumulated.toString();
      let t_1254 = actual_1253 === "v = -42.5";
      function fn_1255() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1253 + ")";
      }
      test_1243.assert(t_1254, fn_1255);
      return;
    } finally {
      test_1243.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1256 = new Test_547();
    try {
      let t_1257;
      let d_1258;
      try {
        t_1257 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1258 = t_1257;
      } catch {
        d_1258 = panic_544();
      }
      let t_1259 = new SqlBuilder();
      t_1259.appendSafe("v = ");
      t_1259.appendDate(d_1258);
      const actual_1260 = t_1259.accumulated.toString();
      let t_1261 = actual_1260 === "v = '2024-06-15'";
      function fn_1262() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1260 + ")";
      }
      test_1256.assert(t_1261, fn_1262);
      return;
    } finally {
      test_1256.softFailToHard();
    }
});
it("nesting", function () {
    const test_1263 = new Test_547();
    try {
      const name_1264 = "Someone";
      let t_1265 = new SqlBuilder();
      t_1265.appendSafe("where p.last_name = ");
      t_1265.appendString("Someone");
      const condition_1266 = t_1265.accumulated;
      let t_1267 = new SqlBuilder();
      t_1267.appendSafe("select p.id from person p ");
      t_1267.appendFragment(condition_1266);
      const actual_1268 = t_1267.accumulated.toString();
      let t_1269 = actual_1268 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1270() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1268 + ")";
      }
      test_1263.assert(t_1269, fn_1270);
      let t_1271 = new SqlBuilder();
      t_1271.appendSafe("select p.id from person p ");
      t_1271.appendPart(condition_1266.toSource());
      const actual_1272 = t_1271.accumulated.toString();
      let t_1273 = actual_1272 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1274() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1272 + ")";
      }
      test_1263.assert(t_1273, fn_1274);
      const parts_1275 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1276 = new SqlBuilder();
      t_1276.appendSafe("select ");
      t_1276.appendPartList(parts_1275);
      const actual_1277 = t_1276.accumulated.toString();
      let t_1278 = actual_1277 === "select 'a''b', 3";
      function fn_1279() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1277 + ")";
      }
      test_1263.assert(t_1278, fn_1279);
      return;
    } finally {
      test_1263.softFailToHard();
    }
});
