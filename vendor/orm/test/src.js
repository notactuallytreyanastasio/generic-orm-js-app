import {
  BoolField, FieldDef, FloatField, ForShare, ForUpdate, IntField, NullsFirst, NullsLast, SafeIdentifier, SqlBoolean, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, deleteFrom, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, unionAllSql, unionSql, update
} from "../src.js";
import {
  Test as Test_684
} from "@temperlang/std/testing";
import {
  panic as panic_681, mapConstructor as mapConstructor_662, pairConstructor as pairConstructor_686, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_678
 * @returns {SafeIdentifier}
 */
function csid_677(name_678) {
  let return_679;
  let t_680;
  try {
    t_680 = safeIdentifier(name_678);
    return_679 = t_680;
  } catch {
    return_679 = panic_681();
  }
  return return_679;
}
/** @returns {TableDef} */
function userTable_682() {
  return new TableDef(csid_677("users"), Object.freeze([new FieldDef(csid_677("name"), new StringField(), false), new FieldDef(csid_677("email"), new StringField(), false), new FieldDef(csid_677("age"), new IntField(), true), new FieldDef(csid_677("score"), new FloatField(), true), new FieldDef(csid_677("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_683 = new Test_684();
    try {
      const params_685 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Alice"), pairConstructor_686("email", "alice@example.com"), pairConstructor_686("admin", "true")]));
      let t_687 = userTable_682();
      let t_688 = csid_677("name");
      let t_689 = csid_677("email");
      const cs_690 = changeset(t_687, params_685).cast(Object.freeze([t_688, t_689]));
      let t_691 = cs_690.changes.has("name");
      function fn_692() {
        return "name should be in changes";
      }
      test_683.assert(t_691, fn_692);
      let t_693 = cs_690.changes.has("email");
      function fn_694() {
        return "email should be in changes";
      }
      test_683.assert(t_693, fn_694);
      let t_695 = ! cs_690.changes.has("admin");
      function fn_696() {
        return "admin must be dropped (not in whitelist)";
      }
      test_683.assert(t_695, fn_696);
      let t_697 = cs_690.isValid;
      function fn_698() {
        return "should still be valid";
      }
      test_683.assert(t_697, fn_698);
      return;
    } finally {
      test_683.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_699 = new Test_684();
    try {
      const params_700 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Alice"), pairConstructor_686("email", "alice@example.com")]));
      let t_701 = userTable_682();
      let t_702 = csid_677("name");
      const cs_703 = changeset(t_701, params_700).cast(Object.freeze([t_702])).cast(Object.freeze([csid_677("email")]));
      let t_704 = ! cs_703.changes.has("name");
      function fn_705() {
        return "name must be excluded by second cast";
      }
      test_699.assert(t_704, fn_705);
      let t_706 = cs_703.changes.has("email");
      function fn_707() {
        return "email should be present";
      }
      test_699.assert(t_706, fn_707);
      return;
    } finally {
      test_699.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_708 = new Test_684();
    try {
      const params_709 = mapConstructor_662(Object.freeze([pairConstructor_686("name", ""), pairConstructor_686("email", "bob@example.com")]));
      let t_710 = userTable_682();
      let t_711 = csid_677("name");
      let t_712 = csid_677("email");
      const cs_713 = changeset(t_710, params_709).cast(Object.freeze([t_711, t_712]));
      let t_714 = ! cs_713.changes.has("name");
      function fn_715() {
        return "empty name should not be in changes";
      }
      test_708.assert(t_714, fn_715);
      let t_716 = cs_713.changes.has("email");
      function fn_717() {
        return "email should be in changes";
      }
      test_708.assert(t_716, fn_717);
      return;
    } finally {
      test_708.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_718 = new Test_684();
    try {
      const params_719 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Alice")]));
      let t_720 = userTable_682();
      let t_721 = csid_677("name");
      const cs_722 = changeset(t_720, params_719).cast(Object.freeze([t_721])).validateRequired(Object.freeze([csid_677("name")]));
      let t_723 = cs_722.isValid;
      function fn_724() {
        return "should be valid";
      }
      test_718.assert(t_723, fn_724);
      let t_725 = cs_722.errors.length === 0;
      function fn_726() {
        return "no errors expected";
      }
      test_718.assert(t_725, fn_726);
      return;
    } finally {
      test_718.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_727 = new Test_684();
    try {
      const params_728 = mapConstructor_662(Object.freeze([]));
      let t_729 = userTable_682();
      let t_730 = csid_677("name");
      const cs_731 = changeset(t_729, params_728).cast(Object.freeze([t_730])).validateRequired(Object.freeze([csid_677("name")]));
      let t_732 = ! cs_731.isValid;
      function fn_733() {
        return "should be invalid";
      }
      test_727.assert(t_732, fn_733);
      let t_734 = cs_731.errors.length === 1;
      function fn_735() {
        return "should have one error";
      }
      test_727.assert(t_734, fn_735);
      let t_736 = listedGet_179(cs_731.errors, 0).field === "name";
      function fn_737() {
        return "error should name the field";
      }
      test_727.assert(t_736, fn_737);
      return;
    } finally {
      test_727.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_738 = new Test_684();
    try {
      const params_739 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Alice")]));
      let t_740 = userTable_682();
      let t_741 = csid_677("name");
      const cs_742 = changeset(t_740, params_739).cast(Object.freeze([t_741])).validateLength(csid_677("name"), 2, 50);
      let t_743 = cs_742.isValid;
      function fn_744() {
        return "should be valid";
      }
      test_738.assert(t_743, fn_744);
      return;
    } finally {
      test_738.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_745 = new Test_684();
    try {
      const params_746 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "A")]));
      let t_747 = userTable_682();
      let t_748 = csid_677("name");
      const cs_749 = changeset(t_747, params_746).cast(Object.freeze([t_748])).validateLength(csid_677("name"), 2, 50);
      let t_750 = ! cs_749.isValid;
      function fn_751() {
        return "should be invalid";
      }
      test_745.assert(t_750, fn_751);
      return;
    } finally {
      test_745.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_752 = new Test_684();
    try {
      const params_753 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_754 = userTable_682();
      let t_755 = csid_677("name");
      const cs_756 = changeset(t_754, params_753).cast(Object.freeze([t_755])).validateLength(csid_677("name"), 2, 10);
      let t_757 = ! cs_756.isValid;
      function fn_758() {
        return "should be invalid";
      }
      test_752.assert(t_757, fn_758);
      return;
    } finally {
      test_752.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_759 = new Test_684();
    try {
      const params_760 = mapConstructor_662(Object.freeze([pairConstructor_686("age", "30")]));
      let t_761 = userTable_682();
      let t_762 = csid_677("age");
      const cs_763 = changeset(t_761, params_760).cast(Object.freeze([t_762])).validateInt(csid_677("age"));
      let t_764 = cs_763.isValid;
      function fn_765() {
        return "should be valid";
      }
      test_759.assert(t_764, fn_765);
      return;
    } finally {
      test_759.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_766 = new Test_684();
    try {
      const params_767 = mapConstructor_662(Object.freeze([pairConstructor_686("age", "not-a-number")]));
      let t_768 = userTable_682();
      let t_769 = csid_677("age");
      const cs_770 = changeset(t_768, params_767).cast(Object.freeze([t_769])).validateInt(csid_677("age"));
      let t_771 = ! cs_770.isValid;
      function fn_772() {
        return "should be invalid";
      }
      test_766.assert(t_771, fn_772);
      return;
    } finally {
      test_766.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_773 = new Test_684();
    try {
      const params_774 = mapConstructor_662(Object.freeze([pairConstructor_686("score", "9.5")]));
      let t_775 = userTable_682();
      let t_776 = csid_677("score");
      const cs_777 = changeset(t_775, params_774).cast(Object.freeze([t_776])).validateFloat(csid_677("score"));
      let t_778 = cs_777.isValid;
      function fn_779() {
        return "should be valid";
      }
      test_773.assert(t_778, fn_779);
      return;
    } finally {
      test_773.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_780 = new Test_684();
    try {
      const params_781 = mapConstructor_662(Object.freeze([pairConstructor_686("age", "9999999999")]));
      let t_782 = userTable_682();
      let t_783 = csid_677("age");
      const cs_784 = changeset(t_782, params_781).cast(Object.freeze([t_783])).validateInt64(csid_677("age"));
      let t_785 = cs_784.isValid;
      function fn_786() {
        return "should be valid";
      }
      test_780.assert(t_785, fn_786);
      return;
    } finally {
      test_780.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_787 = new Test_684();
    try {
      const params_788 = mapConstructor_662(Object.freeze([pairConstructor_686("age", "not-a-number")]));
      let t_789 = userTable_682();
      let t_790 = csid_677("age");
      const cs_791 = changeset(t_789, params_788).cast(Object.freeze([t_790])).validateInt64(csid_677("age"));
      let t_792 = ! cs_791.isValid;
      function fn_793() {
        return "should be invalid";
      }
      test_787.assert(t_792, fn_793);
      return;
    } finally {
      test_787.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_794 = new Test_684();
    try {
      function fn_795(v_796) {
        const params_797 = mapConstructor_662(Object.freeze([pairConstructor_686("active", v_796)]));
        let t_798 = userTable_682();
        let t_799 = csid_677("active");
        const cs_800 = changeset(t_798, params_797).cast(Object.freeze([t_799])).validateBool(csid_677("active"));
        let t_801 = cs_800.isValid;
        function fn_802() {
          return "should accept: " + v_796;
        }
        test_794.assert(t_801, fn_802);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_795);
      return;
    } finally {
      test_794.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_803 = new Test_684();
    try {
      function fn_804(v_805) {
        const params_806 = mapConstructor_662(Object.freeze([pairConstructor_686("active", v_805)]));
        let t_807 = userTable_682();
        let t_808 = csid_677("active");
        const cs_809 = changeset(t_807, params_806).cast(Object.freeze([t_808])).validateBool(csid_677("active"));
        let t_810 = cs_809.isValid;
        function fn_811() {
          return "should accept: " + v_805;
        }
        test_803.assert(t_810, fn_811);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_804);
      return;
    } finally {
      test_803.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_812 = new Test_684();
    try {
      function fn_813(v_814) {
        const params_815 = mapConstructor_662(Object.freeze([pairConstructor_686("active", v_814)]));
        let t_816 = userTable_682();
        let t_817 = csid_677("active");
        const cs_818 = changeset(t_816, params_815).cast(Object.freeze([t_817])).validateBool(csid_677("active"));
        let t_819 = ! cs_818.isValid;
        function fn_820() {
          return "should reject ambiguous: " + v_814;
        }
        test_812.assert(t_819, fn_820);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_813);
      return;
    } finally {
      test_812.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_821 = new Test_684();
    try {
      let t_822;
      const params_823 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Robert'); DROP TABLE users;--"), pairConstructor_686("email", "bobby@evil.com")]));
      let t_824 = userTable_682();
      let t_825 = csid_677("name");
      let t_826 = csid_677("email");
      const cs_827 = changeset(t_824, params_823).cast(Object.freeze([t_825, t_826])).validateRequired(Object.freeze([csid_677("name"), csid_677("email")]));
      let sqlFrag_828;
      try {
        t_822 = cs_827.toInsertSql();
        sqlFrag_828 = t_822;
      } catch {
        sqlFrag_828 = panic_681();
      }
      const s_829 = sqlFrag_828.toString();
      let t_830 = s_829.indexOf("''") >= 0;
      function fn_831() {
        return "single quote must be doubled: " + s_829;
      }
      test_821.assert(t_830, fn_831);
      return;
    } finally {
      test_821.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_832 = new Test_684();
    try {
      let t_833;
      const params_834 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Alice"), pairConstructor_686("email", "a@example.com")]));
      let t_835 = userTable_682();
      let t_836 = csid_677("name");
      let t_837 = csid_677("email");
      const cs_838 = changeset(t_835, params_834).cast(Object.freeze([t_836, t_837])).validateRequired(Object.freeze([csid_677("name"), csid_677("email")]));
      let sqlFrag_839;
      try {
        t_833 = cs_838.toInsertSql();
        sqlFrag_839 = t_833;
      } catch {
        sqlFrag_839 = panic_681();
      }
      const s_840 = sqlFrag_839.toString();
      let t_841 = s_840.indexOf("INSERT INTO users") >= 0;
      function fn_842() {
        return "has INSERT INTO: " + s_840;
      }
      test_832.assert(t_841, fn_842);
      let t_843 = s_840.indexOf("'Alice'") >= 0;
      function fn_844() {
        return "has quoted name: " + s_840;
      }
      test_832.assert(t_843, fn_844);
      return;
    } finally {
      test_832.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_845 = new Test_684();
    try {
      let t_846;
      const params_847 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Bob"), pairConstructor_686("email", "b@example.com"), pairConstructor_686("age", "25")]));
      let t_848 = userTable_682();
      let t_849 = csid_677("name");
      let t_850 = csid_677("email");
      let t_851 = csid_677("age");
      const cs_852 = changeset(t_848, params_847).cast(Object.freeze([t_849, t_850, t_851])).validateRequired(Object.freeze([csid_677("name"), csid_677("email")]));
      let sqlFrag_853;
      try {
        t_846 = cs_852.toInsertSql();
        sqlFrag_853 = t_846;
      } catch {
        sqlFrag_853 = panic_681();
      }
      const s_854 = sqlFrag_853.toString();
      let t_855 = s_854.indexOf("25") >= 0;
      function fn_856() {
        return "age rendered unquoted: " + s_854;
      }
      test_845.assert(t_855, fn_856);
      return;
    } finally {
      test_845.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_857 = new Test_684();
    try {
      const params_858 = mapConstructor_662(Object.freeze([]));
      let t_859 = userTable_682();
      let t_860 = csid_677("name");
      const cs_861 = changeset(t_859, params_858).cast(Object.freeze([t_860])).validateRequired(Object.freeze([csid_677("name")]));
      let didBubble_862;
      try {
        cs_861.toInsertSql();
        didBubble_862 = false;
      } catch {
        didBubble_862 = true;
      }
      function fn_863() {
        return "invalid changeset should bubble";
      }
      test_857.assert(didBubble_862, fn_863);
      return;
    } finally {
      test_857.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_864 = new Test_684();
    try {
      const strictTable_865 = new TableDef(csid_677("posts"), Object.freeze([new FieldDef(csid_677("title"), new StringField(), false), new FieldDef(csid_677("body"), new StringField(), true)]));
      const params_866 = mapConstructor_662(Object.freeze([pairConstructor_686("body", "hello")]));
      let t_867 = csid_677("body");
      const cs_868 = changeset(strictTable_865, params_866).cast(Object.freeze([t_867]));
      let t_869 = cs_868.isValid;
      function fn_870() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_864.assert(t_869, fn_870);
      let didBubble_871;
      try {
        cs_868.toInsertSql();
        didBubble_871 = false;
      } catch {
        didBubble_871 = true;
      }
      function fn_872() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_864.assert(didBubble_871, fn_872);
      return;
    } finally {
      test_864.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_873 = new Test_684();
    try {
      let t_874;
      const params_875 = mapConstructor_662(Object.freeze([pairConstructor_686("name", "Bob")]));
      let t_876 = userTable_682();
      let t_877 = csid_677("name");
      const cs_878 = changeset(t_876, params_875).cast(Object.freeze([t_877])).validateRequired(Object.freeze([csid_677("name")]));
      let sqlFrag_879;
      try {
        t_874 = cs_878.toUpdateSql(42);
        sqlFrag_879 = t_874;
      } catch {
        sqlFrag_879 = panic_681();
      }
      const s_880 = sqlFrag_879.toString();
      let t_881 = s_880 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_882() {
        return "got: " + s_880;
      }
      test_873.assert(t_881, fn_882);
      return;
    } finally {
      test_873.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_883 = new Test_684();
    try {
      const params_884 = mapConstructor_662(Object.freeze([]));
      let t_885 = userTable_682();
      let t_886 = csid_677("name");
      const cs_887 = changeset(t_885, params_884).cast(Object.freeze([t_886])).validateRequired(Object.freeze([csid_677("name")]));
      let didBubble_888;
      try {
        cs_887.toUpdateSql(1);
        didBubble_888 = false;
      } catch {
        didBubble_888 = true;
      }
      function fn_889() {
        return "invalid changeset should bubble";
      }
      test_883.assert(didBubble_888, fn_889);
      return;
    } finally {
      test_883.softFailToHard();
    }
});
/**
 * @param {string} name_928
 * @returns {SafeIdentifier}
 */
function sid_927(name_928) {
  let return_929;
  let t_930;
  try {
    t_930 = safeIdentifier(name_928);
    return_929 = t_930;
  } catch {
    return_929 = panic_681();
  }
  return return_929;
}
it("bare from produces SELECT *", function () {
    const test_931 = new Test_684();
    try {
      const q_932 = from(sid_927("users"));
      let t_933 = q_932.toSql().toString() === "SELECT * FROM users";
      function fn_934() {
        return "bare query";
      }
      test_931.assert(t_933, fn_934);
      return;
    } finally {
      test_931.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_935 = new Test_684();
    try {
      let t_936 = sid_927("users");
      let t_937 = sid_927("id");
      let t_938 = sid_927("name");
      const q_939 = from(t_936).select(Object.freeze([t_937, t_938]));
      let t_940 = q_939.toSql().toString() === "SELECT id, name FROM users";
      function fn_941() {
        return "select columns";
      }
      test_935.assert(t_940, fn_941);
      return;
    } finally {
      test_935.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_942 = new Test_684();
    try {
      let t_943 = sid_927("users");
      let t_944 = new SqlBuilder();
      t_944.appendSafe("age > ");
      t_944.appendInt32(18);
      let t_945 = t_944.accumulated;
      const q_946 = from(t_943).where(t_945);
      let t_947 = q_946.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_948() {
        return "where int";
      }
      test_942.assert(t_947, fn_948);
      return;
    } finally {
      test_942.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_949 = new Test_684();
    try {
      let t_950 = sid_927("users");
      let t_951 = new SqlBuilder();
      t_951.appendSafe("active = ");
      t_951.appendBoolean(true);
      let t_952 = t_951.accumulated;
      const q_953 = from(t_950).where(t_952);
      let t_954 = q_953.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_955() {
        return "where bool";
      }
      test_949.assert(t_954, fn_955);
      return;
    } finally {
      test_949.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_956 = new Test_684();
    try {
      let t_957 = sid_927("users");
      let t_958 = new SqlBuilder();
      t_958.appendSafe("age > ");
      t_958.appendInt32(18);
      let t_959 = t_958.accumulated;
      let t_960 = from(t_957).where(t_959);
      let t_961 = new SqlBuilder();
      t_961.appendSafe("active = ");
      t_961.appendBoolean(true);
      const q_962 = t_960.where(t_961.accumulated);
      let t_963 = q_962.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_964() {
        return "chained where";
      }
      test_956.assert(t_963, fn_964);
      return;
    } finally {
      test_956.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_965 = new Test_684();
    try {
      let t_966 = sid_927("users");
      let t_967 = sid_927("name");
      const q_968 = from(t_966).orderBy(t_967, true);
      let t_969 = q_968.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_970() {
        return "order asc";
      }
      test_965.assert(t_969, fn_970);
      return;
    } finally {
      test_965.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_971 = new Test_684();
    try {
      let t_972 = sid_927("users");
      let t_973 = sid_927("created_at");
      const q_974 = from(t_972).orderBy(t_973, false);
      let t_975 = q_974.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_976() {
        return "order desc";
      }
      test_971.assert(t_975, fn_976);
      return;
    } finally {
      test_971.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_977 = new Test_684();
    try {
      let t_978;
      let t_979;
      let q_980;
      try {
        t_978 = from(sid_927("users")).limit(10);
        t_979 = t_978.offset(20);
        q_980 = t_979;
      } catch {
        q_980 = panic_681();
      }
      let t_981 = q_980.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_982() {
        return "limit/offset";
      }
      test_977.assert(t_981, fn_982);
      return;
    } finally {
      test_977.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_983 = new Test_684();
    try {
      let didBubble_984;
      try {
        from(sid_927("users")).limit(-1);
        didBubble_984 = false;
      } catch {
        didBubble_984 = true;
      }
      function fn_985() {
        return "negative limit should bubble";
      }
      test_983.assert(didBubble_984, fn_985);
      return;
    } finally {
      test_983.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_986 = new Test_684();
    try {
      let didBubble_987;
      try {
        from(sid_927("users")).offset(-1);
        didBubble_987 = false;
      } catch {
        didBubble_987 = true;
      }
      function fn_988() {
        return "negative offset should bubble";
      }
      test_986.assert(didBubble_987, fn_988);
      return;
    } finally {
      test_986.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_989 = new Test_684();
    try {
      let t_990;
      let t_991;
      let t_992;
      let t_993;
      let t_994;
      let t_995;
      let t_996;
      let t_997;
      let t_998;
      let t_999;
      const minAge_1000 = 21;
      let q_1001;
      try {
        t_990 = sid_927("users");
        t_991 = sid_927("id");
        t_992 = sid_927("name");
        t_993 = sid_927("email");
        t_994 = from(t_990).select(Object.freeze([t_991, t_992, t_993]));
        t_995 = new SqlBuilder();
        t_995.appendSafe("age >= ");
        t_995.appendInt32(21);
        t_996 = t_994.where(t_995.accumulated);
        t_997 = new SqlBuilder();
        t_997.appendSafe("active = ");
        t_997.appendBoolean(true);
        t_998 = t_996.where(t_997.accumulated).orderBy(sid_927("name"), true).limit(25);
        t_999 = t_998.offset(0);
        q_1001 = t_999;
      } catch {
        q_1001 = panic_681();
      }
      let t_1002 = q_1001.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_1003() {
        return "complex query";
      }
      test_989.assert(t_1002, fn_1003);
      return;
    } finally {
      test_989.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1004 = new Test_684();
    try {
      let t_1005;
      let t_1006;
      const q_1007 = from(sid_927("users"));
      try {
        t_1005 = q_1007.safeToSql(100);
        t_1006 = t_1005;
      } catch {
        t_1006 = panic_681();
      }
      const s_1008 = t_1006.toString();
      let t_1009 = s_1008 === "SELECT * FROM users LIMIT 100";
      function fn_1010() {
        return "should have limit: " + s_1008;
      }
      test_1004.assert(t_1009, fn_1010);
      return;
    } finally {
      test_1004.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1011 = new Test_684();
    try {
      let t_1012;
      let t_1013;
      let t_1014;
      let q_1015;
      try {
        t_1012 = from(sid_927("users")).limit(5);
        q_1015 = t_1012;
      } catch {
        q_1015 = panic_681();
      }
      try {
        t_1013 = q_1015.safeToSql(100);
        t_1014 = t_1013;
      } catch {
        t_1014 = panic_681();
      }
      const s_1016 = t_1014.toString();
      let t_1017 = s_1016 === "SELECT * FROM users LIMIT 5";
      function fn_1018() {
        return "explicit limit preserved: " + s_1016;
      }
      test_1011.assert(t_1017, fn_1018);
      return;
    } finally {
      test_1011.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1019 = new Test_684();
    try {
      let didBubble_1020;
      try {
        from(sid_927("users")).safeToSql(-1);
        didBubble_1020 = false;
      } catch {
        didBubble_1020 = true;
      }
      function fn_1021() {
        return "negative defaultLimit should bubble";
      }
      test_1019.assert(didBubble_1020, fn_1021);
      return;
    } finally {
      test_1019.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1022 = new Test_684();
    try {
      const evil_1023 = "'; DROP TABLE users; --";
      let t_1024 = sid_927("users");
      let t_1025 = new SqlBuilder();
      t_1025.appendSafe("name = ");
      t_1025.appendString("'; DROP TABLE users; --");
      let t_1026 = t_1025.accumulated;
      const q_1027 = from(t_1024).where(t_1026);
      const s_1028 = q_1027.toSql().toString();
      let t_1029 = s_1028.indexOf("''") >= 0;
      function fn_1030() {
        return "quotes must be doubled: " + s_1028;
      }
      test_1022.assert(t_1029, fn_1030);
      let t_1031 = s_1028.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1032() {
        return "structure intact: " + s_1028;
      }
      test_1022.assert(t_1031, fn_1032);
      return;
    } finally {
      test_1022.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1033 = new Test_684();
    try {
      const attack_1034 = "users; DROP TABLE users; --";
      let didBubble_1035;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1035 = false;
      } catch {
        didBubble_1035 = true;
      }
      function fn_1036() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1033.assert(didBubble_1035, fn_1036);
      return;
    } finally {
      test_1033.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1037 = new Test_684();
    try {
      let t_1038 = sid_927("users");
      let t_1039 = sid_927("orders");
      let t_1040 = new SqlBuilder();
      t_1040.appendSafe("users.id = orders.user_id");
      let t_1041 = t_1040.accumulated;
      const q_1042 = from(t_1038).innerJoin(t_1039, t_1041);
      let t_1043 = q_1042.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1044() {
        return "inner join";
      }
      test_1037.assert(t_1043, fn_1044);
      return;
    } finally {
      test_1037.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1045 = new Test_684();
    try {
      let t_1046 = sid_927("users");
      let t_1047 = sid_927("profiles");
      let t_1048 = new SqlBuilder();
      t_1048.appendSafe("users.id = profiles.user_id");
      let t_1049 = t_1048.accumulated;
      const q_1050 = from(t_1046).leftJoin(t_1047, t_1049);
      let t_1051 = q_1050.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1052() {
        return "left join";
      }
      test_1045.assert(t_1051, fn_1052);
      return;
    } finally {
      test_1045.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1053 = new Test_684();
    try {
      let t_1054 = sid_927("orders");
      let t_1055 = sid_927("users");
      let t_1056 = new SqlBuilder();
      t_1056.appendSafe("orders.user_id = users.id");
      let t_1057 = t_1056.accumulated;
      const q_1058 = from(t_1054).rightJoin(t_1055, t_1057);
      let t_1059 = q_1058.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_1060() {
        return "right join";
      }
      test_1053.assert(t_1059, fn_1060);
      return;
    } finally {
      test_1053.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1061 = new Test_684();
    try {
      let t_1062 = sid_927("users");
      let t_1063 = sid_927("orders");
      let t_1064 = new SqlBuilder();
      t_1064.appendSafe("users.id = orders.user_id");
      let t_1065 = t_1064.accumulated;
      const q_1066 = from(t_1062).fullJoin(t_1063, t_1065);
      let t_1067 = q_1066.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_1068() {
        return "full join";
      }
      test_1061.assert(t_1067, fn_1068);
      return;
    } finally {
      test_1061.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1069 = new Test_684();
    try {
      let t_1070 = sid_927("users");
      let t_1071 = sid_927("orders");
      let t_1072 = new SqlBuilder();
      t_1072.appendSafe("users.id = orders.user_id");
      let t_1073 = t_1072.accumulated;
      let t_1074 = from(t_1070).innerJoin(t_1071, t_1073);
      let t_1075 = sid_927("profiles");
      let t_1076 = new SqlBuilder();
      t_1076.appendSafe("users.id = profiles.user_id");
      const q_1077 = t_1074.leftJoin(t_1075, t_1076.accumulated);
      let t_1078 = q_1077.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1079() {
        return "chained joins";
      }
      test_1069.assert(t_1078, fn_1079);
      return;
    } finally {
      test_1069.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1080 = new Test_684();
    try {
      let t_1081;
      let t_1082;
      let t_1083;
      let t_1084;
      let t_1085;
      let t_1086;
      let t_1087;
      let q_1088;
      try {
        t_1081 = sid_927("users");
        t_1082 = sid_927("orders");
        t_1083 = new SqlBuilder();
        t_1083.appendSafe("users.id = orders.user_id");
        t_1084 = t_1083.accumulated;
        t_1085 = from(t_1081).innerJoin(t_1082, t_1084);
        t_1086 = new SqlBuilder();
        t_1086.appendSafe("orders.total > ");
        t_1086.appendInt32(100);
        t_1087 = t_1085.where(t_1086.accumulated).orderBy(sid_927("name"), true).limit(10);
        q_1088 = t_1087;
      } catch {
        q_1088 = panic_681();
      }
      let t_1089 = q_1088.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_1090() {
        return "join with where/order/limit";
      }
      test_1080.assert(t_1089, fn_1090);
      return;
    } finally {
      test_1080.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1091 = new Test_684();
    try {
      const c_1092 = col(sid_927("users"), sid_927("id"));
      let t_1093 = c_1092.toString() === "users.id";
      function fn_1094() {
        return "col helper";
      }
      test_1091.assert(t_1093, fn_1094);
      return;
    } finally {
      test_1091.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1095 = new Test_684();
    try {
      const onCond_1096 = col(sid_927("users"), sid_927("id"));
      const b_1097 = new SqlBuilder();
      b_1097.appendFragment(onCond_1096);
      b_1097.appendSafe(" = ");
      b_1097.appendFragment(col(sid_927("orders"), sid_927("user_id")));
      let t_1098 = sid_927("users");
      let t_1099 = sid_927("orders");
      let t_1100 = b_1097.accumulated;
      const q_1101 = from(t_1098).innerJoin(t_1099, t_1100);
      let t_1102 = q_1101.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1103() {
        return "join with col";
      }
      test_1095.assert(t_1102, fn_1103);
      return;
    } finally {
      test_1095.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1104 = new Test_684();
    try {
      let t_1105 = sid_927("users");
      let t_1106 = new SqlBuilder();
      t_1106.appendSafe("status = ");
      t_1106.appendString("active");
      let t_1107 = t_1106.accumulated;
      const q_1108 = from(t_1105).orWhere(t_1107);
      let t_1109 = q_1108.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1110() {
        return "orWhere basic";
      }
      test_1104.assert(t_1109, fn_1110);
      return;
    } finally {
      test_1104.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1111 = new Test_684();
    try {
      let t_1112 = sid_927("users");
      let t_1113 = new SqlBuilder();
      t_1113.appendSafe("age > ");
      t_1113.appendInt32(18);
      let t_1114 = t_1113.accumulated;
      let t_1115 = from(t_1112).where(t_1114);
      let t_1116 = new SqlBuilder();
      t_1116.appendSafe("vip = ");
      t_1116.appendBoolean(true);
      const q_1117 = t_1115.orWhere(t_1116.accumulated);
      let t_1118 = q_1117.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1119() {
        return "where then orWhere";
      }
      test_1111.assert(t_1118, fn_1119);
      return;
    } finally {
      test_1111.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1120 = new Test_684();
    try {
      let t_1121 = sid_927("users");
      let t_1122 = new SqlBuilder();
      t_1122.appendSafe("active = ");
      t_1122.appendBoolean(true);
      let t_1123 = t_1122.accumulated;
      let t_1124 = from(t_1121).where(t_1123);
      let t_1125 = new SqlBuilder();
      t_1125.appendSafe("role = ");
      t_1125.appendString("admin");
      let t_1126 = t_1124.orWhere(t_1125.accumulated);
      let t_1127 = new SqlBuilder();
      t_1127.appendSafe("role = ");
      t_1127.appendString("moderator");
      const q_1128 = t_1126.orWhere(t_1127.accumulated);
      let t_1129 = q_1128.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1130() {
        return "multiple orWhere";
      }
      test_1120.assert(t_1129, fn_1130);
      return;
    } finally {
      test_1120.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1131 = new Test_684();
    try {
      let t_1132 = sid_927("users");
      let t_1133 = new SqlBuilder();
      t_1133.appendSafe("age > ");
      t_1133.appendInt32(18);
      let t_1134 = t_1133.accumulated;
      let t_1135 = from(t_1132).where(t_1134);
      let t_1136 = new SqlBuilder();
      t_1136.appendSafe("active = ");
      t_1136.appendBoolean(true);
      let t_1137 = t_1135.where(t_1136.accumulated);
      let t_1138 = new SqlBuilder();
      t_1138.appendSafe("vip = ");
      t_1138.appendBoolean(true);
      const q_1139 = t_1137.orWhere(t_1138.accumulated);
      let t_1140 = q_1139.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1141() {
        return "mixed where and orWhere";
      }
      test_1131.assert(t_1140, fn_1141);
      return;
    } finally {
      test_1131.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1142 = new Test_684();
    try {
      let t_1143 = sid_927("users");
      let t_1144 = sid_927("deleted_at");
      const q_1145 = from(t_1143).whereNull(t_1144);
      let t_1146 = q_1145.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1147() {
        return "whereNull";
      }
      test_1142.assert(t_1146, fn_1147);
      return;
    } finally {
      test_1142.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1148 = new Test_684();
    try {
      let t_1149 = sid_927("users");
      let t_1150 = sid_927("email");
      const q_1151 = from(t_1149).whereNotNull(t_1150);
      let t_1152 = q_1151.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1153() {
        return "whereNotNull";
      }
      test_1148.assert(t_1152, fn_1153);
      return;
    } finally {
      test_1148.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1154 = new Test_684();
    try {
      let t_1155 = sid_927("users");
      let t_1156 = new SqlBuilder();
      t_1156.appendSafe("active = ");
      t_1156.appendBoolean(true);
      let t_1157 = t_1156.accumulated;
      const q_1158 = from(t_1155).where(t_1157).whereNull(sid_927("deleted_at"));
      let t_1159 = q_1158.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1160() {
        return "whereNull chained";
      }
      test_1154.assert(t_1159, fn_1160);
      return;
    } finally {
      test_1154.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1161 = new Test_684();
    try {
      let t_1162 = sid_927("users");
      let t_1163 = sid_927("deleted_at");
      let t_1164 = from(t_1162).whereNull(t_1163);
      let t_1165 = new SqlBuilder();
      t_1165.appendSafe("role = ");
      t_1165.appendString("admin");
      const q_1166 = t_1164.orWhere(t_1165.accumulated);
      let t_1167 = q_1166.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1168() {
        return "whereNotNull with orWhere";
      }
      test_1161.assert(t_1167, fn_1168);
      return;
    } finally {
      test_1161.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1169 = new Test_684();
    try {
      let t_1170 = sid_927("users");
      let t_1171 = sid_927("id");
      let t_1172 = new SqlInt32(1);
      let t_1173 = new SqlInt32(2);
      let t_1174 = new SqlInt32(3);
      const q_1175 = from(t_1170).whereIn(t_1171, Object.freeze([t_1172, t_1173, t_1174]));
      let t_1176 = q_1175.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1177() {
        return "whereIn ints";
      }
      test_1169.assert(t_1176, fn_1177);
      return;
    } finally {
      test_1169.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1178 = new Test_684();
    try {
      let t_1179 = sid_927("users");
      let t_1180 = sid_927("name");
      let t_1181 = new SqlString("Alice");
      let t_1182 = new SqlString("Bob's");
      const q_1183 = from(t_1179).whereIn(t_1180, Object.freeze([t_1181, t_1182]));
      let t_1184 = q_1183.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1185() {
        return "whereIn strings";
      }
      test_1178.assert(t_1184, fn_1185);
      return;
    } finally {
      test_1178.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1186 = new Test_684();
    try {
      let t_1187 = sid_927("users");
      let t_1188 = sid_927("id");
      const q_1189 = from(t_1187).whereIn(t_1188, Object.freeze([]));
      let t_1190 = q_1189.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1191() {
        return "whereIn empty";
      }
      test_1186.assert(t_1190, fn_1191);
      return;
    } finally {
      test_1186.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1192 = new Test_684();
    try {
      let t_1193 = sid_927("users");
      let t_1194 = new SqlBuilder();
      t_1194.appendSafe("active = ");
      t_1194.appendBoolean(true);
      let t_1195 = t_1194.accumulated;
      const q_1196 = from(t_1193).where(t_1195).whereIn(sid_927("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1197 = q_1196.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1198() {
        return "whereIn chained";
      }
      test_1192.assert(t_1197, fn_1198);
      return;
    } finally {
      test_1192.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1199 = new Test_684();
    try {
      let t_1200 = sid_927("users");
      let t_1201 = sid_927("id");
      let t_1202 = new SqlInt32(42);
      const q_1203 = from(t_1200).whereIn(t_1201, Object.freeze([t_1202]));
      let t_1204 = q_1203.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1205() {
        return "whereIn single";
      }
      test_1199.assert(t_1204, fn_1205);
      return;
    } finally {
      test_1199.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1206 = new Test_684();
    try {
      let t_1207 = sid_927("users");
      let t_1208 = new SqlBuilder();
      t_1208.appendSafe("active = ");
      t_1208.appendBoolean(true);
      let t_1209 = t_1208.accumulated;
      const q_1210 = from(t_1207).whereNot(t_1209);
      let t_1211 = q_1210.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1212() {
        return "whereNot";
      }
      test_1206.assert(t_1211, fn_1212);
      return;
    } finally {
      test_1206.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1213 = new Test_684();
    try {
      let t_1214 = sid_927("users");
      let t_1215 = new SqlBuilder();
      t_1215.appendSafe("age > ");
      t_1215.appendInt32(18);
      let t_1216 = t_1215.accumulated;
      let t_1217 = from(t_1214).where(t_1216);
      let t_1218 = new SqlBuilder();
      t_1218.appendSafe("banned = ");
      t_1218.appendBoolean(true);
      const q_1219 = t_1217.whereNot(t_1218.accumulated);
      let t_1220 = q_1219.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1221() {
        return "whereNot chained";
      }
      test_1213.assert(t_1220, fn_1221);
      return;
    } finally {
      test_1213.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1222 = new Test_684();
    try {
      let t_1223 = sid_927("users");
      let t_1224 = sid_927("age");
      let t_1225 = new SqlInt32(18);
      let t_1226 = new SqlInt32(65);
      const q_1227 = from(t_1223).whereBetween(t_1224, t_1225, t_1226);
      let t_1228 = q_1227.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1229() {
        return "whereBetween ints";
      }
      test_1222.assert(t_1228, fn_1229);
      return;
    } finally {
      test_1222.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1230 = new Test_684();
    try {
      let t_1231 = sid_927("users");
      let t_1232 = new SqlBuilder();
      t_1232.appendSafe("active = ");
      t_1232.appendBoolean(true);
      let t_1233 = t_1232.accumulated;
      const q_1234 = from(t_1231).where(t_1233).whereBetween(sid_927("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1235 = q_1234.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1236() {
        return "whereBetween chained";
      }
      test_1230.assert(t_1235, fn_1236);
      return;
    } finally {
      test_1230.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1237 = new Test_684();
    try {
      let t_1238 = sid_927("users");
      let t_1239 = sid_927("name");
      const q_1240 = from(t_1238).whereLike(t_1239, "John%");
      let t_1241 = q_1240.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1242() {
        return "whereLike";
      }
      test_1237.assert(t_1241, fn_1242);
      return;
    } finally {
      test_1237.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1243 = new Test_684();
    try {
      let t_1244 = sid_927("users");
      let t_1245 = sid_927("email");
      const q_1246 = from(t_1244).whereILike(t_1245, "%@gmail.com");
      let t_1247 = q_1246.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1248() {
        return "whereILike";
      }
      test_1243.assert(t_1247, fn_1248);
      return;
    } finally {
      test_1243.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1249 = new Test_684();
    try {
      let t_1250 = sid_927("users");
      let t_1251 = sid_927("name");
      const q_1252 = from(t_1250).whereLike(t_1251, "'; DROP TABLE users; --");
      const s_1253 = q_1252.toSql().toString();
      let t_1254 = s_1253.indexOf("''") >= 0;
      function fn_1255() {
        return "like injection escaped: " + s_1253;
      }
      test_1249.assert(t_1254, fn_1255);
      let t_1256 = s_1253.indexOf("LIKE") >= 0;
      function fn_1257() {
        return "like structure intact: " + s_1253;
      }
      test_1249.assert(t_1256, fn_1257);
      return;
    } finally {
      test_1249.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1258 = new Test_684();
    try {
      let t_1259 = sid_927("users");
      let t_1260 = sid_927("name");
      const q_1261 = from(t_1259).whereLike(t_1260, "%son%");
      let t_1262 = q_1261.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1263() {
        return "whereLike wildcard";
      }
      test_1258.assert(t_1262, fn_1263);
      return;
    } finally {
      test_1258.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1264 = new Test_684();
    try {
      const f_1265 = countAll();
      let t_1266 = f_1265.toString() === "COUNT(*)";
      function fn_1267() {
        return "countAll";
      }
      test_1264.assert(t_1266, fn_1267);
      return;
    } finally {
      test_1264.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1268 = new Test_684();
    try {
      const f_1269 = countCol(sid_927("id"));
      let t_1270 = f_1269.toString() === "COUNT(id)";
      function fn_1271() {
        return "countCol";
      }
      test_1268.assert(t_1270, fn_1271);
      return;
    } finally {
      test_1268.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1272 = new Test_684();
    try {
      const f_1273 = sumCol(sid_927("amount"));
      let t_1274 = f_1273.toString() === "SUM(amount)";
      function fn_1275() {
        return "sumCol";
      }
      test_1272.assert(t_1274, fn_1275);
      return;
    } finally {
      test_1272.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1276 = new Test_684();
    try {
      const f_1277 = avgCol(sid_927("price"));
      let t_1278 = f_1277.toString() === "AVG(price)";
      function fn_1279() {
        return "avgCol";
      }
      test_1276.assert(t_1278, fn_1279);
      return;
    } finally {
      test_1276.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1280 = new Test_684();
    try {
      const f_1281 = minCol(sid_927("created_at"));
      let t_1282 = f_1281.toString() === "MIN(created_at)";
      function fn_1283() {
        return "minCol";
      }
      test_1280.assert(t_1282, fn_1283);
      return;
    } finally {
      test_1280.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1284 = new Test_684();
    try {
      const f_1285 = maxCol(sid_927("score"));
      let t_1286 = f_1285.toString() === "MAX(score)";
      function fn_1287() {
        return "maxCol";
      }
      test_1284.assert(t_1286, fn_1287);
      return;
    } finally {
      test_1284.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1288 = new Test_684();
    try {
      let t_1289 = sid_927("orders");
      let t_1290 = countAll();
      const q_1291 = from(t_1289).selectExpr(Object.freeze([t_1290]));
      let t_1292 = q_1291.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1293() {
        return "selectExpr count";
      }
      test_1288.assert(t_1292, fn_1293);
      return;
    } finally {
      test_1288.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1294 = new Test_684();
    try {
      const nameFrag_1295 = col(sid_927("users"), sid_927("name"));
      let t_1296 = sid_927("users");
      let t_1297 = countAll();
      const q_1298 = from(t_1296).selectExpr(Object.freeze([nameFrag_1295, t_1297]));
      let t_1299 = q_1298.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1300() {
        return "selectExpr multi";
      }
      test_1294.assert(t_1299, fn_1300);
      return;
    } finally {
      test_1294.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1301 = new Test_684();
    try {
      let t_1302 = sid_927("users");
      let t_1303 = sid_927("id");
      let t_1304 = sid_927("name");
      const q_1305 = from(t_1302).select(Object.freeze([t_1303, t_1304])).selectExpr(Object.freeze([countAll()]));
      let t_1306 = q_1305.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1307() {
        return "selectExpr overrides select";
      }
      test_1301.assert(t_1306, fn_1307);
      return;
    } finally {
      test_1301.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1308 = new Test_684();
    try {
      let t_1309 = sid_927("orders");
      let t_1310 = col(sid_927("orders"), sid_927("status"));
      let t_1311 = countAll();
      const q_1312 = from(t_1309).selectExpr(Object.freeze([t_1310, t_1311])).groupBy(sid_927("status"));
      let t_1313 = q_1312.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1314() {
        return "groupBy single";
      }
      test_1308.assert(t_1313, fn_1314);
      return;
    } finally {
      test_1308.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1315 = new Test_684();
    try {
      let t_1316 = sid_927("orders");
      let t_1317 = sid_927("status");
      const q_1318 = from(t_1316).groupBy(t_1317).groupBy(sid_927("category"));
      let t_1319 = q_1318.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1320() {
        return "groupBy multiple";
      }
      test_1315.assert(t_1319, fn_1320);
      return;
    } finally {
      test_1315.softFailToHard();
    }
});
it("having basic", function () {
    const test_1321 = new Test_684();
    try {
      let t_1322 = sid_927("orders");
      let t_1323 = col(sid_927("orders"), sid_927("status"));
      let t_1324 = countAll();
      let t_1325 = from(t_1322).selectExpr(Object.freeze([t_1323, t_1324])).groupBy(sid_927("status"));
      let t_1326 = new SqlBuilder();
      t_1326.appendSafe("COUNT(*) > ");
      t_1326.appendInt32(5);
      const q_1327 = t_1325.having(t_1326.accumulated);
      let t_1328 = q_1327.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1329() {
        return "having basic";
      }
      test_1321.assert(t_1328, fn_1329);
      return;
    } finally {
      test_1321.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1330 = new Test_684();
    try {
      let t_1331 = sid_927("orders");
      let t_1332 = sid_927("status");
      let t_1333 = from(t_1331).groupBy(t_1332);
      let t_1334 = new SqlBuilder();
      t_1334.appendSafe("COUNT(*) > ");
      t_1334.appendInt32(5);
      let t_1335 = t_1333.having(t_1334.accumulated);
      let t_1336 = new SqlBuilder();
      t_1336.appendSafe("SUM(total) > ");
      t_1336.appendInt32(1000);
      const q_1337 = t_1335.orHaving(t_1336.accumulated);
      let t_1338 = q_1337.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1339() {
        return "orHaving";
      }
      test_1330.assert(t_1338, fn_1339);
      return;
    } finally {
      test_1330.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1340 = new Test_684();
    try {
      let t_1341 = sid_927("users");
      let t_1342 = sid_927("name");
      const q_1343 = from(t_1341).select(Object.freeze([t_1342])).distinct();
      let t_1344 = q_1343.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1345() {
        return "distinct";
      }
      test_1340.assert(t_1344, fn_1345);
      return;
    } finally {
      test_1340.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1346 = new Test_684();
    try {
      let t_1347 = sid_927("users");
      let t_1348 = sid_927("email");
      let t_1349 = from(t_1347).select(Object.freeze([t_1348]));
      let t_1350 = new SqlBuilder();
      t_1350.appendSafe("active = ");
      t_1350.appendBoolean(true);
      const q_1351 = t_1349.where(t_1350.accumulated).distinct();
      let t_1352 = q_1351.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1353() {
        return "distinct with where";
      }
      test_1346.assert(t_1352, fn_1353);
      return;
    } finally {
      test_1346.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1354 = new Test_684();
    try {
      const q_1355 = from(sid_927("users"));
      let t_1356 = q_1355.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1357() {
        return "countSql bare";
      }
      test_1354.assert(t_1356, fn_1357);
      return;
    } finally {
      test_1354.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1358 = new Test_684();
    try {
      let t_1359 = sid_927("users");
      let t_1360 = new SqlBuilder();
      t_1360.appendSafe("active = ");
      t_1360.appendBoolean(true);
      let t_1361 = t_1360.accumulated;
      const q_1362 = from(t_1359).where(t_1361);
      let t_1363 = q_1362.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1364() {
        return "countSql with where";
      }
      test_1358.assert(t_1363, fn_1364);
      return;
    } finally {
      test_1358.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1365 = new Test_684();
    try {
      let t_1366 = sid_927("users");
      let t_1367 = sid_927("orders");
      let t_1368 = new SqlBuilder();
      t_1368.appendSafe("users.id = orders.user_id");
      let t_1369 = t_1368.accumulated;
      let t_1370 = from(t_1366).innerJoin(t_1367, t_1369);
      let t_1371 = new SqlBuilder();
      t_1371.appendSafe("orders.total > ");
      t_1371.appendInt32(100);
      const q_1372 = t_1370.where(t_1371.accumulated);
      let t_1373 = q_1372.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_1374() {
        return "countSql with join";
      }
      test_1365.assert(t_1373, fn_1374);
      return;
    } finally {
      test_1365.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1375 = new Test_684();
    try {
      let t_1376;
      let t_1377;
      let t_1378;
      let t_1379;
      let t_1380;
      let q_1381;
      try {
        t_1376 = sid_927("users");
        t_1377 = new SqlBuilder();
        t_1377.appendSafe("active = ");
        t_1377.appendBoolean(true);
        t_1378 = t_1377.accumulated;
        t_1379 = from(t_1376).where(t_1378).orderBy(sid_927("name"), true).limit(10);
        t_1380 = t_1379.offset(20);
        q_1381 = t_1380;
      } catch {
        q_1381 = panic_681();
      }
      const s_1382 = q_1381.countSql().toString();
      let t_1383 = s_1382 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1384() {
        return "countSql drops extras: " + s_1382;
      }
      test_1375.assert(t_1383, fn_1384);
      return;
    } finally {
      test_1375.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1385 = new Test_684();
    try {
      let t_1386 = sid_927("orders");
      let t_1387 = col(sid_927("orders"), sid_927("status"));
      let t_1388 = countAll();
      let t_1389 = sumCol(sid_927("total"));
      let t_1390 = from(t_1386).selectExpr(Object.freeze([t_1387, t_1388, t_1389]));
      let t_1391 = sid_927("users");
      let t_1392 = new SqlBuilder();
      t_1392.appendSafe("orders.user_id = users.id");
      let t_1393 = t_1390.innerJoin(t_1391, t_1392.accumulated);
      let t_1394 = new SqlBuilder();
      t_1394.appendSafe("users.active = ");
      t_1394.appendBoolean(true);
      let t_1395 = t_1393.where(t_1394.accumulated).groupBy(sid_927("status"));
      let t_1396 = new SqlBuilder();
      t_1396.appendSafe("COUNT(*) > ");
      t_1396.appendInt32(3);
      const q_1397 = t_1395.having(t_1396.accumulated).orderBy(sid_927("status"), true);
      const expected_1398 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_1399 = q_1397.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1400() {
        return "full aggregation";
      }
      test_1385.assert(t_1399, fn_1400);
      return;
    } finally {
      test_1385.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1401 = new Test_684();
    try {
      let t_1402 = sid_927("users");
      let t_1403 = new SqlBuilder();
      t_1403.appendSafe("role = ");
      t_1403.appendString("admin");
      let t_1404 = t_1403.accumulated;
      const a_1405 = from(t_1402).where(t_1404);
      let t_1406 = sid_927("users");
      let t_1407 = new SqlBuilder();
      t_1407.appendSafe("role = ");
      t_1407.appendString("moderator");
      let t_1408 = t_1407.accumulated;
      const b_1409 = from(t_1406).where(t_1408);
      const s_1410 = unionSql(a_1405, b_1409).toString();
      let t_1411 = s_1410 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_1412() {
        return "unionSql: " + s_1410;
      }
      test_1401.assert(t_1411, fn_1412);
      return;
    } finally {
      test_1401.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1413 = new Test_684();
    try {
      let t_1414 = sid_927("users");
      let t_1415 = sid_927("name");
      const a_1416 = from(t_1414).select(Object.freeze([t_1415]));
      let t_1417 = sid_927("contacts");
      let t_1418 = sid_927("name");
      const b_1419 = from(t_1417).select(Object.freeze([t_1418]));
      const s_1420 = unionAllSql(a_1416, b_1419).toString();
      let t_1421 = s_1420 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_1422() {
        return "unionAllSql: " + s_1420;
      }
      test_1413.assert(t_1421, fn_1422);
      return;
    } finally {
      test_1413.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1423 = new Test_684();
    try {
      let t_1424 = sid_927("users");
      let t_1425 = sid_927("email");
      const a_1426 = from(t_1424).select(Object.freeze([t_1425]));
      let t_1427 = sid_927("subscribers");
      let t_1428 = sid_927("email");
      const b_1429 = from(t_1427).select(Object.freeze([t_1428]));
      const s_1430 = intersectSql(a_1426, b_1429).toString();
      let t_1431 = s_1430 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_1432() {
        return "intersectSql: " + s_1430;
      }
      test_1423.assert(t_1431, fn_1432);
      return;
    } finally {
      test_1423.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1433 = new Test_684();
    try {
      let t_1434 = sid_927("users");
      let t_1435 = sid_927("id");
      const a_1436 = from(t_1434).select(Object.freeze([t_1435]));
      let t_1437 = sid_927("banned");
      let t_1438 = sid_927("id");
      const b_1439 = from(t_1437).select(Object.freeze([t_1438]));
      const s_1440 = exceptSql(a_1436, b_1439).toString();
      let t_1441 = s_1440 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_1442() {
        return "exceptSql: " + s_1440;
      }
      test_1433.assert(t_1441, fn_1442);
      return;
    } finally {
      test_1433.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1443 = new Test_684();
    try {
      let t_1444 = sid_927("orders");
      let t_1445 = sid_927("user_id");
      let t_1446 = from(t_1444).select(Object.freeze([t_1445]));
      let t_1447 = new SqlBuilder();
      t_1447.appendSafe("total > ");
      t_1447.appendInt32(100);
      const inner_1448 = t_1446.where(t_1447.accumulated);
      const s_1449 = subquery(inner_1448, sid_927("big_orders")).toString();
      let t_1450 = s_1449 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_1451() {
        return "subquery: " + s_1449;
      }
      test_1443.assert(t_1450, fn_1451);
      return;
    } finally {
      test_1443.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1452 = new Test_684();
    try {
      let t_1453 = sid_927("orders");
      let t_1454 = new SqlBuilder();
      t_1454.appendSafe("orders.user_id = users.id");
      let t_1455 = t_1454.accumulated;
      const inner_1456 = from(t_1453).where(t_1455);
      const s_1457 = existsSql(inner_1456).toString();
      let t_1458 = s_1457 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1459() {
        return "existsSql: " + s_1457;
      }
      test_1452.assert(t_1458, fn_1459);
      return;
    } finally {
      test_1452.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1460 = new Test_684();
    try {
      let t_1461 = sid_927("orders");
      let t_1462 = sid_927("user_id");
      let t_1463 = from(t_1461).select(Object.freeze([t_1462]));
      let t_1464 = new SqlBuilder();
      t_1464.appendSafe("total > ");
      t_1464.appendInt32(1000);
      const sub_1465 = t_1463.where(t_1464.accumulated);
      let t_1466 = sid_927("users");
      let t_1467 = sid_927("id");
      const q_1468 = from(t_1466).whereInSubquery(t_1467, sub_1465);
      const s_1469 = q_1468.toSql().toString();
      let t_1470 = s_1469 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_1471() {
        return "whereInSubquery: " + s_1469;
      }
      test_1460.assert(t_1470, fn_1471);
      return;
    } finally {
      test_1460.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1472 = new Test_684();
    try {
      let t_1473 = sid_927("users");
      let t_1474 = new SqlBuilder();
      t_1474.appendSafe("age > ");
      t_1474.appendInt32(18);
      let t_1475 = t_1474.accumulated;
      let t_1476 = from(t_1473).where(t_1475);
      let t_1477 = new SqlBuilder();
      t_1477.appendSafe("active = ");
      t_1477.appendBoolean(true);
      const a_1478 = t_1476.where(t_1477.accumulated);
      let t_1479 = sid_927("users");
      let t_1480 = new SqlBuilder();
      t_1480.appendSafe("role = ");
      t_1480.appendString("vip");
      let t_1481 = t_1480.accumulated;
      const b_1482 = from(t_1479).where(t_1481);
      const s_1483 = unionSql(a_1478, b_1482).toString();
      let t_1484 = s_1483 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_1485() {
        return "union with where: " + s_1483;
      }
      test_1472.assert(t_1484, fn_1485);
      return;
    } finally {
      test_1472.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1486 = new Test_684();
    try {
      let t_1487 = sid_927("orders");
      let t_1488 = sid_927("user_id");
      const sub_1489 = from(t_1487).select(Object.freeze([t_1488]));
      let t_1490 = sid_927("users");
      let t_1491 = new SqlBuilder();
      t_1491.appendSafe("active = ");
      t_1491.appendBoolean(true);
      let t_1492 = t_1491.accumulated;
      const q_1493 = from(t_1490).where(t_1492).whereInSubquery(sid_927("id"), sub_1489);
      const s_1494 = q_1493.toSql().toString();
      let t_1495 = s_1494 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_1496() {
        return "whereInSubquery chained: " + s_1494;
      }
      test_1486.assert(t_1495, fn_1496);
      return;
    } finally {
      test_1486.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1497 = new Test_684();
    try {
      let t_1498 = sid_927("orders");
      let t_1499 = new SqlBuilder();
      t_1499.appendSafe("orders.user_id = users.id");
      let t_1500 = t_1499.accumulated;
      const sub_1501 = from(t_1498).where(t_1500);
      let t_1502 = sid_927("users");
      let t_1503 = existsSql(sub_1501);
      const q_1504 = from(t_1502).where(t_1503);
      const s_1505 = q_1504.toSql().toString();
      let t_1506 = s_1505 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1507() {
        return "exists in where: " + s_1505;
      }
      test_1497.assert(t_1506, fn_1507);
      return;
    } finally {
      test_1497.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_1508 = new Test_684();
    try {
      let t_1509;
      let t_1510;
      let t_1511;
      let t_1512;
      let t_1513;
      let t_1514;
      let q_1515;
      try {
        t_1509 = sid_927("users");
        t_1510 = sid_927("name");
        t_1511 = new SqlString("Alice");
        t_1512 = update(t_1509).set(t_1510, t_1511);
        t_1513 = new SqlBuilder();
        t_1513.appendSafe("id = ");
        t_1513.appendInt32(1);
        t_1514 = t_1512.where(t_1513.accumulated).toSql();
        q_1515 = t_1514;
      } catch {
        q_1515 = panic_681();
      }
      let t_1516 = q_1515.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1";
      function fn_1517() {
        return "update basic";
      }
      test_1508.assert(t_1516, fn_1517);
      return;
    } finally {
      test_1508.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_1518 = new Test_684();
    try {
      let t_1519;
      let t_1520;
      let t_1521;
      let t_1522;
      let t_1523;
      let t_1524;
      let q_1525;
      try {
        t_1519 = sid_927("users");
        t_1520 = sid_927("name");
        t_1521 = new SqlString("Bob");
        t_1522 = update(t_1519).set(t_1520, t_1521).set(sid_927("age"), new SqlInt32(30));
        t_1523 = new SqlBuilder();
        t_1523.appendSafe("id = ");
        t_1523.appendInt32(2);
        t_1524 = t_1522.where(t_1523.accumulated).toSql();
        q_1525 = t_1524;
      } catch {
        q_1525 = panic_681();
      }
      let t_1526 = q_1525.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2";
      function fn_1527() {
        return "update multi set";
      }
      test_1518.assert(t_1526, fn_1527);
      return;
    } finally {
      test_1518.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_1528 = new Test_684();
    try {
      let t_1529;
      let t_1530;
      let t_1531;
      let t_1532;
      let t_1533;
      let t_1534;
      let t_1535;
      let t_1536;
      let q_1537;
      try {
        t_1529 = sid_927("users");
        t_1530 = sid_927("active");
        t_1531 = new SqlBoolean(false);
        t_1532 = update(t_1529).set(t_1530, t_1531);
        t_1533 = new SqlBuilder();
        t_1533.appendSafe("age < ");
        t_1533.appendInt32(18);
        t_1534 = t_1532.where(t_1533.accumulated);
        t_1535 = new SqlBuilder();
        t_1535.appendSafe("role = ");
        t_1535.appendString("guest");
        t_1536 = t_1534.where(t_1535.accumulated).toSql();
        q_1537 = t_1536;
      } catch {
        q_1537 = panic_681();
      }
      let t_1538 = q_1537.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'";
      function fn_1539() {
        return "update multi where";
      }
      test_1528.assert(t_1538, fn_1539);
      return;
    } finally {
      test_1528.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_1540 = new Test_684();
    try {
      let t_1541;
      let t_1542;
      let t_1543;
      let t_1544;
      let t_1545;
      let t_1546;
      let t_1547;
      let t_1548;
      let q_1549;
      try {
        t_1541 = sid_927("users");
        t_1542 = sid_927("status");
        t_1543 = new SqlString("banned");
        t_1544 = update(t_1541).set(t_1542, t_1543);
        t_1545 = new SqlBuilder();
        t_1545.appendSafe("spam_count > ");
        t_1545.appendInt32(10);
        t_1546 = t_1544.where(t_1545.accumulated);
        t_1547 = new SqlBuilder();
        t_1547.appendSafe("reported = ");
        t_1547.appendBoolean(true);
        t_1548 = t_1546.orWhere(t_1547.accumulated).toSql();
        q_1549 = t_1548;
      } catch {
        q_1549 = panic_681();
      }
      let t_1550 = q_1549.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE";
      function fn_1551() {
        return "update orWhere";
      }
      test_1540.assert(t_1550, fn_1551);
      return;
    } finally {
      test_1540.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_1552 = new Test_684();
    try {
      let t_1553;
      let t_1554;
      let t_1555;
      let didBubble_1556;
      try {
        t_1553 = sid_927("users");
        t_1554 = sid_927("x");
        t_1555 = new SqlInt32(1);
        update(t_1553).set(t_1554, t_1555).toSql();
        didBubble_1556 = false;
      } catch {
        didBubble_1556 = true;
      }
      function fn_1557() {
        return "update without WHERE should bubble";
      }
      test_1552.assert(didBubble_1556, fn_1557);
      return;
    } finally {
      test_1552.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_1558 = new Test_684();
    try {
      let t_1559;
      let t_1560;
      let t_1561;
      let didBubble_1562;
      try {
        t_1559 = sid_927("users");
        t_1560 = new SqlBuilder();
        t_1560.appendSafe("id = ");
        t_1560.appendInt32(1);
        t_1561 = t_1560.accumulated;
        update(t_1559).where(t_1561).toSql();
        didBubble_1562 = false;
      } catch {
        didBubble_1562 = true;
      }
      function fn_1563() {
        return "update without SET should bubble";
      }
      test_1558.assert(didBubble_1562, fn_1563);
      return;
    } finally {
      test_1558.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_1564 = new Test_684();
    try {
      let t_1565;
      let t_1566;
      let t_1567;
      let t_1568;
      let t_1569;
      let t_1570;
      let t_1571;
      let q_1572;
      try {
        t_1565 = sid_927("users");
        t_1566 = sid_927("active");
        t_1567 = new SqlBoolean(false);
        t_1568 = update(t_1565).set(t_1566, t_1567);
        t_1569 = new SqlBuilder();
        t_1569.appendSafe("last_login < ");
        t_1569.appendString("2024-01-01");
        t_1570 = t_1568.where(t_1569.accumulated).limit(100);
        t_1571 = t_1570.toSql();
        q_1572 = t_1571;
      } catch {
        q_1572 = panic_681();
      }
      let t_1573 = q_1572.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100";
      function fn_1574() {
        return "update limit";
      }
      test_1564.assert(t_1573, fn_1574);
      return;
    } finally {
      test_1564.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_1575 = new Test_684();
    try {
      let t_1576;
      let t_1577;
      let t_1578;
      let t_1579;
      let t_1580;
      let t_1581;
      let q_1582;
      try {
        t_1576 = sid_927("users");
        t_1577 = sid_927("bio");
        t_1578 = new SqlString("It's a test");
        t_1579 = update(t_1576).set(t_1577, t_1578);
        t_1580 = new SqlBuilder();
        t_1580.appendSafe("id = ");
        t_1580.appendInt32(1);
        t_1581 = t_1579.where(t_1580.accumulated).toSql();
        q_1582 = t_1581;
      } catch {
        q_1582 = panic_681();
      }
      let t_1583 = q_1582.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1";
      function fn_1584() {
        return "update escaping";
      }
      test_1575.assert(t_1583, fn_1584);
      return;
    } finally {
      test_1575.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_1585 = new Test_684();
    try {
      let t_1586;
      let t_1587;
      let t_1588;
      let t_1589;
      let q_1590;
      try {
        t_1586 = sid_927("users");
        t_1587 = new SqlBuilder();
        t_1587.appendSafe("id = ");
        t_1587.appendInt32(1);
        t_1588 = t_1587.accumulated;
        t_1589 = deleteFrom(t_1586).where(t_1588).toSql();
        q_1590 = t_1589;
      } catch {
        q_1590 = panic_681();
      }
      let t_1591 = q_1590.toString() === "DELETE FROM users WHERE id = 1";
      function fn_1592() {
        return "delete basic";
      }
      test_1585.assert(t_1591, fn_1592);
      return;
    } finally {
      test_1585.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_1593 = new Test_684();
    try {
      let t_1594;
      let t_1595;
      let t_1596;
      let t_1597;
      let t_1598;
      let t_1599;
      let q_1600;
      try {
        t_1594 = sid_927("logs");
        t_1595 = new SqlBuilder();
        t_1595.appendSafe("created_at < ");
        t_1595.appendString("2024-01-01");
        t_1596 = t_1595.accumulated;
        t_1597 = deleteFrom(t_1594).where(t_1596);
        t_1598 = new SqlBuilder();
        t_1598.appendSafe("level = ");
        t_1598.appendString("debug");
        t_1599 = t_1597.where(t_1598.accumulated).toSql();
        q_1600 = t_1599;
      } catch {
        q_1600 = panic_681();
      }
      let t_1601 = q_1600.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'";
      function fn_1602() {
        return "delete multi where";
      }
      test_1593.assert(t_1601, fn_1602);
      return;
    } finally {
      test_1593.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_1603 = new Test_684();
    try {
      let didBubble_1604;
      try {
        deleteFrom(sid_927("users")).toSql();
        didBubble_1604 = false;
      } catch {
        didBubble_1604 = true;
      }
      function fn_1605() {
        return "delete without WHERE should bubble";
      }
      test_1603.assert(didBubble_1604, fn_1605);
      return;
    } finally {
      test_1603.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_1606 = new Test_684();
    try {
      let t_1607;
      let t_1608;
      let t_1609;
      let t_1610;
      let t_1611;
      let t_1612;
      let q_1613;
      try {
        t_1607 = sid_927("sessions");
        t_1608 = new SqlBuilder();
        t_1608.appendSafe("expired = ");
        t_1608.appendBoolean(true);
        t_1609 = t_1608.accumulated;
        t_1610 = deleteFrom(t_1607).where(t_1609);
        t_1611 = new SqlBuilder();
        t_1611.appendSafe("created_at < ");
        t_1611.appendString("2023-01-01");
        t_1612 = t_1610.orWhere(t_1611.accumulated).toSql();
        q_1613 = t_1612;
      } catch {
        q_1613 = panic_681();
      }
      let t_1614 = q_1613.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'";
      function fn_1615() {
        return "delete orWhere";
      }
      test_1606.assert(t_1614, fn_1615);
      return;
    } finally {
      test_1606.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_1616 = new Test_684();
    try {
      let t_1617;
      let t_1618;
      let t_1619;
      let t_1620;
      let t_1621;
      let q_1622;
      try {
        t_1617 = sid_927("logs");
        t_1618 = new SqlBuilder();
        t_1618.appendSafe("level = ");
        t_1618.appendString("debug");
        t_1619 = t_1618.accumulated;
        t_1620 = deleteFrom(t_1617).where(t_1619).limit(1000);
        t_1621 = t_1620.toSql();
        q_1622 = t_1621;
      } catch {
        q_1622 = panic_681();
      }
      let t_1623 = q_1622.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000";
      function fn_1624() {
        return "delete limit";
      }
      test_1616.assert(t_1623, fn_1624);
      return;
    } finally {
      test_1616.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_1625 = new Test_684();
    try {
      let t_1626 = sid_927("users");
      let t_1627 = sid_927("email");
      let t_1628 = new NullsFirst();
      const q_1629 = from(t_1626).orderByNulls(t_1627, true, t_1628);
      let t_1630 = q_1629.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST";
      function fn_1631() {
        return "nulls first";
      }
      test_1625.assert(t_1630, fn_1631);
      return;
    } finally {
      test_1625.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_1632 = new Test_684();
    try {
      let t_1633 = sid_927("users");
      let t_1634 = sid_927("score");
      let t_1635 = new NullsLast();
      const q_1636 = from(t_1633).orderByNulls(t_1634, false, t_1635);
      let t_1637 = q_1636.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST";
      function fn_1638() {
        return "nulls last";
      }
      test_1632.assert(t_1637, fn_1638);
      return;
    } finally {
      test_1632.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_1639 = new Test_684();
    try {
      let t_1640 = sid_927("users");
      let t_1641 = sid_927("name");
      const q_1642 = from(t_1640).orderBy(t_1641, true).orderByNulls(sid_927("email"), true, new NullsFirst());
      let t_1643 = q_1642.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST";
      function fn_1644() {
        return "mixed order";
      }
      test_1639.assert(t_1643, fn_1644);
      return;
    } finally {
      test_1639.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_1645 = new Test_684();
    try {
      let t_1646 = sid_927("users");
      let t_1647 = sid_927("colors");
      const q_1648 = from(t_1646).crossJoin(t_1647);
      let t_1649 = q_1648.toSql().toString() === "SELECT * FROM users CROSS JOIN colors";
      function fn_1650() {
        return "cross join";
      }
      test_1645.assert(t_1649, fn_1650);
      return;
    } finally {
      test_1645.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_1651 = new Test_684();
    try {
      let t_1652 = sid_927("users");
      let t_1653 = sid_927("orders");
      let t_1654 = new SqlBuilder();
      t_1654.appendSafe("users.id = orders.user_id");
      let t_1655 = t_1654.accumulated;
      const q_1656 = from(t_1652).innerJoin(t_1653, t_1655).crossJoin(sid_927("colors"));
      let t_1657 = q_1656.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors";
      function fn_1658() {
        return "cross + inner join";
      }
      test_1651.assert(t_1657, fn_1658);
      return;
    } finally {
      test_1651.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_1659 = new Test_684();
    try {
      let t_1660 = sid_927("users");
      let t_1661 = new SqlBuilder();
      t_1661.appendSafe("id = ");
      t_1661.appendInt32(1);
      let t_1662 = t_1661.accumulated;
      const q_1663 = from(t_1660).where(t_1662).lock(new ForUpdate());
      let t_1664 = q_1663.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE";
      function fn_1665() {
        return "for update";
      }
      test_1659.assert(t_1664, fn_1665);
      return;
    } finally {
      test_1659.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_1666 = new Test_684();
    try {
      let t_1667 = sid_927("users");
      let t_1668 = sid_927("name");
      const q_1669 = from(t_1667).select(Object.freeze([t_1668])).lock(new ForShare());
      let t_1670 = q_1669.toSql().toString() === "SELECT name FROM users FOR SHARE";
      function fn_1671() {
        return "for share";
      }
      test_1666.assert(t_1670, fn_1671);
      return;
    } finally {
      test_1666.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_1672 = new Test_684();
    try {
      let t_1673;
      let t_1674;
      let t_1675;
      let t_1676;
      let t_1677;
      let q_1678;
      try {
        t_1673 = sid_927("accounts");
        t_1674 = new SqlBuilder();
        t_1674.appendSafe("id = ");
        t_1674.appendInt32(42);
        t_1675 = t_1674.accumulated;
        t_1677 = from(t_1673).where(t_1675).limit(1);
        t_1676 = t_1677.lock(new ForUpdate());
        q_1678 = t_1676;
      } catch {
        q_1678 = panic_681();
      }
      let t_1679 = q_1678.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE";
      function fn_1680() {
        return "lock full query";
      }
      test_1672.assert(t_1679, fn_1680);
      return;
    } finally {
      test_1672.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1681 = new Test_684();
    try {
      let t_1682;
      let id_1683;
      try {
        t_1682 = safeIdentifier("user_name");
        id_1683 = t_1682;
      } catch {
        id_1683 = panic_681();
      }
      let t_1684 = id_1683.sqlValue === "user_name";
      function fn_1685() {
        return "value should round-trip";
      }
      test_1681.assert(t_1684, fn_1685);
      return;
    } finally {
      test_1681.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1686 = new Test_684();
    try {
      let didBubble_1687;
      try {
        safeIdentifier("");
        didBubble_1687 = false;
      } catch {
        didBubble_1687 = true;
      }
      function fn_1688() {
        return "empty string should bubble";
      }
      test_1686.assert(didBubble_1687, fn_1688);
      return;
    } finally {
      test_1686.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1689 = new Test_684();
    try {
      let didBubble_1690;
      try {
        safeIdentifier("1col");
        didBubble_1690 = false;
      } catch {
        didBubble_1690 = true;
      }
      function fn_1691() {
        return "leading digit should bubble";
      }
      test_1689.assert(didBubble_1690, fn_1691);
      return;
    } finally {
      test_1689.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1692 = new Test_684();
    try {
      const cases_1693 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_1694(c_1695) {
        let didBubble_1696;
        try {
          safeIdentifier(c_1695);
          didBubble_1696 = false;
        } catch {
          didBubble_1696 = true;
        }
        function fn_1697() {
          return "should reject: " + c_1695;
        }
        test_1692.assert(didBubble_1696, fn_1697);
        return;
      }
      cases_1693.forEach(fn_1694);
      return;
    } finally {
      test_1692.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1698 = new Test_684();
    try {
      let t_1699;
      let t_1700;
      let t_1701;
      let t_1702;
      let t_1703;
      let t_1704;
      let t_1705;
      try {
        t_1699 = safeIdentifier("users");
        t_1700 = t_1699;
      } catch {
        t_1700 = panic_681();
      }
      try {
        t_1701 = safeIdentifier("name");
        t_1702 = t_1701;
      } catch {
        t_1702 = panic_681();
      }
      let t_1706 = new StringField();
      let t_1707 = new FieldDef(t_1702, t_1706, false);
      try {
        t_1703 = safeIdentifier("age");
        t_1704 = t_1703;
      } catch {
        t_1704 = panic_681();
      }
      let t_1708 = new IntField();
      let t_1709 = new FieldDef(t_1704, t_1708, false);
      const td_1710 = new TableDef(t_1700, Object.freeze([t_1707, t_1709]));
      let f_1711;
      try {
        t_1705 = td_1710.field("age");
        f_1711 = t_1705;
      } catch {
        f_1711 = panic_681();
      }
      let t_1712 = f_1711.name.sqlValue === "age";
      function fn_1713() {
        return "should find age field";
      }
      test_1698.assert(t_1712, fn_1713);
      return;
    } finally {
      test_1698.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1714 = new Test_684();
    try {
      let t_1715;
      let t_1716;
      let t_1717;
      let t_1718;
      try {
        t_1715 = safeIdentifier("users");
        t_1716 = t_1715;
      } catch {
        t_1716 = panic_681();
      }
      try {
        t_1717 = safeIdentifier("name");
        t_1718 = t_1717;
      } catch {
        t_1718 = panic_681();
      }
      let t_1719 = new StringField();
      let t_1720 = new FieldDef(t_1718, t_1719, false);
      const td_1721 = new TableDef(t_1716, Object.freeze([t_1720]));
      let didBubble_1722;
      try {
        td_1721.field("nonexistent");
        didBubble_1722 = false;
      } catch {
        didBubble_1722 = true;
      }
      function fn_1723() {
        return "unknown field should bubble";
      }
      test_1714.assert(didBubble_1722, fn_1723);
      return;
    } finally {
      test_1714.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1724 = new Test_684();
    try {
      let t_1725;
      let t_1726;
      let t_1727;
      let t_1728;
      try {
        t_1725 = safeIdentifier("email");
        t_1726 = t_1725;
      } catch {
        t_1726 = panic_681();
      }
      let t_1729 = new StringField();
      const required_1730 = new FieldDef(t_1726, t_1729, false);
      try {
        t_1727 = safeIdentifier("bio");
        t_1728 = t_1727;
      } catch {
        t_1728 = panic_681();
      }
      let t_1731 = new StringField();
      const optional_1732 = new FieldDef(t_1728, t_1731, true);
      let t_1733 = ! required_1730.nullable;
      function fn_1734() {
        return "required field should not be nullable";
      }
      test_1724.assert(t_1733, fn_1734);
      let t_1735 = optional_1732.nullable;
      function fn_1736() {
        return "optional field should be nullable";
      }
      test_1724.assert(t_1735, fn_1736);
      return;
    } finally {
      test_1724.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1737 = new Test_684();
    try {
      function build_1738(name_1739) {
        let t_1740 = new SqlBuilder();
        t_1740.appendSafe("select * from hi where name = ");
        t_1740.appendString(name_1739);
        return t_1740.accumulated.toString();
      }
      function buildWrong_1741(name_1742) {
        return "select * from hi where name = '" + name_1742 + "'";
      }
      const actual_1743 = build_1738("world");
      let t_1744 = actual_1743 === "select * from hi where name = 'world'";
      function fn_1745() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_1743 + ")";
      }
      test_1737.assert(t_1744, fn_1745);
      const bobbyTables_1746 = "Robert'); drop table hi;--";
      const actual_1747 = build_1738("Robert'); drop table hi;--");
      let t_1748 = actual_1747 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_1749() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_1747 + ")";
      }
      test_1737.assert(t_1748, fn_1749);
      function fn_1750() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1737.assert(true, fn_1750);
      return;
    } finally {
      test_1737.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1751 = new Test_684();
    try {
      let t_1752 = new SqlBuilder();
      t_1752.appendSafe("v = ");
      t_1752.appendString("");
      const actual_1753 = t_1752.accumulated.toString();
      let t_1754 = actual_1753 === "v = ''";
      function fn_1755() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1753 + ")";
      }
      test_1751.assert(t_1754, fn_1755);
      let t_1756 = new SqlBuilder();
      t_1756.appendSafe("v = ");
      t_1756.appendString("a''b");
      const actual_1757 = t_1756.accumulated.toString();
      let t_1758 = actual_1757 === "v = 'a''''b'";
      function fn_1759() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1757 + ")";
      }
      test_1751.assert(t_1758, fn_1759);
      let t_1760 = new SqlBuilder();
      t_1760.appendSafe("v = ");
      t_1760.appendString("Hello 世界");
      const actual_1761 = t_1760.accumulated.toString();
      let t_1762 = actual_1761 === "v = 'Hello 世界'";
      function fn_1763() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1761 + ")";
      }
      test_1751.assert(t_1762, fn_1763);
      let t_1764 = new SqlBuilder();
      t_1764.appendSafe("v = ");
      t_1764.appendString("Line1\nLine2");
      const actual_1765 = t_1764.accumulated.toString();
      let t_1766 = actual_1765 === "v = 'Line1\nLine2'";
      function fn_1767() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1765 + ")";
      }
      test_1751.assert(t_1766, fn_1767);
      return;
    } finally {
      test_1751.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1768 = new Test_684();
    try {
      let t_1769;
      let t_1770 = new SqlBuilder();
      t_1770.appendSafe("select ");
      t_1770.appendInt32(42);
      t_1770.appendSafe(", ");
      t_1770.appendInt64(BigInt("43"));
      t_1770.appendSafe(", ");
      t_1770.appendFloat64(19.99);
      t_1770.appendSafe(", ");
      t_1770.appendBoolean(true);
      t_1770.appendSafe(", ");
      t_1770.appendBoolean(false);
      const actual_1771 = t_1770.accumulated.toString();
      let t_1772 = actual_1771 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_1773() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1771 + ")";
      }
      test_1768.assert(t_1772, fn_1773);
      let date_1774;
      try {
        t_1769 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_1774 = t_1769;
      } catch {
        date_1774 = panic_681();
      }
      let t_1775 = new SqlBuilder();
      t_1775.appendSafe("insert into t values (");
      t_1775.appendDate(date_1774);
      t_1775.appendSafe(")");
      const actual_1776 = t_1775.accumulated.toString();
      let t_1777 = actual_1776 === "insert into t values ('2024-12-25')";
      function fn_1778() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1776 + ")";
      }
      test_1768.assert(t_1777, fn_1778);
      return;
    } finally {
      test_1768.softFailToHard();
    }
});
it("lists", function () {
    const test_1779 = new Test_684();
    try {
      let t_1780;
      let t_1781;
      let t_1782;
      let t_1783;
      let t_1784 = new SqlBuilder();
      t_1784.appendSafe("v IN (");
      t_1784.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_1784.appendSafe(")");
      const actual_1785 = t_1784.accumulated.toString();
      let t_1786 = actual_1785 === "v IN ('a', 'b', 'c''d')";
      function fn_1787() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1785 + ")";
      }
      test_1779.assert(t_1786, fn_1787);
      let t_1788 = new SqlBuilder();
      t_1788.appendSafe("v IN (");
      t_1788.appendInt32List(Object.freeze([1, 2, 3]));
      t_1788.appendSafe(")");
      const actual_1789 = t_1788.accumulated.toString();
      let t_1790 = actual_1789 === "v IN (1, 2, 3)";
      function fn_1791() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1789 + ")";
      }
      test_1779.assert(t_1790, fn_1791);
      let t_1792 = new SqlBuilder();
      t_1792.appendSafe("v IN (");
      t_1792.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_1792.appendSafe(")");
      const actual_1793 = t_1792.accumulated.toString();
      let t_1794 = actual_1793 === "v IN (1, 2)";
      function fn_1795() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1793 + ")";
      }
      test_1779.assert(t_1794, fn_1795);
      let t_1796 = new SqlBuilder();
      t_1796.appendSafe("v IN (");
      t_1796.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1796.appendSafe(")");
      const actual_1797 = t_1796.accumulated.toString();
      let t_1798 = actual_1797 === "v IN (1.0, 2.0)";
      function fn_1799() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1797 + ")";
      }
      test_1779.assert(t_1798, fn_1799);
      let t_1800 = new SqlBuilder();
      t_1800.appendSafe("v IN (");
      t_1800.appendBooleanList(Object.freeze([true, false]));
      t_1800.appendSafe(")");
      const actual_1801 = t_1800.accumulated.toString();
      let t_1802 = actual_1801 === "v IN (TRUE, FALSE)";
      function fn_1803() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1801 + ")";
      }
      test_1779.assert(t_1802, fn_1803);
      try {
        t_1780 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_1781 = t_1780;
      } catch {
        t_1781 = panic_681();
      }
      try {
        t_1782 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_1783 = t_1782;
      } catch {
        t_1783 = panic_681();
      }
      const dates_1804 = Object.freeze([t_1781, t_1783]);
      let t_1805 = new SqlBuilder();
      t_1805.appendSafe("v IN (");
      t_1805.appendDateList(dates_1804);
      t_1805.appendSafe(")");
      const actual_1806 = t_1805.accumulated.toString();
      let t_1807 = actual_1806 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1808() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1806 + ")";
      }
      test_1779.assert(t_1807, fn_1808);
      return;
    } finally {
      test_1779.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1809 = new Test_684();
    try {
      let nan_1810;
      nan_1810 = 0.0 / 0.0;
      let t_1811 = new SqlBuilder();
      t_1811.appendSafe("v = ");
      t_1811.appendFloat64(nan_1810);
      const actual_1812 = t_1811.accumulated.toString();
      let t_1813 = actual_1812 === "v = NULL";
      function fn_1814() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1812 + ")";
      }
      test_1809.assert(t_1813, fn_1814);
      return;
    } finally {
      test_1809.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1815 = new Test_684();
    try {
      let inf_1816;
      inf_1816 = 1.0 / 0.0;
      let t_1817 = new SqlBuilder();
      t_1817.appendSafe("v = ");
      t_1817.appendFloat64(inf_1816);
      const actual_1818 = t_1817.accumulated.toString();
      let t_1819 = actual_1818 === "v = NULL";
      function fn_1820() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1818 + ")";
      }
      test_1815.assert(t_1819, fn_1820);
      return;
    } finally {
      test_1815.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1821 = new Test_684();
    try {
      let ninf_1822;
      ninf_1822 = -1.0 / 0.0;
      let t_1823 = new SqlBuilder();
      t_1823.appendSafe("v = ");
      t_1823.appendFloat64(ninf_1822);
      const actual_1824 = t_1823.accumulated.toString();
      let t_1825 = actual_1824 === "v = NULL";
      function fn_1826() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1824 + ")";
      }
      test_1821.assert(t_1825, fn_1826);
      return;
    } finally {
      test_1821.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1827 = new Test_684();
    try {
      let t_1828 = new SqlBuilder();
      t_1828.appendSafe("v = ");
      t_1828.appendFloat64(3.14);
      const actual_1829 = t_1828.accumulated.toString();
      let t_1830 = actual_1829 === "v = 3.14";
      function fn_1831() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1829 + ")";
      }
      test_1827.assert(t_1830, fn_1831);
      let t_1832 = new SqlBuilder();
      t_1832.appendSafe("v = ");
      t_1832.appendFloat64(0.0);
      const actual_1833 = t_1832.accumulated.toString();
      let t_1834 = actual_1833 === "v = 0.0";
      function fn_1835() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1833 + ")";
      }
      test_1827.assert(t_1834, fn_1835);
      let t_1836 = new SqlBuilder();
      t_1836.appendSafe("v = ");
      t_1836.appendFloat64(-42.5);
      const actual_1837 = t_1836.accumulated.toString();
      let t_1838 = actual_1837 === "v = -42.5";
      function fn_1839() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1837 + ")";
      }
      test_1827.assert(t_1838, fn_1839);
      return;
    } finally {
      test_1827.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1840 = new Test_684();
    try {
      let t_1841;
      let d_1842;
      try {
        t_1841 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1842 = t_1841;
      } catch {
        d_1842 = panic_681();
      }
      let t_1843 = new SqlBuilder();
      t_1843.appendSafe("v = ");
      t_1843.appendDate(d_1842);
      const actual_1844 = t_1843.accumulated.toString();
      let t_1845 = actual_1844 === "v = '2024-06-15'";
      function fn_1846() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1844 + ")";
      }
      test_1840.assert(t_1845, fn_1846);
      return;
    } finally {
      test_1840.softFailToHard();
    }
});
it("nesting", function () {
    const test_1847 = new Test_684();
    try {
      const name_1848 = "Someone";
      let t_1849 = new SqlBuilder();
      t_1849.appendSafe("where p.last_name = ");
      t_1849.appendString("Someone");
      const condition_1850 = t_1849.accumulated;
      let t_1851 = new SqlBuilder();
      t_1851.appendSafe("select p.id from person p ");
      t_1851.appendFragment(condition_1850);
      const actual_1852 = t_1851.accumulated.toString();
      let t_1853 = actual_1852 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1854() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1852 + ")";
      }
      test_1847.assert(t_1853, fn_1854);
      let t_1855 = new SqlBuilder();
      t_1855.appendSafe("select p.id from person p ");
      t_1855.appendPart(condition_1850.toSource());
      const actual_1856 = t_1855.accumulated.toString();
      let t_1857 = actual_1856 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1858() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1856 + ")";
      }
      test_1847.assert(t_1857, fn_1858);
      const parts_1859 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1860 = new SqlBuilder();
      t_1860.appendSafe("select ");
      t_1860.appendPartList(parts_1859);
      const actual_1861 = t_1860.accumulated.toString();
      let t_1862 = actual_1861 === "select 'a''b', 3";
      function fn_1863() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1861 + ")";
      }
      test_1847.assert(t_1862, fn_1863);
      return;
    } finally {
      test_1847.softFailToHard();
    }
});
