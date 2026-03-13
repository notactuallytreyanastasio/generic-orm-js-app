import {
  type as type__6, mapBuilderConstructor as mapBuilderConstructor_43, mappedGetOr as mappedGetOr_49, mapBuilderSet as mapBuilderSet_51, mappedToMap as mappedToMap_52, listBuilderAdd as listBuilderAdd_68, listBuilderToList as listBuilderToList_69, stringCountBetween as stringCountBetween_84, stringToInt32 as stringToInt32_98, stringToInt64 as stringToInt64_111, stringToFloat64 as stringToFloat64_124, listedGet as listedGet_179, mappedToList as mappedToList_181, listedJoin as listedJoin_191, listBuilderAddAll as listBuilderAddAll_397, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_490, stringForEach as stringForEach_491, float64ToString as float64ToString_500, mapConstructor as mapConstructor_525, stringGet as stringGet_537, stringNext as stringNext_539, panic as panic_544, pairConstructor as pairConstructor_549
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
  /**
   * @param {SqlFragment} condition_248
   * @returns {Query}
   */
  where(condition_248) {
    const nb_249 = this.#conditions_241.slice();
    listBuilderAdd_68(nb_249, new AndCondition(condition_248));
    return new Query(this.#tableName_240, listBuilderToList_69(nb_249), this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246);
  }
  /**
   * @param {SqlFragment} condition_251
   * @returns {Query}
   */
  orWhere(condition_251) {
    const nb_252 = this.#conditions_241.slice();
    listBuilderAdd_68(nb_252, new OrCondition(condition_251));
    return new Query(this.#tableName_240, listBuilderToList_69(nb_252), this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246);
  }
  /**
   * @param {SafeIdentifier} field_254
   * @returns {Query}
   */
  whereNull(field_254) {
    const b_255 = new SqlBuilder();
    b_255.appendSafe(field_254.sqlValue);
    b_255.appendSafe(" IS NULL");
    let t_256 = b_255.accumulated;
    return this.where(t_256);
  }
  /**
   * @param {SafeIdentifier} field_258
   * @returns {Query}
   */
  whereNotNull(field_258) {
    const b_259 = new SqlBuilder();
    b_259.appendSafe(field_258.sqlValue);
    b_259.appendSafe(" IS NOT NULL");
    let t_260 = b_259.accumulated;
    return this.where(t_260);
  }
  /**
   * @param {SafeIdentifier} field_262
   * @param {Array<SqlPart>} values_263
   * @returns {Query}
   */
  whereIn(field_262, values_263) {
    let return_264;
    let t_265;
    let t_266;
    let t_267;
    fn_268: {
      if (! values_263.length) {
        const b_269 = new SqlBuilder();
        b_269.appendSafe("1 = 0");
        t_265 = b_269.accumulated;
        return_264 = this.where(t_265);
        break fn_268;
      }
      const b_270 = new SqlBuilder();
      b_270.appendSafe(field_262.sqlValue);
      b_270.appendSafe(" IN (");
      b_270.appendPart(listedGet_179(values_263, 0));
      let i_271 = 1;
      while (true) {
        t_266 = values_263.length;
        if (!(i_271 < t_266)) {
          break;
        }
        b_270.appendSafe(", ");
        b_270.appendPart(listedGet_179(values_263, i_271));
        i_271 = i_271 + 1 | 0;
      }
      b_270.appendSafe(")");
      t_267 = b_270.accumulated;
      return_264 = this.where(t_267);
    }
    return return_264;
  }
  /**
   * @param {SqlFragment} condition_273
   * @returns {Query}
   */
  whereNot(condition_273) {
    const b_274 = new SqlBuilder();
    b_274.appendSafe("NOT (");
    b_274.appendFragment(condition_273);
    b_274.appendSafe(")");
    let t_275 = b_274.accumulated;
    return this.where(t_275);
  }
  /**
   * @param {SafeIdentifier} field_277
   * @param {SqlPart} low_278
   * @param {SqlPart} high_279
   * @returns {Query}
   */
  whereBetween(field_277, low_278, high_279) {
    const b_280 = new SqlBuilder();
    b_280.appendSafe(field_277.sqlValue);
    b_280.appendSafe(" BETWEEN ");
    b_280.appendPart(low_278);
    b_280.appendSafe(" AND ");
    b_280.appendPart(high_279);
    let t_281 = b_280.accumulated;
    return this.where(t_281);
  }
  /**
   * @param {SafeIdentifier} field_283
   * @param {string} pattern_284
   * @returns {Query}
   */
  whereLike(field_283, pattern_284) {
    const b_285 = new SqlBuilder();
    b_285.appendSafe(field_283.sqlValue);
    b_285.appendSafe(" LIKE ");
    b_285.appendString(pattern_284);
    let t_286 = b_285.accumulated;
    return this.where(t_286);
  }
  /**
   * @param {SafeIdentifier} field_288
   * @param {string} pattern_289
   * @returns {Query}
   */
  whereILike(field_288, pattern_289) {
    const b_290 = new SqlBuilder();
    b_290.appendSafe(field_288.sqlValue);
    b_290.appendSafe(" ILIKE ");
    b_290.appendString(pattern_289);
    let t_291 = b_290.accumulated;
    return this.where(t_291);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_293
   * @returns {Query}
   */
  select(fields_293) {
    return new Query(this.#tableName_240, this.#conditions_241, fields_293, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246);
  }
  /**
   * @param {SafeIdentifier} field_295
   * @param {boolean} ascending_296
   * @returns {Query}
   */
  orderBy(field_295, ascending_296) {
    const nb_297 = this.#orderClauses_243.slice();
    listBuilderAdd_68(nb_297, new OrderClause(field_295, ascending_296));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, listBuilderToList_69(nb_297), this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246);
  }
  /**
   * @param {number} n_299
   * @returns {Query}
   */
  limit(n_299) {
    if (n_299 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, n_299, this.#offsetVal_245, this.#joinClauses_246);
  }
  /**
   * @param {number} n_301
   * @returns {Query}
   */
  offset(n_301) {
    if (n_301 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, n_301, this.#joinClauses_246);
  }
  /**
   * @param {JoinType} joinType_303
   * @param {SafeIdentifier} table_304
   * @param {SqlFragment} onCondition_305
   * @returns {Query}
   */
  join(joinType_303, table_304, onCondition_305) {
    const nb_306 = this.#joinClauses_246.slice();
    listBuilderAdd_68(nb_306, new JoinClause(joinType_303, table_304, onCondition_305));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, listBuilderToList_69(nb_306));
  }
  /**
   * @param {SafeIdentifier} table_308
   * @param {SqlFragment} onCondition_309
   * @returns {Query}
   */
  innerJoin(table_308, onCondition_309) {
    let t_310 = new InnerJoin();
    return this.join(t_310, table_308, onCondition_309);
  }
  /**
   * @param {SafeIdentifier} table_312
   * @param {SqlFragment} onCondition_313
   * @returns {Query}
   */
  leftJoin(table_312, onCondition_313) {
    let t_314 = new LeftJoin();
    return this.join(t_314, table_312, onCondition_313);
  }
  /**
   * @param {SafeIdentifier} table_316
   * @param {SqlFragment} onCondition_317
   * @returns {Query}
   */
  rightJoin(table_316, onCondition_317) {
    let t_318 = new RightJoin();
    return this.join(t_318, table_316, onCondition_317);
  }
  /**
   * @param {SafeIdentifier} table_320
   * @param {SqlFragment} onCondition_321
   * @returns {Query}
   */
  fullJoin(table_320, onCondition_321) {
    let t_322 = new FullJoin();
    return this.join(t_322, table_320, onCondition_321);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_324;
    const b_325 = new SqlBuilder();
    b_325.appendSafe("SELECT ");
    if (! this.#selectedFields_242.length) {
      b_325.appendSafe("*");
    } else {
      function fn_326(f_327) {
        return f_327.sqlValue;
      }
      b_325.appendSafe(listedJoin_191(this.#selectedFields_242, ", ", fn_326));
    }
    b_325.appendSafe(" FROM ");
    b_325.appendSafe(this.#tableName_240.sqlValue);
    function fn_328(jc_329) {
      b_325.appendSafe(" ");
      let t_330 = jc_329.joinType.keyword();
      b_325.appendSafe(t_330);
      b_325.appendSafe(" ");
      let t_331 = jc_329.table.sqlValue;
      b_325.appendSafe(t_331);
      b_325.appendSafe(" ON ");
      let t_332 = jc_329.onCondition;
      b_325.appendFragment(t_332);
      return;
    }
    this.#joinClauses_246.forEach(fn_328);
    if (! ! this.#conditions_241.length) {
      b_325.appendSafe(" WHERE ");
      b_325.appendFragment(listedGet_179(this.#conditions_241, 0).condition);
      let i_333 = 1;
      while (true) {
        t_324 = this.#conditions_241.length;
        if (!(i_333 < t_324)) {
          break;
        }
        b_325.appendSafe(" ");
        b_325.appendSafe(listedGet_179(this.#conditions_241, i_333).keyword());
        b_325.appendSafe(" ");
        b_325.appendFragment(listedGet_179(this.#conditions_241, i_333).condition);
        i_333 = i_333 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_243.length) {
      b_325.appendSafe(" ORDER BY ");
      let first_334 = true;
      function fn_335(oc_336) {
        let t_337;
        if (! first_334) {
          b_325.appendSafe(", ");
        }
        first_334 = false;
        let t_338 = oc_336.field.sqlValue;
        b_325.appendSafe(t_338);
        if (oc_336.ascending) {
          t_337 = " ASC";
        } else {
          t_337 = " DESC";
        }
        b_325.appendSafe(t_337);
        return;
      }
      this.#orderClauses_243.forEach(fn_335);
    }
    const lv_339 = this.#limitVal_244;
    if (!(lv_339 == null)) {
      const lv_340 = lv_339;
      b_325.appendSafe(" LIMIT ");
      b_325.appendInt32(lv_340);
    }
    const ov_341 = this.#offsetVal_245;
    if (!(ov_341 == null)) {
      const ov_342 = ov_341;
      b_325.appendSafe(" OFFSET ");
      b_325.appendInt32(ov_342);
    }
    return b_325.accumulated;
  }
  /**
   * @param {number} defaultLimit_344
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_344) {
    let return_345;
    let t_346;
    if (defaultLimit_344 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_244 == null)) {
      return_345 = this.toSql();
    } else {
      t_346 = this.limit(defaultLimit_344);
      return_345 = t_346.toSql();
    }
    return return_345;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, selectedFields: Array<SafeIdentifier>, orderClauses: Array<OrderClause>, limitVal: number | null, offsetVal: number | null, joinClauses: Array<JoinClause>
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.tableName, props.conditions, props.selectedFields, props.orderClauses, props.limitVal, props.offsetVal, props.joinClauses);
  }
  /**
   * @param {SafeIdentifier} tableName_347
   * @param {Array<WhereClause>} conditions_348
   * @param {Array<SafeIdentifier>} selectedFields_349
   * @param {Array<OrderClause>} orderClauses_350
   * @param {number | null} limitVal_351
   * @param {number | null} offsetVal_352
   * @param {Array<JoinClause>} joinClauses_353
   */
  constructor(tableName_347, conditions_348, selectedFields_349, orderClauses_350, limitVal_351, offsetVal_352, joinClauses_353) {
    super ();
    this.#tableName_240 = tableName_347;
    this.#conditions_241 = conditions_348;
    this.#selectedFields_242 = selectedFields_349;
    this.#orderClauses_243 = orderClauses_350;
    this.#limitVal_244 = limitVal_351;
    this.#offsetVal_245 = offsetVal_352;
    this.#joinClauses_246 = joinClauses_353;
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
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_362 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_363;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_363;
  }
  /** @param {string} _value_365 */
  constructor(_value_365) {
    super ();
    this.#_value_363 = _value_365;
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
  #name_366;
  /** @type {FieldType} */
  #fieldType_367;
  /** @type {boolean} */
  #nullable_368;
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
   * @param {SafeIdentifier} name_369
   * @param {FieldType} fieldType_370
   * @param {boolean} nullable_371
   */
  constructor(name_369, fieldType_370, nullable_371) {
    super ();
    this.#name_366 = name_369;
    this.#fieldType_367 = fieldType_370;
    this.#nullable_368 = nullable_371;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_366;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_367;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_368;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_375;
  /** @type {Array<FieldDef>} */
  #fields_376;
  /**
   * @param {string} name_378
   * @returns {FieldDef}
   */
  field(name_378) {
    let return_379;
    fn_380: {
      const this_381 = this.#fields_376;
      const n_382 = this_381.length;
      let i_383 = 0;
      while (i_383 < n_382) {
        const el_384 = listedGet_179(this_381, i_383);
        i_383 = i_383 + 1 | 0;
        const f_385 = el_384;
        if (f_385.name.sqlValue === name_378) {
          return_379 = f_385;
          break fn_380;
        }
      }
      throw Error();
    }
    return return_379;
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
   * @param {SafeIdentifier} tableName_386
   * @param {Array<FieldDef>} fields_387
   */
  constructor(tableName_386, fields_387) {
    super ();
    this.#tableName_375 = tableName_386;
    this.#fields_376 = fields_387;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_375;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_376;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_390;
  /** @param {string} sqlSource_392 */
  appendSafe(sqlSource_392) {
    let t_393 = new SqlSource(sqlSource_392);
    listBuilderAdd_68(this.#buffer_390, t_393);
    return;
  }
  /** @param {SqlFragment} fragment_395 */
  appendFragment(fragment_395) {
    let t_396 = fragment_395.parts;
    listBuilderAddAll_397(this.#buffer_390, t_396);
    return;
  }
  /** @param {SqlPart} part_399 */
  appendPart(part_399) {
    listBuilderAdd_68(this.#buffer_390, part_399);
    return;
  }
  /** @param {Array<SqlPart>} values_401 */
  appendPartList(values_401) {
    const this404 = this;
    function fn_402(x_403) {
      this404.appendPart(x_403);
      return;
    }
    this.#appendList_405(values_401, fn_402);
    return;
  }
  /** @param {boolean} value_407 */
  appendBoolean(value_407) {
    let t_408 = new SqlBoolean(value_407);
    listBuilderAdd_68(this.#buffer_390, t_408);
    return;
  }
  /** @param {Array<boolean>} values_410 */
  appendBooleanList(values_410) {
    const this413 = this;
    function fn_411(x_412) {
      this413.appendBoolean(x_412);
      return;
    }
    this.#appendList_405(values_410, fn_411);
    return;
  }
  /** @param {globalThis.Date} value_415 */
  appendDate(value_415) {
    let t_416 = new SqlDate(value_415);
    listBuilderAdd_68(this.#buffer_390, t_416);
    return;
  }
  /** @param {Array<globalThis.Date>} values_418 */
  appendDateList(values_418) {
    const this421 = this;
    function fn_419(x_420) {
      this421.appendDate(x_420);
      return;
    }
    this.#appendList_405(values_418, fn_419);
    return;
  }
  /** @param {number} value_423 */
  appendFloat64(value_423) {
    let t_424 = new SqlFloat64(value_423);
    listBuilderAdd_68(this.#buffer_390, t_424);
    return;
  }
  /** @param {Array<number>} values_426 */
  appendFloat64List(values_426) {
    const this429 = this;
    function fn_427(x_428) {
      this429.appendFloat64(x_428);
      return;
    }
    this.#appendList_405(values_426, fn_427);
    return;
  }
  /** @param {number} value_431 */
  appendInt32(value_431) {
    let t_432 = new SqlInt32(value_431);
    listBuilderAdd_68(this.#buffer_390, t_432);
    return;
  }
  /** @param {Array<number>} values_434 */
  appendInt32List(values_434) {
    const this437 = this;
    function fn_435(x_436) {
      this437.appendInt32(x_436);
      return;
    }
    this.#appendList_405(values_434, fn_435);
    return;
  }
  /** @param {bigint} value_439 */
  appendInt64(value_439) {
    let t_440 = new SqlInt64(value_439);
    listBuilderAdd_68(this.#buffer_390, t_440);
    return;
  }
  /** @param {Array<bigint>} values_442 */
  appendInt64List(values_442) {
    const this445 = this;
    function fn_443(x_444) {
      this445.appendInt64(x_444);
      return;
    }
    this.#appendList_405(values_442, fn_443);
    return;
  }
  /** @param {string} value_447 */
  appendString(value_447) {
    let t_448 = new SqlString(value_447);
    listBuilderAdd_68(this.#buffer_390, t_448);
    return;
  }
  /** @param {Array<string>} values_450 */
  appendStringList(values_450) {
    const this453 = this;
    function fn_451(x_452) {
      this453.appendString(x_452);
      return;
    }
    this.#appendList_405(values_450, fn_451);
    return;
  }
  /**
   * @template {unknown} T_460
   * @param {Array<T_460>} values_455
   * @param {(arg0: T_460) => void} appendValue_456
   */
  #appendList_405(values_455, appendValue_456) {
    let t_457;
    let t_458;
    let i_459 = 0;
    while (true) {
      t_457 = values_455.length;
      if (!(i_459 < t_457)) {
        break;
      }
      if (i_459 > 0) {
        this.appendSafe(", ");
      }
      t_458 = listedGet_179(values_455, i_459);
      appendValue_456(t_458);
      i_459 = i_459 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_69(this.#buffer_390));
  }
  constructor() {
    super ();
    let t_462 = [];
    this.#buffer_390 = t_462;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_463;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_466;
    const builder_467 = [""];
    let i_468 = 0;
    while (true) {
      t_466 = this.#parts_463.length;
      if (!(i_468 < t_466)) {
        break;
      }
      listedGet_179(this.#parts_463, i_468).formatTo(builder_467);
      i_468 = i_468 + 1 | 0;
    }
    return builder_467[0];
  }
  /** @param {Array<SqlPart>} parts_469 */
  constructor(parts_469) {
    super ();
    this.#parts_463 = parts_469;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_463;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_472 */
  formatTo(builder_472) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_473;
  /** @param {globalThis.Array<string>} builder_475 */
  formatTo(builder_475) {
    builder_475[0] += this.#source_473;
    return;
  }
  /** @param {string} source_476 */
  constructor(source_476) {
    super ();
    this.#source_473 = source_476;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_473;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_478;
  /** @param {globalThis.Array<string>} builder_480 */
  formatTo(builder_480) {
    let t_481;
    if (this.#value_478) {
      t_481 = "TRUE";
    } else {
      t_481 = "FALSE";
    }
    builder_480[0] += t_481;
    return;
  }
  /** @param {boolean} value_482 */
  constructor(value_482) {
    super ();
    this.#value_478 = value_482;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_478;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_484;
  /** @param {globalThis.Array<string>} builder_486 */
  formatTo(builder_486) {
    builder_486[0] += "'";
    let t_487 = this.#value_484.toISOString().split("T")[0];
    function fn_488(c_489) {
      if (c_489 === 39) {
        builder_486[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_490(builder_486, c_489);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_491(t_487, fn_488);
    builder_486[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_492 */
  constructor(value_492) {
    super ();
    this.#value_484 = value_492;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_484;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_494;
  /** @param {globalThis.Array<string>} builder_496 */
  formatTo(builder_496) {
    let t_497;
    let t_498;
    const s_499 = float64ToString_500(this.#value_494);
    if (s_499 === "NaN") {
      t_498 = true;
    } else {
      if (s_499 === "Infinity") {
        t_497 = true;
      } else {
        t_497 = s_499 === "-Infinity";
      }
      t_498 = t_497;
    }
    if (t_498) {
      builder_496[0] += "NULL";
    } else {
      builder_496[0] += s_499;
    }
    return;
  }
  /** @param {number} value_501 */
  constructor(value_501) {
    super ();
    this.#value_494 = value_501;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_494;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_503;
  /** @param {globalThis.Array<string>} builder_505 */
  formatTo(builder_505) {
    let t_506 = this.#value_503.toString();
    builder_505[0] += t_506;
    return;
  }
  /** @param {number} value_507 */
  constructor(value_507) {
    super ();
    this.#value_503 = value_507;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_503;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_509;
  /** @param {globalThis.Array<string>} builder_511 */
  formatTo(builder_511) {
    let t_512 = this.#value_509.toString();
    builder_511[0] += t_512;
    return;
  }
  /** @param {bigint} value_513 */
  constructor(value_513) {
    super ();
    this.#value_509 = value_513;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_509;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_515;
  /** @param {globalThis.Array<string>} builder_517 */
  formatTo(builder_517) {
    builder_517[0] += "'";
    function fn_518(c_519) {
      if (c_519 === 39) {
        builder_517[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_490(builder_517, c_519);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_491(this.#value_515, fn_518);
    builder_517[0] += "'";
    return;
  }
  /** @param {string} value_520 */
  constructor(value_520) {
    super ();
    this.#value_515 = value_520;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_515;
  }
};
/**
 * @param {TableDef} tableDef_522
 * @param {Map<string, string>} params_523
 * @returns {Changeset}
 */
export function changeset(tableDef_522, params_523) {
  let t_524 = mapConstructor_525(Object.freeze([]));
  return new ChangesetImpl_30(tableDef_522, params_523, t_524, Object.freeze([]), true);
};
/**
 * @param {number} c_527
 * @returns {boolean}
 */
function isIdentStart_526(c_527) {
  let return_528;
  let t_529;
  let t_530;
  if (c_527 >= 97) {
    t_529 = c_527 <= 122;
  } else {
    t_529 = false;
  }
  if (t_529) {
    return_528 = true;
  } else {
    if (c_527 >= 65) {
      t_530 = c_527 <= 90;
    } else {
      t_530 = false;
    }
    if (t_530) {
      return_528 = true;
    } else {
      return_528 = c_527 === 95;
    }
  }
  return return_528;
}
/**
 * @param {number} c_532
 * @returns {boolean}
 */
function isIdentPart_531(c_532) {
  let return_533;
  if (isIdentStart_526(c_532)) {
    return_533 = true;
  } else if (c_532 >= 48) {
    return_533 = c_532 <= 57;
  } else {
    return_533 = false;
  }
  return return_533;
}
/**
 * @param {string} name_534
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_534) {
  let t_535;
  if (! name_534) {
    throw Error();
  }
  let idx_536 = 0;
  if (! isIdentStart_526(stringGet_537(name_534, idx_536))) {
    throw Error();
  }
  let t_538 = stringNext_539(name_534, idx_536);
  idx_536 = t_538;
  while (true) {
    if (!(name_534.length > idx_536)) {
      break;
    }
    if (! isIdentPart_531(stringGet_537(name_534, idx_536))) {
      throw Error();
    }
    t_535 = stringNext_539(name_534, idx_536);
    idx_536 = t_535;
  }
  return new ValidatedIdentifier_362(name_534);
};
/**
 * @param {TableDef} tableDef_753
 * @param {number} id_754
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_753, id_754) {
  const b_755 = new SqlBuilder();
  b_755.appendSafe("DELETE FROM ");
  b_755.appendSafe(tableDef_753.tableName.sqlValue);
  b_755.appendSafe(" WHERE id = ");
  b_755.appendInt32(id_754);
  return b_755.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_756
 * @returns {Query}
 */
export function from(tableName_756) {
  return new Query(tableName_756, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]));
};
/**
 * @param {SafeIdentifier} table_757
 * @param {SafeIdentifier} column_758
 * @returns {SqlFragment}
 */
export function col(table_757, column_758) {
  const b_759 = new SqlBuilder();
  b_759.appendSafe(table_757.sqlValue);
  b_759.appendSafe(".");
  b_759.appendSafe(column_758.sqlValue);
  return b_759.accumulated;
};
