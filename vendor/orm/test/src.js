import {
  BoolField, FieldDef, FloatField, ForShare, ForUpdate, IntField, NullsFirst, NullsLast, NumberValidationOpts, SafeIdentifier, SqlBoolean, SqlBuilder, SqlDefault, SqlInt32, SqlString, StringField, TableDef, avgCol, changeset, col, countAll, countCol, deleteFrom, deleteSql, exceptSql, existsSql, from, intersectSql, maxCol, minCol, safeIdentifier, subquery, sumCol, timestamps, unionAllSql, unionSql, update
} from "../src.js";
import {
  Test as Test_949
} from "@temperlang/std/testing";
import {
  panic as panic_946, mapConstructor as mapConstructor_929, pairConstructor as pairConstructor_951, listedGet as listedGet_197, mappedGetOr as mappedGetOr_94, listBuilderAdd as listBuilderAdd_113, listBuilderToList as listBuilderToList_114
} from "@temperlang/core";
/**
 * @param {string} name_943
 * @returns {SafeIdentifier}
 */
function csid_942(name_943) {
  let return_944;
  let t_945;
  try {
    t_945 = safeIdentifier(name_943);
    return_944 = t_945;
  } catch {
    return_944 = panic_946();
  }
  return return_944;
}
/** @returns {TableDef} */
function userTable_947() {
  return new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("name"), new StringField(), false, null, false), new FieldDef(csid_942("email"), new StringField(), false, null, false), new FieldDef(csid_942("age"), new IntField(), true, null, false), new FieldDef(csid_942("score"), new FloatField(), true, null, false), new FieldDef(csid_942("active"), new BoolField(), true, null, false)]), null);
}
it("cast whitelists allowed fields", function () {
    const test_948 = new Test_949();
    try {
      const params_950 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("email", "alice@example.com"), pairConstructor_951("admin", "true")]));
      let t_952 = userTable_947();
      let t_953 = csid_942("name");
      let t_954 = csid_942("email");
      const cs_955 = changeset(t_952, params_950).cast(Object.freeze([t_953, t_954]));
      let t_956 = cs_955.changes.has("name");
      function fn_957() {
        return "name should be in changes";
      }
      test_948.assert(t_956, fn_957);
      let t_958 = cs_955.changes.has("email");
      function fn_959() {
        return "email should be in changes";
      }
      test_948.assert(t_958, fn_959);
      let t_960 = ! cs_955.changes.has("admin");
      function fn_961() {
        return "admin must be dropped (not in whitelist)";
      }
      test_948.assert(t_960, fn_961);
      let t_962 = cs_955.isValid;
      function fn_963() {
        return "should still be valid";
      }
      test_948.assert(t_962, fn_963);
      return;
    } finally {
      test_948.softFailToHard();
    }
});
it("cast is replacing not additive — second call resets whitelist", function () {
    const test_964 = new Test_949();
    try {
      const params_965 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("email", "alice@example.com")]));
      let t_966 = userTable_947();
      let t_967 = csid_942("name");
      const cs_968 = changeset(t_966, params_965).cast(Object.freeze([t_967])).cast(Object.freeze([csid_942("email")]));
      let t_969 = ! cs_968.changes.has("name");
      function fn_970() {
        return "name must be excluded by second cast";
      }
      test_964.assert(t_969, fn_970);
      let t_971 = cs_968.changes.has("email");
      function fn_972() {
        return "email should be present";
      }
      test_964.assert(t_971, fn_972);
      return;
    } finally {
      test_964.softFailToHard();
    }
});
it("cast ignores empty string values", function () {
    const test_973 = new Test_949();
    try {
      const params_974 = mapConstructor_929(Object.freeze([pairConstructor_951("name", ""), pairConstructor_951("email", "bob@example.com")]));
      let t_975 = userTable_947();
      let t_976 = csid_942("name");
      let t_977 = csid_942("email");
      const cs_978 = changeset(t_975, params_974).cast(Object.freeze([t_976, t_977]));
      let t_979 = ! cs_978.changes.has("name");
      function fn_980() {
        return "empty name should not be in changes";
      }
      test_973.assert(t_979, fn_980);
      let t_981 = cs_978.changes.has("email");
      function fn_982() {
        return "email should be in changes";
      }
      test_973.assert(t_981, fn_982);
      return;
    } finally {
      test_973.softFailToHard();
    }
});
it("validateRequired passes when field present", function () {
    const test_983 = new Test_949();
    try {
      const params_984 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_985 = userTable_947();
      let t_986 = csid_942("name");
      const cs_987 = changeset(t_985, params_984).cast(Object.freeze([t_986])).validateRequired(Object.freeze([csid_942("name")]));
      let t_988 = cs_987.isValid;
      function fn_989() {
        return "should be valid";
      }
      test_983.assert(t_988, fn_989);
      let t_990 = cs_987.errors.length === 0;
      function fn_991() {
        return "no errors expected";
      }
      test_983.assert(t_990, fn_991);
      return;
    } finally {
      test_983.softFailToHard();
    }
});
it("validateRequired fails when field missing", function () {
    const test_992 = new Test_949();
    try {
      const params_993 = mapConstructor_929(Object.freeze([]));
      let t_994 = userTable_947();
      let t_995 = csid_942("name");
      const cs_996 = changeset(t_994, params_993).cast(Object.freeze([t_995])).validateRequired(Object.freeze([csid_942("name")]));
      let t_997 = ! cs_996.isValid;
      function fn_998() {
        return "should be invalid";
      }
      test_992.assert(t_997, fn_998);
      let t_999 = cs_996.errors.length === 1;
      function fn_1000() {
        return "should have one error";
      }
      test_992.assert(t_999, fn_1000);
      let t_1001 = listedGet_197(cs_996.errors, 0).field === "name";
      function fn_1002() {
        return "error should name the field";
      }
      test_992.assert(t_1001, fn_1002);
      return;
    } finally {
      test_992.softFailToHard();
    }
});
it("validateLength passes within range", function () {
    const test_1003 = new Test_949();
    try {
      const params_1004 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1005 = userTable_947();
      let t_1006 = csid_942("name");
      const cs_1007 = changeset(t_1005, params_1004).cast(Object.freeze([t_1006])).validateLength(csid_942("name"), 2, 50);
      let t_1008 = cs_1007.isValid;
      function fn_1009() {
        return "should be valid";
      }
      test_1003.assert(t_1008, fn_1009);
      return;
    } finally {
      test_1003.softFailToHard();
    }
});
it("validateLength fails when too short", function () {
    const test_1010 = new Test_949();
    try {
      const params_1011 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "A")]));
      let t_1012 = userTable_947();
      let t_1013 = csid_942("name");
      const cs_1014 = changeset(t_1012, params_1011).cast(Object.freeze([t_1013])).validateLength(csid_942("name"), 2, 50);
      let t_1015 = ! cs_1014.isValid;
      function fn_1016() {
        return "should be invalid";
      }
      test_1010.assert(t_1015, fn_1016);
      return;
    } finally {
      test_1010.softFailToHard();
    }
});
it("validateLength fails when too long", function () {
    const test_1017 = new Test_949();
    try {
      const params_1018 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")]));
      let t_1019 = userTable_947();
      let t_1020 = csid_942("name");
      const cs_1021 = changeset(t_1019, params_1018).cast(Object.freeze([t_1020])).validateLength(csid_942("name"), 2, 10);
      let t_1022 = ! cs_1021.isValid;
      function fn_1023() {
        return "should be invalid";
      }
      test_1017.assert(t_1022, fn_1023);
      return;
    } finally {
      test_1017.softFailToHard();
    }
});
it("validateInt passes for valid integer", function () {
    const test_1024 = new Test_949();
    try {
      const params_1025 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "30")]));
      let t_1026 = userTable_947();
      let t_1027 = csid_942("age");
      const cs_1028 = changeset(t_1026, params_1025).cast(Object.freeze([t_1027])).validateInt(csid_942("age"));
      let t_1029 = cs_1028.isValid;
      function fn_1030() {
        return "should be valid";
      }
      test_1024.assert(t_1029, fn_1030);
      return;
    } finally {
      test_1024.softFailToHard();
    }
});
it("validateInt fails for non-integer", function () {
    const test_1031 = new Test_949();
    try {
      const params_1032 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "not-a-number")]));
      let t_1033 = userTable_947();
      let t_1034 = csid_942("age");
      const cs_1035 = changeset(t_1033, params_1032).cast(Object.freeze([t_1034])).validateInt(csid_942("age"));
      let t_1036 = ! cs_1035.isValid;
      function fn_1037() {
        return "should be invalid";
      }
      test_1031.assert(t_1036, fn_1037);
      return;
    } finally {
      test_1031.softFailToHard();
    }
});
it("validateFloat passes for valid float", function () {
    const test_1038 = new Test_949();
    try {
      const params_1039 = mapConstructor_929(Object.freeze([pairConstructor_951("score", "9.5")]));
      let t_1040 = userTable_947();
      let t_1041 = csid_942("score");
      const cs_1042 = changeset(t_1040, params_1039).cast(Object.freeze([t_1041])).validateFloat(csid_942("score"));
      let t_1043 = cs_1042.isValid;
      function fn_1044() {
        return "should be valid";
      }
      test_1038.assert(t_1043, fn_1044);
      return;
    } finally {
      test_1038.softFailToHard();
    }
});
it("validateInt64 passes for valid 64-bit integer", function () {
    const test_1045 = new Test_949();
    try {
      const params_1046 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "9999999999")]));
      let t_1047 = userTable_947();
      let t_1048 = csid_942("age");
      const cs_1049 = changeset(t_1047, params_1046).cast(Object.freeze([t_1048])).validateInt64(csid_942("age"));
      let t_1050 = cs_1049.isValid;
      function fn_1051() {
        return "should be valid";
      }
      test_1045.assert(t_1050, fn_1051);
      return;
    } finally {
      test_1045.softFailToHard();
    }
});
it("validateInt64 fails for non-integer", function () {
    const test_1052 = new Test_949();
    try {
      const params_1053 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "not-a-number")]));
      let t_1054 = userTable_947();
      let t_1055 = csid_942("age");
      const cs_1056 = changeset(t_1054, params_1053).cast(Object.freeze([t_1055])).validateInt64(csid_942("age"));
      let t_1057 = ! cs_1056.isValid;
      function fn_1058() {
        return "should be invalid";
      }
      test_1052.assert(t_1057, fn_1058);
      return;
    } finally {
      test_1052.softFailToHard();
    }
});
it("validateBool accepts true/1/yes/on", function () {
    const test_1059 = new Test_949();
    try {
      function fn_1060(v_1061) {
        const params_1062 = mapConstructor_929(Object.freeze([pairConstructor_951("active", v_1061)]));
        let t_1063 = userTable_947();
        let t_1064 = csid_942("active");
        const cs_1065 = changeset(t_1063, params_1062).cast(Object.freeze([t_1064])).validateBool(csid_942("active"));
        let t_1066 = cs_1065.isValid;
        function fn_1067() {
          return "should accept: " + v_1061;
        }
        test_1059.assert(t_1066, fn_1067);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_1060);
      return;
    } finally {
      test_1059.softFailToHard();
    }
});
it("validateBool accepts false/0/no/off", function () {
    const test_1068 = new Test_949();
    try {
      function fn_1069(v_1070) {
        const params_1071 = mapConstructor_929(Object.freeze([pairConstructor_951("active", v_1070)]));
        let t_1072 = userTable_947();
        let t_1073 = csid_942("active");
        const cs_1074 = changeset(t_1072, params_1071).cast(Object.freeze([t_1073])).validateBool(csid_942("active"));
        let t_1075 = cs_1074.isValid;
        function fn_1076() {
          return "should accept: " + v_1070;
        }
        test_1068.assert(t_1075, fn_1076);
        return;
      }
      Object.freeze(["false", "0", "no", "off"]).forEach(fn_1069);
      return;
    } finally {
      test_1068.softFailToHard();
    }
});
it("validateBool rejects ambiguous values", function () {
    const test_1077 = new Test_949();
    try {
      function fn_1078(v_1079) {
        const params_1080 = mapConstructor_929(Object.freeze([pairConstructor_951("active", v_1079)]));
        let t_1081 = userTable_947();
        let t_1082 = csid_942("active");
        const cs_1083 = changeset(t_1081, params_1080).cast(Object.freeze([t_1082])).validateBool(csid_942("active"));
        let t_1084 = ! cs_1083.isValid;
        function fn_1085() {
          return "should reject ambiguous: " + v_1079;
        }
        test_1077.assert(t_1084, fn_1085);
        return;
      }
      Object.freeze(["TRUE", "Yes", "maybe", "2", "enabled"]).forEach(fn_1078);
      return;
    } finally {
      test_1077.softFailToHard();
    }
});
it("toInsertSql escapes Bobby Tables", function () {
    const test_1086 = new Test_949();
    try {
      let t_1087;
      const params_1088 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Robert'); DROP TABLE users;--"), pairConstructor_951("email", "bobby@evil.com")]));
      let t_1089 = userTable_947();
      let t_1090 = csid_942("name");
      let t_1091 = csid_942("email");
      const cs_1092 = changeset(t_1089, params_1088).cast(Object.freeze([t_1090, t_1091])).validateRequired(Object.freeze([csid_942("name"), csid_942("email")]));
      let sqlFrag_1093;
      try {
        t_1087 = cs_1092.toInsertSql();
        sqlFrag_1093 = t_1087;
      } catch {
        sqlFrag_1093 = panic_946();
      }
      const s_1094 = sqlFrag_1093.toString();
      let t_1095 = s_1094.indexOf("''") >= 0;
      function fn_1096() {
        return "single quote must be doubled: " + s_1094;
      }
      test_1086.assert(t_1095, fn_1096);
      return;
    } finally {
      test_1086.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for string field", function () {
    const test_1097 = new Test_949();
    try {
      let t_1098;
      const params_1099 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("email", "a@example.com")]));
      let t_1100 = userTable_947();
      let t_1101 = csid_942("name");
      let t_1102 = csid_942("email");
      const cs_1103 = changeset(t_1100, params_1099).cast(Object.freeze([t_1101, t_1102])).validateRequired(Object.freeze([csid_942("name"), csid_942("email")]));
      let sqlFrag_1104;
      try {
        t_1098 = cs_1103.toInsertSql();
        sqlFrag_1104 = t_1098;
      } catch {
        sqlFrag_1104 = panic_946();
      }
      const s_1105 = sqlFrag_1104.toString();
      let t_1106 = s_1105.indexOf("INSERT INTO users") >= 0;
      function fn_1107() {
        return "has INSERT INTO: " + s_1105;
      }
      test_1097.assert(t_1106, fn_1107);
      let t_1108 = s_1105.indexOf("'Alice'") >= 0;
      function fn_1109() {
        return "has quoted name: " + s_1105;
      }
      test_1097.assert(t_1108, fn_1109);
      return;
    } finally {
      test_1097.softFailToHard();
    }
});
it("toInsertSql produces correct SQL for int field", function () {
    const test_1110 = new Test_949();
    try {
      let t_1111;
      const params_1112 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Bob"), pairConstructor_951("email", "b@example.com"), pairConstructor_951("age", "25")]));
      let t_1113 = userTable_947();
      let t_1114 = csid_942("name");
      let t_1115 = csid_942("email");
      let t_1116 = csid_942("age");
      const cs_1117 = changeset(t_1113, params_1112).cast(Object.freeze([t_1114, t_1115, t_1116])).validateRequired(Object.freeze([csid_942("name"), csid_942("email")]));
      let sqlFrag_1118;
      try {
        t_1111 = cs_1117.toInsertSql();
        sqlFrag_1118 = t_1111;
      } catch {
        sqlFrag_1118 = panic_946();
      }
      const s_1119 = sqlFrag_1118.toString();
      let t_1120 = s_1119.indexOf("25") >= 0;
      function fn_1121() {
        return "age rendered unquoted: " + s_1119;
      }
      test_1110.assert(t_1120, fn_1121);
      return;
    } finally {
      test_1110.softFailToHard();
    }
});
it("toInsertSql bubbles on invalid changeset", function () {
    const test_1122 = new Test_949();
    try {
      const params_1123 = mapConstructor_929(Object.freeze([]));
      let t_1124 = userTable_947();
      let t_1125 = csid_942("name");
      const cs_1126 = changeset(t_1124, params_1123).cast(Object.freeze([t_1125])).validateRequired(Object.freeze([csid_942("name")]));
      let didBubble_1127;
      try {
        cs_1126.toInsertSql();
        didBubble_1127 = false;
      } catch {
        didBubble_1127 = true;
      }
      function fn_1128() {
        return "invalid changeset should bubble";
      }
      test_1122.assert(didBubble_1127, fn_1128);
      return;
    } finally {
      test_1122.softFailToHard();
    }
});
it("toInsertSql enforces non-nullable fields independently of isValid", function () {
    const test_1129 = new Test_949();
    try {
      const strictTable_1130 = new TableDef(csid_942("posts"), Object.freeze([new FieldDef(csid_942("title"), new StringField(), false, null, false), new FieldDef(csid_942("body"), new StringField(), true, null, false)]), null);
      const params_1131 = mapConstructor_929(Object.freeze([pairConstructor_951("body", "hello")]));
      let t_1132 = csid_942("body");
      const cs_1133 = changeset(strictTable_1130, params_1131).cast(Object.freeze([t_1132]));
      let t_1134 = cs_1133.isValid;
      function fn_1135() {
        return "changeset should appear valid (no explicit validation run)";
      }
      test_1129.assert(t_1134, fn_1135);
      let didBubble_1136;
      try {
        cs_1133.toInsertSql();
        didBubble_1136 = false;
      } catch {
        didBubble_1136 = true;
      }
      function fn_1137() {
        return "toInsertSql should enforce nullable regardless of isValid";
      }
      test_1129.assert(didBubble_1136, fn_1137);
      return;
    } finally {
      test_1129.softFailToHard();
    }
});
it("toUpdateSql produces correct SQL", function () {
    const test_1138 = new Test_949();
    try {
      let t_1139;
      const params_1140 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Bob")]));
      let t_1141 = userTable_947();
      let t_1142 = csid_942("name");
      const cs_1143 = changeset(t_1141, params_1140).cast(Object.freeze([t_1142])).validateRequired(Object.freeze([csid_942("name")]));
      let sqlFrag_1144;
      try {
        t_1139 = cs_1143.toUpdateSql(42);
        sqlFrag_1144 = t_1139;
      } catch {
        sqlFrag_1144 = panic_946();
      }
      const s_1145 = sqlFrag_1144.toString();
      let t_1146 = s_1145 === "UPDATE users SET name = 'Bob' WHERE id = 42";
      function fn_1147() {
        return "got: " + s_1145;
      }
      test_1138.assert(t_1146, fn_1147);
      return;
    } finally {
      test_1138.softFailToHard();
    }
});
it("toUpdateSql bubbles on invalid changeset", function () {
    const test_1148 = new Test_949();
    try {
      const params_1149 = mapConstructor_929(Object.freeze([]));
      let t_1150 = userTable_947();
      let t_1151 = csid_942("name");
      const cs_1152 = changeset(t_1150, params_1149).cast(Object.freeze([t_1151])).validateRequired(Object.freeze([csid_942("name")]));
      let didBubble_1153;
      try {
        cs_1152.toUpdateSql(1);
        didBubble_1153 = false;
      } catch {
        didBubble_1153 = true;
      }
      function fn_1154() {
        return "invalid changeset should bubble";
      }
      test_1148.assert(didBubble_1153, fn_1154);
      return;
    } finally {
      test_1148.softFailToHard();
    }
});
it("putChange adds a new field", function () {
    const test_1155 = new Test_949();
    try {
      const params_1156 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1157 = userTable_947();
      let t_1158 = csid_942("name");
      const cs_1159 = changeset(t_1157, params_1156).cast(Object.freeze([t_1158])).putChange(csid_942("email"), "alice@example.com");
      let t_1160 = cs_1159.changes.has("email");
      function fn_1161() {
        return "email should be in changes";
      }
      test_1155.assert(t_1160, fn_1161);
      let t_1162 = mappedGetOr_94(cs_1159.changes, "email", "") === "alice@example.com";
      function fn_1163() {
        return "email value";
      }
      test_1155.assert(t_1162, fn_1163);
      return;
    } finally {
      test_1155.softFailToHard();
    }
});
it("putChange overwrites existing field", function () {
    const test_1164 = new Test_949();
    try {
      const params_1165 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1166 = userTable_947();
      let t_1167 = csid_942("name");
      const cs_1168 = changeset(t_1166, params_1165).cast(Object.freeze([t_1167])).putChange(csid_942("name"), "Bob");
      let t_1169 = mappedGetOr_94(cs_1168.changes, "name", "") === "Bob";
      function fn_1170() {
        return "name should be overwritten";
      }
      test_1164.assert(t_1169, fn_1170);
      return;
    } finally {
      test_1164.softFailToHard();
    }
});
it("putChange value appears in toInsertSql", function () {
    const test_1171 = new Test_949();
    try {
      let t_1172;
      let t_1173;
      const params_1174 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("email", "a@example.com")]));
      let t_1175 = userTable_947();
      let t_1176 = csid_942("name");
      let t_1177 = csid_942("email");
      const cs_1178 = changeset(t_1175, params_1174).cast(Object.freeze([t_1176, t_1177])).putChange(csid_942("name"), "Bob");
      try {
        t_1172 = cs_1178.toInsertSql();
        t_1173 = t_1172;
      } catch {
        t_1173 = panic_946();
      }
      const s_1179 = t_1173.toString();
      let t_1180 = s_1179.indexOf("'Bob'") >= 0;
      function fn_1181() {
        return "should use putChange value: " + s_1179;
      }
      test_1171.assert(t_1180, fn_1181);
      return;
    } finally {
      test_1171.softFailToHard();
    }
});
it("getChange returns value for existing field", function () {
    const test_1182 = new Test_949();
    try {
      let t_1183;
      const params_1184 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1185 = userTable_947();
      let t_1186 = csid_942("name");
      const cs_1187 = changeset(t_1185, params_1184).cast(Object.freeze([t_1186]));
      let val_1188;
      try {
        t_1183 = cs_1187.getChange(csid_942("name"));
        val_1188 = t_1183;
      } catch {
        val_1188 = panic_946();
      }
      let t_1189 = val_1188 === "Alice";
      function fn_1190() {
        return "should return Alice";
      }
      test_1182.assert(t_1189, fn_1190);
      return;
    } finally {
      test_1182.softFailToHard();
    }
});
it("getChange bubbles on missing field", function () {
    const test_1191 = new Test_949();
    try {
      const params_1192 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1193 = userTable_947();
      let t_1194 = csid_942("name");
      const cs_1195 = changeset(t_1193, params_1192).cast(Object.freeze([t_1194]));
      let didBubble_1196;
      try {
        cs_1195.getChange(csid_942("email"));
        didBubble_1196 = false;
      } catch {
        didBubble_1196 = true;
      }
      function fn_1197() {
        return "should bubble for missing field";
      }
      test_1191.assert(didBubble_1196, fn_1197);
      return;
    } finally {
      test_1191.softFailToHard();
    }
});
it("deleteChange removes field", function () {
    const test_1198 = new Test_949();
    try {
      const params_1199 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("email", "a@example.com")]));
      let t_1200 = userTable_947();
      let t_1201 = csid_942("name");
      let t_1202 = csid_942("email");
      const cs_1203 = changeset(t_1200, params_1199).cast(Object.freeze([t_1201, t_1202])).deleteChange(csid_942("email"));
      let t_1204 = ! cs_1203.changes.has("email");
      function fn_1205() {
        return "email should be removed";
      }
      test_1198.assert(t_1204, fn_1205);
      let t_1206 = cs_1203.changes.has("name");
      function fn_1207() {
        return "name should remain";
      }
      test_1198.assert(t_1206, fn_1207);
      return;
    } finally {
      test_1198.softFailToHard();
    }
});
it("deleteChange on nonexistent field is no-op", function () {
    const test_1208 = new Test_949();
    try {
      const params_1209 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1210 = userTable_947();
      let t_1211 = csid_942("name");
      const cs_1212 = changeset(t_1210, params_1209).cast(Object.freeze([t_1211])).deleteChange(csid_942("email"));
      let t_1213 = cs_1212.changes.has("name");
      function fn_1214() {
        return "name should still be present";
      }
      test_1208.assert(t_1213, fn_1214);
      let t_1215 = cs_1212.isValid;
      function fn_1216() {
        return "should still be valid";
      }
      test_1208.assert(t_1215, fn_1216);
      return;
    } finally {
      test_1208.softFailToHard();
    }
});
it("validateInclusion passes when value in list", function () {
    const test_1217 = new Test_949();
    try {
      const params_1218 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "admin")]));
      let t_1219 = userTable_947();
      let t_1220 = csid_942("name");
      const cs_1221 = changeset(t_1219, params_1218).cast(Object.freeze([t_1220])).validateInclusion(csid_942("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1222 = cs_1221.isValid;
      function fn_1223() {
        return "should be valid";
      }
      test_1217.assert(t_1222, fn_1223);
      return;
    } finally {
      test_1217.softFailToHard();
    }
});
it("validateInclusion fails when value not in list", function () {
    const test_1224 = new Test_949();
    try {
      const params_1225 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "hacker")]));
      let t_1226 = userTable_947();
      let t_1227 = csid_942("name");
      const cs_1228 = changeset(t_1226, params_1225).cast(Object.freeze([t_1227])).validateInclusion(csid_942("name"), Object.freeze(["admin", "user", "guest"]));
      let t_1229 = ! cs_1228.isValid;
      function fn_1230() {
        return "should be invalid";
      }
      test_1224.assert(t_1229, fn_1230);
      let t_1231 = listedGet_197(cs_1228.errors, 0).field === "name";
      function fn_1232() {
        return "error on name";
      }
      test_1224.assert(t_1231, fn_1232);
      return;
    } finally {
      test_1224.softFailToHard();
    }
});
it("validateInclusion skips when field not in changes", function () {
    const test_1233 = new Test_949();
    try {
      const params_1234 = mapConstructor_929(Object.freeze([]));
      let t_1235 = userTable_947();
      let t_1236 = csid_942("name");
      const cs_1237 = changeset(t_1235, params_1234).cast(Object.freeze([t_1236])).validateInclusion(csid_942("name"), Object.freeze(["admin", "user"]));
      let t_1238 = cs_1237.isValid;
      function fn_1239() {
        return "should be valid when field absent";
      }
      test_1233.assert(t_1238, fn_1239);
      return;
    } finally {
      test_1233.softFailToHard();
    }
});
it("validateExclusion passes when value not in list", function () {
    const test_1240 = new Test_949();
    try {
      const params_1241 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1242 = userTable_947();
      let t_1243 = csid_942("name");
      const cs_1244 = changeset(t_1242, params_1241).cast(Object.freeze([t_1243])).validateExclusion(csid_942("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1245 = cs_1244.isValid;
      function fn_1246() {
        return "should be valid";
      }
      test_1240.assert(t_1245, fn_1246);
      return;
    } finally {
      test_1240.softFailToHard();
    }
});
it("validateExclusion fails when value in list", function () {
    const test_1247 = new Test_949();
    try {
      const params_1248 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "admin")]));
      let t_1249 = userTable_947();
      let t_1250 = csid_942("name");
      const cs_1251 = changeset(t_1249, params_1248).cast(Object.freeze([t_1250])).validateExclusion(csid_942("name"), Object.freeze(["root", "admin", "superuser"]));
      let t_1252 = ! cs_1251.isValid;
      function fn_1253() {
        return "should be invalid";
      }
      test_1247.assert(t_1252, fn_1253);
      let t_1254 = listedGet_197(cs_1251.errors, 0).field === "name";
      function fn_1255() {
        return "error on name";
      }
      test_1247.assert(t_1254, fn_1255);
      return;
    } finally {
      test_1247.softFailToHard();
    }
});
it("validateExclusion skips when field not in changes", function () {
    const test_1256 = new Test_949();
    try {
      const params_1257 = mapConstructor_929(Object.freeze([]));
      let t_1258 = userTable_947();
      let t_1259 = csid_942("name");
      const cs_1260 = changeset(t_1258, params_1257).cast(Object.freeze([t_1259])).validateExclusion(csid_942("name"), Object.freeze(["root", "admin"]));
      let t_1261 = cs_1260.isValid;
      function fn_1262() {
        return "should be valid when field absent";
      }
      test_1256.assert(t_1261, fn_1262);
      return;
    } finally {
      test_1256.softFailToHard();
    }
});
it("validateNumber greaterThan passes", function () {
    const test_1263 = new Test_949();
    try {
      const params_1264 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "25")]));
      let t_1265 = userTable_947();
      let t_1266 = csid_942("age");
      const cs_1267 = changeset(t_1265, params_1264).cast(Object.freeze([t_1266])).validateNumber(csid_942("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1268 = cs_1267.isValid;
      function fn_1269() {
        return "25 > 18 should pass";
      }
      test_1263.assert(t_1268, fn_1269);
      return;
    } finally {
      test_1263.softFailToHard();
    }
});
it("validateNumber greaterThan fails", function () {
    const test_1270 = new Test_949();
    try {
      const params_1271 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "15")]));
      let t_1272 = userTable_947();
      let t_1273 = csid_942("age");
      const cs_1274 = changeset(t_1272, params_1271).cast(Object.freeze([t_1273])).validateNumber(csid_942("age"), new NumberValidationOpts(18.0, null, null, null, null));
      let t_1275 = ! cs_1274.isValid;
      function fn_1276() {
        return "15 > 18 should fail";
      }
      test_1270.assert(t_1275, fn_1276);
      return;
    } finally {
      test_1270.softFailToHard();
    }
});
it("validateNumber lessThan passes", function () {
    const test_1277 = new Test_949();
    try {
      const params_1278 = mapConstructor_929(Object.freeze([pairConstructor_951("score", "8.5")]));
      let t_1279 = userTable_947();
      let t_1280 = csid_942("score");
      const cs_1281 = changeset(t_1279, params_1278).cast(Object.freeze([t_1280])).validateNumber(csid_942("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1282 = cs_1281.isValid;
      function fn_1283() {
        return "8.5 < 10 should pass";
      }
      test_1277.assert(t_1282, fn_1283);
      return;
    } finally {
      test_1277.softFailToHard();
    }
});
it("validateNumber lessThan fails", function () {
    const test_1284 = new Test_949();
    try {
      const params_1285 = mapConstructor_929(Object.freeze([pairConstructor_951("score", "12.0")]));
      let t_1286 = userTable_947();
      let t_1287 = csid_942("score");
      const cs_1288 = changeset(t_1286, params_1285).cast(Object.freeze([t_1287])).validateNumber(csid_942("score"), new NumberValidationOpts(null, 10.0, null, null, null));
      let t_1289 = ! cs_1288.isValid;
      function fn_1290() {
        return "12 < 10 should fail";
      }
      test_1284.assert(t_1289, fn_1290);
      return;
    } finally {
      test_1284.softFailToHard();
    }
});
it("validateNumber greaterThanOrEqual boundary", function () {
    const test_1291 = new Test_949();
    try {
      const params_1292 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "18")]));
      let t_1293 = userTable_947();
      let t_1294 = csid_942("age");
      const cs_1295 = changeset(t_1293, params_1292).cast(Object.freeze([t_1294])).validateNumber(csid_942("age"), new NumberValidationOpts(null, null, 18.0, null, null));
      let t_1296 = cs_1295.isValid;
      function fn_1297() {
        return "18 >= 18 should pass";
      }
      test_1291.assert(t_1296, fn_1297);
      return;
    } finally {
      test_1291.softFailToHard();
    }
});
it("validateNumber combined options", function () {
    const test_1298 = new Test_949();
    try {
      const params_1299 = mapConstructor_929(Object.freeze([pairConstructor_951("score", "5.0")]));
      let t_1300 = userTable_947();
      let t_1301 = csid_942("score");
      const cs_1302 = changeset(t_1300, params_1299).cast(Object.freeze([t_1301])).validateNumber(csid_942("score"), new NumberValidationOpts(0.0, 10.0, null, null, null));
      let t_1303 = cs_1302.isValid;
      function fn_1304() {
        return "5 > 0 and < 10 should pass";
      }
      test_1298.assert(t_1303, fn_1304);
      return;
    } finally {
      test_1298.softFailToHard();
    }
});
it("validateNumber non-numeric value", function () {
    const test_1305 = new Test_949();
    try {
      const params_1306 = mapConstructor_929(Object.freeze([pairConstructor_951("age", "abc")]));
      let t_1307 = userTable_947();
      let t_1308 = csid_942("age");
      const cs_1309 = changeset(t_1307, params_1306).cast(Object.freeze([t_1308])).validateNumber(csid_942("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1310 = ! cs_1309.isValid;
      function fn_1311() {
        return "non-numeric should fail";
      }
      test_1305.assert(t_1310, fn_1311);
      let t_1312 = listedGet_197(cs_1309.errors, 0).message === "must be a number";
      function fn_1313() {
        return "correct error message";
      }
      test_1305.assert(t_1312, fn_1313);
      return;
    } finally {
      test_1305.softFailToHard();
    }
});
it("validateNumber skips when field not in changes", function () {
    const test_1314 = new Test_949();
    try {
      const params_1315 = mapConstructor_929(Object.freeze([]));
      let t_1316 = userTable_947();
      let t_1317 = csid_942("age");
      const cs_1318 = changeset(t_1316, params_1315).cast(Object.freeze([t_1317])).validateNumber(csid_942("age"), new NumberValidationOpts(0.0, null, null, null, null));
      let t_1319 = cs_1318.isValid;
      function fn_1320() {
        return "should be valid when field absent";
      }
      test_1314.assert(t_1319, fn_1320);
      return;
    } finally {
      test_1314.softFailToHard();
    }
});
it("validateAcceptance passes for true values", function () {
    const test_1321 = new Test_949();
    try {
      function fn_1322(v_1323) {
        const params_1324 = mapConstructor_929(Object.freeze([pairConstructor_951("active", v_1323)]));
        let t_1325 = userTable_947();
        let t_1326 = csid_942("active");
        const cs_1327 = changeset(t_1325, params_1324).cast(Object.freeze([t_1326])).validateAcceptance(csid_942("active"));
        let t_1328 = cs_1327.isValid;
        function fn_1329() {
          return "should accept: " + v_1323;
        }
        test_1321.assert(t_1328, fn_1329);
        return;
      }
      Object.freeze(["true", "1", "yes", "on"]).forEach(fn_1322);
      return;
    } finally {
      test_1321.softFailToHard();
    }
});
it("validateAcceptance fails for non-true values", function () {
    const test_1330 = new Test_949();
    try {
      const params_1331 = mapConstructor_929(Object.freeze([pairConstructor_951("active", "false")]));
      let t_1332 = userTable_947();
      let t_1333 = csid_942("active");
      const cs_1334 = changeset(t_1332, params_1331).cast(Object.freeze([t_1333])).validateAcceptance(csid_942("active"));
      let t_1335 = ! cs_1334.isValid;
      function fn_1336() {
        return "false should not be accepted";
      }
      test_1330.assert(t_1335, fn_1336);
      let t_1337 = listedGet_197(cs_1334.errors, 0).message === "must be accepted";
      function fn_1338() {
        return "correct message";
      }
      test_1330.assert(t_1337, fn_1338);
      return;
    } finally {
      test_1330.softFailToHard();
    }
});
it("validateConfirmation passes when fields match", function () {
    const test_1339 = new Test_949();
    try {
      const tbl_1340 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("password"), new StringField(), false, null, false), new FieldDef(csid_942("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1341 = mapConstructor_929(Object.freeze([pairConstructor_951("password", "secret123"), pairConstructor_951("password_confirmation", "secret123")]));
      let t_1342 = csid_942("password");
      let t_1343 = csid_942("password_confirmation");
      const cs_1344 = changeset(tbl_1340, params_1341).cast(Object.freeze([t_1342, t_1343])).validateConfirmation(csid_942("password"), csid_942("password_confirmation"));
      let t_1345 = cs_1344.isValid;
      function fn_1346() {
        return "matching fields should pass";
      }
      test_1339.assert(t_1345, fn_1346);
      return;
    } finally {
      test_1339.softFailToHard();
    }
});
it("validateConfirmation fails when fields differ", function () {
    const test_1347 = new Test_949();
    try {
      const tbl_1348 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("password"), new StringField(), false, null, false), new FieldDef(csid_942("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1349 = mapConstructor_929(Object.freeze([pairConstructor_951("password", "secret123"), pairConstructor_951("password_confirmation", "wrong456")]));
      let t_1350 = csid_942("password");
      let t_1351 = csid_942("password_confirmation");
      const cs_1352 = changeset(tbl_1348, params_1349).cast(Object.freeze([t_1350, t_1351])).validateConfirmation(csid_942("password"), csid_942("password_confirmation"));
      let t_1353 = ! cs_1352.isValid;
      function fn_1354() {
        return "mismatched fields should fail";
      }
      test_1347.assert(t_1353, fn_1354);
      let t_1355 = listedGet_197(cs_1352.errors, 0).field === "password_confirmation";
      function fn_1356() {
        return "error on confirmation field";
      }
      test_1347.assert(t_1355, fn_1356);
      return;
    } finally {
      test_1347.softFailToHard();
    }
});
it("validateConfirmation fails when confirmation missing", function () {
    const test_1357 = new Test_949();
    try {
      const tbl_1358 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("password"), new StringField(), false, null, false), new FieldDef(csid_942("password_confirmation"), new StringField(), true, null, false)]), null);
      const params_1359 = mapConstructor_929(Object.freeze([pairConstructor_951("password", "secret123")]));
      let t_1360 = csid_942("password");
      const cs_1361 = changeset(tbl_1358, params_1359).cast(Object.freeze([t_1360])).validateConfirmation(csid_942("password"), csid_942("password_confirmation"));
      let t_1362 = ! cs_1361.isValid;
      function fn_1363() {
        return "missing confirmation should fail";
      }
      test_1357.assert(t_1362, fn_1363);
      return;
    } finally {
      test_1357.softFailToHard();
    }
});
it("validateContains passes when substring found", function () {
    const test_1364 = new Test_949();
    try {
      const params_1365 = mapConstructor_929(Object.freeze([pairConstructor_951("email", "alice@example.com")]));
      let t_1366 = userTable_947();
      let t_1367 = csid_942("email");
      const cs_1368 = changeset(t_1366, params_1365).cast(Object.freeze([t_1367])).validateContains(csid_942("email"), "@");
      let t_1369 = cs_1368.isValid;
      function fn_1370() {
        return "should pass when @ present";
      }
      test_1364.assert(t_1369, fn_1370);
      return;
    } finally {
      test_1364.softFailToHard();
    }
});
it("validateContains fails when substring not found", function () {
    const test_1371 = new Test_949();
    try {
      const params_1372 = mapConstructor_929(Object.freeze([pairConstructor_951("email", "alice-example.com")]));
      let t_1373 = userTable_947();
      let t_1374 = csid_942("email");
      const cs_1375 = changeset(t_1373, params_1372).cast(Object.freeze([t_1374])).validateContains(csid_942("email"), "@");
      let t_1376 = ! cs_1375.isValid;
      function fn_1377() {
        return "should fail when @ absent";
      }
      test_1371.assert(t_1376, fn_1377);
      return;
    } finally {
      test_1371.softFailToHard();
    }
});
it("validateContains skips when field not in changes", function () {
    const test_1378 = new Test_949();
    try {
      const params_1379 = mapConstructor_929(Object.freeze([]));
      let t_1380 = userTable_947();
      let t_1381 = csid_942("email");
      const cs_1382 = changeset(t_1380, params_1379).cast(Object.freeze([t_1381])).validateContains(csid_942("email"), "@");
      let t_1383 = cs_1382.isValid;
      function fn_1384() {
        return "should be valid when field absent";
      }
      test_1378.assert(t_1383, fn_1384);
      return;
    } finally {
      test_1378.softFailToHard();
    }
});
it("validateStartsWith passes", function () {
    const test_1385 = new Test_949();
    try {
      const params_1386 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Dr. Smith")]));
      let t_1387 = userTable_947();
      let t_1388 = csid_942("name");
      const cs_1389 = changeset(t_1387, params_1386).cast(Object.freeze([t_1388])).validateStartsWith(csid_942("name"), "Dr.");
      let t_1390 = cs_1389.isValid;
      function fn_1391() {
        return "should pass for Dr. prefix";
      }
      test_1385.assert(t_1390, fn_1391);
      return;
    } finally {
      test_1385.softFailToHard();
    }
});
it("validateStartsWith fails", function () {
    const test_1392 = new Test_949();
    try {
      const params_1393 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Mr. Smith")]));
      let t_1394 = userTable_947();
      let t_1395 = csid_942("name");
      const cs_1396 = changeset(t_1394, params_1393).cast(Object.freeze([t_1395])).validateStartsWith(csid_942("name"), "Dr.");
      let t_1397 = ! cs_1396.isValid;
      function fn_1398() {
        return "should fail for Mr. prefix";
      }
      test_1392.assert(t_1397, fn_1398);
      return;
    } finally {
      test_1392.softFailToHard();
    }
});
it("validateEndsWith passes", function () {
    const test_1399 = new Test_949();
    try {
      const params_1400 = mapConstructor_929(Object.freeze([pairConstructor_951("email", "alice@example.com")]));
      let t_1401 = userTable_947();
      let t_1402 = csid_942("email");
      const cs_1403 = changeset(t_1401, params_1400).cast(Object.freeze([t_1402])).validateEndsWith(csid_942("email"), ".com");
      let t_1404 = cs_1403.isValid;
      function fn_1405() {
        return "should pass for .com suffix";
      }
      test_1399.assert(t_1404, fn_1405);
      return;
    } finally {
      test_1399.softFailToHard();
    }
});
it("validateEndsWith fails", function () {
    const test_1406 = new Test_949();
    try {
      const params_1407 = mapConstructor_929(Object.freeze([pairConstructor_951("email", "alice@example.org")]));
      let t_1408 = userTable_947();
      let t_1409 = csid_942("email");
      const cs_1410 = changeset(t_1408, params_1407).cast(Object.freeze([t_1409])).validateEndsWith(csid_942("email"), ".com");
      let t_1411 = ! cs_1410.isValid;
      function fn_1412() {
        return "should fail for .org when expecting .com";
      }
      test_1406.assert(t_1411, fn_1412);
      return;
    } finally {
      test_1406.softFailToHard();
    }
});
it("validateEndsWith handles repeated suffix correctly", function () {
    const test_1413 = new Test_949();
    try {
      const params_1414 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "abcabc")]));
      let t_1415 = userTable_947();
      let t_1416 = csid_942("name");
      const cs_1417 = changeset(t_1415, params_1414).cast(Object.freeze([t_1416])).validateEndsWith(csid_942("name"), "abc");
      let t_1418 = cs_1417.isValid;
      function fn_1419() {
        return "abcabc should end with abc";
      }
      test_1413.assert(t_1418, fn_1419);
      return;
    } finally {
      test_1413.softFailToHard();
    }
});
it("toInsertSql uses default value when field not in changes", function () {
    const test_1420 = new Test_949();
    try {
      let t_1421;
      let t_1422;
      const tbl_1423 = new TableDef(csid_942("posts"), Object.freeze([new FieldDef(csid_942("title"), new StringField(), false, null, false), new FieldDef(csid_942("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1424 = mapConstructor_929(Object.freeze([pairConstructor_951("title", "Hello")]));
      let t_1425 = csid_942("title");
      const cs_1426 = changeset(tbl_1423, params_1424).cast(Object.freeze([t_1425]));
      try {
        t_1421 = cs_1426.toInsertSql();
        t_1422 = t_1421;
      } catch {
        t_1422 = panic_946();
      }
      const s_1427 = t_1422.toString();
      let t_1428 = s_1427.indexOf("INSERT INTO posts") >= 0;
      function fn_1429() {
        return "has INSERT INTO: " + s_1427;
      }
      test_1420.assert(t_1428, fn_1429);
      let t_1430 = s_1427.indexOf("'Hello'") >= 0;
      function fn_1431() {
        return "has title value: " + s_1427;
      }
      test_1420.assert(t_1430, fn_1431);
      let t_1432 = s_1427.indexOf("DEFAULT") >= 0;
      function fn_1433() {
        return "status should use DEFAULT: " + s_1427;
      }
      test_1420.assert(t_1432, fn_1433);
      return;
    } finally {
      test_1420.softFailToHard();
    }
});
it("toInsertSql change overrides default value", function () {
    const test_1434 = new Test_949();
    try {
      let t_1435;
      let t_1436;
      const tbl_1437 = new TableDef(csid_942("posts"), Object.freeze([new FieldDef(csid_942("title"), new StringField(), false, null, false), new FieldDef(csid_942("status"), new StringField(), false, new SqlDefault(), false)]), null);
      const params_1438 = mapConstructor_929(Object.freeze([pairConstructor_951("title", "Hello"), pairConstructor_951("status", "published")]));
      let t_1439 = csid_942("title");
      let t_1440 = csid_942("status");
      const cs_1441 = changeset(tbl_1437, params_1438).cast(Object.freeze([t_1439, t_1440]));
      try {
        t_1435 = cs_1441.toInsertSql();
        t_1436 = t_1435;
      } catch {
        t_1436 = panic_946();
      }
      const s_1442 = t_1436.toString();
      let t_1443 = s_1442.indexOf("'published'") >= 0;
      function fn_1444() {
        return "should use provided value: " + s_1442;
      }
      test_1434.assert(t_1443, fn_1444);
      return;
    } finally {
      test_1434.softFailToHard();
    }
});
it("toInsertSql with timestamps uses DEFAULT", function () {
    const test_1448 = new Test_949();
    try {
      let t_1449;
      let t_1450;
      let t_1451;
      let ts_1452;
      try {
        t_1449 = timestamps();
        ts_1452 = t_1449;
      } catch {
        ts_1452 = panic_946();
      }
      const fields_1453 = [];
      listBuilderAdd_113(fields_1453, new FieldDef(csid_942("title"), new StringField(), false, null, false));
      function fn_1454(t_1455) {
        listBuilderAdd_113(fields_1453, t_1455);
        return;
      }
      ts_1452.forEach(fn_1454);
      const tbl_1456 = new TableDef(csid_942("articles"), listBuilderToList_114(fields_1453), null);
      const params_1457 = mapConstructor_929(Object.freeze([pairConstructor_951("title", "News")]));
      let t_1458 = csid_942("title");
      const cs_1459 = changeset(tbl_1456, params_1457).cast(Object.freeze([t_1458]));
      try {
        t_1450 = cs_1459.toInsertSql();
        t_1451 = t_1450;
      } catch {
        t_1451 = panic_946();
      }
      const s_1460 = t_1451.toString();
      let t_1461 = s_1460.indexOf("inserted_at") >= 0;
      function fn_1462() {
        return "should include inserted_at: " + s_1460;
      }
      test_1448.assert(t_1461, fn_1462);
      let t_1463 = s_1460.indexOf("updated_at") >= 0;
      function fn_1464() {
        return "should include updated_at: " + s_1460;
      }
      test_1448.assert(t_1463, fn_1464);
      let t_1465 = s_1460.indexOf("DEFAULT") >= 0;
      function fn_1466() {
        return "timestamps should use DEFAULT: " + s_1460;
      }
      test_1448.assert(t_1465, fn_1466);
      return;
    } finally {
      test_1448.softFailToHard();
    }
});
it("toInsertSql skips virtual fields", function () {
    const test_1467 = new Test_949();
    try {
      let t_1468;
      let t_1469;
      const tbl_1470 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("name"), new StringField(), false, null, false), new FieldDef(csid_942("full_name"), new StringField(), true, null, true)]), null);
      const params_1471 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice"), pairConstructor_951("full_name", "Alice Smith")]));
      let t_1472 = csid_942("name");
      let t_1473 = csid_942("full_name");
      const cs_1474 = changeset(tbl_1470, params_1471).cast(Object.freeze([t_1472, t_1473]));
      try {
        t_1468 = cs_1474.toInsertSql();
        t_1469 = t_1468;
      } catch {
        t_1469 = panic_946();
      }
      const s_1475 = t_1469.toString();
      let t_1476 = s_1475.indexOf("'Alice'") >= 0;
      function fn_1477() {
        return "name should be included: " + s_1475;
      }
      test_1467.assert(t_1476, fn_1477);
      let t_1478 = !(s_1475.indexOf("full_name") >= 0);
      function fn_1479() {
        return "virtual field should be excluded: " + s_1475;
      }
      test_1467.assert(t_1478, fn_1479);
      return;
    } finally {
      test_1467.softFailToHard();
    }
});
it("toInsertSql allows missing non-nullable virtual field", function () {
    const test_1480 = new Test_949();
    try {
      let t_1481;
      let t_1482;
      const tbl_1483 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("name"), new StringField(), false, null, false), new FieldDef(csid_942("computed"), new StringField(), false, null, true)]), null);
      const params_1484 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Alice")]));
      let t_1485 = csid_942("name");
      const cs_1486 = changeset(tbl_1483, params_1484).cast(Object.freeze([t_1485]));
      try {
        t_1481 = cs_1486.toInsertSql();
        t_1482 = t_1481;
      } catch {
        t_1482 = panic_946();
      }
      const s_1487 = t_1482.toString();
      let t_1488 = s_1487.indexOf("'Alice'") >= 0;
      function fn_1489() {
        return "should succeed: " + s_1487;
      }
      test_1480.assert(t_1488, fn_1489);
      return;
    } finally {
      test_1480.softFailToHard();
    }
});
it("toUpdateSql skips virtual fields", function () {
    const test_1490 = new Test_949();
    try {
      let t_1491;
      let t_1492;
      const tbl_1493 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("name"), new StringField(), false, null, false), new FieldDef(csid_942("display"), new StringField(), true, null, true)]), null);
      const params_1494 = mapConstructor_929(Object.freeze([pairConstructor_951("name", "Bob"), pairConstructor_951("display", "Bobby")]));
      let t_1495 = csid_942("name");
      let t_1496 = csid_942("display");
      const cs_1497 = changeset(tbl_1493, params_1494).cast(Object.freeze([t_1495, t_1496]));
      try {
        t_1491 = cs_1497.toUpdateSql(1);
        t_1492 = t_1491;
      } catch {
        t_1492 = panic_946();
      }
      const s_1498 = t_1492.toString();
      let t_1499 = s_1498.indexOf("name = 'Bob'") >= 0;
      function fn_1500() {
        return "name should be in SET: " + s_1498;
      }
      test_1490.assert(t_1499, fn_1500);
      let t_1501 = !(s_1498.indexOf("display") >= 0);
      function fn_1502() {
        return "virtual field excluded from UPDATE: " + s_1498;
      }
      test_1490.assert(t_1501, fn_1502);
      return;
    } finally {
      test_1490.softFailToHard();
    }
});
it("toUpdateSql uses custom primary key", function () {
    const test_1503 = new Test_949();
    try {
      let t_1504;
      let t_1505;
      const tbl_1506 = new TableDef(csid_942("posts"), Object.freeze([new FieldDef(csid_942("title"), new StringField(), false, null, false)]), csid_942("post_id"));
      const params_1507 = mapConstructor_929(Object.freeze([pairConstructor_951("title", "Updated")]));
      let t_1508 = csid_942("title");
      const cs_1509 = changeset(tbl_1506, params_1507).cast(Object.freeze([t_1508]));
      try {
        t_1504 = cs_1509.toUpdateSql(99);
        t_1505 = t_1504;
      } catch {
        t_1505 = panic_946();
      }
      const s_1510 = t_1505.toString();
      let t_1511 = s_1510 === "UPDATE posts SET title = 'Updated' WHERE post_id = 99";
      function fn_1512() {
        return "got: " + s_1510;
      }
      test_1503.assert(t_1511, fn_1512);
      return;
    } finally {
      test_1503.softFailToHard();
    }
});
it("deleteSql uses custom primary key", function () {
    const test_1516 = new Test_949();
    try {
      const tbl_1517 = new TableDef(csid_942("posts"), Object.freeze([new FieldDef(csid_942("title"), new StringField(), false, null, false)]), csid_942("post_id"));
      const s_1518 = deleteSql(tbl_1517, 42).toString();
      let t_1519 = s_1518 === "DELETE FROM posts WHERE post_id = 42";
      function fn_1520() {
        return "got: " + s_1518;
      }
      test_1516.assert(t_1519, fn_1520);
      return;
    } finally {
      test_1516.softFailToHard();
    }
});
it("deleteSql uses default id when primaryKey null", function () {
    const test_1521 = new Test_949();
    try {
      const tbl_1522 = new TableDef(csid_942("users"), Object.freeze([new FieldDef(csid_942("name"), new StringField(), false, null, false)]), null);
      const s_1523 = deleteSql(tbl_1522, 7).toString();
      let t_1524 = s_1523 === "DELETE FROM users WHERE id = 7";
      function fn_1525() {
        return "got: " + s_1523;
      }
      test_1521.assert(t_1524, fn_1525);
      return;
    } finally {
      test_1521.softFailToHard();
    }
});
/**
 * @param {string} name_1561
 * @returns {SafeIdentifier}
 */
