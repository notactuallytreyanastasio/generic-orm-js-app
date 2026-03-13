import {
  BoolField, FieldDef, FloatField, ForShare, ForUpdate, IntField, NullsFirst, NullsLast, NumberValidationOpts, SafeIdentifier, SqlBoolean, SqlBuilder, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, deleteFrom, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, unionAllSql, unionSql, update
} from "../src.js";
import {
  Test as Test_921
} from "@temperlang/std/testing";
import {
  panic as panic_918, mapConstructor as mapConstructor_901, pairConstructor as pairConstructor_923, listedGet as listedGet_197, mappedGetOr as mappedGetOr_94
} from "@temperlang/core";
/**
 * @param {string} name_915
 * @returns {SafeIdentifier}
 */
function csid_914(name_915) {
  let return_916;
  let t_917;
  try {
    t_917 = safeIdentifier(name_915);
    return_916 = t_917;
  } catch {
    return_916 = panic_918();
  }
  return return_916;
}
/** @returns {TableDef} */
function userTable_919() {
  return new TableDef(csid_914("users"), Object.freeze([new FieldDef(csid_914("name"), new StringField(), false), new FieldDef(csid_914("email"), new StringField(), false), new FieldDef(csid_914("age"), new IntField(), true), new FieldDef(csid_914("score"), new FloatField(), true), new FieldDef(csid_914("active"), new BoolField(), true)]));
}
it("cast whitelists allowed fields", function () {
    const test_920 = new Test_921();
    try {
      const params_922 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice"), pairConstructor_923("email", "alice@example.com"), pairConstructor_923("admin", "true")]));
      let t_924 = userTable_919();
      let t_925 = csid_914("name");
      let t_926 = csid_914("email");
      const cs_927 = changeset(t_924, params_922).cast(Object.freeze([t_925, t_926]));
      let t_928 = cs_927.changes.has("name");
      function fn_929() {
        return "name should be in changes";
      }
      test_920.assert(t_928, fn_929);
      let t_930 = cs_927.changes.has("email");
      function fn_931() {
        return "email should be in changes";
      }
      test_920.assert(t_930, fn_931);
      let t_932 = ! cs_927.changes.has("admin");
      function fn_933() {
        return "admin must be dropped (not in whitelist)";
      }
      test_920.assert(t_932, fn_933);
      let t_934 = cs_927.isValid;
      function fn_935() {
        return "should still be valid";
      }
      test_920.assert(t_934, fn_935);
      return;
    } finally {
      test_920.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_936 = new Test_921();
    try {
      const params_937 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice"), pairConstructor_923("email", "alice@example.com")]));
      let t_938 = userTable_919();
      let t_939 = csid_914("name");
      const cs_940 = changeset(t_938, params_937).cast(Object.freeze([t_939])).cast(Object.freeze([csid_914("email")]));
      let t_941 = ! cs_940.changes.has("name");
      function fn_942() {
        return "name must be excluded by second cast";
      }
      test_936.assert(t_941, fn_942);
      let t_943 = cs_940.changes.has("email");
      function fn_944() {
        return "email should be present";
      }
      test_936.assert(t_943, fn_944);
      return;
    } finally {
      test_936.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_945 = new Test_921();
    try {
      const params_946 = mapConstructor_901(Object.freeze([pairConstructor_923("name", ""), pairConstructor_923("email", "bob@example.com")]));
      let t_947 = userTable_919();
      let t_948 = csid_914("name");
      let t_949 = csid_914("email");
      const cs_950 = changeset(t_947, params_946).cast(Object.freeze([t_948, t_949]));
      let t_951 = ! cs_950.changes.has("name");
      function fn_952() {
        return "empty name should not be in changes";
      }
      test_945.assert(t_951, fn_952);
      let t_953 = cs_950.changes.has("email");
      function fn_954() {
        return "email should be in changes";
      }
      test_945.assert(t_953, fn_954);
      return;
    } finally {
      test_945.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_955 = new Test_921();
    try {
      const params_956 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_957 = userTable_919();
      let t_958 = csid_914("name");
      const cs_959 = changeset(t_957, params_956).cast(Object.freeze([t_958])).validateRequired(Object.freeze([csid_914("name")]));
      let t_960 = cs_959.isValid;
      function fn_961() {
        return "should be valid";
      }
      test_955.assert(t_960, fn_961);
      let t_962 = cs_959.errors.length === 0;
      function fn_963() {
        return "no errors expected";
      }
      test_955.assert(t_962, fn_963);
      return;
    } finally {
      test_955.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_964 = new Test_921();
    try {
      const params_965 = mapConstructor_901(Object.freeze([]));
      let t_966 = userTable_919();
      let t_967 = csid_914("name");
      const cs_968 = changeset(t_966, params_965).cast(Object.freeze([t_967])).validateRequired(Object.freeze([csid_914("name")]));
      let t_969 = ! cs_968.isValid;
      function fn_970() {
        return "should be invalid";
      }
      test_964.assert(t_969, fn_970);
      let t_971 = cs_968.errors.length === 1;
      function fn_972() {
        return "should have one error";
      }
      test_964.assert(t_971, fn_972);
      let t_973 = listedGet_197(cs_968.errors, 0).field === "name";
      function fn_974() {
        return "error should name the field";
      }
      test_964.assert(t_973, fn_974);
      return;
    } finally {
      test_964.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_975 = new Test_921();
    try {
      const params_976 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_977 = userTable_919();
      let t_978 = csid_914("name");
      const cs_979 = changeset(t_977, params_976).cast(Object.freeze([t_978])).validateLength(csid_914("name"), 2, 50);
      let t_980 = cs_979.isValid;
      function fn_981() {
        return "should be valid";
      }
      test_975.assert(t_980, fn_981);
      return;
    } finally {
      test_975.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_982 = new Test_921();
    try {
      const params_983 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "A")]));
      let t_984 = userTable_919();
      let t_985 = csid_914("name");
      const cs_986 = changeset(t_984, params_983).cast(Object.freeze([t_985])).validateLength(csid_914("name"), 2, 50);
      let t_987 = ! cs_986.isValid;
      function fn_988() {
        return "should be invalid";
      }
      test_982.assert(t_987, fn_988);
      return;
    } finally {
      test_982.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_989 = new Test_921();
    try {
      const params_990 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_991 = userTable_919();
      let t_992 = csid_914("name");
      const cs_993 = changeset(t_991, params_990).cast(Object.freeze([t_992])).validateLength(csid_914("name"), 2, 10);
      let t_994 = ! cs_993.isValid;
      function fn_995() {
        return "should be invalid";
      }
      test_989.assert(t_994, fn_995);
      return;
    } finally {
      test_989.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_996 = new Test_921();
    try {
      const params_997 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "30")]));
      let t_998 = userTable_919();
      let t_999 = csid_914("age");
      const cs_1000 = changeset(t_998, params_997).cast(Object.freeze([t_999])).validateInt(csid_914("age"));
      let t_1001 = cs_1000.isValid;
      function fn_1002() {
        return "should be valid";
      }
      test_996.assert(t_1001, fn_1002);
      return;
    } finally {
      test_996.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_1003 = new Test_921();
    try {
      const params_1004 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "not-a-number")]));
      let t_1005 = userTable_919();
      let t_1006 = csid_914("age");
      const cs_1007 = changeset(t_1005, params_1004).cast(Object.freeze([t_1006])).validateInt(csid_914("age"));
      let t_1008 = ! cs_1007.isValid;
      function fn_1009() {
        return "should be invalid";
      }
      test_1003.assert(t_1008, fn_1009);
      return;
    } finally {
      test_1003.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_1010 = new Test_921();
    try {
      const params_1011 = mapConstructor_901(Object.freeze([pairConstructor_923("score", "9.5")]));
      let t_1012 = userTable_919();
      let t_1013 = csid_914("score");
      const cs_1014 = changeset(t_1012, params_1011).cast(Object.freeze([t_1013])).validateFloat(csid_914("score"));
      let t_1015 = cs_1014.isValid;
      function fn_1016() {
        return "should be valid";
      }
      test_1010.assert(t_1015, fn_1016);
      return;
    } finally {
      test_1010.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_1017 = new Test_921();
    try {
      const params_1018 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "9999999999")]));
      let t_1019 = userTable_919();
      let t_1020 = csid_914("age");
      const cs_1021 = changeset(t_1019, params_1018).cast(Object.freeze([t_1020])).validateInt64(csid_914("age"));
      let t_1022 = cs_1021.isValid;
      function fn_1023() {
        return "should be valid";
      }
      test_1017.assert(t_1022, fn_1023);
      return;
    } finally {
      test_1017.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_1024 = new Test_921();
    try {
      const params_1025 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "not-a-number")]));
      let t_1026 = userTable_919();
      let t_1027 = csid_914("age");
      const cs_1028 = changeset(t_1026, params_1025).cast(Object.freeze([t_1027])).validateInt64(csid_914("age"));
      let t_1029 = ! cs_1028.isValid;
      function fn_1030() {
        return "should be invalid";
      }
      test_1024.assert(t_1029, fn_1030);
      return;
    } finally {
      test_1024.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_1031 = new Test_921();
    try {
      function fn_1032(v_1033) {
        const params_1034 = mapConstructor_901(Object.freeze([pairConstructor_923("active", v_1033)]));
        let t_1035 = userTable_919();
        let t_1036 = csid_914("active");
        const cs_1037 = changeset(t_1035, params_1034).cast(Object.freeze([t_1036])).validateBool(csid_914("active"));
        let t_1038 = cs_1037.isValid;
        function fn_1039() {
          return "should accept: " + v_1033;
        }
        test_1031.assert(t_1038, fn_1039);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_1032);
      return;
    } finally {
      test_1031.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_1040 = new Test_921();
    try {
      function fn_1041(v_1042) {
        const params_1043 = mapConstructor_901(Object.freeze([pairConstructor_923("active", v_1042)]));
        let t_1044 = userTable_919();
        let t_1045 = csid_914("active");
        const cs_1046 = changeset(t_1044, params_1043).cast(Object.freeze([t_1045])).validateBool(csid_914("active"));
        let t_1047 = cs_1046.isValid;
        function fn_1048() {
          return "should accept: " + v_1042;
        }
        test_1040.assert(t_1047, fn_1048);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_1041);
      return;
    } finally {
      test_1040.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_1049 = new Test_921();
    try {
      function fn_1050(v_1051) {
        const params_1052 = mapConstructor_901(Object.freeze([pairConstructor_923("active", v_1051)]));
        let t_1053 = userTable_919();
        let t_1054 = csid_914("active");
        const cs_1055 = changeset(t_1053, params_1052).cast(Object.freeze([t_1054])).validateBool(csid_914("active"));
        let t_1056 = ! cs_1055.isValid;
        function fn_1057() {
          return "should reject ambiguous: " + v_1051;
        }
        test_1049.assert(t_1056, fn_1057);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_1050);
      return;
    } finally {
      test_1049.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_1058 = new Test_921();
    try {
      let t_1059;
      const params_1060 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Robert'); DROP TABLE users;--"), pairConstructor_923("email", "bobby@evil.com")]));
      let t_1061 = userTable_919();
      let t_1062 = csid_914("name");
      let t_1063 = csid_914("email");
      const cs_1064 = changeset(t_1061, params_1060).cast(Object.freeze([t_1062, t_1063])).validateRequired(Object.freeze([csid_914("name"), csid_914("email")]));
      let sqlFrag_1065;
      try {
        t_1059 = cs_1064.toInsertSql();
        sqlFrag_1065 = t_1059;
      } catch {
        sqlFrag_1065 = panic_918();
      }
      const s_1066 = sqlFrag_1065.toString();
      let t_1067 = s_1066.indexOf("''") >= 0;
      function fn_1068() {
        return "single quote must be doubled: " + s_1066;
      }
      test_1058.assert(t_1067, fn_1068);
      return;
    } finally {
      test_1058.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_1069 = new Test_921();
    try {
      let t_1070;
      const params_1071 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice"), pairConstructor_923("email", "a@example.com")]));
      let t_1072 = userTable_919();
      let t_1073 = csid_914("name");
      let t_1074 = csid_914("email");
      const cs_1075 = changeset(t_1072, params_1071).cast(Object.freeze([t_1073, t_1074])).validateRequired(Object.freeze([csid_914("name"), csid_914("email")]));
      let sqlFrag_1076;
      try {
        t_1070 = cs_1075.toInsertSql();
        sqlFrag_1076 = t_1070;
      } catch {
        sqlFrag_1076 = panic_918();
      }
      const s_1077 = sqlFrag_1076.toString();
      let t_1078 = s_1077.indexOf("INSERT INTO users") >= 0;
      function fn_1079() {
        return "has INSERT INTO: " + s_1077;
      }
      test_1069.assert(t_1078, fn_1079);
      let t_1080 = s_1077.indexOf("'Alice'") >= 0;
      function fn_1081() {
        return "has quoted name: " + s_1077;
      }
      test_1069.assert(t_1080, fn_1081);
      return;
    } finally {
      test_1069.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_1082 = new Test_921();
    try {
      let t_1083;
      const params_1084 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Bob"), pairConstructor_923("email", "b@example.com"), pairConstructor_923("age", "25")]));
      let t_1085 = userTable_919();
      let t_1086 = csid_914("name");
      let t_1087 = csid_914("email");
      let t_1088 = csid_914("age");
      const cs_1089 = changeset(t_1085, params_1084).cast(Object.freeze([t_1086, t_1087, t_1088])).validateRequired(Object.freeze([csid_914("name"), csid_914("email")]));
      let sqlFrag_1090;
      try {
        t_1083 = cs_1089.toInsertSql();
        sqlFrag_1090 = t_1083;
      } catch {
        sqlFrag_1090 = panic_918();
      }
      const s_1091 = sqlFrag_1090.toString();
      let t_1092 = s_1091.indexOf("25") >= 0;
      function fn_1093() {
        return "age rendered unquoted: " + s_1091;
      }
      test_1082.assert(t_1092, fn_1093);
      return;
    } finally {
      test_1082.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_1094 = new Test_921();
    try {
      const params_1095 = mapConstructor_901(Object.freeze([]));
      let t_1096 = userTable_919();
      let t_1097 = csid_914("name");
      const cs_1098 = changeset(t_1096, params_1095).cast(Object.freeze([t_1097])).validateRequired(Object.freeze([csid_914("name")]));
      let didBubble_1099;
      try {
        cs_1098.toInsertSql();
        didBubble_1099 = false;
      } catch {
        didBubble_1099 = true;
      }
      function fn_1100() {
        return "invalid changeset should bubble";
      }
      test_1094.assert(didBubble_1099, fn_1100);
      return;
    } finally {
      test_1094.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_1101 = new Test_921();
    try {
      const strictTable_1102 = new TableDef(csid_914("posts"), Object.freeze([new FieldDef(csid_914("title"), new StringField(), false), new FieldDef(csid_914("body"), new StringField(), true)]));
      const params_1103 = mapConstructor_901(Object.freeze([pairConstructor_923("body", "hello")]));
      let t_1104 = csid_914("body");
      const cs_1105 = changeset(strictTable_1102, params_1103).cast(Object.freeze([t_1104]));
      let t_1106 = cs_1105.isValid;
      function fn_1107() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_1101.assert(t_1106, fn_1107);
      let didBubble_1108;
      try {
        cs_1105.toInsertSql();
        didBubble_1108 = false;
      } catch {
        didBubble_1108 = true;
      }
      function fn_1109() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_1101.assert(didBubble_1108, fn_1109);
      return;
    } finally {
      test_1101.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_1110 = new Test_921();
    try {
      let t_1111;
      const params_1112 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Bob")]));
      let t_1113 = userTable_919();
      let t_1114 = csid_914("name");
      const cs_1115 = changeset(t_1113, params_1112).cast(Object.freeze([t_1114])).validateRequired(Object.freeze([csid_914("name")]));
      let sqlFrag_1116;
      try {
        t_1111 = cs_1115.toUpdateSql(42);
        sqlFrag_1116 = t_1111;
      } catch {
        sqlFrag_1116 = panic_918();
      }
      const s_1117 = sqlFrag_1116.toString();
      let t_1118 = s_1117 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_1119() {
        return "got: " + s_1117;
      }
      test_1110.assert(t_1118, fn_1119);
      return;
    } finally {
      test_1110.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_1120 = new Test_921();
    try {
      const params_1121 = mapConstructor_901(Object.freeze([]));
      let t_1122 = userTable_919();
      let t_1123 = csid_914("name");
      const cs_1124 = changeset(t_1122, params_1121).cast(Object.freeze([t_1123])).validateRequired(Object.freeze([csid_914("name")]));
      let didBubble_1125;
      try {
        cs_1124.toUpdateSql(1);
        didBubble_1125 = false;
      } catch {
        didBubble_1125 = true;
      }
      function fn_1126() {
        return "invalid changeset should bubble";
      }
      test_1120.assert(didBubble_1125, fn_1126);
      return;
    } finally {
      test_1120.softFailToHard();
    }
});
it("putChange adds a new field", function () {
    const test_1127 = new Test_921();
    try {
      const params_1128 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1129 = userTable_919();
      let t_1130 = csid_914("name");
      const cs_1131 = changeset(t_1129, params_1128).cast(Object.freeze([t_1130])).putChange(csid_914("email"), "alice@example.com");
      let t_1132 = cs_1131.changes.has("email");
      function fn_1133() {
        return "email should be in changes";
      }
      test_1127.assert(t_1132, fn_1133);
      let t_1134 = mappedGetOr_94(cs_1131.changes, "email", "") === "alice@example.com";
      function fn_1135() {
        return "email value";
      }
      test_1127.assert(t_1134, fn_1135);
      return;
    } finally {
      test_1127.softFailToHard();
    }
});
it("putChange overwrites existing field", function () {
    const test_1136 = new Test_921();
    try {
      const params_1137 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1138 = userTable_919();
      let t_1139 = csid_914("name");
      const cs_1140 = changeset(t_1138, params_1137).cast(Object.freeze([t_1139])).putChange(csid_914("name"), "Bob");
      let t_1141 = mappedGetOr_94(cs_1140.changes, "name", "") === "Bob";
      function fn_1142() {
        return "name should be overwritten";
      }
      test_1136.assert(t_1141, fn_1142);
      return;
    } finally {
      test_1136.softFailToHard();
    }
});
it("putChange value appears in toInsertSql", function () {
    const test_1143 = new Test_921();
    try {
      let t_1144;
      let t_1145;
      const params_1146 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice"), pairConstructor_923("email", "a@example.com")]));
      let t_1147 = userTable_919();
      let t_1148 = csid_914("name");
      let t_1149 = csid_914("email");
      const cs_1150 = changeset(t_1147, params_1146).cast(Object.freeze([t_1148, t_1149])).putChange(csid_914("name"), "Bob");
      try {
        t_1144 = cs_1150.toInsertSql();
        t_1145 = t_1144;
      } catch {
        t_1145 = panic_918();
      }
      const s_1151 = t_1145.toString();
      let t_1152 = s_1151.indexOf("'Bob'") >= 0;
      function fn_1153() {
        return "should use putChange value: " + s_1151;
      }
      test_1143.assert(t_1152, fn_1153);
      return;
    } finally {
      test_1143.softFailToHard();
    }
});
it("getChange returns value for existing field", function () {
    const test_1154 = new Test_921();
    try {
      let t_1155;
      const params_1156 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1157 = userTable_919();
      let t_1158 = csid_914("name");
      const cs_1159 = changeset(t_1157, params_1156).cast(Object.freeze([t_1158]));
      let val_1160;
      try {
        t_1155 = cs_1159.getChange(csid_914("name"));
        val_1160 = t_1155;
      } catch {
        val_1160 = panic_918();
      }
      let t_1161 = val_1160 === "Alice";
      function fn_1162() {
        return "should return Alice";
      }
      test_1154.assert(t_1161, fn_1162);
      return;
    } finally {
      test_1154.softFailToHard();
    }
});
it("getChange bubbles on missing field", function () {
    const test_1163 = new Test_921();
    try {
      const params_1164 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1165 = userTable_919();
      let t_1166 = csid_914("name");
      const cs_1167 = changeset(t_1165, params_1164).cast(Object.freeze([t_1166]));
      let didBubble_1168;
      try {
        cs_1167.getChange(csid_914("email"));
        didBubble_1168 = false;
      } catch {
        didBubble_1168 = true;
      }
      function fn_1169() {
        return "should bubble for missing field";
      }
      test_1163.assert(didBubble_1168, fn_1169);
      return;
    } finally {
      test_1163.softFailToHard();
    }
});
it("deleteChange removes field", function () {
    const test_1170 = new Test_921();
    try {
      const params_1171 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice"), pairConstructor_923("email", "a@example.com")]));
      let t_1172 = userTable_919();
      let t_1173 = csid_914("name");
      let t_1174 = csid_914("email");
      const cs_1175 = changeset(t_1172, params_1171).cast(Object.freeze([t_1173, t_1174])).deleteChange(csid_914("email"));
      let t_1176 = ! cs_1175.changes.has("email");
      function fn_1177() {
        return "email should be removed";
      }
      test_1170.assert(t_1176, fn_1177);
      let t_1178 = cs_1175.changes.has("name");
      function fn_1179() {
        return "name should remain";
      }
      test_1170.assert(t_1178, fn_1179);
      return;
    } finally {
      test_1170.softFailToHard();
    }
});
it("deleteChange on nonexistent field is no-op", function () {
    const test_1180 = new Test_921();
    try {
      const params_1181 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1182 = userTable_919();
      let t_1183 = csid_914("name");
      const cs_1184 = changeset(t_1182, params_1181).cast(Object.freeze([t_1183])).deleteChange(csid_914("email"));
      let t_1185 = cs_1184.changes.has("name");
      function fn_1186() {
        return "name should still be present";
      }
      test_1180.assert(t_1185, fn_1186);
      let t_1187 = cs_1184.isValid;
      function fn_1188() {
        return "should still be valid";
      }
      test_1180.assert(t_1187, fn_1188);
      return;
    } finally {
      test_1180.softFailToHard();
    }
});
it("validateInclusion passes when value in list", function () {
    const test_1189 = new Test_921();
    try {
      const params_1190 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "admin")]));
      let t_1191 = userTable_919();
      let t_1192 = csid_914("name");
      const cs_1193 = changeset(t_1191, params_1190).cast(Object.freeze([t_1192])).validateInclusion(csid_914("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1194 = cs_1193.isValid;
      function fn_1195() {
        return "should be valid";
      }
      test_1189.assert(t_1194, fn_1195);
      return;
    } finally {
      test_1189.softFailToHard();
    }
});
it("validateInclusion fails when value not in list", function () {
    const test_1196 = new Test_921();
    try {
      const params_1197 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "hacker")]));
      let t_1198 = userTable_919();
      let t_1199 = csid_914("name");
      const cs_1200 = changeset(t_1198, params_1197).cast(Object.freeze([t_1199])).validateInclusion(csid_914("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1201 = ! cs_1200.isValid;
      function fn_1202() {
        return "should be invalid";
      }
      test_1196.assert(t_1201, fn_1202);
      let t_1203 = listedGet_197(cs_1200.errors, 0).field === "name";
      function fn_1204() {
        return "error on name";
      }
      test_1196.assert(t_1203, fn_1204);
      return;
    } finally {
      test_1196.softFailToHard();
    }
});
it("validateInclusion skips when field not in changes", function () {
    const test_1205 = new Test_921();
    try {
      const params_1206 = mapConstructor_901(Object.freeze([]));
      let t_1207 = userTable_919();
      let t_1208 = csid_914("name");
      const cs_1209 = changeset(t_1207, params_1206).cast(Object.freeze([t_1208])).validateInclusion(csid_914("name"), Object.freeze(["admin", "user"]));
      let t_1210 = cs_1209.isValid;
      function fn_1211() {
        return "should be valid when field absent";
      }
      test_1205.assert(t_1210, fn_1211);
      return;
    } finally {
      test_1205.softFailToHard();
    }
});
it("validateExclusion passes when value not in list", function () {
    const test_1212 = new Test_921();
    try {
      const params_1213 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Alice")]));
      let t_1214 = userTable_919();
      let t_1215 = csid_914("name");
      const cs_1216 = changeset(t_1214, params_1213).cast(Object.freeze([t_1215])).validateExclusion(csid_914("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1217 = cs_1216.isValid;
      function fn_1218() {
        return "should be valid";
      }
      test_1212.assert(t_1217, fn_1218);
      return;
    } finally {
      test_1212.softFailToHard();
    }
});
it("validateExclusion fails when value in list", function () {
    const test_1219 = new Test_921();
    try {
      const params_1220 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "admin")]));
      let t_1221 = userTable_919();
      let t_1222 = csid_914("name");
      const cs_1223 = changeset(t_1221, params_1220).cast(Object.freeze([t_1222])).validateExclusion(csid_914("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1224 = ! cs_1223.isValid;
      function fn_1225() {
        return "should be invalid";
      }
      test_1219.assert(t_1224, fn_1225);
      let t_1226 = listedGet_197(cs_1223.errors, 0).field === "name";
      function fn_1227() {
        return "error on name";
      }
      test_1219.assert(t_1226, fn_1227);
      return;
    } finally {
      test_1219.softFailToHard();
    }
});
it("validateExclusion skips when field not in changes", function () {
    const test_1228 = new Test_921();
    try {
      const params_1229 = mapConstructor_901(Object.freeze([]));
      let t_1230 = userTable_919();
      let t_1231 = csid_914("name");
      const cs_1232 = changeset(t_1230, params_1229).cast(Object.freeze([t_1231])).validateExclusion(csid_914("name"), Object.freeze(["root", "admin"]));
      let t_1233 = cs_1232.isValid;
      function fn_1234() {
        return "should be valid when field absent";
      }
      test_1228.assert(t_1233, fn_1234);
      return;
    } finally {
      test_1228.softFailToHard();
    }
});
it("validateNumber greaterThan passes", function () {
    const test_1235 = new Test_921();
    try {
      const params_1236 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "25")]));
      let t_1237 = userTable_919();
      let t_1238 = csid_914("age");
      const cs_1239 = changeset(t_1237, params_1236).cast(Object.freeze([t_1238])).validateNumber(csid_914("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1240 = cs_1239.isValid;
      function fn_1241() {
        return "25 > 18 should pass";
      }
      test_1235.assert(t_1240, fn_1241);
      return;
    } finally {
      test_1235.softFailToHard();
    }
});
it("validateNumber greaterThan fails", function () {
    const test_1242 = new Test_921();
    try {
      const params_1243 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "15")]));
      let t_1244 = userTable_919();
      let t_1245 = csid_914("age");
      const cs_1246 = changeset(t_1244, params_1243).cast(Object.freeze([t_1245])).validateNumber(csid_914("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1247 = ! cs_1246.isValid;
      function fn_1248() {
        return "15 > 18 should fail";
      }
      test_1242.assert(t_1247, fn_1248);
      return;
    } finally {
      test_1242.softFailToHard();
    }
});
it("validateNumber lessThan passes", function () {
    const test_1249 = new Test_921();
    try {
      const params_1250 = mapConstructor_901(Object.freeze([pairConstructor_923("score", "8.5")]));
      let t_1251 = userTable_919();
      let t_1252 = csid_914("score");
      const cs_1253 = changeset(t_1251, params_1250).cast(Object.freeze([t_1252])).validateNumber(csid_914("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1254 = cs_1253.isValid;
      function fn_1255() {
        return "8.5 < 10 should pass";
      }
      test_1249.assert(t_1254, fn_1255);
      return;
    } finally {
      test_1249.softFailToHard();
    }
});
it("validateNumber lessThan fails", function () {
    const test_1256 = new Test_921();
    try {
      const params_1257 = mapConstructor_901(Object.freeze([pairConstructor_923("score", "12.0")]));
      let t_1258 = userTable_919();
      let t_1259 = csid_914("score");
      const cs_1260 = changeset(t_1258, params_1257).cast(Object.freeze([t_1259])).validateNumber(csid_914("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1261 = ! cs_1260.isValid;
      function fn_1262() {
        return "12 < 10 should fail";
      }
      test_1256.assert(t_1261, fn_1262);
      return;
    } finally {
      test_1256.softFailToHard();
    }
});
it("validateNumber greaterThanOrEqual boundary", function () {
    const test_1263 = new Test_921();
    try {
      const params_1264 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "18")]));
      let t_1265 = userTable_919();
      let t_1266 = csid_914("age");
      const cs_1267 = changeset(t_1265, params_1264).cast(Object.freeze([t_1266])).validateNumber(csid_914("age"), new NumberValidationOpts(null, null, 18.0, null, null));
      let t_1268 = cs_1267.isValid;
      function fn_1269() {
        return "18 >= 18 should pass";
      }
      test_1263.assert(t_1268, fn_1269);
      return;
    } finally {
      test_1263.softFailToHard();
    }
});
it("validateNumber combined options", function () {
    const test_1270 = new Test_921();
    try {
      const params_1271 = mapConstructor_901(Object.freeze([pairConstructor_923("score", "5.0")]));
      let t_1272 = userTable_919();
      let t_1273 = csid_914("score");
      const cs_1274 = changeset(t_1272, params_1271).cast(Object.freeze([t_1273])).validateNumber(csid_914("score"), new NumberValidationOpts(0.0, 10.0, null, null, null));
      let t_1275 = cs_1274.isValid;
      function fn_1276() {
        return "5 > 0 and < 10 should pass";
      }
      test_1270.assert(t_1275, fn_1276);
      return;
    } finally {
      test_1270.softFailToHard();
    }
});
it("validateNumber non-numeric value", function () {
    const test_1277 = new Test_921();
    try {
      const params_1278 = mapConstructor_901(Object.freeze([pairConstructor_923("age", "abc")]));
      let t_1279 = userTable_919();
      let t_1280 = csid_914("age");
      const cs_1281 = changeset(t_1279, params_1278).cast(Object.freeze([t_1280])).validateNumber(csid_914("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1282 = ! cs_1281.isValid;
      function fn_1283() {
        return "non-numeric should fail";
      }
      test_1277.assert(t_1282, fn_1283);
      let t_1284 = listedGet_197(cs_1281.errors, 0).message === "must be a number";
      function fn_1285() {
        return "correct error message";
      }
      test_1277.assert(t_1284, fn_1285);
      return;
    } finally {
      test_1277.softFailToHard();
    }
});
it("validateNumber skips when field not in changes", function () {
    const test_1286 = new Test_921();
    try {
      const params_1287 = mapConstructor_901(Object.freeze([]));
      let t_1288 = userTable_919();
      let t_1289 = csid_914("age");
      const cs_1290 = changeset(t_1288, params_1287).cast(Object.freeze([t_1289])).validateNumber(csid_914("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1291 = cs_1290.isValid;
      function fn_1292() {
        return "should be valid when field absent";
      }
      test_1286.assert(t_1291, fn_1292);
      return;
    } finally {
      test_1286.softFailToHard();
    }
});
it("validateAcceptance passes for true values", function () {
    const test_1293 = new Test_921();
    try {
      function fn_1294(v_1295) {
        const params_1296 = mapConstructor_901(Object.freeze([pairConstructor_923("active", v_1295)]));
        let t_1297 = userTable_919();
        let t_1298 = csid_914("active");
        const cs_1299 = changeset(t_1297, params_1296).cast(Object.freeze([t_1298])).validateAcceptance(csid_914("active"));
        let t_1300 = cs_1299.isValid;
        function fn_1301() {
          return "should accept: " + v_1295;
        }
        test_1293.assert(t_1300, fn_1301);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_1294);
      return;
    } finally {
      test_1293.softFailToHard();
    }
});
it("validateAcceptance fails for non-true values", function () {
    const test_1302 = new Test_921();
    try {
      const params_1303 = mapConstructor_901(Object.freeze([pairConstructor_923("active", "false")]));
      let t_1304 = userTable_919();
      let t_1305 = csid_914("active");
      const cs_1306 = changeset(t_1304, params_1303).cast(Object.freeze([t_1305])).validateAcceptance(csid_914("active"));
      let t_1307 = ! cs_1306.isValid;
      function fn_1308() {
        return "false should not be accepted";
      }
      test_1302.assert(t_1307, fn_1308);
      let t_1309 = listedGet_197(cs_1306.errors, 0).message === "must be accepted";
      function fn_1310() {
        return "correct message";
      }
      test_1302.assert(t_1309, fn_1310);
      return;
    } finally {
      test_1302.softFailToHard();
    }
});
it("validateConfirmation passes when fields match", function () {
    const test_1311 = new Test_921();
    try {
      const tbl_1312 = new TableDef(csid_914("users"), Object.freeze([new FieldDef(csid_914("password"), new StringField(), false), new FieldDef(csid_914("password_confirmation"), new StringField(), true)]));
      const params_1313 = mapConstructor_901(Object.freeze([pairConstructor_923("password", "secret123"), pairConstructor_923("password_confirmation", "secret123")]));
      let t_1314 = csid_914("password");
      let t_1315 = csid_914("password_confirmation");
      const cs_1316 = changeset(tbl_1312, params_1313).cast(Object.freeze([t_1314, t_1315])).validateConfirmation(csid_914("password"), csid_914("password_confirmation"));
      let t_1317 = cs_1316.isValid;
      function fn_1318() {
        return "matching fields should pass";
      }
      test_1311.assert(t_1317, fn_1318);
      return;
    } finally {
      test_1311.softFailToHard();
    }
});
it("validateConfirmation fails when fields differ", function () {
    const test_1319 = new Test_921();
    try {
      const tbl_1320 = new TableDef(csid_914("users"), Object.freeze([new FieldDef(csid_914("password"), new StringField(), false), new FieldDef(csid_914("password_confirmation"), new StringField(), true)]));
      const params_1321 = mapConstructor_901(Object.freeze([pairConstructor_923("password", "secret123"), pairConstructor_923("password_confirmation", "wrong456")]));
      let t_1322 = csid_914("password");
      let t_1323 = csid_914("password_confirmation");
      const cs_1324 = changeset(tbl_1320, params_1321).cast(Object.freeze([t_1322, t_1323])).validateConfirmation(csid_914("password"), csid_914("password_confirmation"));
      let t_1325 = ! cs_1324.isValid;
      function fn_1326() {
        return "mismatched fields should fail";
      }
      test_1319.assert(t_1325, fn_1326);
      let t_1327 = listedGet_197(cs_1324.errors, 0).field === "password_confirmation";
      function fn_1328() {
        return "error on confirmation field";
      }
      test_1319.assert(t_1327, fn_1328);
      return;
    } finally {
      test_1319.softFailToHard();
    }
});
it("validateConfirmation fails when confirmation missing", function () {
    const test_1329 = new Test_921();
    try {
      const tbl_1330 = new TableDef(csid_914("users"), Object.freeze([new FieldDef(csid_914("password"), new StringField(), false), new FieldDef(csid_914("password_confirmation"), new StringField(), true)]));
      const params_1331 = mapConstructor_901(Object.freeze([pairConstructor_923("password", "secret123")]));
      let t_1332 = csid_914("password");
      const cs_1333 = changeset(tbl_1330, params_1331).cast(Object.freeze([t_1332])).validateConfirmation(csid_914("password"), csid_914("password_confirmation"));
      let t_1334 = ! cs_1333.isValid;
      function fn_1335() {
        return "missing confirmation should fail";
      }
      test_1329.assert(t_1334, fn_1335);
      return;
    } finally {
      test_1329.softFailToHard();
    }
});
it("validateContains passes when substring found", function () {
    const test_1336 = new Test_921();
    try {
      const params_1337 = mapConstructor_901(Object.freeze([pairConstructor_923("email", "alice@example.com")]));
      let t_1338 = userTable_919();
      let t_1339 = csid_914("email");
      const cs_1340 = changeset(t_1338, params_1337).cast(Object.freeze([t_1339])).validateContains(csid_914("email"), "@");
      let t_1341 = cs_1340.isValid;
      function fn_1342() {
        return "should pass when @ present";
      }
      test_1336.assert(t_1341, fn_1342);
      return;
    } finally {
      test_1336.softFailToHard();
    }
});
it("validateContains fails when substring not found", function () {
    const test_1343 = new Test_921();
    try {
      const params_1344 = mapConstructor_901(Object.freeze([pairConstructor_923("email", "alice-example.com")]));
      let t_1345 = userTable_919();
      let t_1346 = csid_914("email");
      const cs_1347 = changeset(t_1345, params_1344).cast(Object.freeze([t_1346])).validateContains(csid_914("email"), "@");
      let t_1348 = ! cs_1347.isValid;
      function fn_1349() {
        return "should fail when @ absent";
      }
      test_1343.assert(t_1348, fn_1349);
      return;
    } finally {
      test_1343.softFailToHard();
    }
});
it("validateContains skips when field not in changes", function () {
    const test_1350 = new Test_921();
    try {
      const params_1351 = mapConstructor_901(Object.freeze([]));
      let t_1352 = userTable_919();
      let t_1353 = csid_914("email");
      const cs_1354 = changeset(t_1352, params_1351).cast(Object.freeze([t_1353])).validateContains(csid_914("email"), "@");
      let t_1355 = cs_1354.isValid;
      function fn_1356() {
        return "should be valid when field absent";
      }
      test_1350.assert(t_1355, fn_1356);
      return;
    } finally {
      test_1350.softFailToHard();
    }
});
it("validateStartsWith passes", function () {
    const test_1357 = new Test_921();
    try {
      const params_1358 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Dr. Smith")]));
      let t_1359 = userTable_919();
      let t_1360 = csid_914("name");
      const cs_1361 = changeset(t_1359, params_1358).cast(Object.freeze([t_1360])).validateStartsWith(csid_914("name"), "Dr.");
      let t_1362 = cs_1361.isValid;
      function fn_1363() {
        return "should pass for Dr. prefix";
      }
      test_1357.assert(t_1362, fn_1363);
      return;
    } finally {
      test_1357.softFailToHard();
    }
});
it("validateStartsWith fails", function () {
    const test_1364 = new Test_921();
    try {
      const params_1365 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "Mr. Smith")]));
      let t_1366 = userTable_919();
      let t_1367 = csid_914("name");
      const cs_1368 = changeset(t_1366, params_1365).cast(Object.freeze([t_1367])).validateStartsWith(csid_914("name"), "Dr.");
      let t_1369 = ! cs_1368.isValid;
      function fn_1370() {
        return "should fail for Mr. prefix";
      }
      test_1364.assert(t_1369, fn_1370);
      return;
    } finally {
      test_1364.softFailToHard();
    }
});
it("validateEndsWith passes", function () {
    const test_1371 = new Test_921();
    try {
      const params_1372 = mapConstructor_901(Object.freeze([pairConstructor_923("email", "alice@example.com")]));
      let t_1373 = userTable_919();
      let t_1374 = csid_914("email");
      const cs_1375 = changeset(t_1373, params_1372).cast(Object.freeze([t_1374])).validateEndsWith(csid_914("email"), ".com");
      let t_1376 = cs_1375.isValid;
      function fn_1377() {
        return "should pass for .com suffix";
      }
      test_1371.assert(t_1376, fn_1377);
      return;
    } finally {
      test_1371.softFailToHard();
    }
});
it("validateEndsWith fails", function () {
    const test_1378 = new Test_921();
    try {
      const params_1379 = mapConstructor_901(Object.freeze([pairConstructor_923("email", "alice@example.org")]));
      let t_1380 = userTable_919();
      let t_1381 = csid_914("email");
      const cs_1382 = changeset(t_1380, params_1379).cast(Object.freeze([t_1381])).validateEndsWith(csid_914("email"), ".com");
      let t_1383 = ! cs_1382.isValid;
      function fn_1384() {
        return "should fail for .org when expecting .com";
      }
      test_1378.assert(t_1383, fn_1384);
      return;
    } finally {
      test_1378.softFailToHard();
    }
});
it("validateEndsWith handles repeated suffix correctly", function () {
    const test_1385 = new Test_921();
    try {
      const params_1386 = mapConstructor_901(Object.freeze([pairConstructor_923("name", "abcabc")]));
      let t_1387 = userTable_919();
      let t_1388 = csid_914("name");
      const cs_1389 = changeset(t_1387, params_1386).cast(Object.freeze([t_1388])).validateEndsWith(csid_914("name"), "abc");
      let t_1390 = cs_1389.isValid;
      function fn_1391() {
        return "abcabc should end with abc";
      }
      test_1385.assert(t_1390, fn_1391);
      return;
    } finally {
      test_1385.softFailToHard();
    }
});
/**
 * @param {string} name_1430
 * @returns {SafeIdentifier}
 */
