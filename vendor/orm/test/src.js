import {
  BoolField, FieldDef, FloatField, IntField, SafeIdentifier, SqlBoolean, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, deleteFrom, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, unionAllSql, unionSql, update
} from "../src.js";
import {
  Test as Test_656
} from "@temperlang/std/testing";
import {
  panic as panic_653, mapConstructor as mapConstructor_634, pairConstructor as pairConstructor_658, listedGet as listedGet_179
} from "@temperlang/core";
/**
 * @param {string} name_650
 * @returns {SafeIdentifier}
 */
function csid_649(name_650) {
  let return_651;
  let t_652;
  try {
    t_652 = safeIdentifier(name_650);
    return_651 = t_652;
  } catch {
    return_651 = panic_653();
  }
  return return_651;
}
/** @returns {TableDef} */
function userTable_654() {
  return new TableDef(csid_649("users"), Object.freeze([new FieldDef(csid_649("name"), new StringField(), false), new FieldDef(csid_649("email"), new StringField(), false), new FieldDef(csid_649("age"), new IntField(), true), new FieldDef(csid_649("score"), new FloatField(), true), new FieldDef(csid_649("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_655 = new Test_656();
    try {
      const params_657 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Alice"), pairConstructor_658("email", "alice@example.com"), pairConstructor_658("admin", "true")]));
      let t_659 = userTable_654();
      let t_660 = csid_649("name");
      let t_661 = csid_649("email");
      const cs_662 = changeset(t_659, params_657).cast(Object.freeze([t_660, t_661]));
      let t_663 = cs_662.changes.has("name");
      function fn_664() {
        return "name should be in changes";
      }
      test_655.assert(t_663, fn_664);
      let t_665 = cs_662.changes.has("email");
      function fn_666() {
        return "email should be in changes";
      }
      test_655.assert(t_665, fn_666);
      let t_667 = ! cs_662.changes.has("admin");
      function fn_668() {
        return "admin must be dropped (not in whitelist)";
      }
      test_655.assert(t_667, fn_668);
      let t_669 = cs_662.isValid;
      function fn_670() {
        return "should still be valid";
      }
      test_655.assert(t_669, fn_670);
      return;
    } finally {
      test_655.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_671 = new Test_656();
    try {
      const params_672 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Alice"), pairConstructor_658("email", "alice@example.com")]));
      let t_673 = userTable_654();
      let t_674 = csid_649("name");
      const cs_675 = changeset(t_673, params_672).cast(Object.freeze([t_674])).cast(Object.freeze([csid_649("email")]));
      let t_676 = ! cs_675.changes.has("name");
      function fn_677() {
        return "name must be excluded by second cast";
      }
      test_671.assert(t_676, fn_677);
      let t_678 = cs_675.changes.has("email");
      function fn_679() {
        return "email should be present";
      }
      test_671.assert(t_678, fn_679);
      return;
    } finally {
      test_671.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_680 = new Test_656();
    try {
      const params_681 = mapConstructor_634(Object.freeze([pairConstructor_658("name", ""), pairConstructor_658("email", "bob@example.com")]));
      let t_682 = userTable_654();
      let t_683 = csid_649("name");
      let t_684 = csid_649("email");
      const cs_685 = changeset(t_682, params_681).cast(Object.freeze([t_683, t_684]));
      let t_686 = ! cs_685.changes.has("name");
      function fn_687() {
        return "empty name should not be in changes";
      }
      test_680.assert(t_686, fn_687);
      let t_688 = cs_685.changes.has("email");
      function fn_689() {
        return "email should be in changes";
      }
      test_680.assert(t_688, fn_689);
      return;
    } finally {
      test_680.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_690 = new Test_656();
    try {
      const params_691 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Alice")]));
      let t_692 = userTable_654();
      let t_693 = csid_649("name");
      const cs_694 = changeset(t_692, params_691).cast(Object.freeze([t_693])).validateRequired(Object.freeze([csid_649("name")]));
      let t_695 = cs_694.isValid;
      function fn_696() {
        return "should be valid";
      }
      test_690.assert(t_695, fn_696);
      let t_697 = cs_694.errors.length === 0;
      function fn_698() {
        return "no errors expected";
      }
      test_690.assert(t_697, fn_698);
      return;
    } finally {
      test_690.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_699 = new Test_656();
    try {
      const params_700 = mapConstructor_634(Object.freeze([]));
      let t_701 = userTable_654();
      let t_702 = csid_649("name");
      const cs_703 = changeset(t_701, params_700).cast(Object.freeze([t_702])).validateRequired(Object.freeze([csid_649("name")]));
      let t_704 = ! cs_703.isValid;
      function fn_705() {
        return "should be invalid";
      }
      test_699.assert(t_704, fn_705);
      let t_706 = cs_703.errors.length === 1;
      function fn_707() {
        return "should have one error";
      }
      test_699.assert(t_706, fn_707);
      let t_708 = listedGet_179(cs_703.errors, 0).field === "name";
      function fn_709() {
        return "error should name the field";
      }
      test_699.assert(t_708, fn_709);
      return;
    } finally {
      test_699.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_710 = new Test_656();
    try {
      const params_711 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Alice")]));
      let t_712 = userTable_654();
      let t_713 = csid_649("name");
      const cs_714 = changeset(t_712, params_711).cast(Object.freeze([t_713])).validateLength(csid_649("name"), 2, 50);
      let t_715 = cs_714.isValid;
      function fn_716() {
        return "should be valid";
      }
      test_710.assert(t_715, fn_716);
      return;
    } finally {
      test_710.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_717 = new Test_656();
    try {
      const params_718 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "A")]));
      let t_719 = userTable_654();
      let t_720 = csid_649("name");
      const cs_721 = changeset(t_719, params_718).cast(Object.freeze([t_720])).validateLength(csid_649("name"), 2, 50);
      let t_722 = ! cs_721.isValid;
      function fn_723() {
        return "should be invalid";
      }
      test_717.assert(t_722, fn_723);
      return;
    } finally {
      test_717.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_724 = new Test_656();
    try {
      const params_725 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_726 = userTable_654();
      let t_727 = csid_649("name");
      const cs_728 = changeset(t_726, params_725).cast(Object.freeze([t_727])).validateLength(csid_649("name"), 2, 10);
      let t_729 = ! cs_728.isValid;
      function fn_730() {
        return "should be invalid";
      }
      test_724.assert(t_729, fn_730);
      return;
    } finally {
      test_724.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_731 = new Test_656();
    try {
      const params_732 = mapConstructor_634(Object.freeze([pairConstructor_658("age", "30")]));
      let t_733 = userTable_654();
      let t_734 = csid_649("age");
      const cs_735 = changeset(t_733, params_732).cast(Object.freeze([t_734])).validateInt(csid_649("age"));
      let t_736 = cs_735.isValid;
      function fn_737() {
        return "should be valid";
      }
      test_731.assert(t_736, fn_737);
      return;
    } finally {
      test_731.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_738 = new Test_656();
    try {
      const params_739 = mapConstructor_634(Object.freeze([pairConstructor_658("age", "not-a-number")]));
      let t_740 = userTable_654();
      let t_741 = csid_649("age");
      const cs_742 = changeset(t_740, params_739).cast(Object.freeze([t_741])).validateInt(csid_649("age"));
      let t_743 = ! cs_742.isValid;
      function fn_744() {
        return "should be invalid";
      }
      test_738.assert(t_743, fn_744);
      return;
    } finally {
      test_738.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_745 = new Test_656();
    try {
      const params_746 = mapConstructor_634(Object.freeze([pairConstructor_658("score", "9.5")]));
      let t_747 = userTable_654();
      let t_748 = csid_649("score");
      const cs_749 = changeset(t_747, params_746).cast(Object.freeze([t_748])).validateFloat(csid_649("score"));
      let t_750 = cs_749.isValid;
      function fn_751() {
        return "should be valid";
      }
      test_745.assert(t_750, fn_751);
      return;
    } finally {
      test_745.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_752 = new Test_656();
    try {
      const params_753 = mapConstructor_634(Object.freeze([pairConstructor_658("age", "9999999999")]));
      let t_754 = userTable_654();
      let t_755 = csid_649("age");
      const cs_756 = changeset(t_754, params_753).cast(Object.freeze([t_755])).validateInt64(csid_649("age"));
      let t_757 = cs_756.isValid;
      function fn_758() {
        return "should be valid";
      }
      test_752.assert(t_757, fn_758);
      return;
    } finally {
      test_752.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_759 = new Test_656();
    try {
      const params_760 = mapConstructor_634(Object.freeze([pairConstructor_658("age", "not-a-number")]));
      let t_761 = userTable_654();
      let t_762 = csid_649("age");
      const cs_763 = changeset(t_761, params_760).cast(Object.freeze([t_762])).validateInt64(csid_649("age"));
      let t_764 = ! cs_763.isValid;
      function fn_765() {
        return "should be invalid";
      }
      test_759.assert(t_764, fn_765);
      return;
    } finally {
      test_759.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_766 = new Test_656();
    try {
      function fn_767(v_768) {
        const params_769 = mapConstructor_634(Object.freeze([pairConstructor_658("active", v_768)]));
        let t_770 = userTable_654();
        let t_771 = csid_649("active");
        const cs_772 = changeset(t_770, params_769).cast(Object.freeze([t_771])).validateBool(csid_649("active"));
        let t_773 = cs_772.isValid;
        function fn_774() {
          return "should accept: " + v_768;
        }
        test_766.assert(t_773, fn_774);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_767);
      return;
    } finally {
      test_766.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_775 = new Test_656();
    try {
      function fn_776(v_777) {
        const params_778 = mapConstructor_634(Object.freeze([pairConstructor_658("active", v_777)]));
        let t_779 = userTable_654();
        let t_780 = csid_649("active");
        const cs_781 = changeset(t_779, params_778).cast(Object.freeze([t_780])).validateBool(csid_649("active"));
        let t_782 = cs_781.isValid;
        function fn_783() {
          return "should accept: " + v_777;
        }
        test_775.assert(t_782, fn_783);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_776);
      return;
    } finally {
      test_775.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_784 = new Test_656();
    try {
      function fn_785(v_786) {
        const params_787 = mapConstructor_634(Object.freeze([pairConstructor_658("active", v_786)]));
        let t_788 = userTable_654();
        let t_789 = csid_649("active");
        const cs_790 = changeset(t_788, params_787).cast(Object.freeze([t_789])).validateBool(csid_649("active"));
        let t_791 = ! cs_790.isValid;
        function fn_792() {
          return "should reject ambiguous: " + v_786;
        }
        test_784.assert(t_791, fn_792);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_785);
      return;
    } finally {
      test_784.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_793 = new Test_656();
    try {
      let t_794;
      const params_795 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Robert'); DROP TABLE users;--"), pairConstructor_658("email", "bobby@evil.com")]));
      let t_796 = userTable_654();
      let t_797 = csid_649("name");
      let t_798 = csid_649("email");
      const cs_799 = changeset(t_796, params_795).cast(Object.freeze([t_797, t_798])).validateRequired(Object.freeze([csid_649("name"), csid_649("email")]));
      let sqlFrag_800;
      try {
        t_794 = cs_799.toInsertSql();
        sqlFrag_800 = t_794;
      } catch {
        sqlFrag_800 = panic_653();
      }
      const s_801 = sqlFrag_800.toString();
      let t_802 = s_801.indexOf("''") >= 0;
      function fn_803() {
        return "single quote must be doubled: " + s_801;
      }
      test_793.assert(t_802, fn_803);
      return;
    } finally {
      test_793.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_804 = new Test_656();
    try {
      let t_805;
      const params_806 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Alice"), pairConstructor_658("email", "a@example.com")]));
      let t_807 = userTable_654();
      let t_808 = csid_649("name");
      let t_809 = csid_649("email");
      const cs_810 = changeset(t_807, params_806).cast(Object.freeze([t_808, t_809])).validateRequired(Object.freeze([csid_649("name"), csid_649("email")]));
      let sqlFrag_811;
      try {
        t_805 = cs_810.toInsertSql();
        sqlFrag_811 = t_805;
      } catch {
        sqlFrag_811 = panic_653();
      }
      const s_812 = sqlFrag_811.toString();
      let t_813 = s_812.indexOf("INSERT INTO users") >= 0;
      function fn_814() {
        return "has INSERT INTO: " + s_812;
      }
      test_804.assert(t_813, fn_814);
      let t_815 = s_812.indexOf("'Alice'") >= 0;
      function fn_816() {
        return "has quoted name: " + s_812;
      }
      test_804.assert(t_815, fn_816);
      return;
    } finally {
      test_804.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_817 = new Test_656();
    try {
      let t_818;
      const params_819 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Bob"), pairConstructor_658("email", "b@example.com"), pairConstructor_658("age", "25")]));
      let t_820 = userTable_654();
      let t_821 = csid_649("name");
      let t_822 = csid_649("email");
      let t_823 = csid_649("age");
      const cs_824 = changeset(t_820, params_819).cast(Object.freeze([t_821, t_822, t_823])).validateRequired(Object.freeze([csid_649("name"), csid_649("email")]));
      let sqlFrag_825;
      try {
        t_818 = cs_824.toInsertSql();
        sqlFrag_825 = t_818;
      } catch {
        sqlFrag_825 = panic_653();
      }
      const s_826 = sqlFrag_825.toString();
      let t_827 = s_826.indexOf("25") >= 0;
      function fn_828() {
        return "age rendered unquoted: " + s_826;
      }
      test_817.assert(t_827, fn_828);
      return;
    } finally {
      test_817.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_829 = new Test_656();
    try {
      const params_830 = mapConstructor_634(Object.freeze([]));
      let t_831 = userTable_654();
      let t_832 = csid_649("name");
      const cs_833 = changeset(t_831, params_830).cast(Object.freeze([t_832])).validateRequired(Object.freeze([csid_649("name")]));
      let didBubble_834;
      try {
        cs_833.toInsertSql();
        didBubble_834 = false;
      } catch {
        didBubble_834 = true;
      }
      function fn_835() {
        return "invalid changeset should bubble";
      }
      test_829.assert(didBubble_834, fn_835);
      return;
    } finally {
      test_829.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_836 = new Test_656();
    try {
      const strictTable_837 = new TableDef(csid_649("posts"), Object.freeze([new FieldDef(csid_649("title"), new StringField(), false), new FieldDef(csid_649("body"), new StringField(), true)]));
      const params_838 = mapConstructor_634(Object.freeze([pairConstructor_658("body", "hello")]));
      let t_839 = csid_649("body");
      const cs_840 = changeset(strictTable_837, params_838).cast(Object.freeze([t_839]));
      let t_841 = cs_840.isValid;
      function fn_842() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_836.assert(t_841, fn_842);
      let didBubble_843;
      try {
        cs_840.toInsertSql();
        didBubble_843 = false;
      } catch {
        didBubble_843 = true;
      }
      function fn_844() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_836.assert(didBubble_843, fn_844);
      return;
    } finally {
      test_836.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_845 = new Test_656();
    try {
      let t_846;
      const params_847 = mapConstructor_634(Object.freeze([pairConstructor_658("name", "Bob")]));
      let t_848 = userTable_654();
      let t_849 = csid_649("name");
      const cs_850 = changeset(t_848, params_847).cast(Object.freeze([t_849])).validateRequired(Object.freeze([csid_649("name")]));
      let sqlFrag_851;
      try {
        t_846 = cs_850.toUpdateSql(42);
        sqlFrag_851 = t_846;
      } catch {
        sqlFrag_851 = panic_653();
      }
      const s_852 = sqlFrag_851.toString();
      let t_853 = s_852 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_854() {
        return "got: " + s_852;
      }
      test_845.assert(t_853, fn_854);
      return;
    } finally {
      test_845.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_855 = new Test_656();
    try {
      const params_856 = mapConstructor_634(Object.freeze([]));
      let t_857 = userTable_654();
      let t_858 = csid_649("name");
      const cs_859 = changeset(t_857, params_856).cast(Object.freeze([t_858])).validateRequired(Object.freeze([csid_649("name")]));
      let didBubble_860;
      try {
        cs_859.toUpdateSql(1);
        didBubble_860 = false;
      } catch {
        didBubble_860 = true;
      }
      function fn_861() {
        return "invalid changeset should bubble";
      }
      test_855.assert(didBubble_860, fn_861);
      return;
    } finally {
      test_855.softFailToHard();
    }
});
/**
 * @param {string} name_900
 * @returns {SafeIdentifier}
 */
function sid_899(name_900) {
  let return_901;
  let t_902;
  try {
    t_902 = safeIdentifier(name_900);
    return_901 = t_902;
  } catch {
    return_901 = panic_653();
  }
  return return_901;
}
it("bare from produces SELECT *", function () {
    const test_903 = new Test_656();
    try {
      const q_904 = from(sid_899("users"));
      let t_905 = q_904.toSql().toString() === "SELECT * FROM users";
      function fn_906() {
        return "bare query";
      }
      test_903.assert(t_905, fn_906);
      return;
    } finally {
      test_903.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_907 = new Test_656();
    try {
      let t_908 = sid_899("users");
      let t_909 = sid_899("id");
      let t_910 = sid_899("name");
      const q_911 = from(t_908).select(Object.freeze([t_909, t_910]));
      let t_912 = q_911.toSql().toString() === "SELECT id, name FROM users";
      function fn_913() {
        return "select columns";
      }
      test_907.assert(t_912, fn_913);
      return;
    } finally {
      test_907.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_914 = new Test_656();
    try {
      let t_915 = sid_899("users");
      let t_916 = new SqlBuilder();
      t_916.appendSafe("age > ");
      t_916.appendInt32(18);
      let t_917 = t_916.accumulated;
      const q_918 = from(t_915).where(t_917);
      let t_919 = q_918.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_920() {
        return "where int";
      }
      test_914.assert(t_919, fn_920);
      return;
    } finally {
      test_914.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_921 = new Test_656();
    try {
      let t_922 = sid_899("users");
      let t_923 = new SqlBuilder();
      t_923.appendSafe("active = ");
      t_923.appendBoolean(true);
      let t_924 = t_923.accumulated;
      const q_925 = from(t_922).where(t_924);
      let t_926 = q_925.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_927() {
        return "where bool";
      }
      test_921.assert(t_926, fn_927);
      return;
    } finally {
      test_921.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_928 = new Test_656();
    try {
      let t_929 = sid_899("users");
      let t_930 = new SqlBuilder();
      t_930.appendSafe("age > ");
      t_930.appendInt32(18);
      let t_931 = t_930.accumulated;
      let t_932 = from(t_929).where(t_931);
      let t_933 = new SqlBuilder();
      t_933.appendSafe("active = ");
      t_933.appendBoolean(true);
      const q_934 = t_932.where(t_933.accumulated);
      let t_935 = q_934.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_936() {
        return "chained where";
      }
      test_928.assert(t_935, fn_936);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_937 = new Test_656();
    try {
      let t_938 = sid_899("users");
      let t_939 = sid_899("name");
      const q_940 = from(t_938).orderBy(t_939, true);
      let t_941 = q_940.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_942() {
        return "order asc";
      }
      test_937.assert(t_941, fn_942);
      return;
    } finally {
      test_937.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_943 = new Test_656();
    try {
      let t_944 = sid_899("users");
      let t_945 = sid_899("created_at");
      const q_946 = from(t_944).orderBy(t_945, false);
      let t_947 = q_946.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_948() {
        return "order desc";
      }
      test_943.assert(t_947, fn_948);
      return;
    } finally {
      test_943.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_949 = new Test_656();
    try {
      let t_950;
      let t_951;
      let q_952;
      try {
        t_950 = from(sid_899("users")).limit(10);
        t_951 = t_950.offset(20);
        q_952 = t_951;
      } catch {
        q_952 = panic_653();
      }
      let t_953 = q_952.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_954() {
        return "limit/offset";
      }
      test_949.assert(t_953, fn_954);
      return;
    } finally {
      test_949.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_955 = new Test_656();
    try {
      let didBubble_956;
      try {
        from(sid_899("users")).limit(-1);
        didBubble_956 = false;
      } catch {
        didBubble_956 = true;
      }
      function fn_957() {
        return "negative limit should bubble";
      }
      test_955.assert(didBubble_956, fn_957);
      return;
    } finally {
      test_955.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_958 = new Test_656();
    try {
      let didBubble_959;
      try {
        from(sid_899("users")).offset(-1);
        didBubble_959 = false;
      } catch {
        didBubble_959 = true;
      }
      function fn_960() {
        return "negative offset should bubble";
      }
      test_958.assert(didBubble_959, fn_960);
      return;
    } finally {
      test_958.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_961 = new Test_656();
    try {
      let t_962;
      let t_963;
      let t_964;
      let t_965;
      let t_966;
      let t_967;
      let t_968;
      let t_969;
      let t_970;
      let t_971;
      const minAge_972 = 21;
      let q_973;
      try {
        t_962 = sid_899("users");
        t_963 = sid_899("id");
        t_964 = sid_899("name");
        t_965 = sid_899("email");
        t_966 = from(t_962).select(Object.freeze([t_963, t_964, t_965]));
        t_967 = new SqlBuilder();
        t_967.appendSafe("age >= ");
        t_967.appendInt32(21);
        t_968 = t_966.where(t_967.accumulated);
        t_969 = new SqlBuilder();
        t_969.appendSafe("active = ");
        t_969.appendBoolean(true);
        t_970 = t_968.where(t_969.accumulated).orderBy(sid_899("name"), true).limit(25);
        t_971 = t_970.offset(0);
        q_973 = t_971;
      } catch {
        q_973 = panic_653();
      }
      let t_974 = q_973.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_975() {
        return "complex query";
      }
      test_961.assert(t_974, fn_975);
      return;
    } finally {
      test_961.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_976 = new Test_656();
    try {
      let t_977;
      let t_978;
      const q_979 = from(sid_899("users"));
      try {
        t_977 = q_979.safeToSql(100);
        t_978 = t_977;
      } catch {
        t_978 = panic_653();
      }
      const s_980 = t_978.toString();
      let t_981 = s_980 === "SELECT * FROM users LIMIT 100";
      function fn_982() {
        return "should have limit: " + s_980;
      }
      test_976.assert(t_981, fn_982);
      return;
    } finally {
      test_976.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_983 = new Test_656();
    try {
      let t_984;
      let t_985;
      let t_986;
      let q_987;
      try {
        t_984 = from(sid_899("users")).limit(5);
        q_987 = t_984;
      } catch {
        q_987 = panic_653();
      }
      try {
        t_985 = q_987.safeToSql(100);
        t_986 = t_985;
      } catch {
        t_986 = panic_653();
      }
      const s_988 = t_986.toString();
      let t_989 = s_988 === "SELECT * FROM users LIMIT 5";
      function fn_990() {
        return "explicit limit preserved: " + s_988;
      }
      test_983.assert(t_989, fn_990);
      return;
    } finally {
      test_983.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_991 = new Test_656();
    try {
      let didBubble_992;
      try {
        from(sid_899("users")).safeToSql(-1);
        didBubble_992 = false;
      } catch {
        didBubble_992 = true;
      }
      function fn_993() {
        return "negative defaultLimit should bubble";
      }
      test_991.assert(didBubble_992, fn_993);
      return;
    } finally {
      test_991.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_994 = new Test_656();
    try {
      const evil_995 = "'; DROP TABLE users; --";
      let t_996 = sid_899("users");
      let t_997 = new SqlBuilder();
      t_997.appendSafe("name = ");
      t_997.appendString("'; DROP TABLE users; --");
      let t_998 = t_997.accumulated;
      const q_999 = from(t_996).where(t_998);
      const s_1000 = q_999.toSql().toString();
      let t_1001 = s_1000.indexOf("''") >= 0;
      function fn_1002() {
        return "quotes must be doubled: " + s_1000;
      }
      test_994.assert(t_1001, fn_1002);
      let t_1003 = s_1000.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1004() {
        return "structure intact: " + s_1000;
      }
      test_994.assert(t_1003, fn_1004);
      return;
    } finally {
      test_994.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1005 = new Test_656();
    try {
      const attack_1006 = "users; DROP TABLE users; --";
      let didBubble_1007;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1007 = false;
      } catch {
        didBubble_1007 = true;
      }
      function fn_1008() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1005.assert(didBubble_1007, fn_1008);
      return;
    } finally {
      test_1005.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1009 = new Test_656();
    try {
      let t_1010 = sid_899("users");
      let t_1011 = sid_899("orders");
      let t_1012 = new SqlBuilder();
      t_1012.appendSafe("users.id = orders.user_id");
      let t_1013 = t_1012.accumulated;
      const q_1014 = from(t_1010).innerJoin(t_1011, t_1013);
      let t_1015 = q_1014.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1016() {
        return "inner join";
      }
      test_1009.assert(t_1015, fn_1016);
      return;
    } finally {
      test_1009.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1017 = new Test_656();
    try {
      let t_1018 = sid_899("users");
      let t_1019 = sid_899("profiles");
      let t_1020 = new SqlBuilder();
      t_1020.appendSafe("users.id = profiles.user_id");
      let t_1021 = t_1020.accumulated;
      const q_1022 = from(t_1018).leftJoin(t_1019, t_1021);
      let t_1023 = q_1022.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1024() {
        return "left join";
      }
      test_1017.assert(t_1023, fn_1024);
      return;
    } finally {
      test_1017.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1025 = new Test_656();
    try {
      let t_1026 = sid_899("orders");
      let t_1027 = sid_899("users");
      let t_1028 = new SqlBuilder();
      t_1028.appendSafe("orders.user_id = users.id");
      let t_1029 = t_1028.accumulated;
      const q_1030 = from(t_1026).rightJoin(t_1027, t_1029);
      let t_1031 = q_1030.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_1032() {
        return "right join";
      }
      test_1025.assert(t_1031, fn_1032);
      return;
    } finally {
      test_1025.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1033 = new Test_656();
    try {
      let t_1034 = sid_899("users");
      let t_1035 = sid_899("orders");
      let t_1036 = new SqlBuilder();
      t_1036.appendSafe("users.id = orders.user_id");
      let t_1037 = t_1036.accumulated;
      const q_1038 = from(t_1034).fullJoin(t_1035, t_1037);
      let t_1039 = q_1038.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_1040() {
        return "full join";
      }
      test_1033.assert(t_1039, fn_1040);
      return;
    } finally {
      test_1033.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1041 = new Test_656();
    try {
      let t_1042 = sid_899("users");
      let t_1043 = sid_899("orders");
      let t_1044 = new SqlBuilder();
      t_1044.appendSafe("users.id = orders.user_id");
      let t_1045 = t_1044.accumulated;
      let t_1046 = from(t_1042).innerJoin(t_1043, t_1045);
      let t_1047 = sid_899("profiles");
      let t_1048 = new SqlBuilder();
      t_1048.appendSafe("users.id = profiles.user_id");
      const q_1049 = t_1046.leftJoin(t_1047, t_1048.accumulated);
      let t_1050 = q_1049.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1051() {
        return "chained joins";
      }
      test_1041.assert(t_1050, fn_1051);
      return;
    } finally {
      test_1041.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1052 = new Test_656();
    try {
      let t_1053;
      let t_1054;
      let t_1055;
      let t_1056;
      let t_1057;
      let t_1058;
      let t_1059;
      let q_1060;
      try {
        t_1053 = sid_899("users");
        t_1054 = sid_899("orders");
        t_1055 = new SqlBuilder();
        t_1055.appendSafe("users.id = orders.user_id");
        t_1056 = t_1055.accumulated;
        t_1057 = from(t_1053).innerJoin(t_1054, t_1056);
        t_1058 = new SqlBuilder();
        t_1058.appendSafe("orders.total > ");
        t_1058.appendInt32(100);
        t_1059 = t_1057.where(t_1058.accumulated).orderBy(sid_899("name"), true).limit(10);
        q_1060 = t_1059;
      } catch {
        q_1060 = panic_653();
      }
      let t_1061 = q_1060.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_1062() {
        return "join with where/order/limit";
      }
      test_1052.assert(t_1061, fn_1062);
      return;
    } finally {
      test_1052.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1063 = new Test_656();
    try {
      const c_1064 = col(sid_899("users"), sid_899("id"));
      let t_1065 = c_1064.toString() === "users.id";
      function fn_1066() {
        return "col helper";
      }
      test_1063.assert(t_1065, fn_1066);
      return;
    } finally {
      test_1063.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1067 = new Test_656();
    try {
      const onCond_1068 = col(sid_899("users"), sid_899("id"));
      const b_1069 = new SqlBuilder();
      b_1069.appendFragment(onCond_1068);
      b_1069.appendSafe(" = ");
      b_1069.appendFragment(col(sid_899("orders"), sid_899("user_id")));
      let t_1070 = sid_899("users");
      let t_1071 = sid_899("orders");
      let t_1072 = b_1069.accumulated;
      const q_1073 = from(t_1070).innerJoin(t_1071, t_1072);
      let t_1074 = q_1073.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1075() {
        return "join with col";
      }
      test_1067.assert(t_1074, fn_1075);
      return;
    } finally {
      test_1067.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1076 = new Test_656();
    try {
      let t_1077 = sid_899("users");
      let t_1078 = new SqlBuilder();
      t_1078.appendSafe("status = ");
      t_1078.appendString("active");
      let t_1079 = t_1078.accumulated;
      const q_1080 = from(t_1077).orWhere(t_1079);
      let t_1081 = q_1080.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1082() {
        return "orWhere basic";
      }
      test_1076.assert(t_1081, fn_1082);
      return;
    } finally {
      test_1076.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1083 = new Test_656();
    try {
      let t_1084 = sid_899("users");
      let t_1085 = new SqlBuilder();
      t_1085.appendSafe("age > ");
      t_1085.appendInt32(18);
      let t_1086 = t_1085.accumulated;
      let t_1087 = from(t_1084).where(t_1086);
      let t_1088 = new SqlBuilder();
      t_1088.appendSafe("vip = ");
      t_1088.appendBoolean(true);
      const q_1089 = t_1087.orWhere(t_1088.accumulated);
      let t_1090 = q_1089.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1091() {
        return "where then orWhere";
      }
      test_1083.assert(t_1090, fn_1091);
      return;
    } finally {
      test_1083.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1092 = new Test_656();
    try {
      let t_1093 = sid_899("users");
      let t_1094 = new SqlBuilder();
      t_1094.appendSafe("active = ");
      t_1094.appendBoolean(true);
      let t_1095 = t_1094.accumulated;
      let t_1096 = from(t_1093).where(t_1095);
      let t_1097 = new SqlBuilder();
      t_1097.appendSafe("role = ");
      t_1097.appendString("admin");
      let t_1098 = t_1096.orWhere(t_1097.accumulated);
      let t_1099 = new SqlBuilder();
      t_1099.appendSafe("role = ");
      t_1099.appendString("moderator");
      const q_1100 = t_1098.orWhere(t_1099.accumulated);
      let t_1101 = q_1100.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1102() {
        return "multiple orWhere";
      }
      test_1092.assert(t_1101, fn_1102);
      return;
    } finally {
      test_1092.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1103 = new Test_656();
    try {
      let t_1104 = sid_899("users");
      let t_1105 = new SqlBuilder();
      t_1105.appendSafe("age > ");
      t_1105.appendInt32(18);
      let t_1106 = t_1105.accumulated;
      let t_1107 = from(t_1104).where(t_1106);
      let t_1108 = new SqlBuilder();
      t_1108.appendSafe("active = ");
      t_1108.appendBoolean(true);
      let t_1109 = t_1107.where(t_1108.accumulated);
      let t_1110 = new SqlBuilder();
      t_1110.appendSafe("vip = ");
      t_1110.appendBoolean(true);
      const q_1111 = t_1109.orWhere(t_1110.accumulated);
      let t_1112 = q_1111.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1113() {
        return "mixed where and orWhere";
      }
      test_1103.assert(t_1112, fn_1113);
      return;
    } finally {
      test_1103.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1114 = new Test_656();
    try {
      let t_1115 = sid_899("users");
      let t_1116 = sid_899("deleted_at");
      const q_1117 = from(t_1115).whereNull(t_1116);
      let t_1118 = q_1117.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1119() {
        return "whereNull";
      }
      test_1114.assert(t_1118, fn_1119);
      return;
    } finally {
      test_1114.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1120 = new Test_656();
    try {
      let t_1121 = sid_899("users");
      let t_1122 = sid_899("email");
      const q_1123 = from(t_1121).whereNotNull(t_1122);
      let t_1124 = q_1123.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1125() {
        return "whereNotNull";
      }
      test_1120.assert(t_1124, fn_1125);
      return;
    } finally {
      test_1120.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1126 = new Test_656();
    try {
      let t_1127 = sid_899("users");
      let t_1128 = new SqlBuilder();
      t_1128.appendSafe("active = ");
      t_1128.appendBoolean(true);
      let t_1129 = t_1128.accumulated;
      const q_1130 = from(t_1127).where(t_1129).whereNull(sid_899("deleted_at"));
      let t_1131 = q_1130.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1132() {
        return "whereNull chained";
      }
      test_1126.assert(t_1131, fn_1132);
      return;
    } finally {
      test_1126.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1133 = new Test_656();
    try {
      let t_1134 = sid_899("users");
      let t_1135 = sid_899("deleted_at");
      let t_1136 = from(t_1134).whereNull(t_1135);
      let t_1137 = new SqlBuilder();
      t_1137.appendSafe("role = ");
      t_1137.appendString("admin");
      const q_1138 = t_1136.orWhere(t_1137.accumulated);
      let t_1139 = q_1138.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1140() {
        return "whereNotNull with orWhere";
      }
      test_1133.assert(t_1139, fn_1140);
      return;
    } finally {
      test_1133.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1141 = new Test_656();
    try {
      let t_1142 = sid_899("users");
      let t_1143 = sid_899("id");
      let t_1144 = new SqlInt32(1);
      let t_1145 = new SqlInt32(2);
      let t_1146 = new SqlInt32(3);
      const q_1147 = from(t_1142).whereIn(t_1143, Object.freeze([t_1144, t_1145, t_1146]));
      let t_1148 = q_1147.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1149() {
        return "whereIn ints";
      }
      test_1141.assert(t_1148, fn_1149);
      return;
    } finally {
      test_1141.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1150 = new Test_656();
    try {
      let t_1151 = sid_899("users");
      let t_1152 = sid_899("name");
      let t_1153 = new SqlString("Alice");
      let t_1154 = new SqlString("Bob's");
      const q_1155 = from(t_1151).whereIn(t_1152, Object.freeze([t_1153, t_1154]));
      let t_1156 = q_1155.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1157() {
        return "whereIn strings";
      }
      test_1150.assert(t_1156, fn_1157);
      return;
    } finally {
      test_1150.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1158 = new Test_656();
    try {
      let t_1159 = sid_899("users");
      let t_1160 = sid_899("id");
      const q_1161 = from(t_1159).whereIn(t_1160, Object.freeze([]));
      let t_1162 = q_1161.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1163() {
        return "whereIn empty";
      }
      test_1158.assert(t_1162, fn_1163);
      return;
    } finally {
      test_1158.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1164 = new Test_656();
    try {
      let t_1165 = sid_899("users");
      let t_1166 = new SqlBuilder();
      t_1166.appendSafe("active = ");
      t_1166.appendBoolean(true);
      let t_1167 = t_1166.accumulated;
      const q_1168 = from(t_1165).where(t_1167).whereIn(sid_899("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1169 = q_1168.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1170() {
        return "whereIn chained";
      }
      test_1164.assert(t_1169, fn_1170);
      return;
    } finally {
      test_1164.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1171 = new Test_656();
    try {
      let t_1172 = sid_899("users");
      let t_1173 = sid_899("id");
      let t_1174 = new SqlInt32(42);
      const q_1175 = from(t_1172).whereIn(t_1173, Object.freeze([t_1174]));
      let t_1176 = q_1175.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1177() {
        return "whereIn single";
      }
      test_1171.assert(t_1176, fn_1177);
      return;
    } finally {
      test_1171.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1178 = new Test_656();
    try {
      let t_1179 = sid_899("users");
      let t_1180 = new SqlBuilder();
      t_1180.appendSafe("active = ");
      t_1180.appendBoolean(true);
      let t_1181 = t_1180.accumulated;
      const q_1182 = from(t_1179).whereNot(t_1181);
      let t_1183 = q_1182.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1184() {
        return "whereNot";
      }
      test_1178.assert(t_1183, fn_1184);
      return;
    } finally {
      test_1178.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1185 = new Test_656();
    try {
      let t_1186 = sid_899("users");
      let t_1187 = new SqlBuilder();
      t_1187.appendSafe("age > ");
      t_1187.appendInt32(18);
      let t_1188 = t_1187.accumulated;
      let t_1189 = from(t_1186).where(t_1188);
      let t_1190 = new SqlBuilder();
      t_1190.appendSafe("banned = ");
      t_1190.appendBoolean(true);
      const q_1191 = t_1189.whereNot(t_1190.accumulated);
      let t_1192 = q_1191.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1193() {
        return "whereNot chained";
      }
      test_1185.assert(t_1192, fn_1193);
      return;
    } finally {
      test_1185.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1194 = new Test_656();
    try {
      let t_1195 = sid_899("users");
      let t_1196 = sid_899("age");
      let t_1197 = new SqlInt32(18);
      let t_1198 = new SqlInt32(65);
      const q_1199 = from(t_1195).whereBetween(t_1196, t_1197, t_1198);
      let t_1200 = q_1199.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1201() {
        return "whereBetween ints";
      }
      test_1194.assert(t_1200, fn_1201);
      return;
    } finally {
      test_1194.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1202 = new Test_656();
    try {
      let t_1203 = sid_899("users");
      let t_1204 = new SqlBuilder();
      t_1204.appendSafe("active = ");
      t_1204.appendBoolean(true);
      let t_1205 = t_1204.accumulated;
      const q_1206 = from(t_1203).where(t_1205).whereBetween(sid_899("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1207 = q_1206.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1208() {
        return "whereBetween chained";
      }
      test_1202.assert(t_1207, fn_1208);
      return;
    } finally {
      test_1202.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1209 = new Test_656();
    try {
      let t_1210 = sid_899("users");
      let t_1211 = sid_899("name");
      const q_1212 = from(t_1210).whereLike(t_1211, "John%");
      let t_1213 = q_1212.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1214() {
        return "whereLike";
      }
      test_1209.assert(t_1213, fn_1214);
      return;
    } finally {
      test_1209.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1215 = new Test_656();
    try {
      let t_1216 = sid_899("users");
      let t_1217 = sid_899("email");
      const q_1218 = from(t_1216).whereILike(t_1217, "%@gmail.com");
      let t_1219 = q_1218.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1220() {
        return "whereILike";
      }
      test_1215.assert(t_1219, fn_1220);
      return;
    } finally {
      test_1215.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1221 = new Test_656();
    try {
      let t_1222 = sid_899("users");
      let t_1223 = sid_899("name");
      const q_1224 = from(t_1222).whereLike(t_1223, "'; DROP TABLE users; --");
      const s_1225 = q_1224.toSql().toString();
      let t_1226 = s_1225.indexOf("''") >= 0;
      function fn_1227() {
        return "like injection escaped: " + s_1225;
      }
      test_1221.assert(t_1226, fn_1227);
      let t_1228 = s_1225.indexOf("LIKE") >= 0;
      function fn_1229() {
        return "like structure intact: " + s_1225;
      }
      test_1221.assert(t_1228, fn_1229);
      return;
    } finally {
      test_1221.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1230 = new Test_656();
    try {
      let t_1231 = sid_899("users");
      let t_1232 = sid_899("name");
      const q_1233 = from(t_1231).whereLike(t_1232, "%son%");
      let t_1234 = q_1233.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1235() {
        return "whereLike wildcard";
      }
      test_1230.assert(t_1234, fn_1235);
      return;
    } finally {
      test_1230.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1236 = new Test_656();
    try {
      const f_1237 = countAll();
      let t_1238 = f_1237.toString() === "COUNT(*)";
      function fn_1239() {
        return "countAll";
      }
      test_1236.assert(t_1238, fn_1239);
      return;
    } finally {
      test_1236.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1240 = new Test_656();
    try {
      const f_1241 = countCol(sid_899("id"));
      let t_1242 = f_1241.toString() === "COUNT(id)";
      function fn_1243() {
        return "countCol";
      }
      test_1240.assert(t_1242, fn_1243);
      return;
    } finally {
      test_1240.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1244 = new Test_656();
    try {
      const f_1245 = sumCol(sid_899("amount"));
      let t_1246 = f_1245.toString() === "SUM(amount)";
      function fn_1247() {
        return "sumCol";
      }
      test_1244.assert(t_1246, fn_1247);
      return;
    } finally {
      test_1244.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1248 = new Test_656();
    try {
      const f_1249 = avgCol(sid_899("price"));
      let t_1250 = f_1249.toString() === "AVG(price)";
      function fn_1251() {
        return "avgCol";
      }
      test_1248.assert(t_1250, fn_1251);
      return;
    } finally {
      test_1248.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1252 = new Test_656();
    try {
      const f_1253 = minCol(sid_899("created_at"));
      let t_1254 = f_1253.toString() === "MIN(created_at)";
      function fn_1255() {
        return "minCol";
      }
      test_1252.assert(t_1254, fn_1255);
      return;
    } finally {
      test_1252.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1256 = new Test_656();
    try {
      const f_1257 = maxCol(sid_899("score"));
      let t_1258 = f_1257.toString() === "MAX(score)";
      function fn_1259() {
        return "maxCol";
      }
      test_1256.assert(t_1258, fn_1259);
      return;
    } finally {
      test_1256.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1260 = new Test_656();
    try {
      let t_1261 = sid_899("orders");
      let t_1262 = countAll();
      const q_1263 = from(t_1261).selectExpr(Object.freeze([t_1262]));
      let t_1264 = q_1263.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1265() {
        return "selectExpr count";
      }
      test_1260.assert(t_1264, fn_1265);
      return;
    } finally {
      test_1260.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1266 = new Test_656();
    try {
      const nameFrag_1267 = col(sid_899("users"), sid_899("name"));
      let t_1268 = sid_899("users");
      let t_1269 = countAll();
      const q_1270 = from(t_1268).selectExpr(Object.freeze([nameFrag_1267, t_1269]));
      let t_1271 = q_1270.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1272() {
        return "selectExpr multi";
      }
      test_1266.assert(t_1271, fn_1272);
      return;
    } finally {
      test_1266.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1273 = new Test_656();
    try {
      let t_1274 = sid_899("users");
      let t_1275 = sid_899("id");
      let t_1276 = sid_899("name");
      const q_1277 = from(t_1274).select(Object.freeze([t_1275, t_1276])).selectExpr(Object.freeze([countAll()]));
      let t_1278 = q_1277.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1279() {
        return "selectExpr overrides select";
      }
      test_1273.assert(t_1278, fn_1279);
      return;
    } finally {
      test_1273.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1280 = new Test_656();
    try {
      let t_1281 = sid_899("orders");
      let t_1282 = col(sid_899("orders"), sid_899("status"));
      let t_1283 = countAll();
      const q_1284 = from(t_1281).selectExpr(Object.freeze([t_1282, t_1283])).groupBy(sid_899("status"));
      let t_1285 = q_1284.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1286() {
        return "groupBy single";
      }
      test_1280.assert(t_1285, fn_1286);
      return;
    } finally {
      test_1280.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1287 = new Test_656();
    try {
      let t_1288 = sid_899("orders");
      let t_1289 = sid_899("status");
      const q_1290 = from(t_1288).groupBy(t_1289).groupBy(sid_899("category"));
      let t_1291 = q_1290.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1292() {
        return "groupBy multiple";
      }
      test_1287.assert(t_1291, fn_1292);
      return;
    } finally {
      test_1287.softFailToHard();
    }
});
it("having basic", function () {
    const test_1293 = new Test_656();
    try {
      let t_1294 = sid_899("orders");
      let t_1295 = col(sid_899("orders"), sid_899("status"));
      let t_1296 = countAll();
      let t_1297 = from(t_1294).selectExpr(Object.freeze([t_1295, t_1296])).groupBy(sid_899("status"));
      let t_1298 = new SqlBuilder();
      t_1298.appendSafe("COUNT(*) > ");
      t_1298.appendInt32(5);
      const q_1299 = t_1297.having(t_1298.accumulated);
      let t_1300 = q_1299.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1301() {
        return "having basic";
      }
      test_1293.assert(t_1300, fn_1301);
      return;
    } finally {
      test_1293.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1302 = new Test_656();
    try {
      let t_1303 = sid_899("orders");
      let t_1304 = sid_899("status");
      let t_1305 = from(t_1303).groupBy(t_1304);
      let t_1306 = new SqlBuilder();
      t_1306.appendSafe("COUNT(*) > ");
      t_1306.appendInt32(5);
      let t_1307 = t_1305.having(t_1306.accumulated);
      let t_1308 = new SqlBuilder();
      t_1308.appendSafe("SUM(total) > ");
      t_1308.appendInt32(1000);
      const q_1309 = t_1307.orHaving(t_1308.accumulated);
      let t_1310 = q_1309.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1311() {
        return "orHaving";
      }
      test_1302.assert(t_1310, fn_1311);
      return;
    } finally {
      test_1302.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1312 = new Test_656();
    try {
      let t_1313 = sid_899("users");
      let t_1314 = sid_899("name");
      const q_1315 = from(t_1313).select(Object.freeze([t_1314])).distinct();
      let t_1316 = q_1315.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1317() {
        return "distinct";
      }
      test_1312.assert(t_1316, fn_1317);
      return;
    } finally {
      test_1312.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1318 = new Test_656();
    try {
      let t_1319 = sid_899("users");
      let t_1320 = sid_899("email");
      let t_1321 = from(t_1319).select(Object.freeze([t_1320]));
      let t_1322 = new SqlBuilder();
      t_1322.appendSafe("active = ");
      t_1322.appendBoolean(true);
      const q_1323 = t_1321.where(t_1322.accumulated).distinct();
      let t_1324 = q_1323.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1325() {
        return "distinct with where";
      }
      test_1318.assert(t_1324, fn_1325);
      return;
    } finally {
      test_1318.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1326 = new Test_656();
    try {
      const q_1327 = from(sid_899("users"));
      let t_1328 = q_1327.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1329() {
        return "countSql bare";
      }
      test_1326.assert(t_1328, fn_1329);
      return;
    } finally {
      test_1326.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1330 = new Test_656();
    try {
      let t_1331 = sid_899("users");
      let t_1332 = new SqlBuilder();
      t_1332.appendSafe("active = ");
      t_1332.appendBoolean(true);
      let t_1333 = t_1332.accumulated;
      const q_1334 = from(t_1331).where(t_1333);
      let t_1335 = q_1334.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1336() {
        return "countSql with where";
      }
      test_1330.assert(t_1335, fn_1336);
      return;
    } finally {
      test_1330.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1337 = new Test_656();
    try {
      let t_1338 = sid_899("users");
      let t_1339 = sid_899("orders");
      let t_1340 = new SqlBuilder();
      t_1340.appendSafe("users.id = orders.user_id");
      let t_1341 = t_1340.accumulated;
      let t_1342 = from(t_1338).innerJoin(t_1339, t_1341);
      let t_1343 = new SqlBuilder();
      t_1343.appendSafe("orders.total > ");
      t_1343.appendInt32(100);
      const q_1344 = t_1342.where(t_1343.accumulated);
      let t_1345 = q_1344.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_1346() {
        return "countSql with join";
      }
      test_1337.assert(t_1345, fn_1346);
      return;
    } finally {
      test_1337.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1347 = new Test_656();
    try {
      let t_1348;
      let t_1349;
      let t_1350;
      let t_1351;
      let t_1352;
      let q_1353;
      try {
        t_1348 = sid_899("users");
        t_1349 = new SqlBuilder();
        t_1349.appendSafe("active = ");
        t_1349.appendBoolean(true);
        t_1350 = t_1349.accumulated;
        t_1351 = from(t_1348).where(t_1350).orderBy(sid_899("name"), true).limit(10);
        t_1352 = t_1351.offset(20);
        q_1353 = t_1352;
      } catch {
        q_1353 = panic_653();
      }
      const s_1354 = q_1353.countSql().toString();
      let t_1355 = s_1354 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1356() {
        return "countSql drops extras: " + s_1354;
      }
      test_1347.assert(t_1355, fn_1356);
      return;
    } finally {
      test_1347.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1357 = new Test_656();
    try {
      let t_1358 = sid_899("orders");
      let t_1359 = col(sid_899("orders"), sid_899("status"));
      let t_1360 = countAll();
      let t_1361 = sumCol(sid_899("total"));
      let t_1362 = from(t_1358).selectExpr(Object.freeze([t_1359, t_1360, t_1361]));
      let t_1363 = sid_899("users");
      let t_1364 = new SqlBuilder();
      t_1364.appendSafe("orders.user_id = users.id");
      let t_1365 = t_1362.innerJoin(t_1363, t_1364.accumulated);
      let t_1366 = new SqlBuilder();
      t_1366.appendSafe("users.active = ");
      t_1366.appendBoolean(true);
      let t_1367 = t_1365.where(t_1366.accumulated).groupBy(sid_899("status"));
      let t_1368 = new SqlBuilder();
      t_1368.appendSafe("COUNT(*) > ");
      t_1368.appendInt32(3);
      const q_1369 = t_1367.having(t_1368.accumulated).orderBy(sid_899("status"), true);
      const expected_1370 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_1371 = q_1369.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1372() {
        return "full aggregation";
      }
      test_1357.assert(t_1371, fn_1372);
      return;
    } finally {
      test_1357.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1373 = new Test_656();
    try {
      let t_1374 = sid_899("users");
      let t_1375 = new SqlBuilder();
      t_1375.appendSafe("role = ");
      t_1375.appendString("admin");
      let t_1376 = t_1375.accumulated;
      const a_1377 = from(t_1374).where(t_1376);
      let t_1378 = sid_899("users");
      let t_1379 = new SqlBuilder();
      t_1379.appendSafe("role = ");
      t_1379.appendString("moderator");
      let t_1380 = t_1379.accumulated;
      const b_1381 = from(t_1378).where(t_1380);
      const s_1382 = unionSql(a_1377, b_1381).toString();
      let t_1383 = s_1382 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_1384() {
        return "unionSql: " + s_1382;
      }
      test_1373.assert(t_1383, fn_1384);
      return;
    } finally {
      test_1373.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1385 = new Test_656();
    try {
      let t_1386 = sid_899("users");
      let t_1387 = sid_899("name");
      const a_1388 = from(t_1386).select(Object.freeze([t_1387]));
      let t_1389 = sid_899("contacts");
      let t_1390 = sid_899("name");
      const b_1391 = from(t_1389).select(Object.freeze([t_1390]));
      const s_1392 = unionAllSql(a_1388, b_1391).toString();
      let t_1393 = s_1392 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_1394() {
        return "unionAllSql: " + s_1392;
      }
      test_1385.assert(t_1393, fn_1394);
      return;
    } finally {
      test_1385.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1395 = new Test_656();
    try {
      let t_1396 = sid_899("users");
      let t_1397 = sid_899("email");
      const a_1398 = from(t_1396).select(Object.freeze([t_1397]));
      let t_1399 = sid_899("subscribers");
      let t_1400 = sid_899("email");
      const b_1401 = from(t_1399).select(Object.freeze([t_1400]));
      const s_1402 = intersectSql(a_1398, b_1401).toString();
      let t_1403 = s_1402 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_1404() {
        return "intersectSql: " + s_1402;
      }
      test_1395.assert(t_1403, fn_1404);
      return;
    } finally {
      test_1395.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1405 = new Test_656();
    try {
      let t_1406 = sid_899("users");
      let t_1407 = sid_899("id");
      const a_1408 = from(t_1406).select(Object.freeze([t_1407]));
      let t_1409 = sid_899("banned");
      let t_1410 = sid_899("id");
      const b_1411 = from(t_1409).select(Object.freeze([t_1410]));
      const s_1412 = exceptSql(a_1408, b_1411).toString();
      let t_1413 = s_1412 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_1414() {
        return "exceptSql: " + s_1412;
      }
      test_1405.assert(t_1413, fn_1414);
      return;
    } finally {
      test_1405.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1415 = new Test_656();
    try {
      let t_1416 = sid_899("orders");
      let t_1417 = sid_899("user_id");
      let t_1418 = from(t_1416).select(Object.freeze([t_1417]));
      let t_1419 = new SqlBuilder();
      t_1419.appendSafe("total > ");
      t_1419.appendInt32(100);
      const inner_1420 = t_1418.where(t_1419.accumulated);
      const s_1421 = subquery(inner_1420, sid_899("big_orders")).toString();
      let t_1422 = s_1421 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_1423() {
        return "subquery: " + s_1421;
      }
      test_1415.assert(t_1422, fn_1423);
      return;
    } finally {
      test_1415.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1424 = new Test_656();
    try {
      let t_1425 = sid_899("orders");
      let t_1426 = new SqlBuilder();
      t_1426.appendSafe("orders.user_id = users.id");
      let t_1427 = t_1426.accumulated;
      const inner_1428 = from(t_1425).where(t_1427);
      const s_1429 = existsSql(inner_1428).toString();
      let t_1430 = s_1429 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1431() {
        return "existsSql: " + s_1429;
      }
      test_1424.assert(t_1430, fn_1431);
      return;
    } finally {
      test_1424.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1432 = new Test_656();
    try {
      let t_1433 = sid_899("orders");
      let t_1434 = sid_899("user_id");
      let t_1435 = from(t_1433).select(Object.freeze([t_1434]));
      let t_1436 = new SqlBuilder();
      t_1436.appendSafe("total > ");
      t_1436.appendInt32(1000);
      const sub_1437 = t_1435.where(t_1436.accumulated);
      let t_1438 = sid_899("users");
      let t_1439 = sid_899("id");
      const q_1440 = from(t_1438).whereInSubquery(t_1439, sub_1437);
      const s_1441 = q_1440.toSql().toString();
      let t_1442 = s_1441 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_1443() {
        return "whereInSubquery: " + s_1441;
      }
      test_1432.assert(t_1442, fn_1443);
      return;
    } finally {
      test_1432.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1444 = new Test_656();
    try {
      let t_1445 = sid_899("users");
      let t_1446 = new SqlBuilder();
      t_1446.appendSafe("age > ");
      t_1446.appendInt32(18);
      let t_1447 = t_1446.accumulated;
      let t_1448 = from(t_1445).where(t_1447);
      let t_1449 = new SqlBuilder();
      t_1449.appendSafe("active = ");
      t_1449.appendBoolean(true);
      const a_1450 = t_1448.where(t_1449.accumulated);
      let t_1451 = sid_899("users");
      let t_1452 = new SqlBuilder();
      t_1452.appendSafe("role = ");
      t_1452.appendString("vip");
      let t_1453 = t_1452.accumulated;
      const b_1454 = from(t_1451).where(t_1453);
      const s_1455 = unionSql(a_1450, b_1454).toString();
      let t_1456 = s_1455 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_1457() {
        return "union with where: " + s_1455;
      }
      test_1444.assert(t_1456, fn_1457);
      return;
    } finally {
      test_1444.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1458 = new Test_656();
    try {
      let t_1459 = sid_899("orders");
      let t_1460 = sid_899("user_id");
      const sub_1461 = from(t_1459).select(Object.freeze([t_1460]));
      let t_1462 = sid_899("users");
      let t_1463 = new SqlBuilder();
      t_1463.appendSafe("active = ");
      t_1463.appendBoolean(true);
      let t_1464 = t_1463.accumulated;
      const q_1465 = from(t_1462).where(t_1464).whereInSubquery(sid_899("id"), sub_1461);
      const s_1466 = q_1465.toSql().toString();
      let t_1467 = s_1466 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_1468() {
        return "whereInSubquery chained: " + s_1466;
      }
      test_1458.assert(t_1467, fn_1468);
      return;
    } finally {
      test_1458.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1469 = new Test_656();
    try {
      let t_1470 = sid_899("orders");
      let t_1471 = new SqlBuilder();
      t_1471.appendSafe("orders.user_id = users.id");
      let t_1472 = t_1471.accumulated;
      const sub_1473 = from(t_1470).where(t_1472);
      let t_1474 = sid_899("users");
      let t_1475 = existsSql(sub_1473);
      const q_1476 = from(t_1474).where(t_1475);
      const s_1477 = q_1476.toSql().toString();
      let t_1478 = s_1477 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1479() {
        return "exists in where: " + s_1477;
      }
      test_1469.assert(t_1478, fn_1479);
      return;
    } finally {
      test_1469.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_1480 = new Test_656();
    try {
      let t_1481;
      let t_1482;
      let t_1483;
      let t_1484;
      let t_1485;
      let t_1486;
      let q_1487;
      try {
        t_1481 = sid_899("users");
        t_1482 = sid_899("name");
        t_1483 = new SqlString("Alice");
        t_1484 = update(t_1481).set(t_1482, t_1483);
        t_1485 = new SqlBuilder();
        t_1485.appendSafe("id = ");
        t_1485.appendInt32(1);
        t_1486 = t_1484.where(t_1485.accumulated).toSql();
        q_1487 = t_1486;
      } catch {
        q_1487 = panic_653();
      }
      let t_1488 = q_1487.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1";
      function fn_1489() {
        return "update basic";
      }
      test_1480.assert(t_1488, fn_1489);
      return;
    } finally {
      test_1480.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_1490 = new Test_656();
    try {
      let t_1491;
      let t_1492;
      let t_1493;
      let t_1494;
      let t_1495;
      let t_1496;
      let q_1497;
      try {
        t_1491 = sid_899("users");
        t_1492 = sid_899("name");
        t_1493 = new SqlString("Bob");
        t_1494 = update(t_1491).set(t_1492, t_1493).set(sid_899("age"), new SqlInt32(30));
        t_1495 = new SqlBuilder();
        t_1495.appendSafe("id = ");
        t_1495.appendInt32(2);
        t_1496 = t_1494.where(t_1495.accumulated).toSql();
        q_1497 = t_1496;
      } catch {
        q_1497 = panic_653();
      }
      let t_1498 = q_1497.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2";
      function fn_1499() {
        return "update multi set";
      }
      test_1490.assert(t_1498, fn_1499);
      return;
    } finally {
      test_1490.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_1500 = new Test_656();
    try {
      let t_1501;
      let t_1502;
      let t_1503;
      let t_1504;
      let t_1505;
      let t_1506;
      let t_1507;
      let t_1508;
      let q_1509;
      try {
        t_1501 = sid_899("users");
        t_1502 = sid_899("active");
        t_1503 = new SqlBoolean(false);
        t_1504 = update(t_1501).set(t_1502, t_1503);
        t_1505 = new SqlBuilder();
        t_1505.appendSafe("age < ");
        t_1505.appendInt32(18);
        t_1506 = t_1504.where(t_1505.accumulated);
        t_1507 = new SqlBuilder();
        t_1507.appendSafe("role = ");
        t_1507.appendString("guest");
        t_1508 = t_1506.where(t_1507.accumulated).toSql();
        q_1509 = t_1508;
      } catch {
        q_1509 = panic_653();
      }
      let t_1510 = q_1509.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'";
      function fn_1511() {
        return "update multi where";
      }
      test_1500.assert(t_1510, fn_1511);
      return;
    } finally {
      test_1500.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_1512 = new Test_656();
    try {
      let t_1513;
      let t_1514;
      let t_1515;
      let t_1516;
      let t_1517;
      let t_1518;
      let t_1519;
      let t_1520;
      let q_1521;
      try {
        t_1513 = sid_899("users");
        t_1514 = sid_899("status");
        t_1515 = new SqlString("banned");
        t_1516 = update(t_1513).set(t_1514, t_1515);
        t_1517 = new SqlBuilder();
        t_1517.appendSafe("spam_count > ");
        t_1517.appendInt32(10);
        t_1518 = t_1516.where(t_1517.accumulated);
        t_1519 = new SqlBuilder();
        t_1519.appendSafe("reported = ");
        t_1519.appendBoolean(true);
        t_1520 = t_1518.orWhere(t_1519.accumulated).toSql();
        q_1521 = t_1520;
      } catch {
        q_1521 = panic_653();
      }
      let t_1522 = q_1521.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE";
      function fn_1523() {
        return "update orWhere";
      }
      test_1512.assert(t_1522, fn_1523);
      return;
    } finally {
      test_1512.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_1524 = new Test_656();
    try {
      let t_1525;
      let t_1526;
      let t_1527;
      let didBubble_1528;
      try {
        t_1525 = sid_899("users");
        t_1526 = sid_899("x");
        t_1527 = new SqlInt32(1);
        update(t_1525).set(t_1526, t_1527).toSql();
        didBubble_1528 = false;
      } catch {
        didBubble_1528 = true;
      }
      function fn_1529() {
        return "update without WHERE should bubble";
      }
      test_1524.assert(didBubble_1528, fn_1529);
      return;
    } finally {
      test_1524.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_1530 = new Test_656();
    try {
      let t_1531;
      let t_1532;
      let t_1533;
      let didBubble_1534;
      try {
        t_1531 = sid_899("users");
        t_1532 = new SqlBuilder();
        t_1532.appendSafe("id = ");
        t_1532.appendInt32(1);
        t_1533 = t_1532.accumulated;
        update(t_1531).where(t_1533).toSql();
        didBubble_1534 = false;
      } catch {
        didBubble_1534 = true;
      }
      function fn_1535() {
        return "update without SET should bubble";
      }
      test_1530.assert(didBubble_1534, fn_1535);
      return;
    } finally {
      test_1530.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_1536 = new Test_656();
    try {
      let t_1537;
      let t_1538;
      let t_1539;
      let t_1540;
      let t_1541;
      let t_1542;
      let t_1543;
      let q_1544;
      try {
        t_1537 = sid_899("users");
        t_1538 = sid_899("active");
        t_1539 = new SqlBoolean(false);
        t_1540 = update(t_1537).set(t_1538, t_1539);
        t_1541 = new SqlBuilder();
        t_1541.appendSafe("last_login < ");
        t_1541.appendString("2024-01-01");
        t_1542 = t_1540.where(t_1541.accumulated).limit(100);
        t_1543 = t_1542.toSql();
        q_1544 = t_1543;
      } catch {
        q_1544 = panic_653();
      }
      let t_1545 = q_1544.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100";
      function fn_1546() {
        return "update limit";
      }
      test_1536.assert(t_1545, fn_1546);
      return;
    } finally {
      test_1536.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_1547 = new Test_656();
    try {
      let t_1548;
      let t_1549;
      let t_1550;
      let t_1551;
      let t_1552;
      let t_1553;
      let q_1554;
      try {
        t_1548 = sid_899("users");
        t_1549 = sid_899("bio");
        t_1550 = new SqlString("It's a test");
        t_1551 = update(t_1548).set(t_1549, t_1550);
        t_1552 = new SqlBuilder();
        t_1552.appendSafe("id = ");
        t_1552.appendInt32(1);
        t_1553 = t_1551.where(t_1552.accumulated).toSql();
        q_1554 = t_1553;
      } catch {
        q_1554 = panic_653();
      }
      let t_1555 = q_1554.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1";
      function fn_1556() {
        return "update escaping";
      }
      test_1547.assert(t_1555, fn_1556);
      return;
    } finally {
      test_1547.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_1557 = new Test_656();
    try {
      let t_1558;
      let t_1559;
      let t_1560;
      let t_1561;
      let q_1562;
      try {
        t_1558 = sid_899("users");
        t_1559 = new SqlBuilder();
        t_1559.appendSafe("id = ");
        t_1559.appendInt32(1);
        t_1560 = t_1559.accumulated;
        t_1561 = deleteFrom(t_1558).where(t_1560).toSql();
        q_1562 = t_1561;
      } catch {
        q_1562 = panic_653();
      }
      let t_1563 = q_1562.toString() === "DELETE FROM users WHERE id = 1";
      function fn_1564() {
        return "delete basic";
      }
      test_1557.assert(t_1563, fn_1564);
      return;
    } finally {
      test_1557.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_1565 = new Test_656();
    try {
      let t_1566;
      let t_1567;
      let t_1568;
      let t_1569;
      let t_1570;
      let t_1571;
      let q_1572;
      try {
        t_1566 = sid_899("logs");
        t_1567 = new SqlBuilder();
        t_1567.appendSafe("created_at < ");
        t_1567.appendString("2024-01-01");
        t_1568 = t_1567.accumulated;
        t_1569 = deleteFrom(t_1566).where(t_1568);
        t_1570 = new SqlBuilder();
        t_1570.appendSafe("level = ");
        t_1570.appendString("debug");
        t_1571 = t_1569.where(t_1570.accumulated).toSql();
        q_1572 = t_1571;
      } catch {
        q_1572 = panic_653();
      }
      let t_1573 = q_1572.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'";
      function fn_1574() {
        return "delete multi where";
      }
      test_1565.assert(t_1573, fn_1574);
      return;
    } finally {
      test_1565.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_1575 = new Test_656();
    try {
      let didBubble_1576;
      try {
        deleteFrom(sid_899("users")).toSql();
        didBubble_1576 = false;
      } catch {
        didBubble_1576 = true;
      }
      function fn_1577() {
        return "delete without WHERE should bubble";
      }
      test_1575.assert(didBubble_1576, fn_1577);
      return;
    } finally {
      test_1575.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_1578 = new Test_656();
    try {
      let t_1579;
      let t_1580;
      let t_1581;
      let t_1582;
      let t_1583;
      let t_1584;
      let q_1585;
      try {
        t_1579 = sid_899("sessions");
        t_1580 = new SqlBuilder();
        t_1580.appendSafe("expired = ");
        t_1580.appendBoolean(true);
        t_1581 = t_1580.accumulated;
        t_1582 = deleteFrom(t_1579).where(t_1581);
        t_1583 = new SqlBuilder();
        t_1583.appendSafe("created_at < ");
        t_1583.appendString("2023-01-01");
        t_1584 = t_1582.orWhere(t_1583.accumulated).toSql();
        q_1585 = t_1584;
      } catch {
        q_1585 = panic_653();
      }
      let t_1586 = q_1585.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'";
      function fn_1587() {
        return "delete orWhere";
      }
      test_1578.assert(t_1586, fn_1587);
      return;
    } finally {
      test_1578.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_1588 = new Test_656();
    try {
      let t_1589;
      let t_1590;
      let t_1591;
      let t_1592;
      let t_1593;
      let q_1594;
      try {
        t_1589 = sid_899("logs");
        t_1590 = new SqlBuilder();
        t_1590.appendSafe("level = ");
        t_1590.appendString("debug");
        t_1591 = t_1590.accumulated;
        t_1592 = deleteFrom(t_1589).where(t_1591).limit(1000);
        t_1593 = t_1592.toSql();
        q_1594 = t_1593;
      } catch {
        q_1594 = panic_653();
      }
      let t_1595 = q_1594.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000";
      function fn_1596() {
        return "delete limit";
      }
      test_1588.assert(t_1595, fn_1596);
      return;
    } finally {
      test_1588.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_1597 = new Test_656();
    try {
      let t_1598;
      let id_1599;
      try {
        t_1598 = safeIdentifier("user_name");
        id_1599 = t_1598;
      } catch {
        id_1599 = panic_653();
      }
      let t_1600 = id_1599.sqlValue === "user_name";
      function fn_1601() {
        return "value should round-trip";
      }
      test_1597.assert(t_1600, fn_1601);
      return;
    } finally {
      test_1597.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_1602 = new Test_656();
    try {
      let didBubble_1603;
      try {
        safeIdentifier("");
        didBubble_1603 = false;
      } catch {
        didBubble_1603 = true;
      }
      function fn_1604() {
        return "empty string should bubble";
      }
      test_1602.assert(didBubble_1603, fn_1604);
      return;
    } finally {
      test_1602.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_1605 = new Test_656();
    try {
      let didBubble_1606;
      try {
        safeIdentifier("1col");
        didBubble_1606 = false;
      } catch {
        didBubble_1606 = true;
      }
      function fn_1607() {
        return "leading digit should bubble";
      }
      test_1605.assert(didBubble_1606, fn_1607);
      return;
    } finally {
      test_1605.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_1608 = new Test_656();
    try {
      const cases_1609 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_1610(c_1611) {
        let didBubble_1612;
        try {
          safeIdentifier(c_1611);
          didBubble_1612 = false;
        } catch {
          didBubble_1612 = true;
        }
        function fn_1613() {
          return "should reject: " + c_1611;
        }
        test_1608.assert(didBubble_1612, fn_1613);
        return;
      }
      cases_1609.forEach(fn_1610);
      return;
    } finally {
      test_1608.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_1614 = new Test_656();
    try {
      let t_1615;
      let t_1616;
      let t_1617;
      let t_1618;
      let t_1619;
      let t_1620;
      let t_1621;
      try {
        t_1615 = safeIdentifier("users");
        t_1616 = t_1615;
      } catch {
        t_1616 = panic_653();
      }
      try {
        t_1617 = safeIdentifier("name");
        t_1618 = t_1617;
      } catch {
        t_1618 = panic_653();
      }
      let t_1622 = new StringField();
      let t_1623 = new FieldDef(t_1618, t_1622, false);
      try {
        t_1619 = safeIdentifier("age");
        t_1620 = t_1619;
      } catch {
        t_1620 = panic_653();
      }
      let t_1624 = new IntField();
      let t_1625 = new FieldDef(t_1620, t_1624, false);
      const td_1626 = new TableDef(t_1616, Object.freeze([t_1623, t_1625]));
      let f_1627;
      try {
        t_1621 = td_1626.field("age");
        f_1627 = t_1621;
      } catch {
        f_1627 = panic_653();
      }
      let t_1628 = f_1627.name.sqlValue === "age";
      function fn_1629() {
        return "should find age field";
      }
      test_1614.assert(t_1628, fn_1629);
      return;
    } finally {
      test_1614.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_1630 = new Test_656();
    try {
      let t_1631;
      let t_1632;
      let t_1633;
      let t_1634;
      try {
        t_1631 = safeIdentifier("users");
        t_1632 = t_1631;
      } catch {
        t_1632 = panic_653();
      }
      try {
        t_1633 = safeIdentifier("name");
        t_1634 = t_1633;
      } catch {
        t_1634 = panic_653();
      }
      let t_1635 = new StringField();
      let t_1636 = new FieldDef(t_1634, t_1635, false);
      const td_1637 = new TableDef(t_1632, Object.freeze([t_1636]));
      let didBubble_1638;
      try {
        td_1637.field("nonexistent");
        didBubble_1638 = false;
      } catch {
        didBubble_1638 = true;
      }
      function fn_1639() {
        return "unknown field should bubble";
      }
      test_1630.assert(didBubble_1638, fn_1639);
      return;
    } finally {
      test_1630.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_1640 = new Test_656();
    try {
      let t_1641;
      let t_1642;
      let t_1643;
      let t_1644;
      try {
        t_1641 = safeIdentifier("email");
        t_1642 = t_1641;
      } catch {
        t_1642 = panic_653();
      }
      let t_1645 = new StringField();
      const required_1646 = new FieldDef(t_1642, t_1645, false);
      try {
        t_1643 = safeIdentifier("bio");
        t_1644 = t_1643;
      } catch {
        t_1644 = panic_653();
      }
      let t_1647 = new StringField();
      const optional_1648 = new FieldDef(t_1644, t_1647, true);
      let t_1649 = ! required_1646.nullable;
      function fn_1650() {
        return "required field should not be nullable";
      }
      test_1640.assert(t_1649, fn_1650);
      let t_1651 = optional_1648.nullable;
      function fn_1652() {
        return "optional field should be nullable";
      }
      test_1640.assert(t_1651, fn_1652);
      return;
    } finally {
      test_1640.softFailToHard();
    }
});
it("string escaping", function () {
    const test_1653 = new Test_656();
    try {
      function build_1654(name_1655) {
        let t_1656 = new SqlBuilder();
        t_1656.appendSafe("select * from hi where name = ");
        t_1656.appendString(name_1655);
        return t_1656.accumulated.toString();
      }
      function buildWrong_1657(name_1658) {
        return "select * from hi where name = '" + name_1658 + "'";
      }
      const actual_1659 = build_1654("world");
      let t_1660 = actual_1659 === "select * from hi where name = 'world'";
      function fn_1661() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_1659 + ")";
      }
      test_1653.assert(t_1660, fn_1661);
      const bobbyTables_1662 = "Robert'); drop table hi;--";
      const actual_1663 = build_1654("Robert'); drop table hi;--");
      let t_1664 = actual_1663 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_1665() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_1663 + ")";
      }
      test_1653.assert(t_1664, fn_1665);
      function fn_1666() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_1653.assert(true, fn_1666);
      return;
    } finally {
      test_1653.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_1667 = new Test_656();
    try {
      let t_1668 = new SqlBuilder();
      t_1668.appendSafe("v = ");
      t_1668.appendString("");
      const actual_1669 = t_1668.accumulated.toString();
      let t_1670 = actual_1669 === "v = ''";
      function fn_1671() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_1669 + ")";
      }
      test_1667.assert(t_1670, fn_1671);
      let t_1672 = new SqlBuilder();
      t_1672.appendSafe("v = ");
      t_1672.appendString("a''b");
      const actual_1673 = t_1672.accumulated.toString();
      let t_1674 = actual_1673 === "v = 'a''''b'";
      function fn_1675() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_1673 + ")";
      }
      test_1667.assert(t_1674, fn_1675);
      let t_1676 = new SqlBuilder();
      t_1676.appendSafe("v = ");
      t_1676.appendString("Hello 世界");
      const actual_1677 = t_1676.accumulated.toString();
      let t_1678 = actual_1677 === "v = 'Hello 世界'";
      function fn_1679() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_1677 + ")";
      }
      test_1667.assert(t_1678, fn_1679);
      let t_1680 = new SqlBuilder();
      t_1680.appendSafe("v = ");
      t_1680.appendString("Line1\nLine2");
      const actual_1681 = t_1680.accumulated.toString();
      let t_1682 = actual_1681 === "v = 'Line1\nLine2'";
      function fn_1683() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_1681 + ")";
      }
      test_1667.assert(t_1682, fn_1683);
      return;
    } finally {
      test_1667.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_1684 = new Test_656();
    try {
      let t_1685;
      let t_1686 = new SqlBuilder();
      t_1686.appendSafe("select ");
      t_1686.appendInt32(42);
      t_1686.appendSafe(", ");
      t_1686.appendInt64(BigInt("43"));
      t_1686.appendSafe(", ");
      t_1686.appendFloat64(19.99);
      t_1686.appendSafe(", ");
      t_1686.appendBoolean(true);
      t_1686.appendSafe(", ");
      t_1686.appendBoolean(false);
      const actual_1687 = t_1686.accumulated.toString();
      let t_1688 = actual_1687 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_1689() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_1687 + ")";
      }
      test_1684.assert(t_1688, fn_1689);
      let date_1690;
      try {
        t_1685 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_1690 = t_1685;
      } catch {
        date_1690 = panic_653();
      }
      let t_1691 = new SqlBuilder();
      t_1691.appendSafe("insert into t values (");
      t_1691.appendDate(date_1690);
      t_1691.appendSafe(")");
      const actual_1692 = t_1691.accumulated.toString();
      let t_1693 = actual_1692 === "insert into t values ('2024-12-25')";
      function fn_1694() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_1692 + ")";
      }
      test_1684.assert(t_1693, fn_1694);
      return;
    } finally {
      test_1684.softFailToHard();
    }
});
it("lists", function () {
    const test_1695 = new Test_656();
    try {
      let t_1696;
      let t_1697;
      let t_1698;
      let t_1699;
      let t_1700 = new SqlBuilder();
      t_1700.appendSafe("v IN (");
      t_1700.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_1700.appendSafe(")");
      const actual_1701 = t_1700.accumulated.toString();
      let t_1702 = actual_1701 === "v IN ('a', 'b', 'c''d')";
      function fn_1703() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_1701 + ")";
      }
      test_1695.assert(t_1702, fn_1703);
      let t_1704 = new SqlBuilder();
      t_1704.appendSafe("v IN (");
      t_1704.appendInt32List(Object.freeze([1, 2, 3]));
      t_1704.appendSafe(")");
      const actual_1705 = t_1704.accumulated.toString();
      let t_1706 = actual_1705 === "v IN (1, 2, 3)";
      function fn_1707() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_1705 + ")";
      }
      test_1695.assert(t_1706, fn_1707);
      let t_1708 = new SqlBuilder();
      t_1708.appendSafe("v IN (");
      t_1708.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_1708.appendSafe(")");
      const actual_1709 = t_1708.accumulated.toString();
      let t_1710 = actual_1709 === "v IN (1, 2)";
      function fn_1711() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_1709 + ")";
      }
      test_1695.assert(t_1710, fn_1711);
      let t_1712 = new SqlBuilder();
      t_1712.appendSafe("v IN (");
      t_1712.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_1712.appendSafe(")");
      const actual_1713 = t_1712.accumulated.toString();
      let t_1714 = actual_1713 === "v IN (1.0, 2.0)";
      function fn_1715() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_1713 + ")";
      }
      test_1695.assert(t_1714, fn_1715);
      let t_1716 = new SqlBuilder();
      t_1716.appendSafe("v IN (");
      t_1716.appendBooleanList(Object.freeze([true, false]));
      t_1716.appendSafe(")");
      const actual_1717 = t_1716.accumulated.toString();
      let t_1718 = actual_1717 === "v IN (TRUE, FALSE)";
      function fn_1719() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_1717 + ")";
      }
      test_1695.assert(t_1718, fn_1719);
      try {
        t_1696 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_1697 = t_1696;
      } catch {
        t_1697 = panic_653();
      }
      try {
        t_1698 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_1699 = t_1698;
      } catch {
        t_1699 = panic_653();
      }
      const dates_1720 = Object.freeze([t_1697, t_1699]);
      let t_1721 = new SqlBuilder();
      t_1721.appendSafe("v IN (");
      t_1721.appendDateList(dates_1720);
      t_1721.appendSafe(")");
      const actual_1722 = t_1721.accumulated.toString();
      let t_1723 = actual_1722 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_1724() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_1722 + ")";
      }
      test_1695.assert(t_1723, fn_1724);
      return;
    } finally {
      test_1695.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_1725 = new Test_656();
    try {
      let nan_1726;
      nan_1726 = 0.0 / 0.0;
      let t_1727 = new SqlBuilder();
      t_1727.appendSafe("v = ");
      t_1727.appendFloat64(nan_1726);
      const actual_1728 = t_1727.accumulated.toString();
      let t_1729 = actual_1728 === "v = NULL";
      function fn_1730() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_1728 + ")";
      }
      test_1725.assert(t_1729, fn_1730);
      return;
    } finally {
      test_1725.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_1731 = new Test_656();
    try {
      let inf_1732;
      inf_1732 = 1.0 / 0.0;
      let t_1733 = new SqlBuilder();
      t_1733.appendSafe("v = ");
      t_1733.appendFloat64(inf_1732);
      const actual_1734 = t_1733.accumulated.toString();
      let t_1735 = actual_1734 === "v = NULL";
      function fn_1736() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_1734 + ")";
      }
      test_1731.assert(t_1735, fn_1736);
      return;
    } finally {
      test_1731.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_1737 = new Test_656();
    try {
      let ninf_1738;
      ninf_1738 = -1.0 / 0.0;
      let t_1739 = new SqlBuilder();
      t_1739.appendSafe("v = ");
      t_1739.appendFloat64(ninf_1738);
      const actual_1740 = t_1739.accumulated.toString();
      let t_1741 = actual_1740 === "v = NULL";
      function fn_1742() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_1740 + ")";
      }
      test_1737.assert(t_1741, fn_1742);
      return;
    } finally {
      test_1737.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_1743 = new Test_656();
    try {
      let t_1744 = new SqlBuilder();
      t_1744.appendSafe("v = ");
      t_1744.appendFloat64(3.14);
      const actual_1745 = t_1744.accumulated.toString();
      let t_1746 = actual_1745 === "v = 3.14";
      function fn_1747() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_1745 + ")";
      }
      test_1743.assert(t_1746, fn_1747);
      let t_1748 = new SqlBuilder();
      t_1748.appendSafe("v = ");
      t_1748.appendFloat64(0.0);
      const actual_1749 = t_1748.accumulated.toString();
      let t_1750 = actual_1749 === "v = 0.0";
      function fn_1751() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_1749 + ")";
      }
      test_1743.assert(t_1750, fn_1751);
      let t_1752 = new SqlBuilder();
      t_1752.appendSafe("v = ");
      t_1752.appendFloat64(-42.5);
      const actual_1753 = t_1752.accumulated.toString();
      let t_1754 = actual_1753 === "v = -42.5";
      function fn_1755() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_1753 + ")";
      }
      test_1743.assert(t_1754, fn_1755);
      return;
    } finally {
      test_1743.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_1756 = new Test_656();
    try {
      let t_1757;
      let d_1758;
      try {
        t_1757 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_1758 = t_1757;
      } catch {
        d_1758 = panic_653();
      }
      let t_1759 = new SqlBuilder();
      t_1759.appendSafe("v = ");
      t_1759.appendDate(d_1758);
      const actual_1760 = t_1759.accumulated.toString();
      let t_1761 = actual_1760 === "v = '2024-06-15'";
      function fn_1762() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_1760 + ")";
      }
      test_1756.assert(t_1761, fn_1762);
      return;
    } finally {
      test_1756.softFailToHard();
    }
});
it("nesting", function () {
    const test_1763 = new Test_656();
    try {
      const name_1764 = "Someone";
      let t_1765 = new SqlBuilder();
      t_1765.appendSafe("where p.last_name = ");
      t_1765.appendString("Someone");
      const condition_1766 = t_1765.accumulated;
      let t_1767 = new SqlBuilder();
      t_1767.appendSafe("select p.id from person p ");
      t_1767.appendFragment(condition_1766);
      const actual_1768 = t_1767.accumulated.toString();
      let t_1769 = actual_1768 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1770() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1768 + ")";
      }
      test_1763.assert(t_1769, fn_1770);
      let t_1771 = new SqlBuilder();
      t_1771.appendSafe("select p.id from person p ");
      t_1771.appendPart(condition_1766.toSource());
      const actual_1772 = t_1771.accumulated.toString();
      let t_1773 = actual_1772 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_1774() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_1772 + ")";
      }
      test_1763.assert(t_1773, fn_1774);
      const parts_1775 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_1776 = new SqlBuilder();
      t_1776.appendSafe("select ");
      t_1776.appendPartList(parts_1775);
      const actual_1777 = t_1776.accumulated.toString();
      let t_1778 = actual_1777 === "select 'a''b', 3";
      function fn_1779() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_1777 + ")";
      }
      test_1763.assert(t_1778, fn_1779);
      return;
    } finally {
      test_1763.softFailToHard();
    }
});
