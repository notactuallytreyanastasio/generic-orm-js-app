import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, from, maxCol, minCol, safeIdentifier, sumCol
} from "../src.js";
import {
  Test as Test_590
} from "@temperlang/std/testing";
import {
  panic as panic_587, mapConstructor as mapConstructor_568, pairConstructor as pairConstructor_592, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_584
 * @returns {SafeIdentifier}
 */
function csid_583(name_584) {
  let return_585;
  let t_586;
  try {
    t_586 = safeIdentifier(name_584);
    return_585 = t_586;
  } catch {
    return_585 = panic_587();
  }
  return return_585;
}
/** @returns {TableDef} */
function userTable_588() {
  return new TableDef(csid_583("users"), Object.freeze([new FieldDef(csid_583("name"), new StringField(), false), new FieldDef(csid_583("email"), new StringField(), false), new FieldDef(csid_583("age"), new IntField(), true), new FieldDef(csid_583("score"), new FloatField(), true), new FieldDef(csid_583("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_589 = new Test_590();
    try {
      const params_591 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Alice"), pairConstructor_592("email", "alice@example.com"), pairConstructor_592("admin", "true")]));
      let t_593 = userTable_588();
      let t_594 = csid_583("name");
      let t_595 = csid_583("email");
      const cs_596 = changeset(t_593, params_591).cast(Object.freeze([t_594, t_595]));
      let t_597 = cs_596.changes.has("name");
      function fn_598() {
        return "name should be in changes";
      }
      test_589.assert(t_597, fn_598);
      let t_599 = cs_596.changes.has("email");
      function fn_600() {
        return "email should be in changes";
      }
      test_589.assert(t_599, fn_600);
      let t_601 = ! cs_596.changes.has("admin");
      function fn_602() {
        return "admin must be dropped (not in whitelist)";
      }
      test_589.assert(t_601, fn_602);
      let t_603 = cs_596.isValid;
      function fn_604() {
        return "should still be valid";
      }
      test_589.assert(t_603, fn_604);
      return;
    } finally {
      test_589.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_605 = new Test_590();
    try {
      const params_606 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Alice"), pairConstructor_592("email", "alice@example.com")]));
      let t_607 = userTable_588();
      let t_608 = csid_583("name");
      const cs_609 = changeset(t_607, params_606).cast(Object.freeze([t_608])).cast(Object.freeze([csid_583("email")]));
      let t_610 = ! cs_609.changes.has("name");
      function fn_611() {
        return "name must be excluded by second cast";
      }
      test_605.assert(t_610, fn_611);
      let t_612 = cs_609.changes.has("email");
      function fn_613() {
        return "email should be present";
      }
      test_605.assert(t_612, fn_613);
      return;
    } finally {
      test_605.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_614 = new Test_590();
    try {
      const params_615 = mapConstructor_568(Object.freeze([pairConstructor_592("name", ""), pairConstructor_592("email", "bob@example.com")]));
      let t_616 = userTable_588();
      let t_617 = csid_583("name");
      let t_618 = csid_583("email");
      const cs_619 = changeset(t_616, params_615).cast(Object.freeze([t_617, t_618]));
      let t_620 = ! cs_619.changes.has("name");
      function fn_621() {
        return "empty name should not be in changes";
      }
      test_614.assert(t_620, fn_621);
      let t_622 = cs_619.changes.has("email");
      function fn_623() {
        return "email should be in changes";
      }
      test_614.assert(t_622, fn_623);
      return;
    } finally {
      test_614.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_624 = new Test_590();
    try {
      const params_625 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Alice")]));
      let t_626 = userTable_588();
      let t_627 = csid_583("name");
      const cs_628 = changeset(t_626, params_625).cast(Object.freeze([t_627])).validateRequired(Object.freeze([csid_583("name")]));
      let t_629 = cs_628.isValid;
      function fn_630() {
        return "should be valid";
      }
      test_624.assert(t_629, fn_630);
      let t_631 = cs_628.errors.length === 0;
      function fn_632() {
        return "no errors expected";
      }
      test_624.assert(t_631, fn_632);
      return;
    } finally {
      test_624.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_633 = new Test_590();
    try {
      const params_634 = mapConstructor_568(Object.freeze([]));
      let t_635 = userTable_588();
      let t_636 = csid_583("name");
      const cs_637 = changeset(t_635, params_634).cast(Object.freeze([t_636])).validateRequired(Object.freeze([csid_583("name")]));
      let t_638 = ! cs_637.isValid;
      function fn_639() {
        return "should be invalid";
      }
      test_633.assert(t_638, fn_639);
      let t_640 = cs_637.errors.length === 1;
      function fn_641() {
        return "should have one error";
      }
      test_633.assert(t_640, fn_641);
      let t_642 = listedGet_179(cs_637.errors, 0).field === "name";
      function fn_643() {
        return "error should name the field";
      }
      test_633.assert(t_642, fn_643);
      return;
    } finally {
      test_633.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_644 = new Test_590();
    try {
      const params_645 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Alice")]));
      let t_646 = userTable_588();
      let t_647 = csid_583("name");
      const cs_648 = changeset(t_646, params_645).cast(Object.freeze([t_647])).validateLength(csid_583("name"), 2, 50);
      let t_649 = cs_648.isValid;
      function fn_650() {
        return "should be valid";
      }
      test_644.assert(t_649, fn_650);
      return;
    } finally {
      test_644.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_651 = new Test_590();
    try {
      const params_652 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "A")]));
      let t_653 = userTable_588();
      let t_654 = csid_583("name");
      const cs_655 = changeset(t_653, params_652).cast(Object.freeze([t_654])).validateLength(csid_583("name"), 2, 50);
      let t_656 = ! cs_655.isValid;
      function fn_657() {
        return "should be invalid";
      }
      test_651.assert(t_656, fn_657);
      return;
    } finally {
      test_651.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_658 = new Test_590();
    try {
      const params_659 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_660 = userTable_588();
      let t_661 = csid_583("name");
      const cs_662 = changeset(t_660, params_659).cast(Object.freeze([t_661])).validateLength(csid_583("name"), 2, 10);
      let t_663 = ! cs_662.isValid;
      function fn_664() {
        return "should be invalid";
      }
      test_658.assert(t_663, fn_664);
      return;
    } finally {
      test_658.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_665 = new Test_590();
    try {
      const params_666 = mapConstructor_568(Object.freeze([pairConstructor_592("age", "30")]));
      let t_667 = userTable_588();
      let t_668 = csid_583("age");
      const cs_669 = changeset(t_667, params_666).cast(Object.freeze([t_668])).validateInt(csid_583("age"));
      let t_670 = cs_669.isValid;
      function fn_671() {
        return "should be valid";
      }
      test_665.assert(t_670, fn_671);
      return;
    } finally {
      test_665.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_672 = new Test_590();
    try {
      const params_673 = mapConstructor_568(Object.freeze([pairConstructor_592("age", "not-a-number")]));
      let t_674 = userTable_588();
      let t_675 = csid_583("age");
      const cs_676 = changeset(t_674, params_673).cast(Object.freeze([t_675])).validateInt(csid_583("age"));
      let t_677 = ! cs_676.isValid;
      function fn_678() {
        return "should be invalid";
      }
      test_672.assert(t_677, fn_678);
      return;
    } finally {
      test_672.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_679 = new Test_590();
    try {
      const params_680 = mapConstructor_568(Object.freeze([pairConstructor_592("score", "9.5")]));
      let t_681 = userTable_588();
      let t_682 = csid_583("score");
      const cs_683 = changeset(t_681, params_680).cast(Object.freeze([t_682])).validateFloat(csid_583("score"));
      let t_684 = cs_683.isValid;
      function fn_685() {
        return "should be valid";
      }
      test_679.assert(t_684, fn_685);
      return;
    } finally {
      test_679.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_686 = new Test_590();
    try {
      const params_687 = mapConstructor_568(Object.freeze([pairConstructor_592("age", "9999999999")]));
      let t_688 = userTable_588();
      let t_689 = csid_583("age");
      const cs_690 = changeset(t_688, params_687).cast(Object.freeze([t_689])).validateInt64(csid_583("age"));
      let t_691 = cs_690.isValid;
      function fn_692() {
        return "should be valid";
      }
      test_686.assert(t_691, fn_692);
      return;
    } finally {
      test_686.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_693 = new Test_590();
    try {
      const params_694 = mapConstructor_568(Object.freeze([pairConstructor_592("age", "not-a-number")]));
      let t_695 = userTable_588();
      let t_696 = csid_583("age");
      const cs_697 = changeset(t_695, params_694).cast(Object.freeze([t_696])).validateInt64(csid_583("age"));
      let t_698 = ! cs_697.isValid;
      function fn_699() {
        return "should be invalid";
      }
      test_693.assert(t_698, fn_699);
      return;
    } finally {
      test_693.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_700 = new Test_590();
    try {
      function fn_701(v_702) {
        const params_703 = mapConstructor_568(Object.freeze([pairConstructor_592("active", v_702)]));
        let t_704 = userTable_588();
        let t_705 = csid_583("active");
        const cs_706 = changeset(t_704, params_703).cast(Object.freeze([t_705])).validateBool(csid_583("active"));
        let t_707 = cs_706.isValid;
        function fn_708() {
          return "should accept: " + v_702;
        }
        test_700.assert(t_707, fn_708);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_701);
      return;
    } finally {
      test_700.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_709 = new Test_590();
    try {
      function fn_710(v_711) {
        const params_712 = mapConstructor_568(Object.freeze([pairConstructor_592("active", v_711)]));
        let t_713 = userTable_588();
        let t_714 = csid_583("active");
        const cs_715 = changeset(t_713, params_712).cast(Object.freeze([t_714])).validateBool(csid_583("active"));
        let t_716 = cs_715.isValid;
        function fn_717() {
          return "should accept: " + v_711;
        }
        test_709.assert(t_716, fn_717);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_710);
      return;
    } finally {
      test_709.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_718 = new Test_590();
    try {
      function fn_719(v_720) {
        const params_721 = mapConstructor_568(Object.freeze([pairConstructor_592("active", v_720)]));
        let t_722 = userTable_588();
        let t_723 = csid_583("active");
        const cs_724 = changeset(t_722, params_721).cast(Object.freeze([t_723])).validateBool(csid_583("active"));
        let t_725 = ! cs_724.isValid;
        function fn_726() {
          return "should reject ambiguous: " + v_720;
        }
        test_718.assert(t_725, fn_726);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_719);
      return;
    } finally {
      test_718.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_727 = new Test_590();
    try {
      let t_728;
      const params_729 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Robert'); DROP TABLE users;--"), pairConstructor_592("email", "bobby@evil.com")]));
      let t_730 = userTable_588();
      let t_731 = csid_583("name");
      let t_732 = csid_583("email");
      const cs_733 = changeset(t_730, params_729).cast(Object.freeze([t_731, t_732])).validateRequired(Object.freeze([csid_583("name"), csid_583("email")]));
      let sqlFrag_734;
      try {
        t_728 = cs_733.toInsertSql();
        sqlFrag_734 = t_728;
      } catch {
        sqlFrag_734 = panic_587();
      }
      const s_735 = sqlFrag_734.toString();
      let t_736 = s_735.indexOf("''") >= 0;
      function fn_737() {
        return "single quote must be doubled: " + s_735;
      }
      test_727.assert(t_736, fn_737);
      return;
    } finally {
      test_727.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_738 = new Test_590();
    try {
      let t_739;
      const params_740 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Alice"), pairConstructor_592("email", "a@example.com")]));
      let t_741 = userTable_588();
      let t_742 = csid_583("name");
      let t_743 = csid_583("email");
      const cs_744 = changeset(t_741, params_740).cast(Object.freeze([t_742, t_743])).validateRequired(Object.freeze([csid_583("name"), csid_583("email")]));
      let sqlFrag_745;
      try {
        t_739 = cs_744.toInsertSql();
        sqlFrag_745 = t_739;
      } catch {
        sqlFrag_745 = panic_587();
      }
      const s_746 = sqlFrag_745.toString();
      let t_747 = s_746.indexOf("INSERT INTO users") >= 0;
      function fn_748() {
        return "has INSERT INTO: " + s_746;
      }
      test_738.assert(t_747, fn_748);
      let t_749 = s_746.indexOf("'Alice'") >= 0;
      function fn_750() {
        return "has quoted name: " + s_746;
      }
      test_738.assert(t_749, fn_750);
      return;
    } finally {
      test_738.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_751 = new Test_590();
    try {
      let t_752;
      const params_753 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Bob"), pairConstructor_592("email", "b@example.com"), pairConstructor_592("age", "25")]));
      let t_754 = userTable_588();
      let t_755 = csid_583("name");
      let t_756 = csid_583("email");
      let t_757 = csid_583("age");
      const cs_758 = changeset(t_754, params_753).cast(Object.freeze([t_755, t_756, t_757])).validateRequired(Object.freeze([csid_583("name"), csid_583("email")]));
      let sqlFrag_759;
      try {
        t_752 = cs_758.toInsertSql();
        sqlFrag_759 = t_752;
      } catch {
        sqlFrag_759 = panic_587();
      }
      const s_760 = sqlFrag_759.toString();
      let t_761 = s_760.indexOf("25") >= 0;
      function fn_762() {
        return "age rendered unquoted: " + s_760;
      }
      test_751.assert(t_761, fn_762);
      return;
    } finally {
      test_751.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_763 = new Test_590();
    try {
      const params_764 = mapConstructor_568(Object.freeze([]));
      let t_765 = userTable_588();
      let t_766 = csid_583("name");
      const cs_767 = changeset(t_765, params_764).cast(Object.freeze([t_766])).validateRequired(Object.freeze([csid_583("name")]));
      let didBubble_768;
      try {
        cs_767.toInsertSql();
        didBubble_768 = false;
      } catch {
        didBubble_768 = true;
      }
      function fn_769() {
        return "invalid changeset should bubble";
      }
      test_763.assert(didBubble_768, fn_769);
      return;
    } finally {
      test_763.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_770 = new Test_590();
    try {
      const strictTable_771 = new TableDef(csid_583("posts"), Object.freeze([new FieldDef(csid_583("title"), new StringField(), false), new FieldDef(csid_583("body"), new StringField(), true)]));
      const params_772 = mapConstructor_568(Object.freeze([pairConstructor_592("body", "hello")]));
      let t_773 = csid_583("body");
      const cs_774 = changeset(strictTable_771, params_772).cast(Object.freeze([t_773]));
      let t_775 = cs_774.isValid;
      function fn_776() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_770.assert(t_775, fn_776);
      let didBubble_777;
      try {
        cs_774.toInsertSql();
        didBubble_777 = false;
      } catch {
        didBubble_777 = true;
      }
      function fn_778() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_770.assert(didBubble_777, fn_778);
      return;
    } finally {
      test_770.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_779 = new Test_590();
    try {
      let t_780;
      const params_781 = mapConstructor_568(Object.freeze([pairConstructor_592("name", "Bob")]));
      let t_782 = userTable_588();
      let t_783 = csid_583("name");
      const cs_784 = changeset(t_782, params_781).cast(Object.freeze([t_783])).validateRequired(Object.freeze([csid_583("name")]));
      let sqlFrag_785;
      try {
        t_780 = cs_784.toUpdateSql(42);
        sqlFrag_785 = t_780;
      } catch {
        sqlFrag_785 = panic_587();
      }
      const s_786 = sqlFrag_785.toString();
      let t_787 = s_786 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_788() {
        return "got: " + s_786;
      }
      test_779.assert(t_787, fn_788);
      return;
    } finally {
      test_779.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_789 = new Test_590();
    try {
      const params_790 = mapConstructor_568(Object.freeze([]));
      let t_791 = userTable_588();
      let t_792 = csid_583("name");
      const cs_793 = changeset(t_791, params_790).cast(Object.freeze([t_792])).validateRequired(Object.freeze([csid_583("name")]));
      let didBubble_794;
      try {
        cs_793.toUpdateSql(1);
        didBubble_794 = false;
      } catch {
        didBubble_794 = true;
      }
      function fn_795() {
        return "invalid changeset should bubble";
      }
      test_789.assert(didBubble_794, fn_795);
      return;
    } finally {
      test_789.softFailToHard();
    }
});
/**
 * @param {string} name_815
 * @returns {SafeIdentifier}
 */
function sid_814(name_815) {
  let return_816;
  let t_817;
  try {
    t_817 = safeIdentifier(name_815);
    return_816 = t_817;
  } catch {
    return_816 = panic_587();
  }
  return return_816;
}
it("bare from produces SELECT *", function () {
    const test_818 = new Test_590();
    try {
      const q_819 = from(sid_814("users"));
      let t_820 = q_819.toSql().toString() === "SELECT * FROM users";
      function fn_821() {
        return "bare query";
      }
      test_818.assert(t_820, fn_821);
      return;
    } finally {
      test_818.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_822 = new Test_590();
    try {
      let t_823 = sid_814("users");
      let t_824 = sid_814("id");
      let t_825 = sid_814("name");
      const q_826 = from(t_823).select(Object.freeze([t_824, t_825]));
      let t_827 = q_826.toSql().toString() === "SELECT id, name FROM users";
      function fn_828() {
        return "select columns";
      }
      test_822.assert(t_827, fn_828);
      return;
    } finally {
      test_822.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_829 = new Test_590();
    try {
      let t_830 = sid_814("users");
      let t_831 = new SqlBuilder();
      t_831.appendSafe("age > ");
      t_831.appendInt32(18);
      let t_832 = t_831.accumulated;
      const q_833 = from(t_830).where(t_832);
      let t_834 = q_833.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_835() {
        return "where int";
      }
      test_829.assert(t_834, fn_835);
      return;
    } finally {
      test_829.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_836 = new Test_590();
    try {
      let t_837 = sid_814("users");
      let t_838 = new SqlBuilder();
      t_838.appendSafe("active = ");
      t_838.appendBoolean(true);
      let t_839 = t_838.accumulated;
      const q_840 = from(t_837).where(t_839);
      let t_841 = q_840.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_842() {
        return "where bool";
      }
      test_836.assert(t_841, fn_842);
      return;
    } finally {
      test_836.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_843 = new Test_590();
    try {
      let t_844 = sid_814("users");
      let t_845 = new SqlBuilder();
      t_845.appendSafe("age > ");
      t_845.appendInt32(18);
      let t_846 = t_845.accumulated;
      let t_847 = from(t_844).where(t_846);
      let t_848 = new SqlBuilder();
      t_848.appendSafe("active = ");
      t_848.appendBoolean(true);
      const q_849 = t_847.where(t_848.accumulated);
      let t_850 = q_849.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_851() {
        return "chained where";
      }
      test_843.assert(t_850, fn_851);
      return;
    } finally {
      test_843.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_852 = new Test_590();
    try {
      let t_853 = sid_814("users");
      let t_854 = sid_814("name");
      const q_855 = from(t_853).orderBy(t_854, true);
      let t_856 = q_855.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_857() {
        return "order asc";
      }
      test_852.assert(t_856, fn_857);
      return;
    } finally {
      test_852.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_858 = new Test_590();
    try {
      let t_859 = sid_814("users");
      let t_860 = sid_814("created_at");
      const q_861 = from(t_859).orderBy(t_860, false);
      let t_862 = q_861.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_863() {
        return "order desc";
      }
      test_858.assert(t_862, fn_863);
      return;
    } finally {
      test_858.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_864 = new Test_590();
    try {
      let t_865;
      let t_866;
      let q_867;
      try {
        t_865 = from(sid_814("users")).limit(10);
        t_866 = t_865.offset(20);
        q_867 = t_866;
      } catch {
        q_867 = panic_587();
      }
      let t_868 = q_867.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_869() {
        return "limit/offset";
      }
      test_864.assert(t_868, fn_869);
      return;
    } finally {
      test_864.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_870 = new Test_590();
    try {
      let didBubble_871;
      try {
        from(sid_814("users")).limit(-1);
        didBubble_871 = false;
      } catch {
        didBubble_871 = true;
      }
      function fn_872() {
        return "negative limit should bubble";
      }
      test_870.assert(didBubble_871, fn_872);
      return;
    } finally {
      test_870.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_873 = new Test_590();
    try {
      let didBubble_874;
      try {
        from(sid_814("users")).offset(-1);
        didBubble_874 = false;
      } catch {
        didBubble_874 = true;
      }
      function fn_875() {
        return "negative offset should bubble";
      }
      test_873.assert(didBubble_874, fn_875);
      return;
    } finally {
      test_873.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_876 = new Test_590();
    try {
      let t_877;
      let t_878;
      let t_879;
      let t_880;
      let t_881;
      let t_882;
      let t_883;
      let t_884;
      let t_885;
      let t_886;
      const minAge_887 = 21;
      let q_888;
      try {
        t_877 = sid_814("users");
        t_878 = sid_814("id");
        t_879 = sid_814("name");
        t_880 = sid_814("email");
        t_881 = from(t_877).select(Object.freeze([t_878, t_879, t_880]));
        t_882 = new SqlBuilder();
        t_882.appendSafe("age >= ");
        t_882.appendInt32(21);
        t_883 = t_881.where(t_882.accumulated);
        t_884 = new SqlBuilder();
        t_884.appendSafe("active = ");
        t_884.appendBoolean(true);
        t_885 = t_883.where(t_884.accumulated).orderBy(sid_814("name"), true).limit(25);
        t_886 = t_885.offset(0);
        q_888 = t_886;
      } catch {
        q_888 = panic_587();
      }
      let t_889 = q_888.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_890() {
        return "complex query";
      }
      test_876.assert(t_889, fn_890);
      return;
    } finally {
      test_876.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_891 = new Test_590();
    try {
      let t_892;
      let t_893;
      const q_894 = from(sid_814("users"));
      try {
        t_892 = q_894.safeToSql(100);
        t_893 = t_892;
      } catch {
        t_893 = panic_587();
      }
      const s_895 = t_893.toString();
      let t_896 = s_895 === "SELECT * FROM users LIMIT 100";
      function fn_897() {
        return "should have limit: " + s_895;
      }
      test_891.assert(t_896, fn_897);
      return;
    } finally {
      test_891.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_898 = new Test_590();
    try {
      let t_899;
      let t_900;
      let t_901;
      let q_902;
      try {
        t_899 = from(sid_814("users")).limit(5);
        q_902 = t_899;
      } catch {
        q_902 = panic_587();
      }
      try {
        t_900 = q_902.safeToSql(100);
        t_901 = t_900;
      } catch {
        t_901 = panic_587();
      }
      const s_903 = t_901.toString();
      let t_904 = s_903 === "SELECT * FROM users LIMIT 5";
      function fn_905() {
        return "explicit limit preserved: " + s_903;
      }
      test_898.assert(t_904, fn_905);
      return;
    } finally {
      test_898.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_906 = new Test_590();
    try {
      let didBubble_907;
      try {
        from(sid_814("users")).safeToSql(-1);
        didBubble_907 = false;
      } catch {
        didBubble_907 = true;
      }
      function fn_908() {
        return "negative defaultLimit should bubble";
      }
      test_906.assert(didBubble_907, fn_908);
      return;
    } finally {
      test_906.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_909 = new Test_590();
    try {
      const evil_910 = "'; DROP TABLE users; --";
      let t_911 = sid_814("users");
      let t_912 = new SqlBuilder();
      t_912.appendSafe("name = ");
      t_912.appendString("'; DROP TABLE users; --");
      let t_913 = t_912.accumulated;
      const q_914 = from(t_911).where(t_913);
      const s_915 = q_914.toSql().toString();
      let t_916 = s_915.indexOf("''") >= 0;
      function fn_917() {
        return "quotes must be doubled: " + s_915;
      }
      test_909.assert(t_916, fn_917);
      let t_918 = s_915.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_919() {
        return "structure intact: " + s_915;
      }
      test_909.assert(t_918, fn_919);
      return;
    } finally {
      test_909.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_920 = new Test_590();
    try {
      const attack_921 = "users; DROP TABLE users; --";
      let didBubble_922;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_922 = false;
      } catch {
        didBubble_922 = true;
      }
      function fn_923() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_920.assert(didBubble_922, fn_923);
      return;
    } finally {
      test_920.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_924 = new Test_590();
    try {
      let t_925 = sid_814("users");
      let t_926 = sid_814("orders");
      let t_927 = new SqlBuilder();
      t_927.appendSafe("users.id = orders.user_id");
      let t_928 = t_927.accumulated;
      const q_929 = from(t_925).innerJoin(t_926, t_928);
      let t_930 = q_929.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_931() {
        return "inner join";
      }
      test_924.assert(t_930, fn_931);
      return;
    } finally {
      test_924.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_932 = new Test_590();
    try {
      let t_933 = sid_814("users");
      let t_934 = sid_814("profiles");
      let t_935 = new SqlBuilder();
      t_935.appendSafe("users.id = profiles.user_id");
      let t_936 = t_935.accumulated;
      const q_937 = from(t_933).leftJoin(t_934, t_936);
      let t_938 = q_937.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_939() {
        return "left join";
      }
      test_932.assert(t_938, fn_939);
      return;
    } finally {
      test_932.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_940 = new Test_590();
    try {
      let t_941 = sid_814("orders");
      let t_942 = sid_814("users");
      let t_943 = new SqlBuilder();
      t_943.appendSafe("orders.user_id = users.id");
      let t_944 = t_943.accumulated;
      const q_945 = from(t_941).rightJoin(t_942, t_944);
      let t_946 = q_945.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_947() {
        return "right join";
      }
      test_940.assert(t_946, fn_947);
      return;
    } finally {
      test_940.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_948 = new Test_590();
    try {
      let t_949 = sid_814("users");
      let t_950 = sid_814("orders");
      let t_951 = new SqlBuilder();
      t_951.appendSafe("users.id = orders.user_id");
      let t_952 = t_951.accumulated;
      const q_953 = from(t_949).fullJoin(t_950, t_952);
      let t_954 = q_953.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_955() {
        return "full join";
      }
      test_948.assert(t_954, fn_955);
      return;
    } finally {
      test_948.softFailToHard();
    }
});
it("chained joins", function () {
    const test_956 = new Test_590();
    try {
      let t_957 = sid_814("users");
      let t_958 = sid_814("orders");
      let t_959 = new SqlBuilder();
      t_959.appendSafe("users.id = orders.user_id");
      let t_960 = t_959.accumulated;
      let t_961 = from(t_957).innerJoin(t_958, t_960);
      let t_962 = sid_814("profiles");
      let t_963 = new SqlBuilder();
      t_963.appendSafe("users.id = profiles.user_id");
      const q_964 = t_961.leftJoin(t_962, t_963.accumulated);
      let t_965 = q_964.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_966() {
        return "chained joins";
      }
      test_956.assert(t_965, fn_966);
      return;
    } finally {
      test_956.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_967 = new Test_590();
    try {
      let t_968;
      let t_969;
      let t_970;
      let t_971;
      let t_972;
      let t_973;
      let t_974;
      let q_975;
      try {
        t_968 = sid_814("users");
        t_969 = sid_814("orders");
        t_970 = new SqlBuilder();
        t_970.appendSafe("users.id = orders.user_id");
        t_971 = t_970.accumulated;
        t_972 = from(t_968).innerJoin(t_969, t_971);
        t_973 = new SqlBuilder();
        t_973.appendSafe("orders.total > ");
        t_973.appendInt32(100);
        t_974 = t_972.where(t_973.accumulated).orderBy(sid_814("name"), true).limit(10);
        q_975 = t_974;
      } catch {
        q_975 = panic_587();
      }
      let t_976 = q_975.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_977() {
        return "join with where/order/limit";
      }
      test_967.assert(t_976, fn_977);
      return;
    } finally {
      test_967.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_978 = new Test_590();
    try {
      const c_979 = col(sid_814("users"), sid_814("id"));
      let t_980 = c_979.toString() === "users.id";
      function fn_981() {
        return "col helper";
      }
      test_978.assert(t_980, fn_981);
      return;
    } finally {
      test_978.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_982 = new Test_590();
    try {
      const onCond_983 = col(sid_814("users"), sid_814("id"));
      const b_984 = new SqlBuilder();
      b_984.appendFragment(onCond_983);
      b_984.appendSafe(" = ");
      b_984.appendFragment(col(sid_814("orders"), sid_814("user_id")));
      let t_985 = sid_814("users");
      let t_986 = sid_814("orders");
      let t_987 = b_984.accumulated;
      const q_988 = from(t_985).innerJoin(t_986, t_987);
      let t_989 = q_988.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_990() {
        return "join with col";
      }
      test_982.assert(t_989, fn_990);
      return;
    } finally {
      test_982.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_991 = new Test_590();
    try {
      let t_992 = sid_814("users");
      let t_993 = new SqlBuilder();
      t_993.appendSafe("status = ");
      t_993.appendString("active");
      let t_994 = t_993.accumulated;
      const q_995 = from(t_992).orWhere(t_994);
      let t_996 = q_995.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_997() {
        return "orWhere basic";
      }
      test_991.assert(t_996, fn_997);
      return;
    } finally {
      test_991.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_998 = new Test_590();
    try {
      let t_999 = sid_814("users");
      let t_1000 = new SqlBuilder();
      t_1000.appendSafe("age > ");
      t_1000.appendInt32(18);
      let t_1001 = t_1000.accumulated;
      let t_1002 = from(t_999).where(t_1001);
      let t_1003 = new SqlBuilder();
      t_1003.appendSafe("vip = ");
      t_1003.appendBoolean(true);
      const q_1004 = t_1002.orWhere(t_1003.accumulated);
      let t_1005 = q_1004.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1006() {
        return "where then orWhere";
      }
      test_998.assert(t_1005, fn_1006);
      return;
    } finally {
      test_998.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1007 = new Test_590();
    try {
      let t_1008 = sid_814("users");
      let t_1009 = new SqlBuilder();
      t_1009.appendSafe("active = ");
      t_1009.appendBoolean(true);
      let t_1010 = t_1009.accumulated;
      let t_1011 = from(t_1008).where(t_1010);
      let t_1012 = new SqlBuilder();
      t_1012.appendSafe("role = ");
      t_1012.appendString("admin");
      let t_1013 = t_1011.orWhere(t_1012.accumulated);
      let t_1014 = new SqlBuilder();
      t_1014.appendSafe("role = ");
      t_1014.appendString("moderator");
      const q_1015 = t_1013.orWhere(t_1014.accumulated);
      let t_1016 = q_1015.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1017() {
        return "multiple orWhere";
      }
      test_1007.assert(t_1016, fn_1017);
      return;
    } finally {
      test_1007.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1018 = new Test_590();
    try {
      let t_1019 = sid_814("users");
      let t_1020 = new SqlBuilder();
      t_1020.appendSafe("age > ");
      t_1020.appendInt32(18);
      let t_1021 = t_1020.accumulated;
      let t_1022 = from(t_1019).where(t_1021);
      let t_1023 = new SqlBuilder();
      t_1023.appendSafe("active = ");
      t_1023.appendBoolean(true);
      let t_1024 = t_1022.where(t_1023.accumulated);
      let t_1025 = new SqlBuilder();
      t_1025.appendSafe("vip = ");
      t_1025.appendBoolean(true);
      const q_1026 = t_1024.orWhere(t_1025.accumulated);
      let t_1027 = q_1026.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1028() {
        return "mixed where and orWhere";
      }
      test_1018.assert(t_1027, fn_1028);
      return;
    } finally {
      test_1018.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1029 = new Test_590();
    try {
      let t_1030 = sid_814("users");
      let t_1031 = sid_814("deleted_at");
      const q_1032 = from(t_1030).whereNull(t_1031);
      let t_1033 = q_1032.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1034() {
        return "whereNull";
      }
      test_1029.assert(t_1033, fn_1034);
      return;
    } finally {
      test_1029.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1035 = new Test_590();
    try {
      let t_1036 = sid_814("users");
      let t_1037 = sid_814("email");
      const q_1038 = from(t_1036).whereNotNull(t_1037);
      let t_1039 = q_1038.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1040() {
        return "whereNotNull";
      }
      test_1035.assert(t_1039, fn_1040);
      return;
    } finally {
      test_1035.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1041 = new Test_590();
    try {
      let t_1042 = sid_814("users");
      let t_1043 = new SqlBuilder();
      t_1043.appendSafe("active = ");
      t_1043.appendBoolean(true);
      let t_1044 = t_1043.accumulated;
      const q_1045 = from(t_1042).where(t_1044).whereNull(sid_814("deleted_at"));
      let t_1046 = q_1045.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1047() {
        return "whereNull chained";
      }
      test_1041.assert(t_1046, fn_1047);
      return;
    } finally {
      test_1041.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1048 = new Test_590();
    try {
      let t_1049 = sid_814("users");
      let t_1050 = sid_814("deleted_at");
      let t_1051 = from(t_1049).whereNull(t_1050);
      let t_1052 = new SqlBuilder();
      t_1052.appendSafe("role = ");
      t_1052.appendString("admin");
      const q_1053 = t_1051.orWhere(t_1052.accumulated);
      let t_1054 = q_1053.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1055() {
        return "whereNotNull with orWhere";
      }
      test_1048.assert(t_1054, fn_1055);
      return;
    } finally {
      test_1048.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1056 = new Test_590();
    try {
      let t_1057 = sid_814("users");
      let t_1058 = sid_814("id");
      let t_1059 = new SqlInt32(1);
      let t_1060 = new SqlInt32(2);
      let t_1061 = new SqlInt32(3);
      const q_1062 = from(t_1057).whereIn(t_1058, Object.freeze([t_1059, t_1060, t_1061]));
      let t_1063 = q_1062.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1064() {
        return "whereIn ints";
      }
      test_1056.assert(t_1063, fn_1064);
      return;
    } finally {
      test_1056.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1065 = new Test_590();
    try {
      let t_1066 = sid_814("users");
      let t_1067 = sid_814("name");
      let t_1068 = new SqlString("Alice");
      let t_1069 = new SqlString("Bob's");
      const q_1070 = from(t_1066).whereIn(t_1067, Object.freeze([t_1068, t_1069]));
      let t_1071 = q_1070.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1072() {
        return "whereIn strings";
      }
      test_1065.assert(t_1071, fn_1072);
      return;
    } finally {
      test_1065.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1073 = new Test_590();
    try {
      let t_1074 = sid_814("users");
      let t_1075 = sid_814("id");
      const q_1076 = from(t_1074).whereIn(t_1075, Object.freeze([]));
      let t_1077 = q_1076.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1078() {
        return "whereIn empty";
      }
      test_1073.assert(t_1077, fn_1078);
      return;
    } finally {
      test_1073.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1079 = new Test_590();
    try {
      let t_1080 = sid_814("users");
      let t_1081 = new SqlBuilder();
      t_1081.appendSafe("active = ");
      t_1081.appendBoolean(true);
      let t_1082 = t_1081.accumulated;
      const q_1083 = from(t_1080).where(t_1082).whereIn(sid_814("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1084 = q_1083.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1085() {
        return "whereIn chained";
      }
      test_1079.assert(t_1084, fn_1085);
      return;
    } finally {
      test_1079.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1086 = new Test_590();
    try {
      let t_1087 = sid_814("users");
      let t_1088 = sid_814("id");
      let t_1089 = new SqlInt32(42);
      const q_1090 = from(t_1087).whereIn(t_1088, Object.freeze([t_1089]));
      let t_1091 = q_1090.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1092() {
        return "whereIn single";
      }
      test_1086.assert(t_1091, fn_1092);
      return;
    } finally {
      test_1086.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1093 = new Test_590();
    try {
      let t_1094 = sid_814("users");
      let t_1095 = new SqlBuilder();
      t_1095.appendSafe("active = ");
      t_1095.appendBoolean(true);
      let t_1096 = t_1095.accumulated;
      const q_1097 = from(t_1094).whereNot(t_1096);
      let t_1098 = q_1097.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1099() {
        return "whereNot";
      }
      test_1093.assert(t_1098, fn_1099);
      return;
    } finally {
      test_1093.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1100 = new Test_590();
    try {
      let t_1101 = sid_814("users");
      let t_1102 = new SqlBuilder();
      t_1102.appendSafe("age > ");
      t_1102.appendInt32(18);
      let t_1103 = t_1102.accumulated;
      let t_1104 = from(t_1101).where(t_1103);
      let t_1105 = new SqlBuilder();
      t_1105.appendSafe("banned = ");
      t_1105.appendBoolean(true);
      const q_1106 = t_1104.whereNot(t_1105.accumulated);
      let t_1107 = q_1106.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1108() {
        return "whereNot chained";
      }
      test_1100.assert(t_1107, fn_1108);
      return;
    } finally {
      test_1100.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1109 = new Test_590();
    try {
      let t_1110 = sid_814("users");
      let t_1111 = sid_814("age");
      let t_1112 = new SqlInt32(18);
      let t_1113 = new SqlInt32(65);
      const q_1114 = from(t_1110).whereBetween(t_1111, t_1112, t_1113);
      let t_1115 = q_1114.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1116() {
        return "whereBetween ints";
      }
      test_1109.assert(t_1115, fn_1116);
      return;
    } finally {
      test_1109.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1117 = new Test_590();
    try {
      let t_1118 = sid_814("users");
      let t_1119 = new SqlBuilder();
      t_1119.appendSafe("active = ");
      t_1119.appendBoolean(true);
      let t_1120 = t_1119.accumulated;
      const q_1121 = from(t_1118).where(t_1120).whereBetween(sid_814("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1122 = q_1121.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1123() {
        return "whereBetween chained";
      }
      test_1117.assert(t_1122, fn_1123);
      return;
    } finally {
      test_1117.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1124 = new Test_590();
    try {
      let t_1125 = sid_814("users");
      let t_1126 = sid_814("name");
      const q_1127 = from(t_1125).whereLike(t_1126, "John%");
      let t_1128 = q_1127.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1129() {
        return "whereLike";
      }
      test_1124.assert(t_1128, fn_1129);
      return;
    } finally {
      test_1124.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1130 = new Test_590();
    try {
      let t_1131 = sid_814("users");
      let t_1132 = sid_814("email");
      const q_1133 = from(t_1131).whereILike(t_1132, "%@gmail.com");
      let t_1134 = q_1133.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1135() {
        return "whereILike";
      }
      test_1130.assert(t_1134, fn_1135);
      return;
    } finally {
      test_1130.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1136 = new Test_590();
    try {
      let t_1137 = sid_814("users");
      let t_1138 = sid_814("name");
      const q_1139 = from(t_1137).whereLike(t_1138, "'; DROP TABLE users; --");
      const s_1140 = q_1139.toSql().toString();
      let t_1141 = s_1140.indexOf("''") >= 0;
      function fn_1142() {
        return "like injection escaped: " + s_1140;
      }
      test_1136.assert(t_1141, fn_1142);
      let t_1143 = s_1140.indexOf("LIKE") >= 0;
      function fn_1144() {
        return "like structure intact: " + s_1140;
      }
      test_1136.assert(t_1143, fn_1144);
      return;
    } finally {
      test_1136.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1145 = new Test_590();
    try {
      let t_1146 = sid_814("users");
      let t_1147 = sid_814("name");
      const q_1148 = from(t_1146).whereLike(t_1147, "%son%");
      let t_1149 = q_1148.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1150() {
        return "whereLike wildcard";
      }
      test_1145.assert(t_1149, fn_1150);
      return;
    } finally {
      test_1145.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1151 = new Test_590();
    try {
      const f_1152 = countAll();
      let t_1153 = f_1152.toString() === "COUNT(*)";
      function fn_1154() {
        return "countAll";
      }
      test_1151.assert(t_1153, fn_1154);
      return;
    } finally {
      test_1151.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1155 = new Test_590();
    try {
      const f_1156 = countCol(sid_814("id"));
      let t_1157 = f_1156.toString() === "COUNT(id)";
      function fn_1158() {
        return "countCol";
      }
      test_1155.assert(t_1157, fn_1158);
      return;
    } finally {
      test_1155.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1159 = new Test_590();
    try {
      const f_1160 = sumCol(sid_814("amount"));
      let t_1161 = f_1160.toString() === "SUM(amount)";
      function fn_1162() {
        return "sumCol";
      }
      test_1159.assert(t_1161, fn_1162);
      return;
    } finally {
      test_1159.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1163 = new Test_590();
    try {
      const f_1164 = avgCol(sid_814("price"));
      let t_1165 = f_1164.toString() === "AVG(price)";
      function fn_1166() {
        return "avgCol";
      }
      test_1163.assert(t_1165, fn_1166);
      return;
    } finally {
      test_1163.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1167 = new Test_590();
    try {
      const f_1168 = minCol(sid_814("created_at"));
      let t_1169 = f_1168.toString() === "MIN(created_at)";
      function fn_1170() {
        return "minCol";
      }
      test_1167.assert(t_1169, fn_1170);
      return;
    } finally {
      test_1167.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1171 = new Test_590();
    try {
      const f_1172 = maxCol(sid_814("score"));
      let t_1173 = f_1172.toString() === "MAX(score)";
      function fn_1174() {
        return "maxCol";
      }
      test_1171.assert(t_1173, fn_1174);
      return;
    } finally {
      test_1171.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1175 = new Test_590();
    try {
      let t_1176 = sid_814("orders");
      let t_1177 = countAll();
      const q_1178 = from(t_1176).selectExpr(Object.freeze([t_1177]));
      let t_1179 = q_1178.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1180() {
        return "selectExpr count";
      }
      test_1175.assert(t_1179, fn_1180);
      return;
    } finally {
      test_1175.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1181 = new Test_590();
    try {
      const nameFrag_1182 = col(sid_814("users"), sid_814("name"));
      let t_1183 = sid_814("users");
      let t_1184 = countAll();
      const q_1185 = from(t_1183).selectExpr(Object.freeze([nameFrag_1182, t_1184]));
      let t_1186 = q_1185.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1187() {
        return "selectExpr multi";
      }
      test_1181.assert(t_1186, fn_1187);
      return;
    } finally {
      test_1181.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1188 = new Test_590();
    try {
      let t_1189 = sid_814("users");
      let t_1190 = sid_814("id");
      let t_1191 = sid_814("name");
      const q_1192 = from(t_1189).select(Object.freeze([t_1190, t_1191])).selectExpr(Object.freeze([countAll()]));
      let t_1193 = q_1192.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1194() {
        return "selectExpr overrides select";
      }
      test_1188.assert(t_1193, fn_1194);
      return;
    } finally {
      test_1188.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1195 = new Test_590();
    try {
      let t_1196 = sid_814("orders");
      let t_1197 = col(sid_814("orders"), sid_814("status"));
      let t_1198 = countAll();
      const q_1199 = from(t_1196).selectExpr(Object.freeze([t_1197, t_1198])).groupBy(sid_814("status"));
      let t_1200 = q_1199.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1201() {
        return "groupBy single";
      }
      test_1195.assert(t_1200, fn_1201);
      return;
    } finally {
      test_1195.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1202 = new Test_590();
    try {
      let t_1203 = sid_814("orders");
      let t_1204 = sid_814("status");
      const q_1205 = from(t_1203).groupBy(t_1204).groupBy(sid_814("category"));
      let t_1206 = q_1205.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1207() {
        return "groupBy multiple";
      }
      test_1202.assert(t_1206, fn_1207);
      return;
    } finally {
      test_1202.softFailToHard();
    }
});
it("having basic", function () {
    const test_1208 = new Test_590();
    try {
      let t_1209 = sid_814("orders");
      let t_1210 = col(sid_814("orders"), sid_814("status"));
      let t_1211 = countAll();
      let t_1212 = from(t_1209).selectExpr(Object.freeze([t_1210, t_1211])).groupBy(sid_814("status"));
      let t_1213 = new SqlBuilder();
      t_1213.appendSafe("COUNT(*) > ");
      t_1213.appendInt32(5);
      const q_1214 = t_1212.having(t_1213.accumulated);
      let t_1215 = q_1214.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1216() {
        return "having basic";
      }
      test_1208.assert(t_1215, fn_1216);
      return;
    } finally {
      test_1208.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1217 = new Test_590();
    try {
      let t_1218 = sid_814("orders");
      let t_1219 = sid_814("status");
      let t_1220 = from(t_1218).groupBy(t_1219);
      let t_1221 = new SqlBuilder();
      t_1221.appendSafe("COUNT(*) > ");
      t_1221.appendInt32(5);
      let t_1222 = t_1220.having(t_1221.accumulated);
      let t_1223 = new SqlBuilder();
      t_1223.appendSafe("SUM(total) > ");
      t_1223.appendInt32(1000);
      const q_1224 = t_1222.orHaving(t_1223.accumulated);
      let t_1225 = q_1224.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1226() {
        return "orHaving";
      }
      test_1217.assert(t_1225, fn_1226);
      return;
    } finally {
      test_1217.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1227 = new Test_590();
    try {
      let t_1228 = sid_814("users");
      let t_1229 = sid_814("name");
      const q_1230 = from(t_1228).select(Object.freeze([t_1229])).distinct();
      let t_1231 = q_1230.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1232() {
        return "distinct";
      }
      test_1227.assert(t_1231, fn_1232);
      return;
    } finally {
      test_1227.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1233 = new Test_590();
    try {
      let t_1234 = sid_814("users");
      let t_1235 = sid_814("email");
      let t_1236 = from(t_1234).select(Object.freeze([t_1235]));
      let t_1237 = new SqlBuilder();
      t_1237.appendSafe("active = ");
      t_1237.appendBoolean(true);
      const q_1238 = t_1236.where(t_1237.accumulated).distinct();
      let t_1239 = q_1238.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1240() {
        return "distinct with where";
      }
      test_1233.assert(t_1239, fn_1240);
      return;
    } finally {
      test_1233.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1241 = new Test_590();
    try {
      const q_1242 = from(sid_814("users"));
      let t_1243 = q_1242.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1244() {
        return "countSql bare";
      }
      test_1241.assert(t_1243, fn_1244);
      return;
    } finally {
      test_1241.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1245 = new Test_590();
    try {
      let t_1246 = sid_814("users");
      let t_1247 = new SqlBuilder();
      t_1247.appendSafe("active = ");
      t_1247.appendBoolean(true);
      let t_1248 = t_1247.accumulated;
      const q_1249 = from(t_1246).where(t_1248);
      let t_1250 = q_1249.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1251() {
        return "countSql with where";
      }
      test_1245.assert(t_1250, fn_1251);
      return;
    } finally {
      test_1245.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1252 = new Test_590();
    try {
      let t_1253 = sid_814("users");
      let t_1254 = sid_814("orders");
      let t_1255 = new SqlBuilder();
      t_1255.appendSafe("users.id = orders.user_id");
      let t_1256 = t_1255.accumulated;
      let t_1257 = from(t_1253).innerJoin(t_1254, t_1256);
      let t_1258 = new SqlBuilder();
      t_1258.appendSafe("orders.total > ");
      t_1258.appendInt32(100);
      const q_1259 = t_1257.where(t_1258.accumulated);
      let t_1260 = q_1259.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_1261() {
        return "countSql with join";
      }
      test_1252.assert(t_1260, fn_1261);
      return;
    } finally {
      test_1252.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1262 = new Test_590();
    try {
      let t_1263;
      let t_1264;
      let t_1265;
      let t_1266;
      let t_1267;
      let q_1268;
      try {
        t_1263 = sid_814("users");
        t_1264 = new SqlBuilder();
        t_1264.appendSafe("active = ");
        t_1264.appendBoolean(true);
        t_1265 = t_1264.accumulated;
        t_1266 = from(t_1263).where(t_1265).orderBy(sid_814("name"), true).limit(10);
        t_1267 = t_1266.offset(20);
        q_1268 = t_1267;
      } catch {
        q_1268 = panic_587();
      }
      const s_1269 = q_1268.countSql().toString();
      let t_1270 = s_1269 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1271() {
        return "countSql drops extras: " + s_1269;
      }
      test_1262.assert(t_1270, fn_1271);
      return;
    } finally {
      test_1262.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1272 = new Test_590();
    try {
      let t_1273 = sid_814("orders");
      let t_1274 = col(sid_814("orders"), sid_814("status"));
      let t_1275 = countAll();
      let t_1276 = sumCol(sid_814("total"));
      let t_1277 = from(t_1273).selectExpr(Object.freeze([t_1274, t_1275, t_1276]));
      let t_1278 = sid_814("users");
      let t_1279 = new SqlBuilder();
      t_1279.appendSafe("orders.user_id = users.id");
      let t_1280 = t_1277.innerJoin(t_1278, t_1279.accumulated);
      let t_1281 = new SqlBuilder();
      t_1281.appendSafe("users.active = ");
      t_1281.appendBoolean(true);
      let t_1282 = t_1280.where(t_1281.accumulated).groupBy(sid_814("status"));
      let t_1283 = new SqlBuilder();
      t_1283.appendSafe("COUNT(*) > ");
      t_1283.appendInt32(3);
      const q_1284 = t_1282.having(t_1283.accumulated).orderBy(sid_814("status"), true);
      const expected_1285 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_1286 = q_1284.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1287() {
        return "full aggregation";
      }
      test_1272.assert(t_1286, fn_1287);
      return;
    } finally {
      test_1272.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1288 = new Test_590();
    try {
      let t_1289;
      let id_1290;
      try {
        t_1289 = safeIdentifier("user_name");
        id_1290 = t_1289;
      } catch {
        id_1290 = panic_587();
      }
      let t_1291 = id_1290.sqlValue === "user_name";
      function fn_1292() {
        return "value should round-trip";
      }
      test_1288.assert(t_1291, fn_1292);
      return;
    } finally {
      test_1288.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1293 = new Test_590();
    try {
      let didBubble_1294;
      try {
        safeIdentifier("");
        didBubble_1294 = false;
      } catch {
        didBubble_1294 = true;
      }
      function fn_1295() {
        return "empty string should bubble";
      }
      test_1293.assert(didBubble_1294, fn_1295);
      return;
    } finally {
      test_1293.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1296 = new Test_590();
    try {
      let didBubble_1297;
      try {
        safeIdentifier("1col");
        didBubble_1297 = false;
      } catch {
        didBubble_1297 = true;
      }
      function fn_1298() {
        return "leading digit should bubble";
      }
      test_1296.assert(didBubble_1297, fn_1298);
      return;
    } finally {
      test_1296.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1299 = new Test_590();
    try {
      const cases_1300 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_1301(c_1302) {
        let didBubble_1303;
        try {
          safeIdentifier(c_1302);
          didBubble_1303 = false;
        } catch {
          didBubble_1303 = true;
        }
        function fn_1304() {
          return "should reject: " + c_1302;
        }
        test_1299.assert(didBubble_1303, fn_1304);
        return;
      }
      cases_1300.forEach(fn_1301);
      return;
    } finally {
      test_1299.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1305 = new Test_590();
    try {
      let t_1306;
      let t_1307;
      let t_1308;
      let t_1309;
      let t_1310;
      let t_1311;
      let t_1312;
      try {
        t_1306 = safeIdentifier("users");
        t_1307 = t_1306;
      } catch {
        t_1307 = panic_587();
      }
      try {
        t_1308 = safeIdentifier("name");
        t_1309 = t_1308;
      } catch {
        t_1309 = panic_587();
      }
      let t_1313 = new StringField();
      let t_1314 = new FieldDef(t_1309, t_1313, false);
      try {
        t_1310 = safeIdentifier("age");
        t_1311 = t_1310;
      } catch {
        t_1311 = panic_587();
      }
      let t_1315 = new IntField();
      let t_1316 = new FieldDef(t_1311, t_1315, false);
      const td_1317 = new TableDef(t_1307, Object.freeze([t_1314, t_1316]));
      let f_1318;
      try {
        t_1312 = td_1317.field("age");
        f_1318 = t_1312;
      } catch {
        f_1318 = panic_587();
      }
      let t_1319 = f_1318.name.sqlValue === "age";
      function fn_1320() {
        return "should find age field";
      }
      test_1305.assert(t_1319, fn_1320);
      return;
    } finally {
      test_1305.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1321 = new Test_590();
    try {
      let t_1322;
      let t_1323;
      let t_1324;
      let t_1325;
      try {
        t_1322 = safeIdentifier("users");
        t_1323 = t_1322;
      } catch {
        t_1323 = panic_587();
      }
      try {
        t_1324 = safeIdentifier("name");
        t_1325 = t_1324;
      } catch {
        t_1325 = panic_587();
      }
      let t_1326 = new StringField();
      let t_1327 = new FieldDef(t_1325, t_1326, false);
      const td_1328 = new TableDef(t_1323, Object.freeze([t_1327]));
      let didBubble_1329;
      try {
        td_1328.field("nonexistent");
        didBubble_1329 = false;
      } catch {
        didBubble_1329 = true;
      }
      function fn_1330() {
        return "unknown field should bubble";
      }
      test_1321.assert(didBubble_1329, fn_1330);
      return;
    } finally {
      test_1321.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1331 = new Test_590();
    try {
      let t_1332;
      let t_1333;
      let t_1334;
      let t_1335;
      try {
        t_1332 = safeIdentifier("email");
        t_1333 = t_1332;
      } catch {
        t_1333 = panic_587();
      }
      let t_1336 = new StringField();
      const required_1337 = new FieldDef(t_1333, t_1336, false);
      try {
        t_1334 = safeIdentifier("bio");
        t_1335 = t_1334;
      } catch {
        t_1335 = panic_587();
      }
      let t_1338 = new StringField();
      const optional_1339 = new FieldDef(t_1335, t_1338, true);
      let t_1340 = ! required_1337.nullable;
      function fn_1341() {
        return "required field should not be nullable";
      }
      test_1331.assert(t_1340, fn_1341);
      let t_1342 = optional_1339.nullable;
      function fn_1343() {
        return "optional field should be nullable";
      }
      test_1331.assert(t_1342, fn_1343);
      return;
    } finally {
      test_1331.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1344 = new Test_590();
    try {
      function build_1345(name_1346) {
        let t_1347 = new SqlBuilder();
        t_1347.appendSafe("select * from hi where name = ");
        t_1347.appendString(name_1346);
        return t_1347.accumulated.toString();
      }
      function buildWrong_1348(name_1349) {
        return "select * from hi where name = '" + name_1349 + "'";
      }
      const actual_1350 = build_1345("world");
      let t_1351 = actual_1350 === "select * from hi where name = 'world'";
      function fn_1352() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_1350 + ")";
      }
      test_1344.assert(t_1351, fn_1352);
      const bobbyTables_1353 = "Robert'); drop table hi;--";
      const actual_1354 = build_1345("Robert'); drop table hi;--");
      let t_1355 = actual_1354 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_1356() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_1354 + ")";
      }
      test_1344.assert(t_1355, fn_1356);
      function fn_1357() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1344.assert(true, fn_1357);
      return;
    } finally {
      test_1344.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1358 = new Test_590();
    try {
      let t_1359 = new SqlBuilder();
      t_1359.appendSafe("v = ");
      t_1359.appendString("");
      const actual_1360 = t_1359.accumulated.toString();
      let t_1361 = actual_1360 === "v = ''";
      function fn_1362() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1360 + ")";
      }
      test_1358.assert(t_1361, fn_1362);
      let t_1363 = new SqlBuilder();
      t_1363.appendSafe("v = ");
      t_1363.appendString("a''b");
      const actual_1364 = t_1363.accumulated.toString();
      let t_1365 = actual_1364 === "v = 'a''''b'";
      function fn_1366() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1364 + ")";
      }
      test_1358.assert(t_1365, fn_1366);
      let t_1367 = new SqlBuilder();
      t_1367.appendSafe("v = ");
      t_1367.appendString("Hello 世界");
      const actual_1368 = t_1367.accumulated.toString();
      let t_1369 = actual_1368 === "v = 'Hello 世界'";
      function fn_1370() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1368 + ")";
      }
      test_1358.assert(t_1369, fn_1370);
      let t_1371 = new SqlBuilder();
      t_1371.appendSafe("v = ");
      t_1371.appendString("Line1\nLine2");
      const actual_1372 = t_1371.accumulated.toString();
      let t_1373 = actual_1372 === "v = 'Line1\nLine2'";
      function fn_1374() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1372 + ")";
      }
      test_1358.assert(t_1373, fn_1374);
      return;
    } finally {
      test_1358.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1375 = new Test_590();
    try {
      let t_1376;
      let t_1377 = new SqlBuilder();
      t_1377.appendSafe("select ");
      t_1377.appendInt32(42);
      t_1377.appendSafe(", ");
      t_1377.appendInt64(BigInt("43"));
      t_1377.appendSafe(", ");
      t_1377.appendFloat64(19.99);
      t_1377.appendSafe(", ");
      t_1377.appendBoolean(true);
      t_1377.appendSafe(", ");
      t_1377.appendBoolean(false);
      const actual_1378 = t_1377.accumulated.toString();
      let t_1379 = actual_1378 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_1380() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1378 + ")";
      }
      test_1375.assert(t_1379, fn_1380);
      let date_1381;
      try {
        t_1376 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_1381 = t_1376;
      } catch {
        date_1381 = panic_587();
      }
      let t_1382 = new SqlBuilder();
      t_1382.appendSafe("insert into t values (");
      t_1382.appendDate(date_1381);
      t_1382.appendSafe(")");
      const actual_1383 = t_1382.accumulated.toString();
      let t_1384 = actual_1383 === "insert into t values ('2024-12-25')";
      function fn_1385() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1383 + ")";
      }
      test_1375.assert(t_1384, fn_1385);
      return;
    } finally {
      test_1375.softFailToHard();
    }
});
it("lists", function () {
    const test_1386 = new Test_590();
    try {
      let t_1387;
      let t_1388;
      let t_1389;
      let t_1390;
      let t_1391 = new SqlBuilder();
      t_1391.appendSafe("v IN (");
      t_1391.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_1391.appendSafe(")");
      const actual_1392 = t_1391.accumulated.toString();
      let t_1393 = actual_1392 === "v IN ('a', 'b', 'c''d')";
      function fn_1394() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1392 + ")";
      }
      test_1386.assert(t_1393, fn_1394);
      let t_1395 = new SqlBuilder();
      t_1395.appendSafe("v IN (");
      t_1395.appendInt32List(Object.freeze([1, 2, 3]));
      t_1395.appendSafe(")");
      const actual_1396 = t_1395.accumulated.toString();
      let t_1397 = actual_1396 === "v IN (1, 2, 3)";
      function fn_1398() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1396 + ")";
      }
      test_1386.assert(t_1397, fn_1398);
      let t_1399 = new SqlBuilder();
      t_1399.appendSafe("v IN (");
      t_1399.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_1399.appendSafe(")");
      const actual_1400 = t_1399.accumulated.toString();
      let t_1401 = actual_1400 === "v IN (1, 2)";
      function fn_1402() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1400 + ")";
      }
      test_1386.assert(t_1401, fn_1402);
      let t_1403 = new SqlBuilder();
      t_1403.appendSafe("v IN (");
      t_1403.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1403.appendSafe(")");
      const actual_1404 = t_1403.accumulated.toString();
      let t_1405 = actual_1404 === "v IN (1.0, 2.0)";
      function fn_1406() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1404 + ")";
      }
      test_1386.assert(t_1405, fn_1406);
      let t_1407 = new SqlBuilder();
      t_1407.appendSafe("v IN (");
      t_1407.appendBooleanList(Object.freeze([true, false]));
      t_1407.appendSafe(")");
      const actual_1408 = t_1407.accumulated.toString();
      let t_1409 = actual_1408 === "v IN (TRUE, FALSE)";
      function fn_1410() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1408 + ")";
      }
      test_1386.assert(t_1409, fn_1410);
      try {
        t_1387 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_1388 = t_1387;
      } catch {
        t_1388 = panic_587();
      }
      try {
        t_1389 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_1390 = t_1389;
      } catch {
        t_1390 = panic_587();
      }
      const dates_1411 = Object.freeze([t_1388, t_1390]);
      let t_1412 = new SqlBuilder();
      t_1412.appendSafe("v IN (");
      t_1412.appendDateList(dates_1411);
      t_1412.appendSafe(")");
      const actual_1413 = t_1412.accumulated.toString();
      let t_1414 = actual_1413 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1415() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1413 + ")";
      }
      test_1386.assert(t_1414, fn_1415);
      return;
    } finally {
      test_1386.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1416 = new Test_590();
    try {
      let nan_1417;
      nan_1417 = 0.0 / 0.0;
      let t_1418 = new SqlBuilder();
      t_1418.appendSafe("v = ");
      t_1418.appendFloat64(nan_1417);
      const actual_1419 = t_1418.accumulated.toString();
      let t_1420 = actual_1419 === "v = NULL";
      function fn_1421() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1419 + ")";
      }
      test_1416.assert(t_1420, fn_1421);
      return;
    } finally {
      test_1416.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1422 = new Test_590();
    try {
      let inf_1423;
      inf_1423 = 1.0 / 0.0;
      let t_1424 = new SqlBuilder();
      t_1424.appendSafe("v = ");
      t_1424.appendFloat64(inf_1423);
      const actual_1425 = t_1424.accumulated.toString();
      let t_1426 = actual_1425 === "v = NULL";
      function fn_1427() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1425 + ")";
      }
      test_1422.assert(t_1426, fn_1427);
      return;
    } finally {
      test_1422.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1428 = new Test_590();
    try {
      let ninf_1429;
      ninf_1429 = -1.0 / 0.0;
      let t_1430 = new SqlBuilder();
      t_1430.appendSafe("v = ");
      t_1430.appendFloat64(ninf_1429);
      const actual_1431 = t_1430.accumulated.toString();
      let t_1432 = actual_1431 === "v = NULL";
      function fn_1433() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1431 + ")";
      }
      test_1428.assert(t_1432, fn_1433);
      return;
    } finally {
      test_1428.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1434 = new Test_590();
    try {
      let t_1435 = new SqlBuilder();
      t_1435.appendSafe("v = ");
      t_1435.appendFloat64(3.14);
      const actual_1436 = t_1435.accumulated.toString();
      let t_1437 = actual_1436 === "v = 3.14";
      function fn_1438() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1436 + ")";
      }
      test_1434.assert(t_1437, fn_1438);
      let t_1439 = new SqlBuilder();
      t_1439.appendSafe("v = ");
      t_1439.appendFloat64(0.0);
      const actual_1440 = t_1439.accumulated.toString();
      let t_1441 = actual_1440 === "v = 0.0";
      function fn_1442() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1440 + ")";
      }
      test_1434.assert(t_1441, fn_1442);
      let t_1443 = new SqlBuilder();
      t_1443.appendSafe("v = ");
      t_1443.appendFloat64(-42.5);
      const actual_1444 = t_1443.accumulated.toString();
      let t_1445 = actual_1444 === "v = -42.5";
      function fn_1446() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1444 + ")";
      }
      test_1434.assert(t_1445, fn_1446);
      return;
    } finally {
      test_1434.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1447 = new Test_590();
    try {
      let t_1448;
      let d_1449;
      try {
        t_1448 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1449 = t_1448;
      } catch {
        d_1449 = panic_587();
      }
      let t_1450 = new SqlBuilder();
      t_1450.appendSafe("v = ");
      t_1450.appendDate(d_1449);
      const actual_1451 = t_1450.accumulated.toString();
      let t_1452 = actual_1451 === "v = '2024-06-15'";
      function fn_1453() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1451 + ")";
      }
      test_1447.assert(t_1452, fn_1453);
      return;
    } finally {
      test_1447.softFailToHard();
    }
});
it("nesting", function () {
    const test_1454 = new Test_590();
    try {
      const name_1455 = "Someone";
      let t_1456 = new SqlBuilder();
      t_1456.appendSafe("where p.last_name = ");
      t_1456.appendString("Someone");
      const condition_1457 = t_1456.accumulated;
      let t_1458 = new SqlBuilder();
      t_1458.appendSafe("select p.id from person p ");
      t_1458.appendFragment(condition_1457);
      const actual_1459 = t_1458.accumulated.toString();
      let t_1460 = actual_1459 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1461() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1459 + ")";
      }
      test_1454.assert(t_1460, fn_1461);
      let t_1462 = new SqlBuilder();
      t_1462.appendSafe("select p.id from person p ");
      t_1462.appendPart(condition_1457.toSource());
      const actual_1463 = t_1462.accumulated.toString();
      let t_1464 = actual_1463 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1465() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1463 + ")";
      }
      test_1454.assert(t_1464, fn_1465);
      const parts_1466 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1467 = new SqlBuilder();
      t_1467.appendSafe("select ");
      t_1467.appendPartList(parts_1466);
      const actual_1468 = t_1467.accumulated.toString();
      let t_1469 = actual_1468 === "select 'a''b', 3";
      function fn_1470() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1468 + ")";
      }
      test_1454.assert(t_1469, fn_1470);
      return;
    } finally {
      test_1454.softFailToHard();
    }
});