function sid_1429(name_1430) {
  let return_1431;
  let t_1432;
  try {
    t_1432 = safeIdentifier(name_1430);
    return_1431 = t_1432;
  } catch {
    return_1431 = panic_918();
  }
  return return_1431;
}
it("bare from produces SELECT *", function () {
    const test_1433 = new Test_921();
    try {
      const q_1434 = from(sid_1429("users"));
      let t_1435 = q_1434.toSql().toString() === "SELECT * FROM users";
      function fn_1436() {
        return "bare query";
      }
      test_1433.assert(t_1435, fn_1436);
      return;
    } finally {
      test_1433.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_1437 = new Test_921();
    try {
      let t_1438 = sid_1429("users");
      let t_1439 = sid_1429("id");
      let t_1440 = sid_1429("name");
      const q_1441 = from(t_1438).select(Object.freeze([t_1439, t_1440]));
      let t_1442 = q_1441.toSql().toString() === "SELECT id, name FROM users";
      function fn_1443() {
        return "select columns";
      }
      test_1437.assert(t_1442, fn_1443);
      return;
    } finally {
      test_1437.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_1444 = new Test_921();
    try {
      let t_1445 = sid_1429("users");
      let t_1446 = new SqlBuilder();
      t_1446.appendSafe("age > ");
      t_1446.appendInt32(18);
      let t_1447 = t_1446.accumulated;
      const q_1448 = from(t_1445).where(t_1447);
      let t_1449 = q_1448.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_1450() {
        return "where int";
      }
      test_1444.assert(t_1449, fn_1450);
      return;
    } finally {
      test_1444.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_1451 = new Test_921();
    try {
      let t_1452 = sid_1429("users");
      let t_1453 = new SqlBuilder();
      t_1453.appendSafe("active = ");
      t_1453.appendBoolean(true);
      let t_1454 = t_1453.accumulated;
      const q_1455 = from(t_1452).where(t_1454);
      let t_1456 = q_1455.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_1457() {
        return "where bool";
      }
      test_1451.assert(t_1456, fn_1457);
      return;
    } finally {
      test_1451.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_1458 = new Test_921();
    try {
      let t_1459 = sid_1429("users");
      let t_1460 = new SqlBuilder();
      t_1460.appendSafe("age > ");
      t_1460.appendInt32(18);
      let t_1461 = t_1460.accumulated;
      let t_1462 = from(t_1459).where(t_1461);
      let t_1463 = new SqlBuilder();
      t_1463.appendSafe("active = ");
      t_1463.appendBoolean(true);
      const q_1464 = t_1462.where(t_1463.accumulated);
      let t_1465 = q_1464.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_1466() {
        return "chained where";
      }
      test_1458.assert(t_1465, fn_1466);
      return;
    } finally {
      test_1458.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_1467 = new Test_921();
    try {
      let t_1468 = sid_1429("users");
      let t_1469 = sid_1429("name");
      const q_1470 = from(t_1468).orderBy(t_1469, true);
      let t_1471 = q_1470.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_1472() {
        return "order asc";
      }
      test_1467.assert(t_1471, fn_1472);
      return;
    } finally {
      test_1467.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_1473 = new Test_921();
    try {
      let t_1474 = sid_1429("users");
      let t_1475 = sid_1429("created_at");
      const q_1476 = from(t_1474).orderBy(t_1475, false);
      let t_1477 = q_1476.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_1478() {
        return "order desc";
      }
      test_1473.assert(t_1477, fn_1478);
      return;
    } finally {
      test_1473.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_1479 = new Test_921();
    try {
      let t_1480;
      let t_1481;
      let q_1482;
      try {
        t_1480 = from(sid_1429("users")).limit(10);
        t_1481 = t_1480.offset(20);
        q_1482 = t_1481;
      } catch {
        q_1482 = panic_918();
      }
      let t_1483 = q_1482.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_1484() {
        return "limit/offset";
      }
      test_1479.assert(t_1483, fn_1484);
      return;
    } finally {
      test_1479.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_1485 = new Test_921();
    try {
      let didBubble_1486;
      try {
        from(sid_1429("users")).limit(-1);
        didBubble_1486 = false;
      } catch {
        didBubble_1486 = true;
      }
      function fn_1487() {
        return "negative limit should bubble";
      }
      test_1485.assert(didBubble_1486, fn_1487);
      return;
    } finally {
      test_1485.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_1488 = new Test_921();
    try {
      let didBubble_1489;
      try {
        from(sid_1429("users")).offset(-1);
        didBubble_1489 = false;
      } catch {
        didBubble_1489 = true;
      }
      function fn_1490() {
        return "negative offset should bubble";
      }
      test_1488.assert(didBubble_1489, fn_1490);
      return;
    } finally {
      test_1488.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_1491 = new Test_921();
    try {
      let t_1492;
      let t_1493;
      let t_1494;
      let t_1495;
      let t_1496;
      let t_1497;
      let t_1498;
      let t_1499;
      let t_1500;
      let t_1501;
      const minAge_1502 = 21;
      let q_1503;
      try {
        t_1492 = sid_1429("users");
        t_1493 = sid_1429("id");
        t_1494 = sid_1429("name");
        t_1495 = sid_1429("email");
        t_1496 = from(t_1492).select(Object.freeze([t_1493, t_1494, t_1495]));
        t_1497 = new SqlBuilder();
        t_1497.appendSafe("age >= ");
        t_1497.appendInt32(21);
        t_1498 = t_1496.where(t_1497.accumulated);
        t_1499 = new SqlBuilder();
        t_1499.appendSafe("active = ");
        t_1499.appendBoolean(true);
        t_1500 = t_1498.where(t_1499.accumulated).orderBy(sid_1429("name"), true).limit(25);
        t_1501 = t_1500.offset(0);
        q_1503 = t_1501;
      } catch {
        q_1503 = panic_918();
      }
      let t_1504 = q_1503.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_1505() {
        return "complex query";
      }
      test_1491.assert(t_1504, fn_1505);
      return;
    } finally {
      test_1491.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1506 = new Test_921();
    try {
      let t_1507;
      let t_1508;
      const q_1509 = from(sid_1429("users"));
      try {
        t_1507 = q_1509.safeToSql(100);
        t_1508 = t_1507;
      } catch {
        t_1508 = panic_918();
      }
      const s_1510 = t_1508.toString();
      let t_1511 = s_1510 === "SELECT * FROM users LIMIT 100";
      function fn_1512() {
        return "should have limit: " + s_1510;
      }
      test_1506.assert(t_1511, fn_1512);
      return;
    } finally {
      test_1506.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1513 = new Test_921();
    try {
      let t_1514;
      let t_1515;
      let t_1516;
      let q_1517;
      try {
        t_1514 = from(sid_1429("users")).limit(5);
        q_1517 = t_1514;
      } catch {
        q_1517 = panic_918();
      }
      try {
        t_1515 = q_1517.safeToSql(100);
        t_1516 = t_1515;
      } catch {
        t_1516 = panic_918();
      }
      const s_1518 = t_1516.toString();
      let t_1519 = s_1518 === "SELECT * FROM users LIMIT 5";
      function fn_1520() {
        return "explicit limit preserved: " + s_1518;
      }
      test_1513.assert(t_1519, fn_1520);
      return;
    } finally {
      test_1513.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1521 = new Test_921();
    try {
      let didBubble_1522;
      try {
        from(sid_1429("users")).safeToSql(-1);
        didBubble_1522 = false;
      } catch {
        didBubble_1522 = true;
      }
      function fn_1523() {
        return "negative defaultLimit should bubble";
      }
      test_1521.assert(didBubble_1522, fn_1523);
      return;
    } finally {
      test_1521.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1524 = new Test_921();
    try {
      const evil_1525 = "'; DROP TABLE users; --";
      let t_1526 = sid_1429("users");
      let t_1527 = new SqlBuilder();
      t_1527.appendSafe("name = ");
      t_1527.appendString("'; DROP TABLE users; --");
      let t_1528 = t_1527.accumulated;
      const q_1529 = from(t_1526).where(t_1528);
      const s_1530 = q_1529.toSql().toString();
      let t_1531 = s_1530.indexOf("''") >= 0;
      function fn_1532() {
        return "quotes must be doubled: " + s_1530;
      }
      test_1524.assert(t_1531, fn_1532);
      let t_1533 = s_1530.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1534() {
        return "structure intact: " + s_1530;
      }
      test_1524.assert(t_1533, fn_1534);
      return;
    } finally {
      test_1524.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1535 = new Test_921();
    try {
      const attack_1536 = "users; DROP TABLE users; --";
      let didBubble_1537;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1537 = false;
      } catch {
        didBubble_1537 = true;
      }
      function fn_1538() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1535.assert(didBubble_1537, fn_1538);
      return;
    } finally {
      test_1535.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1539 = new Test_921();
    try {
      let t_1540 = sid_1429("users");
      let t_1541 = sid_1429("orders");
      let t_1542 = new SqlBuilder();
      t_1542.appendSafe("users.id = orders.user_id");
      let t_1543 = t_1542.accumulated;
      const q_1544 = from(t_1540).innerJoin(t_1541, t_1543);
      let t_1545 = q_1544.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1546() {
        return "inner join";
      }
      test_1539.assert(t_1545, fn_1546);
      return;
    } finally {
      test_1539.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1547 = new Test_921();
    try {
      let t_1548 = sid_1429("users");
      let t_1549 = sid_1429("profiles");
      let t_1550 = new SqlBuilder();
      t_1550.appendSafe("users.id = profiles.user_id");
      let t_1551 = t_1550.accumulated;
      const q_1552 = from(t_1548).leftJoin(t_1549, t_1551);
      let t_1553 = q_1552.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1554() {
        return "left join";
      }
      test_1547.assert(t_1553, fn_1554);
      return;
    } finally {
      test_1547.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1555 = new Test_921();
    try {
      let t_1556 = sid_1429("orders");
      let t_1557 = sid_1429("users");
      let t_1558 = new SqlBuilder();
      t_1558.appendSafe("orders.user_id = users.id");
      let t_1559 = t_1558.accumulated;
      const q_1560 = from(t_1556).rightJoin(t_1557, t_1559);
      let t_1561 = q_1560.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_1562() {
        return "right join";
      }
      test_1555.assert(t_1561, fn_1562);
      return;
    } finally {
      test_1555.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1563 = new Test_921();
    try {
      let t_1564 = sid_1429("users");
      let t_1565 = sid_1429("orders");
      let t_1566 = new SqlBuilder();
      t_1566.appendSafe("users.id = orders.user_id");
      let t_1567 = t_1566.accumulated;
      const q_1568 = from(t_1564).fullJoin(t_1565, t_1567);
      let t_1569 = q_1568.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_1570() {
        return "full join";
      }
      test_1563.assert(t_1569, fn_1570);
      return;
    } finally {
      test_1563.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1571 = new Test_921();
    try {
      let t_1572 = sid_1429("users");
      let t_1573 = sid_1429("orders");
      let t_1574 = new SqlBuilder();
      t_1574.appendSafe("users.id = orders.user_id");
      let t_1575 = t_1574.accumulated;
      let t_1576 = from(t_1572).innerJoin(t_1573, t_1575);
      let t_1577 = sid_1429("profiles");
      let t_1578 = new SqlBuilder();
      t_1578.appendSafe("users.id = profiles.user_id");
      const q_1579 = t_1576.leftJoin(t_1577, t_1578.accumulated);
      let t_1580 = q_1579.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1581() {
        return "chained joins";
      }
      test_1571.assert(t_1580, fn_1581);
      return;
    } finally {
      test_1571.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1582 = new Test_921();
    try {
      let t_1583;
      let t_1584;
      let t_1585;
      let t_1586;
      let t_1587;
      let t_1588;
      let t_1589;
      let q_1590;
      try {
        t_1583 = sid_1429("users");
        t_1584 = sid_1429("orders");
        t_1585 = new SqlBuilder();
        t_1585.appendSafe("users.id = orders.user_id");
        t_1586 = t_1585.accumulated;
        t_1587 = from(t_1583).innerJoin(t_1584, t_1586);
        t_1588 = new SqlBuilder();
        t_1588.appendSafe("orders.total > ");
        t_1588.appendInt32(100);
        t_1589 = t_1587.where(t_1588.accumulated).orderBy(sid_1429("name"), true).limit(10);
        q_1590 = t_1589;
      } catch {
        q_1590 = panic_918();
      }
      let t_1591 = q_1590.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_1592() {
        return "join with where/order/limit";
      }
      test_1582.assert(t_1591, fn_1592);
      return;
    } finally {
      test_1582.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1593 = new Test_921();
    try {
      const c_1594 = col(sid_1429("users"), sid_1429("id"));
      let t_1595 = c_1594.toString() === "users.id";
      function fn_1596() {
        return "col helper";
      }
      test_1593.assert(t_1595, fn_1596);
      return;
    } finally {
      test_1593.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1597 = new Test_921();
    try {
      const onCond_1598 = col(sid_1429("users"), sid_1429("id"));
      const b_1599 = new SqlBuilder();
      b_1599.appendFragment(onCond_1598);
      b_1599.appendSafe(" = ");
      b_1599.appendFragment(col(sid_1429("orders"), sid_1429("user_id")));
      let t_1600 = sid_1429("users");
      let t_1601 = sid_1429("orders");
      let t_1602 = b_1599.accumulated;
      const q_1603 = from(t_1600).innerJoin(t_1601, t_1602);
      let t_1604 = q_1603.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1605() {
        return "join with col";
      }
      test_1597.assert(t_1604, fn_1605);
      return;
    } finally {
      test_1597.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1606 = new Test_921();
    try {
      let t_1607 = sid_1429("users");
      let t_1608 = new SqlBuilder();
      t_1608.appendSafe("status = ");
      t_1608.appendString("active");
      let t_1609 = t_1608.accumulated;
      const q_1610 = from(t_1607).orWhere(t_1609);
      let t_1611 = q_1610.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1612() {
        return "orWhere basic";
      }
      test_1606.assert(t_1611, fn_1612);
      return;
    } finally {
      test_1606.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1613 = new Test_921();
    try {
      let t_1614 = sid_1429("users");
      let t_1615 = new SqlBuilder();
      t_1615.appendSafe("age > ");
      t_1615.appendInt32(18);
      let t_1616 = t_1615.accumulated;
      let t_1617 = from(t_1614).where(t_1616);
      let t_1618 = new SqlBuilder();
      t_1618.appendSafe("vip = ");
      t_1618.appendBoolean(true);
      const q_1619 = t_1617.orWhere(t_1618.accumulated);
      let t_1620 = q_1619.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1621() {
        return "where then orWhere";
      }
      test_1613.assert(t_1620, fn_1621);
      return;
    } finally {
      test_1613.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1622 = new Test_921();
    try {
      let t_1623 = sid_1429("users");
      let t_1624 = new SqlBuilder();
      t_1624.appendSafe("active = ");
      t_1624.appendBoolean(true);
      let t_1625 = t_1624.accumulated;
      let t_1626 = from(t_1623).where(t_1625);
      let t_1627 = new SqlBuilder();
      t_1627.appendSafe("role = ");
      t_1627.appendString("admin");
      let t_1628 = t_1626.orWhere(t_1627.accumulated);
      let t_1629 = new SqlBuilder();
      t_1629.appendSafe("role = ");
      t_1629.appendString("moderator");
      const q_1630 = t_1628.orWhere(t_1629.accumulated);
      let t_1631 = q_1630.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1632() {
        return "multiple orWhere";
      }
      test_1622.assert(t_1631, fn_1632);
      return;
    } finally {
      test_1622.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1633 = new Test_921();
    try {
      let t_1634 = sid_1429("users");
      let t_1635 = new SqlBuilder();
      t_1635.appendSafe("age > ");
      t_1635.appendInt32(18);
      let t_1636 = t_1635.accumulated;
      let t_1637 = from(t_1634).where(t_1636);
      let t_1638 = new SqlBuilder();
      t_1638.appendSafe("active = ");
      t_1638.appendBoolean(true);
      let t_1639 = t_1637.where(t_1638.accumulated);
      let t_1640 = new SqlBuilder();
      t_1640.appendSafe("vip = ");
      t_1640.appendBoolean(true);
      const q_1641 = t_1639.orWhere(t_1640.accumulated);
      let t_1642 = q_1641.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1643() {
        return "mixed where and orWhere";
      }
      test_1633.assert(t_1642, fn_1643);
      return;
    } finally {
      test_1633.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1644 = new Test_921();
    try {
      let t_1645 = sid_1429("users");
      let t_1646 = sid_1429("deleted_at");
      const q_1647 = from(t_1645).whereNull(t_1646);
      let t_1648 = q_1647.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1649() {
        return "whereNull";
      }
      test_1644.assert(t_1648, fn_1649);
      return;
    } finally {
      test_1644.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1650 = new Test_921();
    try {
      let t_1651 = sid_1429("users");
      let t_1652 = sid_1429("email");
      const q_1653 = from(t_1651).whereNotNull(t_1652);
      let t_1654 = q_1653.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1655() {
        return "whereNotNull";
      }
      test_1650.assert(t_1654, fn_1655);
      return;
    } finally {
      test_1650.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1656 = new Test_921();
    try {
      let t_1657 = sid_1429("users");
      let t_1658 = new SqlBuilder();
      t_1658.appendSafe("active = ");
      t_1658.appendBoolean(true);
      let t_1659 = t_1658.accumulated;
      const q_1660 = from(t_1657).where(t_1659).whereNull(sid_1429("deleted_at"));
      let t_1661 = q_1660.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1662() {
        return "whereNull chained";
      }
      test_1656.assert(t_1661, fn_1662);
      return;
    } finally {
      test_1656.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1663 = new Test_921();
    try {
      let t_1664 = sid_1429("users");
      let t_1665 = sid_1429("deleted_at");
      let t_1666 = from(t_1664).whereNull(t_1665);
      let t_1667 = new SqlBuilder();
      t_1667.appendSafe("role = ");
      t_1667.appendString("admin");
      const q_1668 = t_1666.orWhere(t_1667.accumulated);
      let t_1669 = q_1668.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1670() {
        return "whereNotNull with orWhere";
      }
      test_1663.assert(t_1669, fn_1670);
      return;
    } finally {
      test_1663.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1671 = new Test_921();
    try {
      let t_1672 = sid_1429("users");
      let t_1673 = sid_1429("id");
      let t_1674 = new SqlInt32(1);
      let t_1675 = new SqlInt32(2);
      let t_1676 = new SqlInt32(3);
      const q_1677 = from(t_1672).whereIn(t_1673, Object.freeze([t_1674, t_1675, t_1676]));
      let t_1678 = q_1677.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1679() {
        return "whereIn ints";
      }
      test_1671.assert(t_1678, fn_1679);
      return;
    } finally {
      test_1671.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1680 = new Test_921();
    try {
      let t_1681 = sid_1429("users");
      let t_1682 = sid_1429("name");
      let t_1683 = new SqlString("Alice");
      let t_1684 = new SqlString("Bob's");
      const q_1685 = from(t_1681).whereIn(t_1682, Object.freeze([t_1683, t_1684]));
      let t_1686 = q_1685.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1687() {
        return "whereIn strings";
      }
      test_1680.assert(t_1686, fn_1687);
      return;
    } finally {
      test_1680.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1688 = new Test_921();
    try {
      let t_1689 = sid_1429("users");
      let t_1690 = sid_1429("id");
      const q_1691 = from(t_1689).whereIn(t_1690, Object.freeze([]));
      let t_1692 = q_1691.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1693() {
        return "whereIn empty";
      }
      test_1688.assert(t_1692, fn_1693);
      return;
    } finally {
      test_1688.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1694 = new Test_921();
    try {
      let t_1695 = sid_1429("users");
      let t_1696 = new SqlBuilder();
      t_1696.appendSafe("active = ");
      t_1696.appendBoolean(true);
      let t_1697 = t_1696.accumulated;
      const q_1698 = from(t_1695).where(t_1697).whereIn(sid_1429("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1699 = q_1698.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1700() {
        return "whereIn chained";
      }
      test_1694.assert(t_1699, fn_1700);
      return;
    } finally {
      test_1694.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1701 = new Test_921();
    try {
      let t_1702 = sid_1429("users");
      let t_1703 = sid_1429("id");
      let t_1704 = new SqlInt32(42);
      const q_1705 = from(t_1702).whereIn(t_1703, Object.freeze([t_1704]));
      let t_1706 = q_1705.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1707() {
        return "whereIn single";
      }
      test_1701.assert(t_1706, fn_1707);
      return;
    } finally {
      test_1701.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1708 = new Test_921();
    try {
      let t_1709 = sid_1429("users");
      let t_1710 = new SqlBuilder();
      t_1710.appendSafe("active = ");
      t_1710.appendBoolean(true);
      let t_1711 = t_1710.accumulated;
      const q_1712 = from(t_1709).whereNot(t_1711);
      let t_1713 = q_1712.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1714() {
        return "whereNot";
      }
      test_1708.assert(t_1713, fn_1714);
      return;
    } finally {
      test_1708.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1715 = new Test_921();
    try {
      let t_1716 = sid_1429("users");
      let t_1717 = new SqlBuilder();
      t_1717.appendSafe("age > ");
      t_1717.appendInt32(18);
      let t_1718 = t_1717.accumulated;
      let t_1719 = from(t_1716).where(t_1718);
      let t_1720 = new SqlBuilder();
      t_1720.appendSafe("banned = ");
      t_1720.appendBoolean(true);
      const q_1721 = t_1719.whereNot(t_1720.accumulated);
      let t_1722 = q_1721.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1723() {
        return "whereNot chained";
      }
      test_1715.assert(t_1722, fn_1723);
      return;
    } finally {
      test_1715.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1724 = new Test_921();
    try {
      let t_1725 = sid_1429("users");
      let t_1726 = sid_1429("age");
      let t_1727 = new SqlInt32(18);
      let t_1728 = new SqlInt32(65);
      const q_1729 = from(t_1725).whereBetween(t_1726, t_1727, t_1728);
      let t_1730 = q_1729.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1731() {
        return "whereBetween ints";
      }
      test_1724.assert(t_1730, fn_1731);
      return;
    } finally {
      test_1724.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1732 = new Test_921();
    try {
      let t_1733 = sid_1429("users");
      let t_1734 = new SqlBuilder();
      t_1734.appendSafe("active = ");
      t_1734.appendBoolean(true);
      let t_1735 = t_1734.accumulated;
      const q_1736 = from(t_1733).where(t_1735).whereBetween(sid_1429("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1737 = q_1736.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1738() {
        return "whereBetween chained";
      }
      test_1732.assert(t_1737, fn_1738);
      return;
    } finally {
      test_1732.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1739 = new Test_921();
    try {
      let t_1740 = sid_1429("users");
      let t_1741 = sid_1429("name");
      const q_1742 = from(t_1740).whereLike(t_1741, "John%");
      let t_1743 = q_1742.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1744() {
        return "whereLike";
      }
      test_1739.assert(t_1743, fn_1744);
      return;
    } finally {
      test_1739.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1745 = new Test_921();
    try {
      let t_1746 = sid_1429("users");
      let t_1747 = sid_1429("email");
      const q_1748 = from(t_1746).whereILike(t_1747, "%@gmail.com");
      let t_1749 = q_1748.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1750() {
        return "whereILike";
      }
      test_1745.assert(t_1749, fn_1750);
      return;
    } finally {
      test_1745.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1751 = new Test_921();
    try {
      let t_1752 = sid_1429("users");
      let t_1753 = sid_1429("name");
      const q_1754 = from(t_1752).whereLike(t_1753, "'; DROP TABLE users; --");
      const s_1755 = q_1754.toSql().toString();
      let t_1756 = s_1755.indexOf("''") >= 0;
      function fn_1757() {
        return "like injection escaped: " + s_1755;
      }
      test_1751.assert(t_1756, fn_1757);
      let t_1758 = s_1755.indexOf("LIKE") >= 0;
      function fn_1759() {
        return "like structure intact: " + s_1755;
      }
      test_1751.assert(t_1758, fn_1759);
      return;
    } finally {
      test_1751.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1760 = new Test_921();
    try {
      let t_1761 = sid_1429("users");
      let t_1762 = sid_1429("name");
      const q_1763 = from(t_1761).whereLike(t_1762, "%son%");
      let t_1764 = q_1763.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1765() {
        return "whereLike wildcard";
      }
      test_1760.assert(t_1764, fn_1765);
      return;
    } finally {
      test_1760.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1766 = new Test_921();
    try {
      const f_1767 = countAll();
      let t_1768 = f_1767.toString() === "COUNT(*)";
      function fn_1769() {
        return "countAll";
      }
      test_1766.assert(t_1768, fn_1769);
      return;
    } finally {
      test_1766.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1770 = new Test_921();
    try {
      const f_1771 = countCol(sid_1429("id"));
      let t_1772 = f_1771.toString() === "COUNT(id)";
      function fn_1773() {
        return "countCol";
      }
      test_1770.assert(t_1772, fn_1773);
      return;
    } finally {
      test_1770.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1774 = new Test_921();
    try {
      const f_1775 = sumCol(sid_1429("amount"));
      let t_1776 = f_1775.toString() === "SUM(amount)";
      function fn_1777() {
        return "sumCol";
      }
      test_1774.assert(t_1776, fn_1777);
      return;
    } finally {
      test_1774.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1778 = new Test_921();
    try {
      const f_1779 = avgCol(sid_1429("price"));
      let t_1780 = f_1779.toString() === "AVG(price)";
      function fn_1781() {
        return "avgCol";
      }
      test_1778.assert(t_1780, fn_1781);
      return;
    } finally {
      test_1778.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1782 = new Test_921();
    try {
      const f_1783 = minCol(sid_1429("created_at"));
      let t_1784 = f_1783.toString() === "MIN(created_at)";
      function fn_1785() {
        return "minCol";
      }
      test_1782.assert(t_1784, fn_1785);
      return;
    } finally {
      test_1782.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1786 = new Test_921();
    try {
      const f_1787 = maxCol(sid_1429("score"));
      let t_1788 = f_1787.toString() === "MAX(score)";
      function fn_1789() {
        return "maxCol";
      }
      test_1786.assert(t_1788, fn_1789);
      return;
    } finally {
      test_1786.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1790 = new Test_921();
    try {
      let t_1791 = sid_1429("orders");
      let t_1792 = countAll();
      const q_1793 = from(t_1791).selectExpr(Object.freeze([t_1792]));
      let t_1794 = q_1793.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1795() {
        return "selectExpr count";
      }
      test_1790.assert(t_1794, fn_1795);
      return;
    } finally {
      test_1790.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1796 = new Test_921();
    try {
      const nameFrag_1797 = col(sid_1429("users"), sid_1429("name"));
      let t_1798 = sid_1429("users");
      let t_1799 = countAll();
      const q_1800 = from(t_1798).selectExpr(Object.freeze([nameFrag_1797, t_1799]));
      let t_1801 = q_1800.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1802() {
        return "selectExpr multi";
      }
      test_1796.assert(t_1801, fn_1802);
      return;
    } finally {
      test_1796.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1803 = new Test_921();
    try {
      let t_1804 = sid_1429("users");
      let t_1805 = sid_1429("id");
      let t_1806 = sid_1429("name");
      const q_1807 = from(t_1804).select(Object.freeze([t_1805, t_1806])).selectExpr(Object.freeze([countAll()]));
      let t_1808 = q_1807.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1809() {
        return "selectExpr overrides select";
      }
      test_1803.assert(t_1808, fn_1809);
      return;
    } finally {
      test_1803.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1810 = new Test_921();
    try {
      let t_1811 = sid_1429("orders");
      let t_1812 = col(sid_1429("orders"), sid_1429("status"));
      let t_1813 = countAll();
      const q_1814 = from(t_1811).selectExpr(Object.freeze([t_1812, t_1813])).groupBy(sid_1429("status"));
      let t_1815 = q_1814.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1816() {
        return "groupBy single";
      }
      test_1810.assert(t_1815, fn_1816);
      return;
    } finally {
      test_1810.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1817 = new Test_921();
    try {
      let t_1818 = sid_1429("orders");
      let t_1819 = sid_1429("status");
      const q_1820 = from(t_1818).groupBy(t_1819).groupBy(sid_1429("category"));
      let t_1821 = q_1820.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1822() {
        return "groupBy multiple";
      }
      test_1817.assert(t_1821, fn_1822);
      return;
    } finally {
      test_1817.softFailToHard();
    }
});
it("having basic", function () {
    const test_1823 = new Test_921();
    try {
      let t_1824 = sid_1429("orders");
      let t_1825 = col(sid_1429("orders"), sid_1429("status"));
      let t_1826 = countAll();
      let t_1827 = from(t_1824).selectExpr(Object.freeze([t_1825, t_1826])).groupBy(sid_1429("status"));
      let t_1828 = new SqlBuilder();
      t_1828.appendSafe("COUNT(*) > ");
      t_1828.appendInt32(5);
      const q_1829 = t_1827.having(t_1828.accumulated);
      let t_1830 = q_1829.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1831() {
        return "having basic";
      }
      test_1823.assert(t_1830, fn_1831);
      return;
    } finally {
      test_1823.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1832 = new Test_921();
    try {
      let t_1833 = sid_1429("orders");
      let t_1834 = sid_1429("status");
      let t_1835 = from(t_1833).groupBy(t_1834);
      let t_1836 = new SqlBuilder();
      t_1836.appendSafe("COUNT(*) > ");
      t_1836.appendInt32(5);
      let t_1837 = t_1835.having(t_1836.accumulated);
      let t_1838 = new SqlBuilder();
      t_1838.appendSafe("SUM(total) > ");
      t_1838.appendInt32(1000);
      const q_1839 = t_1837.orHaving(t_1838.accumulated);
      let t_1840 = q_1839.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1841() {
        return "orHaving";
      }
      test_1832.assert(t_1840, fn_1841);
      return;
    } finally {
      test_1832.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1842 = new Test_921();
    try {
      let t_1843 = sid_1429("users");
      let t_1844 = sid_1429("name");
      const q_1845 = from(t_1843).select(Object.freeze([t_1844])).distinct();
      let t_1846 = q_1845.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1847() {
        return "distinct";
      }
      test_1842.assert(t_1846, fn_1847);
      return;
    } finally {
      test_1842.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1848 = new Test_921();
    try {
      let t_1849 = sid_1429("users");
      let t_1850 = sid_1429("email");
      let t_1851 = from(t_1849).select(Object.freeze([t_1850]));
      let t_1852 = new SqlBuilder();
      t_1852.appendSafe("active = ");
      t_1852.appendBoolean(true);
      const q_1853 = t_1851.where(t_1852.accumulated).distinct();
      let t_1854 = q_1853.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1855() {
        return "distinct with where";
      }
      test_1848.assert(t_1854, fn_1855);
      return;
    } finally {
      test_1848.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1856 = new Test_921();
    try {
      const q_1857 = from(sid_1429("users"));
      let t_1858 = q_1857.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1859() {
        return "countSql bare";
      }
      test_1856.assert(t_1858, fn_1859);
      return;
    } finally {
      test_1856.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1860 = new Test_921();
    try {
      let t_1861 = sid_1429("users");
      let t_1862 = new SqlBuilder();
      t_1862.appendSafe("active = ");
      t_1862.appendBoolean(true);
      let t_1863 = t_1862.accumulated;
      const q_1864 = from(t_1861).where(t_1863);
      let t_1865 = q_1864.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1866() {
        return "countSql with where";
      }
      test_1860.assert(t_1865, fn_1866);
      return;
    } finally {
      test_1860.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1867 = new Test_921();
    try {
      let t_1868 = sid_1429("users");
      let t_1869 = sid_1429("orders");
      let t_1870 = new SqlBuilder();
      t_1870.appendSafe("users.id = orders.user_id");
      let t_1871 = t_1870.accumulated;
      let t_1872 = from(t_1868).innerJoin(t_1869, t_1871);
      let t_1873 = new SqlBuilder();
      t_1873.appendSafe("orders.total > ");
      t_1873.appendInt32(100);
      const q_1874 = t_1872.where(t_1873.accumulated);
      let t_1875 = q_1874.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_1876() {
        return "countSql with join";
      }
      test_1867.assert(t_1875, fn_1876);
      return;
    } finally {
      test_1867.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_1877 = new Test_921();
    try {
      let t_1878;
      let t_1879;
      let t_1880;
      let t_1881;
      let t_1882;
      let q_1883;
      try {
        t_1878 = sid_1429("users");
        t_1879 = new SqlBuilder();
        t_1879.appendSafe("active = ");
        t_1879.appendBoolean(true);
        t_1880 = t_1879.accumulated;
        t_1881 = from(t_1878).where(t_1880).orderBy(sid_1429("name"), true).limit(10);
        t_1882 = t_1881.offset(20);
        q_1883 = t_1882;
      } catch {
        q_1883 = panic_918();
      }
      const s_1884 = q_1883.countSql().toString();
      let t_1885 = s_1884 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1886() {
        return "countSql drops extras: " + s_1884;
      }
      test_1877.assert(t_1885, fn_1886);
      return;
    } finally {
      test_1877.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_1887 = new Test_921();
    try {
      let t_1888 = sid_1429("orders");
      let t_1889 = col(sid_1429("orders"), sid_1429("status"));
      let t_1890 = countAll();
      let t_1891 = sumCol(sid_1429("total"));
      let t_1892 = from(t_1888).selectExpr(Object.freeze([t_1889, t_1890, t_1891]));
      let t_1893 = sid_1429("users");
      let t_1894 = new SqlBuilder();
      t_1894.appendSafe("orders.user_id = users.id");
      let t_1895 = t_1892.innerJoin(t_1893, t_1894.accumulated);
      let t_1896 = new SqlBuilder();
      t_1896.appendSafe("users.active = ");
      t_1896.appendBoolean(true);
      let t_1897 = t_1895.where(t_1896.accumulated).groupBy(sid_1429("status"));
      let t_1898 = new SqlBuilder();
      t_1898.appendSafe("COUNT(*) > ");
      t_1898.appendInt32(3);
      const q_1899 = t_1897.having(t_1898.accumulated).orderBy(sid_1429("status"), true);
      const expected_1900 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_1901 = q_1899.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_1902() {
        return "full aggregation";
      }
      test_1887.assert(t_1901, fn_1902);
      return;
    } finally {
      test_1887.softFailToHard();
    }
});
it("unionSql", function () {
    const test_1903 = new Test_921();
    try {
      let t_1904 = sid_1429("users");
      let t_1905 = new SqlBuilder();
      t_1905.appendSafe("role = ");
      t_1905.appendString("admin");
      let t_1906 = t_1905.accumulated;
      const a_1907 = from(t_1904).where(t_1906);
      let t_1908 = sid_1429("users");
      let t_1909 = new SqlBuilder();
      t_1909.appendSafe("role = ");
      t_1909.appendString("moderator");
      let t_1910 = t_1909.accumulated;
      const b_1911 = from(t_1908).where(t_1910);
      const s_1912 = unionSql(a_1907, b_1911).toString();
      let t_1913 = s_1912 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_1914() {
        return "unionSql: " + s_1912;
      }
      test_1903.assert(t_1913, fn_1914);
      return;
    } finally {
      test_1903.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_1915 = new Test_921();
    try {
      let t_1916 = sid_1429("users");
      let t_1917 = sid_1429("name");
      const a_1918 = from(t_1916).select(Object.freeze([t_1917]));
      let t_1919 = sid_1429("contacts");
      let t_1920 = sid_1429("name");
      const b_1921 = from(t_1919).select(Object.freeze([t_1920]));
      const s_1922 = unionAllSql(a_1918, b_1921).toString();
      let t_1923 = s_1922 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_1924() {
        return "unionAllSql: " + s_1922;
      }
      test_1915.assert(t_1923, fn_1924);
      return;
    } finally {
      test_1915.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_1925 = new Test_921();
    try {
      let t_1926 = sid_1429("users");
      let t_1927 = sid_1429("email");
      const a_1928 = from(t_1926).select(Object.freeze([t_1927]));
      let t_1929 = sid_1429("subscribers");
      let t_1930 = sid_1429("email");
      const b_1931 = from(t_1929).select(Object.freeze([t_1930]));
      const s_1932 = intersectSql(a_1928, b_1931).toString();
      let t_1933 = s_1932 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_1934() {
        return "intersectSql: " + s_1932;
      }
      test_1925.assert(t_1933, fn_1934);
      return;
    } finally {
      test_1925.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_1935 = new Test_921();
    try {
      let t_1936 = sid_1429("users");
      let t_1937 = sid_1429("id");
      const a_1938 = from(t_1936).select(Object.freeze([t_1937]));
      let t_1939 = sid_1429("banned");
      let t_1940 = sid_1429("id");
      const b_1941 = from(t_1939).select(Object.freeze([t_1940]));
      const s_1942 = exceptSql(a_1938, b_1941).toString();
      let t_1943 = s_1942 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_1944() {
        return "exceptSql: " + s_1942;
      }
      test_1935.assert(t_1943, fn_1944);
      return;
    } finally {
      test_1935.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_1945 = new Test_921();
    try {
      let t_1946 = sid_1429("orders");
      let t_1947 = sid_1429("user_id");
      let t_1948 = from(t_1946).select(Object.freeze([t_1947]));
      let t_1949 = new SqlBuilder();
      t_1949.appendSafe("total > ");
      t_1949.appendInt32(100);
      const inner_1950 = t_1948.where(t_1949.accumulated);
      const s_1951 = subquery(inner_1950, sid_1429("big_orders")).toString();
      let t_1952 = s_1951 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_1953() {
        return "subquery: " + s_1951;
      }
      test_1945.assert(t_1952, fn_1953);
      return;
    } finally {
      test_1945.softFailToHard();
    }
});
it("existsSql", function () {
    const test_1954 = new Test_921();
    try {
      let t_1955 = sid_1429("orders");
      let t_1956 = new SqlBuilder();
      t_1956.appendSafe("orders.user_id = users.id");
      let t_1957 = t_1956.accumulated;
      const inner_1958 = from(t_1955).where(t_1957);
      const s_1959 = existsSql(inner_1958).toString();
      let t_1960 = s_1959 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_1961() {
        return "existsSql: " + s_1959;
      }
      test_1954.assert(t_1960, fn_1961);
      return;
    } finally {
      test_1954.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_1962 = new Test_921();
    try {
      let t_1963 = sid_1429("orders");
      let t_1964 = sid_1429("user_id");
      let t_1965 = from(t_1963).select(Object.freeze([t_1964]));
      let t_1966 = new SqlBuilder();
      t_1966.appendSafe("total > ");
      t_1966.appendInt32(1000);
      const sub_1967 = t_1965.where(t_1966.accumulated);
      let t_1968 = sid_1429("users");
      let t_1969 = sid_1429("id");
      const q_1970 = from(t_1968).whereInSubquery(t_1969, sub_1967);
      const s_1971 = q_1970.toSql().toString();
      let t_1972 = s_1971 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_1973() {
        return "whereInSubquery: " + s_1971;
      }
      test_1962.assert(t_1972, fn_1973);
      return;
    } finally {
      test_1962.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_1974 = new Test_921();
    try {
      let t_1975 = sid_1429("users");
      let t_1976 = new SqlBuilder();
      t_1976.appendSafe("age > ");
      t_1976.appendInt32(18);
      let t_1977 = t_1976.accumulated;
      let t_1978 = from(t_1975).where(t_1977);
      let t_1979 = new SqlBuilder();
      t_1979.appendSafe("active = ");
      t_1979.appendBoolean(true);
      const a_1980 = t_1978.where(t_1979.accumulated);
      let t_1981 = sid_1429("users");
      let t_1982 = new SqlBuilder();
      t_1982.appendSafe("role = ");
      t_1982.appendString("vip");
      let t_1983 = t_1982.accumulated;
      const b_1984 = from(t_1981).where(t_1983);
      const s_1985 = unionSql(a_1980, b_1984).toString();
      let t_1986 = s_1985 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_1987() {
        return "union with where: " + s_1985;
      }
      test_1974.assert(t_1986, fn_1987);
      return;
    } finally {
      test_1974.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_1988 = new Test_921();
    try {
      let t_1989 = sid_1429("orders");
      let t_1990 = sid_1429("user_id");
      const sub_1991 = from(t_1989).select(Object.freeze([t_1990]));
      let t_1992 = sid_1429("users");
      let t_1993 = new SqlBuilder();
      t_1993.appendSafe("active = ");
      t_1993.appendBoolean(true);
      let t_1994 = t_1993.accumulated;
      const q_1995 = from(t_1992).where(t_1994).whereInSubquery(sid_1429("id"), sub_1991);
      const s_1996 = q_1995.toSql().toString();
      let t_1997 = s_1996 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_1998() {
        return "whereInSubquery chained: " + s_1996;
      }
      test_1988.assert(t_1997, fn_1998);
      return;
    } finally {
      test_1988.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_1999 = new Test_921();
    try {
      let t_2000 = sid_1429("orders");
      let t_2001 = new SqlBuilder();
      t_2001.appendSafe("orders.user_id = users.id");
      let t_2002 = t_2001.accumulated;
      const sub_2003 = from(t_2000).where(t_2002);
      let t_2004 = sid_1429("users");
      let t_2005 = existsSql(sub_2003);
      const q_2006 = from(t_2004).where(t_2005);
      const s_2007 = q_2006.toSql().toString();
      let t_2008 = s_2007 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_2009() {
        return "exists in where: " + s_2007;
      }
      test_1999.assert(t_2008, fn_2009);
      return;
    } finally {
      test_1999.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_2010 = new Test_921();
    try {
      let t_2011;
      let t_2012;
      let t_2013;
      let t_2014;
      let t_2015;
      let t_2016;
      let q_2017;
      try {
        t_2011 = sid_1429("users");
        t_2012 = sid_1429("name");
        t_2013 = new SqlString("Alice");
        t_2014 = update(t_2011).set(t_2012, t_2013);
        t_2015 = new SqlBuilder();
        t_2015.appendSafe("id = ");
        t_2015.appendInt32(1);
        t_2016 = t_2014.where(t_2015.accumulated).toSql();
        q_2017 = t_2016;
      } catch {
        q_2017 = panic_918();
      }
      let t_2018 = q_2017.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1";
      function fn_2019() {
        return "update basic";
      }
      test_2010.assert(t_2018, fn_2019);
      return;
    } finally {
      test_2010.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_2020 = new Test_921();
    try {
      let t_2021;
      let t_2022;
      let t_2023;
      let t_2024;
      let t_2025;
      let t_2026;
      let q_2027;
      try {
        t_2021 = sid_1429("users");
        t_2022 = sid_1429("name");
        t_2023 = new SqlString("Bob");
        t_2024 = update(t_2021).set(t_2022, t_2023).set(sid_1429("age"), new SqlInt32(30));
        t_2025 = new SqlBuilder();
        t_2025.appendSafe("id = ");
        t_2025.appendInt32(2);
        t_2026 = t_2024.where(t_2025.accumulated).toSql();
        q_2027 = t_2026;
      } catch {
        q_2027 = panic_918();
      }
      let t_2028 = q_2027.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2";
      function fn_2029() {
        return "update multi set";
      }
      test_2020.assert(t_2028, fn_2029);
      return;
    } finally {
      test_2020.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_2030 = new Test_921();
    try {
      let t_2031;
      let t_2032;
      let t_2033;
      let t_2034;
      let t_2035;
      let t_2036;
      let t_2037;
      let t_2038;
      let q_2039;
      try {
        t_2031 = sid_1429("users");
        t_2032 = sid_1429("active");
        t_2033 = new SqlBoolean(false);
        t_2034 = update(t_2031).set(t_2032, t_2033);
        t_2035 = new SqlBuilder();
        t_2035.appendSafe("age < ");
        t_2035.appendInt32(18);
        t_2036 = t_2034.where(t_2035.accumulated);
        t_2037 = new SqlBuilder();
        t_2037.appendSafe("role = ");
        t_2037.appendString("guest");
        t_2038 = t_2036.where(t_2037.accumulated).toSql();
        q_2039 = t_2038;
      } catch {
        q_2039 = panic_918();
      }
      let t_2040 = q_2039.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'";
      function fn_2041() {
        return "update multi where";
      }
      test_2030.assert(t_2040, fn_2041);
      return;
    } finally {
      test_2030.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_2042 = new Test_921();
    try {
      let t_2043;
      let t_2044;
      let t_2045;
      let t_2046;
      let t_2047;
      let t_2048;
      let t_2049;
      let t_2050;
      let q_2051;
      try {
        t_2043 = sid_1429("users");
        t_2044 = sid_1429("status");
        t_2045 = new SqlString("banned");
        t_2046 = update(t_2043).set(t_2044, t_2045);
        t_2047 = new SqlBuilder();
        t_2047.appendSafe("spam_count > ");
        t_2047.appendInt32(10);
        t_2048 = t_2046.where(t_2047.accumulated);
        t_2049 = new SqlBuilder();
        t_2049.appendSafe("reported = ");
        t_2049.appendBoolean(true);
        t_2050 = t_2048.orWhere(t_2049.accumulated).toSql();
        q_2051 = t_2050;
      } catch {
        q_2051 = panic_918();
      }
      let t_2052 = q_2051.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE";
      function fn_2053() {
        return "update orWhere";
      }
      test_2042.assert(t_2052, fn_2053);
      return;
    } finally {
      test_2042.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_2054 = new Test_921();
    try {
      let t_2055;
      let t_2056;
      let t_2057;
      let didBubble_2058;
      try {
        t_2055 = sid_1429("users");
        t_2056 = sid_1429("x");
        t_2057 = new SqlInt32(1);
        update(t_2055).set(t_2056, t_2057).toSql();
        didBubble_2058 = false;
      } catch {
        didBubble_2058 = true;
      }
      function fn_2059() {
        return "update without WHERE should bubble";
      }
      test_2054.assert(didBubble_2058, fn_2059);
      return;
    } finally {
      test_2054.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_2060 = new Test_921();
    try {
      let t_2061;
      let t_2062;
      let t_2063;
      let didBubble_2064;
      try {
        t_2061 = sid_1429("users");
        t_2062 = new SqlBuilder();
        t_2062.appendSafe("id = ");
        t_2062.appendInt32(1);
        t_2063 = t_2062.accumulated;
        update(t_2061).where(t_2063).toSql();
        didBubble_2064 = false;
      } catch {
        didBubble_2064 = true;
      }
      function fn_2065() {
        return "update without SET should bubble";
      }
      test_2060.assert(didBubble_2064, fn_2065);
      return;
    } finally {
      test_2060.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_2066 = new Test_921();
    try {
      let t_2067;
      let t_2068;
      let t_2069;
      let t_2070;
      let t_2071;
      let t_2072;
      let t_2073;
      let q_2074;
      try {
        t_2067 = sid_1429("users");
        t_2068 = sid_1429("active");
        t_2069 = new SqlBoolean(false);
        t_2070 = update(t_2067).set(t_2068, t_2069);
        t_2071 = new SqlBuilder();
        t_2071.appendSafe("last_login < ");
        t_2071.appendString("2024-01-01");
        t_2072 = t_2070.where(t_2071.accumulated).limit(100);
        t_2073 = t_2072.toSql();
        q_2074 = t_2073;
      } catch {
        q_2074 = panic_918();
      }
      let t_2075 = q_2074.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100";
      function fn_2076() {
        return "update limit";
      }
      test_2066.assert(t_2075, fn_2076);
      return;
    } finally {
      test_2066.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_2077 = new Test_921();
    try {
      let t_2078;
      let t_2079;
      let t_2080;
      let t_2081;
      let t_2082;
      let t_2083;
      let q_2084;
      try {
        t_2078 = sid_1429("users");
        t_2079 = sid_1429("bio");
        t_2080 = new SqlString("It's a test");
        t_2081 = update(t_2078).set(t_2079, t_2080);
        t_2082 = new SqlBuilder();
        t_2082.appendSafe("id = ");
        t_2082.appendInt32(1);
        t_2083 = t_2081.where(t_2082.accumulated).toSql();
        q_2084 = t_2083;
      } catch {
        q_2084 = panic_918();
      }
      let t_2085 = q_2084.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1";
      function fn_2086() {
        return "update escaping";
      }
      test_2077.assert(t_2085, fn_2086);
      return;
    } finally {
      test_2077.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_2087 = new Test_921();
    try {
      let t_2088;
      let t_2089;
      let t_2090;
      let t_2091;
      let q_2092;
      try {
        t_2088 = sid_1429("users");
        t_2089 = new SqlBuilder();
        t_2089.appendSafe("id = ");
        t_2089.appendInt32(1);
        t_2090 = t_2089.accumulated;
        t_2091 = deleteFrom(t_2088).where(t_2090).toSql();
        q_2092 = t_2091;
      } catch {
        q_2092 = panic_918();
      }
      let t_2093 = q_2092.toString() === "DELETE FROM users WHERE id = 1";
      function fn_2094() {
        return "delete basic";
      }
      test_2087.assert(t_2093, fn_2094);
      return;
    } finally {
      test_2087.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_2095 = new Test_921();
    try {
      let t_2096;
      let t_2097;
      let t_2098;
      let t_2099;
      let t_2100;
      let t_2101;
      let q_2102;
      try {
        t_2096 = sid_1429("logs");
        t_2097 = new SqlBuilder();
        t_2097.appendSafe("created_at < ");
        t_2097.appendString("2024-01-01");
        t_2098 = t_2097.accumulated;
        t_2099 = deleteFrom(t_2096).where(t_2098);
        t_2100 = new SqlBuilder();
        t_2100.appendSafe("level = ");
        t_2100.appendString("debug");
        t_2101 = t_2099.where(t_2100.accumulated).toSql();
        q_2102 = t_2101;
      } catch {
        q_2102 = panic_918();
      }
      let t_2103 = q_2102.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'";
      function fn_2104() {
        return "delete multi where";
      }
      test_2095.assert(t_2103, fn_2104);
      return;
    } finally {
      test_2095.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_2105 = new Test_921();
    try {
      let didBubble_2106;
      try {
        deleteFrom(sid_1429("users")).toSql();
        didBubble_2106 = false;
      } catch {
        didBubble_2106 = true;
      }
      function fn_2107() {
        return "delete without WHERE should bubble";
      }
      test_2105.assert(didBubble_2106, fn_2107);
      return;
    } finally {
      test_2105.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_2108 = new Test_921();
    try {
      let t_2109;
      let t_2110;
      let t_2111;
      let t_2112;
      let t_2113;
      let t_2114;
      let q_2115;
      try {
        t_2109 = sid_1429("sessions");
        t_2110 = new SqlBuilder();
        t_2110.appendSafe("expired = ");
        t_2110.appendBoolean(true);
        t_2111 = t_2110.accumulated;
        t_2112 = deleteFrom(t_2109).where(t_2111);
        t_2113 = new SqlBuilder();
        t_2113.appendSafe("created_at < ");
        t_2113.appendString("2023-01-01");
        t_2114 = t_2112.orWhere(t_2113.accumulated).toSql();
        q_2115 = t_2114;
      } catch {
        q_2115 = panic_918();
      }
      let t_2116 = q_2115.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'";
      function fn_2117() {
        return "delete orWhere";
      }
      test_2108.assert(t_2116, fn_2117);
      return;
    } finally {
      test_2108.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_2118 = new Test_921();
    try {
      let t_2119;
      let t_2120;
      let t_2121;
      let t_2122;
      let t_2123;
      let q_2124;
      try {
        t_2119 = sid_1429("logs");
        t_2120 = new SqlBuilder();
        t_2120.appendSafe("level = ");
        t_2120.appendString("debug");
        t_2121 = t_2120.accumulated;
        t_2122 = deleteFrom(t_2119).where(t_2121).limit(1000);
        t_2123 = t_2122.toSql();
        q_2124 = t_2123;
      } catch {
        q_2124 = panic_918();
      }
      let t_2125 = q_2124.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000";
      function fn_2126() {
        return "delete limit";
      }
      test_2118.assert(t_2125, fn_2126);
      return;
    } finally {
      test_2118.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_2127 = new Test_921();
    try {
      let t_2128 = sid_1429("users");
      let t_2129 = sid_1429("email");
      let t_2130 = new NullsFirst();
      const q_2131 = from(t_2128).orderByNulls(t_2129, true, t_2130);
      let t_2132 = q_2131.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST";
      function fn_2133() {
        return "nulls first";
      }
      test_2127.assert(t_2132, fn_2133);
      return;
    } finally {
      test_2127.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_2134 = new Test_921();
    try {
      let t_2135 = sid_1429("users");
      let t_2136 = sid_1429("score");
      let t_2137 = new NullsLast();
      const q_2138 = from(t_2135).orderByNulls(t_2136, false, t_2137);
      let t_2139 = q_2138.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST";
      function fn_2140() {
        return "nulls last";
      }
      test_2134.assert(t_2139, fn_2140);
      return;
    } finally {
      test_2134.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_2141 = new Test_921();
    try {
      let t_2142 = sid_1429("users");
      let t_2143 = sid_1429("name");
      const q_2144 = from(t_2142).orderBy(t_2143, true).orderByNulls(sid_1429("email"), true, new NullsFirst());
      let t_2145 = q_2144.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST";
      function fn_2146() {
        return "mixed order";
      }
      test_2141.assert(t_2145, fn_2146);
      return;
    } finally {
      test_2141.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_2147 = new Test_921();
    try {
      let t_2148 = sid_1429("users");
      let t_2149 = sid_1429("colors");
      const q_2150 = from(t_2148).crossJoin(t_2149);
      let t_2151 = q_2150.toSql().toString() === "SELECT * FROM users CROSS JOIN colors";
      function fn_2152() {
        return "cross join";
      }
      test_2147.assert(t_2151, fn_2152);
      return;
    } finally {
      test_2147.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_2153 = new Test_921();
    try {
      let t_2154 = sid_1429("users");
      let t_2155 = sid_1429("orders");
      let t_2156 = new SqlBuilder();
      t_2156.appendSafe("users.id = orders.user_id");
      let t_2157 = t_2156.accumulated;
      const q_2158 = from(t_2154).innerJoin(t_2155, t_2157).crossJoin(sid_1429("colors"));
      let t_2159 = q_2158.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors";
      function fn_2160() {
        return "cross + inner join";
      }
      test_2153.assert(t_2159, fn_2160);
      return;
    } finally {
      test_2153.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_2161 = new Test_921();
    try {
      let t_2162 = sid_1429("users");
      let t_2163 = new SqlBuilder();
      t_2163.appendSafe("id = ");
      t_2163.appendInt32(1);
      let t_2164 = t_2163.accumulated;
      const q_2165 = from(t_2162).where(t_2164).lock(new ForUpdate());
      let t_2166 = q_2165.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE";
      function fn_2167() {
        return "for update";
      }
      test_2161.assert(t_2166, fn_2167);
      return;
    } finally {
      test_2161.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_2168 = new Test_921();
    try {
      let t_2169 = sid_1429("users");
      let t_2170 = sid_1429("name");
      const q_2171 = from(t_2169).select(Object.freeze([t_2170])).lock(new ForShare());
      let t_2172 = q_2171.toSql().toString() === "SELECT name FROM users FOR SHARE";
      function fn_2173() {
        return "for share";
      }
      test_2168.assert(t_2172, fn_2173);
      return;
    } finally {
      test_2168.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_2174 = new Test_921();
    try {
      let t_2175;
      let t_2176;
      let t_2177;
      let t_2178;
      let t_2179;
      let q_2180;
      try {
        t_2175 = sid_1429("accounts");
        t_2176 = new SqlBuilder();
        t_2176.appendSafe("id = ");
        t_2176.appendInt32(42);
        t_2177 = t_2176.accumulated;
        t_2179 = from(t_2175).where(t_2177).limit(1);
        t_2178 = t_2179.lock(new ForUpdate());
        q_2180 = t_2178;
      } catch {
        q_2180 = panic_918();
      }
      let t_2181 = q_2180.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE";
      function fn_2182() {
        return "lock full query";
      }
      test_2174.assert(t_2181, fn_2182);
      return;
    } finally {
      test_2174.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_2183 = new Test_921();
    try {
      let t_2184;
      let id_2185;
      try {
        t_2184 = safeIdentifier("user_name");
        id_2185 = t_2184;
      } catch {
        id_2185 = panic_918();
      }
      let t_2186 = id_2185.sqlValue === "user_name";
      function fn_2187() {
        return "value should round-trip";
      }
      test_2183.assert(t_2186, fn_2187);
      return;
    } finally {
      test_2183.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_2188 = new Test_921();
    try {
      let didBubble_2189;
      try {
        safeIdentifier("");
        didBubble_2189 = false;
      } catch {
        didBubble_2189 = true;
      }
      function fn_2190() {
        return "empty string should bubble";
      }
      test_2188.assert(didBubble_2189, fn_2190);
      return;
    } finally {
      test_2188.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_2191 = new Test_921();
    try {
      let didBubble_2192;
      try {
        safeIdentifier("1col");
        didBubble_2192 = false;
      } catch {
        didBubble_2192 = true;
      }
      function fn_2193() {
        return "leading digit should bubble";
      }
      test_2191.assert(didBubble_2192, fn_2193);
      return;
    } finally {
      test_2191.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_2194 = new Test_921();
    try {
      const cases_2195 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_2196(c_2197) {
        let didBubble_2198;
        try {
          safeIdentifier(c_2197);
          didBubble_2198 = false;
        } catch {
          didBubble_2198 = true;
        }
        function fn_2199() {
          return "should reject: " + c_2197;
        }
        test_2194.assert(didBubble_2198, fn_2199);
        return;
      }
      cases_2195.forEach(fn_2196);
      return;
    } finally {
      test_2194.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_2200 = new Test_921();
    try {
      let t_2201;
      let t_2202;
      let t_2203;
      let t_2204;
      let t_2205;
      let t_2206;
      let t_2207;
      try {
        t_2201 = safeIdentifier("users");
        t_2202 = t_2201;
      } catch {
        t_2202 = panic_918();
      }
      try {
        t_2203 = safeIdentifier("name");
        t_2204 = t_2203;
      } catch {
        t_2204 = panic_918();
      }
      let t_2208 = new StringField();
      let t_2209 = new FieldDef(t_2204, t_2208, false);
      try {
        t_2205 = safeIdentifier("age");
        t_2206 = t_2205;
      } catch {
        t_2206 = panic_918();
      }
      let t_2210 = new IntField();
      let t_2211 = new FieldDef(t_2206, t_2210, false);
      const td_2212 = new TableDef(t_2202, Object.freeze([t_2209, t_2211]));
      let f_2213;
      try {
        t_2207 = td_2212.field("age");
        f_2213 = t_2207;
      } catch {
        f_2213 = panic_918();
      }
      let t_2214 = f_2213.name.sqlValue === "age";
      function fn_2215() {
        return "should find age field";
      }
      test_2200.assert(t_2214, fn_2215);
      return;
    } finally {
      test_2200.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_2216 = new Test_921();
    try {
      let t_2217;
      let t_2218;
      let t_2219;
      let t_2220;
      try {
        t_2217 = safeIdentifier("users");
        t_2218 = t_2217;
      } catch {
        t_2218 = panic_918();
      }
      try {
        t_2219 = safeIdentifier("name");
        t_2220 = t_2219;
      } catch {
        t_2220 = panic_918();
      }
      let t_2221 = new StringField();
      let t_2222 = new FieldDef(t_2220, t_2221, false);
      const td_2223 = new TableDef(t_2218, Object.freeze([t_2222]));
      let didBubble_2224;
      try {
        td_2223.field("nonexistent");
        didBubble_2224 = false;
      } catch {
        didBubble_2224 = true;
      }
      function fn_2225() {
        return "unknown field should bubble";
      }
      test_2216.assert(didBubble_2224, fn_2225);
      return;
    } finally {
      test_2216.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_2226 = new Test_921();
    try {
      let t_2227;
      let t_2228;
      let t_2229;
      let t_2230;
      try {
        t_2227 = safeIdentifier("email");
        t_2228 = t_2227;
      } catch {
        t_2228 = panic_918();
      }
      let t_2231 = new StringField();
      const required_2232 = new FieldDef(t_2228, t_2231, false);
      try {
        t_2229 = safeIdentifier("bio");
        t_2230 = t_2229;
      } catch {
        t_2230 = panic_918();
      }
      let t_2233 = new StringField();
      const optional_2234 = new FieldDef(t_2230, t_2233, true);
      let t_2235 = ! required_2232.nullable;
      function fn_2236() {
        return "required field should not be nullable";
      }
      test_2226.assert(t_2235, fn_2236);
      let t_2237 = optional_2234.nullable;
      function fn_2238() {
        return "optional field should be nullable";
      }
      test_2226.assert(t_2237, fn_2238);
      return;
    } finally {
      test_2226.softFailToHard();
    }
});
it("string escaping", function () {
    const test_2239 = new Test_921();
    try {
      function build_2240(name_2241) {
        let t_2242 = new SqlBuilder();
        t_2242.appendSafe("select * from hi where name = ");
        t_2242.appendString(name_2241);
        return t_2242.accumulated.toString();
      }
      function buildWrong_2243(name_2244) {
        return "select * from hi where name = '" + name_2244 + "'";
      }
      const actual_2245 = build_2240("world");
      let t_2246 = actual_2245 === "select * from hi where name = 'world'";
      function fn_2247() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_2245 + ")";
      }
      test_2239.assert(t_2246, fn_2247);
      const bobbyTables_2248 = "Robert'); drop table hi;--";
      const actual_2249 = build_2240("Robert'); drop table hi;--");
      let t_2250 = actual_2249 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_2251() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_2249 + ")";
      }
      test_2239.assert(t_2250, fn_2251);
      function fn_2252() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_2239.assert(true, fn_2252);
      return;
    } finally {
      test_2239.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_2253 = new Test_921();
    try {
      let t_2254 = new SqlBuilder();
      t_2254.appendSafe("v = ");
      t_2254.appendString("");
      const actual_2255 = t_2254.accumulated.toString();
      let t_2256 = actual_2255 === "v = ''";
      function fn_2257() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_2255 + ")";
      }
      test_2253.assert(t_2256, fn_2257);
      let t_2258 = new SqlBuilder();
      t_2258.appendSafe("v = ");
      t_2258.appendString("a''b");
      const actual_2259 = t_2258.accumulated.toString();
      let t_2260 = actual_2259 === "v = 'a''''b'";
      function fn_2261() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_2259 + ")";
      }
      test_2253.assert(t_2260, fn_2261);
      let t_2262 = new SqlBuilder();
      t_2262.appendSafe("v = ");
      t_2262.appendString("Hello 世界");
      const actual_2263 = t_2262.accumulated.toString();
      let t_2264 = actual_2263 === "v = 'Hello 世界'";
      function fn_2265() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_2263 + ")";
      }
      test_2253.assert(t_2264, fn_2265);
      let t_2266 = new SqlBuilder();
      t_2266.appendSafe("v = ");
      t_2266.appendString("Line1\nLine2");
      const actual_2267 = t_2266.accumulated.toString();
      let t_2268 = actual_2267 === "v = 'Line1\nLine2'";
      function fn_2269() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_2267 + ")";
      }
      test_2253.assert(t_2268, fn_2269);
      return;
    } finally {
      test_2253.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_2270 = new Test_921();
    try {
      let t_2271;
      let t_2272 = new SqlBuilder();
      t_2272.appendSafe("select ");
      t_2272.appendInt32(42);
      t_2272.appendSafe(", ");
      t_2272.appendInt64(BigInt("43"));
      t_2272.appendSafe(", ");
      t_2272.appendFloat64(19.99);
      t_2272.appendSafe(", ");
      t_2272.appendBoolean(true);
      t_2272.appendSafe(", ");
      t_2272.appendBoolean(false);
      const actual_2273 = t_2272.accumulated.toString();
      let t_2274 = actual_2273 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_2275() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_2273 + ")";
      }
      test_2270.assert(t_2274, fn_2275);
      let date_2276;
      try {
        t_2271 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_2276 = t_2271;
      } catch {
        date_2276 = panic_918();
      }
      let t_2277 = new SqlBuilder();
      t_2277.appendSafe("insert into t values (");
      t_2277.appendDate(date_2276);
      t_2277.appendSafe(")");
      const actual_2278 = t_2277.accumulated.toString();
      let t_2279 = actual_2278 === "insert into t values ('2024-12-25')";
      function fn_2280() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_2278 + ")";
      }
      test_2270.assert(t_2279, fn_2280);
      return;
    } finally {
      test_2270.softFailToHard();
    }
});
it("lists", function () {
    const test_2281 = new Test_921();
    try {
      let t_2282;
      let t_2283;
      let t_2284;
      let t_2285;
      let t_2286 = new SqlBuilder();
      t_2286.appendSafe("v IN (");
      t_2286.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_2286.appendSafe(")");
      const actual_2287 = t_2286.accumulated.toString();
      let t_2288 = actual_2287 === "v IN ('a', 'b', 'c''d')";
      function fn_2289() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_2287 + ")";
      }
      test_2281.assert(t_2288, fn_2289);
      let t_2290 = new SqlBuilder();
      t_2290.appendSafe("v IN (");
      t_2290.appendInt32List(Object.freeze([1, 2, 3]));
      t_2290.appendSafe(")");
      const actual_2291 = t_2290.accumulated.toString();
      let t_2292 = actual_2291 === "v IN (1, 2, 3)";
      function fn_2293() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_2291 + ")";
      }
      test_2281.assert(t_2292, fn_2293);
      let t_2294 = new SqlBuilder();
      t_2294.appendSafe("v IN (");
      t_2294.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_2294.appendSafe(")");
      const actual_2295 = t_2294.accumulated.toString();
      let t_2296 = actual_2295 === "v IN (1, 2)";
      function fn_2297() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_2295 + ")";
      }
      test_2281.assert(t_2296, fn_2297);
      let t_2298 = new SqlBuilder();
      t_2298.appendSafe("v IN (");
      t_2298.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_2298.appendSafe(")");
      const actual_2299 = t_2298.accumulated.toString();
      let t_2300 = actual_2299 === "v IN (1.0, 2.0)";
      function fn_2301() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_2299 + ")";
      }
      test_2281.assert(t_2300, fn_2301);
      let t_2302 = new SqlBuilder();
      t_2302.appendSafe("v IN (");
      t_2302.appendBooleanList(Object.freeze([true, false]));
      t_2302.appendSafe(")");
      const actual_2303 = t_2302.accumulated.toString();
      let t_2304 = actual_2303 === "v IN (TRUE, FALSE)";
      function fn_2305() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_2303 + ")";
      }
      test_2281.assert(t_2304, fn_2305);
      try {
        t_2282 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_2283 = t_2282;
      } catch {
        t_2283 = panic_918();
      }
      try {
        t_2284 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_2285 = t_2284;
      } catch {
        t_2285 = panic_918();
      }
      const dates_2306 = Object.freeze([t_2283, t_2285]);
      let t_2307 = new SqlBuilder();
      t_2307.appendSafe("v IN (");
      t_2307.appendDateList(dates_2306);
      t_2307.appendSafe(")");
      const actual_2308 = t_2307.accumulated.toString();
      let t_2309 = actual_2308 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_2310() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_2308 + ")";
      }
      test_2281.assert(t_2309, fn_2310);
      return;
    } finally {
      test_2281.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_2311 = new Test_921();
    try {
      let nan_2312;
      nan_2312 = 0.0 / 0.0;
      let t_2313 = new SqlBuilder();
      t_2313.appendSafe("v = ");
      t_2313.appendFloat64(nan_2312);
      const actual_2314 = t_2313.accumulated.toString();
      let t_2315 = actual_2314 === "v = NULL";
      function fn_2316() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_2314 + ")";
      }
      test_2311.assert(t_2315, fn_2316);
      return;
    } finally {
      test_2311.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_2317 = new Test_921();
    try {
      let inf_2318;
      inf_2318 = 1.0 / 0.0;
      let t_2319 = new SqlBuilder();
      t_2319.appendSafe("v = ");
      t_2319.appendFloat64(inf_2318);
      const actual_2320 = t_2319.accumulated.toString();
      let t_2321 = actual_2320 === "v = NULL";
      function fn_2322() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_2320 + ")";
      }
      test_2317.assert(t_2321, fn_2322);
      return;
    } finally {
      test_2317.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_2323 = new Test_921();
    try {
      let ninf_2324;
      ninf_2324 = -1.0 / 0.0;
      let t_2325 = new SqlBuilder();
      t_2325.appendSafe("v = ");
      t_2325.appendFloat64(ninf_2324);
      const actual_2326 = t_2325.accumulated.toString();
      let t_2327 = actual_2326 === "v = NULL";
      function fn_2328() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_2326 + ")";
      }
      test_2323.assert(t_2327, fn_2328);
      return;
    } finally {
      test_2323.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_2329 = new Test_921();
    try {
      let t_2330 = new SqlBuilder();
      t_2330.appendSafe("v = ");
      t_2330.appendFloat64(3.14);
      const actual_2331 = t_2330.accumulated.toString();
      let t_2332 = actual_2331 === "v = 3.14";
      function fn_2333() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_2331 + ")";
      }
      test_2329.assert(t_2332, fn_2333);
      let t_2334 = new SqlBuilder();
      t_2334.appendSafe("v = ");
      t_2334.appendFloat64(0.0);
      const actual_2335 = t_2334.accumulated.toString();
      let t_2336 = actual_2335 === "v = 0.0";
      function fn_2337() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_2335 + ")";
      }
      test_2329.assert(t_2336, fn_2337);
      let t_2338 = new SqlBuilder();
      t_2338.appendSafe("v = ");
      t_2338.appendFloat64(-42.5);
      const actual_2339 = t_2338.accumulated.toString();
      let t_2340 = actual_2339 === "v = -42.5";
      function fn_2341() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_2339 + ")";
      }
      test_2329.assert(t_2340, fn_2341);
      return;
    } finally {
      test_2329.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_2342 = new Test_921();
    try {
      let t_2343;
      let d_2344;
      try {
        t_2343 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_2344 = t_2343;
      } catch {
        d_2344 = panic_918();
      }
      let t_2345 = new SqlBuilder();
      t_2345.appendSafe("v = ");
      t_2345.appendDate(d_2344);
      const actual_2346 = t_2345.accumulated.toString();
      let t_2347 = actual_2346 === "v = '2024-06-15'";
      function fn_2348() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_2346 + ")";
      }
      test_2342.assert(t_2347, fn_2348);
      return;
    } finally {
      test_2342.softFailToHard();
    }
});
it("nesting", function () {
    const test_2349 = new Test_921();
    try {
      const name_2350 = "Someone";
      let t_2351 = new SqlBuilder();
      t_2351.appendSafe("where p.last_name = ");
      t_2351.appendString("Someone");
      const condition_2352 = t_2351.accumulated;
      let t_2353 = new SqlBuilder();
      t_2353.appendSafe("select p.id from person p ");
      t_2353.appendFragment(condition_2352);
      const actual_2354 = t_2353.accumulated.toString();
      let t_2355 = actual_2354 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2356() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2354 + ")";
      }
      test_2349.assert(t_2355, fn_2356);
      let t_2357 = new SqlBuilder();
      t_2357.appendSafe("select p.id from person p ");
      t_2357.appendPart(condition_2352.toSource());
      const actual_2358 = t_2357.accumulated.toString();
      let t_2359 = actual_2358 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2360() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2358 + ")";
      }
      test_2349.assert(t_2359, fn_2360);
      const parts_2361 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_2362 = new SqlBuilder();
      t_2362.appendSafe("select ");
      t_2362.appendPartList(parts_2361);
      const actual_2363 = t_2362.accumulated.toString();
      let t_2364 = actual_2363 === "select 'a''b', 3";
      function fn_2365() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_2363 + ")";
      }
      test_2349.assert(t_2364, fn_2365);
      return;
    } finally {
      test_2349.softFailToHard();
    }
});