function sid_1560(name_1561) {
  let return_1562;
  let t_1563;
  try {
    t_1563 = safeIdentifier(name_1561);
    return_1562 = t_1563;
  } catch {
    return_1562 = panic_946();
  }
  return return_1562;
}
it("bare from produces SELECT *", function () {
    const test_1564 = new Test_949();
    try {
      const q_1565 = from(sid_1560("users"));
      let t_1566 = q_1565.toSql().toString() === "SELECT * FROM users";
      function fn_1567() {
        return "bare query";
      }
      test_1564.assert(t_1566, fn_1567);
      return;
    } finally {
      test_1564.softFailToHard();
    }
});
it("select restricts columns", function () {
    const test_1568 = new Test_949();
    try {
      let t_1569 = sid_1560("users");
      let t_1570 = sid_1560("id");
      let t_1571 = sid_1560("name");
      const q_1572 = from(t_1569).select(Object.freeze([t_1570, t_1571]));
      let t_1573 = q_1572.toSql().toString() === "SELECT id, name FROM users";
      function fn_1574() {
        return "select columns";
      }
      test_1568.assert(t_1573, fn_1574);
      return;
    } finally {
      test_1568.softFailToHard();
    }
});
it("where adds condition with int value", function () {
    const test_1575 = new Test_949();
    try {
      let t_1576 = sid_1560("users");
      let t_1577 = new SqlBuilder();
      t_1577.appendSafe("age > ");
      t_1577.appendInt32(18);
      let t_1578 = t_1577.accumulated;
      const q_1579 = from(t_1576).where(t_1578);
      let t_1580 = q_1579.toSql().toString() === "SELECT * FROM users WHERE age > 18";
      function fn_1581() {
        return "where int";
      }
      test_1575.assert(t_1580, fn_1581);
      return;
    } finally {
      test_1575.softFailToHard();
    }
});
it("where adds condition with bool value", function () {
    const test_1582 = new Test_949();
    try {
      let t_1583 = sid_1560("users");
      let t_1584 = new SqlBuilder();
      t_1584.appendSafe("active = ");
      t_1584.appendBoolean(true);
      let t_1585 = t_1584.accumulated;
      const q_1586 = from(t_1583).where(t_1585);
      let t_1587 = q_1586.toSql().toString() === "SELECT * FROM users WHERE active = TRUE";
      function fn_1588() {
        return "where bool";
      }
      test_1582.assert(t_1587, fn_1588);
      return;
    } finally {
      test_1582.softFailToHard();
    }
});
it("chained where uses AND", function () {
    const test_1589 = new Test_949();
    try {
      let t_1590 = sid_1560("users");
      let t_1591 = new SqlBuilder();
      t_1591.appendSafe("age > ");
      t_1591.appendInt32(18);
      let t_1592 = t_1591.accumulated;
      let t_1593 = from(t_1590).where(t_1592);
      let t_1594 = new SqlBuilder();
      t_1594.appendSafe("active = ");
      t_1594.appendBoolean(true);
      const q_1595 = t_1593.where(t_1594.accumulated);
      let t_1596 = q_1595.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE";
      function fn_1597() {
        return "chained where";
      }
      test_1589.assert(t_1596, fn_1597);
      return;
    } finally {
      test_1589.softFailToHard();
    }
});
it("orderBy ASC", function () {
    const test_1598 = new Test_949();
    try {
      let t_1599 = sid_1560("users");
      let t_1600 = sid_1560("name");
      const q_1601 = from(t_1599).orderBy(t_1600, true);
      let t_1602 = q_1601.toSql().toString() === "SELECT * FROM users ORDER BY name ASC";
      function fn_1603() {
        return "order asc";
      }
      test_1598.assert(t_1602, fn_1603);
      return;
    } finally {
      test_1598.softFailToHard();
    }
});
it("orderBy DESC", function () {
    const test_1604 = new Test_949();
    try {
      let t_1605 = sid_1560("users");
      let t_1606 = sid_1560("created_at");
      const q_1607 = from(t_1605).orderBy(t_1606, false);
      let t_1608 = q_1607.toSql().toString() === "SELECT * FROM users ORDER BY created_at DESC";
      function fn_1609() {
        return "order desc";
      }
      test_1604.assert(t_1608, fn_1609);
      return;
    } finally {
      test_1604.softFailToHard();
    }
});
it("limit and offset", function () {
    const test_1610 = new Test_949();
    try {
      let t_1611;
      let t_1612;
      let q_1613;
      try {
        t_1611 = from(sid_1560("users")).limit(10);
        t_1612 = t_1611.offset(20);
        q_1613 = t_1612;
      } catch {
        q_1613 = panic_946();
      }
      let t_1614 = q_1613.toSql().toString() === "SELECT * FROM users LIMIT 10 OFFSET 20";
      function fn_1615() {
        return "limit/offset";
      }
      test_1610.assert(t_1614, fn_1615);
      return;
    } finally {
      test_1610.softFailToHard();
    }
});
it("limit bubbles on negative", function () {
    const test_1616 = new Test_949();
    try {
      let didBubble_1617;
      try {
        from(sid_1560("users")).limit(-1);
        didBubble_1617 = false;
      } catch {
        didBubble_1617 = true;
      }
      function fn_1618() {
        return "negative limit should bubble";
      }
      test_1616.assert(didBubble_1617, fn_1618);
      return;
    } finally {
      test_1616.softFailToHard();
    }
});
it("offset bubbles on negative", function () {
    const test_1619 = new Test_949();
    try {
      let didBubble_1620;
      try {
        from(sid_1560("users")).offset(-1);
        didBubble_1620 = false;
      } catch {
        didBubble_1620 = true;
      }
      function fn_1621() {
        return "negative offset should bubble";
      }
      test_1619.assert(didBubble_1620, fn_1621);
      return;
    } finally {
      test_1619.softFailToHard();
    }
});
it("complex composed query", function () {
    const test_1622 = new Test_949();
    try {
      let t_1623;
      let t_1624;
      let t_1625;
      let t_1626;
      let t_1627;
      let t_1628;
      let t_1629;
      let t_1630;
      let t_1631;
      let t_1632;
      const minAge_1633 = 21;
      let q_1634;
      try {
        t_1623 = sid_1560("users");
        t_1624 = sid_1560("id");
        t_1625 = sid_1560("name");
        t_1626 = sid_1560("email");
        t_1627 = from(t_1623).select(Object.freeze([t_1624, t_1625, t_1626]));
        t_1628 = new SqlBuilder();
        t_1628.appendSafe("age >= ");
        t_1628.appendInt32(21);
        t_1629 = t_1627.where(t_1628.accumulated);
        t_1630 = new SqlBuilder();
        t_1630.appendSafe("active = ");
        t_1630.appendBoolean(true);
        t_1631 = t_1629.where(t_1630.accumulated).orderBy(sid_1560("name"), true).limit(25);
        t_1632 = t_1631.offset(0);
        q_1634 = t_1632;
      } catch {
        q_1634 = panic_946();
      }
      let t_1635 = q_1634.toSql().toString() === "SELECT id, name, email FROM users WHERE age >= 21 AND active = TRUE ORDER BY name ASC LIMIT 25 OFFSET 0";
      function fn_1636() {
        return "complex query";
      }
      test_1622.assert(t_1635, fn_1636);
      return;
    } finally {
      test_1622.softFailToHard();
    }
});
it("safeToSql applies default limit when none set", function () {
    const test_1637 = new Test_949();
    try {
      let t_1638;
      let t_1639;
      const q_1640 = from(sid_1560("users"));
      try {
        t_1638 = q_1640.safeToSql(100);
        t_1639 = t_1638;
      } catch {
        t_1639 = panic_946();
      }
      const s_1641 = t_1639.toString();
      let t_1642 = s_1641 === "SELECT * FROM users LIMIT 100";
      function fn_1643() {
        return "should have limit: " + s_1641;
      }
      test_1637.assert(t_1642, fn_1643);
      return;
    } finally {
      test_1637.softFailToHard();
    }
});
it("safeToSql respects explicit limit", function () {
    const test_1644 = new Test_949();
    try {
      let t_1645;
      let t_1646;
      let t_1647;
      let q_1648;
      try {
        t_1645 = from(sid_1560("users")).limit(5);
        q_1648 = t_1645;
      } catch {
        q_1648 = panic_946();
      }
      try {
        t_1646 = q_1648.safeToSql(100);
        t_1647 = t_1646;
      } catch {
        t_1647 = panic_946();
      }
      const s_1649 = t_1647.toString();
      let t_1650 = s_1649 === "SELECT * FROM users LIMIT 5";
      function fn_1651() {
        return "explicit limit preserved: " + s_1649;
      }
      test_1644.assert(t_1650, fn_1651);
      return;
    } finally {
      test_1644.softFailToHard();
    }
});
it("safeToSql bubbles on negative defaultLimit", function () {
    const test_1652 = new Test_949();
    try {
      let didBubble_1653;
      try {
        from(sid_1560("users")).safeToSql(-1);
        didBubble_1653 = false;
      } catch {
        didBubble_1653 = true;
      }
      function fn_1654() {
        return "negative defaultLimit should bubble";
      }
      test_1652.assert(didBubble_1653, fn_1654);
      return;
    } finally {
      test_1652.softFailToHard();
    }
});
it("where with injection attempt in string value is escaped", function () {
    const test_1655 = new Test_949();
    try {
      const evil_1656 = "'; DROP TABLE users; --";
      let t_1657 = sid_1560("users");
      let t_1658 = new SqlBuilder();
      t_1658.appendSafe("name = ");
      t_1658.appendString("'; DROP TABLE users; --");
      let t_1659 = t_1658.accumulated;
      const q_1660 = from(t_1657).where(t_1659);
      const s_1661 = q_1660.toSql().toString();
      let t_1662 = s_1661.indexOf("''") >= 0;
      function fn_1663() {
        return "quotes must be doubled: " + s_1661;
      }
      test_1655.assert(t_1662, fn_1663);
      let t_1664 = s_1661.indexOf("SELECT * FROM users WHERE name =") >= 0;
      function fn_1665() {
        return "structure intact: " + s_1661;
      }
      test_1655.assert(t_1664, fn_1665);
      return;
    } finally {
      test_1655.softFailToHard();
    }
});
it("safeIdentifier rejects user-supplied table name with metacharacters", function () {
    const test_1666 = new Test_949();
    try {
      const attack_1667 = "users; DROP TABLE users; --";
      let didBubble_1668;
      try {
        safeIdentifier("users; DROP TABLE users; --");
        didBubble_1668 = false;
      } catch {
        didBubble_1668 = true;
      }
      function fn_1669() {
        return "metacharacter-containing name must be rejected at construction";
      }
      test_1666.assert(didBubble_1668, fn_1669);
      return;
    } finally {
      test_1666.softFailToHard();
    }
});
it("innerJoin produces INNER JOIN", function () {
    const test_1670 = new Test_949();
    try {
      let t_1671 = sid_1560("users");
      let t_1672 = sid_1560("orders");
      let t_1673 = new SqlBuilder();
      t_1673.appendSafe("users.id = orders.user_id");
      let t_1674 = t_1673.accumulated;
      const q_1675 = from(t_1671).innerJoin(t_1672, t_1674);
      let t_1676 = q_1675.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1677() {
        return "inner join";
      }
      test_1670.assert(t_1676, fn_1677);
      return;
    } finally {
      test_1670.softFailToHard();
    }
});
it("leftJoin produces LEFT JOIN", function () {
    const test_1678 = new Test_949();
    try {
      let t_1679 = sid_1560("users");
      let t_1680 = sid_1560("profiles");
      let t_1681 = new SqlBuilder();
      t_1681.appendSafe("users.id = profiles.user_id");
      let t_1682 = t_1681.accumulated;
      const q_1683 = from(t_1679).leftJoin(t_1680, t_1682);
      let t_1684 = q_1683.toSql().toString() === "SELECT * FROM users LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1685() {
        return "left join";
      }
      test_1678.assert(t_1684, fn_1685);
      return;
    } finally {
      test_1678.softFailToHard();
    }
});
it("rightJoin produces RIGHT JOIN", function () {
    const test_1686 = new Test_949();
    try {
      let t_1687 = sid_1560("orders");
      let t_1688 = sid_1560("users");
      let t_1689 = new SqlBuilder();
      t_1689.appendSafe("orders.user_id = users.id");
      let t_1690 = t_1689.accumulated;
      const q_1691 = from(t_1687).rightJoin(t_1688, t_1690);
      let t_1692 = q_1691.toSql().toString() === "SELECT * FROM orders RIGHT JOIN users ON orders.user_id = users.id";
      function fn_1693() {
        return "right join";
      }
      test_1686.assert(t_1692, fn_1693);
      return;
    } finally {
      test_1686.softFailToHard();
    }
});
it("fullJoin produces FULL OUTER JOIN", function () {
    const test_1694 = new Test_949();
    try {
      let t_1695 = sid_1560("users");
      let t_1696 = sid_1560("orders");
      let t_1697 = new SqlBuilder();
      t_1697.appendSafe("users.id = orders.user_id");
      let t_1698 = t_1697.accumulated;
      const q_1699 = from(t_1695).fullJoin(t_1696, t_1698);
      let t_1700 = q_1699.toSql().toString() === "SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id";
      function fn_1701() {
        return "full join";
      }
      test_1694.assert(t_1700, fn_1701);
      return;
    } finally {
      test_1694.softFailToHard();
    }
});
it("chained joins", function () {
    const test_1702 = new Test_949();
    try {
      let t_1703 = sid_1560("users");
      let t_1704 = sid_1560("orders");
      let t_1705 = new SqlBuilder();
      t_1705.appendSafe("users.id = orders.user_id");
      let t_1706 = t_1705.accumulated;
      let t_1707 = from(t_1703).innerJoin(t_1704, t_1706);
      let t_1708 = sid_1560("profiles");
      let t_1709 = new SqlBuilder();
      t_1709.appendSafe("users.id = profiles.user_id");
      const q_1710 = t_1707.leftJoin(t_1708, t_1709.accumulated);
      let t_1711 = q_1710.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id LEFT JOIN profiles ON users.id = profiles.user_id";
      function fn_1712() {
        return "chained joins";
      }
      test_1702.assert(t_1711, fn_1712);
      return;
    } finally {
      test_1702.softFailToHard();
    }
});
it("join with where and orderBy", function () {
    const test_1713 = new Test_949();
    try {
      let t_1714;
      let t_1715;
      let t_1716;
      let t_1717;
      let t_1718;
      let t_1719;
      let t_1720;
      let q_1721;
      try {
        t_1714 = sid_1560("users");
        t_1715 = sid_1560("orders");
        t_1716 = new SqlBuilder();
        t_1716.appendSafe("users.id = orders.user_id");
        t_1717 = t_1716.accumulated;
        t_1718 = from(t_1714).innerJoin(t_1715, t_1717);
        t_1719 = new SqlBuilder();
        t_1719.appendSafe("orders.total > ");
        t_1719.appendInt32(100);
        t_1720 = t_1718.where(t_1719.accumulated).orderBy(sid_1560("name"), true).limit(10);
        q_1721 = t_1720;
      } catch {
        q_1721 = panic_946();
      }
      let t_1722 = q_1721.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY name ASC LIMIT 10";
      function fn_1723() {
        return "join with where/order/limit";
      }
      test_1713.assert(t_1722, fn_1723);
      return;
    } finally {
      test_1713.softFailToHard();
    }
});
it("col helper produces qualified reference", function () {
    const test_1724 = new Test_949();
    try {
      const c_1725 = col(sid_1560("users"), sid_1560("id"));
      let t_1726 = c_1725.toString() === "users.id";
      function fn_1727() {
        return "col helper";
      }
      test_1724.assert(t_1726, fn_1727);
      return;
    } finally {
      test_1724.softFailToHard();
    }
});
it("join with col helper", function () {
    const test_1728 = new Test_949();
    try {
      const onCond_1729 = col(sid_1560("users"), sid_1560("id"));
      const b_1730 = new SqlBuilder();
      b_1730.appendFragment(onCond_1729);
      b_1730.appendSafe(" = ");
      b_1730.appendFragment(col(sid_1560("orders"), sid_1560("user_id")));
      let t_1731 = sid_1560("users");
      let t_1732 = sid_1560("orders");
      let t_1733 = b_1730.accumulated;
      const q_1734 = from(t_1731).innerJoin(t_1732, t_1733);
      let t_1735 = q_1734.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";
      function fn_1736() {
        return "join with col";
      }
      test_1728.assert(t_1735, fn_1736);
      return;
    } finally {
      test_1728.softFailToHard();
    }
});
it("orWhere basic", function () {
    const test_1737 = new Test_949();
    try {
      let t_1738 = sid_1560("users");
      let t_1739 = new SqlBuilder();
      t_1739.appendSafe("status = ");
      t_1739.appendString("active");
      let t_1740 = t_1739.accumulated;
      const q_1741 = from(t_1738).orWhere(t_1740);
      let t_1742 = q_1741.toSql().toString() === "SELECT * FROM users WHERE status = 'active'";
      function fn_1743() {
        return "orWhere basic";
      }
      test_1737.assert(t_1742, fn_1743);
      return;
    } finally {
      test_1737.softFailToHard();
    }
});
it("where then orWhere", function () {
    const test_1744 = new Test_949();
    try {
      let t_1745 = sid_1560("users");
      let t_1746 = new SqlBuilder();
      t_1746.appendSafe("age > ");
      t_1746.appendInt32(18);
      let t_1747 = t_1746.accumulated;
      let t_1748 = from(t_1745).where(t_1747);
      let t_1749 = new SqlBuilder();
      t_1749.appendSafe("vip = ");
      t_1749.appendBoolean(true);
      const q_1750 = t_1748.orWhere(t_1749.accumulated);
      let t_1751 = q_1750.toSql().toString() === "SELECT * FROM users WHERE age > 18 OR vip = TRUE";
      function fn_1752() {
        return "where then orWhere";
      }
      test_1744.assert(t_1751, fn_1752);
      return;
    } finally {
      test_1744.softFailToHard();
    }
});
it("multiple orWhere", function () {
    const test_1753 = new Test_949();
    try {
      let t_1754 = sid_1560("users");
      let t_1755 = new SqlBuilder();
      t_1755.appendSafe("active = ");
      t_1755.appendBoolean(true);
      let t_1756 = t_1755.accumulated;
      let t_1757 = from(t_1754).where(t_1756);
      let t_1758 = new SqlBuilder();
      t_1758.appendSafe("role = ");
      t_1758.appendString("admin");
      let t_1759 = t_1757.orWhere(t_1758.accumulated);
      let t_1760 = new SqlBuilder();
      t_1760.appendSafe("role = ");
      t_1760.appendString("moderator");
      const q_1761 = t_1759.orWhere(t_1760.accumulated);
      let t_1762 = q_1761.toSql().toString() === "SELECT * FROM users WHERE active = TRUE OR role = 'admin' OR role = 'moderator'";
      function fn_1763() {
        return "multiple orWhere";
      }
      test_1753.assert(t_1762, fn_1763);
      return;
    } finally {
      test_1753.softFailToHard();
    }
});
it("mixed where and orWhere", function () {
    const test_1764 = new Test_949();
    try {
      let t_1765 = sid_1560("users");
      let t_1766 = new SqlBuilder();
      t_1766.appendSafe("age > ");
      t_1766.appendInt32(18);
      let t_1767 = t_1766.accumulated;
      let t_1768 = from(t_1765).where(t_1767);
      let t_1769 = new SqlBuilder();
      t_1769.appendSafe("active = ");
      t_1769.appendBoolean(true);
      let t_1770 = t_1768.where(t_1769.accumulated);
      let t_1771 = new SqlBuilder();
      t_1771.appendSafe("vip = ");
      t_1771.appendBoolean(true);
      const q_1772 = t_1770.orWhere(t_1771.accumulated);
      let t_1773 = q_1772.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND active = TRUE OR vip = TRUE";
      function fn_1774() {
        return "mixed where and orWhere";
      }
      test_1764.assert(t_1773, fn_1774);
      return;
    } finally {
      test_1764.softFailToHard();
    }
});
it("whereNull", function () {
    const test_1775 = new Test_949();
    try {
      let t_1776 = sid_1560("users");
      let t_1777 = sid_1560("deleted_at");
      const q_1778 = from(t_1776).whereNull(t_1777);
      let t_1779 = q_1778.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL";
      function fn_1780() {
        return "whereNull";
      }
      test_1775.assert(t_1779, fn_1780);
      return;
    } finally {
      test_1775.softFailToHard();
    }
});
it("whereNotNull", function () {
    const test_1781 = new Test_949();
    try {
      let t_1782 = sid_1560("users");
      let t_1783 = sid_1560("email");
      const q_1784 = from(t_1782).whereNotNull(t_1783);
      let t_1785 = q_1784.toSql().toString() === "SELECT * FROM users WHERE email IS NOT NULL";
      function fn_1786() {
        return "whereNotNull";
      }
      test_1781.assert(t_1785, fn_1786);
      return;
    } finally {
      test_1781.softFailToHard();
    }
});
it("whereNull chained with where", function () {
    const test_1787 = new Test_949();
    try {
      let t_1788 = sid_1560("users");
      let t_1789 = new SqlBuilder();
      t_1789.appendSafe("active = ");
      t_1789.appendBoolean(true);
      let t_1790 = t_1789.accumulated;
      const q_1791 = from(t_1788).where(t_1790).whereNull(sid_1560("deleted_at"));
      let t_1792 = q_1791.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND deleted_at IS NULL";
      function fn_1793() {
        return "whereNull chained";
      }
      test_1787.assert(t_1792, fn_1793);
      return;
    } finally {
      test_1787.softFailToHard();
    }
});
it("whereNotNull chained with orWhere", function () {
    const test_1794 = new Test_949();
    try {
      let t_1795 = sid_1560("users");
      let t_1796 = sid_1560("deleted_at");
      let t_1797 = from(t_1795).whereNull(t_1796);
      let t_1798 = new SqlBuilder();
      t_1798.appendSafe("role = ");
      t_1798.appendString("admin");
      const q_1799 = t_1797.orWhere(t_1798.accumulated);
      let t_1800 = q_1799.toSql().toString() === "SELECT * FROM users WHERE deleted_at IS NULL OR role = 'admin'";
      function fn_1801() {
        return "whereNotNull with orWhere";
      }
      test_1794.assert(t_1800, fn_1801);
      return;
    } finally {
      test_1794.softFailToHard();
    }
});
it("whereIn with int values", function () {
    const test_1802 = new Test_949();
    try {
      let t_1803 = sid_1560("users");
      let t_1804 = sid_1560("id");
      let t_1805 = new SqlInt32(1);
      let t_1806 = new SqlInt32(2);
      let t_1807 = new SqlInt32(3);
      const q_1808 = from(t_1803).whereIn(t_1804, Object.freeze([t_1805, t_1806, t_1807]));
      let t_1809 = q_1808.toSql().toString() === "SELECT * FROM users WHERE id IN (1, 2, 3)";
      function fn_1810() {
        return "whereIn ints";
      }
      test_1802.assert(t_1809, fn_1810);
      return;
    } finally {
      test_1802.softFailToHard();
    }
});
it("whereIn with string values escaping", function () {
    const test_1811 = new Test_949();
    try {
      let t_1812 = sid_1560("users");
      let t_1813 = sid_1560("name");
      let t_1814 = new SqlString("Alice");
      let t_1815 = new SqlString("Bob's");
      const q_1816 = from(t_1812).whereIn(t_1813, Object.freeze([t_1814, t_1815]));
      let t_1817 = q_1816.toSql().toString() === "SELECT * FROM users WHERE name IN ('Alice', 'Bob''s')";
      function fn_1818() {
        return "whereIn strings";
      }
      test_1811.assert(t_1817, fn_1818);
      return;
    } finally {
      test_1811.softFailToHard();
    }
});
it("whereIn with empty list produces 1=0", function () {
    const test_1819 = new Test_949();
    try {
      let t_1820 = sid_1560("users");
      let t_1821 = sid_1560("id");
      const q_1822 = from(t_1820).whereIn(t_1821, Object.freeze([]));
      let t_1823 = q_1822.toSql().toString() === "SELECT * FROM users WHERE 1 = 0";
      function fn_1824() {
        return "whereIn empty";
      }
      test_1819.assert(t_1823, fn_1824);
      return;
    } finally {
      test_1819.softFailToHard();
    }
});
it("whereIn chained", function () {
    const test_1825 = new Test_949();
    try {
      let t_1826 = sid_1560("users");
      let t_1827 = new SqlBuilder();
      t_1827.appendSafe("active = ");
      t_1827.appendBoolean(true);
      let t_1828 = t_1827.accumulated;
      const q_1829 = from(t_1826).where(t_1828).whereIn(sid_1560("role"), Object.freeze([new SqlString("admin"), new SqlString("user")]));
      let t_1830 = q_1829.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND role IN ('admin', 'user')";
      function fn_1831() {
        return "whereIn chained";
      }
      test_1825.assert(t_1830, fn_1831);
      return;
    } finally {
      test_1825.softFailToHard();
    }
});
it("whereIn single element", function () {
    const test_1832 = new Test_949();
    try {
      let t_1833 = sid_1560("users");
      let t_1834 = sid_1560("id");
      let t_1835 = new SqlInt32(42);
      const q_1836 = from(t_1833).whereIn(t_1834, Object.freeze([t_1835]));
      let t_1837 = q_1836.toSql().toString() === "SELECT * FROM users WHERE id IN (42)";
      function fn_1838() {
        return "whereIn single";
      }
      test_1832.assert(t_1837, fn_1838);
      return;
    } finally {
      test_1832.softFailToHard();
    }
});
it("whereNot basic", function () {
    const test_1839 = new Test_949();
    try {
      let t_1840 = sid_1560("users");
      let t_1841 = new SqlBuilder();
      t_1841.appendSafe("active = ");
      t_1841.appendBoolean(true);
      let t_1842 = t_1841.accumulated;
      const q_1843 = from(t_1840).whereNot(t_1842);
      let t_1844 = q_1843.toSql().toString() === "SELECT * FROM users WHERE NOT (active = TRUE)";
      function fn_1845() {
        return "whereNot";
      }
      test_1839.assert(t_1844, fn_1845);
      return;
    } finally {
      test_1839.softFailToHard();
    }
});
it("whereNot chained", function () {
    const test_1846 = new Test_949();
    try {
      let t_1847 = sid_1560("users");
      let t_1848 = new SqlBuilder();
      t_1848.appendSafe("age > ");
      t_1848.appendInt32(18);
      let t_1849 = t_1848.accumulated;
      let t_1850 = from(t_1847).where(t_1849);
      let t_1851 = new SqlBuilder();
      t_1851.appendSafe("banned = ");
      t_1851.appendBoolean(true);
      const q_1852 = t_1850.whereNot(t_1851.accumulated);
      let t_1853 = q_1852.toSql().toString() === "SELECT * FROM users WHERE age > 18 AND NOT (banned = TRUE)";
      function fn_1854() {
        return "whereNot chained";
      }
      test_1846.assert(t_1853, fn_1854);
      return;
    } finally {
      test_1846.softFailToHard();
    }
});
it("whereBetween integers", function () {
    const test_1855 = new Test_949();
    try {
      let t_1856 = sid_1560("users");
      let t_1857 = sid_1560("age");
      let t_1858 = new SqlInt32(18);
      let t_1859 = new SqlInt32(65);
      const q_1860 = from(t_1856).whereBetween(t_1857, t_1858, t_1859);
      let t_1861 = q_1860.toSql().toString() === "SELECT * FROM users WHERE age BETWEEN 18 AND 65";
      function fn_1862() {
        return "whereBetween ints";
      }
      test_1855.assert(t_1861, fn_1862);
      return;
    } finally {
      test_1855.softFailToHard();
    }
});
it("whereBetween chained", function () {
    const test_1863 = new Test_949();
    try {
      let t_1864 = sid_1560("users");
      let t_1865 = new SqlBuilder();
      t_1865.appendSafe("active = ");
      t_1865.appendBoolean(true);
      let t_1866 = t_1865.accumulated;
      const q_1867 = from(t_1864).where(t_1866).whereBetween(sid_1560("age"), new SqlInt32(21), new SqlInt32(30));
      let t_1868 = q_1867.toSql().toString() === "SELECT * FROM users WHERE active = TRUE AND age BETWEEN 21 AND 30";
      function fn_1869() {
        return "whereBetween chained";
      }
      test_1863.assert(t_1868, fn_1869);
      return;
    } finally {
      test_1863.softFailToHard();
    }
});
it("whereLike basic", function () {
    const test_1870 = new Test_949();
    try {
      let t_1871 = sid_1560("users");
      let t_1872 = sid_1560("name");
      const q_1873 = from(t_1871).whereLike(t_1872, "John%");
      let t_1874 = q_1873.toSql().toString() === "SELECT * FROM users WHERE name LIKE 'John%'";
      function fn_1875() {
        return "whereLike";
      }
      test_1870.assert(t_1874, fn_1875);
      return;
    } finally {
      test_1870.softFailToHard();
    }
});
it("whereILike basic", function () {
    const test_1876 = new Test_949();
    try {
      let t_1877 = sid_1560("users");
      let t_1878 = sid_1560("email");
      const q_1879 = from(t_1877).whereILike(t_1878, "%@gmail.com");
      let t_1880 = q_1879.toSql().toString() === "SELECT * FROM users WHERE email ILIKE '%@gmail.com'";
      function fn_1881() {
        return "whereILike";
      }
      test_1876.assert(t_1880, fn_1881);
      return;
    } finally {
      test_1876.softFailToHard();
    }
});
it("whereLike with injection attempt", function () {
    const test_1882 = new Test_949();
    try {
      let t_1883 = sid_1560("users");
      let t_1884 = sid_1560("name");
      const q_1885 = from(t_1883).whereLike(t_1884, "'; DROP TABLE users; --");
      const s_1886 = q_1885.toSql().toString();
      let t_1887 = s_1886.indexOf("''") >= 0;
      function fn_1888() {
        return "like injection escaped: " + s_1886;
      }
      test_1882.assert(t_1887, fn_1888);
      let t_1889 = s_1886.indexOf("LIKE") >= 0;
      function fn_1890() {
        return "like structure intact: " + s_1886;
      }
      test_1882.assert(t_1889, fn_1890);
      return;
    } finally {
      test_1882.softFailToHard();
    }
});
it("whereLike wildcard patterns", function () {
    const test_1891 = new Test_949();
    try {
      let t_1892 = sid_1560("users");
      let t_1893 = sid_1560("name");
      const q_1894 = from(t_1892).whereLike(t_1893, "%son%");
      let t_1895 = q_1894.toSql().toString() === "SELECT * FROM users WHERE name LIKE '%son%'";
      function fn_1896() {
        return "whereLike wildcard";
      }
      test_1891.assert(t_1895, fn_1896);
      return;
    } finally {
      test_1891.softFailToHard();
    }
});
it("countAll produces COUNT(*)", function () {
    const test_1897 = new Test_949();
    try {
      const f_1898 = countAll();
      let t_1899 = f_1898.toString() === "COUNT(*)";
      function fn_1900() {
        return "countAll";
      }
      test_1897.assert(t_1899, fn_1900);
      return;
    } finally {
      test_1897.softFailToHard();
    }
});
it("countCol produces COUNT(field)", function () {
    const test_1901 = new Test_949();
    try {
      const f_1902 = countCol(sid_1560("id"));
      let t_1903 = f_1902.toString() === "COUNT(id)";
      function fn_1904() {
        return "countCol";
      }
      test_1901.assert(t_1903, fn_1904);
      return;
    } finally {
      test_1901.softFailToHard();
    }
});
it("sumCol produces SUM(field)", function () {
    const test_1905 = new Test_949();
    try {
      const f_1906 = sumCol(sid_1560("amount"));
      let t_1907 = f_1906.toString() === "SUM(amount)";
      function fn_1908() {
        return "sumCol";
      }
      test_1905.assert(t_1907, fn_1908);
      return;
    } finally {
      test_1905.softFailToHard();
    }
});
it("avgCol produces AVG(field)", function () {
    const test_1909 = new Test_949();
    try {
      const f_1910 = avgCol(sid_1560("price"));
      let t_1911 = f_1910.toString() === "AVG(price)";
      function fn_1912() {
        return "avgCol";
      }
      test_1909.assert(t_1911, fn_1912);
      return;
    } finally {
      test_1909.softFailToHard();
    }
});
it("minCol produces MIN(field)", function () {
    const test_1913 = new Test_949();
    try {
      const f_1914 = minCol(sid_1560("created_at"));
      let t_1915 = f_1914.toString() === "MIN(created_at)";
      function fn_1916() {
        return "minCol";
      }
      test_1913.assert(t_1915, fn_1916);
      return;
    } finally {
      test_1913.softFailToHard();
    }
});
it("maxCol produces MAX(field)", function () {
    const test_1917 = new Test_949();
    try {
      const f_1918 = maxCol(sid_1560("score"));
      let t_1919 = f_1918.toString() === "MAX(score)";
      function fn_1920() {
        return "maxCol";
      }
      test_1917.assert(t_1919, fn_1920);
      return;
    } finally {
      test_1917.softFailToHard();
    }
});
it("selectExpr with aggregate", function () {
    const test_1921 = new Test_949();
    try {
      let t_1922 = sid_1560("orders");
      let t_1923 = countAll();
      const q_1924 = from(t_1922).selectExpr(Object.freeze([t_1923]));
      let t_1925 = q_1924.toSql().toString() === "SELECT COUNT(*) FROM orders";
      function fn_1926() {
        return "selectExpr count";
      }
      test_1921.assert(t_1925, fn_1926);
      return;
    } finally {
      test_1921.softFailToHard();
    }
});
it("selectExpr with multiple expressions", function () {
    const test_1927 = new Test_949();
    try {
      const nameFrag_1928 = col(sid_1560("users"), sid_1560("name"));
      let t_1929 = sid_1560("users");
      let t_1930 = countAll();
      const q_1931 = from(t_1929).selectExpr(Object.freeze([nameFrag_1928, t_1930]));
      let t_1932 = q_1931.toSql().toString() === "SELECT users.name, COUNT(*) FROM users";
      function fn_1933() {
        return "selectExpr multi";
      }
      test_1927.assert(t_1932, fn_1933);
      return;
    } finally {
      test_1927.softFailToHard();
    }
});
it("selectExpr overrides selectedFields", function () {
    const test_1934 = new Test_949();
    try {
      let t_1935 = sid_1560("users");
      let t_1936 = sid_1560("id");
      let t_1937 = sid_1560("name");
      const q_1938 = from(t_1935).select(Object.freeze([t_1936, t_1937])).selectExpr(Object.freeze([countAll()]));
      let t_1939 = q_1938.toSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1940() {
        return "selectExpr overrides select";
      }
      test_1934.assert(t_1939, fn_1940);
      return;
    } finally {
      test_1934.softFailToHard();
    }
});
it("groupBy single field", function () {
    const test_1941 = new Test_949();
    try {
      let t_1942 = sid_1560("orders");
      let t_1943 = col(sid_1560("orders"), sid_1560("status"));
      let t_1944 = countAll();
      const q_1945 = from(t_1942).selectExpr(Object.freeze([t_1943, t_1944])).groupBy(sid_1560("status"));
      let t_1946 = q_1945.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status";
      function fn_1947() {
        return "groupBy single";
      }
      test_1941.assert(t_1946, fn_1947);
      return;
    } finally {
      test_1941.softFailToHard();
    }
});
it("groupBy multiple fields", function () {
    const test_1948 = new Test_949();
    try {
      let t_1949 = sid_1560("orders");
      let t_1950 = sid_1560("status");
      const q_1951 = from(t_1949).groupBy(t_1950).groupBy(sid_1560("category"));
      let t_1952 = q_1951.toSql().toString() === "SELECT * FROM orders GROUP BY status, category";
      function fn_1953() {
        return "groupBy multiple";
      }
      test_1948.assert(t_1952, fn_1953);
      return;
    } finally {
      test_1948.softFailToHard();
    }
});
it("having basic", function () {
    const test_1954 = new Test_949();
    try {
      let t_1955 = sid_1560("orders");
      let t_1956 = col(sid_1560("orders"), sid_1560("status"));
      let t_1957 = countAll();
      let t_1958 = from(t_1955).selectExpr(Object.freeze([t_1956, t_1957])).groupBy(sid_1560("status"));
      let t_1959 = new SqlBuilder();
      t_1959.appendSafe("COUNT(*) > ");
      t_1959.appendInt32(5);
      const q_1960 = t_1958.having(t_1959.accumulated);
      let t_1961 = q_1960.toSql().toString() === "SELECT orders.status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5";
      function fn_1962() {
        return "having basic";
      }
      test_1954.assert(t_1961, fn_1962);
      return;
    } finally {
      test_1954.softFailToHard();
    }
});
it("orHaving", function () {
    const test_1963 = new Test_949();
    try {
      let t_1964 = sid_1560("orders");
      let t_1965 = sid_1560("status");
      let t_1966 = from(t_1964).groupBy(t_1965);
      let t_1967 = new SqlBuilder();
      t_1967.appendSafe("COUNT(*) > ");
      t_1967.appendInt32(5);
      let t_1968 = t_1966.having(t_1967.accumulated);
      let t_1969 = new SqlBuilder();
      t_1969.appendSafe("SUM(total) > ");
      t_1969.appendInt32(1000);
      const q_1970 = t_1968.orHaving(t_1969.accumulated);
      let t_1971 = q_1970.toSql().toString() === "SELECT * FROM orders GROUP BY status HAVING COUNT(*) > 5 OR SUM(total) > 1000";
      function fn_1972() {
        return "orHaving";
      }
      test_1963.assert(t_1971, fn_1972);
      return;
    } finally {
      test_1963.softFailToHard();
    }
});
it("distinct basic", function () {
    const test_1973 = new Test_949();
    try {
      let t_1974 = sid_1560("users");
      let t_1975 = sid_1560("name");
      const q_1976 = from(t_1974).select(Object.freeze([t_1975])).distinct();
      let t_1977 = q_1976.toSql().toString() === "SELECT DISTINCT name FROM users";
      function fn_1978() {
        return "distinct";
      }
      test_1973.assert(t_1977, fn_1978);
      return;
    } finally {
      test_1973.softFailToHard();
    }
});
it("distinct with where", function () {
    const test_1979 = new Test_949();
    try {
      let t_1980 = sid_1560("users");
      let t_1981 = sid_1560("email");
      let t_1982 = from(t_1980).select(Object.freeze([t_1981]));
      let t_1983 = new SqlBuilder();
      t_1983.appendSafe("active = ");
      t_1983.appendBoolean(true);
      const q_1984 = t_1982.where(t_1983.accumulated).distinct();
      let t_1985 = q_1984.toSql().toString() === "SELECT DISTINCT email FROM users WHERE active = TRUE";
      function fn_1986() {
        return "distinct with where";
      }
      test_1979.assert(t_1985, fn_1986);
      return;
    } finally {
      test_1979.softFailToHard();
    }
});
it("countSql bare", function () {
    const test_1987 = new Test_949();
    try {
      const q_1988 = from(sid_1560("users"));
      let t_1989 = q_1988.countSql().toString() === "SELECT COUNT(*) FROM users";
      function fn_1990() {
        return "countSql bare";
      }
      test_1987.assert(t_1989, fn_1990);
      return;
    } finally {
      test_1987.softFailToHard();
    }
});
it("countSql with WHERE", function () {
    const test_1991 = new Test_949();
    try {
      let t_1992 = sid_1560("users");
      let t_1993 = new SqlBuilder();
      t_1993.appendSafe("active = ");
      t_1993.appendBoolean(true);
      let t_1994 = t_1993.accumulated;
      const q_1995 = from(t_1992).where(t_1994);
      let t_1996 = q_1995.countSql().toString() === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_1997() {
        return "countSql with where";
      }
      test_1991.assert(t_1996, fn_1997);
      return;
    } finally {
      test_1991.softFailToHard();
    }
});
it("countSql with JOIN", function () {
    const test_1998 = new Test_949();
    try {
      let t_1999 = sid_1560("users");
      let t_2000 = sid_1560("orders");
      let t_2001 = new SqlBuilder();
      t_2001.appendSafe("users.id = orders.user_id");
      let t_2002 = t_2001.accumulated;
      let t_2003 = from(t_1999).innerJoin(t_2000, t_2002);
      let t_2004 = new SqlBuilder();
      t_2004.appendSafe("orders.total > ");
      t_2004.appendInt32(100);
      const q_2005 = t_2003.where(t_2004.accumulated);
      let t_2006 = q_2005.countSql().toString() === "SELECT COUNT(*) FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100";
      function fn_2007() {
        return "countSql with join";
      }
      test_1998.assert(t_2006, fn_2007);
      return;
    } finally {
      test_1998.softFailToHard();
    }
});
it("countSql drops orderBy/limit/offset", function () {
    const test_2008 = new Test_949();
    try {
      let t_2009;
      let t_2010;
      let t_2011;
      let t_2012;
      let t_2013;
      let q_2014;
      try {
        t_2009 = sid_1560("users");
        t_2010 = new SqlBuilder();
        t_2010.appendSafe("active = ");
        t_2010.appendBoolean(true);
        t_2011 = t_2010.accumulated;
        t_2012 = from(t_2009).where(t_2011).orderBy(sid_1560("name"), true).limit(10);
        t_2013 = t_2012.offset(20);
        q_2014 = t_2013;
      } catch {
        q_2014 = panic_946();
      }
      const s_2015 = q_2014.countSql().toString();
      let t_2016 = s_2015 === "SELECT COUNT(*) FROM users WHERE active = TRUE";
      function fn_2017() {
        return "countSql drops extras: " + s_2015;
      }
      test_2008.assert(t_2016, fn_2017);
      return;
    } finally {
      test_2008.softFailToHard();
    }
});
it("full aggregation query", function () {
    const test_2018 = new Test_949();
    try {
      let t_2019 = sid_1560("orders");
      let t_2020 = col(sid_1560("orders"), sid_1560("status"));
      let t_2021 = countAll();
      let t_2022 = sumCol(sid_1560("total"));
      let t_2023 = from(t_2019).selectExpr(Object.freeze([t_2020, t_2021, t_2022]));
      let t_2024 = sid_1560("users");
      let t_2025 = new SqlBuilder();
      t_2025.appendSafe("orders.user_id = users.id");
      let t_2026 = t_2023.innerJoin(t_2024, t_2025.accumulated);
      let t_2027 = new SqlBuilder();
      t_2027.appendSafe("users.active = ");
      t_2027.appendBoolean(true);
      let t_2028 = t_2026.where(t_2027.accumulated).groupBy(sid_1560("status"));
      let t_2029 = new SqlBuilder();
      t_2029.appendSafe("COUNT(*) > ");
      t_2029.appendInt32(3);
      const q_2030 = t_2028.having(t_2029.accumulated).orderBy(sid_1560("status"), true);
      const expected_2031 = "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      let t_2032 = q_2030.toSql().toString() === "SELECT orders.status, COUNT(*), SUM(total) FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.active = TRUE GROUP BY status HAVING COUNT(*) > 3 ORDER BY status ASC";
      function fn_2033() {
        return "full aggregation";
      }
      test_2018.assert(t_2032, fn_2033);
      return;
    } finally {
      test_2018.softFailToHard();
    }
});
it("unionSql", function () {
    const test_2034 = new Test_949();
    try {
      let t_2035 = sid_1560("users");
      let t_2036 = new SqlBuilder();
      t_2036.appendSafe("role = ");
      t_2036.appendString("admin");
      let t_2037 = t_2036.accumulated;
      const a_2038 = from(t_2035).where(t_2037);
      let t_2039 = sid_1560("users");
      let t_2040 = new SqlBuilder();
      t_2040.appendSafe("role = ");
      t_2040.appendString("moderator");
      let t_2041 = t_2040.accumulated;
      const b_2042 = from(t_2039).where(t_2041);
      const s_2043 = unionSql(a_2038, b_2042).toString();
      let t_2044 = s_2043 === "(SELECT * FROM users WHERE role = 'admin') UNION (SELECT * FROM users WHERE role = 'moderator')";
      function fn_2045() {
        return "unionSql: " + s_2043;
      }
      test_2034.assert(t_2044, fn_2045);
      return;
    } finally {
      test_2034.softFailToHard();
    }
});
it("unionAllSql", function () {
    const test_2046 = new Test_949();
    try {
      let t_2047 = sid_1560("users");
      let t_2048 = sid_1560("name");
      const a_2049 = from(t_2047).select(Object.freeze([t_2048]));
      let t_2050 = sid_1560("contacts");
      let t_2051 = sid_1560("name");
      const b_2052 = from(t_2050).select(Object.freeze([t_2051]));
      const s_2053 = unionAllSql(a_2049, b_2052).toString();
      let t_2054 = s_2053 === "(SELECT name FROM users) UNION ALL (SELECT name FROM contacts)";
      function fn_2055() {
        return "unionAllSql: " + s_2053;
      }
      test_2046.assert(t_2054, fn_2055);
      return;
    } finally {
      test_2046.softFailToHard();
    }
});
it("intersectSql", function () {
    const test_2056 = new Test_949();
    try {
      let t_2057 = sid_1560("users");
      let t_2058 = sid_1560("email");
      const a_2059 = from(t_2057).select(Object.freeze([t_2058]));
      let t_2060 = sid_1560("subscribers");
      let t_2061 = sid_1560("email");
      const b_2062 = from(t_2060).select(Object.freeze([t_2061]));
      const s_2063 = intersectSql(a_2059, b_2062).toString();
      let t_2064 = s_2063 === "(SELECT email FROM users) INTERSECT (SELECT email FROM subscribers)";
      function fn_2065() {
        return "intersectSql: " + s_2063;
      }
      test_2056.assert(t_2064, fn_2065);
      return;
    } finally {
      test_2056.softFailToHard();
    }
});
it("exceptSql", function () {
    const test_2066 = new Test_949();
    try {
      let t_2067 = sid_1560("users");
      let t_2068 = sid_1560("id");
      const a_2069 = from(t_2067).select(Object.freeze([t_2068]));
      let t_2070 = sid_1560("banned");
      let t_2071 = sid_1560("id");
      const b_2072 = from(t_2070).select(Object.freeze([t_2071]));
      const s_2073 = exceptSql(a_2069, b_2072).toString();
      let t_2074 = s_2073 === "(SELECT id FROM users) EXCEPT (SELECT id FROM banned)";
      function fn_2075() {
        return "exceptSql: " + s_2073;
      }
      test_2066.assert(t_2074, fn_2075);
      return;
    } finally {
      test_2066.softFailToHard();
    }
});
it("subquery with alias", function () {
    const test_2076 = new Test_949();
    try {
      let t_2077 = sid_1560("orders");
      let t_2078 = sid_1560("user_id");
      let t_2079 = from(t_2077).select(Object.freeze([t_2078]));
      let t_2080 = new SqlBuilder();
      t_2080.appendSafe("total > ");
      t_2080.appendInt32(100);
      const inner_2081 = t_2079.where(t_2080.accumulated);
      const s_2082 = subquery(inner_2081, sid_1560("big_orders")).toString();
      let t_2083 = s_2082 === "(SELECT user_id FROM orders WHERE total > 100) AS big_orders";
      function fn_2084() {
        return "subquery: " + s_2082;
      }
      test_2076.assert(t_2083, fn_2084);
      return;
    } finally {
      test_2076.softFailToHard();
    }
});
it("existsSql", function () {
    const test_2085 = new Test_949();
    try {
      let t_2086 = sid_1560("orders");
      let t_2087 = new SqlBuilder();
      t_2087.appendSafe("orders.user_id = users.id");
      let t_2088 = t_2087.accumulated;
      const inner_2089 = from(t_2086).where(t_2088);
      const s_2090 = existsSql(inner_2089).toString();
      let t_2091 = s_2090 === "EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_2092() {
        return "existsSql: " + s_2090;
      }
      test_2085.assert(t_2091, fn_2092);
      return;
    } finally {
      test_2085.softFailToHard();
    }
});
it("whereInSubquery", function () {
    const test_2093 = new Test_949();
    try {
      let t_2094 = sid_1560("orders");
      let t_2095 = sid_1560("user_id");
      let t_2096 = from(t_2094).select(Object.freeze([t_2095]));
      let t_2097 = new SqlBuilder();
      t_2097.appendSafe("total > ");
      t_2097.appendInt32(1000);
      const sub_2098 = t_2096.where(t_2097.accumulated);
      let t_2099 = sid_1560("users");
      let t_2100 = sid_1560("id");
      const q_2101 = from(t_2099).whereInSubquery(t_2100, sub_2098);
      const s_2102 = q_2101.toSql().toString();
      let t_2103 = s_2102 === "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)";
      function fn_2104() {
        return "whereInSubquery: " + s_2102;
      }
      test_2093.assert(t_2103, fn_2104);
      return;
    } finally {
      test_2093.softFailToHard();
    }
});
it("set operation with WHERE on each side", function () {
    const test_2105 = new Test_949();
    try {
      let t_2106 = sid_1560("users");
      let t_2107 = new SqlBuilder();
      t_2107.appendSafe("age > ");
      t_2107.appendInt32(18);
      let t_2108 = t_2107.accumulated;
      let t_2109 = from(t_2106).where(t_2108);
      let t_2110 = new SqlBuilder();
      t_2110.appendSafe("active = ");
      t_2110.appendBoolean(true);
      const a_2111 = t_2109.where(t_2110.accumulated);
      let t_2112 = sid_1560("users");
      let t_2113 = new SqlBuilder();
      t_2113.appendSafe("role = ");
      t_2113.appendString("vip");
      let t_2114 = t_2113.accumulated;
      const b_2115 = from(t_2112).where(t_2114);
      const s_2116 = unionSql(a_2111, b_2115).toString();
      let t_2117 = s_2116 === "(SELECT * FROM users WHERE age > 18 AND active = TRUE) UNION (SELECT * FROM users WHERE role = 'vip')";
      function fn_2118() {
        return "union with where: " + s_2116;
      }
      test_2105.assert(t_2117, fn_2118);
      return;
    } finally {
      test_2105.softFailToHard();
    }
});
it("whereInSubquery chained with where", function () {
    const test_2119 = new Test_949();
    try {
      let t_2120 = sid_1560("orders");
      let t_2121 = sid_1560("user_id");
      const sub_2122 = from(t_2120).select(Object.freeze([t_2121]));
      let t_2123 = sid_1560("users");
      let t_2124 = new SqlBuilder();
      t_2124.appendSafe("active = ");
      t_2124.appendBoolean(true);
      let t_2125 = t_2124.accumulated;
      const q_2126 = from(t_2123).where(t_2125).whereInSubquery(sid_1560("id"), sub_2122);
      const s_2127 = q_2126.toSql().toString();
      let t_2128 = s_2127 === "SELECT * FROM users WHERE active = TRUE AND id IN (SELECT user_id FROM orders)";
      function fn_2129() {
        return "whereInSubquery chained: " + s_2127;
      }
      test_2119.assert(t_2128, fn_2129);
      return;
    } finally {
      test_2119.softFailToHard();
    }
});
it("existsSql used in where", function () {
    const test_2130 = new Test_949();
    try {
      let t_2131 = sid_1560("orders");
      let t_2132 = new SqlBuilder();
      t_2132.appendSafe("orders.user_id = users.id");
      let t_2133 = t_2132.accumulated;
      const sub_2134 = from(t_2131).where(t_2133);
      let t_2135 = sid_1560("users");
      let t_2136 = existsSql(sub_2134);
      const q_2137 = from(t_2135).where(t_2136);
      const s_2138 = q_2137.toSql().toString();
      let t_2139 = s_2138 === "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)";
      function fn_2140() {
        return "exists in where: " + s_2138;
      }
      test_2130.assert(t_2139, fn_2140);
      return;
    } finally {
      test_2130.softFailToHard();
    }
});
it("UpdateQuery basic", function () {
    const test_2141 = new Test_949();
    try {
      let t_2142;
      let t_2143;
      let t_2144;
      let t_2145;
      let t_2146;
      let t_2147;
      let q_2148;
      try {
        t_2142 = sid_1560("users");
        t_2143 = sid_1560("name");
        t_2144 = new SqlString("Alice");
        t_2145 = update(t_2142).set(t_2143, t_2144);
        t_2146 = new SqlBuilder();
        t_2146.appendSafe("id = ");
        t_2146.appendInt32(1);
        t_2147 = t_2145.where(t_2146.accumulated).toSql();
        q_2148 = t_2147;
      } catch {
        q_2148 = panic_946();
      }
      let t_2149 = q_2148.toString() === "UPDATE users SET name = 'Alice' WHERE id = 1";
      function fn_2150() {
        return "update basic";
      }
      test_2141.assert(t_2149, fn_2150);
      return;
    } finally {
      test_2141.softFailToHard();
    }
});
it("UpdateQuery multiple SET", function () {
    const test_2151 = new Test_949();
    try {
      let t_2152;
      let t_2153;
      let t_2154;
      let t_2155;
      let t_2156;
      let t_2157;
      let q_2158;
      try {
        t_2152 = sid_1560("users");
        t_2153 = sid_1560("name");
        t_2154 = new SqlString("Bob");
        t_2155 = update(t_2152).set(t_2153, t_2154).set(sid_1560("age"), new SqlInt32(30));
        t_2156 = new SqlBuilder();
        t_2156.appendSafe("id = ");
        t_2156.appendInt32(2);
        t_2157 = t_2155.where(t_2156.accumulated).toSql();
        q_2158 = t_2157;
      } catch {
        q_2158 = panic_946();
      }
      let t_2159 = q_2158.toString() === "UPDATE users SET name = 'Bob', age = 30 WHERE id = 2";
      function fn_2160() {
        return "update multi set";
      }
      test_2151.assert(t_2159, fn_2160);
      return;
    } finally {
      test_2151.softFailToHard();
    }
});
it("UpdateQuery multiple WHERE", function () {
    const test_2161 = new Test_949();
    try {
      let t_2162;
      let t_2163;
      let t_2164;
      let t_2165;
      let t_2166;
      let t_2167;
      let t_2168;
      let t_2169;
      let q_2170;
      try {
        t_2162 = sid_1560("users");
        t_2163 = sid_1560("active");
        t_2164 = new SqlBoolean(false);
        t_2165 = update(t_2162).set(t_2163, t_2164);
        t_2166 = new SqlBuilder();
        t_2166.appendSafe("age < ");
        t_2166.appendInt32(18);
        t_2167 = t_2165.where(t_2166.accumulated);
        t_2168 = new SqlBuilder();
        t_2168.appendSafe("role = ");
        t_2168.appendString("guest");
        t_2169 = t_2167.where(t_2168.accumulated).toSql();
        q_2170 = t_2169;
      } catch {
        q_2170 = panic_946();
      }
      let t_2171 = q_2170.toString() === "UPDATE users SET active = FALSE WHERE age < 18 AND role = 'guest'";
      function fn_2172() {
        return "update multi where";
      }
      test_2161.assert(t_2171, fn_2172);
      return;
    } finally {
      test_2161.softFailToHard();
    }
});
it("UpdateQuery orWhere", function () {
    const test_2173 = new Test_949();
    try {
      let t_2174;
      let t_2175;
      let t_2176;
      let t_2177;
      let t_2178;
      let t_2179;
      let t_2180;
      let t_2181;
      let q_2182;
      try {
        t_2174 = sid_1560("users");
        t_2175 = sid_1560("status");
        t_2176 = new SqlString("banned");
        t_2177 = update(t_2174).set(t_2175, t_2176);
        t_2178 = new SqlBuilder();
        t_2178.appendSafe("spam_count > ");
        t_2178.appendInt32(10);
        t_2179 = t_2177.where(t_2178.accumulated);
        t_2180 = new SqlBuilder();
        t_2180.appendSafe("reported = ");
        t_2180.appendBoolean(true);
        t_2181 = t_2179.orWhere(t_2180.accumulated).toSql();
        q_2182 = t_2181;
      } catch {
        q_2182 = panic_946();
      }
      let t_2183 = q_2182.toString() === "UPDATE users SET status = 'banned' WHERE spam_count > 10 OR reported = TRUE";
      function fn_2184() {
        return "update orWhere";
      }
      test_2173.assert(t_2183, fn_2184);
      return;
    } finally {
      test_2173.softFailToHard();
    }
});
it("UpdateQuery bubbles without WHERE", function () {
    const test_2185 = new Test_949();
    try {
      let t_2186;
      let t_2187;
      let t_2188;
      let didBubble_2189;
      try {
        t_2186 = sid_1560("users");
        t_2187 = sid_1560("x");
        t_2188 = new SqlInt32(1);
        update(t_2186).set(t_2187, t_2188).toSql();
        didBubble_2189 = false;
      } catch {
        didBubble_2189 = true;
      }
      function fn_2190() {
        return "update without WHERE should bubble";
      }
      test_2185.assert(didBubble_2189, fn_2190);
      return;
    } finally {
      test_2185.softFailToHard();
    }
});
it("UpdateQuery bubbles without SET", function () {
    const test_2191 = new Test_949();
    try {
      let t_2192;
      let t_2193;
      let t_2194;
      let didBubble_2195;
      try {
        t_2192 = sid_1560("users");
        t_2193 = new SqlBuilder();
        t_2193.appendSafe("id = ");
        t_2193.appendInt32(1);
        t_2194 = t_2193.accumulated;
        update(t_2192).where(t_2194).toSql();
        didBubble_2195 = false;
      } catch {
        didBubble_2195 = true;
      }
      function fn_2196() {
        return "update without SET should bubble";
      }
      test_2191.assert(didBubble_2195, fn_2196);
      return;
    } finally {
      test_2191.softFailToHard();
    }
});
it("UpdateQuery with limit", function () {
    const test_2197 = new Test_949();
    try {
      let t_2198;
      let t_2199;
      let t_2200;
      let t_2201;
      let t_2202;
      let t_2203;
      let t_2204;
      let q_2205;
      try {
        t_2198 = sid_1560("users");
        t_2199 = sid_1560("active");
        t_2200 = new SqlBoolean(false);
        t_2201 = update(t_2198).set(t_2199, t_2200);
        t_2202 = new SqlBuilder();
        t_2202.appendSafe("last_login < ");
        t_2202.appendString("2024-01-01");
        t_2203 = t_2201.where(t_2202.accumulated).limit(100);
        t_2204 = t_2203.toSql();
        q_2205 = t_2204;
      } catch {
        q_2205 = panic_946();
      }
      let t_2206 = q_2205.toString() === "UPDATE users SET active = FALSE WHERE last_login < '2024-01-01' LIMIT 100";
      function fn_2207() {
        return "update limit";
      }
      test_2197.assert(t_2206, fn_2207);
      return;
    } finally {
      test_2197.softFailToHard();
    }
});
it("UpdateQuery escaping", function () {
    const test_2208 = new Test_949();
    try {
      let t_2209;
      let t_2210;
      let t_2211;
      let t_2212;
      let t_2213;
      let t_2214;
      let q_2215;
      try {
        t_2209 = sid_1560("users");
        t_2210 = sid_1560("bio");
        t_2211 = new SqlString("It's a test");
        t_2212 = update(t_2209).set(t_2210, t_2211);
        t_2213 = new SqlBuilder();
        t_2213.appendSafe("id = ");
        t_2213.appendInt32(1);
        t_2214 = t_2212.where(t_2213.accumulated).toSql();
        q_2215 = t_2214;
      } catch {
        q_2215 = panic_946();
      }
      let t_2216 = q_2215.toString() === "UPDATE users SET bio = 'It''s a test' WHERE id = 1";
      function fn_2217() {
        return "update escaping";
      }
      test_2208.assert(t_2216, fn_2217);
      return;
    } finally {
      test_2208.softFailToHard();
    }
});
it("DeleteQuery basic", function () {
    const test_2218 = new Test_949();
    try {
      let t_2219;
      let t_2220;
      let t_2221;
      let t_2222;
      let q_2223;
      try {
        t_2219 = sid_1560("users");
        t_2220 = new SqlBuilder();
        t_2220.appendSafe("id = ");
        t_2220.appendInt32(1);
        t_2221 = t_2220.accumulated;
        t_2222 = deleteFrom(t_2219).where(t_2221).toSql();
        q_2223 = t_2222;
      } catch {
        q_2223 = panic_946();
      }
      let t_2224 = q_2223.toString() === "DELETE FROM users WHERE id = 1";
      function fn_2225() {
        return "delete basic";
      }
      test_2218.assert(t_2224, fn_2225);
      return;
    } finally {
      test_2218.softFailToHard();
    }
});
it("DeleteQuery multiple WHERE", function () {
    const test_2226 = new Test_949();
    try {
      let t_2227;
      let t_2228;
      let t_2229;
      let t_2230;
      let t_2231;
      let t_2232;
      let q_2233;
      try {
        t_2227 = sid_1560("logs");
        t_2228 = new SqlBuilder();
        t_2228.appendSafe("created_at < ");
        t_2228.appendString("2024-01-01");
        t_2229 = t_2228.accumulated;
        t_2230 = deleteFrom(t_2227).where(t_2229);
        t_2231 = new SqlBuilder();
        t_2231.appendSafe("level = ");
        t_2231.appendString("debug");
        t_2232 = t_2230.where(t_2231.accumulated).toSql();
        q_2233 = t_2232;
      } catch {
        q_2233 = panic_946();
      }
      let t_2234 = q_2233.toString() === "DELETE FROM logs WHERE created_at < '2024-01-01' AND level = 'debug'";
      function fn_2235() {
        return "delete multi where";
      }
      test_2226.assert(t_2234, fn_2235);
      return;
    } finally {
      test_2226.softFailToHard();
    }
});
it("DeleteQuery bubbles without WHERE", function () {
    const test_2236 = new Test_949();
    try {
      let didBubble_2237;
      try {
        deleteFrom(sid_1560("users")).toSql();
        didBubble_2237 = false;
      } catch {
        didBubble_2237 = true;
      }
      function fn_2238() {
        return "delete without WHERE should bubble";
      }
      test_2236.assert(didBubble_2237, fn_2238);
      return;
    } finally {
      test_2236.softFailToHard();
    }
});
it("DeleteQuery orWhere", function () {
    const test_2239 = new Test_949();
    try {
      let t_2240;
      let t_2241;
      let t_2242;
      let t_2243;
      let t_2244;
      let t_2245;
      let q_2246;
      try {
        t_2240 = sid_1560("sessions");
        t_2241 = new SqlBuilder();
        t_2241.appendSafe("expired = ");
        t_2241.appendBoolean(true);
        t_2242 = t_2241.accumulated;
        t_2243 = deleteFrom(t_2240).where(t_2242);
        t_2244 = new SqlBuilder();
        t_2244.appendSafe("created_at < ");
        t_2244.appendString("2023-01-01");
        t_2245 = t_2243.orWhere(t_2244.accumulated).toSql();
        q_2246 = t_2245;
      } catch {
        q_2246 = panic_946();
      }
      let t_2247 = q_2246.toString() === "DELETE FROM sessions WHERE expired = TRUE OR created_at < '2023-01-01'";
      function fn_2248() {
        return "delete orWhere";
      }
      test_2239.assert(t_2247, fn_2248);
      return;
    } finally {
      test_2239.softFailToHard();
    }
});
it("DeleteQuery with limit", function () {
    const test_2249 = new Test_949();
    try {
      let t_2250;
      let t_2251;
      let t_2252;
      let t_2253;
      let t_2254;
      let q_2255;
      try {
        t_2250 = sid_1560("logs");
        t_2251 = new SqlBuilder();
        t_2251.appendSafe("level = ");
        t_2251.appendString("debug");
        t_2252 = t_2251.accumulated;
        t_2253 = deleteFrom(t_2250).where(t_2252).limit(1000);
        t_2254 = t_2253.toSql();
        q_2255 = t_2254;
      } catch {
        q_2255 = panic_946();
      }
      let t_2256 = q_2255.toString() === "DELETE FROM logs WHERE level = 'debug' LIMIT 1000";
      function fn_2257() {
        return "delete limit";
      }
      test_2249.assert(t_2256, fn_2257);
      return;
    } finally {
      test_2249.softFailToHard();
    }
});
it("orderByNulls NULLS FIRST", function () {
    const test_2258 = new Test_949();
    try {
      let t_2259 = sid_1560("users");
      let t_2260 = sid_1560("email");
      let t_2261 = new NullsFirst();
      const q_2262 = from(t_2259).orderByNulls(t_2260, true, t_2261);
      let t_2263 = q_2262.toSql().toString() === "SELECT * FROM users ORDER BY email ASC NULLS FIRST";
      function fn_2264() {
        return "nulls first";
      }
      test_2258.assert(t_2263, fn_2264);
      return;
    } finally {
      test_2258.softFailToHard();
    }
});
it("orderByNulls NULLS LAST", function () {
    const test_2265 = new Test_949();
    try {
      let t_2266 = sid_1560("users");
      let t_2267 = sid_1560("score");
      let t_2268 = new NullsLast();
      const q_2269 = from(t_2266).orderByNulls(t_2267, false, t_2268);
      let t_2270 = q_2269.toSql().toString() === "SELECT * FROM users ORDER BY score DESC NULLS LAST";
      function fn_2271() {
        return "nulls last";
      }
      test_2265.assert(t_2270, fn_2271);
      return;
    } finally {
      test_2265.softFailToHard();
    }
});
it("mixed orderBy and orderByNulls", function () {
    const test_2272 = new Test_949();
    try {
      let t_2273 = sid_1560("users");
      let t_2274 = sid_1560("name");
      const q_2275 = from(t_2273).orderBy(t_2274, true).orderByNulls(sid_1560("email"), true, new NullsFirst());
      let t_2276 = q_2275.toSql().toString() === "SELECT * FROM users ORDER BY name ASC, email ASC NULLS FIRST";
      function fn_2277() {
        return "mixed order";
      }
      test_2272.assert(t_2276, fn_2277);
      return;
    } finally {
      test_2272.softFailToHard();
    }
});
it("crossJoin", function () {
    const test_2278 = new Test_949();
    try {
      let t_2279 = sid_1560("users");
      let t_2280 = sid_1560("colors");
      const q_2281 = from(t_2279).crossJoin(t_2280);
      let t_2282 = q_2281.toSql().toString() === "SELECT * FROM users CROSS JOIN colors";
      function fn_2283() {
        return "cross join";
      }
      test_2278.assert(t_2282, fn_2283);
      return;
    } finally {
      test_2278.softFailToHard();
    }
});
it("crossJoin combined with other joins", function () {
    const test_2284 = new Test_949();
    try {
      let t_2285 = sid_1560("users");
      let t_2286 = sid_1560("orders");
      let t_2287 = new SqlBuilder();
      t_2287.appendSafe("users.id = orders.user_id");
      let t_2288 = t_2287.accumulated;
      const q_2289 = from(t_2285).innerJoin(t_2286, t_2288).crossJoin(sid_1560("colors"));
      let t_2290 = q_2289.toSql().toString() === "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id CROSS JOIN colors";
      function fn_2291() {
        return "cross + inner join";
      }
      test_2284.assert(t_2290, fn_2291);
      return;
    } finally {
      test_2284.softFailToHard();
    }
});
it("lock FOR UPDATE", function () {
    const test_2292 = new Test_949();
    try {
      let t_2293 = sid_1560("users");
      let t_2294 = new SqlBuilder();
      t_2294.appendSafe("id = ");
      t_2294.appendInt32(1);
      let t_2295 = t_2294.accumulated;
      const q_2296 = from(t_2293).where(t_2295).lock(new ForUpdate());
      let t_2297 = q_2296.toSql().toString() === "SELECT * FROM users WHERE id = 1 FOR UPDATE";
      function fn_2298() {
        return "for update";
      }
      test_2292.assert(t_2297, fn_2298);
      return;
    } finally {
      test_2292.softFailToHard();
    }
});
it("lock FOR SHARE", function () {
    const test_2299 = new Test_949();
    try {
      let t_2300 = sid_1560("users");
      let t_2301 = sid_1560("name");
      const q_2302 = from(t_2300).select(Object.freeze([t_2301])).lock(new ForShare());
      let t_2303 = q_2302.toSql().toString() === "SELECT name FROM users FOR SHARE";
      function fn_2304() {
        return "for share";
      }
      test_2299.assert(t_2303, fn_2304);
      return;
    } finally {
      test_2299.softFailToHard();
    }
});
it("lock with full query", function () {
    const test_2305 = new Test_949();
    try {
      let t_2306;
      let t_2307;
      let t_2308;
      let t_2309;
      let t_2310;
      let q_2311;
      try {
        t_2306 = sid_1560("accounts");
        t_2307 = new SqlBuilder();
        t_2307.appendSafe("id = ");
        t_2307.appendInt32(42);
        t_2308 = t_2307.accumulated;
        t_2310 = from(t_2306).where(t_2308).limit(1);
        t_2309 = t_2310.lock(new ForUpdate());
        q_2311 = t_2309;
      } catch {
        q_2311 = panic_946();
      }
      let t_2312 = q_2311.toSql().toString() === "SELECT * FROM accounts WHERE id = 42 LIMIT 1 FOR UPDATE";
      function fn_2313() {
        return "lock full query";
      }
      test_2305.assert(t_2312, fn_2313);
      return;
    } finally {
      test_2305.softFailToHard();
    }
});
it("safeIdentifier accepts valid names", function () {
    const test_2314 = new Test_949();
    try {
      let t_2315;
      let id_2316;
      try {
        t_2315 = safeIdentifier("user_name");
        id_2316 = t_2315;
      } catch {
        id_2316 = panic_946();
      }
      let t_2317 = id_2316.sqlValue === "user_name";
      function fn_2318() {
        return "value should round-trip";
      }
      test_2314.assert(t_2317, fn_2318);
      return;
    } finally {
      test_2314.softFailToHard();
    }
});
it("safeIdentifier rejects empty string", function () {
    const test_2319 = new Test_949();
    try {
      let didBubble_2320;
      try {
        safeIdentifier("");
        didBubble_2320 = false;
      } catch {
        didBubble_2320 = true;
      }
      function fn_2321() {
        return "empty string should bubble";
      }
      test_2319.assert(didBubble_2320, fn_2321);
      return;
    } finally {
      test_2319.softFailToHard();
    }
});
it("safeIdentifier rejects leading digit", function () {
    const test_2322 = new Test_949();
    try {
      let didBubble_2323;
      try {
        safeIdentifier("1col");
        didBubble_2323 = false;
      } catch {
        didBubble_2323 = true;
      }
      function fn_2324() {
        return "leading digit should bubble";
      }
      test_2322.assert(didBubble_2323, fn_2324);
      return;
    } finally {
      test_2322.softFailToHard();
    }
});
it("safeIdentifier rejects SQL metacharacters", function () {
    const test_2325 = new Test_949();
    try {
      const cases_2326 = Object.freeze(["name); DROP TABLE", "col'", "a b", "a-b", "a.b", "a;b"]);
      function fn_2327(c_2328) {
        let didBubble_2329;
        try {
          safeIdentifier(c_2328);
          didBubble_2329 = false;
        } catch {
          didBubble_2329 = true;
        }
        function fn_2330() {
          return "should reject: " + c_2328;
        }
        test_2325.assert(didBubble_2329, fn_2330);
        return;
      }
      cases_2326.forEach(fn_2327);
      return;
    } finally {
      test_2325.softFailToHard();
    }
});
it("TableDef field lookup - found", function () {
    const test_2331 = new Test_949();
    try {
      let t_2332;
      let t_2333;
      let t_2334;
      let t_2335;
      let t_2336;
      let t_2337;
      let t_2338;
      try {
        t_2332 = safeIdentifier("users");
        t_2333 = t_2332;
      } catch {
        t_2333 = panic_946();
      }
      try {
        t_2334 = safeIdentifier("name");
        t_2335 = t_2334;
      } catch {
        t_2335 = panic_946();
      }
      let t_2339 = new StringField();
      let t_2340 = new FieldDef(t_2335, t_2339, false, null, false);
      try {
        t_2336 = safeIdentifier("age");
        t_2337 = t_2336;
      } catch {
        t_2337 = panic_946();
      }
      let t_2341 = new IntField();
      let t_2342 = new FieldDef(t_2337, t_2341, false, null, false);
      const td_2343 = new TableDef(t_2333, Object.freeze([t_2340, t_2342]), null);
      let f_2344;
      try {
        t_2338 = td_2343.field("age");
        f_2344 = t_2338;
      } catch {
        f_2344 = panic_946();
      }
      let t_2345 = f_2344.name.sqlValue === "age";
      function fn_2346() {
        return "should find age field";
      }
      test_2331.assert(t_2345, fn_2346);
      return;
    } finally {
      test_2331.softFailToHard();
    }
});
it("TableDef field lookup - not found bubbles", function () {
    const test_2347 = new Test_949();
    try {
      let t_2348;
      let t_2349;
      let t_2350;
      let t_2351;
      try {
        t_2348 = safeIdentifier("users");
        t_2349 = t_2348;
      } catch {
        t_2349 = panic_946();
      }
      try {
        t_2350 = safeIdentifier("name");
        t_2351 = t_2350;
      } catch {
        t_2351 = panic_946();
      }
      let t_2352 = new StringField();
      let t_2353 = new FieldDef(t_2351, t_2352, false, null, false);
      const td_2354 = new TableDef(t_2349, Object.freeze([t_2353]), null);
      let didBubble_2355;
      try {
        td_2354.field("nonexistent");
        didBubble_2355 = false;
      } catch {
        didBubble_2355 = true;
      }
      function fn_2356() {
        return "unknown field should bubble";
      }
      test_2347.assert(didBubble_2355, fn_2356);
      return;
    } finally {
      test_2347.softFailToHard();
    }
});
it("FieldDef nullable flag", function () {
    const test_2357 = new Test_949();
    try {
      let t_2358;
      let t_2359;
      let t_2360;
      let t_2361;
      try {
        t_2358 = safeIdentifier("email");
        t_2359 = t_2358;
      } catch {
        t_2359 = panic_946();
      }
      let t_2362 = new StringField();
      const required_2363 = new FieldDef(t_2359, t_2362, false, null, false);
      try {
        t_2360 = safeIdentifier("bio");
        t_2361 = t_2360;
      } catch {
        t_2361 = panic_946();
      }
      let t_2364 = new StringField();
      const optional_2365 = new FieldDef(t_2361, t_2364, true, null, false);
      let t_2366 = ! required_2363.nullable;
      function fn_2367() {
        return "required field should not be nullable";
      }
      test_2357.assert(t_2366, fn_2367);
      let t_2368 = optional_2365.nullable;
      function fn_2369() {
        return "optional field should be nullable";
      }
      test_2357.assert(t_2368, fn_2369);
      return;
    } finally {
      test_2357.softFailToHard();
    }
});
it("pkName defaults to id when primaryKey is null", function () {
    const test_2370 = new Test_949();
    try {
      let t_2371;
      let t_2372;
      let t_2373;
      let t_2374;
      try {
        t_2371 = safeIdentifier("users");
        t_2372 = t_2371;
      } catch {
        t_2372 = panic_946();
      }
      try {
        t_2373 = safeIdentifier("name");
        t_2374 = t_2373;
      } catch {
        t_2374 = panic_946();
      }
      let t_2375 = new StringField();
      let t_2376 = new FieldDef(t_2374, t_2375, false, null, false);
      const td_2377 = new TableDef(t_2372, Object.freeze([t_2376]), null);
      let t_2378 = td_2377.pkName() === "id";
      function fn_2379() {
        return "default pk should be id";
      }
      test_2370.assert(t_2378, fn_2379);
      return;
    } finally {
      test_2370.softFailToHard();
    }
});
it("pkName returns custom primary key", function () {
    const test_2380 = new Test_949();
    try {
      let t_2381;
      let t_2382;
      let t_2383;
      let t_2384;
      let t_2385;
      let t_2386;
      try {
        t_2381 = safeIdentifier("users");
        t_2382 = t_2381;
      } catch {
        t_2382 = panic_946();
      }
      try {
        t_2383 = safeIdentifier("user_id");
        t_2384 = t_2383;
      } catch {
        t_2384 = panic_946();
      }
      let t_2387 = new IntField();
      let t_2388 = Object.freeze([new FieldDef(t_2384, t_2387, false, null, false)]);
      try {
        t_2385 = safeIdentifier("user_id");
        t_2386 = t_2385;
      } catch {
        t_2386 = panic_946();
      }
      const td_2389 = new TableDef(t_2382, t_2388, t_2386);
      let t_2390 = td_2389.pkName() === "user_id";
      function fn_2391() {
        return "custom pk should be user_id";
      }
      test_2380.assert(t_2390, fn_2391);
      return;
    } finally {
      test_2380.softFailToHard();
    }
});
it("timestamps returns two DateField defs", function () {
    const test_2392 = new Test_949();
    try {
      let t_2393;
      let ts_2394;
      try {
        t_2393 = timestamps();
        ts_2394 = t_2393;
      } catch {
        ts_2394 = panic_946();
      }
      let t_2395 = ts_2394.length === 2;
      function fn_2396() {
        return "should return 2 fields";
      }
      test_2392.assert(t_2395, fn_2396);
      let t_2397 = listedGet_197(ts_2394, 0).name.sqlValue === "inserted_at";
      function fn_2398() {
        return "first should be inserted_at";
      }
      test_2392.assert(t_2397, fn_2398);
      let t_2399 = listedGet_197(ts_2394, 1).name.sqlValue === "updated_at";
      function fn_2400() {
        return "second should be updated_at";
      }
      test_2392.assert(t_2399, fn_2400);
      let t_2401 = listedGet_197(ts_2394, 0).nullable;
      function fn_2402() {
        return "inserted_at should be nullable";
      }
      test_2392.assert(t_2401, fn_2402);
      let t_2403 = listedGet_197(ts_2394, 1).nullable;
      function fn_2404() {
        return "updated_at should be nullable";
      }
      test_2392.assert(t_2403, fn_2404);
      let t_2405 = !(listedGet_197(ts_2394, 0).defaultValue == null);
      function fn_2406() {
        return "inserted_at should have default";
      }
      test_2392.assert(t_2405, fn_2406);
      let t_2407 = !(listedGet_197(ts_2394, 1).defaultValue == null);
      function fn_2408() {
        return "updated_at should have default";
      }
      test_2392.assert(t_2407, fn_2408);
      return;
    } finally {
      test_2392.softFailToHard();
    }
});
it("FieldDef defaultValue field", function () {
    const test_2409 = new Test_949();
    try {
      let t_2410;
      let t_2411;
      let t_2412;
      let t_2413;
      try {
        t_2410 = safeIdentifier("status");
        t_2411 = t_2410;
      } catch {
        t_2411 = panic_946();
      }
      let t_2414 = new StringField();
      let t_2415 = new SqlDefault();
      const withDefault_2416 = new FieldDef(t_2411, t_2414, false, t_2415, false);
      try {
        t_2412 = safeIdentifier("name");
        t_2413 = t_2412;
      } catch {
        t_2413 = panic_946();
      }
      let t_2417 = new StringField();
      const withoutDefault_2418 = new FieldDef(t_2413, t_2417, false, null, false);
      let t_2419 = !(withDefault_2416.defaultValue == null);
      function fn_2420() {
        return "should have default";
      }
      test_2409.assert(t_2419, fn_2420);
      let t_2421 = withoutDefault_2418.defaultValue == null;
      function fn_2422() {
        return "should not have default";
      }
      test_2409.assert(t_2421, fn_2422);
      return;
    } finally {
      test_2409.softFailToHard();
    }
});
it("FieldDef virtual flag", function () {
    const test_2423 = new Test_949();
    try {
      let t_2424;
      let t_2425;
      let t_2426;
      let t_2427;
      try {
        t_2424 = safeIdentifier("name");
        t_2425 = t_2424;
      } catch {
        t_2425 = panic_946();
      }
      let t_2428 = new StringField();
      const normal_2429 = new FieldDef(t_2425, t_2428, false, null, false);
      try {
        t_2426 = safeIdentifier("full_name");
        t_2427 = t_2426;
      } catch {
        t_2427 = panic_946();
      }
      let t_2430 = new StringField();
      const virt_2431 = new FieldDef(t_2427, t_2430, true, null, true);
      let t_2432 = ! normal_2429.virtual;
      function fn_2433() {
        return "normal field should not be virtual";
      }
      test_2423.assert(t_2432, fn_2433);
      let t_2434 = virt_2431.virtual;
      function fn_2435() {
        return "virtual field should be virtual";
      }
      test_2423.assert(t_2434, fn_2435);
      return;
    } finally {
      test_2423.softFailToHard();
    }
});
it("string escaping", function () {
    const test_2436 = new Test_949();
    try {
      function build_2437(name_2438) {
        let t_2439 = new SqlBuilder();
        t_2439.appendSafe("select * from hi where name = ");
        t_2439.appendString(name_2438);
        return t_2439.accumulated.toString();
      }
      function buildWrong_2440(name_2441) {
        return "select * from hi where name = '" + name_2441 + "'";
      }
      const actual_2442 = build_2437("world");
      let t_2443 = actual_2442 === "select * from hi where name = 'world'";
      function fn_2444() {
        return 'expected build("world") == (' + "select * from hi where name = 'world'" + ") not (" + actual_2442 + ")";
      }
      test_2436.assert(t_2443, fn_2444);
      const bobbyTables_2445 = "Robert'); drop table hi;--";
      const actual_2446 = build_2437("Robert'); drop table hi;--");
      let t_2447 = actual_2446 === "select * from hi where name = 'Robert''); drop table hi;--'";
      function fn_2448() {
        return "expected build(bobbyTables) == (" + "select * from hi where name = 'Robert''); drop table hi;--'" + ") not (" + actual_2446 + ")";
      }
      test_2436.assert(t_2447, fn_2448);
      function fn_2449() {
        return "expected buildWrong(bobbyTables) == (select * from hi where name = 'Robert'); drop table hi;--') not (select * from hi where name = 'Robert'); drop table hi;--')";
      }
      test_2436.assert(true, fn_2449);
      return;
    } finally {
      test_2436.softFailToHard();
    }
});
it("string edge cases", function () {
    const test_2450 = new Test_949();
    try {
      let t_2451 = new SqlBuilder();
      t_2451.appendSafe("v = ");
      t_2451.appendString("");
      const actual_2452 = t_2451.accumulated.toString();
      let t_2453 = actual_2452 === "v = ''";
      function fn_2454() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "").toString() == (' + "v = ''" + ") not (" + actual_2452 + ")";
      }
      test_2450.assert(t_2453, fn_2454);
      let t_2455 = new SqlBuilder();
      t_2455.appendSafe("v = ");
      t_2455.appendString("a''b");
      const actual_2456 = t_2455.accumulated.toString();
      let t_2457 = actual_2456 === "v = 'a''''b'";
      function fn_2458() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v = \", \\interpolate, \"a''b\").toString() == (" + "v = 'a''''b'" + ") not (" + actual_2456 + ")";
      }
      test_2450.assert(t_2457, fn_2458);
      let t_2459 = new SqlBuilder();
      t_2459.appendSafe("v = ");
      t_2459.appendString("Hello 世界");
      const actual_2460 = t_2459.accumulated.toString();
      let t_2461 = actual_2460 === "v = 'Hello 世界'";
      function fn_2462() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Hello 世界").toString() == (' + "v = 'Hello 世界'" + ") not (" + actual_2460 + ")";
      }
      test_2450.assert(t_2461, fn_2462);
      let t_2463 = new SqlBuilder();
      t_2463.appendSafe("v = ");
      t_2463.appendString("Line1\nLine2");
      const actual_2464 = t_2463.accumulated.toString();
      let t_2465 = actual_2464 === "v = 'Line1\nLine2'";
      function fn_2466() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, "Line1\\nLine2").toString() == (' + "v = 'Line1\nLine2'" + ") not (" + actual_2464 + ")";
      }
      test_2450.assert(t_2465, fn_2466);
      return;
    } finally {
      test_2450.softFailToHard();
    }
});
it("numbers and booleans", function () {
    const test_2467 = new Test_949();
    try {
      let t_2468;
      let t_2469 = new SqlBuilder();
      t_2469.appendSafe("select ");
      t_2469.appendInt32(42);
      t_2469.appendSafe(", ");
      t_2469.appendInt64(BigInt("43"));
      t_2469.appendSafe(", ");
      t_2469.appendFloat64(19.99);
      t_2469.appendSafe(", ");
      t_2469.appendBoolean(true);
      t_2469.appendSafe(", ");
      t_2469.appendBoolean(false);
      const actual_2470 = t_2469.accumulated.toString();
      let t_2471 = actual_2470 === "select 42, 43, 19.99, TRUE, FALSE";
      function fn_2472() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, 42, ", ", \\interpolate, 43, ", ", \\interpolate, 19.99, ", ", \\interpolate, true, ", ", \\interpolate, false).toString() == (' + "select 42, 43, 19.99, TRUE, FALSE" + ") not (" + actual_2470 + ")";
      }
      test_2467.assert(t_2471, fn_2472);
      let date_2473;
      try {
        t_2468 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        date_2473 = t_2468;
      } catch {
        date_2473 = panic_946();
      }
      let t_2474 = new SqlBuilder();
      t_2474.appendSafe("insert into t values (");
      t_2474.appendDate(date_2473);
      t_2474.appendSafe(")");
      const actual_2475 = t_2474.accumulated.toString();
      let t_2476 = actual_2475 === "insert into t values ('2024-12-25')";
      function fn_2477() {
        return 'expected stringExpr(`-work//src/`.sql, true, "insert into t values (", \\interpolate, date, ")").toString() == (' + "insert into t values ('2024-12-25')" + ") not (" + actual_2475 + ")";
      }
      test_2467.assert(t_2476, fn_2477);
      return;
    } finally {
      test_2467.softFailToHard();
    }
});
it("lists", function () {
    const test_2478 = new Test_949();
    try {
      let t_2479;
      let t_2480;
      let t_2481;
      let t_2482;
      let t_2483 = new SqlBuilder();
      t_2483.appendSafe("v IN (");
      t_2483.appendStringList(Object.freeze(["a", "b", "c'd"]));
      t_2483.appendSafe(")");
      const actual_2484 = t_2483.accumulated.toString();
      let t_2485 = actual_2484 === "v IN ('a', 'b', 'c''d')";
      function fn_2486() {
        return "expected stringExpr(`-work//src/`.sql, true, \"v IN (\", \\interpolate, list(\"a\", \"b\", \"c'd\"), \")\").toString() == (" + "v IN ('a', 'b', 'c''d')" + ") not (" + actual_2484 + ")";
      }
      test_2478.assert(t_2485, fn_2486);
      let t_2487 = new SqlBuilder();
      t_2487.appendSafe("v IN (");
      t_2487.appendInt32List(Object.freeze([1, 2, 3]));
      t_2487.appendSafe(")");
      const actual_2488 = t_2487.accumulated.toString();
      let t_2489 = actual_2488 === "v IN (1, 2, 3)";
      function fn_2490() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2, 3), ")").toString() == (' + "v IN (1, 2, 3)" + ") not (" + actual_2488 + ")";
      }
      test_2478.assert(t_2489, fn_2490);
      let t_2491 = new SqlBuilder();
      t_2491.appendSafe("v IN (");
      t_2491.appendInt64List(Object.freeze([BigInt("1"), BigInt("2")]));
      t_2491.appendSafe(")");
      const actual_2492 = t_2491.accumulated.toString();
      let t_2493 = actual_2492 === "v IN (1, 2)";
      function fn_2494() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1, 2), ")").toString() == (' + "v IN (1, 2)" + ") not (" + actual_2492 + ")";
      }
      test_2478.assert(t_2493, fn_2494);
      let t_2495 = new SqlBuilder();
      t_2495.appendSafe("v IN (");
      t_2495.appendFloat64List(Object.freeze([1.0, 2.0]));
      t_2495.appendSafe(")");
      const actual_2496 = t_2495.accumulated.toString();
      let t_2497 = actual_2496 === "v IN (1.0, 2.0)";
      function fn_2498() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(1.0, 2.0), ")").toString() == (' + "v IN (1.0, 2.0)" + ") not (" + actual_2496 + ")";
      }
      test_2478.assert(t_2497, fn_2498);
      let t_2499 = new SqlBuilder();
      t_2499.appendSafe("v IN (");
      t_2499.appendBooleanList(Object.freeze([true, false]));
      t_2499.appendSafe(")");
      const actual_2500 = t_2499.accumulated.toString();
      let t_2501 = actual_2500 === "v IN (TRUE, FALSE)";
      function fn_2502() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, list(true, false), ")").toString() == (' + "v IN (TRUE, FALSE)" + ") not (" + actual_2500 + ")";
      }
      test_2478.assert(t_2501, fn_2502);
      try {
        t_2479 = new (globalThis.Date)(globalThis.Date.UTC(2024, 1 - 1, 1));
        t_2480 = t_2479;
      } catch {
        t_2480 = panic_946();
      }
      try {
        t_2481 = new (globalThis.Date)(globalThis.Date.UTC(2024, 12 - 1, 25));
        t_2482 = t_2481;
      } catch {
        t_2482 = panic_946();
      }
      const dates_2503 = Object.freeze([t_2480, t_2482]);
      let t_2504 = new SqlBuilder();
      t_2504.appendSafe("v IN (");
      t_2504.appendDateList(dates_2503);
      t_2504.appendSafe(")");
      const actual_2505 = t_2504.accumulated.toString();
      let t_2506 = actual_2505 === "v IN ('2024-01-01', '2024-12-25')";
      function fn_2507() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v IN (", \\interpolate, dates, ")").toString() == (' + "v IN ('2024-01-01', '2024-12-25')" + ") not (" + actual_2505 + ")";
      }
      test_2478.assert(t_2506, fn_2507);
      return;
    } finally {
      test_2478.softFailToHard();
    }
});
it("SqlFloat64 NaN renders as NULL", function () {
    const test_2508 = new Test_949();
    try {
      let nan_2509;
      nan_2509 = 0.0 / 0.0;
      let t_2510 = new SqlBuilder();
      t_2510.appendSafe("v = ");
      t_2510.appendFloat64(nan_2509);
      const actual_2511 = t_2510.accumulated.toString();
      let t_2512 = actual_2511 === "v = NULL";
      function fn_2513() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, nan).toString() == (' + "v = NULL" + ") not (" + actual_2511 + ")";
      }
      test_2508.assert(t_2512, fn_2513);
      return;
    } finally {
      test_2508.softFailToHard();
    }
});
it("SqlFloat64 Infinity renders as NULL", function () {
    const test_2514 = new Test_949();
    try {
      let inf_2515;
      inf_2515 = 1.0 / 0.0;
      let t_2516 = new SqlBuilder();
      t_2516.appendSafe("v = ");
      t_2516.appendFloat64(inf_2515);
      const actual_2517 = t_2516.accumulated.toString();
      let t_2518 = actual_2517 === "v = NULL";
      function fn_2519() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, inf).toString() == (' + "v = NULL" + ") not (" + actual_2517 + ")";
      }
      test_2514.assert(t_2518, fn_2519);
      return;
    } finally {
      test_2514.softFailToHard();
    }
});
it("SqlFloat64 negative Infinity renders as NULL", function () {
    const test_2520 = new Test_949();
    try {
      let ninf_2521;
      ninf_2521 = -1.0 / 0.0;
      let t_2522 = new SqlBuilder();
      t_2522.appendSafe("v = ");
      t_2522.appendFloat64(ninf_2521);
      const actual_2523 = t_2522.accumulated.toString();
      let t_2524 = actual_2523 === "v = NULL";
      function fn_2525() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, ninf).toString() == (' + "v = NULL" + ") not (" + actual_2523 + ")";
      }
      test_2520.assert(t_2524, fn_2525);
      return;
    } finally {
      test_2520.softFailToHard();
    }
});
it("SqlFloat64 normal values still work", function () {
    const test_2526 = new Test_949();
    try {
      let t_2527 = new SqlBuilder();
      t_2527.appendSafe("v = ");
      t_2527.appendFloat64(3.14);
      const actual_2528 = t_2527.accumulated.toString();
      let t_2529 = actual_2528 === "v = 3.14";
      function fn_2530() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 3.14).toString() == (' + "v = 3.14" + ") not (" + actual_2528 + ")";
      }
      test_2526.assert(t_2529, fn_2530);
      let t_2531 = new SqlBuilder();
      t_2531.appendSafe("v = ");
      t_2531.appendFloat64(0.0);
      const actual_2532 = t_2531.accumulated.toString();
      let t_2533 = actual_2532 === "v = 0.0";
      function fn_2534() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, 0.0).toString() == (' + "v = 0.0" + ") not (" + actual_2532 + ")";
      }
      test_2526.assert(t_2533, fn_2534);
      let t_2535 = new SqlBuilder();
      t_2535.appendSafe("v = ");
      t_2535.appendFloat64(-42.5);
      const actual_2536 = t_2535.accumulated.toString();
      let t_2537 = actual_2536 === "v = -42.5";
      function fn_2538() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, -42.5).toString() == (' + "v = -42.5" + ") not (" + actual_2536 + ")";
      }
      test_2526.assert(t_2537, fn_2538);
      return;
    } finally {
      test_2526.softFailToHard();
    }
});
it("SqlDate renders with quotes", function () {
    const test_2539 = new Test_949();
    try {
      let t_2540;
      let d_2541;
      try {
        t_2540 = new (globalThis.Date)(globalThis.Date.UTC(2024, 6 - 1, 15));
        d_2541 = t_2540;
      } catch {
        d_2541 = panic_946();
      }
      let t_2542 = new SqlBuilder();
      t_2542.appendSafe("v = ");
      t_2542.appendDate(d_2541);
      const actual_2543 = t_2542.accumulated.toString();
      let t_2544 = actual_2543 === "v = '2024-06-15'";
      function fn_2545() {
        return 'expected stringExpr(`-work//src/`.sql, true, "v = ", \\interpolate, d).toString() == (' + "v = '2024-06-15'" + ") not (" + actual_2543 + ")";
      }
      test_2539.assert(t_2544, fn_2545);
      return;
    } finally {
      test_2539.softFailToHard();
    }
});
it("nesting", function () {
    const test_2546 = new Test_949();
    try {
      const name_2547 = "Someone";
      let t_2548 = new SqlBuilder();
      t_2548.appendSafe("where p.last_name = ");
      t_2548.appendString("Someone");
      const condition_2549 = t_2548.accumulated;
      let t_2550 = new SqlBuilder();
      t_2550.appendSafe("select p.id from person p ");
      t_2550.appendFragment(condition_2549);
      const actual_2551 = t_2550.accumulated.toString();
      let t_2552 = actual_2551 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2553() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2551 + ")";
      }
      test_2546.assert(t_2552, fn_2553);
      let t_2554 = new SqlBuilder();
      t_2554.appendSafe("select p.id from person p ");
      t_2554.appendPart(condition_2549.toSource());
      const actual_2555 = t_2554.accumulated.toString();
      let t_2556 = actual_2555 === "select p.id from person p where p.last_name = 'Someone'";
      function fn_2557() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select p.id from person p ", \\interpolate, condition.toSource()).toString() == (' + "select p.id from person p where p.last_name = 'Someone'" + ") not (" + actual_2555 + ")";
      }
      test_2546.assert(t_2556, fn_2557);
      const parts_2558 = Object.freeze([new SqlString("a'b"), new SqlInt32(3)]);
      let t_2559 = new SqlBuilder();
      t_2559.appendSafe("select ");
      t_2559.appendPartList(parts_2558);
      const actual_2560 = t_2559.accumulated.toString();
      let t_2561 = actual_2560 === "select 'a''b', 3";
      function fn_2562() {
        return 'expected stringExpr(`-work//src/`.sql, true, "select ", \\interpolate, parts).toString() == (' + "select 'a''b', 3" + ") not (" + actual_2560 + ")";
      }
      test_2546.assert(t_2561, fn_2562);
      return;
    } finally {
      test_2546.softFailToHard();
    }
});
