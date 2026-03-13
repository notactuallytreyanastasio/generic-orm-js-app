import {
  BoolField, DateField, FieldDef, FloatField, ForShare, ForUpdate, Int64Field, IntField, NullsFirst, NullsLast, NumberValidationOpts, SafeIdentifier, SqlBoolean, SqlBuilder, SqlDefault, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, deleteFrom, deleteSql, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, timestamps, unionAllSql, unionSql, update
} from "../src.js";
import {
  Test as Test_860
} from "@temperlang/std/testing";
import {
  panic as panic_857, mapConstructor as mapConstructor_840, pairConstructor as pairConstructor_862, listedGet as listedGet_183, mappedGetOr as mappedGetOr_101, listBuilderAdd as listBuilderAdd_90, listBuilderToList as listBuilderToList_91
} from "@temperlang/core";
/**
 * @param {string} name_854
 * @returns {SafeIdentifier}
 */
function csid_853(name_854) {
  let return_855;
  let t_856;
  try {
    t_856 = safeIdentifier(name_854);
    return_855 = t_856;
  } catch {
    return_855 = panic_857();
  }
  return return_855;
}
/** @returns {TableDef} */
function userTable_858() {
  return new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("email"), new StringField(), false, null, false), new FieldDef(csid_853("age"), new IntField(), true, null, false), new FieldDef(csid_853("score"), new FloatField(), true, null, false), new FieldDef(csid_853("active"), new BoolField(), true, null, false)]), null);
}
it("cast whitelists allowed fields", function () {
    const test_859 = new Test_860();
    try {
      const params_861 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "alice@example.com"), pairConstructor_862("admin", "true")]));
      let t_863 = userTable_858();
      let t_864 = csid_853("name");
      let t_865 = csid_853("email");
      const cs_866 = changeset(t_863, params_861).cast(Object.freeze([t_864, t_865]));
      let t_867 = cs_866.changes.has("name");
      function fn_868() {
        return "name should be in changes";
      }
      test_859.assert(t_867, fn_868);
      let t_869 = cs_866.changes.has("email");
      function fn_870() {
        return "email should be in changes";
      }
      test_859.assert(t_869, fn_870);
      let t_871 = ! cs_866.changes.has("admin");
      function fn_872() {
        return "admin must be dropped (not in whitelist)";
      }
      test_859.assert(t_871, fn_872);
      let t_873 = cs_866.isValid;
      function fn_874() {
        return "should still be valid";
      }
      test_859.assert(t_873, fn_874);
      return;
    } finally {
      test_859.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_875 = new Test_860();
    try {
      const params_876 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "alice@example.com")]));
      let t_877 = userTable_858();
      let t_878 = csid_853("name");
      const cs_879 = changeset(t_877, params_876).cast(Object.freeze([t_878])).cast(Object.freeze([csid_853("email")]));
      let t_880 = ! cs_879.changes.has("name");
      function fn_881() {
        return "name must be excluded by second cast";
      }
      test_875.assert(t_880, fn_881);
      let t_882 = cs_879.changes.has("email");
      function fn_883() {
        return "email should be present";
      }
      test_875.assert(t_882, fn_883);
      return;
    } finally {
      test_875.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_884 = new Test_860();
    try {
      const params_885 = mapConstructor_840(Object.freeze([pairConstructor_862("name", ""), pairConstructor_862("email", "bob@example.com")]));
      let t_886 = userTable_858();
      let t_887 = csid_853("name");
      let t_888 = csid_853("email");
      const cs_889 = changeset(t_886, params_885).cast(Object.freeze([t_887, t_888]));
      let t_890 = ! cs_889.changes.has("name");
      function fn_891() {
        return "empty name should not be in changes";
      }
      test_884.assert(t_890, fn_891);
      let t_892 = cs_889.changes.has("email");
      function fn_893() {
        return "email should be in changes";
      }
      test_884.assert(t_892, fn_893);
      return;
    } finally {
      test_884.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_894 = new Test_860();
    try {
      const params_895 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_896 = userTable_858();
      let t_897 = csid_853("name");
      const cs_898 = changeset(t_896, params_895).cast(Object.freeze([t_897])).validateRequired(Object.freeze([csid_853("name")]));
      let t_899 = cs_898.isValid;
      function fn_900() {
        return "should be valid";
      }
      test_894.assert(t_899, fn_900);
      let t_901 = cs_898.errors.length === 0;
      function fn_902() {
        return "no errors expected";
      }
      test_894.assert(t_901, fn_902);
      return;
    } finally {
      test_894.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_903 = new Test_860();
    try {
      const params_904 = mapConstructor_840(Object.freeze([]));
      let t_905 = userTable_858();
      let t_906 = csid_853("name");
      const cs_907 = changeset(t_905, params_904).cast(Object.freeze([t_906])).validateRequired(Object.freeze([csid_853("name")]));
      let t_908 = ! cs_907.isValid;
      function fn_909() {
        return "should be invalid";
      }
      test_903.assert(t_908, fn_909);
      let t_910 = cs_907.errors.length === 1;
      function fn_911() {
        return "should have one error";
      }
      test_903.assert(t_910, fn_911);
      let t_912 = listedGet_183(cs_907.errors, 0).field === "name";
      function fn_913() {
        return "error should name the field";
      }
      test_903.assert(t_912, fn_913);
      return;
    } finally {
      test_903.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_914 = new Test_860();
    try {
      const params_915 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_916 = userTable_858();
      let t_917 = csid_853("name");
      const cs_918 = changeset(t_916, params_915).cast(Object.freeze([t_917])).validateLength(csid_853("name"), 2, 50);
      let t_919 = cs_918.isValid;
      function fn_920() {
        return "should be valid";
      }
      test_914.assert(t_919, fn_920);
      return;
    } finally {
      test_914.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_921 = new Test_860();
    try {
      const params_922 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "A")]));
      let t_923 = userTable_858();
      let t_924 = csid_853("name");
      const cs_925 = changeset(t_923, params_922).cast(Object.freeze([t_924])).validateLength(csid_853("name"), 2, 50);
      let t_926 = ! cs_925.isValid;
      function fn_927() {
        return "should be invalid";
      }
      test_921.assert(t_926, fn_927);
      return;
    } finally {
      test_921.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_928 = new Test_860();
    try {
      const params_929 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_930 = userTable_858();
      let t_931 = csid_853("name");
      const cs_932 = changeset(t_930, params_929).cast(Object.freeze([t_931])).validateLength(csid_853("name"), 2, 10);
      let t_933 = ! cs_932.isValid;
      function fn_934() {
        return "should be invalid";
      }
      test_928.assert(t_933, fn_934);
      return;
    } finally {
      test_928.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_935 = new Test_860();
    try {
      const params_936 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "30")]));
      let t_937 = userTable_858();
      let t_938 = csid_853("age");
      const cs_939 = changeset(t_937, params_936).cast(Object.freeze([t_938])).validateInt(csid_853("age"));
      let t_940 = cs_939.isValid;
      function fn_941() {
        return "should be valid";
      }
      test_935.assert(t_940, fn_941);
      return;
    } finally {
      test_935.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_942 = new Test_860();
    try {
      const params_943 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "not-a-number")]));
      let t_944 = userTable_858();
      let t_945 = csid_853("age");
      const cs_946 = changeset(t_944, params_943).cast(Object.freeze([t_945])).validateInt(csid_853("age"));
      let t_947 = ! cs_946.isValid;
      function fn_948() {
        return "should be invalid";
      }
      test_942.assert(t_947, fn_948);
      return;
    } finally {
      test_942.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_949 = new Test_860();
    try {
      const params_950 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "9.5")]));
      let t_951 = userTable_858();
      let t_952 = csid_853("score");
      const cs_953 = changeset(t_951, params_950).cast(Object.freeze([t_952])).validateFloat(csid_853("score"));
      let t_954 = cs_953.isValid;
      function fn_955() {
        return "should be valid";
      }
      test_949.assert(t_954, fn_955);
      return;
    } finally {
      test_949.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_956 = new Test_860();
    try {
      const params_957 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "9999999999")]));
      let t_958 = userTable_858();
      let t_959 = csid_853("age");
      const cs_960 = changeset(t_958, params_957).cast(Object.freeze([t_959])).validateInt64(csid_853("age"));
      let t_961 = cs_960.isValid;
      function fn_962() {
        return "should be valid";
      }
      test_956.assert(t_961, fn_962);
      return;
    } finally {
      test_956.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_963 = new Test_860();
    try {
      const params_964 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "not-a-number")]));
      let t_965 = userTable_858();
      let t_966 = csid_853("age");
      const cs_967 = changeset(t_965, params_964).cast(Object.freeze([t_966])).validateInt64(csid_853("age"));
      let t_968 = ! cs_967.isValid;
      function fn_969() {
        return "should be invalid";
      }
      test_963.assert(t_968, fn_969);
      return;
    } finally {
      test_963.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_970 = new Test_860();
    try {
      function fn_971(v_972) {
        const params_973 = mapConstructor_840(Object.freeze([pairConstructor_862("active", v_972)]));
        let t_974 = userTable_858();
        let t_975 = csid_853("active");
        const cs_976 = changeset(t_974, params_973).cast(Object.freeze([t_975])).validateBool(csid_853("active"));
        let t_977 = cs_976.isValid;
        function fn_978() {
          return "should accept: " + v_972;
        }
        test_970.assert(t_977, fn_978);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_971);
      return;
    } finally {
      test_970.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_979 = new Test_860();
    try {
      function fn_980(v_981) {
        const params_982 = mapConstructor_840(Object.freeze([pairConstructor_862("active", v_981)]));
        let t_983 = userTable_858();
        let t_984 = csid_853("active");
        const cs_985 = changeset(t_983, params_982).cast(Object.freeze([t_984])).validateBool(csid_853("active"));
        let t_986 = cs_985.isValid;
        function fn_987() {
          return "should accept: " + v_981;
        }
        test_979.assert(t_986, fn_987);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_980);
      return;
    } finally {
      test_979.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_988 = new Test_860();
    try {
      function fn_989(v_990) {
        const params_991 = mapConstructor_840(Object.freeze([pairConstructor_862("active", v_990)]));
        let t_992 = userTable_858();
        let t_993 = csid_853("active");
        const cs_994 = changeset(t_992, params_991).cast(Object.freeze([t_993])).validateBool(csid_853("active"));
        let t_995 = ! cs_994.isValid;
        function fn_996() {
          return "should reject ambiguous: " + v_990;
        }
        test_988.assert(t_995, fn_996);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_989);
      return;
    } finally {
      test_988.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_997 = new Test_860();
    try {
      let t_998;
      const params_999 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Robert'); DROP TABLE users;--"), pairConstructor_862("email", "bobby@evil.com")]));
      let t_1000 = userTable_858();
      let t_1001 = csid_853("name");
      let t_1002 = csid_853("email");
      const cs_1003 = changeset(t_1000, params_999).cast(Object.freeze([t_1001, t_1002])).validateRequired(Object.freeze([csid_853("name"), csid_853("email")]));
      let sqlFrag_1004;
      try {
        t_998 = cs_1003.toInsertSql();
        sqlFrag_1004 = t_998;
      } catch {
        sqlFrag_1004 = panic_857();
      }
      const s_1005 = sqlFrag_1004.toString();
      let t_1006 = s_1005.indexOf("''") >= 0;
      function fn_1007() {
        return "single quote must be doubled: " + s_1005;
      }
      test_997.assert(t_1006, fn_1007);
      return;
    } finally {
      test_997.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_1008 = new Test_860();
    try {
      let t_1009;
      const params_1010 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "a@example.com")]));
      let t_1011 = userTable_858();
      let t_1012 = csid_853("name");
      let t_1013 = csid_853("email");
      const cs_1014 = changeset(t_1011, params_1010).cast(Object.freeze([t_1012, t_1013])).validateRequired(Object.freeze([csid_853("name"), csid_853("email")]));
      let sqlFrag_1015;
      try {
        t_1009 = cs_1014.toInsertSql();
        sqlFrag_1015 = t_1009;
      } catch {
        sqlFrag_1015 = panic_857();
      }
      const s_1016 = sqlFrag_1015.toString();
      let t_1017 = s_1016.indexOf("INSERT INTO users") >= 0;
      function fn_1018() {
        return "has INSERT INTO: " + s_1016;
      }
      test_1008.assert(t_1017, fn_1018);
      let t_1019 = s_1016.indexOf("'Alice'") >= 0;
      function fn_1020() {
        return "has quoted name: " + s_1016;
      }
      test_1008.assert(t_1019, fn_1020);
      return;
    } finally {
      test_1008.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_1021 = new Test_860();
    try {
      let t_1022;
      const params_1023 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Bob"), pairConstructor_862("email", "b@example.com"), pairConstructor_862("age", "25")]));
      let t_1024 = userTable_858();
      let t_1025 = csid_853("name");
      let t_1026 = csid_853("email");
      let t_1027 = csid_853("age");
      const cs_1028 = changeset(t_1024, params_1023).cast(Object.freeze([t_1025, t_1026, t_1027])).validateRequired(Object.freeze([csid_853("name"), csid_853("email")]));
      let sqlFrag_1029;
      try {
        t_1022 = cs_1028.toInsertSql();
        sqlFrag_1029 = t_1022;
      } catch {
        sqlFrag_1029 = panic_857();
      }
      const s_1030 = sqlFrag_1029.toString();
      let t_1031 = s_1030.indexOf("25") >= 0;
      function fn_1032() {
        return "age rendered unquoted: " + s_1030;
      }
      test_1021.assert(t_1031, fn_1032);
      return;
    } finally {
      test_1021.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_1033 = new Test_860();
    try {
      const params_1034 = mapConstructor_840(Object.freeze([]));
      let t_1035 = userTable_858();
      let t_1036 = csid_853("name");
      const cs_1037 = changeset(t_1035, params_1034).cast(Object.freeze([t_1036])).validateRequired(Object.freeze([csid_853("name")]));
      let didBubble_1038;
      try {
        cs_1037.toInsertSql();
        didBubble_1038 = false;
      } catch {
        didBubble_1038 = true;
      }
      function fn_1039() {
        return "invalid changeset should bubble";
      }
      test_1033.assert(didBubble_1038, fn_1039);
      return;
    } finally {
      test_1033.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_1040 = new Test_860();
    try {
      const strictTable_1041 = new TableDef(csid_853("posts"), Object.freeze([new FieldDef(csid_853("title"), new StringField(), false, null, false), new FieldDef(csid_853("body"), new StringField(), true, null, false)]), null);
      const params_1042 = mapConstructor_840(Object.freeze([pairConstructor_862("body", "hello")]));
      let t_1043 = csid_853("body");
      const cs_1044 = changeset(strictTable_1041, params_1042).cast(Object.freeze([t_1043]));
      let t_1045 = cs_1044.isValid;
      function fn_1046() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_1040.assert(t_1045, fn_1046);
      let didBubble_1047;
      try {
        cs_1044.toInsertSql();
        didBubble_1047 = false;
      } catch {
        didBubble_1047 = true;
      }
      function fn_1048() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_1040.assert(didBubble_1047, fn_1048);
      return;
    } finally {
      test_1040.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_1049 = new Test_860();
    try {
      let t_1050;
      const params_1051 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Bob")]));
      let t_1052 = userTable_858();
      let t_1053 = csid_853("name");
      const cs_1054 = changeset(t_1052, params_1051).cast(Object.freeze([t_1053])).validateRequired(Object.freeze([csid_853("name")]));
      let sqlFrag_1055;
      try {
        t_1050 = cs_1054.toUpdateSql(42);
        sqlFrag_1055 = t_1050;
      } catch {
        sqlFrag_1055 = panic_857();
      }
      const s_1056 = sqlFrag_1055.toString();
      let t_1057 = s_1056 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_1058() {
        return "got: " + s_1056;
      }
      test_1049.assert(t_1057, fn_1058);
      return;
    } finally {
      test_1049.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_1059 = new Test_860();
    try {
      const params_1060 = mapConstructor_840(Object.freeze([]));
      let t_1061 = userTable_858();
      let t_1062 = csid_853("name");
      const cs_1063 = changeset(t_1061, params_1060).cast(Object.freeze([t_1062])).validateRequired(Object.freeze([csid_853("name")]));
      let didBubble_1064;
      try {
        cs_1063.toUpdateSql(1);
        didBubble_1064 = false;
      } catch {
        didBubble_1064 = true;
      }
      function fn_1065() {
        return "invalid changeset should bubble";
      }
      test_1059.assert(didBubble_1064, fn_1065);
      return;
    } finally {
      test_1059.softFailToHard();
    }
});
it("putChange adds a new field", function () {
    const test_1066 = new Test_860();
    try {
      const params_1067 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1068 = userTable_858();
      let t_1069 = csid_853("name");
      const cs_1070 = changeset(t_1068, params_1067).cast(Object.freeze([t_1069])).putChange(csid_853("email"), "alice@example.com");
      let t_1071 = cs_1070.changes.has("email");
      function fn_1072() {
        return "email should be in changes";
      }
      test_1066.assert(t_1071, fn_1072);
      let t_1073 = mappedGetOr_101(cs_1070.changes, "email", "") === "alice@example.com";
      function fn_1074() {
        return "email value";
      }
      test_1066.assert(t_1073, fn_1074);
      return;
    } finally {
      test_1066.softFailToHard();
    }
});
it("putChange overwrites existing field", function () {
    const test_1075 = new Test_860();
    try {
      const params_1076 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1077 = userTable_858();
      let t_1078 = csid_853("name");
      const cs_1079 = changeset(t_1077, params_1076).cast(Object.freeze([t_1078])).putChange(csid_853("name"), "Bob");
      let t_1080 = mappedGetOr_101(cs_1079.changes, "name", "") === "Bob";
      function fn_1081() {
        return "name should be overwritten";
      }
      test_1075.assert(t_1080, fn_1081);
      return;
    } finally {
      test_1075.softFailToHard();
    }
});
it("putChange value appears in toInsertSql", function () {
    const test_1082 = new Test_860();
    try {
      let t_1083;
      let t_1084;
      const params_1085 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "a@example.com")]));
      let t_1086 = userTable_858();
      let t_1087 = csid_853("name");
      let t_1088 = csid_853("email");
      const cs_1089 = changeset(t_1086, params_1085).cast(Object.freeze([t_1087, t_1088])).putChange(csid_853("name"), "Bob");
      try {
        t_1083 = cs_1089.toInsertSql();
        t_1084 = t_1083;
      } catch {
        t_1084 = panic_857();
      }
      const s_1090 = t_1084.toString();
      let t_1091 = s_1090.indexOf("'Bob'") >= 0;
      function fn_1092() {
        return "should use putChange value: " + s_1090;
      }
      test_1082.assert(t_1091, fn_1092);
      return;
    } finally {
      test_1082.softFailToHard();
    }
});
it("getChange returns value for existing field", function () {
    const test_1093 = new Test_860();
    try {
      let t_1094;
      const params_1095 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1096 = userTable_858();
      let t_1097 = csid_853("name");
      const cs_1098 = changeset(t_1096, params_1095).cast(Object.freeze([t_1097]));
      let val_1099;
      try {
        t_1094 = cs_1098.getChange(csid_853("name"));
        val_1099 = t_1094;
      } catch {
        val_1099 = panic_857();
      }
      let t_1100 = val_1099 === "Alice";
      function fn_1101() {
        return "should return Alice";
      }
      test_1093.assert(t_1100, fn_1101);
      return;
    } finally {
      test_1093.softFailToHard();
    }
});
it("getChange bubbles on missing field", function () {
    const test_1102 = new Test_860();
    try {
      const params_1103 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1104 = userTable_858();
      let t_1105 = csid_853("name");
      const cs_1106 = changeset(t_1104, params_1103).cast(Object.freeze([t_1105]));
      let didBubble_1107;
      try {
        cs_1106.getChange(csid_853("email"));
        didBubble_1107 = false;
      } catch {
        didBubble_1107 = true;
      }
      function fn_1108() {
        return "should bubble for missing field";
      }
      test_1102.assert(didBubble_1107, fn_1108);
      return;
    } finally {
      test_1102.softFailToHard();
    }
});
it("deleteChange removes field", function () {
    const test_1109 = new Test_860();
    try {
      const params_1110 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "a@example.com")]));
      let t_1111 = userTable_858();
      let t_1112 = csid_853("name");
      let t_1113 = csid_853("email");
      const cs_1114 = changeset(t_1111, params_1110).cast(Object.freeze([t_1112, t_1113])).deleteChange(csid_853("email"));
      let t_1115 = ! cs_1114.changes.has("email");
      function fn_1116() {
        return "email should be removed";
      }
      test_1109.assert(t_1115, fn_1116);
      let t_1117 = cs_1114.changes.has("name");
      function fn_1118() {
        return "name should remain";
      }
      test_1109.assert(t_1117, fn_1118);
      return;
    } finally {
      test_1109.softFailToHard();
    }
});
it("deleteChange on nonexistent field is no-op", function () {
    const test_1119 = new Test_860();
    try {
      const params_1120 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1121 = userTable_858();
      let t_1122 = csid_853("name");
      const cs_1123 = changeset(t_1121, params_1120).cast(Object.freeze([t_1122])).deleteChange(csid_853("email"));
      let t_1124 = cs_1123.changes.has("name");
      function fn_1125() {
        return "name should still be present";
      }
      test_1119.assert(t_1124, fn_1125);
      let t_1126 = cs_1123.isValid;
      function fn_1127() {
        return "should still be valid";
      }
      test_1119.assert(t_1126, fn_1127);
      return;
    } finally {
      test_1119.softFailToHard();
    }
});
it("validateInclusion passes when value in list", function () {
    const test_1128 = new Test_860();
    try {
      const params_1129 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "admin")]));
      let t_1130 = userTable_858();
      let t_1131 = csid_853("name");
      const cs_1132 = changeset(t_1130, params_1129).cast(Object.freeze([t_1131])).validateInclusion(csid_853("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1133 = cs_1132.isValid;
      function fn_1134() {
        return "should be valid";
      }
      test_1128.assert(t_1133, fn_1134);
      return;
    } finally {
      test_1128.softFailToHard();
    }
});
it("validateInclusion fails when value not in list", function () {
    const test_1135 = new Test_860();
    try {
      const params_1136 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "hacker")]));
      let t_1137 = userTable_858();
      let t_1138 = csid_853("name");
      const cs_1139 = changeset(t_1137, params_1136).cast(Object.freeze([t_1138])).validateInclusion(csid_853("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1140 = ! cs_1139.isValid;
      function fn_1141() {
        return "should be invalid";
      }
      test_1135.assert(t_1140, fn_1141);
      let t_1142 = listedGet_183(cs_1139.errors, 0).field === "name";
      function fn_1143() {
        return "error on name";
      }
      test_1135.assert(t_1142, fn_1143);
      return;
    } finally {
      test_1135.softFailToHard();
    }
});
it("validateInclusion skips when field not in changes", function () {
    const test_1144 = new Test_860();
    try {
      const params_1145 = mapConstructor_840(Object.freeze([]));
      let t_1146 = userTable_858();
      let t_1147 = csid_853("name");
      const cs_1148 = changeset(t_1146, params_1145).cast(Object.freeze([t_1147])).validateInclusion(csid_853("name"), Object.freeze(["admin", "user"]));
      let t_1149 = cs_1148.isValid;
      function fn_1150() {
        return "should be valid when field absent";
      }
      test_1144.assert(t_1149, fn_1150);
      return;
    } finally {
      test_1144.softFailToHard();
    }
});
it("validateExclusion passes when value not in list", function () {
    const test_1151 = new Test_860();
    try {
      const params_1152 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1153 = userTable_858();
      let t_1154 = csid_853("name");
      const cs_1155 = changeset(t_1153, params_1152).cast(Object.freeze([t_1154])).validateExclusion(csid_853("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1156 = cs_1155.isValid;
      function fn_1157() {
        return "should be valid";
      }
      test_1151.assert(t_1156, fn_1157);
      return;
    } finally {
      test_1151.softFailToHard();
    }
});
it("validateExclusion fails when value in list", function () {
    const test_1158 = new Test_860();
    try {
      const params_1159 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "admin")]));
      let t_1160 = userTable_858();
      let t_1161 = csid_853("name");
      const cs_1162 = changeset(t_1160, params_1159).cast(Object.freeze([t_1161])).validateExclusion(csid_853("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1163 = ! cs_1162.isValid;
      function fn_1164() {
        return "should be invalid";
      }
      test_1158.assert(t_1163, fn_1164);
      let t_1165 = listedGet_183(cs_1162.errors, 0).field === "name";
      function fn_1166() {
        return "error on name";
      }
      test_1158.assert(t_1165, fn_1166);
      return;
    } finally {
      test_1158.softFailToHard();
    }
});
it("validateExclusion skips when field not in changes", function () {
    const test_1167 = new Test_860();
    try {
      const params_1168 = mapConstructor_840(Object.freeze([]));
      let t_1169 = userTable_858();
      let t_1170 = csid_853("name");
      const cs_1171 = changeset(t_1169, params_1168).cast(Object.freeze([t_1170])).validateExclusion(csid_853("name"), Object.freeze(["root", "admin"]));
      let t_1172 = cs_1171.isValid;
      function fn_1173() {
        return "should be valid when field absent";
      }
      test_1167.assert(t_1172, fn_1173);
      return;
    } finally {
      test_1167.softFailToHard();
    }
});
it("validateNumber greaterThan passes", function () {
    const test_1174 = new Test_860();
    try {
      const params_1175 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "25")]));
      let t_1176 = userTable_858();
      let t_1177 = csid_853("age");
      const cs_1178 = changeset(t_1176, params_1175).cast(Object.freeze([t_1177])).validateNumber(csid_853("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1179 = cs_1178.isValid;
      function fn_1180() {
        return "25 > 18 should pass";
      }
      test_1174.assert(t_1179, fn_1180);
      return;
    } finally {
      test_1174.softFailToHard();
    }
});
it("validateNumber greaterThan fails", function () {
    const test_1181 = new Test_860();
    try {
      const params_1182 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "15")]));
      let t_1183 = userTable_858();
      let t_1184 = csid_853("age");
      const cs_1185 = changeset(t_1183, params_1182).cast(Object.freeze([t_1184])).validateNumber(csid_853("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1186 = ! cs_1185.isValid;
      function fn_1187() {
        return "15 > 18 should fail";
      }
      test_1181.assert(t_1186, fn_1187);
      return;
    } finally {
      test_1181.softFailToHard();
    }
});
it("validateNumber lessThan passes", function () {
    const test_1188 = new Test_860();
    try {
      const params_1189 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "8.5")]));
      let t_1190 = userTable_858();
      let t_1191 = csid_853("score");
      const cs_1192 = changeset(t_1190, params_1189).cast(Object.freeze([t_1191])).validateNumber(csid_853("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1193 = cs_1192.isValid;
      function fn_1194() {
        return "8.5 < 10 should pass";
      }
      test_1188.assert(t_1193, fn_1194);
      return;
    } finally {
      test_1188.softFailToHard();
    }
});
it("validateNumber lessThan fails", function () {
    const test_1195 = new Test_860();
    try {
      const params_1196 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "12.0")]));
      let t_1197 = userTable_858();
      let t_1198 = csid_853("score");
      const cs_1199 = changeset(t_1197, params_1196).cast(Object.freeze([t_1198])).validateNumber(csid_853("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1200 = ! cs_1199.isValid;
      function fn_1201() {
        return "12 < 10 should fail";
      }
      test_1195.assert(t_1200, fn_1201);
      return;
    } finally {
      test_1195.softFailToHard();
    }
});
it("validateNumber greaterThanOrEqual boundary", function () {
    const test_1202 = new Test_860();
    try {
      const params_1203 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "18")]));
      let t_1204 = userTable_858();
      let t_1205 = csid_853("age");
      const cs_1206 = changeset(t_1204, params_1203).cast(Object.freeze([t_1205])).validateNumber(csid_853("age"), new NumberValidationOpts(null, null, 18.0, null, null));
      let t_1207 = cs_1206.isValid;
      function fn_1208() {
        return "18 >= 18 should pass";
      }
      test_1202.assert(t_1207, fn_1208);
      return;
    } finally {
      test_1202.softFailToHard();
    }
});
it("validateNumber combined options", function () {
    const test_1209 = new Test_860();
    try {
      const params_1210 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "5.0")]));
      let t_1211 = userTable_858();
      let t_1212 = csid_853("score");
      const cs_1213 = changeset(t_1211, params_1210).cast(Object.freeze([t_1212])).validateNumber(csid_853("score"), new NumberValidationOpts(0.0, 10.0, null, null, null));
      let t_1214 = cs_1213.isValid;
      function fn_1215() {
        return "5 > 0 and < 10 should pass";
      }
      test_1209.assert(t_1214, fn_1215);
      return;
    } finally {
      test_1209.softFailToHard();
    }
});
it("validateNumber non-numeric value", function () {
    const test_1216 = new Test_860();
    try {
      const params_1217 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "abc")]));
      let t_1218 = userTable_858();
      let t_1219 = csid_853("age");
      const cs_1220 = changeset(t_1218, params_1217).cast(Object.freeze([t_1219])).validateNumber(csid_853("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1221 = ! cs_1220.isValid;
      function fn_1222() {
        return "non-numeric should fail";
      }
      test_1216.assert(t_1221, fn_1222);
      let t_1223 = listedGet_183(cs_1220.errors, 0).message === "must be a number";
      function fn_1224() {
        return "correct error message";
      }
      test_1216.assert(t_1223, fn_1224);
      return;
    } finally {
      test_1216.softFailToHard();
    }
});
it("validateNumber skips when field not in changes", function () {
    const test_1225 = new Test_860();
    try {
      const params_1226 = mapConstructor_840(Object.freeze([]));
      let t_1227 = userTable_858();
      let t_1228 = csid_853("age");
      const cs_1229 = changeset(t_1227, params_1226).cast(Object.freeze([t_1228])).validateNumber(csid_853("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1230 = cs_1229.isValid;
      function fn_1231() {
        return "should be valid when field absent";
      }
      test_1225.assert(t_1230, fn_1231);
      return;
    } finally {
      test_1225.softFailToHard();
    }
});
it("validateAcceptance passes for true values", function () {
    const test_1232 = new Test_860();
    try {
      function fn_1233(v_1234) {
        const params_1235 = mapConstructor_840(Object.freeze([pairConstructor_862("active", v_1234)]));
        let t_1236 = userTable_858();
        let t_1237 = csid_853("active");
        const cs_1238 = changeset(t_1236, params_1235).cast(Object.freeze([t_1237])).validateAcceptance(csid_853("active"));
        let t_1239 = cs_1238.isValid;
        function fn_1240() {
          return "should accept: " + v_1234;
        }
        test_1232.assert(t_1239, fn_1240);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_1233);
      return;
    } finally {
      test_1232.softFailToHard();
    }
});
it("validateAcceptance fails for non-true values", function () {
    const test_1241 = new Test_860();
    try {
      const params_1242 = mapConstructor_840(Object.freeze([pairConstructor_862("active", "false")]));
      let t_1243 = userTable_858();
      let t_1244 = csid_853("active");
      const cs_1245 = changeset(t_1243, params_1242).cast(Object.freeze([t_1244])).validateAcceptance(csid_853("active"));
      let t_1246 = ! cs_1245.isValid;
      function fn_1247() {
        return "false should not be accepted";
      }
      test_1241.assert(t_1246, fn_1247);
      let t_1248 = listedGet_183(cs_1245.errors, 0).message === "must be accepted";
      function fn_1249() {
        return "correct message";
      }
      test_1241.assert(t_1248, fn_1249);
      return;
    } finally {
      test_1241.softFailToHard();
    }
});
it("validateConfirmation passes when fields match", function () {
    const test_1250 = new Test_860();
    try {
      const tbl_1251 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("password"), new StringField(), false, null, false), new FieldDef(csid_853("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1252 = mapConstructor_840(Object.freeze([pairConstructor_862("password", "secret123"), pairConstructor_862("password_confirmation", "secret123")]));
      let t_1253 = csid_853("password");
      let t_1254 = csid_853("password_confirmation");
      const cs_1255 = changeset(tbl_1251, params_1252).cast(Object.freeze([t_1253, t_1254])).validateConfirmation(csid_853("password"), csid_853("password_confirmation"));
      let t_1256 = cs_1255.isValid;
      function fn_1257() {
        return "matching fields should pass";
      }
      test_1250.assert(t_1256, fn_1257);
      return;
    } finally {
      test_1250.softFailToHard();
    }
});
it("validateConfirmation fails when fields differ", function () {
    const test_1258 = new Test_860();
    try {
      const tbl_1259 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("password"), new StringField(), false, null, false), new FieldDef(csid_853("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1260 = mapConstructor_840(Object.freeze([pairConstructor_862("password", "secret123"), pairConstructor_862("password_confirmation", "wrong456")]));
      let t_1261 = csid_853("password");
      let t_1262 = csid_853("password_confirmation");
      const cs_1263 = changeset(tbl_1259, params_1260).cast(Object.freeze([t_1261, t_1262])).validateConfirmation(csid_853("password"), csid_853("password_confirmation"));
      let t_1264 = ! cs_1263.isValid;
      function fn_1265() {
        return "mismatched fields should fail";
      }
      test_1258.assert(t_1264, fn_1265);
      let t_1266 = listedGet_183(cs_1263.errors, 0).field === "password_confirmation";
      function fn_1267() {
        return "error on confirmation field";
      }
      test_1258.assert(t_1266, fn_1267);
      return;
    } finally {
      test_1258.softFailToHard();
    }
});
it("validateConfirmation fails when confirmation missing", function () {
    const test_1268 = new Test_860();
    try {
      const tbl_1269 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("password"), new StringField(), false, null, false), new FieldDef(csid_853("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1270 = mapConstructor_840(Object.freeze([pairConstructor_862("password", "secret123")]));
      let t_1271 = csid_853("password");
      const cs_1272 = changeset(tbl_1269, params_1270).cast(Object.freeze([t_1271])).validateConfirmation(csid_853("password"), csid_853("password_confirmation"));
      let t_1273 = ! cs_1272.isValid;
      function fn_1274() {
        return "missing confirmation should fail";
      }
      test_1268.assert(t_1273, fn_1274);
      return;
    } finally {
      test_1268.softFailToHard();
    }
});
it("validateContains passes when substring found", function () {
    const test_1275 = new Test_860();
    try {
      const params_1276 = mapConstructor_840(Object.freeze([pairConstructor_862("email", "alice@example.com")]));
      let t_1277 = userTable_858();
      let t_1278 = csid_853("email");
      const cs_1279 = changeset(t_1277, params_1276).cast(Object.freeze([t_1278])).validateContains(csid_853("email"), "@");
      let t_1280 = cs_1279.isValid;
      function fn_1281() {
        return "should pass when @ present";
      }
      test_1275.assert(t_1280, fn_1281);
      return;
    } finally {
      test_1275.softFailToHard();
    }
});
it("validateContains fails when substring not found", function () {
    const test_1282 = new Test_860();
    try {
      const params_1283 = mapConstructor_840(Object.freeze([pairConstructor_862("email", "alice-example.com")]));
      let t_1284 = userTable_858();
      let t_1285 = csid_853("email");
      const cs_1286 = changeset(t_1284, params_1283).cast(Object.freeze([t_1285])).validateContains(csid_853("email"), "@");
      let t_1287 = ! cs_1286.isValid;
      function fn_1288() {
        return "should fail when @ absent";
      }
      test_1282.assert(t_1287, fn_1288);
      return;
    } finally {
      test_1282.softFailToHard();
    }
});
it("validateContains skips when field not in changes", function () {
    const test_1289 = new Test_860();
    try {
      const params_1290 = mapConstructor_840(Object.freeze([]));
      let t_1291 = userTable_858();
      let t_1292 = csid_853("email");
      const cs_1293 = changeset(t_1291, params_1290).cast(Object.freeze([t_1292])).validateContains(csid_853("email"), "@");
      let t_1294 = cs_1293.isValid;
      function fn_1295() {
        return "should be valid when field absent";
      }
      test_1289.assert(t_1294, fn_1295);
      return;
    } finally {
      test_1289.softFailToHard();
    }
});
it("validateStartsWith passes", function () {
    const test_1296 = new Test_860();
    try {
      const params_1297 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Dr. Smith")]));
      let t_1298 = userTable_858();
      let t_1299 = csid_853("name");
      const cs_1300 = changeset(t_1298, params_1297).cast(Object.freeze([t_1299])).validateStartsWith(csid_853("name"), "Dr.");
      let t_1301 = cs_1300.isValid;
      function fn_1302() {
        return "should pass for Dr. prefix";
      }
      test_1296.assert(t_1301, fn_1302);
      return;
    } finally {
      test_1296.softFailToHard();
    }
});
it("validateStartsWith fails", function () {
    const test_1303 = new Test_860();
    try {
      const params_1304 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Mr. Smith")]));
      let t_1305 = userTable_858();
      let t_1306 = csid_853("name");
      const cs_1307 = changeset(t_1305, params_1304).cast(Object.freeze([t_1306])).validateStartsWith(csid_853("name"), "Dr.");
      let t_1308 = ! cs_1307.isValid;
      function fn_1309() {
        return "should fail for Mr. prefix";
      }
      test_1303.assert(t_1308, fn_1309);
      return;
    } finally {
      test_1303.softFailToHard();
    }
});
it("validateEndsWith passes", function () {
    const test_1310 = new Test_860();
    try {
      const params_1311 = mapConstructor_840(Object.freeze([pairConstructor_862("email", "alice@example.com")]));
      let t_1312 = userTable_858();
      let t_1313 = csid_853("email");
      const cs_1314 = changeset(t_1312, params_1311).cast(Object.freeze([t_1313])).validateEndsWith(csid_853("email"), ".com");
      let t_1315 = cs_1314.isValid;
      function fn_1316() {
        return "should pass for .com suffix";
      }
      test_1310.assert(t_1315, fn_1316);
      return;
    } finally {
      test_1310.softFailToHard();
    }
});
it("validateEndsWith fails", function () {
    const test_1317 = new Test_860();
    try {
      const params_1318 = mapConstructor_840(Object.freeze([pairConstructor_862("email", "alice@example.org")]));
      let t_1319 = userTable_858();
      let t_1320 = csid_853("email");
      const cs_1321 = changeset(t_1319, params_1318).cast(Object.freeze([t_1320])).validateEndsWith(csid_853("email"), ".com");
      let t_1322 = ! cs_1321.isValid;
      function fn_1323() {
        return "should fail for .org when expecting .com";
      }
      test_1317.assert(t_1322, fn_1323);
      return;
    } finally {
      test_1317.softFailToHard();
    }
});
it("validateEndsWith handles repeated suffix correctly", function () {
    const test_1324 = new Test_860();
    try {
      const params_1325 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "abcabc")]));
      let t_1326 = userTable_858();
      let t_1327 = csid_853("name");
      const cs_1328 = changeset(t_1326, params_1325).cast(Object.freeze([t_1327])).validateEndsWith(csid_853("name"), "abc");
      let t_1329 = cs_1328.isValid;
      function fn_1330() {
        return "abcabc should end with abc";
      }
      test_1324.assert(t_1329, fn_1330);
      return;
    } finally {
      test_1324.softFailToHard();
    }
});
it("toInsertSql uses default value when field not in changes", function () {
    const test_1331 = new Test_860();
    try {
      let t_1332;
      let t_1333;
      const tbl_1334 = new TableDef(csid_853("posts"), Object.freeze([new FieldDef(csid_853("title"), new StringField(), false, null, false), new FieldDef(csid_853("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1335 = mapConstructor_840(Object.freeze([pairConstructor_862("title", "Hello")]));
      let t_1336 = csid_853("title");
      const cs_1337 = changeset(tbl_1334, params_1335).cast(Object.freeze([t_1336]));
      try {
        t_1332 = cs_1337.toInsertSql();
        t_1333 = t_1332;
      } catch {
        t_1333 = panic_857();
      }
      const s_1338 = t_1333.toString();
      let t_1339 = s_1338.indexOf("INSERT INTO posts") >= 0;
      function fn_1340() {
        return "has INSERT INTO: " + s_1338;
      }
      test_1331.assert(t_1339, fn_1340);
      let t_1341 = s_1338.indexOf("'Hello'") >= 0;
      function fn_1342() {
        return "has title value: " + s_1338;
      }
      test_1331.assert(t_1341, fn_1342);
      let t_1343 = s_1338.indexOf("DEFAULT") >= 0;
      function fn_1344() {
        return "status should use DEFAULT: " + s_1338;
      }
      test_1331.assert(t_1343, fn_1344);
      return;
    } finally {
      test_1331.softFailToHard();
    }
});
it("toInsertSql change overrides default value", function () {
    const test_1345 = new Test_860();
    try {
      let t_1346;
      let t_1347;
      const tbl_1348 = new TableDef(csid_853("posts"), Object.freeze([new FieldDef(csid_853("title"), new StringField(), false, null, false), new FieldDef(csid_853("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1349 = mapConstructor_840(Object.freeze([pairConstructor_862("title", "Hello"), pairConstructor_862("status", "published")]));
      let t_1350 = csid_853("title");
      let t_1351 = csid_853("status");
      const cs_1352 = changeset(tbl_1348, params_1349).cast(Object.freeze([t_1350, t_1351]));
      try {
        t_1346 = cs_1352.toInsertSql();
        t_1347 = t_1346;
      } catch {
        t_1347 = panic_857();
      }
      const s_1353 = t_1347.toString();
      let t_1354 = s_1353.indexOf("'published'") >= 0;
      function fn_1355() {
        return "should use provided value: " + s_1353;
      }
      test_1345.assert(t_1354, fn_1355);
      return;
    } finally {
      test_1345.softFailToHard();
    }
});
it("toInsertSql with timestamps uses DEFAULT", function () {
    const test_1359 = new Test_860();
    try {
      let t_1360;
      let t_1361;
      let t_1362;
      let ts_1363;
      try {
        t_1360 = timestamps();
        ts_1363 = t_1360;
      } catch {
        ts_1363 = panic_857();
      }
      const fields_1364 = [];
      listBuilderAdd_90(fields_1364, new FieldDef(csid_853("title"), new StringField(), false, null, false));
      function fn_1365(t_1366) {
        listBuilderAdd_90(fields_1364, t_1366);
        return;
      }
      ts_1363.forEach(fn_1365);
      const tbl_1367 = new TableDef(csid_853("articles"), listBuilderToList_91(fields_1364), null);
      const params_1368 = mapConstructor_840(Object.freeze([pairConstructor_862("title", "News")]));
      let t_1369 = csid_853("title");
      const cs_1370 = changeset(tbl_1367, params_1368).cast(Object.freeze([t_1369]));
      try {
        t_1361 = cs_1370.toInsertSql();
        t_1362 = t_1361;
      } catch {
        t_1362 = panic_857();
      }
      const s_1371 = t_1362.toString();
      let t_1372 = s_1371.indexOf("inserted_at") >= 0;
      function fn_1373() {
        return "should include inserted_at: " + s_1371;
      }
      test_1359.assert(t_1372, fn_1373);
      let t_1374 = s_1371.indexOf("updated_at") >= 0;
      function fn_1375() {
        return "should include updated_at: " + s_1371;
      }
      test_1359.assert(t_1374, fn_1375);
      let t_1376 = s_1371.indexOf("DEFAULT") >= 0;
      function fn_1377() {
        return "timestamps should use DEFAULT: " + s_1371;
      }
      test_1359.assert(t_1376, fn_1377);
      return;
    } finally {
      test_1359.softFailToHard();
    }
});
it("toInsertSql skips virtual fields", function () {
    const test_1378 = new Test_860();
    try {
      let t_1379;
      let t_1380;
      const tbl_1381 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("full_name"), new StringField(), true, null, true)]), null);
      const params_1382 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("full_name", "Alice Smith")]));
      let t_1383 = csid_853("name");
      let t_1384 = csid_853("full_name");
      const cs_1385 = changeset(tbl_1381, params_1382).cast(Object.freeze([t_1383, t_1384]));
      try {
        t_1379 = cs_1385.toInsertSql();
        t_1380 = t_1379;
      } catch {
        t_1380 = panic_857();
      }
      const s_1386 = t_1380.toString();
      let t_1387 = s_1386.indexOf("'Alice'") >= 0;
      function fn_1388() {
        return "name should be included: " + s_1386;
      }
      test_1378.assert(t_1387, fn_1388);
      let t_1389 = !(s_1386.indexOf("full_name") >= 0);
      function fn_1390() {
        return "virtual field should be excluded: " + s_1386;
      }
      test_1378.assert(t_1389, fn_1390);
      return;
    } finally {
      test_1378.softFailToHard();
    }
});
it("toInsertSql allows missing non-nullable virtual field", function () {
    const test_1391 = new Test_860();
    try {
      let t_1392;
      let t_1393;
      const tbl_1394 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("computed"), new StringField(), false, null, true)]), null);
      const params_1395 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice")]));
      let t_1396 = csid_853("name");
      const cs_1397 = changeset(tbl_1394, params_1395).cast(Object.freeze([t_1396]));
      try {
        t_1392 = cs_1397.toInsertSql();
        t_1393 = t_1392;
      } catch {
        t_1393 = panic_857();
      }
      const s_1398 = t_1393.toString();
      let t_1399 = s_1398.indexOf("'Alice'") >= 0;
      function fn_1400() {
        return "should succeed: " + s_1398;
      }
      test_1391.assert(t_1399, fn_1400);
      return;
    } finally {
      test_1391.softFailToHard();
    }
});
it("toUpdateSql skips virtual fields", function () {
    const test_1401 = new Test_860();
    try {
      let t_1402;
      let t_1403;
      const tbl_1404 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("display"), new StringField(), true, null, true)]), null);
      const params_1405 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Bob"), pairConstructor_862("display", "Bobby")]));
      let t_1406 = csid_853("name");
      let t_1407 = csid_853("display");
      const cs_1408 = changeset(tbl_1404, params_1405).cast(Object.freeze([t_1406, t_1407]));
      try {
        t_1402 = cs_1408.toUpdateSql(1);
        t_1403 = t_1402;
      } catch {
        t_1403 = panic_857();
      }
      const s_1409 = t_1403.toString();
      let t_1410 = s_1409.indexOf("name = 'Bob'") >= 0;
      function fn_1411() {
        return "name should be in SET: " + s_1409;
      }
      test_1401.assert(t_1410, fn_1411);
      let t_1412 = !(s_1409.indexOf("display") >= 0);
      function fn_1413() {
        return "virtual field excluded from UPDATE: " + s_1409;
      }
      test_1401.assert(t_1412, fn_1413);
      return;
    } finally {
      test_1401.softFailToHard();
    }
});
it("toUpdateSql uses custom primary key", function () {
    const test_1414 = new Test_860();
    try {
      let t_1415;
      let t_1416;
      const tbl_1417 = new TableDef(csid_853("posts"), Object.freeze([new FieldDef(csid_853("title"), new StringField(), false, null, false)]), csid_853("post_id"));
      const params_1418 = mapConstructor_840(Object.freeze([pairConstructor_862("title", "Updated")]));
      let t_1419 = csid_853("title");
      const cs_1420 = changeset(tbl_1417, params_1418).cast(Object.freeze([t_1419]));
      try {
        t_1415 = cs_1420.toUpdateSql(99);
        t_1416 = t_1415;
      } catch {
        t_1416 = panic_857();
      }
      const s_1421 = t_1416.toString();
      let t_1422 = s_1421 === "UPDATE posts SET title = 'Updated' WHERE post_id = 99";
      function fn_1423() {
        return "got: " + s_1421;
      }
      test_1414.assert(t_1422, fn_1423);
      return;
    } finally {
      test_1414.softFailToHard();
    }
});
it("deleteSql uses custom primary key", function () {
    const test_1427 = new Test_860();
    try {
      const tbl_1428 = new TableDef(csid_853("posts"), Object.freeze([new FieldDef(csid_853("title"), new StringField(), false, null, false)]), csid_853("post_id"));
      const s_1429 = deleteSql(tbl_1428, 42).toString();
      let t_1430 = s_1429 === "DELETE FROM posts WHERE post_id = 42";
      function fn_1431() {
        return "got: " + s_1429;
      }
      test_1427.assert(t_1430, fn_1431);
      return;
    } finally {
      test_1427.softFailToHard();
    }
});
it("deleteSql uses default id when primaryKey null", function () {
    const test_1432 = new Test_860();
    try {
      const tbl_1433 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false)]), null);
      const s_1434 = deleteSql(tbl_1433, 7).toString();
      let t_1435 = s_1434 === "DELETE FROM users WHERE id = 7";
      function fn_1436() {
        return "got: " + s_1434;
      }
      test_1432.assert(t_1435, fn_1436);
      return;
    } finally {
      test_1432.softFailToHard();
    }
});
it("already-invalid changeset skips subsequent validators", function () {
    const test_1437 = new Test_860();
    try {
      const params_1438 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "A"), pairConstructor_862("email", "alice@example.com")]));
      let t_1439 = userTable_858();
      let t_1440 = csid_853("name");
      let t_1441 = csid_853("email");
      const cs_1442 = changeset(t_1439, params_1438).cast(Object.freeze([t_1440, t_1441])).validateLength(csid_853("name"), 3, 50).validateRequired(Object.freeze([csid_853("name"), csid_853("email")])).validateContains(csid_853("email"), "@");
      let t_1443 = ! cs_1442.isValid;
      function fn_1444() {
        return "should be invalid from validateLength";
      }
      test_1437.assert(t_1443, fn_1444);
      let t_1445 = cs_1442.errors.length === 1;
      function fn_1446() {
        return "should have exactly 1 error, not accumulate: " + cs_1442.errors.length.toString();
      }
      test_1437.assert(t_1445, fn_1446);
      let t_1447 = listedGet_183(cs_1442.errors, 0).field === "name";
      function fn_1448() {
        return "error should be on name";
      }
      test_1437.assert(t_1447, fn_1448);
      return;
    } finally {
      test_1437.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual passes at boundary", function () {
    const test_1449 = new Test_860();
    try {
      const params_1450 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "10.0")]));
      let t_1451 = userTable_858();
      let t_1452 = csid_853("score");
      const cs_1453 = changeset(t_1451, params_1450).cast(Object.freeze([t_1452])).validateNumber(csid_853("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      let t_1454 = cs_1453.isValid;
      function fn_1455() {
        return "10.0 <= 10.0 should pass";
      }
      test_1449.assert(t_1454, fn_1455);
      return;
    } finally {
      test_1449.softFailToHard();
    }
});
it("validateNumber lessThanOrEqual fails above boundary", function () {
    const test_1456 = new Test_860();
    try {
      const params_1457 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "10.1")]));
      let t_1458 = userTable_858();
      let t_1459 = csid_853("score");
      const cs_1460 = changeset(t_1458, params_1457).cast(Object.freeze([t_1459])).validateNumber(csid_853("score"), new NumberValidationOpts(null, null, null, 10.0, null));
      let t_1461 = ! cs_1460.isValid;
      function fn_1462() {
        return "10.1 <= 10.0 should fail";
      }
      test_1456.assert(t_1461, fn_1462);
      let t_1463 = listedGet_183(cs_1460.errors, 0).message === "must be less than or equal to 10.0";
      function fn_1464() {
        return "correct message";
      }
      test_1456.assert(t_1463, fn_1464);
      return;
    } finally {
      test_1456.softFailToHard();
    }
});
it("validateNumber equalTo passes when equal", function () {
    const test_1465 = new Test_860();
    try {
      const params_1466 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "42.0")]));
      let t_1467 = userTable_858();
      let t_1468 = csid_853("score");
      const cs_1469 = changeset(t_1467, params_1466).cast(Object.freeze([t_1468])).validateNumber(csid_853("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      let t_1470 = cs_1469.isValid;
      function fn_1471() {
        return "42.0 == 42.0 should pass";
      }
      test_1465.assert(t_1470, fn_1471);
      return;
    } finally {
      test_1465.softFailToHard();
    }
});
it("validateNumber equalTo fails when not equal", function () {
    const test_1472 = new Test_860();
    try {
      const params_1473 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "41.9")]));
      let t_1474 = userTable_858();
      let t_1475 = csid_853("score");
      const cs_1476 = changeset(t_1474, params_1473).cast(Object.freeze([t_1475])).validateNumber(csid_853("score"), new NumberValidationOpts(null, null, null, null, 42.0));
      let t_1477 = ! cs_1476.isValid;
      function fn_1478() {
        return "41.9 == 42.0 should fail";
      }
      test_1472.assert(t_1477, fn_1478);
      let t_1479 = listedGet_183(cs_1476.errors, 0).message === "must be equal to 42.0";
      function fn_1480() {
        return "correct message";
      }
      test_1472.assert(t_1479, fn_1480);
      return;
    } finally {
      test_1472.softFailToHard();
    }
});
it("validateNumber greaterThan fails at exact threshold", function () {
    const test_1481 = new Test_860();
    try {
      const params_1482 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "18")]));
      let t_1483 = userTable_858();
      let t_1484 = csid_853("age");
      const cs_1485 = changeset(t_1483, params_1482).cast(Object.freeze([t_1484])).validateNumber(csid_853("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1486 = ! cs_1485.isValid;
      function fn_1487() {
        return "18 > 18 should fail (strict greater than)";
      }
      test_1481.assert(t_1486, fn_1487);
      return;
    } finally {
      test_1481.softFailToHard();
    }
});
it("validateNumber lessThan fails at exact threshold", function () {
    const test_1488 = new Test_860();
    try {
      const params_1489 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "10.0")]));
      let t_1490 = userTable_858();
      let t_1491 = csid_853("score");
      const cs_1492 = changeset(t_1490, params_1489).cast(Object.freeze([t_1491])).validateNumber(csid_853("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1493 = ! cs_1492.isValid;
      function fn_1494() {
        return "10.0 < 10.0 should fail (strict less than)";
      }
      test_1488.assert(t_1493, fn_1494);
      return;
    } finally {
      test_1488.softFailToHard();
    }
});
it("validateFloat fails for non-float string", function () {
    const test_1495 = new Test_860();
    try {
      const params_1496 = mapConstructor_840(Object.freeze([pairConstructor_862("score", "abc")]));
      let t_1497 = userTable_858();
      let t_1498 = csid_853("score");
      const cs_1499 = changeset(t_1497, params_1496).cast(Object.freeze([t_1498])).validateFloat(csid_853("score"));
      let t_1500 = ! cs_1499.isValid;
      function fn_1501() {
        return "abc should not parse as float";
      }
      test_1495.assert(t_1500, fn_1501);
      let t_1502 = listedGet_183(cs_1499.errors, 0).message === "must be a number";
      function fn_1503() {
        return "correct message";
      }
      test_1495.assert(t_1502, fn_1503);
      return;
    } finally {
      test_1495.softFailToHard();
    }
});
it("toInsertSql with all six field types", function () {
    const test_1504 = new Test_860();
    try {
      let t_1505;
      let t_1506;
      const tbl_1507 = new TableDef(csid_853("records"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("count"), new IntField(), false, null, false), new FieldDef(csid_853("big_id"), new Int64Field(), false, null, false), new FieldDef(csid_853("rating"), new FloatField(), false, null, false), new FieldDef(csid_853("active"), new BoolField(), false, null, false), new FieldDef(csid_853("birthday"), new DateField(), false, null, false)]), null);
      const params_1508 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("count", "42"), pairConstructor_862("big_id", "9999999999"), pairConstructor_862("rating", "3.14"), pairConstructor_862("active", "true"), pairConstructor_862("birthday", "2000-01-15")]));
      let t_1509 = csid_853("name");
      let t_1510 = csid_853("count");
      let t_1511 = csid_853("big_id");
      let t_1512 = csid_853("rating");
      let t_1513 = csid_853("active");
      let t_1514 = csid_853("birthday");
      const cs_1515 = changeset(tbl_1507, params_1508).cast(Object.freeze([t_1509, t_1510, t_1511, t_1512, t_1513, t_1514]));
      try {
        t_1505 = cs_1515.toInsertSql();
        t_1506 = t_1505;
      } catch {
        t_1506 = panic_857();
      }
      const s_1516 = t_1506.toString();
      let t_1517 = s_1516.indexOf("'Alice'") >= 0;
      function fn_1518() {
        return "string field: " + s_1516;
      }
      test_1504.assert(t_1517, fn_1518);
      let t_1519 = s_1516.indexOf("42") >= 0;
      function fn_1520() {
        return "int field: " + s_1516;
      }
      test_1504.assert(t_1519, fn_1520);
      let t_1521 = s_1516.indexOf("9999999999") >= 0;
      function fn_1522() {
        return "int64 field: " + s_1516;
      }
      test_1504.assert(t_1521, fn_1522);
      let t_1523 = s_1516.indexOf("3.14") >= 0;
      function fn_1524() {
        return "float field: " + s_1516;
      }
      test_1504.assert(t_1523, fn_1524);
      let t_1525 = s_1516.indexOf("TRUE") >= 0;
      function fn_1526() {
        return "bool field: " + s_1516;
      }
      test_1504.assert(t_1525, fn_1526);
      let t_1527 = s_1516.indexOf("'2000-01-15'") >= 0;
      function fn_1528() {
        return "date field: " + s_1516;
      }
      test_1504.assert(t_1527, fn_1528);
      return;
    } finally {
      test_1504.softFailToHard();
    }
});
it("deleteChange on non-nullable field causes toInsertSql to bubble", function () {
    const test_1529 = new Test_860();
    try {
      const tbl_1530 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("email"), new StringField(), false, null, false)]), null);
      const params_1531 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "a@b.com")]));
      let t_1532 = csid_853("name");
      let t_1533 = csid_853("email");
      const cs_1534 = changeset(tbl_1530, params_1531).cast(Object.freeze([t_1532, t_1533])).deleteChange(csid_853("email"));
      let didBubble_1535;
      try {
        cs_1534.toInsertSql();
        didBubble_1535 = false;
      } catch {
        didBubble_1535 = true;
      }
      function fn_1536() {
        return "removing non-nullable field should make toInsertSql bubble";
      }
      test_1529.assert(didBubble_1535, fn_1536);
      return;
    } finally {
      test_1529.softFailToHard();
    }
});
it("validateLength passes at exact min", function () {
    const test_1537 = new Test_860();
    try {
      const params_1538 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "abc")]));
      let t_1539 = userTable_858();
      let t_1540 = csid_853("name");
      const cs_1541 = changeset(t_1539, params_1538).cast(Object.freeze([t_1540])).validateLength(csid_853("name"), 3, 10);
      let t_1542 = cs_1541.isValid;
      function fn_1543() {
        return "length 3 should pass for min 3";
      }
      test_1537.assert(t_1542, fn_1543);
      return;
    } finally {
      test_1537.softFailToHard();
    }
});
it("validateLength passes at exact max", function () {
    const test_1544 = new Test_860();
    try {
      const params_1545 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "abcdefghij")]));
      let t_1546 = userTable_858();
      let t_1547 = csid_853("name");
      const cs_1548 = changeset(t_1546, params_1545).cast(Object.freeze([t_1547])).validateLength(csid_853("name"), 1, 10);
      let t_1549 = cs_1548.isValid;
      function fn_1550() {
        return "length 10 should pass for max 10";
      }
      test_1544.assert(t_1549, fn_1550);
      return;
    } finally {
      test_1544.softFailToHard();
    }
});
it("validateAcceptance skips when field not in changes", function () {
    const test_1551 = new Test_860();
    try {
      const params_1552 = mapConstructor_840(Object.freeze([]));
      let t_1553 = userTable_858();
      let t_1554 = csid_853("active");
      const cs_1555 = changeset(t_1553, params_1552).cast(Object.freeze([t_1554])).validateAcceptance(csid_853("active"));
      let t_1556 = cs_1555.isValid;
      function fn_1557() {
        return "should be valid when field absent";
      }
      test_1551.assert(t_1556, fn_1557);
      return;
    } finally {
      test_1551.softFailToHard();
    }
});
it("multiple validators chain correctly on valid changeset", function () {
    const test_1558 = new Test_860();
    try {
      const params_1559 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("email", "alice@example.com"), pairConstructor_862("age", "25")]));
      let t_1560 = userTable_858();
      let t_1561 = csid_853("name");
      let t_1562 = csid_853("email");
      let t_1563 = csid_853("age");
      const cs_1564 = changeset(t_1560, params_1559).cast(Object.freeze([t_1561, t_1562, t_1563])).validateRequired(Object.freeze([csid_853("name"), csid_853("email")])).validateLength(csid_853("name"), 2, 50).validateContains(csid_853("email"), "@").validateInt(csid_853("age")).validateNumber(csid_853("age"), new NumberValidationOpts(0.0, 150.0, null, null, null));
      let t_1565 = cs_1564.isValid;
      function fn_1566() {
        return "all validators should pass";
      }
      test_1558.assert(t_1565, fn_1566);
      let t_1567 = cs_1564.errors.length === 0;
      function fn_1568() {
        return "no errors expected";
      }
      test_1558.assert(t_1567, fn_1568);
      return;
    } finally {
      test_1558.softFailToHard();
    }
});
it("toUpdateSql with multiple non-virtual fields", function () {
    const test_1569 = new Test_860();
    try {
      let t_1570;
      let t_1571;
      const tbl_1572 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("email"), new StringField(), false, null, false)]), null);
      const params_1573 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Bob"), pairConstructor_862("email", "bob@example.com")]));
      let t_1574 = csid_853("name");
      let t_1575 = csid_853("email");
      const cs_1576 = changeset(tbl_1572, params_1573).cast(Object.freeze([t_1574, t_1575]));
      try {
        t_1570 = cs_1576.toUpdateSql(5);
        t_1571 = t_1570;
      } catch {
        t_1571 = panic_857();
      }
      const s_1577 = t_1571.toString();
      let t_1578 = s_1577.indexOf("name = 'Bob'") >= 0;
      function fn_1579() {
        return "name in SET: " + s_1577;
      }
      test_1569.assert(t_1578, fn_1579);
      let t_1580 = s_1577.indexOf("email = 'bob@example.com'") >= 0;
      function fn_1581() {
        return "email in SET: " + s_1577;
      }
      test_1569.assert(t_1580, fn_1581);
      let t_1582 = s_1577.indexOf("WHERE id = 5") >= 0;
      function fn_1583() {
        return "WHERE clause: " + s_1577;
      }
      test_1569.assert(t_1582, fn_1583);
      return;
    } finally {
      test_1569.softFailToHard();
    }
});
it("toUpdateSql bubbles when all changes are virtual fields", function () {
    const test_1584 = new Test_860();
    try {
      const tbl_1585 = new TableDef(csid_853("users"), Object.freeze([new FieldDef(csid_853("name"), new StringField(), false, null, false), new FieldDef(csid_853("computed"), new StringField(), true, null, true)]), null);
      const params_1586 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "Alice"), pairConstructor_862("computed", "derived")]));
      let t_1587 = csid_853("computed");
      const cs_1588 = changeset(tbl_1585, params_1586).cast(Object.freeze([t_1587]));
      let didBubble_1589;
      try {
        cs_1588.toUpdateSql(1);
        didBubble_1589 = false;
      } catch {
        didBubble_1589 = true;
      }
      function fn_1590() {
        return "should bubble when all changes are virtual";
      }
      test_1584.assert(didBubble_1589, fn_1590);
      return;
    } finally {
      test_1584.softFailToHard();
    }
});
it("putChange satisfies subsequent validateRequired", function () {
    const test_1591 = new Test_860();
    try {
      const params_1592 = mapConstructor_840(Object.freeze([]));
      let t_1593 = userTable_858();
      let t_1594 = csid_853("name");
      const cs_1595 = changeset(t_1593, params_1592).cast(Object.freeze([t_1594])).putChange(csid_853("name"), "Injected").validateRequired(Object.freeze([csid_853("name")]));
      let t_1596 = cs_1595.isValid;
      function fn_1597() {
        return "putChange should satisfy required";
      }
      test_1591.assert(t_1596, fn_1597);
      return;
    } finally {
      test_1591.softFailToHard();
    }
});
it("validateStartsWith skips when field not in changes", function () {
    const test_1598 = new Test_860();
    try {
      const params_1599 = mapConstructor_840(Object.freeze([]));
      let t_1600 = userTable_858();
      let t_1601 = csid_853("name");
      const cs_1602 = changeset(t_1600, params_1599).cast(Object.freeze([t_1601])).validateStartsWith(csid_853("name"), "Dr.");
      let t_1603 = cs_1602.isValid;
      function fn_1604() {
        return "should be valid when field absent";
      }
      test_1598.assert(t_1603, fn_1604);
      return;
    } finally {
      test_1598.softFailToHard();
    }
});
it("validateEndsWith skips when field not in changes", function () {
    const test_1605 = new Test_860();
    try {
      const params_1606 = mapConstructor_840(Object.freeze([]));
      let t_1607 = userTable_858();
      let t_1608 = csid_853("name");
      const cs_1609 = changeset(t_1607, params_1606).cast(Object.freeze([t_1608])).validateEndsWith(csid_853("name"), ".com");
      let t_1610 = cs_1609.isValid;
      function fn_1611() {
        return "should be valid when field absent";
      }
      test_1605.assert(t_1610, fn_1611);
      return;
    } finally {
      test_1605.softFailToHard();
    }
});
it("validateInt accepts zero", function () {
    const test_1612 = new Test_860();
    try {
      const params_1613 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "0")]));
      let t_1614 = userTable_858();
      let t_1615 = csid_853("age");
      const cs_1616 = changeset(t_1614, params_1613).cast(Object.freeze([t_1615])).validateInt(csid_853("age"));
      let t_1617 = cs_1616.isValid;
      function fn_1618() {
        return "0 should be a valid int";
      }
      test_1612.assert(t_1617, fn_1618);
      return;
    } finally {
      test_1612.softFailToHard();
    }
});
it("validateInt accepts negative", function () {
    const test_1619 = new Test_860();
    try {
      const params_1620 = mapConstructor_840(Object.freeze([pairConstructor_862("age", "-5")]));
      let t_1621 = userTable_858();
      let t_1622 = csid_853("age");
      const cs_1623 = changeset(t_1621, params_1620).cast(Object.freeze([t_1622])).validateInt(csid_853("age"));
      let t_1624 = cs_1623.isValid;
      function fn_1625() {
        return "-5 should be a valid int";
      }
      test_1619.assert(t_1624, fn_1625);
      return;
    } finally {
      test_1619.softFailToHard();
    }
});
it("changeset immutability - validators do not mutate base", function () {
    const test_1626 = new Test_860();
    try {
      const params_1627 = mapConstructor_840(Object.freeze([pairConstructor_862("name", "A"), pairConstructor_862("email", "alice@example.com")]));
      let t_1628 = userTable_858();
      let t_1629 = csid_853("name");
      let t_1630 = csid_853("email");
      const base_1631 = changeset(t_1628, params_1627).cast(Object.freeze([t_1629, t_1630]));
      const failed_1632 = base_1631.validateLength(csid_853("name"), 3, 50);
      const passed_1633 = base_1631.validateRequired(Object.freeze([csid_853("name"), csid_853("email")]));
      let t_1634 = ! failed_1632.isValid;
      function fn_1635() {
        return "failed branch should be invalid";
      }
      test_1626.assert(t_1634, fn_1635);
      let t_1636 = passed_1633.isValid;
      function fn_1637() {
        return "passed branch should still be valid";
      }
      test_1626.assert(t_1636, fn_1637);
      return;
    } finally {
      test_1626.softFailToHard();
    }
});
/**
 * @param {string} name_1700
 * @returns {SafeIdentifier}
 */
