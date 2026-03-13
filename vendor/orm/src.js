import {
  type as type__6, mapBuilderConstructor as mapBuilderConstructor_43, mappedGetOr as mappedGetOr_49, mapBuilderSet as mapBuilderSet_51, mappedToMap as mappedToMap_52, listBuilderAdd as listBuilderAdd_68, listBuilderToList as listBuilderToList_69, stringCountBetween as stringCountBetween_84, stringToInt32 as stringToInt32_98, stringToInt64 as stringToInt64_111, stringToFloat64 as stringToFloat64_124, listedGet as listedGet_179, mappedToList as mappedToList_181, listedJoin as listedJoin_191, listBuilderAddAll as listBuilderAddAll_445, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_538, stringForEach as stringForEach_539, float64ToString as float64ToString_548, mapConstructor as mapConstructor_573, stringGet as stringGet_585, stringNext as stringNext_587, panic as panic_592, pairConstructor as pairConstructor_597
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
   * @param {SafeIdentifier} field_277
   * @param {Query} sub_278
   * @returns {Query}
   */
  whereInSubquery(field_277, sub_278) {
    const b_279 = new SqlBuilder();
    b_279.appendSafe(field_277.sqlValue);
    b_279.appendSafe(" IN (");
    b_279.appendFragment(sub_278.toSql());
    b_279.appendSafe(")");
    let t_280 = b_279.accumulated;
    return this.where(t_280);
  }
  /**
   * @param {SqlFragment} condition_282
   * @returns {Query}
   */
  whereNot(condition_282) {
    const b_283 = new SqlBuilder();
    b_283.appendSafe("NOT (");
    b_283.appendFragment(condition_282);
    b_283.appendSafe(")");
    let t_284 = b_283.accumulated;
    return this.where(t_284);
  }
  /**
   * @param {SafeIdentifier} field_286
   * @param {SqlPart} low_287
   * @param {SqlPart} high_288
   * @returns {Query}
   */
  whereBetween(field_286, low_287, high_288) {
    const b_289 = new SqlBuilder();
    b_289.appendSafe(field_286.sqlValue);
    b_289.appendSafe(" BETWEEN ");
    b_289.appendPart(low_287);
    b_289.appendSafe(" AND ");
    b_289.appendPart(high_288);
    let t_290 = b_289.accumulated;
    return this.where(t_290);
  }
  /**
   * @param {SafeIdentifier} field_292
   * @param {string} pattern_293
   * @returns {Query}
   */
  whereLike(field_292, pattern_293) {
    const b_294 = new SqlBuilder();
    b_294.appendSafe(field_292.sqlValue);
    b_294.appendSafe(" LIKE ");
    b_294.appendString(pattern_293);
    let t_295 = b_294.accumulated;
    return this.where(t_295);
  }
  /**
   * @param {SafeIdentifier} field_297
   * @param {string} pattern_298
   * @returns {Query}
   */
  whereILike(field_297, pattern_298) {
    const b_299 = new SqlBuilder();
    b_299.appendSafe(field_297.sqlValue);
    b_299.appendSafe(" ILIKE ");
    b_299.appendString(pattern_298);
    let t_300 = b_299.accumulated;
    return this.where(t_300);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_302
   * @returns {Query}
   */
  select(fields_302) {
    return new Query(this.#tableName_240, this.#conditions_241, fields_302, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {Array<SqlFragment>} exprs_304
   * @returns {Query}
   */
  selectExpr(exprs_304) {
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, exprs_304);
  }
  /**
   * @param {SafeIdentifier} field_306
   * @param {boolean} ascending_307
   * @returns {Query}
   */
  orderBy(field_306, ascending_307) {
    const nb_308 = this.#orderClauses_243.slice();
    listBuilderAdd_68(nb_308, new OrderClause(field_306, ascending_307));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, listBuilderToList_69(nb_308), this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {number} n_310
   * @returns {Query}
   */
  limit(n_310) {
    if (n_310 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, n_310, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {number} n_312
   * @returns {Query}
   */
  offset(n_312) {
    if (n_312 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, n_312, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {JoinType} joinType_314
   * @param {SafeIdentifier} table_315
   * @param {SqlFragment} onCondition_316
   * @returns {Query}
   */
  join(joinType_314, table_315, onCondition_316) {
    const nb_317 = this.#joinClauses_246.slice();
    listBuilderAdd_68(nb_317, new JoinClause(joinType_314, table_315, onCondition_316));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, listBuilderToList_69(nb_317), this.#groupByFields_247, this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SafeIdentifier} table_319
   * @param {SqlFragment} onCondition_320
   * @returns {Query}
   */
  innerJoin(table_319, onCondition_320) {
    let t_321 = new InnerJoin();
    return this.join(t_321, table_319, onCondition_320);
  }
  /**
   * @param {SafeIdentifier} table_323
   * @param {SqlFragment} onCondition_324
   * @returns {Query}
   */
  leftJoin(table_323, onCondition_324) {
    let t_325 = new LeftJoin();
    return this.join(t_325, table_323, onCondition_324);
  }
  /**
   * @param {SafeIdentifier} table_327
   * @param {SqlFragment} onCondition_328
   * @returns {Query}
   */
  rightJoin(table_327, onCondition_328) {
    let t_329 = new RightJoin();
    return this.join(t_329, table_327, onCondition_328);
  }
  /**
   * @param {SafeIdentifier} table_331
   * @param {SqlFragment} onCondition_332
   * @returns {Query}
   */
  fullJoin(table_331, onCondition_332) {
    let t_333 = new FullJoin();
    return this.join(t_333, table_331, onCondition_332);
  }
  /**
   * @param {SafeIdentifier} field_335
   * @returns {Query}
   */
  groupBy(field_335) {
    const nb_336 = this.#groupByFields_247.slice();
    listBuilderAdd_68(nb_336, field_335);
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, listBuilderToList_69(nb_336), this.#havingConditions_248, this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SqlFragment} condition_338
   * @returns {Query}
   */
  having(condition_338) {
    const nb_339 = this.#havingConditions_248.slice();
    listBuilderAdd_68(nb_339, new AndCondition(condition_338));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, listBuilderToList_69(nb_339), this.#isDistinct_249, this.#selectExprs_250);
  }
  /**
   * @param {SqlFragment} condition_341
   * @returns {Query}
   */
  orHaving(condition_341) {
    const nb_342 = this.#havingConditions_248.slice();
    listBuilderAdd_68(nb_342, new OrCondition(condition_341));
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, listBuilderToList_69(nb_342), this.#isDistinct_249, this.#selectExprs_250);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_240, this.#conditions_241, this.#selectedFields_242, this.#orderClauses_243, this.#limitVal_244, this.#offsetVal_245, this.#joinClauses_246, this.#groupByFields_247, this.#havingConditions_248, true, this.#selectExprs_250);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_345;
    let t_346;
    let t_347;
    const b_348 = new SqlBuilder();
    if (this.#isDistinct_249) {
      b_348.appendSafe("SELECT DISTINCT ");
    } else {
      b_348.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_250.length) {
      b_348.appendFragment(listedGet_179(this.#selectExprs_250, 0));
      let i_349 = 1;
      while (true) {
        t_345 = this.#selectExprs_250.length;
        if (!(i_349 < t_345)) {
          break;
        }
        b_348.appendSafe(", ");
        b_348.appendFragment(listedGet_179(this.#selectExprs_250, i_349));
        i_349 = i_349 + 1 | 0;
      }
    } else if (! this.#selectedFields_242.length) {
      b_348.appendSafe("*");
    } else {
      function fn_350(f_351) {
        return f_351.sqlValue;
      }
      b_348.appendSafe(listedJoin_191(this.#selectedFields_242, ", ", fn_350));
    }
    b_348.appendSafe(" FROM ");
    b_348.appendSafe(this.#tableName_240.sqlValue);
    function fn_352(jc_353) {
      b_348.appendSafe(" ");
      let t_354 = jc_353.joinType.keyword();
      b_348.appendSafe(t_354);
      b_348.appendSafe(" ");
      let t_355 = jc_353.table.sqlValue;
      b_348.appendSafe(t_355);
      b_348.appendSafe(" ON ");
      let t_356 = jc_353.onCondition;
      b_348.appendFragment(t_356);
      return;
    }
    this.#joinClauses_246.forEach(fn_352);
    if (! ! this.#conditions_241.length) {
      b_348.appendSafe(" WHERE ");
      b_348.appendFragment(listedGet_179(this.#conditions_241, 0).condition);
      let i_357 = 1;
      while (true) {
        t_346 = this.#conditions_241.length;
        if (!(i_357 < t_346)) {
          break;
        }
        b_348.appendSafe(" ");
        b_348.appendSafe(listedGet_179(this.#conditions_241, i_357).keyword());
        b_348.appendSafe(" ");
        b_348.appendFragment(listedGet_179(this.#conditions_241, i_357).condition);
        i_357 = i_357 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_247.length) {
      b_348.appendSafe(" GROUP BY ");
      function fn_358(f_359) {
        return f_359.sqlValue;
      }
      b_348.appendSafe(listedJoin_191(this.#groupByFields_247, ", ", fn_358));
    }
    if (! ! this.#havingConditions_248.length) {
      b_348.appendSafe(" HAVING ");
      b_348.appendFragment(listedGet_179(this.#havingConditions_248, 0).condition);
      let i_360 = 1;
      while (true) {
        t_347 = this.#havingConditions_248.length;
        if (!(i_360 < t_347)) {
          break;
        }
        b_348.appendSafe(" ");
        b_348.appendSafe(listedGet_179(this.#havingConditions_248, i_360).keyword());
        b_348.appendSafe(" ");
        b_348.appendFragment(listedGet_179(this.#havingConditions_248, i_360).condition);
        i_360 = i_360 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_243.length) {
      b_348.appendSafe(" ORDER BY ");
      let first_361 = true;
      function fn_362(oc_363) {
        let t_364;
        if (! first_361) {
          b_348.appendSafe(", ");
        }
        first_361 = false;
        let t_365 = oc_363.field.sqlValue;
        b_348.appendSafe(t_365);
        if (oc_363.ascending) {
          t_364 = " ASC";
        } else {
          t_364 = " DESC";
        }
        b_348.appendSafe(t_364);
        return;
      }
      this.#orderClauses_243.forEach(fn_362);
    }
    const lv_366 = this.#limitVal_244;
    if (!(lv_366 == null)) {
      const lv_367 = lv_366;
      b_348.appendSafe(" LIMIT ");
      b_348.appendInt32(lv_367);
    }
    const ov_368 = this.#offsetVal_245;
    if (!(ov_368 == null)) {
      const ov_369 = ov_368;
      b_348.appendSafe(" OFFSET ");
      b_348.appendInt32(ov_369);
    }
    return b_348.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    let t_371;
    let t_372;
    const b_373 = new SqlBuilder();
    b_373.appendSafe("SELECT COUNT(*) FROM ");
    b_373.appendSafe(this.#tableName_240.sqlValue);
    function fn_374(jc_375) {
      b_373.appendSafe(" ");
      let t_376 = jc_375.joinType.keyword();
      b_373.appendSafe(t_376);
      b_373.appendSafe(" ");
      let t_377 = jc_375.table.sqlValue;
      b_373.appendSafe(t_377);
      b_373.appendSafe(" ON ");
      let t_378 = jc_375.onCondition;
      b_373.appendFragment(t_378);
      return;
    }
    this.#joinClauses_246.forEach(fn_374);
    if (! ! this.#conditions_241.length) {
      b_373.appendSafe(" WHERE ");
      b_373.appendFragment(listedGet_179(this.#conditions_241, 0).condition);
      let i_379 = 1;
      while (true) {
        t_371 = this.#conditions_241.length;
        if (!(i_379 < t_371)) {
          break;
        }
        b_373.appendSafe(" ");
        b_373.appendSafe(listedGet_179(this.#conditions_241, i_379).keyword());
        b_373.appendSafe(" ");
        b_373.appendFragment(listedGet_179(this.#conditions_241, i_379).condition);
        i_379 = i_379 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_247.length) {
      b_373.appendSafe(" GROUP BY ");
      function fn_380(f_381) {
        return f_381.sqlValue;
      }
      b_373.appendSafe(listedJoin_191(this.#groupByFields_247, ", ", fn_380));
    }
    if (! ! this.#havingConditions_248.length) {
      b_373.appendSafe(" HAVING ");
      b_373.appendFragment(listedGet_179(this.#havingConditions_248, 0).condition);
      let i_382 = 1;
      while (true) {
        t_372 = this.#havingConditions_248.length;
        if (!(i_382 < t_372)) {
          break;
        }
        b_373.appendSafe(" ");
        b_373.appendSafe(listedGet_179(this.#havingConditions_248, i_382).keyword());
        b_373.appendSafe(" ");
        b_373.appendFragment(listedGet_179(this.#havingConditions_248, i_382).condition);
        i_382 = i_382 + 1 | 0;
      }
    }
    return b_373.accumulated;
  }
  /**
   * @param {number} defaultLimit_384
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_384) {
    let return_385;
    let t_386;
    if (defaultLimit_384 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_244 == null)) {
      return_385 = this.toSql();
    } else {
      t_386 = this.limit(defaultLimit_384);
      return_385 = t_386.toSql();
    }
    return return_385;
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
   * @param {SafeIdentifier} tableName_387
   * @param {Array<WhereClause>} conditions_388
   * @param {Array<SafeIdentifier>} selectedFields_389
   * @param {Array<OrderClause>} orderClauses_390
   * @param {number | null} limitVal_391
   * @param {number | null} offsetVal_392
   * @param {Array<JoinClause>} joinClauses_393
   * @param {Array<SafeIdentifier>} groupByFields_394
   * @param {Array<WhereClause>} havingConditions_395
   * @param {boolean} isDistinct_396
   * @param {Array<SqlFragment>} selectExprs_397
   */
  constructor(tableName_387, conditions_388, selectedFields_389, orderClauses_390, limitVal_391, offsetVal_392, joinClauses_393, groupByFields_394, havingConditions_395, isDistinct_396, selectExprs_397) {
    super ();
    this.#tableName_240 = tableName_387;
    this.#conditions_241 = conditions_388;
    this.#selectedFields_242 = selectedFields_389;
    this.#orderClauses_243 = orderClauses_390;
    this.#limitVal_244 = limitVal_391;
    this.#offsetVal_245 = offsetVal_392;
    this.#joinClauses_246 = joinClauses_393;
    this.#groupByFields_247 = groupByFields_394;
    this.#havingConditions_248 = havingConditions_395;
    this.#isDistinct_249 = isDistinct_396;
    this.#selectExprs_250 = selectExprs_397;
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
class ValidatedIdentifier_410 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_411;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_411;
  }
  /** @param {string} _value_413 */
  constructor(_value_413) {
    super ();
    this.#_value_411 = _value_413;
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
  #name_414;
  /** @type {FieldType} */
  #fieldType_415;
  /** @type {boolean} */
  #nullable_416;
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
   * @param {SafeIdentifier} name_417
   * @param {FieldType} fieldType_418
   * @param {boolean} nullable_419
   */
  constructor(name_417, fieldType_418, nullable_419) {
    super ();
    this.#name_414 = name_417;
    this.#fieldType_415 = fieldType_418;
    this.#nullable_416 = nullable_419;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_414;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_415;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_416;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_423;
  /** @type {Array<FieldDef>} */
  #fields_424;
  /**
   * @param {string} name_426
   * @returns {FieldDef}
   */
  field(name_426) {
    let return_427;
    fn_428: {
      const this_429 = this.#fields_424;
      const n_430 = this_429.length;
      let i_431 = 0;
      while (i_431 < n_430) {
        const el_432 = listedGet_179(this_429, i_431);
        i_431 = i_431 + 1 | 0;
        const f_433 = el_432;
        if (f_433.name.sqlValue === name_426) {
          return_427 = f_433;
          break fn_428;
        }
      }
      throw Error();
    }
    return return_427;
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
   * @param {SafeIdentifier} tableName_434
   * @param {Array<FieldDef>} fields_435
   */
  constructor(tableName_434, fields_435) {
    super ();
    this.#tableName_423 = tableName_434;
    this.#fields_424 = fields_435;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_423;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_424;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_438;
  /** @param {string} sqlSource_440 */
  appendSafe(sqlSource_440) {
    let t_441 = new SqlSource(sqlSource_440);
    listBuilderAdd_68(this.#buffer_438, t_441);
    return;
  }
  /** @param {SqlFragment} fragment_443 */
  appendFragment(fragment_443) {
    let t_444 = fragment_443.parts;
    listBuilderAddAll_445(this.#buffer_438, t_444);
    return;
  }
  /** @param {SqlPart} part_447 */
  appendPart(part_447) {
    listBuilderAdd_68(this.#buffer_438, part_447);
    return;
  }
  /** @param {Array<SqlPart>} values_449 */
  appendPartList(values_449) {
    const this452 = this;
    function fn_450(x_451) {
      this452.appendPart(x_451);
      return;
    }
    this.#appendList_453(values_449, fn_450);
    return;
  }
  /** @param {boolean} value_455 */
  appendBoolean(value_455) {
    let t_456 = new SqlBoolean(value_455);
    listBuilderAdd_68(this.#buffer_438, t_456);
    return;
  }
  /** @param {Array<boolean>} values_458 */
  appendBooleanList(values_458) {
    const this461 = this;
    function fn_459(x_460) {
      this461.appendBoolean(x_460);
      return;
    }
    this.#appendList_453(values_458, fn_459);
    return;
  }
  /** @param {globalThis.Date} value_463 */
  appendDate(value_463) {
    let t_464 = new SqlDate(value_463);
    listBuilderAdd_68(this.#buffer_438, t_464);
    return;
  }
  /** @param {Array<globalThis.Date>} values_466 */
  appendDateList(values_466) {
    const this469 = this;
    function fn_467(x_468) {
      this469.appendDate(x_468);
      return;
    }
    this.#appendList_453(values_466, fn_467);
    return;
  }
  /** @param {number} value_471 */
  appendFloat64(value_471) {
    let t_472 = new SqlFloat64(value_471);
    listBuilderAdd_68(this.#buffer_438, t_472);
    return;
  }
  /** @param {Array<number>} values_474 */
  appendFloat64List(values_474) {
    const this477 = this;
    function fn_475(x_476) {
      this477.appendFloat64(x_476);
      return;
    }
    this.#appendList_453(values_474, fn_475);
    return;
  }
  /** @param {number} value_479 */
  appendInt32(value_479) {
    let t_480 = new SqlInt32(value_479);
    listBuilderAdd_68(this.#buffer_438, t_480);
    return;
  }
  /** @param {Array<number>} values_482 */
  appendInt32List(values_482) {
    const this485 = this;
    function fn_483(x_484) {
      this485.appendInt32(x_484);
      return;
    }
    this.#appendList_453(values_482, fn_483);
    return;
  }
  /** @param {bigint} value_487 */
  appendInt64(value_487) {
    let t_488 = new SqlInt64(value_487);
    listBuilderAdd_68(this.#buffer_438, t_488);
    return;
  }
  /** @param {Array<bigint>} values_490 */
  appendInt64List(values_490) {
    const this493 = this;
    function fn_491(x_492) {
      this493.appendInt64(x_492);
      return;
    }
    this.#appendList_453(values_490, fn_491);
    return;
  }
  /** @param {string} value_495 */
  appendString(value_495) {
    let t_496 = new SqlString(value_495);
    listBuilderAdd_68(this.#buffer_438, t_496);
    return;
  }
  /** @param {Array<string>} values_498 */
  appendStringList(values_498) {
    const this501 = this;
    function fn_499(x_500) {
      this501.appendString(x_500);
      return;
    }
    this.#appendList_453(values_498, fn_499);
    return;
  }
  /**
   * @template {unknown} T_508
   * @param {Array<T_508>} values_503
   * @param {(arg0: T_508) => void} appendValue_504
   */
  #appendList_453(values_503, appendValue_504) {
    let t_505;
    let t_506;
    let i_507 = 0;
    while (true) {
      t_505 = values_503.length;
      if (!(i_507 < t_505)) {
        break;
      }
      if (i_507 > 0) {
        this.appendSafe(", ");
      }
      t_506 = listedGet_179(values_503, i_507);
      appendValue_504(t_506);
      i_507 = i_507 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_69(this.#buffer_438));
  }
  constructor() {
    super ();
    let t_510 = [];
    this.#buffer_438 = t_510;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_511;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_514;
    const builder_515 = [""];
    let i_516 = 0;
    while (true) {
      t_514 = this.#parts_511.length;
      if (!(i_516 < t_514)) {
        break;
      }
      listedGet_179(this.#parts_511, i_516).formatTo(builder_515);
      i_516 = i_516 + 1 | 0;
    }
    return builder_515[0];
  }
  /** @param {Array<SqlPart>} parts_517 */
  constructor(parts_517) {
    super ();
    this.#parts_511 = parts_517;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_511;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_520 */
  formatTo(builder_520) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_521;
  /** @param {globalThis.Array<string>} builder_523 */
  formatTo(builder_523) {
    builder_523[0] += this.#source_521;
    return;
  }
  /** @param {string} source_524 */
  constructor(source_524) {
    super ();
    this.#source_521 = source_524;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_521;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_526;
  /** @param {globalThis.Array<string>} builder_528 */
  formatTo(builder_528) {
    let t_529;
    if (this.#value_526) {
      t_529 = "TRUE";
    } else {
      t_529 = "FALSE";
    }
    builder_528[0] += t_529;
    return;
  }
  /** @param {boolean} value_530 */
  constructor(value_530) {
    super ();
    this.#value_526 = value_530;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_526;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_532;
  /** @param {globalThis.Array<string>} builder_534 */
  formatTo(builder_534) {
    builder_534[0] += "'";
    let t_535 = this.#value_532.toISOString().split("T")[0];
    function fn_536(c_537) {
      if (c_537 === 39) {
        builder_534[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_538(builder_534, c_537);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_539(t_535, fn_536);
    builder_534[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_540 */
  constructor(value_540) {
    super ();
    this.#value_532 = value_540;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_532;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_542;
  /** @param {globalThis.Array<string>} builder_544 */
  formatTo(builder_544) {
    let t_545;
    let t_546;
    const s_547 = float64ToString_548(this.#value_542);
    if (s_547 === "NaN") {
      t_546 = true;
    } else {
      if (s_547 === "Infinity") {
        t_545 = true;
      } else {
        t_545 = s_547 === "-Infinity";
      }
      t_546 = t_545;
    }
    if (t_546) {
      builder_544[0] += "NULL";
    } else {
      builder_544[0] += s_547;
    }
    return;
  }
  /** @param {number} value_549 */
  constructor(value_549) {
    super ();
    this.#value_542 = value_549;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_542;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_551;
  /** @param {globalThis.Array<string>} builder_553 */
  formatTo(builder_553) {
    let t_554 = this.#value_551.toString();
    builder_553[0] += t_554;
    return;
  }
  /** @param {number} value_555 */
  constructor(value_555) {
    super ();
    this.#value_551 = value_555;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_551;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_557;
  /** @param {globalThis.Array<string>} builder_559 */
  formatTo(builder_559) {
    let t_560 = this.#value_557.toString();
    builder_559[0] += t_560;
    return;
  }
  /** @param {bigint} value_561 */
  constructor(value_561) {
    super ();
    this.#value_557 = value_561;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_557;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_563;
  /** @param {globalThis.Array<string>} builder_565 */
  formatTo(builder_565) {
    builder_565[0] += "'";
    function fn_566(c_567) {
      if (c_567 === 39) {
        builder_565[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_538(builder_565, c_567);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_539(this.#value_563, fn_566);
    builder_565[0] += "'";
    return;
  }
  /** @param {string} value_568 */
  constructor(value_568) {
    super ();
    this.#value_563 = value_568;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_563;
  }
};
/**
 * @param {TableDef} tableDef_570
 * @param {Map<string, string>} params_571
 * @returns {Changeset}
 */
export function changeset(tableDef_570, params_571) {
  let t_572 = mapConstructor_573(Object.freeze([]));
  return new ChangesetImpl_30(tableDef_570, params_571, t_572, Object.freeze([]), true);
};
/**
 * @param {number} c_575
 * @returns {boolean}
 */
function isIdentStart_574(c_575) {
  let return_576;
  let t_577;
  let t_578;
  if (c_575 >= 97) {
    t_577 = c_575 <= 122;
  } else {
    t_577 = false;
  }
  if (t_577) {
    return_576 = true;
  } else {
    if (c_575 >= 65) {
      t_578 = c_575 <= 90;
    } else {
      t_578 = false;
    }
    if (t_578) {
      return_576 = true;
    } else {
      return_576 = c_575 === 95;
    }
  }
  return return_576;
}
/**
 * @param {number} c_580
 * @returns {boolean}
 */
function isIdentPart_579(c_580) {
  let return_581;
  if (isIdentStart_574(c_580)) {
    return_581 = true;
  } else if (c_580 >= 48) {
    return_581 = c_580 <= 57;
  } else {
    return_581 = false;
  }
  return return_581;
}
/**
 * @param {string} name_582
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_582) {
  let t_583;
  if (! name_582) {
    throw Error();
  }
  let idx_584 = 0;
  if (! isIdentStart_574(stringGet_585(name_582, idx_584))) {
    throw Error();
  }
  let t_586 = stringNext_587(name_582, idx_584);
  idx_584 = t_586;
  while (true) {
    if (!(name_582.length > idx_584)) {
      break;
    }
    if (! isIdentPart_579(stringGet_585(name_582, idx_584))) {
      throw Error();
    }
    t_583 = stringNext_587(name_582, idx_584);
    idx_584 = t_583;
  }
  return new ValidatedIdentifier_410(name_582);
};
/**
 * @param {TableDef} tableDef_801
 * @param {number} id_802
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_801, id_802) {
  const b_803 = new SqlBuilder();
  b_803.appendSafe("DELETE FROM ");
  b_803.appendSafe(tableDef_801.tableName.sqlValue);
  b_803.appendSafe(" WHERE id = ");
  b_803.appendInt32(id_802);
  return b_803.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_804
 * @returns {Query}
 */
export function from(tableName_804) {
  return new Query(tableName_804, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]));
};
/**
 * @param {SafeIdentifier} table_805
 * @param {SafeIdentifier} column_806
 * @returns {SqlFragment}
 */
export function col(table_805, column_806) {
  const b_807 = new SqlBuilder();
  b_807.appendSafe(table_805.sqlValue);
  b_807.appendSafe(".");
  b_807.appendSafe(column_806.sqlValue);
  return b_807.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_808 = new SqlBuilder();
  b_808.appendSafe("COUNT(*)");
  return b_808.accumulated;
};
/**
 * @param {SafeIdentifier} field_809
 * @returns {SqlFragment}
 */
export function countCol(field_809) {
  const b_810 = new SqlBuilder();
  b_810.appendSafe("COUNT(");
  b_810.appendSafe(field_809.sqlValue);
  b_810.appendSafe(")");
  return b_810.accumulated;
};
/**
 * @param {SafeIdentifier} field_811
 * @returns {SqlFragment}
 */
export function sumCol(field_811) {
  const b_812 = new SqlBuilder();
  b_812.appendSafe("SUM(");
  b_812.appendSafe(field_811.sqlValue);
  b_812.appendSafe(")");
  return b_812.accumulated;
};
/**
 * @param {SafeIdentifier} field_813
 * @returns {SqlFragment}
 */
export function avgCol(field_813) {
  const b_814 = new SqlBuilder();
  b_814.appendSafe("AVG(");
  b_814.appendSafe(field_813.sqlValue);
  b_814.appendSafe(")");
  return b_814.accumulated;
};
/**
 * @param {SafeIdentifier} field_815
 * @returns {SqlFragment}
 */
export function minCol(field_815) {
  const b_816 = new SqlBuilder();
  b_816.appendSafe("MIN(");
  b_816.appendSafe(field_815.sqlValue);
  b_816.appendSafe(")");
  return b_816.accumulated;
};
/**
 * @param {SafeIdentifier} field_817
 * @returns {SqlFragment}
 */
export function maxCol(field_817) {
  const b_818 = new SqlBuilder();
  b_818.appendSafe("MAX(");
  b_818.appendSafe(field_817.sqlValue);
  b_818.appendSafe(")");
  return b_818.accumulated;
};
/**
 * @param {Query} a_819
 * @param {Query} b_820
 * @returns {SqlFragment}
 */
export function unionSql(a_819, b_820) {
  const sb_821 = new SqlBuilder();
  sb_821.appendSafe("(");
  sb_821.appendFragment(a_819.toSql());
  sb_821.appendSafe(") UNION (");
  sb_821.appendFragment(b_820.toSql());
  sb_821.appendSafe(")");
  return sb_821.accumulated;
};
/**
 * @param {Query} a_822
 * @param {Query} b_823
 * @returns {SqlFragment}
 */
export function unionAllSql(a_822, b_823) {
  const sb_824 = new SqlBuilder();
  sb_824.appendSafe("(");
  sb_824.appendFragment(a_822.toSql());
  sb_824.appendSafe(") UNION ALL (");
  sb_824.appendFragment(b_823.toSql());
  sb_824.appendSafe(")");
  return sb_824.accumulated;
};
/**
 * @param {Query} a_825
 * @param {Query} b_826
 * @returns {SqlFragment}
 */
export function intersectSql(a_825, b_826) {
  const sb_827 = new SqlBuilder();
  sb_827.appendSafe("(");
  sb_827.appendFragment(a_825.toSql());
  sb_827.appendSafe(") INTERSECT (");
  sb_827.appendFragment(b_826.toSql());
  sb_827.appendSafe(")");
  return sb_827.accumulated;
};
/**
 * @param {Query} a_828
 * @param {Query} b_829
 * @returns {SqlFragment}
 */
export function exceptSql(a_828, b_829) {
  const sb_830 = new SqlBuilder();
  sb_830.appendSafe("(");
  sb_830.appendFragment(a_828.toSql());
  sb_830.appendSafe(") EXCEPT (");
  sb_830.appendFragment(b_829.toSql());
  sb_830.appendSafe(")");
  return sb_830.accumulated;
};
/**
 * @param {Query} q_831
 * @param {SafeIdentifier} alias_832
 * @returns {SqlFragment}
 */
export function subquery(q_831, alias_832) {
  const b_833 = new SqlBuilder();
  b_833.appendSafe("(");
  b_833.appendFragment(q_831.toSql());
  b_833.appendSafe(") AS ");
  b_833.appendSafe(alias_832.sqlValue);
  return b_833.accumulated;
};
/**
 * @param {Query} q_834
 * @returns {SqlFragment}
 */
export function existsSql(q_834) {
  const b_835 = new SqlBuilder();
  b_835.appendSafe("EXISTS (");
  b_835.appendFragment(q_834.toSql());
  b_835.appendSafe(")");
  return b_835.accumulated;
};
