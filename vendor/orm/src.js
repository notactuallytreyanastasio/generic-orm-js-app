import {
  type as type__6, mapBuilderConstructor as mapBuilderConstructor_43, mappedGetOr as mappedGetOr_49, mapBuilderSet as mapBuilderSet_51, mappedToMap as mappedToMap_52, listBuilderAdd as listBuilderAdd_68, listBuilderToList as listBuilderToList_69, stringCountBetween as stringCountBetween_84, stringToInt32 as stringToInt32_98, stringToInt64 as stringToInt64_111, stringToFloat64 as stringToFloat64_124, listedGet as listedGet_179, mappedToList as mappedToList_181, listedJoin as listedJoin_191, listBuilderAddAll as listBuilderAddAll_345, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_438, stringForEach as stringForEach_439, float64ToString as float64ToString_448, mapConstructor as mapConstructor_473, stringGet as stringGet_485, stringNext as stringNext_487, panic as panic_492, pairConstructor as pairConstructor_497
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
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_230;
  /** @type {Array<SqlFragment>} */
  #conditions_231;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_232;
  /** @type {Array<OrderClause>} */
  #orderClauses_233;
  /** @type {number | null} */
  #limitVal_234;
  /** @type {number | null} */
  #offsetVal_235;
  /** @type {Array<JoinClause>} */
  #joinClauses_236;
  /**
   * @param {SqlFragment} condition_238
   * @returns {Query}
   */
  where(condition_238) {
    const nb_239 = this.#conditions_231.slice();
    listBuilderAdd_68(nb_239, condition_238);
    return new Query(this.#tableName_230, listBuilderToList_69(nb_239), this.#selectedFields_232, this.#orderClauses_233, this.#limitVal_234, this.#offsetVal_235, this.#joinClauses_236);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_241
   * @returns {Query}
   */
  select(fields_241) {
    return new Query(this.#tableName_230, this.#conditions_231, fields_241, this.#orderClauses_233, this.#limitVal_234, this.#offsetVal_235, this.#joinClauses_236);
  }
  /**
   * @param {SafeIdentifier} field_243
   * @param {boolean} ascending_244
   * @returns {Query}
   */
  orderBy(field_243, ascending_244) {
    const nb_245 = this.#orderClauses_233.slice();
    listBuilderAdd_68(nb_245, new OrderClause(field_243, ascending_244));
    return new Query(this.#tableName_230, this.#conditions_231, this.#selectedFields_232, listBuilderToList_69(nb_245), this.#limitVal_234, this.#offsetVal_235, this.#joinClauses_236);
  }
  /**
   * @param {number} n_247
   * @returns {Query}
   */
  limit(n_247) {
    if (n_247 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_230, this.#conditions_231, this.#selectedFields_232, this.#orderClauses_233, n_247, this.#offsetVal_235, this.#joinClauses_236);
  }
  /**
   * @param {number} n_249
   * @returns {Query}
   */
  offset(n_249) {
    if (n_249 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_230, this.#conditions_231, this.#selectedFields_232, this.#orderClauses_233, this.#limitVal_234, n_249, this.#joinClauses_236);
  }
  /**
   * @param {JoinType} joinType_251
   * @param {SafeIdentifier} table_252
   * @param {SqlFragment} onCondition_253
   * @returns {Query}
   */
  join(joinType_251, table_252, onCondition_253) {
    const nb_254 = this.#joinClauses_236.slice();
    listBuilderAdd_68(nb_254, new JoinClause(joinType_251, table_252, onCondition_253));
    return new Query(this.#tableName_230, this.#conditions_231, this.#selectedFields_232, this.#orderClauses_233, this.#limitVal_234, this.#offsetVal_235, listBuilderToList_69(nb_254));
  }
  /**
   * @param {SafeIdentifier} table_256
   * @param {SqlFragment} onCondition_257
   * @returns {Query}
   */
  innerJoin(table_256, onCondition_257) {
    let t_258 = new InnerJoin();
    return this.join(t_258, table_256, onCondition_257);
  }
  /**
   * @param {SafeIdentifier} table_260
   * @param {SqlFragment} onCondition_261
   * @returns {Query}
   */
  leftJoin(table_260, onCondition_261) {
    let t_262 = new LeftJoin();
    return this.join(t_262, table_260, onCondition_261);
  }
  /**
   * @param {SafeIdentifier} table_264
   * @param {SqlFragment} onCondition_265
   * @returns {Query}
   */
  rightJoin(table_264, onCondition_265) {
    let t_266 = new RightJoin();
    return this.join(t_266, table_264, onCondition_265);
  }
  /**
   * @param {SafeIdentifier} table_268
   * @param {SqlFragment} onCondition_269
   * @returns {Query}
   */
  fullJoin(table_268, onCondition_269) {
    let t_270 = new FullJoin();
    return this.join(t_270, table_268, onCondition_269);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_272;
    const b_273 = new SqlBuilder();
    b_273.appendSafe("SELECT ");
    if (! this.#selectedFields_232.length) {
      b_273.appendSafe("*");
    } else {
      function fn_274(f_275) {
        return f_275.sqlValue;
      }
      b_273.appendSafe(listedJoin_191(this.#selectedFields_232, ", ", fn_274));
    }
    b_273.appendSafe(" FROM ");
    b_273.appendSafe(this.#tableName_230.sqlValue);
    function fn_276(jc_277) {
      b_273.appendSafe(" ");
      let t_278 = jc_277.joinType.keyword();
      b_273.appendSafe(t_278);
      b_273.appendSafe(" ");
      let t_279 = jc_277.table.sqlValue;
      b_273.appendSafe(t_279);
      b_273.appendSafe(" ON ");
      let t_280 = jc_277.onCondition;
      b_273.appendFragment(t_280);
      return;
    }
    this.#joinClauses_236.forEach(fn_276);
    if (! ! this.#conditions_231.length) {
      b_273.appendSafe(" WHERE ");
      b_273.appendFragment(listedGet_179(this.#conditions_231, 0));
      let i_281 = 1;
      while (true) {
        t_272 = this.#conditions_231.length;
        if (!(i_281 < t_272)) {
          break;
        }
        b_273.appendSafe(" AND ");
        b_273.appendFragment(listedGet_179(this.#conditions_231, i_281));
        i_281 = i_281 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_233.length) {
      b_273.appendSafe(" ORDER BY ");
      let first_282 = true;
      function fn_283(oc_284) {
        let t_285;
        if (! first_282) {
          b_273.appendSafe(", ");
        }
        first_282 = false;
        let t_286 = oc_284.field.sqlValue;
        b_273.appendSafe(t_286);
        if (oc_284.ascending) {
          t_285 = " ASC";
        } else {
          t_285 = " DESC";
        }
        b_273.appendSafe(t_285);
        return;
      }
      this.#orderClauses_233.forEach(fn_283);
    }
    const lv_287 = this.#limitVal_234;
    if (!(lv_287 == null)) {
      const lv_288 = lv_287;
      b_273.appendSafe(" LIMIT ");
      b_273.appendInt32(lv_288);
    }
    const ov_289 = this.#offsetVal_235;
    if (!(ov_289 == null)) {
      const ov_290 = ov_289;
      b_273.appendSafe(" OFFSET ");
      b_273.appendInt32(ov_290);
    }
    return b_273.accumulated;
  }
  /**
   * @param {number} defaultLimit_292
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_292) {
    let return_293;
    let t_294;
    if (defaultLimit_292 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_234 == null)) {
      return_293 = this.toSql();
    } else {
      t_294 = this.limit(defaultLimit_292);
      return_293 = t_294.toSql();
    }
    return return_293;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<SqlFragment>, selectedFields: Array<SafeIdentifier>, orderClauses: Array<OrderClause>, limitVal: number | null, offsetVal: number | null, joinClauses: Array<JoinClause>
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.tableName, props.conditions, props.selectedFields, props.orderClauses, props.limitVal, props.offsetVal, props.joinClauses);
  }
  /**
   * @param {SafeIdentifier} tableName_295
   * @param {Array<SqlFragment>} conditions_296
   * @param {Array<SafeIdentifier>} selectedFields_297
   * @param {Array<OrderClause>} orderClauses_298
   * @param {number | null} limitVal_299
   * @param {number | null} offsetVal_300
   * @param {Array<JoinClause>} joinClauses_301
   */
  constructor(tableName_295, conditions_296, selectedFields_297, orderClauses_298, limitVal_299, offsetVal_300, joinClauses_301) {
    super ();
    this.#tableName_230 = tableName_295;
    this.#conditions_231 = conditions_296;
    this.#selectedFields_232 = selectedFields_297;
    this.#orderClauses_233 = orderClauses_298;
    this.#limitVal_234 = limitVal_299;
    this.#offsetVal_235 = offsetVal_300;
    this.#joinClauses_236 = joinClauses_301;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_230;
  }
  /** @returns {Array<SqlFragment>} */
  get conditions() {
    return this.#conditions_231;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_232;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_233;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_234;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_235;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_236;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_310 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_311;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_311;
  }
  /** @param {string} _value_313 */
  constructor(_value_313) {
    super ();
    this.#_value_311 = _value_313;
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
  #name_314;
  /** @type {FieldType} */
  #fieldType_315;
  /** @type {boolean} */
  #nullable_316;
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
   * @param {SafeIdentifier} name_317
   * @param {FieldType} fieldType_318
   * @param {boolean} nullable_319
   */
  constructor(name_317, fieldType_318, nullable_319) {
    super ();
    this.#name_314 = name_317;
    this.#fieldType_315 = fieldType_318;
    this.#nullable_316 = nullable_319;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_314;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_315;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_316;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_323;
  /** @type {Array<FieldDef>} */
  #fields_324;
  /**
   * @param {string} name_326
   * @returns {FieldDef}
   */
  field(name_326) {
    let return_327;
    fn_328: {
      const this_329 = this.#fields_324;
      const n_330 = this_329.length;
      let i_331 = 0;
      while (i_331 < n_330) {
        const el_332 = listedGet_179(this_329, i_331);
        i_331 = i_331 + 1 | 0;
        const f_333 = el_332;
        if (f_333.name.sqlValue === name_326) {
          return_327 = f_333;
          break fn_328;
        }
      }
      throw Error();
    }
    return return_327;
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
   * @param {SafeIdentifier} tableName_334
   * @param {Array<FieldDef>} fields_335
   */
  constructor(tableName_334, fields_335) {
    super ();
    this.#tableName_323 = tableName_334;
    this.#fields_324 = fields_335;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_323;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_324;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_338;
  /** @param {string} sqlSource_340 */
  appendSafe(sqlSource_340) {
    let t_341 = new SqlSource(sqlSource_340);
    listBuilderAdd_68(this.#buffer_338, t_341);
    return;
  }
  /** @param {SqlFragment} fragment_343 */
  appendFragment(fragment_343) {
    let t_344 = fragment_343.parts;
    listBuilderAddAll_345(this.#buffer_338, t_344);
    return;
  }
  /** @param {SqlPart} part_347 */
  appendPart(part_347) {
    listBuilderAdd_68(this.#buffer_338, part_347);
    return;
  }
  /** @param {Array<SqlPart>} values_349 */
  appendPartList(values_349) {
    const this352 = this;
    function fn_350(x_351) {
      this352.appendPart(x_351);
      return;
    }
    this.#appendList_353(values_349, fn_350);
    return;
  }
  /** @param {boolean} value_355 */
  appendBoolean(value_355) {
    let t_356 = new SqlBoolean(value_355);
    listBuilderAdd_68(this.#buffer_338, t_356);
    return;
  }
  /** @param {Array<boolean>} values_358 */
  appendBooleanList(values_358) {
    const this361 = this;
    function fn_359(x_360) {
      this361.appendBoolean(x_360);
      return;
    }
    this.#appendList_353(values_358, fn_359);
    return;
  }
  /** @param {globalThis.Date} value_363 */
  appendDate(value_363) {
    let t_364 = new SqlDate(value_363);
    listBuilderAdd_68(this.#buffer_338, t_364);
    return;
  }
  /** @param {Array<globalThis.Date>} values_366 */
  appendDateList(values_366) {
    const this369 = this;
    function fn_367(x_368) {
      this369.appendDate(x_368);
      return;
    }
    this.#appendList_353(values_366, fn_367);
    return;
  }
  /** @param {number} value_371 */
  appendFloat64(value_371) {
    let t_372 = new SqlFloat64(value_371);
    listBuilderAdd_68(this.#buffer_338, t_372);
    return;
  }
  /** @param {Array<number>} values_374 */
  appendFloat64List(values_374) {
    const this377 = this;
    function fn_375(x_376) {
      this377.appendFloat64(x_376);
      return;
    }
    this.#appendList_353(values_374, fn_375);
    return;
  }
  /** @param {number} value_379 */
  appendInt32(value_379) {
    let t_380 = new SqlInt32(value_379);
    listBuilderAdd_68(this.#buffer_338, t_380);
    return;
  }
  /** @param {Array<number>} values_382 */
  appendInt32List(values_382) {
    const this385 = this;
    function fn_383(x_384) {
      this385.appendInt32(x_384);
      return;
    }
    this.#appendList_353(values_382, fn_383);
    return;
  }
  /** @param {bigint} value_387 */
  appendInt64(value_387) {
    let t_388 = new SqlInt64(value_387);
    listBuilderAdd_68(this.#buffer_338, t_388);
    return;
  }
  /** @param {Array<bigint>} values_390 */
  appendInt64List(values_390) {
    const this393 = this;
    function fn_391(x_392) {
      this393.appendInt64(x_392);
      return;
    }
    this.#appendList_353(values_390, fn_391);
    return;
  }
  /** @param {string} value_395 */
  appendString(value_395) {
    let t_396 = new SqlString(value_395);
    listBuilderAdd_68(this.#buffer_338, t_396);
    return;
  }
  /** @param {Array<string>} values_398 */
  appendStringList(values_398) {
    const this401 = this;
    function fn_399(x_400) {
      this401.appendString(x_400);
      return;
    }
    this.#appendList_353(values_398, fn_399);
    return;
  }
  /**
   * @template {unknown} T_408
   * @param {Array<T_408>} values_403
   * @param {(arg0: T_408) => void} appendValue_404
   */
  #appendList_353(values_403, appendValue_404) {
    let t_405;
    let t_406;
    let i_407 = 0;
    while (true) {
      t_405 = values_403.length;
      if (!(i_407 < t_405)) {
        break;
      }
      if (i_407 > 0) {
        this.appendSafe(", ");
      }
      t_406 = listedGet_179(values_403, i_407);
      appendValue_404(t_406);
      i_407 = i_407 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_69(this.#buffer_338));
  }
  constructor() {
    super ();
    let t_410 = [];
    this.#buffer_338 = t_410;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_411;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_414;
    const builder_415 = [""];
    let i_416 = 0;
    while (true) {
      t_414 = this.#parts_411.length;
      if (!(i_416 < t_414)) {
        break;
      }
      listedGet_179(this.#parts_411, i_416).formatTo(builder_415);
      i_416 = i_416 + 1 | 0;
    }
    return builder_415[0];
  }
  /** @param {Array<SqlPart>} parts_417 */
  constructor(parts_417) {
    super ();
    this.#parts_411 = parts_417;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_411;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_420 */
  formatTo(builder_420) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_421;
  /** @param {globalThis.Array<string>} builder_423 */
  formatTo(builder_423) {
    builder_423[0] += this.#source_421;
    return;
  }
  /** @param {string} source_424 */
  constructor(source_424) {
    super ();
    this.#source_421 = source_424;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_421;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_426;
  /** @param {globalThis.Array<string>} builder_428 */
  formatTo(builder_428) {
    let t_429;
    if (this.#value_426) {
      t_429 = "TRUE";
    } else {
      t_429 = "FALSE";
    }
    builder_428[0] += t_429;
    return;
  }
  /** @param {boolean} value_430 */
  constructor(value_430) {
    super ();
    this.#value_426 = value_430;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_426;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_432;
  /** @param {globalThis.Array<string>} builder_434 */
  formatTo(builder_434) {
    builder_434[0] += "'";
    let t_435 = this.#value_432.toISOString().split("T")[0];
    function fn_436(c_437) {
      if (c_437 === 39) {
        builder_434[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_438(builder_434, c_437);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_439(t_435, fn_436);
    builder_434[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_440 */
  constructor(value_440) {
    super ();
    this.#value_432 = value_440;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_432;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_442;
  /** @param {globalThis.Array<string>} builder_444 */
  formatTo(builder_444) {
    let t_445;
    let t_446;
    const s_447 = float64ToString_448(this.#value_442);
    if (s_447 === "NaN") {
      t_446 = true;
    } else {
      if (s_447 === "Infinity") {
        t_445 = true;
      } else {
        t_445 = s_447 === "-Infinity";
      }
      t_446 = t_445;
    }
    if (t_446) {
      builder_444[0] += "NULL";
    } else {
      builder_444[0] += s_447;
    }
    return;
  }
  /** @param {number} value_449 */
  constructor(value_449) {
    super ();
    this.#value_442 = value_449;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_442;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_451;
  /** @param {globalThis.Array<string>} builder_453 */
  formatTo(builder_453) {
    let t_454 = this.#value_451.toString();
    builder_453[0] += t_454;
    return;
  }
  /** @param {number} value_455 */
  constructor(value_455) {
    super ();
    this.#value_451 = value_455;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_451;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_457;
  /** @param {globalThis.Array<string>} builder_459 */
  formatTo(builder_459) {
    let t_460 = this.#value_457.toString();
    builder_459[0] += t_460;
    return;
  }
  /** @param {bigint} value_461 */
  constructor(value_461) {
    super ();
    this.#value_457 = value_461;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_457;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_463;
  /** @param {globalThis.Array<string>} builder_465 */
  formatTo(builder_465) {
    builder_465[0] += "'";
    function fn_466(c_467) {
      if (c_467 === 39) {
        builder_465[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_438(builder_465, c_467);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_439(this.#value_463, fn_466);
    builder_465[0] += "'";
    return;
  }
  /** @param {string} value_468 */
  constructor(value_468) {
    super ();
    this.#value_463 = value_468;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_463;
  }
};
/**
 * @param {TableDef} tableDef_470
 * @param {Map<string, string>} params_471
 * @returns {Changeset}
 */
export function changeset(tableDef_470, params_471) {
  let t_472 = mapConstructor_473(Object.freeze([]));
  return new ChangesetImpl_30(tableDef_470, params_471, t_472, Object.freeze([]), true);
};
/**
 * @param {number} c_475
 * @returns {boolean}
 */
function isIdentStart_474(c_475) {
  let return_476;
  let t_477;
  let t_478;
  if (c_475 >= 97) {
    t_477 = c_475 <= 122;
  } else {
    t_477 = false;
  }
  if (t_477) {
    return_476 = true;
  } else {
    if (c_475 >= 65) {
      t_478 = c_475 <= 90;
    } else {
      t_478 = false;
    }
    if (t_478) {
      return_476 = true;
    } else {
      return_476 = c_475 === 95;
    }
  }
  return return_476;
}
/**
 * @param {number} c_480
 * @returns {boolean}
 */
function isIdentPart_479(c_480) {
  let return_481;
  if (isIdentStart_474(c_480)) {
    return_481 = true;
  } else if (c_480 >= 48) {
    return_481 = c_480 <= 57;
  } else {
    return_481 = false;
  }
  return return_481;
}
/**
 * @param {string} name_482
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_482) {
  let t_483;
  if (! name_482) {
    throw Error();
  }
  let idx_484 = 0;
  if (! isIdentStart_474(stringGet_485(name_482, idx_484))) {
    throw Error();
  }
  let t_486 = stringNext_487(name_482, idx_484);
  idx_484 = t_486;
  while (true) {
    if (!(name_482.length > idx_484)) {
      break;
    }
    if (! isIdentPart_479(stringGet_485(name_482, idx_484))) {
      throw Error();
    }
    t_483 = stringNext_487(name_482, idx_484);
    idx_484 = t_483;
  }
  return new ValidatedIdentifier_310(name_482);
};
/**
 * @param {TableDef} tableDef_701
 * @param {number} id_702
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_701, id_702) {
  const b_703 = new SqlBuilder();
  b_703.appendSafe("DELETE FROM ");
  b_703.appendSafe(tableDef_701.tableName.sqlValue);
  b_703.appendSafe(" WHERE id = ");
  b_703.appendInt32(id_702);
  return b_703.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_704
 * @returns {Query}
 */
export function from(tableName_704) {
  return new Query(tableName_704, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]));
};
/**
 * @param {SafeIdentifier} table_705
 * @param {SafeIdentifier} column_706
 * @returns {SqlFragment}
 */
export function col(table_705, column_706) {
  const b_707 = new SqlBuilder();
  b_707.appendSafe(table_705.sqlValue);
  b_707.appendSafe(".");
  b_707.appendSafe(column_706.sqlValue);
  return b_707.accumulated;
};