function sid_1699(name_1700) {
  let return_1701;
  let t_1702;
  try {
    t_1702 = safeIdentifier(name_1700);
    return_1701 = t_1702;
  } catch {
    return_1701 = panic_857();
  }
  return return_1701;
}
it("bare from produces SELECT *", function () {
    const test_1703 = new Test_860();
    try {
      const q_1704 = from(sid_1699("users"));
      let t_1705 = q_1704.toSql().toString() === "SELECT * FROM users";
      function fn_1706() {
        return "bare query";
      }
      test_1703.assert(t_1705, fn_1706);
      return;
    } finally {
      test_1703.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_1707 = new Test_860();
    try {
      let t_1708 = sid_1699("users");
      let t_1709 = sid_1699("id");
      let t_1710 = sid_1699("name");
      const q_1711 = from(t_1708).select(Object.freeze([t_1709, t_1710]));
      let t_1712 = q_1711.toSql().toString() === "SELECT id, name FROM users";
      function fn_1713() {
        return "select columns";
      }
      test_1707.assert(t_1712, fn_1713);
      return;
    } finally {
      test_1707.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_1714 = new Test_860();
    try {
      let t_1715 = sid_1699("users");
      let t_1716 = new SqlBuilder();
      t_1716.appendSafe("age > ");
      t_1716.appendInt32(18);
      let t_1717 = t_1716.accumulated;
      const q_1718 = from(t_1715).where(t_1717);
      let t_1719 = q_1718.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_1720() {
        return "where int";
      }
      test_1714.assert(t_1719, fn_1720);
      return;
    } finally {
      test_1714.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_1721 = new Test_860();
    try {
      let t_1722 = sid_1699("users");
      let t_1723 = new SqlBuilder();
      t_1723.appendSafe("active = ");
      t_1723.appendBoolean(true);
      let t_1724 = t_1723.accumulated;
      const q_1725 = from(t_1722).where(t_1724);
      let t_1726 = q_1725.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_1727() {
        return "where bool";
      }
      test_1721.assert(t_1726, fn_1727);
      return;
    } finally {
      test_1721.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_1728 = new Test_860();
    try {
      let t_1729 = sid_1699("users");
      let t_1730 = new SqlBuilder();
      t_1730.appendSafe("age > ");
      t_1730.appendInt32(18);
      let t_1731 = t_1730.accumulated;
      let t_1732 = from(t_1729).where(t_1731);
      let t_1733 = new SqlBuilder();
      t_1733.appendSafe("active = ");
      t_1733.appendBoolean(true);
      const q_1734 = t_1732.where(t_1733.accumulated);
      let t_1735 = q_1734.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_1736() {
        return "chained where";
      }
      test_1728.assert(t_1735, fn_1736);
      return;
    } finally {
      test_1728.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_1737 = new Test_860();
    try {
      let t_1738 = sid_1699("users");
      let t_1739 = sid_1699("name");
      const q_1740 = from(t_1738).orderBy(t_1739, true);
      let t_1741 = q_1740.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_1742() {
        return "order asc";
      }
      test_1737.assert(t_1741, fn_1742);
      return;
    } finally {
      test_1737.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_1743 = new Test_860();
    try {
      let t_1744 = sid_1699("users");
      let t_1745 = sid_1699("created_at");
      const q_1746 = from(t_1744).orderBy(t_1745, false);
      let t_1747 = q_1746.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_1748() {
        return "order desc";
      }
      test_1743.assert(t_1747, fn_1748);
      return;
    } finally {
      test_1743.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_1749 = new Test_860();
    try {
      let t_1750;
      let t_1751;
      let q_1752;
      try {
        t_1750 = from(sid_1699("users")).limit(10);
        t_1751 = t_1750.offset(20);
        q_1752 = t_1751;
      } catch {
        q_1752 = panic_857();
      }
      let t_1753 = q_1752.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_1754() {
        return "limit/offset";
      }
      test_1749.assert(t_1753, fn_1754);
      return;
    } finally {
      test_1749.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_1755 = new Test_860();
    try {
      let didBubble_1756;
      try {
        from(sid_1699("users")).limit(-1);
        didBubble_1756 = false;
      } catch {
        didBubble_1756 = true;
      }
      function fn_1757() {
        return "negative limit should bubble";
      }
      test_1755.assert(didBubble_1756, fn_1757);
      return;
    } finally {
      test_1755.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_1758 = new Test_860();
    try {
      let didBubble_1759;
      try {
        from(sid_1699("users")).offset(-1);
        didBubble_1759 = false;
      } catch {
        didBubble_1759 = true;
      }
      function fn_1760() {
        return "negative offset should bubble";
      }
      test_1758.assert(didBubble_1759, fn_1760);
      return;
    } finally {
      test_1758.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_1761 = new Test_860();
    try {
      let t_1762;
      let t_1763;
      let t_1764;
      let t_1765;
      let t_1766;
      let t_1767;
      let t_1768;
      let t_1769;
      let t_1770;
      let t_1771;
      const minAge_1772 = 21;
      let q_1773;
      try {
        t_1762 = sid_1699("users");
        t_1763 = sid_1699("id");
        t_1764 = sid_1699("name");
        t_1765 = sid_1699("email");
        t_1766 = from(t_1762).select(Object.freeze([t_1763, t_1764, t_1765]));
        t_1767 = new SqlBuilder();
        t_1767.appendSafe("age >= ");
        t_1767.appendInt32(21);
        t_1768 = t_1766.where(t_1767.accumulated);
        t_1769 = new SqlBuilder();
        t_1769.appendSafe("active = ");
        t_1769.appendBoolean(true);
        t_1770 = t_1768.where(t_1769.accumulated).orderBy(sid_1699("name"), true).limit(25);
        t_1771 = t_1770.offset(0);
        q_1773 = t_1771;
      } catch {
        q_1773 = panic_857();
      }
      let t_1774 = q_1773.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_1775() {
        return "complex query";
      }
      test_1761.assert(t_1774, fn_1775);
      return;
    } finally {
      test_1761.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1776 = new Test_860();
    try {
      let t_1777;
      let t_1778;
      const q_1779 = from(sid_1699("users"));
      try {
        t_1777 = q_1779.safeToSql(100);
        t_1778 = t_1777;
      } catch {
        t_1778 = panic_857();
      }
      const s_1780 = t_1778.toString();
      let t_1781 = s_1780 === "SELECT * FROM users LIMIT 100";
      function fn_1782() {
        return "should have limit: " + s_1780;
      }
      test_1776.assert(t_1781, fn_1782);
      return;
    } finally {
      test_1776.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1783 = new Test_860();
    try {
      let t_1784;
      let t_1785;
      let t_1786;
      let q_1787;
      try {
        t_1784 = from(sid_1699("users")).limit(5);
        q_1787 = t_1784;
      } catch {
        q_1787 = panic_857();
      }
      try {
        t_1785 = q_1787.safeToSql(100);
        t_1786 = t_1785;
      } catch {
        t_1786 = panic_857();
      }
      const s_1788 = t_1786.toString();
      let t_1789 = s_1788 === "SELECT * FROM users LIMIT 5";
      function fn_1790() {
        return "explicit limit preserved: " + s_1788;
      }
      test_1783.assert(t_1789, fn_1790);
      return;
    } finally {
      test_1783.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1791 = new Test_860();
    try {
      let didBubble_1792;
      try {
        from(sid_1699("users")).safeToSql(-1);
        didBubble_1792 = false;
      } catch {
        didBubble_1792 = true;
      }
      function fn_1793() {
        return "negative defaultLimit should bubble";
      }
      test_1791.assert(didBubble_1792, fn_1793);
      return;
    } finally {
      test_1791.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1794 = new Test_860();
    try {
      const evil_1795 = "'; DROP TABLE users; --";
      let t_1796 = sid_1699("users");
      let t_1797 = new SqlBuilder();
      t_1797.appendSafe("name = ");
      t_1797.appendString("'; DROP TABLE users; --");
      let t_1798 = t_1797.accumulated;
      const q_1799 = from(t_1796).where(t_1798);
      const s_1800 = q_1799.toSql().toString();
      let t_1801 = s_1800.indexOf("''") >= 0;
      function fn_1802() {
        return "quotes must be doubled: " + s_1800;
      }
      test_1794.assert(t_1801, fn_1802);
      let t_1803 = s_1800.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1804() {
        return "structure intact: " + s_1800;
      }
      test_1794.assert(t_1803, fn_1804);
      return;
    } finally {
      test_1794.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1805 = new Test_860();
    try {
      const attack_1806 = "users; DROP TABLE users; --";
      let didBubble_1807;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1807 = false;
      } catch {
        didBubble_1807 = true;
      }
      function fn_1808() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1805.assert(didBubble_1807, fn_1808);
      return;
    } finally {
      test_1805.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1809 = new Test_860();
    try {
      let t_1810 = sid_1699("users");
      let t_1811 = sid_1699("orders");
      let t_1812 = new SqlBuilder();
      t_1812.appendSafe("users.id = orders.user_id");
      let t_1813 = t_1812.accumulated;
      const q_1814 = from(t_1810).innerJoin(t_1811, t_1813);
      let t_1815 = q_1814.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1816() {
        return "inner join";
      }
      test_1809.assert(t_1815, fn_1816);
      return;
    } finally {
      test_1809.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1817 = new Test_860();
    try {
      let t_1818 = sid_1699("users");
      let t_1819 = sid_1699("profiles");
      let t_1820 = new SqlBuilder();
      t_1820.appendSafe("users.id = profiles.user_id");
      let t_1821 = t_1820.accumulated;
      const q_1822 = from(t_1818).leftJoin(t_1819, t_1821);
      let t_1823 = q_1822.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1824() {
        return "left join";
      }
      test_1817.assert(t_1823, fn_1824);
      return;
    } finally {
      test_1817.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1825 = new Test_860();
    try {
      let t_1826 = sid_1699("orders");
      let t_1827 = sid_1699("users");
      let t_1828 = new SqlBuilder();
      t_1828.appendSafe("orders.user_id = users.id");
      let t_1829 = t_1828.accumulated;
      const q_1830 = from(t_1826).rightJoin(t_1827, t_1829);
      let t_1831 = q_1830.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_1832() {
        return "right join";
      }
      test_1825.assert(t_1831, fn_1832);
      return;
    } finally {
      test_1825.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1833 = new Test_860();
    try {
      let t_1834 = sid_1699("users");
      let t_1835 = sid_1699("orders");
      let t_1836 = new SqlBuilder();
      t_1836.appendSafe("users.id = orders.user_id");
      let t_1837 = t_1836.accumulated;
      const q_1838 = from(t_1834).fullJoin(t_1835, t_1837);
      let t_1839 = q_1838.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_1840() {
        return "full join";
      }
      test_1833.assert(t_1839, fn_1840);
      return;
    } finally {
      test_1833.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1841 = new Test_860();
    try {
      let t_1842 = sid_1699("users");
      let t_1843 = sid_1699("orders");
      let t_1844 = new SqlBuilder();
      t_1844.appendSafe("users.id = orders.user_id");
      let t_1845 = t_1844.accumulated;
      let t_1846 = from(t_1842).innerJoin(t_1843, t_1845);
      let t_1847 = sid_1699("profiles");
      let t_1848 = new SqlBuilder();
      t_1848.appendSafe("users.id = profiles.user_id");
      const q_1849 = t_1846.leftJoin(t_1847, t_1848.accumulated);
      let t_1850 = q_1849.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1851() {
        return "chained joins";
      }
      test_1841.assert(t_1850, fn_1851);
      return;
    } finally {
      test_1841.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1852 = new Test_860();
    try {
      let t_1853;
      let t_1854;
      let t_1855;
      let t_1856;
      let t_1857;
      let t_1858;
      let t_1859;
      let q_1860;
      try {
        t_1853 = sid_1699("users");
        t_1854 = sid_1699("orders");
        t_1855 = new SqlBuilder();
        t_1855.appendSafe("users.id = orders.user_id");
        t_1856 = t_1855.accumulated;
        t_1857 = from(t_1853).innerJoin(t_1854, t_1856);
        t_1858 = new SqlBuilder();
        t_1858.appendSafe("orders.total > ");
        t_1858.appendInt32(100);
        t_1859 = t_1857.where(t_1858.accumulated).orderBy(sid_1699("name"), true).limit(10);
        q_1860 = t_1859;
      } catch {
        q_1860 = panic_857();
      }
      let t_1861 = q_1860.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_1862() {
        return "join with where/order/limit";
      }
      test_1852.assert(t_1861, fn_1862);
      return;
    } finally {
      test_1852.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1863 = new Test_860();
    try {
      const c_1864 = col(sid_1699("users"), sid_1699("id"));
      let t_1865 = c_1864.toString() === "users.id";
      function fn_1866() {
        return "col helper";
      }
      test_1863.assert(t_1865, fn_1866);
      return;
    } finally {
      test_1863.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1867 = new Test_860();
    try {
      const onCond_1868 = col(sid_1699("users"), sid_1699("id"));
      const b_1869 = new SqlBuilder();
      b_1869.appendFragment(onCond_1868);
      b_1869.appendSafe(" = ");
      b_1869.appendFragment(col(sid_1699("orders"), sid_1699("user_id")));
      let t_1870 = sid_1699("users");
      let t_1871 = sid_1699("orders");
      let t_1872 = b_1869.accumulated;
      const q_1873 = from(t_1870).innerJoin(t_1871, t_1872);
      let t_1874 = q_1873.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1875() {
        return "join with col";
      }
      test_1867.assert(t_1874, fn_1875);
      return;
    } finally {
      test_1867.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1876 = new Test_860();
    try {
      let t_1877 = sid_1699("users");
      let t_1878 = new SqlBuilder();
      t_1878.appendSafe("status = ");
      t_1878.appendString("active");
      let t_1879 = t_1878.accumulated;
      const q_1880 = from(t_1877).orWhere(t_1879);
      let t_1881 = q_1880.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1882() {
        return "orWhere basic";
      }
      test_1876.assert(t_1881, fn_1882);
      return;
    } finally {
      test_1876.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1883 = new Test_860();
    try {
      let t_1884 = sid_1699("users");
      let t_1885 = new SqlBuilder();
      t_1885.appendSafe("age > ");
      t_1885.appendInt32(18);
      let t_1886 = t_1885.accumulated;
      let t_1887 = from(t_1884).where(t_1886);
      let t_1888 = new SqlBuilder();
      t_1888.appendSafe("vip = ");
      t_1888.appendBoolean(true);
      const q_1889 = t_1887.orWhere(t_1888.accumulated);
      let t_1890 = q_1889.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1891() {
        return "where then orWhere";
      }
      test_1883.assert(t_1890, fn_1891);
      return;
    } finally {
      test_1883.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1892 = new Test_860();
    try {
      let t_1893 = sid_1699("users");
      let t_1894 = new SqlBuilder();
      t_1894.appendSafe("active = ");
      t_1894.appendBoolean(true);
      let t_1895 = t_1894.accumulated;
      let t_1896 = from(t_1893).where(t_1895);
      let t_1897 = new SqlBuilder();
      t_1897.appendSafe("role = ");
      t_1897.appendString("admin");
      let t_1898 = t_1896.orWhere(t_1897.accumulated);
      let t_1899 = new SqlBuilder();
      t_1899.appendSafe("role = ");
      t_1899.appendString("moderator");
      const q_1900 = t_1898.orWhere(t_1899.accumulated);
      let t_1901 = q_1900.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1902() {
        return "multiple orWhere";
      }
      test_1892.assert(t_1901, fn_1902);
      return;
    } finally {
      test_1892.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1903 = new Test_860();
    try {
      let t_1904 = sid_1699("users");
      let t_1905 = new SqlBuilder();
      t_1905.appendSafe("age > ");
      t_1905.appendInt32(18);
      let t_1906 = t_1905.accumulated;
      let t_1907 = from(t_1904).where(t_1906);
      let t_1908 = new SqlBuilder();
      t_1908.appendSafe("active = ");
      t_1908.appendBoolean(true);
      let t_1909 = t_1907.where(t_1908.accumulated);
      let t_1910 = new SqlBuilder();
      t_1910.appendSafe("vip = ");
      t_1910.appendBoolean(true);
      const q_1911 = t_1909.orWhere(t_1910.accumulated);
      let t_1912 = q_1911.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1913() {
        return "mixed where and orWhere";
      }
      test_1903.assert(t_1912, fn_1913);
      return;
    } finally {
      test_1903.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1914 = new Test_860();
    try {
      let t_1915 = sid_1699("users");
      let t_1916 = sid_1699("deleted_at");
      const q_1917 = from(t_1915).whereNull(t_1916);
      let t_1918 = q_1917.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1919() {
        return "whereNull";
      }
      test_1914.assert(t_1918, fn_1919);
      return;
    } finally {
      test_1914.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1920 = new Test_860();
    try {
      let t_1921 = sid_1699("users");
      let t_1922 = sid_1699("email");
      const q_1923 = from(t_1921).whereNotNull(t_1922);
      let t_1924 = q_1923.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1925() {
        return "whereNotNull";
      }
      test_1920.assert(t_1924, fn_1925);
      return;
    } finally {
      test_1920.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1926 = new Test_860();
    try {
      let t_1927 = sid_1699("users");
      let t_1928 = new SqlBuilder();
      t_1928.appendSafe("active = ");
      t_1928.appendBoolean(true);
      let t_1929 = t_1928.accumulated;
      const q_1930 = from(t_1927).where(t_1929).whereNull(sid_1699("deleted_at"));
      let t_1931 = q_1930.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1932() {
        return "whereNull chained";
      }
      test_1926.assert(t_1931, fn_1932);
      return;
    } finally {
      test_1926.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1933 = new Test_860();
    try {
      let t_1934 = sid_1699("users");
      let t_1935 = sid_1699("deleted_at");
      let t_1936 = from(t_1934).whereNull(t_1935);
      let t_1937 = new SqlBuilder();
      t_1937.appendSafe("role = ");
      t_1937.appendString("admin");
      const q_1938 = t_1936.orWhere(t_1937.accumulated);
      let t_1939 = q_1938.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1940() {
        return "whereNotNull with orWhere";
      }
      test_1933.assert(t_1939, fn_1940);
      return;
    } finally {
      test_1933.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1941 = new Test_860();
    try {
      let t_1942 = sid_1699("users");
      let t_1943 = sid_1699("id");
      let t_1944 = new SqlInt32(1);
      let t_1945 = new SqlInt32(2);
      let t_1946 = new SqlInt32(3);
      const q_1947 = from(t_1942).whereIn(t_1943, Object.freeze([t_1944, t_1945, t_1946]));
      let t_1948 = q_1947.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1949() {
        return "whereIn ints";
      }
      test_1941.assert(t_1948, fn_1949);
      return;
    } finally {
      test_1941.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1950 = new Test_860();
    try {
      let t_1951 = sid_1699("users");
      let t_1952 = sid_1699("name");
      let t_1953 = new SqlString("Alice");
      let t_1954 = new SqlString("Bob's");
      const q_1955 = from(t_1951).whereIn(t_1952, Object.freeze([t_1953, t_1954]));
      let t_1956 = q_1955.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1957() {
        return "whereIn strings";
      }
      test_1950.assert(t_1956, fn_1957);
      return;
    } finally {
      test_1950.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1958 = new Test_860();
    try {
      let t_1959 = sid_1699("users");
      let t_1960 = sid_1699("id");
      const q_1961 = from(t_1959).whereIn(t_1960, Object.freeze([]));
      let t_1962 = q_1961.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1963() {
        return "whereIn empty";
      }
      test_1958.assert(t_1962, fn_1963);
      return;
    } finally {
      test_1958.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1964 = new Test_860();
    try {
      let t_1965 = sid_1699("users");
      let t_1966 = new SqlBuilder();
      t_1966.appendSafe("active = ");
      t_1966.appendBoolean(true);
      let t_1967 = t_1966.accumulated;
      const q_1968 = from(t_1965).where(t_1967).whereIn(sid_1699("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1969 = q_1968.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1970() {
        return "whereIn chained";
      }
      test_1964.assert(t_1969, fn_1970);
      return;
    } finally {
      test_1964.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1971 = new Test_860();
    try {
      let t_1972 = sid_1699("users");
      let t_1973 = sid_1699("id");
      let t_1974 = new SqlInt32(42);
      const q_1975 = from(t_1972).whereIn(t_1973, Object.freeze([t_1974]));
      let t_1976 = q_1975.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1977() {
        return "whereIn single";
      }
      test_1971.assert(t_1976, fn_1977);
      return;
    } finally {
      test_1971.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1978 = new Test_860();
    try {
      let t_1979 = sid_1699("users");
      let t_1980 = new SqlBuilder();
      t_1980.appendSafe("active = ");
      t_1980.appendBoolean(true);
      let t_1981 = t_1980.accumulated;
      const q_1982 = from(t_1979).whereNot(t_1981);
      let t_1983 = q_1982.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1984() {
        return "whereNot";
      }
      test_1978.assert(t_1983, fn_1984);
      return;
    } finally {
      test_1978.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1985 = new Test_860();
    try {
      let t_1986 = sid_1699("users");
      let t_1987 = new SqlBuilder();
      t_1987.appendSafe("age > ");
      t_1987.appendInt32(18);
      let t_1988 = t_1987.accumulated;
      let t_1989 = from(t_1986).where(t_1988);
      let t_1990 = new SqlBuilder();
      t_1990.appendSafe("banned = ");
      t_1990.appendBoolean(true);
      const q_1991 = t_1989.whereNot(t_1990.accumulated);
      let t_1992 = q_1991.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1993() {
        return "whereNot chained";
      }
      test_1985.assert(t_1992, fn_1993);
      return;
    } finally {
      test_1985.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1994 = new Test_860();
    try {
      let t_1995 = sid_1699("users");
      let t_1996 = sid_1699("age");
      let t_1997 = new SqlInt32(18);
      let t_1998 = new SqlInt32(65);
      const q_1999 = from(t_1995).whereBetween(t_1996, t_1997, t_1998);
      let t_2000 = q_1999.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_2001() {
        return "whereBetween ints";
      }
      test_1994.assert(t_2000, fn_2001);
      return;
    } finally {
      test_1994.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_2002 = new Test_860();
    try {
      let t_2003 = sid_1699("users");
      let t_2004 = new SqlBuilder();
      t_2004.appendSafe("active = ");
      t_2004.appendBoolean(true);
      let t_2005 = t_2004.accumulated;
      const q_2006 = from(t_2003).where(t_2005).whereBetween(sid_1699("age"), new SqlInt32(21), new SqlInt32(30));
      let t_2007 = q_2006.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_2008() {
        return "whereBetween chained";
      }
      test_2002.assert(t_2007, fn_2008);
      return;
    } finally {
      test_2002.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_2009 = new Test_860();
    try {
      let t_2010 = sid_1699("users");
      let t_2011 = sid_1699("name");
      const q_2012 = from(t_2010).whereLike(t_2011, "John%");
      let t_2013 = q_2012.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_2014() {
        return "whereLike";
      }
      test_2009.assert(t_2013, fn_2014);
      return;
    } finally {
      test_2009.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_2015 = new Test_860();
    try {
      let t_2016 = sid_1699("users");
      let t_2017 = sid_1699("email");
      const q_2018 = from(t_2016).whereILike(t_2017, "%@gmail.com");
      let t_2019 = q_2018.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_2020() {
        return "whereILike";
      }
      test_2015.assert(t_2019, fn_2020);
      return;
    } finally {
      test_2015.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_2021 = new Test_860();
    try {
      let t_2022 = sid_1699("users");
      let t_2023 = sid_1699("name");
      const q_2024 = from(t_2022).whereLike(t_2023, "'; DROP TABLE users; --");
      const s_2025 = q_2024.toSql().toString();
      let t_2026 = s_2025.indexOf("''") >= 0;
      function fn_2027() {
        return "like injection escaped: " + s_2025;
      }
      test_2021.assert(t_2026, fn_2027);
      let t_2028 = s_2025.indexOf("LIKE") >= 0;
      function fn_2029() {
        return "like structure intact: " + s_2025;
      }
      test_2021.assert(t_2028, fn_2029);
      return;
    } finally {
      test_2021.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_2030 = new Test_860();
    try {
      let t_2031 = sid_1699("users");
      let t_2032 = sid_1699("name");
      const q_2033 = from(t_2031).whereLike(t_2032, "%son%");
      let t_2034 = q_2033.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_2035() {
        return "whereLike wildcard";
      }
      test_2030.assert(t_2034, fn_2035);
      return;
    } finally {
      test_2030.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_2036 = new Test_860();
    try {
      const f_2037 = countAll();
      let t_2038 = f_2037.toString() === "COUNT(*)";
      function fn_2039() {
        return "countAll";
      }
      test_2036.assert(t_2038, fn_2039);
      return;
    } finally {
      test_2036.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_2040 = new Test_860();
    try {
      const f_2041 = countCol(sid_1699("id"));
      let t_2042 = f_2041.toString() === "COUNT(id)";
      function fn_2043() {
        return "countCol";
      }
      test_2040.assert(t_2042, fn_2043);
      return;
    } finally {
      test_2040.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_2044 = new Test_860();
    try {
      const f_2045 = sumCol(sid_1699("amount"));
      let t_2046 = f_2045.toString() === "SUM(amount)";
      function fn_2047() {
        return "sumCol";
      }
      test_2044.assert(t_2046, fn_2047);
      return;
    } finally {
      test_2044.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_2048 = new Test_860();
    try {
      const f_2049 = avgCol(sid_1699("price"));
      let t_2050 = f_2049.toString() === "AVG(price)";
      function fn_2051() {
        return "avgCol";
      }
      test_2048.assert(t_2050, fn_2051);
      return;
    } finally {
      test_2048.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_2052 = new Test_860();
    try {
      const f_2053 = minCol(sid_1699("created_at"));
      let t_2054 = f_2053.toString() === "MIN(created_at)";
      function fn_2055() {
        return "minCol";
      }
      test_2052.assert(t_2054, fn_2055);
      return;
    } finally {
      test_2052.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_2056 = new Test_860();
    try {
      const f_2057 = maxCol(sid_1699("score"));
      let t_2058 = f_2057.toString() === "MAX(score)";
      function fn_2059() {
        return "maxCol";
      }
      test_2056.assert(t_2058, fn_2059);
      return;
    } finally {
      test_2056.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_2060 = new Test_860();
    try {
      let t_2061 = sid_1699("orders");
      let t_2062 = countAll();
      const q_2063 = from(t_2061).selectExpr(Object.freeze([t_2062]));
      let t_2064 = q_2063.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_2065() {
        return "selectExpr count";
      }
      test_2060.assert(t_2064, fn_2065);
      return;
    } finally {
      test_2060.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_2066 = new Test_860();
    try {
      const nameFrag_2067 = col(sid_1699("users"), sid_1699("name"));
      let t_2068 = sid_1699("users");
      let t_2069 = countAll();
      const q_2070 = from(t_2068).selectExpr(Object.freeze([nameFrag_2067, t_2069]));
      let t_2071 = q_2070.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_2072() {
        return "selectExpr multi";
      }
      test_2066.assert(t_2071, fn_2072);
      return;
    } finally {
      test_2066.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_2073 = new Test_860();
    try {
      let t_2074 = sid_1699("users");
      let t_2075 = sid_1699("id");
      let t_2076 = sid_1699("name");
      const q_2077 = from(t_2074).select(Object.freeze([t_2075, t_2076])).selectExpr(Object.freeze([countAll()]));
      let t_2078 = q_2077.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_2079() {
        return "selectExpr overrides select";
      }
      test_2073.assert(t_2078, fn_2079);
      return;
    } finally {
      test_2073.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_2080 = new Test_860();
    try {
      let t_2081 = sid_1699("orders");
      let t_2082 = col(sid_1699("orders"), sid_1699("status"));
      let t_2083 = countAll();
      const q_2084 = from(t_2081).selectExpr(Object.freeze([t_2082, t_2083])).groupBy(sid_1699("status"));
      let t_2085 = q_2084.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_2086() {
        return "groupBy single";
      }
      test_2080.assert(t_2085, fn_2086);
      return;
    } finally {
      test_2080.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_2087 = new Test_860();
    try {
      let t_2088 = sid_1699("orders");
      let t_2089 = sid_1699("status");
      const q_2090 = from(t_2088).groupBy(t_2089).groupBy(sid_1699("category"));
      let t_2091 = q_2090.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_2092() {
        return "groupBy multiple";
      }
      test_2087.assert(t_2091, fn_2092);
      return;
    } finally {
      test_2087.softFailToHard();
    }
});
it("having basic", function () {
    const test_2093 = new Test_860();
    try {
      let t_2094 = sid_1699("orders");
      let t_2095 = col(sid_1699("orders"), sid_1699("status"));
      let t_2096 = countAll();
      let t_2097 = from(t_2094).selectExpr(Object.freeze([t_2095, t_2096])).groupBy(sid_1699("status"));
      let t_2098 = new SqlBuilder();
      t_2098.appendSafe("COUNT(*) > ");
      t_2098.appendInt32(5);
      const q_2099 = t_2097.having(t_2098.accumulated);
      let t_2100 = q_2099.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_2101() {
        return "having basic";
      }
      test_2093.assert(t_2100, fn_2101);
      return;
    } finally {
      test_2093.softFailToHard();
    }
});
it("orHaving", function () {
    const test_2102 = new Test_860();
    try {
      let t_2103 = sid_1699("orders");
      let t_2104 = sid_1699("status");
      let t_2105 = from(t_2103).groupBy(t_2104);
      let t_2106 = new SqlBuilder();
      t_2106.appendSafe("COUNT(*) > ");
      t_2106.appendInt32(5);
      let t_2107 = t_2105.having(t_2106.accumulated);
      let t_2108 = new SqlBuilder();
      t_2108.appendSafe("SUM(total) > ");
      t_2108.appendInt32(1000);
      const q_2109 = t_2107.orHaving(t_2108.accumulated);
      let t_2110 = q_2109.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_2111() {
        return "orHaving";
      }
      test_2102.assert(t_2110, fn_2111);
      return;
    } finally {
      test_2102.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_2112 = new Test_860();
    try {
      let t_2113 = sid_1699("users");
      let t_2114 = sid_1699("name");
      const q_2115 = from(t_2113).select(Object.freeze([t_2114])).distinct();
      let t_2116 = q_2115.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_2117() {
        return "distinct";
      }
      test_2112.assert(t_2116, fn_2117);
      return;
    } finally {
      test_2112.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_2118 = new Test_860();
    try {
      let t_2119 = sid_1699("users");
      let t_2120 = sid_1699("email");
      let t_2121 = from(t_2119).select(Object.freeze([t_2120]));
      let t_2122 = new SqlBuilder();
      t_2122.appendSafe("active = ");
      t_2122.appendBoolean(true);
      const q_2123 = t_2121.where(t_2122.accumulated).distinct();
      let t_2124 = q_2123.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_2125() {
        return "distinct with where";
      }
      test_2118.assert(t_2124, fn_2125);
      return;
    } finally {
      test_2118.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_2126 = new Test_860();
    try {
      const q_2127 = from(sid_1699("users"));
      let t_2128 = q_2127.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_2129() {
        return "countSql bare";
      }
      test_2126.assert(t_2128, fn_2129);
      return;
    } finally {
      test_2126.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_2130 = new Test_860();
    try {
      let t_2131 = sid_1699("users");
      let t_2132 = new SqlBuilder();
      t_2132.appendSafe("active = ");
      t_2132.appendBoolean(true);
      let t_2133 = t_2132.accumulated;
      const q_2134 = from(t_2131).where(t_2133);
      let t_2135 = q_2134.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_2136() {
        return "countSql with where";
      }
      test_2130.assert(t_2135, fn_2136);
      return;
    } finally {
      test_2130.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_2137 = new Test_860();
    try {
      let t_2138 = sid_1699("users");
      let t_2139 = sid_1699("orders");
      let t_2140 = new SqlBuilder();
      t_2140.appendSafe("users.id = orders.user_id");
      let t_2141 = t_2140.accumulated;
      let t_2142 = from(t_2138).innerJoin(t_2139, t_2141);
      let t_2143 = new SqlBuilder();
      t_2143.appendSafe("orders.total > ");
      t_2143.appendInt32(100);
      const q_2144 = t_2142.where(t_2143.accumulated);
      let t_2145 = q_2144.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_2146() {
        return "countSql with join";
      }
      test_2137.assert(t_2145, fn_2146);
      return;
    } finally {
      test_2137.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_2147 = new Test_860();
    try {
      let t_2148;
      let t_2149;
      let t_2150;
      let t_2151;
      let t_2152;
      let q_2153;
      try {
        t_2148 = sid_1699("users");
        t_2149 = new SqlBuilder();
        t_2149.appendSafe("active = ");
        t_2149.appendBoolean(true);
        t_2150 = t_2149.accumulated;
        t_2151 = from(t_2148).where(t_2150).orderBy(sid_1699("name"), true).limit(10);
        t_2152 = t_2151.offset(20);
        q_2153 = t_2152;
      } catch {
        q_2153 = panic_857();
      }
      const s_2154 = q_2153.countSql().toString();
      let t_2155 = s_2154 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_2156() {
        return "countSql drops extras: " + s_2154;
      }
      test_2147.assert(t_2155, fn_2156);
      return;
    } finally {
      test_2147.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_2157 = new Test_860();
    try {
      let t_2158 = sid_1699("orders");
      let t_2159 = col(sid_1699("orders"), sid_1699("status"));
      let t_2160 = countAll();
      let t_2161 = sumCol(sid_1699("total"));
      let t_2162 = from(t_2158).selectExpr(Object.freeze([t_2159, t_2160, t_2161]));
      let t_2163 = sid_1699("users");
      let t_2164 = new SqlBuilder();
      t_2164.appendSafe("orders.user_id = users.id");
      let t_2165 = t_2162.innerJoin(t_2163, t_2164.accumulated);
      let t_2166 = new SqlBuilder();
      t_2166.appendSafe("users.active = ");
      t_2166.appendBoolean(true);
      let t_2167 = t_2165.where(t_2166.accumulated).groupBy(sid_1699("status"));
      let t_2168 = new SqlBuilder();
      t_2168.appendSafe("COUNT(*) > ");
      t_2168.appendInt32(3);
      const q_2169 = t_2167.having(t_2168.accumulated).orderBy(sid_1699("status"), true);
      const expected_2170 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_2171 = q_2169.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_2172() {
        return "full aggregation";
      }
      test_2157.assert(t_2171, fn_2172);
      return;
    } finally {
      test_2157.softFailToHard();
    }
});
it("unionSql", function () {
    const test_2173 = new Test_860();
    try {
      let t_2174 = sid_1699("users");
      let t_2175 = new SqlBuilder();
      t_2175.appendSafe("role = ");
      t_2175.appendString("admin");
      let t_2176 = t_2175.accumulated;
      const a_2177 = from(t_2174).where(t_2176);
      let t_2178 = sid_1699("users");
      let t_2179 = new SqlBuilder();
      t_2179.appendSafe("role = ");
      t_2179.appendString("moderator");
      let t_2180 = t_2179.accumulated;
      const b_2181 = from(t_2178).where(t_2180);
      const s_2182 = unionSql(a_2177, b_2181).toString();
      let t_2183 = s_2182 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_2184() {
        return "unionSql: " + s_2182;
      }
      test_2173.assert(t_2183, fn_2184);
      return;
    } finally {
      test_2173.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_2185 = new Test_860();
    try {
      let t_2186 = sid_1699("users");
      let t_2187 = sid_1699("name");
      const a_2188 = from(t_2186).select(Object.freeze([t_2187]));
      let t_2189 = sid_1699("contacts");
      let t_2190 = sid_1699("name");
      const b_2191 = from(t_2189).select(Object.freeze([t_2190]));
      const s_2192 = unionAllSql(a_2188, b_2191).toString();
      let t_2193 = s_2192 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_2194() {
        return "unionAllSql: " + s_2192;
      }
      test_2185.assert(t_2193, fn_2194);
      return;
    } finally {
      test_2185.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_2195 = new Test_860();
    try {
      let t_2196 = sid_1699("users");
      let t_2197 = sid_1699("email");
      const a_2198 = from(t_2196).select(Object.freeze([t_2197]));
      let t_2199 = sid_1699("subscribers");
      let t_2200 = sid_1699("email");
      const b_2201 = from(t_2199).select(Object.freeze([t_2200]));
      const s_2202 = intersectSql(a_2198, b_2201).toString();
      let t_2203 = s_2202 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_2204() {
        return "intersectSql: " + s_2202;
      }
      test_2195.assert(t_2203, fn_2204);
      return;
    } finally {
      test_2195.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_2205 = new Test_860();
    try {
      let t_2206 = sid_1699("users");
      let t_2207 = sid_1699("id");
      const a_2208 = from(t_2206).select(Object.freeze([t_2207]));
      let t_2209 = sid_1699("banned");
      let t_2210 = sid_1699("id");
      const b_2211 = from(t_2209).select(Object.freeze([t_2210]));
      const s_2212 = exceptSql(a_2208, b_2211).toString();
      let t_2213 = s_2212 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_2214() {
        return "exceptSql: " + s_2212;
      }
      test_2205.assert(t_2213, fn_2214);
      return;
    } finally {
      test_2205.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_2215 = new Test_860();
    try {
      let t_2216 = sid_1699("orders");
      let t_2217 = sid_1699("user_id");
      let t_2218 = from(t_2216).select(Object.freeze([t_2217]));
      let t_2219 = new SqlBuilder();
      t_2219.appendSafe("total > ");
      t_2219.appendInt32(100);
      const inner_2220 = t_2218.where(t_2219.accumulated);
      const s_2221 = subquery(inner_2220, sid_1699("big_orders")).toString();
      let t_2222 = s_2221 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_2223() {
        return "subquery: " + s_2221;
      }
      test_2215.assert(t_2222, fn_2223);
      return;
    } finally {
      test_2215.softFailToHard();
    }
});
it("existsSql", function () {
    const test_2224 = new Test_860();
    try {
      let t_2225 = sid_1699("orders");
      let t_2226 = new SqlBuilder();
      t_2226.appendSafe("orders.user_id = users.id");
      let t_2227 = t_2226.accumulated;
      const inner_2228 = from(t_2225).where(t_2227);
      const s_2229 = existsSql(inner_2228).toString();
      let t_2230 = s_2229 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_2231() {
        return "existsSql: " + s_2229;
      }
      test_2224.assert(t_2230, fn_2231);
      return;
    } finally {
      test_2224.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_2232 = new Test_860();
    try {
      let t_2233 = sid_1699("orders");
      let t_2234 = sid_1699("user_id");
      let t_2235 = from(t_2233).select(Object.freeze([t_2234]));
      let t_2236 = new SqlBuilder();
      t_2236.appendSafe("total > ");
      t_2236.appendInt32(1000);
      const sub_2237 = t_2235.where(t_2236.accumulated);
      let t_2238 = sid_1699("users");
      let t_2239 = sid_1699("id");
      const q_2240 = from(t_2238).whereInSubquery(t_2239, sub_2237);
      const s_2241 = q_2240.toSql().toString();
      let t_2242 = s_2241 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_2243() {
        return "whereInSubquery: " + s_2241;
      }
      test_2232.assert(t_2242, fn_2243);
      return;
    } finally {
      test_2232.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_2244 = new Test_860();
    try {
      let t_2245 = sid_1699("users");
      let t_2246 = new SqlBuilder();
      t_2246.appendSafe("age > ");
      t_2246.appendInt32(18);
      let t_2247 = t_2246.accumulated;
      let t_2248 = from(t_2245).where(t_2247);
      let t_2249 = new SqlBuilder();
      t_2249.appendSafe("active = ");
      t_2249.appendBoolean(true);
      const a_2250 = t_2248.where(t_2249.accumulated);
      let t_2251 = sid_1699("users");
      let t_2252 = new SqlBuilder();
      t_2252.appendSafe("role = ");
      t_2252.appendString("vip");
      let t_2253 = t_2252.accumulated;
      const b_2254 = from(t_2251).where(t_2253);
      const s_2255 = unionSql(a_2250, b_2254).toString();
      let t_2256 = s_2255 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_2257() {
        return "union with where: " + s_2255;
      }
      test_2244.assert(t_2256, fn_2257);
      return;
    } finally {
      test_2244.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_2258 = new Test_860();
    try {
      let t_2259 = sid_1699("orders");
      let t_2260 = sid_1699("user_id");
      const sub_2261 = from(t_2259).select(Object.freeze([t_2260]));
      let t_2262 = sid_1699("users");
      let t_2263 = new SqlBuilder();
      t_2263.appendSafe("active = ");
      t_2263.appendBoolean(true);
      let t_2264 = t_2263.accumulated;
      const q_2265 = from(t_2262).where(t_2264).whereInSubquery(sid_1699("id"), sub_2261);
      const s_2266 = q_2265.toSql().toString();
      let t_2267 = s_2266 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_2268() {
        return "whereInSubquery chained: " + s_2266;
      }
      test_2258.assert(t_2267, fn_2268);
      return;
    } finally {
      test_2258.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_2269 = new Test_860();
    try {
      let t_2270 = sid_1699("orders");
      let t_2271 = new SqlBuilder();
      t_2271.appendSafe("orders.user_id = users.id");
      let t_2272 = t_2271.accumulated;
      const sub_2273 = from(t_2270).where(t_2272);
      let t_2274 = sid_1699("users");
      let t_2275 = existsSql(sub_2273);
      const q_2276 = from(t_2274).where(t_2275);
      const s_2277 = q_2276.toSql().toString();
      let t_2278 = s_2277 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_2279() {
        return "exists in where: " + s_2277;
      }
      test_2269.assert(t_2278, fn_2279);
      return;
    } finally {
      test_2269.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_2280 = new Test_860();
    try {
      let t_2281;
      let t_2282;
      let t_2283;
      let t_2284;
      let t_2285;
      let t_2286;
      let q_2287;
      try {
        t_2281 = sid_1699("users");
        t_2282 = sid_1699("name");
        t_2283 = new SqlString("Alice");
        t_2284 = update(t_2281).set(t_2282, t_2283);
        t_2285 = new SqlBuilder();
        t_2285.appendSafe("id = ");
        t_2285.appendInt32(1);
        t_2286 = t_2284.where(t_2285.accumulated).toSql();
        q_2287 = t_2286;
      } catch {
        q_2287 = panic_857();
      }
      let t_2288 = q_2287.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1";
      function fn_2289() {
        return "update basic";
      }
      test_2280.assert(t_2288, fn_2289);
      return;
    } finally {
      test_2280.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_2290 = new Test_860();
    try {
      let t_2291;
      let t_2292;
      let t_2293;
      let t_2294;
      let t_2295;
      let t_2296;
      let q_2297;
      try {
        t_2291 = sid_1699("users");
        t_2292 = sid_1699("name");
        t_2293 = new SqlString("Bob");
        t_2294 = update(t_2291).set(t_2292, t_2293).set(sid_1699("age"), new SqlInt32(30));
        t_2295 = new SqlBuilder();
        t_2295.appendSafe("id = ");
        t_2295.appendInt32(2);
        t_2296 = t_2294.where(t_2295.accumulated).toSql();
        q_2297 = t_2296;
      } catch {
        q_2297 = panic_857();
      }
      let t_2298 = q_2297.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2";
      function fn_2299() {
        return "update multi set";
      }
      test_2290.assert(t_2298, fn_2299);
      return;
    } finally {
      test_2290.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_2300 = new Test_860();
    try {
      let t_2301;
      let t_2302;
      let t_2303;
      let t_2304;
      let t_2305;
      let t_2306;
      let t_2307;
      let t_2308;
      let q_2309;
      try {
        t_2301 = sid_1699("users");
        t_2302 = sid_1699("active");
        t_2303 = new SqlBoolean(false);
        t_2304 = update(t_2301).set(t_2302, t_2303);
        t_2305 = new SqlBuilder();
        t_2305.appendSafe("age < ");
        t_2305.appendInt32(18);
        t_2306 = t_2304.where(t_2305.accumulated);
        t_2307 = new SqlBuilder();
        t_2307.appendSafe("role = ");
        t_2307.appendString("guest");
        t_2308 = t_2306.where(t_2307.accumulated).toSql();
        q_2309 = t_2308;
      } catch {
        q_2309 = panic_857();
      }
      let t_2310 = q_2309.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'";
      function fn_2311() {
        return "update multi where";
      }
      test_2300.assert(t_2310, fn_2311);
      return;
    } finally {
      test_2300.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_2312 = new Test_860();
    try {
      let t_2313;
      let t_2314;
      let t_2315;
      let t_2316;
      let t_2317;
      let t_2318;
      let t_2319;
      let t_2320;
      let q_2321;
      try {
        t_2313 = sid_1699("users");
        t_2314 = sid_1699("status");
        t_2315 = new SqlString("banned");
        t_2316 = update(t_2313).set(t_2314, t_2315);
        t_2317 = new SqlBuilder();
        t_2317.appendSafe("spam_count > ");
        t_2317.appendInt32(10);
        t_2318 = t_2316.where(t_2317.accumulated);
        t_2319 = new SqlBuilder();
        t_2319.appendSafe("reported = ");
        t_2319.appendBoolean(true);
        t_2320 = t_2318.orWhere(t_2319.accumulated).toSql();
        q_2321 = t_2320;
      } catch {
        q_2321 = panic_857();
      }
      let t_2322 = q_2321.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE";
      function fn_2323() {
        return "update orWhere";
      }
      test_2312.assert(t_2322, fn_2323);
      return;
    } finally {
      test_2312.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_2324 = new Test_860();
    try {
      let t_2325;
      let t_2326;
      let t_2327;
      let didBubble_2328;
      try {
        t_2325 = sid_1699("users");
        t_2326 = sid_1699("x");
        t_2327 = new SqlInt32(1);
        update(t_2325).set(t_2326, t_2327).toSql();
        didBubble_2328 = false;
      } catch {
        didBubble_2328 = true;
      }
      function fn_2329() {
        return "update without WHERE should bubble";
      }
      test_2324.assert(didBubble_2328, fn_2329);
      return;
    } finally {
      test_2324.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_2330 = new Test_860();
    try {
      let t_2331;
      let t_2332;
      let t_2333;
      let didBubble_2334;
      try {
        t_2331 = sid_1699("users");
        t_2332 = new SqlBuilder();
        t_2332.appendSafe("id = ");
        t_2332.appendInt32(1);
        t_2333 = t_2332.accumulated;
        update(t_2331).where(t_2333).toSql();
        didBubble_2334 = false;
      } catch {
        didBubble_2334 = true;
      }
      function fn_2335() {
        return "update without SET should bubble";
      }
      test_2330.assert(didBubble_2334, fn_2335);
      return;
    } finally {
      test_2330.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_2336 = new Test_860();
    try {
      let t_2337;
      let t_2338;
      let t_2339;
      let t_2340;
      let t_2341;
      let t_2342;
      let t_2343;
      let q_2344;
      try {
        t_2337 = sid_1699("users");
        t_2338 = sid_1699("active");
        t_2339 = new SqlBoolean(false);
        t_2340 = update(t_2337).set(t_2338, t_2339);
        t_2341 = new SqlBuilder();
        t_2341.appendSafe("last_login < ");
        t_2341.appendString("2024-01-01");
        t_2342 = t_2340.where(t_2341.accumulated).limit(100);
        t_2343 = t_2342.toSql();
        q_2344 = t_2343;
      } catch {
        q_2344 = panic_857();
      }
      let t_2345 = q_2344.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100";
      function fn_2346() {
        return "update limit";
      }
      test_2336.assert(t_2345, fn_2346);
      return;
    } finally {
      test_2336.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_2347 = new Test_860();
    try {
      let t_2348;
      let t_2349;
      let t_2350;
      let t_2351;
      let t_2352;
      let t_2353;
      let q_2354;
      try {
        t_2348 = sid_1699("users");
        t_2349 = sid_1699("bio");
        t_2350 = new SqlString("It's a test");
        t_2351 = update(t_2348).set(t_2349, t_2350);
        t_2352 = new SqlBuilder();
        t_2352.appendSafe("id = ");
        t_2352.appendInt32(1);
        t_2353 = t_2351.where(t_2352.accumulated).toSql();
        q_2354 = t_2353;
      } catch {
        q_2354 = panic_857();
      }
      let t_2355 = q_2354.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1";
      function fn_2356() {
        return "update escaping";
      }
      test_2347.assert(t_2355, fn_2356);
      return;
    } finally {
      test_2347.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_2357 = new Test_860();
    try {
      let t_2358;
      let t_2359;
      let t_2360;
      let t_2361;
      let q_2362;
      try {
        t_2358 = sid_1699("users");
        t_2359 = new SqlBuilder();
        t_2359.appendSafe("id = ");
        t_2359.appendInt32(1);
        t_2360 = t_2359.accumulated;
        t_2361 = deleteFrom(t_2358).where(t_2360).toSql();
        q_2362 = t_2361;
      } catch {
        q_2362 = panic_857();
      }
      let t_2363 = q_2362.toString() === "DELETE FROM users WHERE id = 1";
      function fn_2364() {
        return "delete basic";
      }
      test_2357.assert(t_2363, fn_2364);
      return;
    } finally {
      test_2357.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_2365 = new Test_860();
    try {
      let t_2366;
      let t_2367;
      let t_2368;
      let t_2369;
      let t_2370;
      let t_2371;
      let q_2372;
      try {
        t_2366 = sid_1699("logs");
        t_2367 = new SqlBuilder();
        t_2367.appendSafe("created_at < ");
        t_2367.appendString("2024-01-01");
        t_2368 = t_2367.accumulated;
        t_2369 = deleteFrom(t_2366).where(t_2368);
        t_2370 = new SqlBuilder();
        t_2370.appendSafe("level = ");
        t_2370.appendString("debug");
        t_2371 = t_2369.where(t_2370.accumulated).toSql();
        q_2372 = t_2371;
      } catch {
        q_2372 = panic_857();
      }
      let t_2373 = q_2372.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'";
      function fn_2374() {
        return "delete multi where";
      }
      test_2365.assert(t_2373, fn_2374);
      return;
    } finally {
      test_2365.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_2375 = new Test_860();
    try {
      let didBubble_2376;
      try {
        deleteFrom(sid_1699("users")).toSql();
        didBubble_2376 = false;
      } catch {
        didBubble_2376 = true;
      }
      function fn_2377() {
        return "delete without WHERE should bubble";
      }
      test_2375.assert(didBubble_2376, fn_2377);
      return;
    } finally {
      test_2375.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_2378 = new Test_860();
    try {
      let t_2379;
      let t_2380;
      let t_2381;
      let t_2382;
      let t_2383;
      let t_2384;
      let q_2385;
      try {
        t_2379 = sid_1699("sessions");
        t_2380 = new SqlBuilder();
        t_2380.appendSafe("expired = ");
        t_2380.appendBoolean(true);
        t_2381 = t_2380.accumulated;
        t_2382 = deleteFrom(t_2379).where(t_2381);
        t_2383 = new SqlBuilder();
        t_2383.appendSafe("created_at < ");
        t_2383.appendString("2023-01-01");
        t_2384 = t_2382.orWhere(t_2383.accumulated).toSql();
        q_2385 = t_2384;
      } catch {
        q_2385 = panic_857();
      }
      let t_2386 = q_2385.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'";
      function fn_2387() {
        return "delete orWhere";
      }
      test_2378.assert(t_2386, fn_2387);
      return;
    } finally {
      test_2378.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_2388 = new Test_860();
    try {
      let t_2389;
      let t_2390;
      let t_2391;
      let t_2392;
      let t_2393;
      let q_2394;
      try {
        t_2389 = sid_1699("logs");
        t_2390 = new SqlBuilder();
        t_2390.appendSafe("level = ");
        t_2390.appendString("debug");
        t_2391 = t_2390.accumulated;
        t_2392 = deleteFrom(t_2389).where(t_2391).limit(1000);
        t_2393 = t_2392.toSql();
        q_2394 = t_2393;
      } catch {
        q_2394 = panic_857();
      }
      let t_2395 = q_2394.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000";
      function fn_2396() {
        return "delete limit";
      }
      test_2388.assert(t_2395, fn_2396);
      return;
    } finally {
      test_2388.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_2397 = new Test_860();
    try {
      let t_2398 = sid_1699("users");
      let t_2399 = sid_1699("email");
      let t_2400 = new NullsFirst();
      const q_2401 = from(t_2398).orderByNulls(t_2399, true, t_2400);
      let t_2402 = q_2401.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST";
      function fn_2403() {
        return "nulls first";
      }
      test_2397.assert(t_2402, fn_2403);
      return;
    } finally {
      test_2397.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_2404 = new Test_860();
    try {
      let t_2405 = sid_1699("users");
      let t_2406 = sid_1699("score");
      let t_2407 = new NullsLast();
      const q_2408 = from(t_2405).orderByNulls(t_2406, false, t_2407);
      let t_2409 = q_2408.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST";
      function fn_2410() {
        return "nulls last";
      }
      test_2404.assert(t_2409, fn_2410);
      return;
    } finally {
      test_2404.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_2411 = new Test_860();
    try {
      let t_2412 = sid_1699("users");
      let t_2413 = sid_1699("name");
      const q_2414 = from(t_2412).orderBy(t_2413, true).orderByNulls(sid_1699("email"), true, new NullsFirst());
      let t_2415 = q_2414.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST";
      function fn_2416() {
        return "mixed order";
      }
      test_2411.assert(t_2415, fn_2416);
      return;
    } finally {
      test_2411.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_2417 = new Test_860();
    try {
      let t_2418 = sid_1699("users");
      let t_2419 = sid_1699("colors");
      const q_2420 = from(t_2418).crossJoin(t_2419);
      let t_2421 = q_2420.toSql().toString() === "SELECT * FROM users CROSS JOIN colors";
      function fn_2422() {
        return "cross join";
      }
      test_2417.assert(t_2421, fn_2422);
      return;
    } finally {
      test_2417.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_2423 = new Test_860();
    try {
      let t_2424 = sid_1699("users");
      let t_2425 = sid_1699("orders");
      let t_2426 = new SqlBuilder();
      t_2426.appendSafe("users.id = orders.user_id");
      let t_2427 = t_2426.accumulated;
      const q_2428 = from(t_2424).innerJoin(t_2425, t_2427).crossJoin(sid_1699("colors"));
      let t_2429 = q_2428.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors";
      function fn_2430() {
        return "cross + inner join";
      }
      test_2423.assert(t_2429, fn_2430);
      return;
    } finally {
      test_2423.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_2431 = new Test_860();
    try {
      let t_2432 = sid_1699("users");
      let t_2433 = new SqlBuilder();
      t_2433.appendSafe("id = ");
      t_2433.appendInt32(1);
      let t_2434 = t_2433.accumulated;
      const q_2435 = from(t_2432).where(t_2434).lock(new ForUpdate());
      let t_2436 = q_2435.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE";
      function fn_2437() {
        return "for update";
      }
      test_2431.assert(t_2436, fn_2437);
      return;
    } finally {
      test_2431.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_2438 = new Test_860();
    try {
      let t_2439 = sid_1699("users");
      let t_2440 = sid_1699("name");
      const q_2441 = from(t_2439).select(Object.freeze([t_2440])).lock(new ForShare());
      let t_2442 = q_2441.toSql().toString() === "SELECT name FROM users FOR SHARE";
      function fn_2443() {
        return "for share";
      }
      test_2438.assert(t_2442, fn_2443);
      return;
    } finally {
      test_2438.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_2444 = new Test_860();
    try {
      let t_2445;
      let t_2446;
      let t_2447;
      let t_2448;
      let t_2449;
      let q_2450;
      try {
        t_2445 = sid_1699("accounts");
        t_2446 = new SqlBuilder();
        t_2446.appendSafe("id = ");
        t_2446.appendInt32(42);
        t_2447 = t_2446.accumulated;
        t_2449 = from(t_2445).where(t_2447).limit(1);
        t_2448 = t_2449.lock(new ForUpdate());
        q_2450 = t_2448;
      } catch {
        q_2450 = panic_857();
      }
      let t_2451 = q_2450.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE";
      function fn_2452() {
        return "lock full query";
      }
      test_2444.assert(t_2451, fn_2452);
      return;
    } finally {
      test_2444.softFailToHard();
    }
});
it("query builder immutability - two queries from same base", function () {
    const test_2453 = new Test_860();
    try {
      let t_2454;
      let t_2455;
      let t_2456 = sid_1699("users");
      let t_2457 = new SqlBuilder();
      t_2457.appendSafe("active = ");
      t_2457.appendBoolean(true);
      let t_2458 = t_2457.accumulated;
      const base_2459 = from(t_2456).where(t_2458);
      let q1_2460;
      try {
        t_2454 = base_2459.limit(10);
        q1_2460 = t_2454;
      } catch {
        q1_2460 = panic_857();
      }
      let q2_2461;
      try {
        t_2455 = base_2459.limit(20);
        q2_2461 = t_2455;
      } catch {
        q2_2461 = panic_857();
      }
      let t_2462 = q1_2460.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 10";
      function fn_2463() {
        return "q1";
      }
      test_2453.assert(t_2462, fn_2463);
      let t_2464 = q2_2461.toSql().toString() === "SELECT * FROM users WHERE active = TRUE LIMIT 20";
      function fn_2465() {
        return "q2";
      }
      test_2453.assert(t_2464, fn_2465);
      return;
    } finally {
      test_2453.softFailToHard();
    }
});
it("limit zero produces LIMIT 0", function () {
    const test_2466 = new Test_860();
    try {
      let t_2467;
      let q_2468;
      try {
        t_2467 = from(sid_1699("users")).limit(0);
        q_2468 = t_2467;
      } catch {
        q_2468 = panic_857();
      }
      let t_2469 = q_2468.toSql().toString() === "SELECT * FROM users LIMIT 0";
      function fn_2470() {
        return "limit 0";
      }
      test_2466.assert(t_2469, fn_2470);
      return;
    } finally {
      test_2466.softFailToHard();
    }
});
it("safeToSql with zero defaultLimit", function () {
    const test_2471 = new Test_860();
    try {
      let t_2472;
      const q_2473 = from(sid_1699("users"));
      let s_2474;
      try {
        t_2472 = q_2473.safeToSql(0);
        s_2474 = t_2472;
      } catch {
        s_2474 = panic_857();
      }
      let t_2475 = s_2474.toString() === "SELECT * FROM users LIMIT 0";
      function fn_2476() {
        return "safeToSql 0";
      }
      test_2471.assert(t_2475, fn_2476);
      return;
    } finally {
      test_2471.softFailToHard();
    }
});
it("UpdateQuery limit bubbles on negative", function () {
    const test_2477 = new Test_860();
    try {
      let t_2478;
      let t_2479;
      let t_2480;
      let t_2481;
      let t_2482;
      let didBubble_2483;
      try {
        t_2478 = sid_1699("users");
        t_2479 = sid_1699("name");
        t_2480 = new SqlString("x");
        t_2481 = update(t_2478).set(t_2479, t_2480);
        t_2482 = new SqlBuilder();
        t_2482.appendSafe("id = ");
        t_2482.appendInt32(1);
        t_2481.where(t_2482.accumulated).limit(-1);
        didBubble_2483 = false;
      } catch {
        didBubble_2483 = true;
      }
      function fn_2484() {
        return "UpdateQuery negative limit should bubble";
      }
      test_2477.assert(didBubble_2483, fn_2484);
      return;
    } finally {
      test_2477.softFailToHard();
    }
});
it("DeleteQuery limit bubbles on negative", function () {
    const test_2485 = new Test_860();
    try {
      let t_2486;
      let t_2487;
      let t_2488;
      let didBubble_2489;
      try {
        t_2486 = sid_1699("users");
        t_2487 = new SqlBuilder();
        t_2487.appendSafe("id = ");
        t_2487.appendInt32(1);
        t_2488 = t_2487.accumulated;
        deleteFrom(t_2486).where(t_2488).limit(-1);
        didBubble_2489 = false;
      } catch {
        didBubble_2489 = true;
      }
      function fn_2490() {
        return "DeleteQuery negative limit should bubble";
      }
      test_2485.assert(didBubble_2489, fn_2490);
      return;
    } finally {
      test_2485.softFailToHard();
    }
});
it("UpdateQuery immutability - two from same base", function () {
    const test_2491 = new Test_860();
    try {
      let t_2492;
      let t_2493;
      let t_2494;
      let t_2495;
      let t_2496 = sid_1699("users");
      let t_2497 = sid_1699("name");
      let t_2498 = new SqlString("Alice");
      let t_2499 = update(t_2496).set(t_2497, t_2498);
      let t_2500 = new SqlBuilder();
      t_2500.appendSafe("id = ");
      t_2500.appendInt32(1);
      const base_2501 = t_2499.where(t_2500.accumulated);
      const q1_2502 = base_2501.set(sid_1699("age"), new SqlInt32(25));
      const q2_2503 = base_2501.set(sid_1699("age"), new SqlInt32(30));
      try {
        t_2492 = q1_2502.toSql();
        t_2493 = t_2492;
      } catch {
        t_2493 = panic_857();
      }
      const s1_2504 = t_2493.toString();
      try {
        t_2494 = q2_2503.toSql();
        t_2495 = t_2494;
      } catch {
        t_2495 = panic_857();
      }
      const s2_2505 = t_2495.toString();
      let t_2506 = s1_2504.indexOf("25") >= 0;
      function fn_2507() {
        return "q1 should have 25: " + s1_2504;
      }
      test_2491.assert(t_2506, fn_2507);
      let t_2508 = s2_2505.indexOf("30") >= 0;
      function fn_2509() {
        return "q2 should have 30: " + s2_2505;
      }
      test_2491.assert(t_2508, fn_2509);
      let t_2510 = !(s1_2504.indexOf("30") >= 0);
      function fn_2511() {
        return "q1 should NOT have 30: " + s1_2504;
      }
      test_2491.assert(t_2510, fn_2511);
      return;
    } finally {
      test_2491.softFailToHard();
    }
});
it("DeleteQuery immutability", function () {
    const test_2512 = new Test_860();
    try {
      let t_2513;
      let t_2514;
      let t_2515;
      let t_2516;
      let t_2517 = sid_1699("users");
      let t_2518 = new SqlBuilder();
      t_2518.appendSafe("active = ");
      t_2518.appendBoolean(false);
      let t_2519 = t_2518.accumulated;
      const base_2520 = deleteFrom(t_2517).where(t_2519);
      let t_2521 = new SqlBuilder();
      t_2521.appendSafe("age < ");
      t_2521.appendInt32(18);
      const q1_2522 = base_2520.where(t_2521.accumulated);
      let t_2523 = new SqlBuilder();
      t_2523.appendSafe("age > ");
      t_2523.appendInt32(65);
      const q2_2524 = base_2520.where(t_2523.accumulated);
      try {
        t_2513 = q1_2522.toSql();
        t_2514 = t_2513;
      } catch {
        t_2514 = panic_857();
      }
      const s1_2525 = t_2514.toString();
      try {
        t_2515 = q2_2524.toSql();
        t_2516 = t_2515;
      } catch {
        t_2516 = panic_857();
      }
      const s2_2526 = t_2516.toString();
      let t_2527 = s1_2525.indexOf("age < 18") >= 0;
      function fn_2528() {
        return "q1: " + s1_2525;
      }
      test_2512.assert(t_2527, fn_2528);
      let t_2529 = s2_2526.indexOf("age > 65") >= 0;
      function fn_2530() {
        return "q2: " + s2_2526;
      }
      test_2512.assert(t_2529, fn_2530);
      let t_2531 = !(s1_2525.indexOf("age > 65") >= 0);
      function fn_2532() {
        return "q1 should not have q2 condition: " + s1_2525;
      }
      test_2512.assert(t_2531, fn_2532);
      return;
    } finally {
      test_2512.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_2533 = new Test_860();
    try {
      let t_2534;
      let id_2535;
      try {
        t_2534 = safeIdentifier("user_name");
        id_2535 = t_2534;
      } catch {
        id_2535 = panic_857();
      }
      let t_2536 = id_2535.sqlValue === "user_name";
      function fn_2537() {
        return "value should round-trip";
      }
      test_2533.assert(t_2536, fn_2537);
      return;
    } finally {
      test_2533.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_2538 = new Test_860();
    try {
      let didBubble_2539;
      try {
        safeIdentifier("");
        didBubble_2539 = false;
      } catch {
        didBubble_2539 = true;
      }
      function fn_2540() {
        return "empty string should bubble";
      }
      test_2538.assert(didBubble_2539, fn_2540);
      return;
    } finally {
      test_2538.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_2541 = new Test_860();
    try {
      let didBubble_2542;
      try {
        safeIdentifier("1col");
        didBubble_2542 = false;
      } catch {
        didBubble_2542 = true;
      }
      function fn_2543() {
        return "leading digit should bubble";
      }
      test_2541.assert(didBubble_2542, fn_2543);
      return;
    } finally {
      test_2541.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_2544 = new Test_860();
    try {
      const cases_2545 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_2546(c_2547) {
        let didBubble_2548;
        try {
          safeIdentifier(c_2547);
          didBubble_2548 = false;
        } catch {
          didBubble_2548 = true;
        }
        function fn_2549() {
          return "should reject: " + c_2547;
        }
        test_2544.assert(didBubble_2548, fn_2549);
        return;
      }
      cases_2545.forEach(fn_2546);
      return;
    } finally {
      test_2544.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_2550 = new Test_860();
    try {
      let t_2551;
      let t_2552;
      let t_2553;
      let t_2554;
      let t_2555;
      let t_2556;
      let t_2557;
      try {
        t_2551 = safeIdentifier("users");
        t_2552 = t_2551;
      } catch {
        t_2552 = panic_857();
      }
      try {
        t_2553 = safeIdentifier("name");
        t_2554 = t_2553;
      } catch {
        t_2554 = panic_857();
      }
      let t_2558 = new StringField();
      let t_2559 = new FieldDef(t_2554, t_2558, false, null, false);
      try {
        t_2555 = safeIdentifier("age");
        t_2556 = t_2555;
      } catch {
        t_2556 = panic_857();
      }
      let t_2560 = new IntField();
      let t_2561 = new FieldDef(t_2556, t_2560, false, null, false);
      const td_2562 = new TableDef(t_2552, Object.freeze([t_2559, t_2561]), null);
      let f_2563;
      try {
        t_2557 = td_2562.field("age");
        f_2563 = t_2557;
      } catch {
        f_2563 = panic_857();
      }
      let t_2564 = f_2563.name.sqlValue === "age";
      function fn_2565() {
        return "should find age field";
      }
      test_2550.assert(t_2564, fn_2565);
      return;
    } finally {
      test_2550.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_2566 = new Test_860();
    try {
      let t_2567;
      let t_2568;
      let t_2569;
      let t_2570;
      try {
        t_2567 = safeIdentifier("users");
        t_2568 = t_2567;
      } catch {
        t_2568 = panic_857();
      }
      try {
        t_2569 = safeIdentifier("name");
        t_2570 = t_2569;
      } catch {
        t_2570 = panic_857();
      }
      let t_2571 = new StringField();
      let t_2572 = new FieldDef(t_2570, t_2571, false, null, false);
      const td_2573 = new TableDef(t_2568, Object.freeze([t_2572]), null);
      let didBubble_2574;
      try {
        td_2573.field("nonexistent");
        didBubble_2574 = false;
      } catch {
        didBubble_2574 = true;
      }
      function fn_2575() {
        return "unknown field should bubble";
      }
      test_2566.assert(didBubble_2574, fn_2575);
      return;
    } finally {
      test_2566.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_2576 = new Test_860();
    try {
      let t_2577;
      let t_2578;
      let t_2579;
      let t_2580;
      try {
        t_2577 = safeIdentifier("email");
        t_2578 = t_2577;
      } catch {
        t_2578 = panic_857();
      }
      let t_2581 = new StringField();
      const required_2582 = new FieldDef(t_2578, t_2581, false, null, false);
      try {
        t_2579 = safeIdentifier("bio");
        t_2580 = t_2579;
      } catch {
        t_2580 = panic_857();
      }
      let t_2583 = new StringField();
      const optional_2584 = new FieldDef(t_2580, t_2583, true, null, false);
      let t_2585 = ! required_2582.nullable;
      function fn_2586() {
        return "required field should not be nullable";
      }
      test_2576.assert(t_2585, fn_2586);
      let t_2587 = optional_2584.nullable;
      function fn_2588() {
        return "optional field should be nullable";
      }
      test_2576.assert(t_2587, fn_2588);
      return;
    } finally {
      test_2576.softFailToHard();
    }
});
it("pkName defaults to id when primaryKey is null", function () {
    const test_2589 = new Test_860();
    try {
      let t_2590;
      let t_2591;
      let t_2592;
      let t_2593;
      try {
        t_2590 = safeIdentifier("users");
        t_2591 = t_2590;
      } catch {
        t_2591 = panic_857();
      }
      try {
        t_2592 = safeIdentifier("name");
        t_2593 = t_2592;
      } catch {
        t_2593 = panic_857();
      }
      let t_2594 = new StringField();
      let t_2595 = new FieldDef(t_2593, t_2594, false, null, false);
      const td_2596 = new TableDef(t_2591, Object.freeze([t_2595]), null);
      let t_2597 = td_2596.pkName() === "id";
      function fn_2598() {
        return "default pk should be id";
      }
      test_2589.assert(t_2597, fn_2598);
      return;
    } finally {
      test_2589.softFailToHard();
    }
});
it("pkName returns custom primary key", function () {
    const test_2599 = new Test_860();
    try {
      let t_2600;
      let t_2601;
      let t_2602;
      let t_2603;
      let t_2604;
      let t_2605;
      try {
        t_2600 = safeIdentifier("users");
        t_2601 = t_2600;
      } catch {
        t_2601 = panic_857();
      }
      try {
        t_2602 = safeIdentifier("user_id");
        t_2603 = t_2602;
      } catch {
        t_2603 = panic_857();
      }
      let t_2606 = new IntField();
      let t_2607 = Object.freeze([new FieldDef(t_2603, t_2606, false, null, false)]);
      try {
        t_2604 = safeIdentifier("user_id");
        t_2605 = t_2604;
      } catch {
        t_2605 = panic_857();
      }
      const td_2608 = new TableDef(t_2601, t_2607, t_2605);
      let t_2609 = td_2608.pkName() === "user_id";
      function fn_2610() {
        return "custom pk should be user_id";
      }
      test_2599.assert(t_2609, fn_2610);
      return;
    } finally {
      test_2599.softFailToHard();
    }
});
it("timestamps returns two DateField defs", function () {
    const test_2611 = new Test_860();
    try {
      let t_2612;
      let ts_2613;
      try {
        t_2612 = timestamps();
        ts_2613 = t_2612;
      } catch {
        ts_2613 = panic_857();
      }
      let t_2614 = ts_2613.length === 2;
      function fn_2615() {
        return "should return 2 fields";
      }
      test_2611.assert(t_2614, fn_2615);
      let t_2616 = listedGet_183(ts_2613, 0).name.sqlValue === "inserted_at";
      function fn_2617() {
        return "first should be inserted_at";
      }
      test_2611.assert(t_2616, fn_2617);
      let t_2618 = listedGet_183(ts_2613, 1).name.sqlValue === "updated_at";
      function fn_2619() {
        return "second should be updated_at";
      }
      test_2611.assert(t_2618, fn_2619);
      let t_2620 = listedGet_183(ts_2613, 0).nullable;
      function fn_2621() {
        return "inserted_at should be nullable";
      }
      test_2611.assert(t_2620, fn_2621);
      let t_2622 = listedGet_183(ts_2613, 1).nullable;
      function fn_2623() {
        return "updated_at should be nullable";
      }
      test_2611.assert(t_2622, fn_2623);
      let t_2624 = !(listedGet_183(ts_2613, 0).defaultValue == null);
      function fn_2625() {
        return "inserted_at should have default";
      }
      test_2611.assert(t_2624, fn_2625);
      let t_2626 = !(listedGet_183(ts_2613, 1).defaultValue == null);
      function fn_2627() {
        return "updated_at should have default";
      }
      test_2611.assert(t_2626, fn_2627);
      return;
    } finally {
      test_2611.softFailToHard();
    }
});
it("FieldDef defaultValue field", function () {
    const test_2628 = new Test_860();
    try {
      let t_2629;
      let t_2630;
      let t_2631;
      let t_2632;
      try {
        t_2629 = safeIdentifier("status");
        t_2630 = t_2629;
      } catch {
        t_2630 = panic_857();
      }
      let t_2633 = new StringField();
      let t_2634 = new SqlDefault();
      const withDefault_2635 = new FieldDef(t_2630, t_2633, false, t_2634, false);
      try {
        t_2631 = safeIdentifier("name");
        t_2632 = t_2631;
      } catch {
        t_2632 = panic_857();
      }
      let t_2636 = new StringField();
      const withoutDefault_2637 = new FieldDef(t_2632, t_2636, false, null, false);
      let t_2638 = !(withDefault_2635.defaultValue == null);
      function fn_2639() {
        return "should have default";
      }
      test_2628.assert(t_2638, fn_2639);
      let t_2640 = withoutDefault_2637.defaultValue == null;
      function fn_2641() {
        return "should not have default";
      }
      test_2628.assert(t_2640, fn_2641);
      return;
    } finally {
      test_2628.softFailToHard();
    }
});
it("FieldDef virtual flag", function () {
    const test_2642 = new Test_860();
    try {
      let t_2643;
      let t_2644;
      let t_2645;
      let t_2646;
      try {
        t_2643 = safeIdentifier("name");
        t_2644 = t_2643;
      } catch {
        t_2644 = panic_857();
      }
      let t_2647 = new StringField();
      const normal_2648 = new FieldDef(t_2644, t_2647, false, null, false);
      try {
        t_2645 = safeIdentifier("full_name");
        t_2646 = t_2645;
      } catch {
        t_2646 = panic_857();
      }
      let t_2649 = new StringField();
      const virt_2650 = new FieldDef(t_2646, t_2649, true, null, true);
      let t_2651 = ! normal_2648.virtual;
      function fn_2652() {
        return "normal field should not be virtual";
      }
      test_2642.assert(t_2651, fn_2652);
      let t_2653 = virt_2650.virtual;
      function fn_2654() {
        return "virtual field should be virtual";
      }
      test_2642.assert(t_2653, fn_2654);
      return;
    } finally {
      test_2642.softFailToHard();
    }
});
it("safeIdentifier accepts single character names", function () {
    const test_2655 = new Test_860();
    try {
      let t_2656;
      let t_2657;
      let a_2658;
      try {
        t_2656 = safeIdentifier("a");
        a_2658 = t_2656;
      } catch {
        a_2658 = panic_857();
      }
      let t_2659 = a_2658.sqlValue === "a";
      function fn_2660() {
        return "single letter should work";
      }
      test_2655.assert(t_2659, fn_2660);
      let u_2661;
      try {
        t_2657 = safeIdentifier("_");
        u_2661 = t_2657;
      } catch {
        u_2661 = panic_857();
      }
      let t_2662 = u_2661.sqlValue === "_";
      function fn_2663() {
        return "single underscore should work";
      }
      test_2655.assert(t_2662, fn_2663);
      return;
    } finally {
      test_2655.softFailToHard();
    }
});
it("safeIdentifier accepts all-underscore names", function () {
    const test_2664 = new Test_860();
    try {
      let t_2665;
      let id_2666;
      try {
        t_2665 = safeIdentifier("___");
        id_2666 = t_2665;
      } catch {
        id_2666 = panic_857();
      }
      let t_2667 = id_2666.sqlValue === "___";
      function fn_2668() {
        return "all underscores should work";
      }
      test_2664.assert(t_2667, fn_2668);
      return;
    } finally {
      test_2664.softFailToHard();
    }
});
it("TableDef with empty field list", function () {
    const test_2669 = new Test_860();
    try {
      let t_2670;
      let t_2671;
      try {
        t_2670 = safeIdentifier("empty");
        t_2671 = t_2670;
      } catch {
        t_2671 = panic_857();
      }
      const tbl_2672 = new TableDef(t_2671, Object.freeze([]), null);
      let didBubble_2673;
      try {
        tbl_2672.field("anything");
        didBubble_2673 = false;
      } catch {
        didBubble_2673 = true;
      }
      function fn_2674() {
        return "field lookup on empty table should bubble";
      }
      test_2669.assert(didBubble_2673, fn_2674);
      return;
    } finally {
      test_2669.softFailToHard();
    }
});
it("string escaping", function () {
    const test_2675 = new Test_860();
    try {
      function build_2676(name_2677) {
        let t_2678 = new SqlBuilder();
        t_2678.appendSafe("select * from hi where name = ");
        t_2678.appendString(name_2677);
        return t_2678.accumulated.toString();
      }
      function buildWrong_2679(name_2680) {
        return "select * from hi where name = '" + name_2680 + "'";
      }
      const actual_2681 = build_2676("world");
      let t_2682 = actual_2681 === "select * from hi where name = 'world'";
      function fn_2683() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_2681 + ")";
      }
      test_2675.assert(t_2682, fn_2683);
      const bobbyTables_2684 = "Robert'); drop table hi;--";
      const actual_2685 = build_2676("Robert'); drop table hi;--");
      let t_2686 = actual_2685 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_2687() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_2685 + ")";
      }
      test_2675.assert(t_2686, fn_2687);
      function fn_2688() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_2675.assert(true, fn_2688);
      return;
    } finally {
      test_2675.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_2689 = new Test_860();
    try {
      let t_2690 = new SqlBuilder();
      t_2690.appendSafe("v = ");
      t_2690.appendString("");
      const actual_2691 = t_2690.accumulated.toString();
      let t_2692 = actual_2691 === "v = ''";
      function fn_2693() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_2691 + ")";
      }
      test_2689.assert(t_2692, fn_2693);
      let t_2694 = new SqlBuilder();
      t_2694.appendSafe("v = ");
      t_2694.appendString("a''b");
      const actual_2695 = t_2694.accumulated.toString();
      let t_2696 = actual_2695 === "v = 'a''''b'";
      function fn_2697() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_2695 + ")";
      }
      test_2689.assert(t_2696, fn_2697);
      let t_2698 = new SqlBuilder();
      t_2698.appendSafe("v = ");
      t_2698.appendString("Hello 世界");
      const actual_2699 = t_2698.accumulated.toString();
      let t_2700 = actual_2699 === "v = 'Hello 世界'";
      function fn_2701() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_2699 + ")";
      }
      test_2689.assert(t_2700, fn_2701);
      let t_2702 = new SqlBuilder();
      t_2702.appendSafe("v = ");
      t_2702.appendString("Line1\nLine2");
      const actual_2703 = t_2702.accumulated.toString();
      let t_2704 = actual_2703 === "v = 'Line1\nLine2'";
      function fn_2705() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_2703 + ")";
      }
      test_2689.assert(t_2704, fn_2705);
      return;
    } finally {
      test_2689.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_2706 = new Test_860();
    try {
      let t_2707;
      let t_2708 = new SqlBuilder();
      t_2708.appendSafe("select ");
      t_2708.appendInt32(42);
      t_2708.appendSafe(", ");
      t_2708.appendInt64(BigInt("43"));
      t_2708.appendSafe(", ");
      t_2708.appendFloat64(19.99);
      t_2708.appendSafe(", ");
      t_2708.appendBoolean(true);
      t_2708.appendSafe(", ");
      t_2708.appendBoolean(false);
      const actual_2709 = t_2708.accumulated.toString();
      let t_2710 = actual_2709 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_2711() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_2709 + ")";
      }
      test_2706.assert(t_2710, fn_2711);
      let date_2712;
      try {
        t_2707 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_2712 = t_2707;
      } catch {
        date_2712 = panic_857();
      }
      let t_2713 = new SqlBuilder();
      t_2713.appendSafe("insert into t values (");
      t_2713.appendDate(date_2712);
      t_2713.appendSafe(")");
      const actual_2714 = t_2713.accumulated.toString();
      let t_2715 = actual_2714 === "insert into t values ('2024-12-25')";
      function fn_2716() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_2714 + ")";
      }
      test_2706.assert(t_2715, fn_2716);
      return;
    } finally {
      test_2706.softFailToHard();
    }
});
it("lists", function () {
    const test_2717 = new Test_860();
    try {
      let t_2718;
      let t_2719;
      let t_2720;
      let t_2721;
      let t_2722 = new SqlBuilder();
      t_2722.appendSafe("v IN (");
      t_2722.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_2722.appendSafe(")");
      const actual_2723 = t_2722.accumulated.toString();
      let t_2724 = actual_2723 === "v IN ('a', 'b', 'c''d')";
      function fn_2725() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_2723 + ")";
      }
      test_2717.assert(t_2724, fn_2725);
      let t_2726 = new SqlBuilder();
      t_2726.appendSafe("v IN (");
      t_2726.appendInt32List(Object.freeze([1, 2, 3]));
      t_2726.appendSafe(")");
      const actual_2727 = t_2726.accumulated.toString();
      let t_2728 = actual_2727 === "v IN (1, 2, 3)";
      function fn_2729() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_2727 + ")";
      }
      test_2717.assert(t_2728, fn_2729);
      let t_2730 = new SqlBuilder();
      t_2730.appendSafe("v IN (");
      t_2730.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_2730.appendSafe(")");
      const actual_2731 = t_2730.accumulated.toString();
      let t_2732 = actual_2731 === "v IN (1, 2)";
      function fn_2733() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_2731 + ")";
      }
      test_2717.assert(t_2732, fn_2733);
      let t_2734 = new SqlBuilder();
      t_2734.appendSafe("v IN (");
      t_2734.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_2734.appendSafe(")");
      const actual_2735 = t_2734.accumulated.toString();
      let t_2736 = actual_2735 === "v IN (1.0, 2.0)";
      function fn_2737() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_2735 + ")";
      }
      test_2717.assert(t_2736, fn_2737);
      let t_2738 = new SqlBuilder();
      t_2738.appendSafe("v IN (");
      t_2738.appendBooleanList(Object.freeze([true, false]));
      t_2738.appendSafe(")");
      const actual_2739 = t_2738.accumulated.toString();
      let t_2740 = actual_2739 === "v IN (TRUE, FALSE)";
      function fn_2741() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_2739 + ")";
      }
      test_2717.assert(t_2740, fn_2741);
      try {
        t_2718 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_2719 = t_2718;
      } catch {
        t_2719 = panic_857();
      }
      try {
        t_2720 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_2721 = t_2720;
      } catch {
        t_2721 = panic_857();
      }
      const dates_2742 = Object.freeze([t_2719, t_2721]);
      let t_2743 = new SqlBuilder();
      t_2743.appendSafe("v IN (");
      t_2743.appendDateList(dates_2742);
      t_2743.appendSafe(")");
      const actual_2744 = t_2743.accumulated.toString();
      let t_2745 = actual_2744 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_2746() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_2744 + ")";
      }
      test_2717.assert(t_2745, fn_2746);
      return;
    } finally {
      test_2717.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_2747 = new Test_860();
    try {
      let nan_2748;
      nan_2748 = 0.0 / 0.0;
      let t_2749 = new SqlBuilder();
      t_2749.appendSafe("v = ");
      t_2749.appendFloat64(nan_2748);
      const actual_2750 = t_2749.accumulated.toString();
      let t_2751 = actual_2750 === "v = NULL";
      function fn_2752() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_2750 + ")";
      }
      test_2747.assert(t_2751, fn_2752);
      return;
    } finally {
      test_2747.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_2753 = new Test_860();
    try {
      let inf_2754;
      inf_2754 = 1.0 / 0.0;
      let t_2755 = new SqlBuilder();
      t_2755.appendSafe("v = ");
      t_2755.appendFloat64(inf_2754);
      const actual_2756 = t_2755.accumulated.toString();
      let t_2757 = actual_2756 === "v = NULL";
      function fn_2758() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_2756 + ")";
      }
      test_2753.assert(t_2757, fn_2758);
      return;
    } finally {
      test_2753.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_2759 = new Test_860();
    try {
      let ninf_2760;
      ninf_2760 = -1.0 / 0.0;
      let t_2761 = new SqlBuilder();
      t_2761.appendSafe("v = ");
      t_2761.appendFloat64(ninf_2760);
      const actual_2762 = t_2761.accumulated.toString();
      let t_2763 = actual_2762 === "v = NULL";
      function fn_2764() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_2762 + ")";
      }
      test_2759.assert(t_2763, fn_2764);
      return;
    } finally {
      test_2759.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_2765 = new Test_860();
    try {
      let t_2766 = new SqlBuilder();
      t_2766.appendSafe("v = ");
      t_2766.appendFloat64(3.14);
      const actual_2767 = t_2766.accumulated.toString();
      let t_2768 = actual_2767 === "v = 3.14";
      function fn_2769() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_2767 + ")";
      }
      test_2765.assert(t_2768, fn_2769);
      let t_2770 = new SqlBuilder();
      t_2770.appendSafe("v = ");
      t_2770.appendFloat64(0.0);
      const actual_2771 = t_2770.accumulated.toString();
      let t_2772 = actual_2771 === "v = 0.0";
      function fn_2773() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_2771 + ")";
      }
      test_2765.assert(t_2772, fn_2773);
      let t_2774 = new SqlBuilder();
      t_2774.appendSafe("v = ");
      t_2774.appendFloat64(-42.5);
      const actual_2775 = t_2774.accumulated.toString();
      let t_2776 = actual_2775 === "v = -42.5";
      function fn_2777() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_2775 + ")";
      }
      test_2765.assert(t_2776, fn_2777);
      return;
    } finally {
      test_2765.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_2778 = new Test_860();
    try {
      let t_2779;
      let d_2780;
      try {
        t_2779 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_2780 = t_2779;
      } catch {
        d_2780 = panic_857();
      }
      let t_2781 = new SqlBuilder();
      t_2781.appendSafe("v = ");
      t_2781.appendDate(d_2780);
      const actual_2782 = t_2781.accumulated.toString();
      let t_2783 = actual_2782 === "v = '2024-06-15'";
      function fn_2784() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_2782 + ")";
      }
      test_2778.assert(t_2783, fn_2784);
      return;
    } finally {
      test_2778.softFailToHard();
    }
});
it("nesting", function () {
    const test_2785 = new Test_860();
    try {
      const name_2786 = "Someone";
      let t_2787 = new SqlBuilder();
      t_2787.appendSafe("where p.last_name = ");
      t_2787.appendString("Someone");
      const condition_2788 = t_2787.accumulated;
      let t_2789 = new SqlBuilder();
      t_2789.appendSafe("select p.id from person p ");
      t_2789.appendFragment(condition_2788);
      const actual_2790 = t_2789.accumulated.toString();
      let t_2791 = actual_2790 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2792() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2790 + ")";
      }
      test_2785.assert(t_2791, fn_2792);
      let t_2793 = new SqlBuilder();
      t_2793.appendSafe("select p.id from person p ");
      t_2793.appendPart(condition_2788.toSource());
      const actual_2794 = t_2793.accumulated.toString();
      let t_2795 = actual_2794 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2796() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2794 + ")";
      }
      test_2785.assert(t_2795, fn_2796);
      const parts_2797 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_2798 = new SqlBuilder();
      t_2798.appendSafe("select ");
      t_2798.appendPartList(parts_2797);
      const actual_2799 = t_2798.accumulated.toString();
      let t_2800 = actual_2799 === "select 'a''b', 3";
      function fn_2801() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_2799 + ")";
      }
      test_2785.assert(t_2800, fn_2801);
      return;
    } finally {
      test_2785.softFailToHard();
    }
});
it("SqlInt32 negative and zero values", function () {
    const test_2802 = new Test_860();
    try {
      let t_2803 = new SqlBuilder();
      t_2803.appendSafe("v = ");
      t_2803.appendInt32(-42);
      let t_2804 = t_2803.accumulated.toString() === "v = -42";
      function fn_2805() {
        return "negative int";
      }
      test_2802.assert(t_2804, fn_2805);
      let t_2806 = new SqlBuilder();
      t_2806.appendSafe("v = ");
      t_2806.appendInt32(0);
      let t_2807 = t_2806.accumulated.toString() === "v = 0";
      function fn_2808() {
        return "zero int";
      }
      test_2802.assert(t_2807, fn_2808);
      return;
    } finally {
      test_2802.softFailToHard();
    }
});
it("SqlInt64 negative value", function () {
    const test_2809 = new Test_860();
    try {
      let t_2810 = new SqlBuilder();
      t_2810.appendSafe("v = ");
      t_2810.appendInt64(BigInt("-99"));
      let t_2811 = t_2810.accumulated.toString() === "v = -99";
      function fn_2812() {
        return "negative int64";
      }
      test_2809.assert(t_2811, fn_2812);
      return;
    } finally {
      test_2809.softFailToHard();
    }
});
it("single element list rendering", function () {
    const test_2813 = new Test_860();
    try {
      let t_2814 = new SqlBuilder();
      t_2814.appendSafe("v IN (");
      t_2814.appendInt32List(Object.freeze([42]));
      t_2814.appendSafe(")");
      let t_2815 = t_2814.accumulated.toString() === "v IN (42)";
      function fn_2816() {
        return "single int";
      }
      test_2813.assert(t_2815, fn_2816);
      let t_2817 = new SqlBuilder();
      t_2817.appendSafe("v IN (");
      t_2817.appendStringList(Object.freeze(["only"]));
      t_2817.appendSafe(")");
      let t_2818 = t_2817.accumulated.toString() === "v IN ('only')";
      function fn_2819() {
        return "single string";
      }
      test_2813.assert(t_2818, fn_2819);
      return;
    } finally {
      test_2813.softFailToHard();
    }
});
it("SqlDefault renders DEFAULT keyword", function () {
    const test_2820 = new Test_860();
    try {
      const b_2821 = new SqlBuilder();
      b_2821.appendSafe("v = ");
      b_2821.appendPart(new SqlDefault());
      let t_2822 = b_2821.accumulated.toString() === "v = DEFAULT";
      function fn_2823() {
        return "default keyword";
      }
      test_2820.assert(t_2822, fn_2823);
      return;
    } finally {
      test_2820.softFailToHard();
    }
});
it("SqlString with backslash", function () {
    const test_2824 = new Test_860();
    try {
      let t_2825 = new SqlBuilder();
      t_2825.appendSafe("v = ");
      t_2825.appendString("a\\b");
      let t_2826 = t_2825.accumulated.toString() === "v = 'a\\b'";
      function fn_2827() {
        return "backslash passthrough";
      }
      test_2824.assert(t_2826, fn_2827);
      return;
    } finally {
      test_2824.softFailToHard();
    }
});
