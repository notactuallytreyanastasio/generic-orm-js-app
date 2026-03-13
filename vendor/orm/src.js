import {
  type as type__6, mapBuilderConstructor as mapBuilderConstructor_43, mappedGetOr as mappedGetOr_49, mapBuilderSet as mapBuilderSet_51, mappedToMap as mappedToMap_52, listBuilderAdd as listBuilderAdd_68, listBuilderToList as listBuilderToList_69, stringCountBetween as stringCountBetween_84, stringToInt32 as stringToInt32_98, stringToInt64 as stringToInt64_111, stringToFloat64 as stringToFloat64_124, listedGet as listedGet_179, mappedToList as mappedToList_181, listedJoin as listedJoin_191, listBuilderAddAll as listBuilderAddAll_440, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_533, stringForEach as stringForEach_534, float64ToString as float64ToString_543, mapConstructor as mapConstructor_568, stringGet as stringGet_580, stringNext as stringNext_582, panic as panic_587, pairConstructor as pairConstructor_592
} from "@temperlang/core";
export class ChangesetError extends type__6() {
  /** @type {string} */
  #field_0;
  /** @type {string} */
  #message_1;
  /**
   * @param {{
   *   field: string, message: string
   * }}
   * props
   * @returns {ChangesetError}
   */
  static["new"](props) {
    return new ChangesetError(props.field, props.message);
  }
  /**
   * @param {string} field_2
   * @param {string} message_3
   */
  constructor(field_2, message_3) {
    super ();
    this.#field_0 = field_2;
    this.#message_1 = message_3;
    return;
  }
  /** @returns {string} */
  get field() {
    return this.#field_0;
  }
  /** @returns {string} */
  get message() {
    return this.#message_1;
  }
};
export class Changeset extends type__6() {
  /** @returns {TableDef} */
  get tableDef() {
    null;
  }
  /** @returns {Map<string, string>} */
  get changes() {
    null;
  }
  /** @returns {Array<ChangesetError>} */
  get errors() {
    null;
  }
  /** @returns {boolean} */
  get isValid() {
    null;
  }
  /**
   * @param {Array<SafeIdentifier>} allowedFields_12
   * @returns {Changeset}
   */
  cast(allowedFields_12) {
    null;
  }
  /**
   * @param {Array<SafeIdentifier>} fields_14
   * @returns {Changeset}
   */
  validateRequired(fields_14) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_16
   * @param {number} min_17
   * @param {number} max_18
   * @returns {Changeset}
   */
  validateLength(field_16, min_17, max_18) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_20
   * @returns {Changeset}
   */
  validateInt(field_20) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_22
   * @returns {Changeset}
   */
  validateInt64(field_22) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_24
   * @returns {Changeset}
   */
  validateFloat(field_24) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_26
   * @returns {Changeset}
   */
  validateBool(field_26) {
    null;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    null;
  }
  /**
   * @param {number} id_29
   * @returns {SqlFragment}
   */
  toUpdateSql(id_29) {
    null;
  }
};
class ChangesetImpl_30 extends type__6(Changeset) {
  /** @type {TableDef} */
  #_tableDef_31;
  /** @type {Map<string, string>} */
  #_params_32;
  /** @type {Map<string, string>} */
  #_changes_33;
  /** @type {Array<ChangesetError>} */
  #_errors_34;
  /** @type {boolean} */
  #_isValid_35;
  /** @returns {TableDef} */
  get tableDef() {
    return this.#_tableDef_31;
  }
  /** @returns {Map<string, string>} */
  get changes() {
    return this.#_changes_33;
  }
  /** @returns {Array<ChangesetError>} */
  get errors() {
    return this.#_errors_34;
  }
  /** @returns {boolean} */
  get isValid() {
    return this.#_isValid_35;
  }
  /**
   * @param {Array<SafeIdentifier>} allowedFields_41
   * @returns {Changeset}
   */
  cast(allowedFields_41) {
    const this50 = this;
    const mb_42 = mapBuilderConstructor_43();
    function fn_44(f_45) {
      let t_46;
      let t_47 = f_45.sqlValue;
      const val_48 = mappedGetOr_49(this50.#_params_32, t_47, "");
      if (! ! val_48) {
        t_46 = f_45.sqlValue;
        mapBuilderSet_51(mb_42, t_46, val_48);
      }
      return;
    }
    allowedFields_41.forEach(fn_44);
    return new ChangesetImpl_30(this.#_tableDef_31, this.#_params_32, mappedToMap_52(mb_42), this.#_errors_34, this.#_isValid_35);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_54
   * @returns {Changeset}
   */
  validateRequired(fields_54) {
    const this67 = this;
    let return_55;
    let t_56;
    let t_57;
    let t_58;
    let t_59;
    fn_60: {
      if (! this.#_isValid_35) {
        return_55 = this;
        break fn_60;
      }
      const eb_61 = this.#_errors_34.slice();
      let valid_62 = true;
      function fn_63(f_64) {
        let t_65;
        let t_66 = f_64.sqlValue;
        if (! this67.#_changes_33.has(t_66)) {
          t_65 = new ChangesetError(f_64.sqlValue, "is required");
          listBuilderAdd_68(eb_61, t_65);
          valid_62 = false;
        }
        return;
      }
      fields_54.forEach(fn_63);
      t_57 = this.#_tableDef_31;
      t_58 = this.#_params_32;
      t_59 = this.#_changes_33;
      t_56 = listBuilderToList_69(eb_61);
      return_55 = new ChangesetImpl_30(t_57, t_58, t_59, t_56, valid_62);
    }
    return return_55;
  }
  /**
   * @param {SafeIdentifier} field_71
   * @param {number} min_72
   * @param {number} max_73
   * @returns {Changeset}
   */
  validateLength(field_71, min_72, max_73) {
    let return_74;
    let t_75;
    let t_76;
    let t_77;
    let t_78;
    let t_79;
    let t_80;
    fn_81: {
      if (! this.#_isValid_35) {
        return_74 = this;
        break fn_81;
      }
      t_75 = field_71.sqlValue;
      const val_82 = mappedGetOr_49(this.#_changes_33, t_75, "");
      const len_83 = stringCountBetween_84(val_82, 0, val_82.length);
      if (len_83 < min_72) {
        t_77 = true;
      } else {
        t_77 = len_83 > max_73;
      }
      if (t_77) {
        const msg_85 = "must be between " + min_72.toString() + " and " + max_73.toString() + " characters";
        const eb_86 = this.#_errors_34.slice();
        listBuilderAdd_68(eb_86, new ChangesetError(field_71.sqlValue, msg_85));
        t_78 = this.#_tableDef_31;
        t_79 = this.#_params_32;
        t_80 = this.#_changes_33;
        t_76 = listBuilderToList_69(eb_86);
        return_74 = new ChangesetImpl_30(t_78, t_79, t_80, t_76, false);
        break fn_81;
      }
      return_74 = this;
    }
    return return_74;
  }
  /**
   * @param {SafeIdentifier} field_88
   * @returns {Changeset}
   */
  validateInt(field_88) {
    let return_89;
    let t_90;
    let t_91;
    let t_92;
    let t_93;
    let t_94;
    fn_95: {
      if (! this.#_isValid_35) {
        return_89 = this;
        break fn_95;
      }
      t_90 = field_88.sqlValue;
      const val_96 = mappedGetOr_49(this.#_changes_33, t_90, "");
      if (! val_96) {
        return_89 = this;
        break fn_95;
      }
      let parseOk_97;
      try {
        stringToInt32_98(val_96);
        parseOk_97 = true;
      } catch {
        parseOk_97 = false;
      }
      if (! parseOk_97) {
        const eb_99 = this.#_errors_34.slice();
        listBuilderAdd_68(eb_99, new ChangesetError(field_88.sqlValue, "must be an integer"));
        t_92 = this.#_tableDef_31;
        t_93 = this.#_params_32;
        t_94 = this.#_changes_33;
        t_91 = listBuilderToList_69(eb_99);
        return_89 = new ChangesetImpl_30(t_92, t_93, t_94, t_91, false);
        break fn_95;
      }
      return_89 = this;
    }
    return return_89;
  }
  /**
   * @param {SafeIdentifier} field_101
   * @returns {Changeset}
   */
  validateInt64(field_101) {
    let return_102;
    let t_103;
    let t_104;
    let t_105;
    let t_106;
    let t_107;
    fn_108: {
      if (! this.#_isValid_35) {
        return_102 = this;
        break fn_108;
      }
      t_103 = field_101.sqlValue;
      const val_109 = mappedGetOr_49(this.#_changes_33, t_103, "");
      if (! val_109) {
        return_102 = this;
        break fn_108;
      }
      let parseOk_110;
      try {
        stringToInt64_111(val_109);
        parseOk_110 = true;
      } catch {
        parseOk_110 = false;
      }
      if (! parseOk_110) {
        const eb_112 = this.#_errors_34.slice();
        listBuilderAdd_68(eb_112, new ChangesetError(field_101.sqlValue, "must be a 64-bit integer"));
        t_105 = this.#_tableDef_31;
        t_106 = this.#_params_32;
        t_107 = this.#_changes_33;
        t_104 = listBuilderToList_69(eb_112);
        return_102 = new ChangesetImpl_30(t_105, t_106, t_107, t_104, false);
        break fn_108;
      }
      return_102 = this;
    }
    return return_102;
  }
  /**
   * @param {SafeIdentifier} field_114
   * @returns {Changeset}
   */
  validateFloat(field_114) {
    let return_115;
    let t_116;
    let t_117;
    let t_118;
    let t_119;
    let t_120;
    fn_121: {
      if (! this.#_isValid_35) {
        return_115 = this;
        break fn_121;
      }
      t_116 = field_114.sqlValue;
      const val_122 = mappedGetOr_49(this.#_changes_33, t_116, "");
      if (! val_122) {
        return_115 = this;
        break fn_121;
      }
      let parseOk_123;
      try {
        stringToFloat64_124(val_122);
        parseOk_123 = true;
      } catch {
        parseOk_123 = false;
      }
      if (! parseOk_123) {
        const eb_125 = this.#_errors_34.slice();
        listBuilderAdd_68(eb_125, new ChangesetError(field_114.sqlValue, "must be a number"));
        t_118 = this.#_tableDef_31;
        t_119 = this.#_params_32;
        t_120 = this.#_changes_33;
        t_117 = listBuilderToList_69(eb_125);
        return_115 = new ChangesetImpl_30(t_118, t_119, t_120, t_117, false);
        break fn_121;
      }
      return_115 = this;
    }
    return return_115;
  }
  /**
   * @param {SafeIdentifier} field_127
   * @returns {Changeset}
   */
  validateBool(field_127) {
    let return_128;
    let t_129;
    let t_130;
    let t_131;
    let t_132;
    let t_133;
    let t_134;
    let t_135;
    let t_136;
    let t_137;
    let t_138;
    fn_139: {
      if (! this.#_isValid_35) {
        return_128 = this;
        break fn_139;
      }
      t_129 = field_127.sqlValue;
      const val_140 = mappedGetOr_49(this.#_changes_33, t_129, "");
      if (! val_140) {
        return_128 = this;
        break fn_139;
      }
      let isTrue_141;
      if (val_140 === "true") {
        isTrue_141 = true;
      } else {
        if (val_140 === "1") {
          t_132 = true;
        } else {
          if (val_140 === "yes") {
            t_131 = true;
          } else {
            t_131 = val_140 === "on";
          }
          t_132 = t_131;
        }
        isTrue_141 = t_132;
      }
      let isFalse_142;
      if (val_140 === "false") {
        isFalse_142 = true;
      } else {
        if (val_140 === "0") {
          t_134 = true;
        } else {
          if (val_140 === "no") {
            t_133 = true;
          } else {
            t_133 = val_140 === "off";
          }
          t_134 = t_133;
        }
        isFalse_142 = t_134;
      }
      if (! isTrue_141) {
        t_135 = ! isFalse_142;
      } else {
        t_135 = false;
      }
      if (t_135) {
        const eb_143 = this.#_errors_34.slice();
        listBuilderAdd_68(eb_143, new ChangesetError(field_127.sqlValue, "must be a boolean (true/false/1/0/yes/no/on/off)"));
        t_136 = this.#_tableDef_31;
        t_137 = this.#_params_32;
        t_138 = this.#_changes_33;
        t_130 = listBuilderToList_69(eb_143);
        return_128 = new ChangesetImpl_30(t_136, t_137, t_138, t_130, false);
        break fn_139;
      }
      return_128 = this;
    }
    return return_128;
  }
  /**
   * @param {string} val_146
   * @returns {SqlBoolean}
   */
  #parseBoolSqlPart_145(val_146) {
    let return_147;
    let t_148;
    let t_149;
    let t_150;
    let t_151;
    let t_152;
    let t_153;
    fn_154: {
      if (val_146 === "true") {
        t_150 = true;
      } else {
        if (val_146 === "1") {
          t_149 = true;
        } else {
          if (val_146 === "yes") {
            t_148 = true;
          } else {
            t_148 = val_146 === "on";
          }
          t_149 = t_148;
        }
        t_150 = t_149;
      }
      if (t_150) {
        return_147 = new SqlBoolean(true);
        break fn_154;
      }
      if (val_146 === "false") {
        t_153 = true;
      } else {
        if (val_146 === "0") {
          t_152 = true;
        } else {
          if (val_146 === "no") {
            t_151 = true;
          } else {
            t_151 = val_146 === "off";
          }
          t_152 = t_151;
        }
        t_153 = t_152;
      }
      if (t_153) {
        return_147 = new SqlBoolean(false);
        break fn_154;
      }
      throw Error();
    }
    return return_147;
  }
  /**
   * @param {FieldDef} fieldDef_157
   * @param {string} val_158
   * @returns {SqlPart}
   */
  #valueToSqlPart_156(fieldDef_157, val_158) {
    let return_159;
    let t_160;
    let t_161;
    let t_162;
    let t_163;
    fn_164: {
      const ft_165 = fieldDef_157.fieldType;
      if (ft_165 instanceof StringField) {
        return_159 = new SqlString(val_158);
        break fn_164;
      }
      if (ft_165 instanceof IntField) {
        t_160 = stringToInt32_98(val_158);
        return_159 = new SqlInt32(t_160);
        break fn_164;
      }
      if (ft_165 instanceof Int64Field) {
        t_161 = stringToInt64_111(val_158);
        return_159 = new SqlInt64(t_161);
        break fn_164;
      }
      if (ft_165 instanceof FloatField) {
        t_162 = stringToFloat64_124(val_158);
        return_159 = new SqlFloat64(t_162);
        break fn_164;
      }
      if (ft_165 instanceof BoolField) {
        return_159 = this.#parseBoolSqlPart_145(val_158);
        break fn_164;
      }
      if (ft_165 instanceof DateField) {
        t_163 = new (globalThis.Date)(globalThis.Date.parse(val_158));
        return_159 = new SqlDate(t_163);
        break fn_164;
      }
      throw Error();
    }
    return return_159;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    let t_167;
    let t_168;
    let t_169;
    let t_170;
    let t_171;
    let t_172;
    let t_173;
    let t_174;
    let t_175;
    let t_176;
    if (! this.#_isValid_35) {
      throw Error();
    }
    let i_177 = 0;
    while (true) {
      t_167 = this.#_tableDef_31.fields.length;
      if (!(i_177 < t_167)) {
        break;
      }
      const f_178 = listedGet_179(this.#_tableDef_31.fields, i_177);
      if (! f_178.nullable) {
        t_168 = f_178.name.sqlValue;
        t_169 = this.#_changes_33.has(t_168);
        t_174 = ! t_169;
      } else {
        t_174 = false;
      }
      if (t_174) {
        throw Error();
      }
      i_177 = i_177 + 1 | 0;
    }
    const pairs_180 = mappedToList_181(this.#_changes_33);
    if (pairs_180.length === 0) {
      throw Error();
    }
    const colNames_182 = [];
    const valParts_183 = [];
    let i_184 = 0;
    while (true) {
      t_170 = pairs_180.length;
      if (!(i_184 < t_170)) {
        break;
      }
      const pair_185 = listedGet_179(pairs_180, i_184);
      t_171 = pair_185.key;
      t_175 = this.#_tableDef_31.field(t_171);
      const fd_186 = t_175;
      listBuilderAdd_68(colNames_182, fd_186.name.sqlValue);
      t_172 = pair_185.value;
      t_176 = this.#valueToSqlPart_156(fd_186, t_172);
      listBuilderAdd_68(valParts_183, t_176);
      i_184 = i_184 + 1 | 0;
    }
    const b_187 = new SqlBuilder();
    b_187.appendSafe("INSERT INTO ");
    b_187.appendSafe(this.#_tableDef_31.tableName.sqlValue);
    b_187.appendSafe(" (");
    let t_188 = listBuilderToList_69(colNames_182);
    function fn_189(c_190) {
      return c_190;
    }
    b_187.appendSafe(listedJoin_191(t_188, ", ", fn_189));
    b_187.appendSafe(") VALUES (");
    b_187.appendPart(listedGet_179(valParts_183, 0));
    let j_192 = 1;
    while (true) {
      t_173 = valParts_183.length;
      if (!(j_192 < t_173)) {
        break;
      }
      b_187.appendSafe(", ");
      b_187.appendPart(listedGet_179(valParts_183, j_192));
      j_192 = j_192 + 1 | 0;
    }
    b_187.appendSafe(")");
    return b_187.accumulated;
  }
  /**
   * @param {number} id_194
   * @returns {SqlFragment}
   */
  toUpdateSql(id_194) {
    let t_195;
    let t_196;
    let t_197;
    let t_198;
    let t_199;
    if (! this.#_isValid_35) {
      throw Error();
    }
    const pairs_200 = mappedToList_181(this.#_changes_33);
    if (pairs_200.length === 0) {
      throw Error();
    }
    const b_201 = new SqlBuilder();
    b_201.appendSafe("UPDATE ");
    b_201.appendSafe(this.#_tableDef_31.tableName.sqlValue);
    b_201.appendSafe(" SET ");
    let i_202 = 0;
    while (true) {
      t_195 = pairs_200.length;
      if (!(i_202 < t_195)) {
        break;
      }
      if (i_202 > 0) {
        b_201.appendSafe(", ");
      }
      const pair_203 = listedGet_179(pairs_200, i_202);
      t_196 = pair_203.key;
      t_198 = this.#_tableDef_31.field(t_196);
      const fd_204 = t_198;
      b_201.appendSafe(fd_204.name.sqlValue);
      b_201.appendSafe(" = ");
      t_197 = pair_203.value;
      t_199 = this.#valueToSqlPart_156(fd_204, t_197);
      b_201.appendPart(t_199);
      i_202 = i_202 + 1 | 0;
    }
    b_201.appendSafe(" WHERE id = ");
    b_201.appendInt32(id_194);
    return b_201.accumulated;
  }
  /**
   * @param {{
   *   _tableDef: TableDef, _params: Map<string, string>, _changes: Map<string, string>, _errors: Array<ChangesetError>, _isValid: boolean
   * }}
   * props
   * @returns {ChangesetImpl_30}
   */
  static["new"](props) {
    return new ChangesetImpl_30(props._tableDef, props._params, props._changes, props._errors, props._isValid);
  }
  /**
   * @param {TableDef} _tableDef_205
   * @param {Map<string, string>} _params_206
   * @param {Map<string, string>} _changes_207
   * @param {Array<ChangesetError>} _errors_208
   * @param {boolean} _isValid_209
   */
  constructor(_tableDef_205, _params_206, _changes_207, _errors_208, _isValid_209) {
    super ();
    this.#_tableDef_31 = _tableDef_205;
    this.#_params_32 = _params_206;
    this.#_changes_33 = _changes_207;
    this.#_errors_34 = _errors_208;
    this.#_isValid_35 = _isValid_209;
    return;
  }
}
export class JoinType extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class InnerJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "INNER JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class LeftJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "LEFT JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class RightJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "RIGHT JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class FullJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "FULL OUTER JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class JoinClause extends type__6() {
  /** @type {JoinType} */
  #joinType_215;
  /** @type {SafeIdentifier} */
  #table_216;
  /** @type {SqlFragment} */
  #onCondition_217;
  /**
   * @param {{
   *   joinType: JoinType, table: SafeIdentifier, onCondition: SqlFragment
   * }}
   * props
   * @returns {JoinClause}
   */
  static["new"](props) {
    return new JoinClause(props.joinType, props.table, props.onCondition);
  }
  /**
   * @param {JoinType} joinType_218
   * @param {SafeIdentifier} table_219
   * @param {SqlFragment} onCondition_220
   */
  constructor(joinType_218, table_219, onCondition_220) {
    super ();
    this.#joinType_215 = joinType_218;
    this.#table_216 = table_219;
    this.#onCondition_217 = onCondition_220;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_215;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_216;
  }
  /** @returns {SqlFragment} */
  get onCondition() {
    return this.#onCondition_217;
  }
};
export class OrderClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_224;
  /** @type {boolean} */
  #ascending_225;
  /**
   * @param {{
   *   field: SafeIdentifier, ascending: boolean
   * }}
   * props
   * @returns {OrderClause}
   */
  static["new"](props) {
    return new OrderClause(props.field, props.ascending);
  }
  /**
   * @param {SafeIdentifier} field_226
   * @param {boolean} ascending_227
   */
  constructor(field_226, ascending_227) {
    super ();
    this.#field_224 = field_226;
    this.#ascending_225 = ascending_227;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_224;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_225;
  }
};
export class WhereClause extends type__6() {
  /** @returns {SqlFragment} */
  get condition() {
    null;
  }
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class AndCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_232;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_232;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_235 */
  constructor(_condition_235) {
    super ();
    this.#_condition_232 = _condition_235;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_236;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_236;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_239 */
  constructor(_condition_239) {
    super ();
    this.#_condition_236 = _condition_239;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_240;
  /** @type {Array<WhereClause>} */
  #conditions_241;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_242;
  /** @type {Array<OrderClause>} */
  #orderClauses_243;
  /** @type {number | null} */
  #limitVal_244;
  /** @type {number | null} */
  #offsetVal_245;
  /** @type {Array<JoinClause>} */
  #joinClauses_246;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_247;
  /** @type {Array<WhereClause>} */
  #havingConditions_248;
  /** @type {boolean} */
  #isDistinct_249;
  /** @type {Array<SqlFragment>} */
  #selectExprs_250;
  /**
   * @param {SqlFragment} condition_252
   * @returns {Query}
   */
  where(condition_252) {
    const nb_253 = this.#conditions_241.slice();
    listBuilderAdd_68(nb_253, new AndCondition(condition_252));
    return new Query(this.#tableName_240, listBuilderToList_69(nb_253), this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SqlFragment} condition_255
   * @returns {Query}
   */
  orWhere(condition_255) {
    const nb_256 = this.#conditions_241.slice();
    listBuilderAdd_68(nb_256, new OrCondition(condition_255));
    return new Query(this.#tableName_240, listBuilderToList_69(nb_256), this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SafeIdentifier} field_258
   * @returns {Query}
   */
  whereNull(field_258) {
    const b_259 = new SqlBuilder();
    b_259.appendSafe(field_258.sqlValue);
    b_259.appendSafe(" IS NULL");
    let t_260 = b_259.accumulated;
    return this.where(t_260);
  }
  /**
   * @param {SafeIdentifier} field_262
   * @returns {Query}
   */
  whereNotNull(field_262) {
    const b_263 = new SqlBuilder();
    b_263.appendSafe(field_262.sqlValue);
    b_263.appendSafe(" IS NOT NULL");
    let t_264 = b_263.accumulated;
    return this.where(t_264);
  }
  /**
   * @param {SafeIdentifier} field_266
   * @param {Array<SqlPart>} values_267
   * @returns {Query}
   */
  whereIn(field_266, values_267) {
    let return_268;
    let t_269;
    let t_270;
    let t_271;
    fn_272: {
      if (! values_267.length) {
        const b_273 = new SqlBuilder();
        b_273.appendSafe("1 = 0");
        t_269 = b_273.accumulated;
        return_268 = this.where(t_269);
        break fn_272;
      }
      const b_274 = new SqlBuilder();
      b_274.appendSafe(field_266.sqlValue);
      b_274.appendSafe(" IN (");
      b_274.appendPart(listedGet_179(values_267, 0));
      let i_275 = 1;
      while (true) {
        t_270 = values_267.length;
        if (!(i_275 < t_270)) {
          break;
        }
        b_274.appendSafe(", ");
        b_274.appendPart(listedGet_179(values_267, i_275));
        i_275 = i_275 + 1 | 0;
      }
      b_274.appendSafe(")");
      t_271 = b_274.accumulated;
      return_268 = this.where(t_271);
    }
    return return_268;
  }
  /**
   * @param {SqlFragment} condition_277
   * @returns {Query}
   */
  whereNot(condition_277) {
    const b_278 = new SqlBuilder();
    b_278.appendSafe("NOT (");
    b_278.appendFragment(condition_277);
    b_278.appendSafe(")");
    let t_279 = b_278.accumulated;
    return this.where(t_279);
  }
  /**
   * @param {SafeIdentifier} field_281
   * @param {SqlPart} low_282
   * @param {SqlPart} high_283
   * @returns {Query}
   */
  whereBetween(field_281, low_282, high_283) {
    const b_284 = new SqlBuilder();
    b_284.appendSafe(field_281.sqlValue);
    b_284.appendSafe(" BETWEEN ");
    b_284.appendPart(low_282);
    b_284.appendSafe(" AND ");
    b_284.appendPart(high_283);
    let t_285 = b_284.accumulated;
    return this.where(t_285);
  }
  /**
   * @param {SafeIdentifier} field_287
   * @param {string} pattern_288
   * @returns {Query}
   */
  whereLike(field_287, pattern_288) {
    const b_289 = new SqlBuilder();
    b_289.appendSafe(field_287.sqlValue);
    b_289.appendSafe(" LIKE ");
    b_289.appendString(pattern_288);
    let t_290 = b_289.accumulated;
    return this.where(t_290);
  }
  /**
   * @param {SafeIdentifier} field_292
   * @param {string} pattern_293
   * @returns {Query}
   */
  whereILike(field_292, pattern_293) {
    const b_294 = new SqlBuilder();
    b_294.appendSafe(field_292.sqlValue);
    b_294.appendSafe(" ILIKE ");
    b_294.appendString(pattern_293);
    let t_295 = b_294.accumulated;
    return this.where(t_295);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_297
   * @returns {Query}
   */
  select(fields_297) {
    return new Query(this.#tableName_240, this.#conditions_241, fields_297, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {Array<SqlFragment>} exprs_299
   * @returns {Query}
   */
  selectExpr(exprs_299) {
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, exprs_299);
  }
  /**
   * @param {SafeIdentifier} field_301
   * @param {boolean} ascending_302
   * @returns {Query}
   */
  orderBy(field_301, ascending_302) {
    const nb_303 = this.#orderClauses_243.slice();
    listBuilderAdd_68(nb_303, new OrderClause(field_301, ascending_302));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, listBuilderToList_69(nb_303), this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {number} n_305
   * @returns {Query}
   */
  limit(n_305) {
    if (n_305 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, n_305, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {number} n_307
   * @returns {Query}
   */
  offset(n_307) {
    if (n_307 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, n_307, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {JoinType} joinType_309
   * @param {SafeIdentifier} table_310
   * @param {SqlFragment} onCondition_311
   * @returns {Query}
   */
  join(joinType_309, table_310, onCondition_311) {
    const nb_312 = this.#joinClauses_246.slice();
    listBuilderAdd_68(nb_312, new JoinClause(joinType_309, table_310, onCondition_311));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, listBuilderToList_69(nb_312), this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SafeIdentifier} table_314
   * @param {SqlFragment} onCondition_315
   * @returns {Query}
   */
  innerJoin(table_314, onCondition_315) {
    let t_316 = new InnerJoin();
    return this.join(t_316, table_314, onCondition_315);
  }
  /**
   * @param {SafeIdentifier} table_318
   * @param {SqlFragment} onCondition_319
   * @returns {Query}
   */
  leftJoin(table_318, onCondition_319) {
    let t_320 = new LeftJoin();
    return this.join(t_320, table_318, onCondition_319);
  }
  /**
   * @param {SafeIdentifier} table_322
   * @param {SqlFragment} onCondition_323
   * @returns {Query}
   */
  rightJoin(table_322, onCondition_323) {
    let t_324 = new RightJoin();
    return this.join(t_324, table_322, onCondition_323);
  }
  /**
   * @param {SafeIdentifier} table_326
   * @param {SqlFragment} onCondition_327
   * @returns {Query}
   */
  fullJoin(table_326, onCondition_327) {
    let t_328 = new FullJoin();
    return this.join(t_328, table_326, onCondition_327);
  }
  /**
   * @param {SafeIdentifier} field_330
   * @returns {Query}
   */
  groupBy(field_330) {
    const nb_331 = this.#groupByFields_247.slice();
    listBuilderAdd_68(nb_331, field_330);
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, listBuilderToList_69(nb_331), this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SqlFragment} condition_333
   * @returns {Query}
   */
  having(condition_333) {
    const nb_334 = this.#havingConditions_248.slice();
    listBuilderAdd_68(nb_334, new AndCondition(condition_333));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, listBuilderToList_69(nb_334), this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SqlFragment} condition_336
   * @returns {Query}
   */
  orHaving(condition_336) {
    const nb_337 = this.#havingConditions_248.slice();
    listBuilderAdd_68(nb_337, new OrCondition(condition_336));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, listBuilderToList_69(nb_337), this.#isDistinct_249, this.#selectExprs_250);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, true, this.#selectExprs_250);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_340;
    let t_341;
    let t_342;
    const b_343 = new SqlBuilder();
    if (this.#isDistinct_249) {
      b_343.appendSafe("SELECT DISTINCT ");
    } else {
      b_343.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_250.length) {
      b_343.appendFragment(listedGet_179(this.#selectExprs_250, 0));
      let i_344 = 1;
      while (true) {
        t_340 = this.#selectExprs_250.length;
        if (!(i_344 < t_340)) {
          break;
        }
        b_343.appendSafe(", ");
        b_343.appendFragment(listedGet_179(this.#selectExprs_250, i_344));
        i_344 = i_344 + 1 | 0;
      }
    } else if (! this.#selectedFields_242.length) {
      b_343.appendSafe("*");
    } else {
      function fn_345(f_346) {
        return f_346.sqlValue;
      }
      b_343.appendSafe(listedJoin_191(this.#selectedFields_242, ", ", fn_345));
    }
    b_343.appendSafe(" FROM ");
    b_343.appendSafe(this.#tableName_240.sqlValue);
    function fn_347(jc_348) {
      b_343.appendSafe(" ");
      let t_349 = jc_348.joinType.keyword();
      b_343.appendSafe(t_349);
      b_343.appendSafe(" ");
      let t_350 = jc_348.table.sqlValue;
      b_343.appendSafe(t_350);
      b_343.appendSafe(" ON ");
      let t_351 = jc_348.onCondition;
      b_343.appendFragment(t_351);
      return;
    }
    this.#joinClauses_246.forEach(fn_347);
    if (! ! this.#conditions_241.length) {
      b_343.appendSafe(" WHERE ");
      b_343.appendFragment(listedGet_179(this.#conditions_241, 0).condition);
      let i_352 = 1;
      while (true) {
        t_341 = this.#conditions_241.length;
        if (!(i_352 < t_341)) {
          break;
        }
        b_343.appendSafe(" ");
        b_343.appendSafe(listedGet_179(this.#conditions_241, i_352).keyword());
        b_343.appendSafe(" ");
        b_343.appendFragment(listedGet_179(this.#conditions_241, i_352).condition);
        i_352 = i_352 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_247.length) {
      b_343.appendSafe(" GROUP BY ");
      function fn_353(f_354) {
        return f_354.sqlValue;
      }
      b_343.appendSafe(listedJoin_191(this.#groupByFields_247, ", ", fn_353));
    }
    if (! ! this.#havingConditions_248.length) {
      b_343.appendSafe(" HAVING ");
      b_343.appendFragment(listedGet_179(this.#havingConditions_248, 0).condition);
      let i_355 = 1;
      while (true) {
        t_342 = this.#havingConditions_248.length;
        if (!(i_355 < t_342)) {
          break;
        }
        b_343.appendSafe(" ");
        b_343.appendSafe(listedGet_179(this.#havingConditions_248, i_355).keyword());
        b_343.appendSafe(" ");
        b_343.appendFragment(listedGet_179(this.#havingConditions_248, i_355).condition);
        i_355 = i_355 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_243.length) {
      b_343.appendSafe(" ORDER BY ");
      let first_356 = true;
      function fn_357(oc_358) {
        let t_359;
        if (! first_356) {
          b_343.appendSafe(", ");
        }
        first_356 = false;
        let t_360 = oc_358.field.sqlValue;
        b_343.appendSafe(t_360);
        if (oc_358.ascending) {
          t_359 = " ASC";
        } else {
          t_359 = " DESC";
        }
        b_343.appendSafe(t_359);
        return;
      }
      this.#orderClauses_243.forEach(fn_357);
    }
    const lv_361 = this.#limitVal_244;
    if (!(lv_361 == null)) {
      const lv_362 = lv_361;
      b_343.appendSafe(" LIMIT ");
      b_343.appendInt32(lv_362);
    }
    const ov_363 = this.#offsetVal_245;
    if (!(ov_363 == null)) {
      const ov_364 = ov_363;
      b_343.appendSafe(" OFFSET ");
      b_343.appendInt32(ov_364);
    }
    return b_343.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    let t_366;
    let t_367;
    const b_368 = new SqlBuilder();
    b_368.appendSafe("SELECT COUNT(*) FROM ");
    b_368.appendSafe(this.#tableName_240.sqlValue);
    function fn_369(jc_370) {
      b_368.appendSafe(" ");
      let t_371 = jc_370.joinType.keyword();
      b_368.appendSafe(t_371);
      b_368.appendSafe(" ");
      let t_372 = jc_370.table.sqlValue;
      b_368.appendSafe(t_372);
      b_368.appendSafe(" ON ");
      let t_373 = jc_370.onCondition;
      b_368.appendFragment(t_373);
      return;
    }
    this.#joinClauses_246.forEach(fn_369);
    if (! ! this.#conditions_241.length) {
      b_368.appendSafe(" WHERE ");
      b_368.appendFragment(listedGet_179(this.#conditions_241, 0).condition);
      let i_374 = 1;
      while (true) {
        t_366 = this.#conditions_241.length;
        if (!(i_374 < t_366)) {
          break;
        }
        b_368.appendSafe(" ");
        b_368.appendSafe(listedGet_179(this.#conditions_241, i_374).keyword());
        b_368.appendSafe(" ");
        b_368.appendFragment(listedGet_179(this.#conditions_241, i_374).condition);
        i_374 = i_374 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_247.length) {
      b_368.appendSafe(" GROUP BY ");
      function fn_375(f_376) {
        return f_376.sqlValue;
      }
      b_368.appendSafe(listedJoin_191(this.#groupByFields_247, ", ", fn_375));
    }
    if (! ! this.#havingConditions_248.length) {
      b_368.appendSafe(" HAVING ");
      b_368.appendFragment(listedGet_179(this.#havingConditions_248, 0).condition);
      let i_377 = 1;
      while (true) {
        t_367 = this.#havingConditions_248.length;
        if (!(i_377 < t_367)) {
          break;
        }
        b_368.appendSafe(" ");
        b_368.appendSafe(listedGet_179(this.#havingConditions_248, i_377).keyword());
        b_368.appendSafe(" ");
        b_368.appendFragment(listedGet_179(this.#havingConditions_248, i_377).condition);
        i_377 = i_377 + 1 | 0;
      }
    }
    return b_368.accumulated;
  }
  /**
   * @param {number} defaultLimit_379
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_379) {
    let return_380;
    let t_381;
    if (defaultLimit_379 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_244 == null)) {
      return_380 = this.toSql();
    } else {
      t_381 = this.limit(defaultLimit_379);
      return_380 = t_381.toSql();
    }
    return return_380;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, selectedFields: Array<SafeIdentifier>, orderClauses: Array<OrderClause>, limitVal: number | null, offsetVal: number | null, joinClauses: Array<JoinClause>, groupByFields: Array<SafeIdentifier>, havingConditions: Array<WhereClause>, isDistinct: boolean, selectExprs: Array<SqlFragment>
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.tableName, props.conditions, props.selectedFields, props.orderClauses, props.limitVal, props.offsetVal, props.joinClauses, props.groupByFields, props.havingConditions, props.isDistinct, props.selectExprs);
  }
  /**
   * @param {SafeIdentifier} tableName_382
   * @param {Array<WhereClause>} conditions_383
   * @param {Array<SafeIdentifier>} selectedFields_384
   * @param {Array<OrderClause>} orderClauses_385
   * @param {number | null} limitVal_386
   * @param {number | null} offsetVal_387
   * @param {Array<JoinClause>} joinClauses_388
   * @param {Array<SafeIdentifier>} groupByFields_389
   * @param {Array<WhereClause>} havingConditions_390
   * @param {boolean} isDistinct_391
   * @param {Array<SqlFragment>} selectExprs_392
   */
  constructor(tableName_382, conditions_383, selectedFields_384, orderClauses_385, limitVal_386, offsetVal_387, joinClauses_388, groupByFields_389, havingConditions_390, isDistinct_391, selectExprs_392) {
    super ();
    this.#tableName_240 = tableName_382;
    this.#conditions_241 = conditions_383;
    this.#selectedFields_242 = selectedFields_384;
    this.#orderClauses_243 = orderClauses_385;
    this.#limitVal_244 = limitVal_386;
    this.#offsetVal_245 = offsetVal_387;
    this.#joinClauses_246 = joinClauses_388;
    this.#groupByFields_247 = groupByFields_389;
    this.#havingConditions_248 = havingConditions_390;
    this.#isDistinct_249 = isDistinct_391;
    this.#selectExprs_250 = selectExprs_392;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_240;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_241;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_242;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_243;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_244;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_245;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_246;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_247;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_248;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_249;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_250;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_405 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_406;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_406;
  }
  /** @param {string} _value_408 */
  constructor(_value_408) {
    super ();
    this.#_value_406 = _value_408;
    return;
  }
}
export class FieldType extends type__6() {
};
export class StringField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class IntField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class Int64Field extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class FloatField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class BoolField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class DateField extends type__6(FieldType) {
  constructor() {
    super ();
    return;
  }
};
export class FieldDef extends type__6() {
  /** @type {SafeIdentifier} */
  #name_409;
  /** @type {FieldType} */
  #fieldType_410;
  /** @type {boolean} */
  #nullable_411;
  /**
   * @param {{
   *   name: SafeIdentifier, fieldType: FieldType, nullable: boolean
   * }}
   * props
   * @returns {FieldDef}
   */
  static["new"](props) {
    return new FieldDef(props.name, props.fieldType, props.nullable);
  }
  /**
   * @param {SafeIdentifier} name_412
   * @param {FieldType} fieldType_413
   * @param {boolean} nullable_414
   */
  constructor(name_412, fieldType_413, nullable_414) {
    super ();
    this.#name_409 = name_412;
    this.#fieldType_410 = fieldType_413;
    this.#nullable_411 = nullable_414;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_409;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_410;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_411;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_418;
  /** @type {Array<FieldDef>} */
  #fields_419;
  /**
   * @param {string} name_421
   * @returns {FieldDef}
   */
  field(name_421) {
    let return_422;
    fn_423: {
      const this_424 = this.#fields_419;
      const n_425 = this_424.length;
      let i_426 = 0;
      while (i_426 < n_425) {
        const el_427 = listedGet_179(this_424, i_426);
        i_426 = i_426 + 1 | 0;
        const f_428 = el_427;
        if (f_428.name.sqlValue === name_421) {
          return_422 = f_428;
          break fn_423;
        }
      }
      throw Error();
    }
    return return_422;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, fields: Array<FieldDef>
   * }}
   * props
   * @returns {TableDef}
   */
  static["new"](props) {
    return new TableDef(props.tableName, props.fields);
  }
  /**
   * @param {SafeIdentifier} tableName_429
   * @param {Array<FieldDef>} fields_430
   */
  constructor(tableName_429, fields_430) {
    super ();
    this.#tableName_418 = tableName_429;
    this.#fields_419 = fields_430;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_418;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_419;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_433;
  /** @param {string} sqlSource_435 */
  appendSafe(sqlSource_435) {
    let t_436 = new SqlSource(sqlSource_435);
    listBuilderAdd_68(this.#buffer_433, t_436);
    return;
  }
  /** @param {SqlFragment} fragment_438 */
  appendFragment(fragment_438) {
    let t_439 = fragment_438.parts;
    listBuilderAddAll_440(this.#buffer_433, t_439);
    return;
  }
  /** @param {SqlPart} part_442 */
  appendPart(part_442) {
    listBuilderAdd_68(this.#buffer_433, part_442);
    return;
  }
  /** @param {Array<SqlPart>} values_444 */
  appendPartList(values_444) {
    const this447 = this;
    function fn_445(x_446) {
      this447.appendPart(x_446);
      return;
    }
    this.#appendList_448(values_444, fn_445);
    return;
  }
  /** @param {boolean} value_450 */
  appendBoolean(value_450) {
    let t_451 = new SqlBoolean(value_450);
    listBuilderAdd_68(this.#buffer_433, t_451);
    return;
  }
  /** @param {Array<boolean>} values_453 */
  appendBooleanList(values_453) {
    const this456 = this;
    function fn_454(x_455) {
      this456.appendBoolean(x_455);
      return;
    }
    this.#appendList_448(values_453, fn_454);
    return;
  }
  /** @param {globalThis.Date} value_458 */
  appendDate(value_458) {
    let t_459 = new SqlDate(value_458);
    listBuilderAdd_68(this.#buffer_433, t_459);
    return;
  }
  /** @param {Array<globalThis.Date>} values_461 */
  appendDateList(values_461) {
    const this464 = this;
    function fn_462(x_463) {
      this464.appendDate(x_463);
      return;
    }
    this.#appendList_448(values_461, fn_462);
    return;
  }
  /** @param {number} value_466 */
  appendFloat64(value_466) {
    let t_467 = new SqlFloat64(value_466);
    listBuilderAdd_68(this.#buffer_433, t_467);
    return;
  }
  /** @param {Array<number>} values_469 */
  appendFloat64List(values_469) {
    const this472 = this;
    function fn_470(x_471) {
      this472.appendFloat64(x_471);
      return;
    }
    this.#appendList_448(values_469, fn_470);
    return;
  }
  /** @param {number} value_474 */
  appendInt32(value_474) {
    let t_475 = new SqlInt32(value_474);
    listBuilderAdd_68(this.#buffer_433, t_475);
    return;
  }
  /** @param {Array<number>} values_477 */
  appendInt32List(values_477) {
    const this480 = this;
    function fn_478(x_479) {
      this480.appendInt32(x_479);
      return;
    }
    this.#appendList_448(values_477, fn_478);
    return;
  }
  /** @param {bigint} value_482 */
  appendInt64(value_482) {
    let t_483 = new SqlInt64(value_482);
    listBuilderAdd_68(this.#buffer_433, t_483);
    return;
  }
  /** @param {Array<bigint>} values_485 */
  appendInt64List(values_485) {
    const this488 = this;
    function fn_486(x_487) {
      this488.appendInt64(x_487);
      return;
    }
    this.#appendList_448(values_485, fn_486);
    return;
  }
  /** @param {string} value_490 */
  appendString(value_490) {
    let t_491 = new SqlString(value_490);
    listBuilderAdd_68(this.#buffer_433, t_491);
    return;
  }
  /** @param {Array<string>} values_493 */
  appendStringList(values_493) {
    const this496 = this;
    function fn_494(x_495) {
      this496.appendString(x_495);
      return;
    }
    this.#appendList_448(values_493, fn_494);
    return;
  }
  /**
   * @template {unknown} T_503
   * @param {Array<T_503>} values_498
   * @param {(arg0: T_503) => void} appendValue_499
   */
  #appendList_448(values_498, appendValue_499) {
    let t_500;
    let t_501;
    let i_502 = 0;
    while (true) {
      t_500 = values_498.length;
      if (!(i_502 < t_500)) {
        break;
      }
      if (i_502 > 0) {
        this.appendSafe(", ");
      }
      t_501 = listedGet_179(values_498, i_502);
      appendValue_499(t_501);
      i_502 = i_502 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_69(this.#buffer_433));
  }
  constructor() {
    super ();
    let t_505 = [];
    this.#buffer_433 = t_505;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_506;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_509;
    const builder_510 = [""];
    let i_511 = 0;
    while (true) {
      t_509 = this.#parts_506.length;
      if (!(i_511 < t_509)) {
        break;
      }
      listedGet_179(this.#parts_506, i_511).formatTo(builder_510);
      i_511 = i_511 + 1 | 0;
    }
    return builder_510[0];
  }
  /** @param {Array<SqlPart>} parts_512 */
  constructor(parts_512) {
    super ();
    this.#parts_506 = parts_512;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_506;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_515 */
  formatTo(builder_515) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_516;
  /** @param {globalThis.Array<string>} builder_518 */
  formatTo(builder_518) {
    builder_518[0] += this.#source_516;
    return;
  }
  /** @param {string} source_519 */
  constructor(source_519) {
    super ();
    this.#source_516 = source_519;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_516;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_521;
  /** @param {globalThis.Array<string>} builder_523 */
  formatTo(builder_523) {
    let t_524;
    if (this.#value_521) {
      t_524 = "TRUE";
    } else {
      t_524 = "FALSE";
    }
    builder_523[0] += t_524;
    return;
  }
  /** @param {boolean} value_525 */
  constructor(value_525) {
    super ();
    this.#value_521 = value_525;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_521;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_527;
  /** @param {globalThis.Array<string>} builder_529 */
  formatTo(builder_529) {
    builder_529[0] += "'";
    let t_530 = this.#value_527.toISOString().split("T")[0];
    function fn_531(c_532) {
      if (c_532 === 39) {
        builder_529[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_533(builder_529, c_532);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_534(t_530, fn_531);
    builder_529[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_535 */
  constructor(value_535) {
    super ();
    this.#value_527 = value_535;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_527;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_537;
  /** @param {globalThis.Array<string>} builder_539 */
  formatTo(builder_539) {
    let t_540;
    let t_541;
    const s_542 = float64ToString_543(this.#value_537);
    if (s_542 === "NaN") {
      t_541 = true;
    } else {
      if (s_542 === "Infinity") {
        t_540 = true;
      } else {
        t_540 = s_542 === "-Infinity";
      }
      t_541 = t_540;
    }
    if (t_541) {
      builder_539[0] += "NULL";
    } else {
      builder_539[0] += s_542;
    }
    return;
  }
  /** @param {number} value_544 */
  constructor(value_544) {
    super ();
    this.#value_537 = value_544;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_537;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_546;
  /** @param {globalThis.Array<string>} builder_548 */
  formatTo(builder_548) {
    let t_549 = this.#value_546.toString();
    builder_548[0] += t_549;
    return;
  }
  /** @param {number} value_550 */
  constructor(value_550) {
    super ();
    this.#value_546 = value_550;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_546;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_552;
  /** @param {globalThis.Array<string>} builder_554 */
  formatTo(builder_554) {
    let t_555 = this.#value_552.toString();
    builder_554[0] += t_555;
    return;
  }
  /** @param {bigint} value_556 */
  constructor(value_556) {
    super ();
    this.#value_552 = value_556;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_552;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_558;
  /** @param {globalThis.Array<string>} builder_560 */
  formatTo(builder_560) {
    builder_560[0] += "'";
    function fn_561(c_562) {
      if (c_562 === 39) {
        builder_560[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_533(builder_560, c_562);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_534(this.#value_558, fn_561);
    builder_560[0] += "'";
    return;
  }
  /** @param {string} value_563 */
  constructor(value_563) {
    super ();
    this.#value_558 = value_563;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_558;
  }
};
/**
 * @param {TableDef} tableDef_565
 * @param {Map<string, string>} params_566
 * @returns {Changeset}
 */
export function changeset(tableDef_565, params_566) {
  let t_567 = mapConstructor_568(Object.freeze([]));
  return new ChangesetImpl_30(tableDef_565, params_566, t_567, Object.freeze([]), true);
};
/**
 * @param {number} c_570
 * @returns {boolean}
 */
function isIdentStart_569(c_570) {
  let return_571;
  let t_572;
  let t_573;
  if (c_570 >= 97) {
    t_572 = c_570 <= 122;
  } else {
    t_572 = false;
  }
  if (t_572) {
    return_571 = true;
  } else {
    if (c_570 >= 65) {
      t_573 = c_570 <= 90;
    } else {
      t_573 = false;
    }
    if (t_573) {
      return_571 = true;
    } else {
      return_571 = c_570 === 95;
    }
  }
  return return_571;
}
/**
 * @param {number} c_575
 * @returns {boolean}
 */
function isIdentPart_574(c_575) {
  let return_576;
  if (isIdentStart_569(c_575)) {
    return_576 = true;
  } else if (c_575 >= 48) {
    return_576 = c_575 <= 57;
  } else {
    return_576 = false;
  }
  return return_576;
}
/**
 * @param {string} name_577
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_577) {
  let t_578;
  if (! name_577) {
    throw Error();
  }
  let idx_579 = 0;
  if (! isIdentStart_569(stringGet_580(name_577, idx_579))) {
    throw Error();
  }
  let t_581 = stringNext_582(name_577, idx_579);
  idx_579 = t_581;
  while (true) {
    if (!(name_577.length > idx_579)) {
      break;
    }
    if (! isIdentPart_574(stringGet_580(name_577, idx_579))) {
      throw Error();
    }
    t_578 = stringNext_582(name_577, idx_579);
    idx_579 = t_578;
  }
  return new ValidatedIdentifier_405(name_577);
};
/**
 * @param {TableDef} tableDef_796
 * @param {number} id_797
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_796, id_797) {
  const b_798 = new SqlBuilder();
  b_798.appendSafe("DELETE FROM ");
  b_798.appendSafe(tableDef_796.tableName.sqlValue);
  b_798.appendSafe(" WHERE id = ");
  b_798.appendInt32(id_797);
  return b_798.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_799
 * @returns {Query}
 */
export function from(tableName_799) {
  return new Query(tableName_799, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]));
};
/**
 * @param {SafeIdentifier} table_800
 * @param {SafeIdentifier} column_801
 * @returns {SqlFragment}
 */
export function col(table_800, column_801) {
  const b_802 = new SqlBuilder();
  b_802.appendSafe(table_800.sqlValue);
  b_802.appendSafe(".");
  b_802.appendSafe(column_801.sqlValue);
  return b_802.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_803 = new SqlBuilder();
  b_803.appendSafe("COUNT(*)");
  return b_803.accumulated;
};
/**
 * @param {SafeIdentifier} field_804
 * @returns {SqlFragment}
 */
export function countCol(field_804) {
  const b_805 = new SqlBuilder();
  b_805.appendSafe("COUNT(");
  b_805.appendSafe(field_804.sqlValue);
  b_805.appendSafe(")");
  return b_805.accumulated;
};
/**
 * @param {SafeIdentifier} field_806
 * @returns {SqlFragment}
 */
export function sumCol(field_806) {
  const b_807 = new SqlBuilder();
  b_807.appendSafe("SUM(");
  b_807.appendSafe(field_806.sqlValue);
  b_807.appendSafe(")");
  return b_807.accumulated;
};
/**
 * @param {SafeIdentifier} field_808
 * @returns {SqlFragment}
 */
export function avgCol(field_808) {
  const b_809 = new SqlBuilder();
  b_809.appendSafe("AVG(");
  b_809.appendSafe(field_808.sqlValue);
  b_809.appendSafe(")");
  return b_809.accumulated;
};
/**
 * @param {SafeIdentifier} field_810
 * @returns {SqlFragment}
 */
export function minCol(field_810) {
  const b_811 = new SqlBuilder();
  b_811.appendSafe("MIN(");
  b_811.appendSafe(field_810.sqlValue);
  b_811.appendSafe(")");
  return b_811.accumulated;
};
/**
 * @param {SafeIdentifier} field_812
 * @returns {SqlFragment}
 */
export function maxCol(field_812) {
  const b_813 = new SqlBuilder();
  b_813.appendSafe("MAX(");
  b_813.appendSafe(field_812.sqlValue);
  b_813.appendSafe(")");
  return b_813.accumulated;
};
