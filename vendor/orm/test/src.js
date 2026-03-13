import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, unionAllSql, unionSql
} from "../src.js";
import {
  Test as Test_595
} from "@temperlang/std/testing";
import {
  panic as panic_592, mapConstructor as mapConstructor_573, pairConstructor as pairConstructor_597, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_589
 * @returns {SafeIdentifier}
 */
function csid_588(name_589) {
  let return_590;
  let t_591;
  try {
    t_591 = safeIdentifier(name_589);
    return_590 = t_591;
  } catch {
    return_590 = panic_592();
  }
  return return_590;
}
/** @returns {TableDef} */
function userTable_593() {
  return new TableDef(csid_588("users"), Object.freeze([new FieldDef(csid_588("name"), new StringField(), false), new FieldDef(csid_588("email"), new StringField(), false), new FieldDef(csid_588("age"), new IntField(), true), new FieldDef(csid_588("score"), new FloatField(), true), new FieldDef(csid_588("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_594 = new Test_595();
    try {
      const params_596 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Alice"), pairConstructor_597("email", "alice@example.com"), pairConstructor_597("admin", "true")]));
      let t_598 = userTable_593();
      let t_599 = csid_588("name");
      let t_600 = csid_588("email");
      const cs_601 = changeset(t_598, params_596).cast(Object.freeze([t_599, t_600]));
      let t_602 = cs_601.changes.has("name");
      function fn_603() {
        return "name should be in changes";
      }
      test_594.assert(t_602, fn_603);
      let t_604 = cs_601.changes.has("email");
      function fn_605() {
        return "email should be in changes";
      }
      test_594.assert(t_604, fn_605);
      let t_606 = ! cs_601.changes.has("admin");
      function fn_607() {
        return "admin must be dropped (not in whitelist)";
      }
      test_594.assert(t_606, fn_607);
      let t_608 = cs_601.isValid;
      function fn_609() {
        return "should still be valid";
      }
      test_594.assert(t_608, fn_609);
      return;
    } finally {
      test_594.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_610 = new Test_595();
    try {
      const params_611 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Alice"), pairConstructor_597("email", "alice@example.com")]));
      let t_612 = userTable_593();
      let t_613 = csid_588("name");
      const cs_614 = changeset(t_612, params_611).cast(Object.freeze([t_613])).cast(Object.freeze([csid_588("email")]));
      let t_615 = ! cs_614.changes.has("name");
      function fn_616() {
        return "name must be excluded by second cast";
      }
      test_610.assert(t_615, fn_616);
      let t_617 = cs_614.changes.has("email");
      function fn_618() {
        return "email should be present";
      }
      test_610.assert(t_617, fn_618);
      return;
    } finally {
      test_610.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_619 = new Test_595();
    try {
      const params_620 = mapConstructor_573(Object.freeze([pairConstructor_597("name", ""), pairConstructor_597("email", "bob@example.com")]));
      let t_621 = userTable_593();
      let t_622 = csid_588("name");
      let t_623 = csid_588("email");
      const cs_624 = changeset(t_621, params_620).cast(Object.freeze([t_622, t_623]));
      let t_625 = ! cs_624.changes.has("name");
      function fn_626() {
        return "empty name should not be in changes";
      }
      test_619.assert(t_625, fn_626);
      let t_627 = cs_624.changes.has("email");
      function fn_628() {
        return "email should be in changes";
      }
      test_619.assert(t_627, fn_628);
      return;
    } finally {
      test_619.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_629 = new Test_595();
    try {
      const params_630 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Alice")]));
      let t_631 = userTable_593();
      let t_632 = csid_588("name");
      const cs_633 = changeset(t_631, params_630).cast(Object.freeze([t_632])).validateRequired(Object.freeze([csid_588("name")]));
      let t_634 = cs_633.isValid;
      function fn_635() {
        return "should be valid";
      }
      test_629.assert(t_634, fn_635);
      let t_636 = cs_633.errors.length === 0;
      function fn_637() {
        return "no errors expected";
      }
      test_629.assert(t_636, fn_637);
      return;
    } finally {
      test_629.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_638 = new Test_595();
    try {
      const params_639 = mapConstructor_573(Object.freeze([]));
      let t_640 = userTable_593();
      let t_641 = csid_588("name");
      const cs_642 = changeset(t_640, params_639).cast(Object.freeze([t_641])).validateRequired(Object.freeze([csid_588("name")]));
      let t_643 = ! cs_642.isValid;
      function fn_644() {
        return "should be invalid";
      }
      test_638.assert(t_643, fn_644);
      let t_645 = cs_642.errors.length === 1;
      function fn_646() {
        return "should have one error";
      }
      test_638.assert(t_645, fn_646);
      let t_647 = listedGet_179(cs_642.errors, 0).field === "name";
      function fn_648() {
        return "error should name the field";
      }
      test_638.assert(t_647, fn_648);
      return;
    } finally {
      test_638.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_649 = new Test_595();
    try {
      const params_650 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Alice")]));
      let t_651 = userTable_593();
      let t_652 = csid_588("name");
      const cs_653 = changeset(t_651, params_650).cast(Object.freeze([t_652])).validateLength(csid_588("name"), 2, 50);
      let t_654 = cs_653.isValid;
      function fn_655() {
        return "should be valid";
      }
      test_649.assert(t_654, fn_655);
      return;
    } finally {
      test_649.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_656 = new Test_595();
    try {
      const params_657 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "A")]));
      let t_658 = userTable_593();
      let t_659 = csid_588("name");
      const cs_660 = changeset(t_658, params_657).cast(Object.freeze([t_659])).validateLength(csid_588("name"), 2, 50);
      let t_661 = ! cs_660.isValid;
      function fn_662() {
        return "should be invalid";
      }
      test_656.assert(t_661, fn_662);
      return;
    } finally {
      test_656.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_663 = new Test_595();
    try {
      const params_664 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_665 = userTable_593();
      let t_666 = csid_588("name");
      const cs_667 = changeset(t_665, params_664).cast(Object.freeze([t_666])).validateLength(csid_588("name"), 2, 10);
      let t_668 = ! cs_667.isValid;
      function fn_669() {
        return "should be invalid";
      }
      test_663.assert(t_668, fn_669);
      return;
    } finally {
      test_663.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_670 = new Test_595();
    try {
      const params_671 = mapConstructor_573(Object.freeze([pairConstructor_597("age", "30")]));
      let t_672 = userTable_593();
      let t_673 = csid_588("age");
      const cs_674 = changeset(t_672, params_671).cast(Object.freeze([t_673])).validateInt(csid_588("age"));
      let t_675 = cs_674.isValid;
      function fn_676() {
        return "should be valid";
      }
      test_670.assert(t_675, fn_676);
      return;
    } finally {
      test_670.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_677 = new Test_595();
    try {
      const params_678 = mapConstructor_573(Object.freeze([pairConstructor_597("age", "not-a-number")]));
      let t_679 = userTable_593();
      let t_680 = csid_588("age");
      const cs_681 = changeset(t_679, params_678).cast(Object.freeze([t_680])).validateInt(csid_588("age"));
      let t_682 = ! cs_681.isValid;
      function fn_683() {
        return "should be invalid";
      }
      test_677.assert(t_682, fn_683);
      return;
    } finally {
      test_677.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_684 = new Test_595();
    try {
      const params_685 = mapConstructor_573(Object.freeze([pairConstructor_597("score", "9.5")]));
      let t_686 = userTable_593();
      let t_687 = csid_588("score");
      const cs_688 = changeset(t_686, params_685).cast(Object.freeze([t_687])).validateFloat(csid_588("score"));
      let t_689 = cs_688.isValid;
      function fn_690() {
        return "should be valid";
      }
      test_684.assert(t_689, fn_690);
      return;
    } finally {
      test_684.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_691 = new Test_595();
    try {
      const params_692 = mapConstructor_573(Object.freeze([pairConstructor_597("age", "9999999999")]));
      let t_693 = userTable_593();
      let t_694 = csid_588("age");
      const cs_695 = changeset(t_693, params_692).cast(Object.freeze([t_694])).validateInt64(csid_588("age"));
      let t_696 = cs_695.isValid;
      function fn_697() {
        return "should be valid";
      }
      test_691.assert(t_696, fn_697);
      return;
    } finally {
      test_691.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_698 = new Test_595();
    try {
      const params_699 = mapConstructor_573(Object.freeze([pairConstructor_597("age", "not-a-number")]));
      let t_700 = userTable_593();
      let t_701 = csid_588("age");
      const cs_702 = changeset(t_700, params_699).cast(Object.freeze([t_701])).validateInt64(csid_588("age"));
      let t_703 = ! cs_702.isValid;
      function fn_704() {
        return "should be invalid";
      }
      test_698.assert(t_703, fn_704);
      return;
    } finally {
      test_698.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_705 = new Test_595();
    try {
      function fn_706(v_707) {
        const params_708 = mapConstructor_573(Object.freeze([pairConstructor_597("active", v_707)]));
        let t_709 = userTable_593();
        let t_710 = csid_588("active");
        const cs_711 = changeset(t_709, params_708).cast(Object.freeze([t_710])).validateBool(csid_588("active"));
        let t_712 = cs_711.isValid;
        function fn_713() {
          return "should accept: " + v_707;
        }
        test_705.assert(t_712, fn_713);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_706);
      return;
    } finally {
      test_705.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_714 = new Test_595();
    try {
      function fn_715(v_716) {
        const params_717 = mapConstructor_573(Object.freeze([pairConstructor_597("active", v_716)]));
        let t_718 = userTable_593();
        let t_719 = csid_588("active");
        const cs_720 = changeset(t_718, params_717).cast(Object.freeze([t_719])).validateBool(csid_588("active"));
        let t_721 = cs_720.isValid;
        function fn_722() {
          return "should accept: " + v_716;
        }
        test_714.assert(t_721, fn_722);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_715);
      return;
    } finally {
      test_714.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_723 = new Test_595();
    try {
      function fn_724(v_725) {
        const params_726 = mapConstructor_573(Object.freeze([pairConstructor_597("active", v_725)]));
        let t_727 = userTable_593();
        let t_728 = csid_588("active");
        const cs_729 = changeset(t_727, params_726).cast(Object.freeze([t_728])).validateBool(csid_588("active"));
        let t_730 = ! cs_729.isValid;
        function fn_731() {
          return "should reject ambiguous: " + v_725;
        }
        test_723.assert(t_730, fn_731);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_724);
      return;
    } finally {
      test_723.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_732 = new Test_595();
    try {
      let t_733;
      const params_734 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Robert'); DROP TABLE users;--"), pairConstructor_597("email", "bobby@evil.com")]));
      let t_735 = userTable_593();
      let t_736 = csid_588("name");
      let t_737 = csid_588("email");
      const cs_738 = changeset(t_735, params_734).cast(Object.freeze([t_736, t_737])).validateRequired(Object.freeze([csid_588("name"), csid_588("email")]));
      let sqlFrag_739;
      try {
        t_733 = cs_738.toInsertSql();
        sqlFrag_739 = t_733;
      } catch {
        sqlFrag_739 = panic_592();
      }
      const s_740 = sqlFrag_739.toString();
      let t_741 = s_740.indexOf("''") >= 0;
      function fn_742() {
        return "single quote must be doubled: " + s_740;
      }
      test_732.assert(t_741, fn_742);
      return;
    } finally {
      test_732.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_743 = new Test_595();
    try {
      let t_744;
      const params_745 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Alice"), pairConstructor_597("email", "a@example.com")]));
      let t_746 = userTable_593();
      let t_747 = csid_588("name");
      let t_748 = csid_588("email");
      const cs_749 = changeset(t_746, params_745).cast(Object.freeze([t_747, t_748])).validateRequired(Object.freeze([csid_588("name"), csid_588("email")]));
      let sqlFrag_750;
      try {
        t_744 = cs_749.toInsertSql();
        sqlFrag_750 = t_744;
      } catch {
        sqlFrag_750 = panic_592();
      }
      const s_751 = sqlFrag_750.toString();
      let t_752 = s_751.indexOf("INSERT INTO users") >= 0;
      function fn_753() {
        return "has INSERT INTO: " + s_751;
      }
      test_743.assert(t_752, fn_753);
      let t_754 = s_751.indexOf("'Alice'") >= 0;
      function fn_755() {
        return "has quoted name: " + s_751;
      }
      test_743.assert(t_754, fn_755);
      return;
    } finally {
      test_743.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_756 = new Test_595();
    try {
      let t_757;
      const params_758 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Bob"), pairConstructor_597("email", "b@example.com"), pairConstructor_597("age", "25")]));
      let t_759 = userTable_593();
      let t_760 = csid_588("name");
      let t_761 = csid_588("email");
      let t_762 = csid_588("age");
      const cs_763 = changeset(t_759, params_758).cast(Object.freeze([t_760, t_761, t_762])).validateRequired(Object.freeze([csid_588("name"), csid_588("email")]));
      let sqlFrag_764;
      try {
        t_757 = cs_763.toInsertSql();
        sqlFrag_764 = t_757;
      } catch {
        sqlFrag_764 = panic_592();
      }
      const s_765 = sqlFrag_764.toString();
      let t_766 = s_765.indexOf("25") >= 0;
      function fn_767() {
        return "age rendered unquoted: " + s_765;
      }
      test_756.assert(t_766, fn_767);
      return;
    } finally {
      test_756.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_768 = new Test_595();
    try {
      const params_769 = mapConstructor_573(Object.freeze([]));
      let t_770 = userTable_593();
      let t_771 = csid_588("name");
      const cs_772 = changeset(t_770, params_769).cast(Object.freeze([t_771])).validateRequired(Object.freeze([csid_588("name")]));
      let didBubble_773;
      try {
        cs_772.toInsertSql();
        didBubble_773 = false;
      } catch {
        didBubble_773 = true;
      }
      function fn_774() {
        return "invalid changeset should bubble";
      }
      test_768.assert(didBubble_773, fn_774);
      return;
    } finally {
      test_768.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_775 = new Test_595();
    try {
      const strictTable_776 = new TableDef(csid_588("posts"), Object.freeze([new FieldDef(csid_588("title"), new StringField(), false), new FieldDef(csid_588("body"), new StringField(), true)]));
      const params_777 = mapConstructor_573(Object.freeze([pairConstructor_597("body", "hello")]));
      let t_778 = csid_588("body");
      const cs_779 = changeset(strictTable_776, params_777).cast(Object.freeze([t_778]));
      let t_780 = cs_779.isValid;
      function fn_781() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_775.assert(t_780, fn_781);
      let didBubble_782;
      try {
        cs_779.toInsertSql();
        didBubble_782 = false;
      } catch {
        didBubble_782 = true;
      }
      function fn_783() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_775.assert(didBubble_782, fn_783);
      return;
    } finally {
      test_775.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_784 = new Test_595();
    try {
      let t_785;
      const params_786 = mapConstructor_573(Object.freeze([pairConstructor_597("name", "Bob")]));
      let t_787 = userTable_593();
      let t_788 = csid_588("name");
      const cs_789 = changeset(t_787, params_786).cast(Object.freeze([t_788])).validateRequired(Object.freeze([csid_588("name")]));
      let sqlFrag_790;
      try {
        t_785 = cs_789.toUpdateSql(42);
        sqlFrag_790 = t_785;
      } catch {
        sqlFrag_790 = panic_592();
      }
      const s_791 = sqlFrag_790.toString();
      let t_792 = s_791 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_793() {
        return "got: " + s_791;
      }
      test_784.assert(t_792, fn_793);
      return;
    } finally {
      test_784.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_794 = new Test_595();
    try {
      const params_795 = mapConstructor_573(Object.freeze([]));
      let t_796 = userTable_593();
      let t_797 = csid_588("name");
      const cs_798 = changeset(t_796, params_795).cast(Object.freeze([t_797])).validateRequired(Object.freeze([csid_588("name")]));
      let didBubble_799;
      try {
        cs_798.toUpdateSql(1);
        didBubble_799 = false;
      } catch {
        didBubble_799 = true;
      }
      function fn_800() {
        return "invalid changeset should bubble";
      }
      test_794.assert(didBubble_799, fn_800);
      return;
    } finally {
      test_794.softFailToHard();
    }
});
/**
 * @param {string} name_837
 * @returns {SafeIdentifier}
 */
function sid_836(name_837) {
  let return_838;
  let t_839;
  try {
    t_839 = safeIdentifier(name_837);
    return_838 = t_839;
  } catch {
    return_838 = panic_592();
  }
  return return_838;
}
it("bare from produces SELECT *", function () {
    const test_840 = new Test_595();
    try {
      const q_841 = from(sid_836("users"));
      let t_842 = q_841.toSql().toString() === "SELECT * FROM users";
      function fn_843() {
        return "bare query";
      }
      test_840.assert(t_842, fn_843);
      return;
    } finally {
      test_840.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_844 = new Test_595();
    try {
      let t_845 = sid_836("users");
      let t_846 = sid_836("id");
      let t_847 = sid_836("name");
      const q_848 = from(t_845).select(Object.freeze([t_846, t_847]));
      let t_849 = q_848.toSql().toString() === "SELECT id, name FROM users";
      function fn_850() {
        return "select columns";
      }
      test_844.assert(t_849, fn_850);
      return;
    } finally {
      test_844.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_851 = new Test_595();
    try {
      let t_852 = sid_836("users");
      let t_853 = new SqlBuilder();
      t_853.appendSafe("age > ");
      t_853.appendInt32(18);
      let t_854 = t_853.accumulated;
      const q_855 = from(t_852).where(t_854);
      let t_856 = q_855.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_857() {
        return "where int";
      }
      test_851.assert(t_856, fn_857);
      return;
    } finally {
      test_851.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_858 = new Test_595();
    try {
      let t_859 = sid_836("users");
      let t_860 = new SqlBuilder();
      t_860.appendSafe("active = ");
      t_860.appendBoolean(true);
      let t_861 = t_860.accumulated;
      const q_862 = from(t_859).where(t_861);
      let t_863 = q_862.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_864() {
        return "where bool";
      }
      test_858.assert(t_863, fn_864);
      return;
    } finally {
      test_858.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_865 = new Test_595();
    try {
      let t_866 = sid_836("users");
      let t_867 = new SqlBuilder();
      t_867.appendSafe("age > ");
      t_867.appendInt32(18);
      let t_868 = t_867.accumulated;
      let t_869 = from(t_866).where(t_868);
      let t_870 = new SqlBuilder();
      t_870.appendSafe("active = ");
      t_870.appendBoolean(true);
      const q_871 = t_869.where(t_870.accumulated);
      let t_872 = q_871.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_873() {
        return "chained where";
      }
      test_865.assert(t_872, fn_873);
      return;
    } finally {
      test_865.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_874 = new Test_595();
    try {
      let t_875 = sid_836("users");
      let t_876 = sid_836("name");
      const q_877 = from(t_875).orderBy(t_876, true);
      let t_878 = q_877.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_879() {
        return "order asc";
      }
      test_874.assert(t_878, fn_879);
      return;
    } finally {
      test_874.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_880 = new Test_595();
    try {
      let t_881 = sid_836("users");
      let t_882 = sid_836("created_at");
      const q_883 = from(t_881).orderBy(t_882, false);
      let t_884 = q_883.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_885() {
        return "order desc";
      }
      test_880.assert(t_884, fn_885);
      return;
    } finally {
      test_880.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_886 = new Test_595();
    try {
      let t_887;
      let t_888;
      let q_889;
      try {
        t_887 = from(sid_836("users")).limit(10);
        t_888 = t_887.offset(20);
        q_889 = t_888;
      } catch {
        q_889 = panic_592();
      }
      let t_890 = q_889.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_891() {
        return "limit/offset";
      }
      test_886.assert(t_890, fn_891);
      return;
    } finally {
      test_886.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_892 = new Test_595();
    try {
      let didBubble_893;
      try {
        from(sid_836("users")).limit(-1);
        didBubble_893 = false;
      } catch {
        didBubble_893 = true;
      }
      function fn_894() {
        return "negative limit should bubble";
      }
      test_892.assert(didBubble_893, fn_894);
      return;
    } finally {
      test_892.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_895 = new Test_595();
    try {
      let didBubble_896;
      try {
        from(sid_836("users")).offset(-1);
        didBubble_896 = false;
      } catch {
        didBubble_896 = true;
      }
      function fn_897() {
        return "negative offset should bubble";
      }
      test_895.assert(didBubble_896, fn_897);
      return;
    } finally {
      test_895.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_898 = new Test_595();
    try {
      let t_899;
      let t_900;
      let t_901;
      let t_902;
      let t_903;
      let t_904;
      let t_905;
      let t_906;
      let t_907;
      let t_908;
      const minAge_909 = 21;
      let q_910;
      try {
        t_899 = sid_836("users");
        t_900 = sid_836("id");
        t_901 = sid_836("name");
        t_902 = sid_836("email");
        t_903 = from(t_899).select(Object.freeze([t_900, t_901, t_902]));
        t_904 = new SqlBuilder();
        t_904.appendSafe("age >= ");
        t_904.appendInt32(21);
        t_905 = t_903.where(t_904.accumulated);
        t_906 = new SqlBuilder();
        t_906.appendSafe("active = ");
        t_906.appendBoolean(true);
        t_907 = t_905.where(t_906.accumulated).orderBy(sid_836("name"), true).limit(25);
        t_908 = t_907.offset(0);
        q_910 = t_908;
      } catch {
        q_910 = panic_592();
      }
      let t_911 = q_910.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_912() {
        return "complex query";
      }
      test_898.assert(t_911, fn_912);
      return;
    } finally {
      test_898.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_913 = new Test_595();
    try {
      let t_914;
      let t_915;
      const q_916 = from(sid_836("users"));
      try {
        t_914 = q_916.safeToSql(100);
        t_915 = t_914;
      } catch {
        t_915 = panic_592();
      }
      const s_917 = t_915.toString();
      let t_918 = s_917 === "SELECT * FROM users LIMIT 100";
      function fn_919() {
        return "should have limit: " + s_917;
      }
      test_913.assert(t_918, fn_919);
      return;
    } finally {
      test_913.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_920 = new Test_595();
    try {
      let t_921;
      let t_922;
      let t_923;
      let q_924;
      try {
        t_921 = from(sid_836("users")).limit(5);
        q_924 = t_921;
      } catch {
        q_924 = panic_592();
      }
      try {
        t_922 = q_924.safeToSql(100);
        t_923 = t_922;
      } catch {
        t_923 = panic_592();
      }
      const s_925 = t_923.toString();
      let t_926 = s_925 === "SELECT * FROM users LIMIT 5";
      function fn_927() {
        return "explicit limit preserved: " + s_925;
      }
      test_920.assert(t_926, fn_927);
      return;
    } finally {
      test_920.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_928 = new Test_595();
    try {
      let didBubble_929;
      try {
        from(sid_836("users")).safeToSql(-1);
        didBubble_929 = false;
      } catch {
        didBubble_929 = true;
      }
      function fn_930() {
        return "negative defaultLimit should bubble";
      }
      test_928.assert(didBubble_929, fn_930);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_931 = new Test_595();
    try {
      const evil_932 = "'; DROP TABLE users; --";
      let t_933 = sid_836("users");
      let t_934 = new SqlBuilder();
      t_934.appendSafe("name = ");
      t_934.appendString("'; DROP TABLE users; --");
      let t_935 = t_934.accumulated;
      const q_936 = from(t_933).where(t_935);
      const s_937 = q_936.toSql().toString();
      let t_938 = s_937.indexOf("''") >= 0;
      function fn_939() {
        return "quotes must be doubled: " + s_937;
      }
      test_931.assert(t_938, fn_939);
      let t_940 = s_937.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_941() {
        return "structure intact: " + s_937;
      }
      test_931.assert(t_940, fn_941);
      return;
    } finally {
      test_931.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_942 = new Test_595();
    try {
      const attack_943 = "users; DROP TABLE users; --";
      let didBubble_944;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_944 = false;
      } catch {
        didBubble_944 = true;
      }
      function fn_945() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_942.assert(didBubble_944, fn_945);
      return;
    } finally {
      test_942.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_946 = new Test_595();
    try {
      let t_947 = sid_836("users");
      let t_948 = sid_836("orders");
      let t_949 = new SqlBuilder();
      t_949.appendSafe("users.id = orders.user_id");
      let t_950 = t_949.accumulated;
      const q_951 = from(t_947).innerJoin(t_948, t_950);
      let t_952 = q_951.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_953() {
        return "inner join";
      }
      test_946.assert(t_952, fn_953);
      return;
    } finally {
      test_946.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_954 = new Test_595();
    try {
      let t_955 = sid_836("users");
      let t_956 = sid_836("profiles");
      let t_957 = new SqlBuilder();
      t_957.appendSafe("users.id = profiles.user_id");
      let t_958 = t_957.accumulated;
      const q_959 = from(t_955).leftJoin(t_956, t_958);
      let t_960 = q_959.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_961() {
        return "left join";
      }
      test_954.assert(t_960, fn_961);
      return;
    } finally {
      test_954.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_962 = new Test_595();
    try {
      let t_963 = sid_836("orders");
      let t_964 = sid_836("users");
      let t_965 = new SqlBuilder();
      t_965.appendSafe("orders.user_id = users.id");
      let t_966 = t_965.accumulated;
      const q_967 = from(t_963).rightJoin(t_964, t_966);
      let t_968 = q_967.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_969() {
        return "right join";
      }
      test_962.assert(t_968, fn_969);
      return;
    } finally {
      test_962.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_970 = new Test_595();
    try {
      let t_971 = sid_836("users");
      let t_972 = sid_836("orders");
      let t_973 = new SqlBuilder();
      t_973.appendSafe("users.id = orders.user_id");
      let t_974 = t_973.accumulated;
      const q_975 = from(t_971).fullJoin(t_972, t_974);
      let t_976 = q_975.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_977() {
        return "full join";
      }
      test_970.assert(t_976, fn_977);
      return;
    } finally {
      test_970.softFailToHard();
    }
});
it("chained joins", function () {
    const test_978 = new Test_595();
    try {
      let t_979 = sid_836("users");
      let t_980 = sid_836("orders");
      let t_981 = new SqlBuilder();
      t_981.appendSafe("users.id = orders.user_id");
      let t_982 = t_981.accumulated;
      let t_983 = from(t_979).innerJoin(t_980, t_982);
      let t_984 = sid_836("profiles");
      let t_985 = new SqlBuilder();
      t_985.appendSafe("users.id = profiles.user_id");
      const q_986 = t_983.leftJoin(t_984, t_985.accumulated);
      let t_987 = q_986.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_988() {
        return "chained joins";
      }
      test_978.assert(t_987, fn_988);
      return;
    } finally {
      test_978.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_989 = new Test_595();
    try {
      let t_990;
      let t_991;
      let t_992;
      let t_993;
      let t_994;
      let t_995;
      let t_996;
      let q_997;
      try {
        t_990 = sid_836("users");
        t_991 = sid_836("orders");
        t_992 = new SqlBuilder();
        t_992.appendSafe("users.id = orders.user_id");
        t_993 = t_992.accumulated;
        t_994 = from(t_990).innerJoin(t_991, t_993);
        t_995 = new SqlBuilder();
        t_995.appendSafe("orders.total > ");
        t_995.appendInt32(100);
        t_996 = t_994.where(t_995.accumulated).orderBy(sid_836("name"), true).limit(10);
        q_997 = t_996;
      } catch {
        q_997 = panic_592();
      }
      let t_998 = q_997.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_999() {
        return "join with where/order/limit";
      }
      test_989.assert(t_998, fn_999);
      return;
    } finally {
      test_989.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1000 = new Test_595();
    try {
      const c_1001 = col(sid_836("users"), sid_836("id"));
      let t_1002 = c_1001.toString() === "users.id";
      function fn_1003() {
        return "col helper";
      }
      test_1000.assert(t_1002, fn_1003);
      return;
    } finally {
      test_1000.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1004 = new Test_595();
    try {
      const onCond_1005 = col(sid_836("users"), sid_836("id"));
      const b_1006 = new SqlBuilder();
      b_1006.appendFragment(onCond_1005);
      b_1006.appendSafe(" = ");
      b_1006.appendFragment(col(sid_836("orders"), sid_836("user_id")));
      let t_1007 = sid_836("users");
      let t_1008 = sid_836("orders");
      let t_1009 = b_1006.accumulated;
      const q_1010 = from(t_1007).innerJoin(t_1008, t_1009);
      let t_1011 = q_1010.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1012() {
        return "join with col";
      }
      test_1004.assert(t_1011, fn_1012);
      return;
    } finally {
      test_1004.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1013 = new Test_595();
    try {
      let t_1014 = sid_836("users");
      let t_1015 = new SqlBuilder();
      t_1015.appendSafe("status = ");
      t_1015.appendString("active");
      let t_1016 = t_1015.accumulated;
      const q_1017 = from(t_1014).orWhere(t_1016);
      let t_1018 = q_1017.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1019() {
        return "orWhere basic";
      }
      test_1013.assert(t_1018, fn_1019);
      return;
    } finally {
      test_1013.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1020 = new Test_595();
    try {
      let t_1021 = sid_836("users");
      let t_1022 = new SqlBuilder();
      t_1022.appendSafe("age > ");
      t_1022.appendInt32(18);
      let t_1023 = t_1022.accumulated;
      let t_1024 = from(t_1021).where(t_1023);
      let t_1025 = new SqlBuilder();
      t_1025.appendSafe("vip = ");
      t_1025.appendBoolean(true);
      const q_1026 = t_1024.orWhere(t_1025.accumulated);
      let t_1027 = q_1026.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1028() {
        return "where then orWhere";
      }
      test_1020.assert(t_1027, fn_1028);
      return;
    } finally {
      test_1020.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1029 = new Test_595();
    try {
      let t_1030 = sid_836("users");
      let t_1031 = new SqlBuilder();
      t_1031.appendSafe("active = ");
      t_1031.appendBoolean(true);
      let t_1032 = t_1031.accumulated;
      let t_1033 = from(t_1030).where(t_1032);
      let t_1034 = new SqlBuilder();
      t_1034.appendSafe("role = ");
      t_1034.appendString("admin");
      let t_1035 = t_1033.orWhere(t_1034.accumulated);
      let t_1036 = new SqlBuilder();
      t_1036.appendSafe("role = ");
      t_1036.appendString("moderator");
      const q_1037 = t_1035.orWhere(t_1036.accumulated);
      let t_1038 = q_1037.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1039() {
        return "multiple orWhere";
      }
      test_1029.assert(t_1038, fn_1039);
      return;
    } finally {
      test_1029.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1040 = new Test_595();
    try {
      let t_1041 = sid_836("users");
      let t_1042 = new SqlBuilder();
      t_1042.appendSafe("age > ");
      t_1042.appendInt32(18);
      let t_1043 = t_1042.accumulated;
      let t_1044 = from(t_1041).where(t_1043);
      let t_1045 = new SqlBuilder();
      t_1045.appendSafe("active = ");
      t_1045.appendBoolean(true);
      let t_1046 = t_1044.where(t_1045.accumulated);
      let t_1047 = new SqlBuilder();
      t_1047.appendSafe("vip = ");
      t_1047.appendBoolean(true);
      const q_1048 = t_1046.orWhere(t_1047.accumulated);
      let t_1049 = q_1048.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1050() {
        return "mixed where and orWhere";
      }
      test_1040.assert(t_1049, fn_1050);
      return;
    } finally {
      test_1040.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1051 = new Test_595();
    try {
      let t_1052 = sid_836("users");
      let t_1053 = sid_836("deleted_at");
      const q_1054 = from(t_1052).whereNull(t_1053);
      let t_1055 = q_1054.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1056() {
        return "whereNull";
      }
      test_1051.assert(t_1055, fn_1056);
      return;
    } finally {
      test_1051.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1057 = new Test_595();
    try {
      let t_1058 = sid_836("users");
      let t_1059 = sid_836("email");
      const q_1060 = from(t_1058).whereNotNull(t_1059);
      let t_1061 = q_1060.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1062() {
        return "whereNotNull";
      }
      test_1057.assert(t_1061, fn_1062);
      return;
    } finally {
      test_1057.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1063 = new Test_595();
    try {
      let t_1064 = sid_836("users");
      let t_1065 = new SqlBuilder();
      t_1065.appendSafe("active = ");
      t_1065.appendBoolean(true);
      let t_1066 = t_1065.accumulated;
      const q_1067 = from(t_1064).where(t_1066).whereNull(sid_836("deleted_at"));
      let t_1068 = q_1067.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1069() {
        return "whereNull chained";
      }
      test_1063.assert(t_1068, fn_1069);
      return;
    } finally {
      test_1063.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1070 = new Test_595();
    try {
      let t_1071 = sid_836("users");
      let t_1072 = sid_836("deleted_at");
      let t_1073 = from(t_1071).whereNull(t_1072);
      let t_1074 = new SqlBuilder();
      t_1074.appendSafe("role = ");
      t_1074.appendString("admin");
      const q_1075 = t_1073.orWhere(t_1074.accumulated);
      let t_1076 = q_1075.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1077() {
        return "whereNotNull with orWhere";
      }
      test_1070.assert(t_1076, fn_1077);
      return;
    } finally {
      test_1070.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1078 = new Test_595();
    try {
      let t_1079 = sid_836("users");
      let t_1080 = sid_836("id");
      let t_1081 = new SqlInt32(1);
      let t_1082 = new SqlInt32(2);
      let t_1083 = new SqlInt32(3);
      const q_1084 = from(t_1079).whereIn(t_1080, Object.freeze([t_1081, t_1082, t_1083]));
      let t_1085 = q_1084.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1086() {
        return "whereIn ints";
      }
      test_1078.assert(t_1085, fn_1086);
      return;
    } finally {
      test_1078.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1087 = new Test_595();
    try {
      let t_1088 = sid_836("users");
      let t_1089 = sid_836("name");
      let t_1090 = new SqlString("Alice");
      let t_1091 = new SqlString("Bob's");
      const q_1092 = from(t_1088).whereIn(t_1089, Object.freeze([t_1090, t_1091]));
      let t_1093 = q_1092.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1094() {
        return "whereIn strings";
      }
      test_1087.assert(t_1093, fn_1094);
      return;
    } finally {
      test_1087.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1095 = new Test_595();
    try {
      let t_1096 = sid_836("users");
      let t_1097 = sid_836("id");
      const q_1098 = from(t_1096).whereIn(t_1097, Object.freeze([]));
      let t_1099 = q_1098.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1100() {
        return "whereIn empty";
      }
      test_1095.assert(t_1099, fn_1100);
      return;
    } finally {
      test_1095.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1101 = new Test_595();
    try {
      let t_1102 = sid_836("users");
      let t_1103 = new SqlBuilder();
      t_1103.appendSafe("active = ");
      t_1103.appendBoolean(true);
      let t_1104 = t_1103.accumulated;
      const q_1105 = from(t_1102).where(t_1104).whereIn(sid_836("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1106 = q_1105.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1107() {
        return "whereIn chained";
      }
      test_1101.assert(t_1106, fn_1107);
      return;
    } finally {
      test_1101.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1108 = new Test_595();
    try {
      let t_1109 = sid_836("users");
      let t_1110 = sid_836("id");
      let t_1111 = new SqlInt32(42);
      const q_1112 = from(t_1109).whereIn(t_1110, Object.freeze([t_1111]));
      let t_1113 = q_1112.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1114() {
        return "whereIn single";
      }
      test_1108.assert(t_1113, fn_1114);
      return;
    } finally {
      test_1108.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1115 = new Test_595();
    try {
      let t_1116 = sid_836("users");
      let t_1117 = new SqlBuilder();
      t_1117.appendSafe("active = ");
      t_1117.appendBoolean(true);
      let t_1118 = t_1117.accumulated;
      const q_1119 = from(t_1116).whereNot(t_1118);
      let t_1120 = q_1119.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1121() {
        return "whereNot";
      }
      test_1115.assert(t_1120, fn_1121);
      return;
    } finally {
      test_1115.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1122 = new Test_595();
    try {
      let t_1123 = sid_836("users");
      let t_1124 = new SqlBuilder();
      t_1124.appendSafe("age > ");
      t_1124.appendInt32(18);
      let t_1125 = t_1124.accumulated;
      let t_1126 = from(t_1123).where(t_1125);
      let t_1127 = new SqlBuilder();
      t_1127.appendSafe("banned = ");
      t_1127.appendBoolean(true);
      const q_1128 = t_1126.whereNot(t_1127.accumulated);
      let t_1129 = q_1128.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1130() {
        return "whereNot chained";
      }
      test_1122.assert(t_1129, fn_1130);
      return;
    } finally {
      test_1122.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1131 = new Test_595();
    try {
      let t_1132 = sid_836("users");
      let t_1133 = sid_836("age");
      let t_1134 = new SqlInt32(18);
      let t_1135 = new SqlInt32(65);
      const q_1136 = from(t_1132).whereBetween(t_1133, t_1134, t_1135);
      let t_1137 = q_1136.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1138() {
        return "whereBetween ints";
      }
      test_1131.assert(t_1137, fn_1138);
      return;
    } finally {
      test_1131.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1139 = new Test_595();
    try {
      let t_1140 = sid_836("users");
      let t_1141 = new SqlBuilder();
      t_1141.appendSafe("active = ");
      t_1141.appendBoolean(true);
      let t_1142 = t_1141.accumulated;
      const q_1143 = from(t_1140).where(t_1142).whereBetween(sid_836("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1144 = q_1143.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1145() {
        return "whereBetween chained";
      }
      test_1139.assert(t_1144, fn_1145);
      return;
    } finally {
      test_1139.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1146 = new Test_595();
    try {
      let t_1147 = sid_836("users");
      let t_1148 = sid_836("name");
      const q_1149 = from(t_1147).whereLike(t_1148, "John%");
      let t_1150 = q_1149.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1151() {
        return "whereLike";
      }
      test_1146.assert(t_1150, fn_1151);
      return;
    } finally {
      test_1146.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1152 = new Test_595();
    try {
      let t_1153 = sid_836("users");
      let t_1154 = sid_836("email");
      const q_1155 = from(t_1153).whereILike(t_1154, "%@gmail.com");
      let t_1156 = q_1155.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1157() {
        return "whereILike";
      }
      test_1152.assert(t_1156, fn_1157);
      return;
    } finally {
      test_1152.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1158 = new Test_595();
    try {
      let t_1159 = sid_836("users");
      let t_1160 = sid_836("name");
      const q_1161 = from(t_1159).whereLike(t_1160, "'; DROP TABLE users; --");
      const s_1162 = q_1161.toSql().toString();
      let t_1163 = s_1162.indexOf("''") >= 0;
      function fn_1164() {
        return "like injection escaped: " + s_1162;
      }
      test_1158.assert(t_1163, fn_1164);
      let t_1165 = s_1162.indexOf("LIKE") >= 0;
      function fn_1166() {
        return "like structure intact: " + s_1162;
      }
      test_1158.assert(t_1165, fn_1166);
      return;
    } finally {
      test_1158.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1167 = new Test_595();
    try {
      let t_1168 = sid_836("users");
      let t_1169 = sid_836("name");
      const q_1170 = from(t_1168).whereLike(t_1169, "%son%");
      let t_1171 = q_1170.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1172() {
        return "whereLike wildcard";
      }
      test_1167.assert(t_1171, fn_1172);
      return;
    } finally {
      test_1167.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1173 = new Test_595();
    try {
      const f_1174 = countAll();
      let t_1175 = f_1174.toString() === "COUNT(*)";
      function fn_1176() {
        return "countAll";
      }
      test_1173.assert(t_1175, fn_1176);
      return;
    } finally {
      test_1173.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1177 = new Test_595();
    try {
      const f_1178 = countCol(sid_836("id"));
      let t_1179 = f_1178.toString() === "COUNT(id)";
      function fn_1180() {
        return "countCol";
      }
      test_1177.assert(t_1179, fn_1180);
      return;
    } finally {
      test_1177.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1181 = new Test_595();
    try {
      const f_1182 = sumCol(sid_836("amount"));
      let t_1183 = f_1182.toString() === "SUM(amount)";
      function fn_1184() {
        return "sumCol";
      }
      test_1181.assert(t_1183, fn_1184);
      return;
    } finally {
      test_1181.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1185 = new Test_595();
    try {
      const f_1186 = avgCol(sid_836("price"));
      let t_1187 = f_1186.toString() === "AVG(price)";
      function fn_1188() {
        return "avgCol";
      }
      test_1185.assert(t_1187, fn_1188);
      return;
    } finally {
      test_1185.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1189 = new Test_595();
    try {
      const f_1190 = minCol(sid_836("created_at"));
      let t_1191 = f_1190.toString() === "MIN(created_at)";
      function fn_1192() {
        return "minCol";
      }
      test_1189.assert(t_1191, fn_1192);
      return;
    } finally {
      test_1189.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1193 = new Test_595();
    try {
      const f_1194 = maxCol(sid_836("score"));
      let t_1195 = f_1194.toString() === "MAX(score)";
      function fn_1196() {
        return "maxCol";
      }
      test_1193.assert(t_1195, fn_1196);
      return;
    } finally {
      test_1193.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1197 = new Test_595();
    try {
      let t_1198 = sid_836("orders");
      let t_1199 = countAll();
      const q_1200 = from(t_1198).selectExpr(Object.freeze([t_1199]));
      let t_1201 = q_1200.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1202() {
        return "selectExpr count";
      }
      test_1197.assert(t_1201, fn_1202);
      return;
    } finally {
      test_1197.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1203 = new Test_595();
    try {
      const nameFrag_1204 = col(sid_836("users"), sid_836("name"));
      let t_1205 = sid_836("users");
      let t_1206 = countAll();
      const q_1207 = from(t_1205).selectExpr(Object.freeze([nameFrag_1204, t_1206]));
      let t_1208 = q_1207.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1209() {
        return "selectExpr multi";
      }
      test_1203.assert(t_1208, fn_1209);
      return;
    } finally {
      test_1203.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1210 = new Test_595();
    try {
      let t_1211 = sid_836("users");
      let t_1212 = sid_836("id");
      let t_1213 = sid_836("name");
      const q_1214 = from(t_1211).select(Object.freeze([t_1212, t_1213])).selectExpr(Object.freeze([countAll()]));
      let t_1215 = q_1214.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1216() {
        return "selectExpr overrides select";
      }
      test_1210.assert(t_1215, fn_1216);
      return;
    } finally {
      test_1210.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1217 = new Test_595();
    try {
      let t_1218 = sid_836("orders");
      let t_1219 = col(sid_836("orders"), sid_836("status"));
      let t_1220 = countAll();
      const q_1221 = from(t_1218).selectExpr(Object.freeze([t_1219, t_1220])).groupBy(sid_836("status"));
      let t_1222 = q_1221.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1223() {
        return "groupBy single";
      }
      test_1217.assert(t_1222, fn_1223);
      return;
    } finally {
      test_1217.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1224 = new Test_595();
    try {
      let t_1225 = sid_836("orders");
      let t_1226 = sid_836("status");
      const q_1227 = from(t_1225).groupBy(t_1226).groupBy(sid_836("category"));
      let t_1228 = q_1227.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1229() {
        return "groupBy multiple";
      }
      test_1224.assert(t_1228, fn_1229);
      return;
    } finally {
      test_1224.softFailToHard();
    }
});
it("having basic", function () {
    const test_1230 = new Test_595();
    try {
      let t_1231 = sid_836("orders");
      let t_1232 = col(sid_836("orders"), sid_836("status"));
      let t_1233 = countAll();
      let t_1234 = from(t_1231).selectExpr(Object.freeze([t_1232, t_1233])).groupBy(sid_836("status"));
      let t_1235 = new SqlBuilder();
      t_1235.appendSafe("COUNT(*) > ");
      t_1235.appendInt32(5);
      const q_1236 = t_1234.having(t_1235.accumulated);
      let t_1237 = q_1236.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1238() {
        return "having basic";
      }
      test_1230.assert(t_1237, fn_1238);
      return;
    } finally {
      test_1230.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1239 = new Test_595();
    try {
      let t_1240 = sid_836("orders");
      let t_1241 = sid_836("status");
      let t_1242 = from(t_1240).groupBy(t_1241);
      let t_1243 = new SqlBuilder();
      t_1243.appendSafe("COUNT(*) > ");
      t_1243.appendInt32(5);
      let t_1244 = t_1242.having(t_1243.accumulated);
      let t_1245 = new SqlBuilder();
      t_1245.appendSafe("SUM(total) > ");
      t_1245.appendInt32(1000);
      const q_1246 = t_1244.orHaving(t_1245.accumulated);
      let t_1247 = q_1246.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1248() {
        return "orHaving";
      }
      test_1239.assert(t_1247, fn_1248);
      return;
    } finally {
      test_1239.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1249 = new Test_595();
    try {
      let t_1250 = sid_836("users");
      let t_1251 = sid_836("name");
      const q_1252 = from(t_1250).select(Object.freeze([t_1251])).distinct();
      let t_1253 = q_1252.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1254() {
        return "distinct";
      }
      test_1249.assert(t_1253, fn_1254);
      return;
    } finally {
      test_1249.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1255 = new Test_595();
    try {
      let t_1256 = sid_836("users");
      let t_1257 = sid_836("email");
      let t_1258 = from(t_1256).select(Object.freeze([t_1257]));
      let t_1259 = new SqlBuilder();
      t_1259.appendSafe("active = ");
      t_1259.appendBoolean(true);
      const q_1260 = t_1258.where(t_1259.accumulated).distinct();
      let t_1261 = q_1260.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1262() {
        return "distinct with where";
      }
      test_1255.assert(t_1261, fn_1262);
      return;
    } finally {
      test_1255.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1263 = new Test_595();
    try {
      const q_1264 = from(sid_836("users"));
      let t_1265 = q_1264.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1266() {
        return "countSql bare";
      }
      test_1263.assert(t_1265, fn_1266);
      return;
    } finally {
      test_1263.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1267 = new Test_595();
    try {
      let t_1268 = sid_836("users");
      let t_1269 = new SqlBuilder();
      t_1269.appendSafe("active = ");
      t_1269.appendBoolean(true);
      let t_1270 = t_1269.accumulated;
      const q_1271 = from(t_1268).where(t_1270);
      let t_1272 = q_1271.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1273() {
        return "countSql with where";
      }
      test_1267.assert(t_1272, fn_1273);
      return;
    } finally {
      test_1267.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1274 = new Test_595();
    try {
      let t_1275 = sid_836("users");
      let t_1276 = sid_836("orders");
      let t_1277 = new SqlBuilder();
      t_1277.appendSafe("users.id = orders.user_id");
      let t_1278 = t_1277.accumulated;
      let t_1279 = from(t_1275).innerJoin(t_1276, t_1278);
      let t_1280 = new SqlBuilder();
      t_1280.appendSafe("orders.total > ");
      t_1280.appendInt32(100);
      const q_1281 = t_1279.where(t_1280.accumulated);
      let t_1282 = q_1281.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_1283() {
        return "countSql with join";
      }
      test_1274.assert(t_1282, fn_1283);
      return;
    } finally {
      test_1274.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1284 = new Test_595();
    try {
      let t_1285;
      let t_1286;
      let t_1287;
      let t_1288;
      let t_1289;
      let q_1290;
      try {
        t_1285 = sid_836("users");
        t_1286 = new SqlBuilder();
        t_1286.appendSafe("active = ");
        t_1286.appendBoolean(true);
        t_1287 = t_1286.accumulated;
        t_1288 = from(t_1285).where(t_1287).orderBy(sid_836("name"), true).limit(10);
        t_1289 = t_1288.offset(20);
        q_1290 = t_1289;
      } catch {
        q_1290 = panic_592();
      }
      const s_1291 = q_1290.countSql().toString();
      let t_1292 = s_1291 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1293() {
        return "countSql drops extras: " + s_1291;
      }
      test_1284.assert(t_1292, fn_1293);
      return;
    } finally {
      test_1284.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1294 = new Test_595();
    try {
      let t_1295 = sid_836("orders");
      let t_1296 = col(sid_836("orders"), sid_836("status"));
      let t_1297 = countAll();
      let t_1298 = sumCol(sid_836("total"));
      let t_1299 = from(t_1295).selectExpr(Object.freeze([t_1296, t_1297, t_1298]));
      let t_1300 = sid_836("users");
      let t_1301 = new SqlBuilder();
      t_1301.appendSafe("orders.user_id = users.id");
      let t_1302 = t_1299.innerJoin(t_1300, t_1301.accumulated);
      let t_1303 = new SqlBuilder();
      t_1303.appendSafe("users.active = ");
      t_1303.appendBoolean(true);
      let t_1304 = t_1302.where(t_1303.accumulated).groupBy(sid_836("status"));
      let t_1305 = new SqlBuilder();
      t_1305.appendSafe("COUNT(*) > ");
      t_1305.appendInt32(3);
      const q_1306 = t_1304.having(t_1305.accumulated).orderBy(sid_836("status"), true);
      const expected_1307 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_1308 = q_1306.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1309() {
        return "full aggregation";
      }
      test_1294.assert(t_1308, fn_1309);
      return;
    } finally {
      test_1294.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1310 = new Test_595();
    try {
      let t_1311 = sid_836("users");
      let t_1312 = new SqlBuilder();
      t_1312.appendSafe("role = ");
      t_1312.appendString("admin");
      let t_1313 = t_1312.accumulated;
      const a_1314 = from(t_1311).where(t_1313);
      let t_1315 = sid_836("users");
      let t_1316 = new SqlBuilder();
      t_1316.appendSafe("role = ");
      t_1316.appendString("moderator");
      let t_1317 = t_1316.accumulated;
      const b_1318 = from(t_1315).where(t_1317);
      const s_1319 = unionSql(a_1314, b_1318).toString();
      let t_1320 = s_1319 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_1321() {
        return "unionSql: " + s_1319;
      }
      test_1310.assert(t_1320, fn_1321);
      return;
    } finally {
      test_1310.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1322 = new Test_595();
    try {
      let t_1323 = sid_836("users");
      let t_1324 = sid_836("name");
      const a_1325 = from(t_1323).select(Object.freeze([t_1324]));
      let t_1326 = sid_836("contacts");
      let t_1327 = sid_836("name");
      const b_1328 = from(t_1326).select(Object.freeze([t_1327]));
      const s_1329 = unionAllSql(a_1325, b_1328).toString();
      let t_1330 = s_1329 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_1331() {
        return "unionAllSql: " + s_1329;
      }
      test_1322.assert(t_1330, fn_1331);
      return;
    } finally {
      test_1322.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1332 = new Test_595();
    try {
      let t_1333 = sid_836("users");
      let t_1334 = sid_836("email");
      const a_1335 = from(t_1333).select(Object.freeze([t_1334]));
      let t_1336 = sid_836("subscribers");
      let t_1337 = sid_836("email");
      const b_1338 = from(t_1336).select(Object.freeze([t_1337]));
      const s_1339 = intersectSql(a_1335, b_1338).toString();
      let t_1340 = s_1339 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_1341() {
        return "intersectSql: " + s_1339;
      }
      test_1332.assert(t_1340, fn_1341);
      return;
    } finally {
      test_1332.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1342 = new Test_595();
    try {
      let t_1343 = sid_836("users");
      let t_1344 = sid_836("id");
      const a_1345 = from(t_1343).select(Object.freeze([t_1344]));
      let t_1346 = sid_836("banned");
      let t_1347 = sid_836("id");
      const b_1348 = from(t_1346).select(Object.freeze([t_1347]));
      const s_1349 = exceptSql(a_1345, b_1348).toString();
      let t_1350 = s_1349 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_1351() {
        return "exceptSql: " + s_1349;
      }
      test_1342.assert(t_1350, fn_1351);
      return;
    } finally {
      test_1342.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1352 = new Test_595();
    try {
      let t_1353 = sid_836("orders");
      let t_1354 = sid_836("user_id");
      let t_1355 = from(t_1353).select(Object.freeze([t_1354]));
      let t_1356 = new SqlBuilder();
      t_1356.appendSafe("total > ");
      t_1356.appendInt32(100);
      const inner_1357 = t_1355.where(t_1356.accumulated);
      const s_1358 = subquery(inner_1357, sid_836("big_orders")).toString();
      let t_1359 = s_1358 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_1360() {
        return "subquery: " + s_1358;
      }
      test_1352.assert(t_1359, fn_1360);
      return;
    } finally {
      test_1352.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1361 = new Test_595();
    try {
      let t_1362 = sid_836("orders");
      let t_1363 = new SqlBuilder();
      t_1363.appendSafe("orders.user_id = users.id");
      let t_1364 = t_1363.accumulated;
      const inner_1365 = from(t_1362).where(t_1364);
      const s_1366 = existsSql(inner_1365).toString();
      let t_1367 = s_1366 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1368() {
        return "existsSql: " + s_1366;
      }
      test_1361.assert(t_1367, fn_1368);
      return;
    } finally {
      test_1361.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1369 = new Test_595();
    try {
      let t_1370 = sid_836("orders");
      let t_1371 = sid_836("user_id");
      let t_1372 = from(t_1370).select(Object.freeze([t_1371]));
      let t_1373 = new SqlBuilder();
      t_1373.appendSafe("total > ");
      t_1373.appendInt32(1000);
      const sub_1374 = t_1372.where(t_1373.accumulated);
      let t_1375 = sid_836("users");
      let t_1376 = sid_836("id");
      const q_1377 = from(t_1375).whereInSubquery(t_1376, sub_1374);
      const s_1378 = q_1377.toSql().toString();
      let t_1379 = s_1378 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_1380() {
        return "whereInSubquery: " + s_1378;
      }
      test_1369.assert(t_1379, fn_1380);
      return;
    } finally {
      test_1369.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1381 = new Test_595();
    try {
      let t_1382 = sid_836("users");
      let t_1383 = new SqlBuilder();
      t_1383.appendSafe("age > ");
      t_1383.appendInt32(18);
      let t_1384 = t_1383.accumulated;
      let t_1385 = from(t_1382).where(t_1384);
      let t_1386 = new SqlBuilder();
      t_1386.appendSafe("active = ");
      t_1386.appendBoolean(true);
      const a_1387 = t_1385.where(t_1386.accumulated);
      let t_1388 = sid_836("users");
      let t_1389 = new SqlBuilder();
      t_1389.appendSafe("role = ");
      t_1389.appendString("vip");
      let t_1390 = t_1389.accumulated;
      const b_1391 = from(t_1388).where(t_1390);
      const s_1392 = unionSql(a_1387, b_1391).toString();
      let t_1393 = s_1392 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_1394() {
        return "union with where: " + s_1392;
      }
      test_1381.assert(t_1393, fn_1394);
      return;
    } finally {
      test_1381.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1395 = new Test_595();
    try {
      let t_1396 = sid_836("orders");
      let t_1397 = sid_836("user_id");
      const sub_1398 = from(t_1396).select(Object.freeze([t_1397]));
      let t_1399 = sid_836("users");
      let t_1400 = new SqlBuilder();
      t_1400.appendSafe("active = ");
      t_1400.appendBoolean(true);
      let t_1401 = t_1400.accumulated;
      const q_1402 = from(t_1399).where(t_1401).whereInSubquery(sid_836("id"), sub_1398);
      const s_1403 = q_1402.toSql().toString();
      let t_1404 = s_1403 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_1405() {
        return "whereInSubquery chained: " + s_1403;
      }
      test_1395.assert(t_1404, fn_1405);
      return;
    } finally {
      test_1395.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1406 = new Test_595();
    try {
      let t_1407 = sid_836("orders");
      let t_1408 = new SqlBuilder();
      t_1408.appendSafe("orders.user_id = users.id");
      let t_1409 = t_1408.accumulated;
      const sub_1410 = from(t_1407).where(t_1409);
      let t_1411 = sid_836("users");
      let t_1412 = existsSql(sub_1410);
      const q_1413 = from(t_1411).where(t_1412);
      const s_1414 = q_1413.toSql().toString();
      let t_1415 = s_1414 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1416() {
        return "exists in where: " + s_1414;
      }
      test_1406.assert(t_1415, fn_1416);
      return;
    } finally {
      test_1406.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1417 = new Test_595();
    try {
      let t_1418;
      let id_1419;
      try {
        t_1418 = safeIdentifier("user_name");
        id_1419 = t_1418;
      } catch {
        id_1419 = panic_592();
      }
      let t_1420 = id_1419.sqlValue === "user_name";
      function fn_1421() {
        return "value should round-trip";
      }
      test_1417.assert(t_1420, fn_1421);
      return;
    } finally {
      test_1417.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1422 = new Test_595();
    try {
      let didBubble_1423;
      try {
        safeIdentifier("");
        didBubble_1423 = false;
      } catch {
        didBubble_1423 = true;
      }
      function fn_1424() {
        return "empty string should bubble";
      }
      test_1422.assert(didBubble_1423, fn_1424);
      return;
    } finally {
      test_1422.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1425 = new Test_595();
    try {
      let didBubble_1426;
      try {
        safeIdentifier("1col");
        didBubble_1426 = false;
      } catch {
        didBubble_1426 = true;
      }
      function fn_1427() {
        return "leading digit should bubble";
      }
      test_1425.assert(didBubble_1426, fn_1427);
      return;
    } finally {
      test_1425.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1428 = new Test_595();
    try {
      const cases_1429 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_1430(c_1431) {
        let didBubble_1432;
        try {
          safeIdentifier(c_1431);
          didBubble_1432 = false;
        } catch {
          didBubble_1432 = true;
        }
        function fn_1433() {
          return "should reject: " + c_1431;
        }
        test_1428.assert(didBubble_1432, fn_1433);
        return;
      }
      cases_1429.forEach(fn_1430);
      return;
    } finally {
      test_1428.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1434 = new Test_595();
    try {
      let t_1435;
      let t_1436;
      let t_1437;
      let t_1438;
      let t_1439;
      let t_1440;
      let t_1441;
      try {
        t_1435 = safeIdentifier("users");
        t_1436 = t_1435;
      } catch {
        t_1436 = panic_592();
      }
      try {
        t_1437 = safeIdentifier("name");
        t_1438 = t_1437;
      } catch {
        t_1438 = panic_592();
      }
      let t_1442 = new StringField();
      let t_1443 = new FieldDef(t_1438, t_1442, false);
      try {
        t_1439 = safeIdentifier("age");
        t_1440 = t_1439;
      } catch {
        t_1440 = panic_592();
      }
      let t_1444 = new IntField();
      let t_1445 = new FieldDef(t_1440, t_1444, false);
      const td_1446 = new TableDef(t_1436, Object.freeze([t_1443, t_1445]));
      let f_1447;
      try {
        t_1441 = td_1446.field("age");
        f_1447 = t_1441;
      } catch {
        f_1447 = panic_592();
      }
      let t_1448 = f_1447.name.sqlValue === "age";
      function fn_1449() {
        return "should find age field";
      }
      test_1434.assert(t_1448, fn_1449);
      return;
    } finally {
      test_1434.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1450 = new Test_595();
    try {
      let t_1451;
      let t_1452;
      let t_1453;
      let t_1454;
      try {
        t_1451 = safeIdentifier("users");
        t_1452 = t_1451;
      } catch {
        t_1452 = panic_592();
      }
      try {
        t_1453 = safeIdentifier("name");
        t_1454 = t_1453;
      } catch {
        t_1454 = panic_592();
      }
      let t_1455 = new StringField();
      let t_1456 = new FieldDef(t_1454, t_1455, false);
      const td_1457 = new TableDef(t_1452, Object.freeze([t_1456]));
      let didBubble_1458;
      try {
        td_1457.field("nonexistent");
        didBubble_1458 = false;
      } catch {
        didBubble_1458 = true;
      }
      function fn_1459() {
        return "unknown field should bubble";
      }
      test_1450.assert(didBubble_1458, fn_1459);
      return;
    } finally {
      test_1450.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1460 = new Test_595();
    try {
      let t_1461;
      let t_1462;
      let t_1463;
      let t_1464;
      try {
        t_1461 = safeIdentifier("email");
        t_1462 = t_1461;
      } catch {
        t_1462 = panic_592();
      }
      let t_1465 = new StringField();
      const required_1466 = new FieldDef(t_1462, t_1465, false);
      try {
        t_1463 = safeIdentifier("bio");
        t_1464 = t_1463;
      } catch {
        t_1464 = panic_592();
      }
      let t_1467 = new StringField();
      const optional_1468 = new FieldDef(t_1464, t_1467, true);
      let t_1469 = ! required_1466.nullable;
      function fn_1470() {
        return "required field should not be nullable";
      }
      test_1460.assert(t_1469, fn_1470);
      let t_1471 = optional_1468.nullable;
      function fn_1472() {
        return "optional field should be nullable";
      }
      test_1460.assert(t_1471, fn_1472);
      return;
    } finally {
      test_1460.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1473 = new Test_595();
    try {
      function build_1474(name_1475) {
        let t_1476 = new SqlBuilder();
        t_1476.appendSafe("select * from hi where name = ");
        t_1476.appendString(name_1475);
        return t_1476.accumulated.toString();
      }
      function buildWrong_1477(name_1478) {
        return "select * from hi where name = '" + name_1478 + "'";
      }
      const actual_1479 = build_1474("world");
      let t_1480 = actual_1479 === "select * from hi where name = 'world'";
      function fn_1481() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_1479 + ")";
      }
      test_1473.assert(t_1480, fn_1481);
      const bobbyTables_1482 = "Robert'); drop table hi;--";
      const actual_1483 = build_1474("Robert'); drop table hi;--");
      let t_1484 = actual_1483 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_1485() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_1483 + ")";
      }
      test_1473.assert(t_1484, fn_1485);
      function fn_1486() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1473.assert(true, fn_1486);
      return;
    } finally {
      test_1473.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1487 = new Test_595();
    try {
      let t_1488 = new SqlBuilder();
      t_1488.appendSafe("v = ");
      t_1488.appendString("");
      const actual_1489 = t_1488.accumulated.toString();
      let t_1490 = actual_1489 === "v = ''";
      function fn_1491() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1489 + ")";
      }
      test_1487.assert(t_1490, fn_1491);
      let t_1492 = new SqlBuilder();
      t_1492.appendSafe("v = ");
      t_1492.appendString("a''b");
      const actual_1493 = t_1492.accumulated.toString();
      let t_1494 = actual_1493 === "v = 'a''''b'";
      function fn_1495() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1493 + ")";
      }
      test_1487.assert(t_1494, fn_1495);
      let t_1496 = new SqlBuilder();
      t_1496.appendSafe("v = ");
      t_1496.appendString("Hello 世界");
      const actual_1497 = t_1496.accumulated.toString();
      let t_1498 = actual_1497 === "v = 'Hello 世界'";
      function fn_1499() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1497 + ")";
      }
      test_1487.assert(t_1498, fn_1499);
      let t_1500 = new SqlBuilder();
      t_1500.appendSafe("v = ");
      t_1500.appendString("Line1\nLine2");
      const actual_1501 = t_1500.accumulated.toString();
      let t_1502 = actual_1501 === "v = 'Line1\nLine2'";
      function fn_1503() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1501 + ")";
      }
      test_1487.assert(t_1502, fn_1503);
      return;
    } finally {
      test_1487.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1504 = new Test_595();
    try {
      let t_1505;
      let t_1506 = new SqlBuilder();
      t_1506.appendSafe("select ");
      t_1506.appendInt32(42);
      t_1506.appendSafe(", ");
      t_1506.appendInt64(BigInt("43"));
      t_1506.appendSafe(", ");
      t_1506.appendFloat64(19.99);
      t_1506.appendSafe(", ");
      t_1506.appendBoolean(true);
      t_1506.appendSafe(", ");
      t_1506.appendBoolean(false);
      const actual_1507 = t_1506.accumulated.toString();
      let t_1508 = actual_1507 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_1509() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1507 + ")";
      }
      test_1504.assert(t_1508, fn_1509);
      let date_1510;
      try {
        t_1505 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_1510 = t_1505;
      } catch {
        date_1510 = panic_592();
      }
      let t_1511 = new SqlBuilder();
      t_1511.appendSafe("insert into t values (");
      t_1511.appendDate(date_1510);
      t_1511.appendSafe(")");
      const actual_1512 = t_1511.accumulated.toString();
      let t_1513 = actual_1512 === "insert into t values ('2024-12-25')";
      function fn_1514() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1512 + ")";
      }
      test_1504.assert(t_1513, fn_1514);
      return;
    } finally {
      test_1504.softFailToHard();
    }
});
it("lists", function () {
    const test_1515 = new Test_595();
    try {
      let t_1516;
      let t_1517;
      let t_1518;
      let t_1519;
      let t_1520 = new SqlBuilder();
      t_1520.appendSafe("v IN (");
      t_1520.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_1520.appendSafe(")");
      const actual_1521 = t_1520.accumulated.toString();
      let t_1522 = actual_1521 === "v IN ('a', 'b', 'c''d')";
      function fn_1523() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1521 + ")";
      }
      test_1515.assert(t_1522, fn_1523);
      let t_1524 = new SqlBuilder();
      t_1524.appendSafe("v IN (");
      t_1524.appendInt32List(Object.freeze([1, 2, 3]));
      t_1524.appendSafe(")");
      const actual_1525 = t_1524.accumulated.toString();
      let t_1526 = actual_1525 === "v IN (1, 2, 3)";
      function fn_1527() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1525 + ")";
      }
      test_1515.assert(t_1526, fn_1527);
      let t_1528 = new SqlBuilder();
      t_1528.appendSafe("v IN (");
      t_1528.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_1528.appendSafe(")");
      const actual_1529 = t_1528.accumulated.toString();
      let t_1530 = actual_1529 === "v IN (1, 2)";
      function fn_1531() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1529 + ")";
      }
      test_1515.assert(t_1530, fn_1531);
      let t_1532 = new SqlBuilder();
      t_1532.appendSafe("v IN (");
      t_1532.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1532.appendSafe(")");
      const actual_1533 = t_1532.accumulated.toString();
      let t_1534 = actual_1533 === "v IN (1.0, 2.0)";
      function fn_1535() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1533 + ")";
      }
      test_1515.assert(t_1534, fn_1535);
      let t_1536 = new SqlBuilder();
      t_1536.appendSafe("v IN (");
      t_1536.appendBooleanList(Object.freeze([true, false]));
      t_1536.appendSafe(")");
      const actual_1537 = t_1536.accumulated.toString();
      let t_1538 = actual_1537 === "v IN (TRUE, FALSE)";
      function fn_1539() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1537 + ")";
      }
      test_1515.assert(t_1538, fn_1539);
      try {
        t_1516 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_1517 = t_1516;
      } catch {
        t_1517 = panic_592();
      }
      try {
        t_1518 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_1519 = t_1518;
      } catch {
        t_1519 = panic_592();
      }
      const dates_1540 = Object.freeze([t_1517, t_1519]);
      let t_1541 = new SqlBuilder();
      t_1541.appendSafe("v IN (");
      t_1541.appendDateList(dates_1540);
      t_1541.appendSafe(")");
      const actual_1542 = t_1541.accumulated.toString();
      let t_1543 = actual_1542 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1544() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1542 + ")";
      }
      test_1515.assert(t_1543, fn_1544);
      return;
    } finally {
      test_1515.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1545 = new Test_595();
    try {
      let nan_1546;
      nan_1546 = 0.0 / 0.0;
      let t_1547 = new SqlBuilder();
      t_1547.appendSafe("v = ");
      t_1547.appendFloat64(nan_1546);
      const actual_1548 = t_1547.accumulated.toString();
      let t_1549 = actual_1548 === "v = NULL";
      function fn_1550() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1548 + ")";
      }
      test_1545.assert(t_1549, fn_1550);
      return;
    } finally {
      test_1545.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1551 = new Test_595();
    try {
      let inf_1552;
      inf_1552 = 1.0 / 0.0;
      let t_1553 = new SqlBuilder();
      t_1553.appendSafe("v = ");
      t_1553.appendFloat64(inf_1552);
      const actual_1554 = t_1553.accumulated.toString();
      let t_1555 = actual_1554 === "v = NULL";
      function fn_1556() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1554 + ")";
      }
      test_1551.assert(t_1555, fn_1556);
      return;
    } finally {
      test_1551.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1557 = new Test_595();
    try {
      let ninf_1558;
      ninf_1558 = -1.0 / 0.0;
      let t_1559 = new SqlBuilder();
      t_1559.appendSafe("v = ");
      t_1559.appendFloat64(ninf_1558);
      const actual_1560 = t_1559.accumulated.toString();
      let t_1561 = actual_1560 === "v = NULL";
      function fn_1562() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1560 + ")";
      }
      test_1557.assert(t_1561, fn_1562);
      return;
    } finally {
      test_1557.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1563 = new Test_595();
    try {
      let t_1564 = new SqlBuilder();
      t_1564.appendSafe("v = ");
      t_1564.appendFloat64(3.14);
      const actual_1565 = t_1564.accumulated.toString();
      let t_1566 = actual_1565 === "v = 3.14";
      function fn_1567() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1565 + ")";
      }
      test_1563.assert(t_1566, fn_1567);
      let t_1568 = new SqlBuilder();
      t_1568.appendSafe("v = ");
      t_1568.appendFloat64(0.0);
      const actual_1569 = t_1568.accumulated.toString();
      let t_1570 = actual_1569 === "v = 0.0";
      function fn_1571() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1569 + ")";
      }
      test_1563.assert(t_1570, fn_1571);
      let t_1572 = new SqlBuilder();
      t_1572.appendSafe("v = ");
      t_1572.appendFloat64(-42.5);
      const actual_1573 = t_1572.accumulated.toString();
      let t_1574 = actual_1573 === "v = -42.5";
      function fn_1575() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1573 + ")";
      }
      test_1563.assert(t_1574, fn_1575);
      return;
    } finally {
      test_1563.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1576 = new Test_595();
    try {
      let t_1577;
      let d_1578;
      try {
        t_1577 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1578 = t_1577;
      } catch {
        d_1578 = panic_592();
      }
      let t_1579 = new SqlBuilder();
      t_1579.appendSafe("v = ");
      t_1579.appendDate(d_1578);
      const actual_1580 = t_1579.accumulated.toString();
      let t_1581 = actual_1580 === "v = '2024-06-15'";
      function fn_1582() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1580 + ")";
      }
      test_1576.assert(t_1581, fn_1582);
      return;
    } finally {
      test_1576.softFailToHard();
    }
});
it("nesting", function () {
    const test_1583 = new Test_595();
    try {
      const name_1584 = "Someone";
      let t_1585 = new SqlBuilder();
      t_1585.appendSafe("where p.last_name = ");
      t_1585.appendString("Someone");
      const condition_1586 = t_1585.accumulated;
      let t_1587 = new SqlBuilder();
      t_1587.appendSafe("select p.id from person p ");
      t_1587.appendFragment(condition_1586);
      const actual_1588 = t_1587.accumulated.toString();
      let t_1589 = actual_1588 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1590() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1588 + ")";
      }
      test_1583.assert(t_1589, fn_1590);
      let t_1591 = new SqlBuilder();
      t_1591.appendSafe("select p.id from person p ");
      t_1591.appendPart(condition_1586.toSource());
      const actual_1592 = t_1591.accumulated.toString();
      let t_1593 = actual_1592 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1594() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1592 + ")";
      }
      test_1583.assert(t_1593, fn_1594);
      const parts_1595 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1596 = new SqlBuilder();
      t_1596.appendSafe("select ");
      t_1596.appendPartList(parts_1595);
      const actual_1597 = t_1596.accumulated.toString();
      let t_1598 = actual_1597 === "select 'a''b', 3";
      function fn_1599() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1597 + ")";
      }
      test_1583.assert(t_1598, fn_1599);
      return;
    } finally {
      test_1583.softFailToHard();
    }
});
