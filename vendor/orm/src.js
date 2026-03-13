import {
  type as type__6, mapBuilderConstructor as mapBuilderConstructor_43, mappedGetOr as mappedGetOr_49, mapBuilderSet as mapBuilderSet_51, mappedToMap as mappedToMap_52, listBuilderAdd as listBuilderAdd_68, listBuilderToList as listBuilderToList_69, stringCountBetween as stringCountBetween_84, stringToInt32 as stringToInt32_98, stringToInt64 as stringToInt64_111, stringToFloat64 as stringToFloat64_124, listedGet as listedGet_179, mappedToList as mappedToList_181, listedJoin as listedJoin_191, listBuilderAddAll as listBuilderAddAll_534, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_627, stringForEach as stringForEach_628, float64ToString as float64ToString_637, mapConstructor as mapConstructor_662, stringGet as stringGet_674, stringNext as stringNext_676, panic as panic_681, pairConstructor as pairConstructor_686
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
export class CrossJoin extends type__6(JoinType) {
  /** @returns {string} */
  keyword() {
    return "CROSS JOIN";
  }
  constructor() {
    super ();
    return;
  }
};
export class JoinClause extends type__6() {
  /** @type {JoinType} */
  #joinType_216;
  /** @type {SafeIdentifier} */
  #table_217;
  /** @type {SqlFragment | null} */
  #onCondition_218;
  /**
   * @param {{
   *   joinType: JoinType, table: SafeIdentifier, onCondition: SqlFragment | null
   * }}
   * props
   * @returns {JoinClause}
   */
  static["new"](props) {
    return new JoinClause(props.joinType, props.table, props.onCondition);
  }
  /**
   * @param {JoinType} joinType_219
   * @param {SafeIdentifier} table_220
   * @param {SqlFragment | null} onCondition_221
   */
  constructor(joinType_219, table_220, onCondition_221) {
    super ();
    this.#joinType_216 = joinType_219;
    this.#table_217 = table_220;
    this.#onCondition_218 = onCondition_221;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_216;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_217;
  }
  /** @returns {SqlFragment | null} */
  get onCondition() {
    return this.#onCondition_218;
  }
};
export class NullsPosition extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class NullsFirst extends type__6(NullsPosition) {
  /** @returns {string} */
  keyword() {
    return " NULLS FIRST";
  }
  constructor() {
    super ();
    return;
  }
};
export class NullsLast extends type__6(NullsPosition) {
  /** @returns {string} */
  keyword() {
    return " NULLS LAST";
  }
  constructor() {
    super ();
    return;
  }
};
export class OrderClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_228;
  /** @type {boolean} */
  #ascending_229;
  /** @type {NullsPosition | null} */
  #nullsPos_230;
  /**
   * @param {{
   *   field: SafeIdentifier, ascending: boolean, nullsPos: NullsPosition | null
   * }}
   * props
   * @returns {OrderClause}
   */
  static["new"](props) {
    return new OrderClause(props.field, props.ascending, props.nullsPos);
  }
  /**
   * @param {SafeIdentifier} field_231
   * @param {boolean} ascending_232
   * @param {NullsPosition | null} nullsPos_233
   */
  constructor(field_231, ascending_232, nullsPos_233) {
    super ();
    this.#field_228 = field_231;
    this.#ascending_229 = ascending_232;
    this.#nullsPos_230 = nullsPos_233;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_228;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_229;
  }
  /** @returns {NullsPosition | null} */
  get nullsPos() {
    return this.#nullsPos_230;
  }
};
export class LockMode extends type__6() {
  /** @returns {string} */
  keyword() {
    null;
  }
};
export class ForUpdate extends type__6(LockMode) {
  /** @returns {string} */
  keyword() {
    return " FOR UPDATE";
  }
  constructor() {
    super ();
    return;
  }
};
export class ForShare extends type__6(LockMode) {
  /** @returns {string} */
  keyword() {
    return " FOR SHARE";
  }
  constructor() {
    super ();
    return;
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
  #_condition_242;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_242;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_245 */
  constructor(_condition_245) {
    super ();
    this.#_condition_242 = _condition_245;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_246;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_246;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_249 */
  constructor(_condition_249) {
    super ();
    this.#_condition_246 = _condition_249;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_250;
  /** @type {Array<WhereClause>} */
  #conditions_251;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_252;
  /** @type {Array<OrderClause>} */
  #orderClauses_253;
  /** @type {number | null} */
  #limitVal_254;
  /** @type {number | null} */
  #offsetVal_255;
  /** @type {Array<JoinClause>} */
  #joinClauses_256;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_257;
  /** @type {Array<WhereClause>} */
  #havingConditions_258;
  /** @type {boolean} */
  #isDistinct_259;
  /** @type {Array<SqlFragment>} */
  #selectExprs_260;
  /** @type {LockMode | null} */
  #lockMode_261;
  /**
   * @param {SqlFragment} condition_263
   * @returns {Query}
   */
  where(condition_263) {
    const nb_264 = this.#conditions_251.slice();
    listBuilderAdd_68(nb_264, new AndCondition(condition_263));
    return new Query(this.#tableName_250, listBuilderToList_69(nb_264), this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SqlFragment} condition_266
   * @returns {Query}
   */
  orWhere(condition_266) {
    const nb_267 = this.#conditions_251.slice();
    listBuilderAdd_68(nb_267, new OrCondition(condition_266));
    return new Query(this.#tableName_250, listBuilderToList_69(nb_267), this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SafeIdentifier} field_269
   * @returns {Query}
   */
  whereNull(field_269) {
    const b_270 = new SqlBuilder();
    b_270.appendSafe(field_269.sqlValue);
    b_270.appendSafe(" IS NULL");
    let t_271 = b_270.accumulated;
    return this.where(t_271);
  }
  /**
   * @param {SafeIdentifier} field_273
   * @returns {Query}
   */
  whereNotNull(field_273) {
    const b_274 = new SqlBuilder();
    b_274.appendSafe(field_273.sqlValue);
    b_274.appendSafe(" IS NOT NULL");
    let t_275 = b_274.accumulated;
    return this.where(t_275);
  }
  /**
   * @param {SafeIdentifier} field_277
   * @param {Array<SqlPart>} values_278
   * @returns {Query}
   */
  whereIn(field_277, values_278) {
    let return_279;
    let t_280;
    let t_281;
    let t_282;
    fn_283: {
      if (! values_278.length) {
        const b_284 = new SqlBuilder();
        b_284.appendSafe("1 = 0");
        t_280 = b_284.accumulated;
        return_279 = this.where(t_280);
        break fn_283;
      }
      const b_285 = new SqlBuilder();
      b_285.appendSafe(field_277.sqlValue);
      b_285.appendSafe(" IN (");
      b_285.appendPart(listedGet_179(values_278, 0));
      let i_286 = 1;
      while (true) {
        t_281 = values_278.length;
        if (!(i_286 < t_281)) {
          break;
        }
        b_285.appendSafe(", ");
        b_285.appendPart(listedGet_179(values_278, i_286));
        i_286 = i_286 + 1 | 0;
      }
      b_285.appendSafe(")");
      t_282 = b_285.accumulated;
      return_279 = this.where(t_282);
    }
    return return_279;
  }
  /**
   * @param {SafeIdentifier} field_288
   * @param {Query} sub_289
   * @returns {Query}
   */
  whereInSubquery(field_288, sub_289) {
    const b_290 = new SqlBuilder();
    b_290.appendSafe(field_288.sqlValue);
    b_290.appendSafe(" IN (");
    b_290.appendFragment(sub_289.toSql());
    b_290.appendSafe(")");
    let t_291 = b_290.accumulated;
    return this.where(t_291);
  }
  /**
   * @param {SqlFragment} condition_293
   * @returns {Query}
   */
  whereNot(condition_293) {
    const b_294 = new SqlBuilder();
    b_294.appendSafe("NOT (");
    b_294.appendFragment(condition_293);
    b_294.appendSafe(")");
    let t_295 = b_294.accumulated;
    return this.where(t_295);
  }
  /**
   * @param {SafeIdentifier} field_297
   * @param {SqlPart} low_298
   * @param {SqlPart} high_299
   * @returns {Query}
   */
  whereBetween(field_297, low_298, high_299) {
    const b_300 = new SqlBuilder();
    b_300.appendSafe(field_297.sqlValue);
    b_300.appendSafe(" BETWEEN ");
    b_300.appendPart(low_298);
    b_300.appendSafe(" AND ");
    b_300.appendPart(high_299);
    let t_301 = b_300.accumulated;
    return this.where(t_301);
  }
  /**
   * @param {SafeIdentifier} field_303
   * @param {string} pattern_304
   * @returns {Query}
   */
  whereLike(field_303, pattern_304) {
    const b_305 = new SqlBuilder();
    b_305.appendSafe(field_303.sqlValue);
    b_305.appendSafe(" LIKE ");
    b_305.appendString(pattern_304);
    let t_306 = b_305.accumulated;
    return this.where(t_306);
  }
  /**
   * @param {SafeIdentifier} field_308
   * @param {string} pattern_309
   * @returns {Query}
   */
  whereILike(field_308, pattern_309) {
    const b_310 = new SqlBuilder();
    b_310.appendSafe(field_308.sqlValue);
    b_310.appendSafe(" ILIKE ");
    b_310.appendString(pattern_309);
    let t_311 = b_310.accumulated;
    return this.where(t_311);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_313
   * @returns {Query}
   */
  select(fields_313) {
    return new Query(this.#tableName_250, this.#conditions_251, fields_313, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {Array<SqlFragment>} exprs_315
   * @returns {Query}
   */
  selectExpr(exprs_315) {
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, exprs_315, this.#lockMode_261);
  }
  /**
   * @param {SafeIdentifier} field_317
   * @param {boolean} ascending_318
   * @returns {Query}
   */
  orderBy(field_317, ascending_318) {
    const nb_319 = this.#orderClauses_253.slice();
    listBuilderAdd_68(nb_319, new OrderClause(field_317, ascending_318, null));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, listBuilderToList_69(nb_319), this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SafeIdentifier} field_321
   * @param {boolean} ascending_322
   * @param {NullsPosition} nulls_323
   * @returns {Query}
   */
  orderByNulls(field_321, ascending_322, nulls_323) {
    const nb_324 = this.#orderClauses_253.slice();
    listBuilderAdd_68(nb_324, new OrderClause(field_321, ascending_322, nulls_323));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, listBuilderToList_69(nb_324), this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {number} n_326
   * @returns {Query}
   */
  limit(n_326) {
    if (n_326 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, n_326, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {number} n_328
   * @returns {Query}
   */
  offset(n_328) {
    if (n_328 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, n_328, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {JoinType} joinType_330
   * @param {SafeIdentifier} table_331
   * @param {SqlFragment} onCondition_332
   * @returns {Query}
   */
  join(joinType_330, table_331, onCondition_332) {
    const nb_333 = this.#joinClauses_256.slice();
    listBuilderAdd_68(nb_333, new JoinClause(joinType_330, table_331, onCondition_332));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, listBuilderToList_69(nb_333), this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SafeIdentifier} table_335
   * @param {SqlFragment} onCondition_336
   * @returns {Query}
   */
  innerJoin(table_335, onCondition_336) {
    let t_337 = new InnerJoin();
    return this.join(t_337, table_335, onCondition_336);
  }
  /**
   * @param {SafeIdentifier} table_339
   * @param {SqlFragment} onCondition_340
   * @returns {Query}
   */
  leftJoin(table_339, onCondition_340) {
    let t_341 = new LeftJoin();
    return this.join(t_341, table_339, onCondition_340);
  }
  /**
   * @param {SafeIdentifier} table_343
   * @param {SqlFragment} onCondition_344
   * @returns {Query}
   */
  rightJoin(table_343, onCondition_344) {
    let t_345 = new RightJoin();
    return this.join(t_345, table_343, onCondition_344);
  }
  /**
   * @param {SafeIdentifier} table_347
   * @param {SqlFragment} onCondition_348
   * @returns {Query}
   */
  fullJoin(table_347, onCondition_348) {
    let t_349 = new FullJoin();
    return this.join(t_349, table_347, onCondition_348);
  }
  /**
   * @param {SafeIdentifier} table_351
   * @returns {Query}
   */
  crossJoin(table_351) {
    const nb_352 = this.#joinClauses_256.slice();
    listBuilderAdd_68(nb_352, new JoinClause(new CrossJoin(), table_351, null));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, listBuilderToList_69(nb_352), this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SafeIdentifier} field_354
   * @returns {Query}
   */
  groupBy(field_354) {
    const nb_355 = this.#groupByFields_257.slice();
    listBuilderAdd_68(nb_355, field_354);
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, listBuilderToList_69(nb_355), this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SqlFragment} condition_357
   * @returns {Query}
   */
  having(condition_357) {
    const nb_358 = this.#havingConditions_258.slice();
    listBuilderAdd_68(nb_358, new AndCondition(condition_357));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, listBuilderToList_69(nb_358), this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {SqlFragment} condition_360
   * @returns {Query}
   */
  orHaving(condition_360) {
    const nb_361 = this.#havingConditions_258.slice();
    listBuilderAdd_68(nb_361, new OrCondition(condition_360));
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, listBuilderToList_69(nb_361), this.#isDistinct_259, this.#selectExprs_260, this.#lockMode_261);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, true, this.#selectExprs_260, this.#lockMode_261);
  }
  /**
   * @param {LockMode} mode_364
   * @returns {Query}
   */
  lock(mode_364) {
    return new Query(this.#tableName_250, this.#conditions_251, this.#selectedFields_252, this.#orderClauses_253, this.#limitVal_254, this.#offsetVal_255, this.#joinClauses_256, this.#groupByFields_257, this.#havingConditions_258, this.#isDistinct_259, this.#selectExprs_260, mode_364);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_366;
    let t_367;
    let t_368;
    const b_369 = new SqlBuilder();
    if (this.#isDistinct_259) {
      b_369.appendSafe("SELECT DISTINCT ");
    } else {
      b_369.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_260.length) {
      b_369.appendFragment(listedGet_179(this.#selectExprs_260, 0));
      let i_370 = 1;
      while (true) {
        t_366 = this.#selectExprs_260.length;
        if (!(i_370 < t_366)) {
          break;
        }
        b_369.appendSafe(", ");
        b_369.appendFragment(listedGet_179(this.#selectExprs_260, i_370));
        i_370 = i_370 + 1 | 0;
      }
    } else if (! this.#selectedFields_252.length) {
      b_369.appendSafe("*");
    } else {
      function fn_371(f_372) {
        return f_372.sqlValue;
      }
      b_369.appendSafe(listedJoin_191(this.#selectedFields_252, ", ", fn_371));
    }
    b_369.appendSafe(" FROM ");
    b_369.appendSafe(this.#tableName_250.sqlValue);
    function fn_373(jc_374) {
      b_369.appendSafe(" ");
      let t_375 = jc_374.joinType.keyword();
      b_369.appendSafe(t_375);
      b_369.appendSafe(" ");
      let t_376 = jc_374.table.sqlValue;
      b_369.appendSafe(t_376);
      const oc_377 = jc_374.onCondition;
      if (!(oc_377 == null)) {
        const oc_378 = oc_377;
        b_369.appendSafe(" ON ");
        b_369.appendFragment(oc_378);
      }
      return;
    }
    this.#joinClauses_256.forEach(fn_373);
    if (! ! this.#conditions_251.length) {
      b_369.appendSafe(" WHERE ");
      b_369.appendFragment(listedGet_179(this.#conditions_251, 0).condition);
      let i_379 = 1;
      while (true) {
        t_367 = this.#conditions_251.length;
        if (!(i_379 < t_367)) {
          break;
        }
        b_369.appendSafe(" ");
        b_369.appendSafe(listedGet_179(this.#conditions_251, i_379).keyword());
        b_369.appendSafe(" ");
        b_369.appendFragment(listedGet_179(this.#conditions_251, i_379).condition);
        i_379 = i_379 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_257.length) {
      b_369.appendSafe(" GROUP BY ");
      function fn_380(f_381) {
        return f_381.sqlValue;
      }
      b_369.appendSafe(listedJoin_191(this.#groupByFields_257, ", ", fn_380));
    }
    if (! ! this.#havingConditions_258.length) {
      b_369.appendSafe(" HAVING ");
      b_369.appendFragment(listedGet_179(this.#havingConditions_258, 0).condition);
      let i_382 = 1;
      while (true) {
        t_368 = this.#havingConditions_258.length;
        if (!(i_382 < t_368)) {
          break;
        }
        b_369.appendSafe(" ");
        b_369.appendSafe(listedGet_179(this.#havingConditions_258, i_382).keyword());
        b_369.appendSafe(" ");
        b_369.appendFragment(listedGet_179(this.#havingConditions_258, i_382).condition);
        i_382 = i_382 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_253.length) {
      b_369.appendSafe(" ORDER BY ");
      let first_383 = true;
      function fn_384(orc_385) {
        let t_386;
        let t_387;
        if (! first_383) {
          b_369.appendSafe(", ");
        }
        first_383 = false;
        let t_388 = orc_385.field.sqlValue;
        b_369.appendSafe(t_388);
        if (orc_385.ascending) {
          t_387 = " ASC";
        } else {
          t_387 = " DESC";
        }
        b_369.appendSafe(t_387);
        const np_389 = orc_385.nullsPos;
        if (!(np_389 == null)) {
          t_386 = np_389.keyword();
          b_369.appendSafe(t_386);
        }
        return;
      }
      this.#orderClauses_253.forEach(fn_384);
    }
    const lv_390 = this.#limitVal_254;
    if (!(lv_390 == null)) {
      const lv_391 = lv_390;
      b_369.appendSafe(" LIMIT ");
      b_369.appendInt32(lv_391);
    }
    const ov_392 = this.#offsetVal_255;
    if (!(ov_392 == null)) {
      const ov_393 = ov_392;
      b_369.appendSafe(" OFFSET ");
      b_369.appendInt32(ov_393);
    }
    const lm_394 = this.#lockMode_261;
    if (!(lm_394 == null)) {
      b_369.appendSafe(lm_394.keyword());
    }
    return b_369.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    let t_396;
    let t_397;
    const b_398 = new SqlBuilder();
    b_398.appendSafe("SELECT COUNT(*) FROM ");
    b_398.appendSafe(this.#tableName_250.sqlValue);
    function fn_399(jc_400) {
      b_398.appendSafe(" ");
      let t_401 = jc_400.joinType.keyword();
      b_398.appendSafe(t_401);
      b_398.appendSafe(" ");
      let t_402 = jc_400.table.sqlValue;
      b_398.appendSafe(t_402);
      const oc2_403 = jc_400.onCondition;
      if (!(oc2_403 == null)) {
        const oc2_404 = oc2_403;
        b_398.appendSafe(" ON ");
        b_398.appendFragment(oc2_404);
      }
      return;
    }
    this.#joinClauses_256.forEach(fn_399);
    if (! ! this.#conditions_251.length) {
      b_398.appendSafe(" WHERE ");
      b_398.appendFragment(listedGet_179(this.#conditions_251, 0).condition);
      let i_405 = 1;
      while (true) {
        t_396 = this.#conditions_251.length;
        if (!(i_405 < t_396)) {
          break;
        }
        b_398.appendSafe(" ");
        b_398.appendSafe(listedGet_179(this.#conditions_251, i_405).keyword());
        b_398.appendSafe(" ");
        b_398.appendFragment(listedGet_179(this.#conditions_251, i_405).condition);
        i_405 = i_405 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_257.length) {
      b_398.appendSafe(" GROUP BY ");
      function fn_406(f_407) {
        return f_407.sqlValue;
      }
      b_398.appendSafe(listedJoin_191(this.#groupByFields_257, ", ", fn_406));
    }
    if (! ! this.#havingConditions_258.length) {
      b_398.appendSafe(" HAVING ");
      b_398.appendFragment(listedGet_179(this.#havingConditions_258, 0).condition);
      let i_408 = 1;
      while (true) {
        t_397 = this.#havingConditions_258.length;
        if (!(i_408 < t_397)) {
          break;
        }
        b_398.appendSafe(" ");
        b_398.appendSafe(listedGet_179(this.#havingConditions_258, i_408).keyword());
        b_398.appendSafe(" ");
        b_398.appendFragment(listedGet_179(this.#havingConditions_258, i_408).condition);
        i_408 = i_408 + 1 | 0;
      }
    }
    return b_398.accumulated;
  }
  /**
   * @param {number} defaultLimit_410
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_410) {
    let return_411;
    let t_412;
    if (defaultLimit_410 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_254 == null)) {
      return_411 = this.toSql();
    } else {
      t_412 = this.limit(defaultLimit_410);
      return_411 = t_412.toSql();
    }
    return return_411;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, selectedFields: Array<SafeIdentifier>, orderClauses: Array<OrderClause>, limitVal: number | null, offsetVal: number | null, joinClauses: Array<JoinClause>, groupByFields: Array<SafeIdentifier>, havingConditions: Array<WhereClause>, isDistinct: boolean, selectExprs: Array<SqlFragment>, lockMode: LockMode | null
   * }}
   * props
   * @returns {Query}
   */
  static["new"](props) {
    return new Query(props.tableName, props.conditions, props.selectedFields, props.orderClauses, props.limitVal, props.offsetVal, props.joinClauses, props.groupByFields, props.havingConditions, props.isDistinct, props.selectExprs, props.lockMode);
  }
  /**
   * @param {SafeIdentifier} tableName_413
   * @param {Array<WhereClause>} conditions_414
   * @param {Array<SafeIdentifier>} selectedFields_415
   * @param {Array<OrderClause>} orderClauses_416
   * @param {number | null} limitVal_417
   * @param {number | null} offsetVal_418
   * @param {Array<JoinClause>} joinClauses_419
   * @param {Array<SafeIdentifier>} groupByFields_420
   * @param {Array<WhereClause>} havingConditions_421
   * @param {boolean} isDistinct_422
   * @param {Array<SqlFragment>} selectExprs_423
   * @param {LockMode | null} lockMode_424
   */
  constructor(tableName_413, conditions_414, selectedFields_415, orderClauses_416, limitVal_417, offsetVal_418, joinClauses_419, groupByFields_420, havingConditions_421, isDistinct_422, selectExprs_423, lockMode_424) {
    super ();
    this.#tableName_250 = tableName_413;
    this.#conditions_251 = conditions_414;
    this.#selectedFields_252 = selectedFields_415;
    this.#orderClauses_253 = orderClauses_416;
    this.#limitVal_254 = limitVal_417;
    this.#offsetVal_255 = offsetVal_418;
    this.#joinClauses_256 = joinClauses_419;
    this.#groupByFields_257 = groupByFields_420;
    this.#havingConditions_258 = havingConditions_421;
    this.#isDistinct_259 = isDistinct_422;
    this.#selectExprs_260 = selectExprs_423;
    this.#lockMode_261 = lockMode_424;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_250;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_251;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_252;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_253;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_254;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_255;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_256;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_257;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_258;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_259;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_260;
  }
  /** @returns {LockMode | null} */
  get lockMode() {
    return this.#lockMode_261;
  }
};
export class SetClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_437;
  /** @type {SqlPart} */
  #value_438;
  /**
   * @param {{
   *   field: SafeIdentifier, value: SqlPart
   * }}
   * props
   * @returns {SetClause}
   */
  static["new"](props) {
    return new SetClause(props.field, props.value);
  }
  /**
   * @param {SafeIdentifier} field_439
   * @param {SqlPart} value_440
   */
  constructor(field_439, value_440) {
    super ();
    this.#field_437 = field_439;
    this.#value_438 = value_440;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_437;
  }
  /** @returns {SqlPart} */
  get value() {
    return this.#value_438;
  }
};
export class UpdateQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_443;
  /** @type {Array<SetClause>} */
  #setClauses_444;
  /** @type {Array<WhereClause>} */
  #conditions_445;
  /** @type {number | null} */
  #limitVal_446;
  /**
   * @param {SafeIdentifier} field_448
   * @param {SqlPart} value_449
   * @returns {UpdateQuery}
   */
  set(field_448, value_449) {
    const nb_450 = this.#setClauses_444.slice();
    listBuilderAdd_68(nb_450, new SetClause(field_448, value_449));
    return new UpdateQuery(this.#tableName_443, listBuilderToList_69(nb_450), this.#conditions_445, this.#limitVal_446);
  }
  /**
   * @param {SqlFragment} condition_452
   * @returns {UpdateQuery}
   */
  where(condition_452) {
    const nb_453 = this.#conditions_445.slice();
    listBuilderAdd_68(nb_453, new AndCondition(condition_452));
    return new UpdateQuery(this.#tableName_443, this.#setClauses_444, listBuilderToList_69(nb_453), this.#limitVal_446);
  }
  /**
   * @param {SqlFragment} condition_455
   * @returns {UpdateQuery}
   */
  orWhere(condition_455) {
    const nb_456 = this.#conditions_445.slice();
    listBuilderAdd_68(nb_456, new OrCondition(condition_455));
    return new UpdateQuery(this.#tableName_443, this.#setClauses_444, listBuilderToList_69(nb_456), this.#limitVal_446);
  }
  /**
   * @param {number} n_458
   * @returns {UpdateQuery}
   */
  limit(n_458) {
    if (n_458 < 0) {
      throw Error();
    }
    return new UpdateQuery(this.#tableName_443, this.#setClauses_444, this.#conditions_445, n_458);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_460;
    let t_461;
    if (! this.#conditions_445.length) {
      throw Error();
    }
    if (! this.#setClauses_444.length) {
      throw Error();
    }
    const b_462 = new SqlBuilder();
    b_462.appendSafe("UPDATE ");
    b_462.appendSafe(this.#tableName_443.sqlValue);
    b_462.appendSafe(" SET ");
    b_462.appendSafe(listedGet_179(this.#setClauses_444, 0).field.sqlValue);
    b_462.appendSafe(" = ");
    b_462.appendPart(listedGet_179(this.#setClauses_444, 0).value);
    let i_463 = 1;
    while (true) {
      t_460 = this.#setClauses_444.length;
      if (!(i_463 < t_460)) {
        break;
      }
      b_462.appendSafe(", ");
      b_462.appendSafe(listedGet_179(this.#setClauses_444, i_463).field.sqlValue);
      b_462.appendSafe(" = ");
      b_462.appendPart(listedGet_179(this.#setClauses_444, i_463).value);
      i_463 = i_463 + 1 | 0;
    }
    b_462.appendSafe(" WHERE ");
    b_462.appendFragment(listedGet_179(this.#conditions_445, 0).condition);
    let i_464 = 1;
    while (true) {
      t_461 = this.#conditions_445.length;
      if (!(i_464 < t_461)) {
        break;
      }
      b_462.appendSafe(" ");
      b_462.appendSafe(listedGet_179(this.#conditions_445, i_464).keyword());
      b_462.appendSafe(" ");
      b_462.appendFragment(listedGet_179(this.#conditions_445, i_464).condition);
      i_464 = i_464 + 1 | 0;
    }
    const lv_465 = this.#limitVal_446;
    if (!(lv_465 == null)) {
      const lv_466 = lv_465;
      b_462.appendSafe(" LIMIT ");
      b_462.appendInt32(lv_466);
    }
    return b_462.accumulated;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, setClauses: Array<SetClause>, conditions: Array<WhereClause>, limitVal: number | null
   * }}
   * props
   * @returns {UpdateQuery}
   */
  static["new"](props) {
    return new UpdateQuery(props.tableName, props.setClauses, props.conditions, props.limitVal);
  }
  /**
   * @param {SafeIdentifier} tableName_467
   * @param {Array<SetClause>} setClauses_468
   * @param {Array<WhereClause>} conditions_469
   * @param {number | null} limitVal_470
   */
  constructor(tableName_467, setClauses_468, conditions_469, limitVal_470) {
    super ();
    this.#tableName_443 = tableName_467;
    this.#setClauses_444 = setClauses_468;
    this.#conditions_445 = conditions_469;
    this.#limitVal_446 = limitVal_470;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_443;
  }
  /** @returns {Array<SetClause>} */
  get setClauses() {
    return this.#setClauses_444;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_445;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_446;
  }
};
export class DeleteQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_475;
  /** @type {Array<WhereClause>} */
  #conditions_476;
  /** @type {number | null} */
  #limitVal_477;
  /**
   * @param {SqlFragment} condition_479
   * @returns {DeleteQuery}
   */
  where(condition_479) {
    const nb_480 = this.#conditions_476.slice();
    listBuilderAdd_68(nb_480, new AndCondition(condition_479));
    return new DeleteQuery(this.#tableName_475, listBuilderToList_69(nb_480), this.#limitVal_477);
  }
  /**
   * @param {SqlFragment} condition_482
   * @returns {DeleteQuery}
   */
  orWhere(condition_482) {
    const nb_483 = this.#conditions_476.slice();
    listBuilderAdd_68(nb_483, new OrCondition(condition_482));
    return new DeleteQuery(this.#tableName_475, listBuilderToList_69(nb_483), this.#limitVal_477);
  }
  /**
   * @param {number} n_485
   * @returns {DeleteQuery}
   */
  limit(n_485) {
    if (n_485 < 0) {
      throw Error();
    }
    return new DeleteQuery(this.#tableName_475, this.#conditions_476, n_485);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_487;
    if (! this.#conditions_476.length) {
      throw Error();
    }
    const b_488 = new SqlBuilder();
    b_488.appendSafe("DELETE FROM ");
    b_488.appendSafe(this.#tableName_475.sqlValue);
    b_488.appendSafe(" WHERE ");
    b_488.appendFragment(listedGet_179(this.#conditions_476, 0).condition);
    let i_489 = 1;
    while (true) {
      t_487 = this.#conditions_476.length;
      if (!(i_489 < t_487)) {
        break;
      }
      b_488.appendSafe(" ");
      b_488.appendSafe(listedGet_179(this.#conditions_476, i_489).keyword());
      b_488.appendSafe(" ");
      b_488.appendFragment(listedGet_179(this.#conditions_476, i_489).condition);
      i_489 = i_489 + 1 | 0;
    }
    const lv_490 = this.#limitVal_477;
    if (!(lv_490 == null)) {
      const lv_491 = lv_490;
      b_488.appendSafe(" LIMIT ");
      b_488.appendInt32(lv_491);
    }
    return b_488.accumulated;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, conditions: Array<WhereClause>, limitVal: number | null
   * }}
   * props
   * @returns {DeleteQuery}
   */
  static["new"](props) {
    return new DeleteQuery(props.tableName, props.conditions, props.limitVal);
  }
  /**
   * @param {SafeIdentifier} tableName_492
   * @param {Array<WhereClause>} conditions_493
   * @param {number | null} limitVal_494
   */
  constructor(tableName_492, conditions_493, limitVal_494) {
    super ();
    this.#tableName_475 = tableName_492;
    this.#conditions_476 = conditions_493;
    this.#limitVal_477 = limitVal_494;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_475;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_476;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_477;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_499 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_500;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_500;
  }
  /** @param {string} _value_502 */
  constructor(_value_502) {
    super ();
    this.#_value_500 = _value_502;
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
  #name_503;
  /** @type {FieldType} */
  #fieldType_504;
  /** @type {boolean} */
  #nullable_505;
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
   * @param {SafeIdentifier} name_506
   * @param {FieldType} fieldType_507
   * @param {boolean} nullable_508
   */
  constructor(name_506, fieldType_507, nullable_508) {
    super ();
    this.#name_503 = name_506;
    this.#fieldType_504 = fieldType_507;
    this.#nullable_505 = nullable_508;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_503;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_504;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_505;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_512;
  /** @type {Array<FieldDef>} */
  #fields_513;
  /**
   * @param {string} name_515
   * @returns {FieldDef}
   */
  field(name_515) {
    let return_516;
    fn_517: {
      const this_518 = this.#fields_513;
      const n_519 = this_518.length;
      let i_520 = 0;
      while (i_520 < n_519) {
        const el_521 = listedGet_179(this_518, i_520);
        i_520 = i_520 + 1 | 0;
        const f_522 = el_521;
        if (f_522.name.sqlValue === name_515) {
          return_516 = f_522;
          break fn_517;
        }
      }
      throw Error();
    }
    return return_516;
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
   * @param {SafeIdentifier} tableName_523
   * @param {Array<FieldDef>} fields_524
   */
  constructor(tableName_523, fields_524) {
    super ();
    this.#tableName_512 = tableName_523;
    this.#fields_513 = fields_524;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_512;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_513;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_527;
  /** @param {string} sqlSource_529 */
  appendSafe(sqlSource_529) {
    let t_530 = new SqlSource(sqlSource_529);
    listBuilderAdd_68(this.#buffer_527, t_530);
    return;
  }
  /** @param {SqlFragment} fragment_532 */
  appendFragment(fragment_532) {
    let t_533 = fragment_532.parts;
    listBuilderAddAll_534(this.#buffer_527, t_533);
    return;
  }
  /** @param {SqlPart} part_536 */
  appendPart(part_536) {
    listBuilderAdd_68(this.#buffer_527, part_536);
    return;
  }
  /** @param {Array<SqlPart>} values_538 */
  appendPartList(values_538) {
    const this541 = this;
    function fn_539(x_540) {
      this541.appendPart(x_540);
      return;
    }
    this.#appendList_542(values_538, fn_539);
    return;
  }
  /** @param {boolean} value_544 */
  appendBoolean(value_544) {
    let t_545 = new SqlBoolean(value_544);
    listBuilderAdd_68(this.#buffer_527, t_545);
    return;
  }
  /** @param {Array<boolean>} values_547 */
  appendBooleanList(values_547) {
    const this550 = this;
    function fn_548(x_549) {
      this550.appendBoolean(x_549);
      return;
    }
    this.#appendList_542(values_547, fn_548);
    return;
  }
  /** @param {globalThis.Date} value_552 */
  appendDate(value_552) {
    let t_553 = new SqlDate(value_552);
    listBuilderAdd_68(this.#buffer_527, t_553);
    return;
  }
  /** @param {Array<globalThis.Date>} values_555 */
  appendDateList(values_555) {
    const this558 = this;
    function fn_556(x_557) {
      this558.appendDate(x_557);
      return;
    }
    this.#appendList_542(values_555, fn_556);
    return;
  }
  /** @param {number} value_560 */
  appendFloat64(value_560) {
    let t_561 = new SqlFloat64(value_560);
    listBuilderAdd_68(this.#buffer_527, t_561);
    return;
  }
  /** @param {Array<number>} values_563 */
  appendFloat64List(values_563) {
    const this566 = this;
    function fn_564(x_565) {
      this566.appendFloat64(x_565);
      return;
    }
    this.#appendList_542(values_563, fn_564);
    return;
  }
  /** @param {number} value_568 */
  appendInt32(value_568) {
    let t_569 = new SqlInt32(value_568);
    listBuilderAdd_68(this.#buffer_527, t_569);
    return;
  }
  /** @param {Array<number>} values_571 */
  appendInt32List(values_571) {
    const this574 = this;
    function fn_572(x_573) {
      this574.appendInt32(x_573);
      return;
    }
    this.#appendList_542(values_571, fn_572);
    return;
  }
  /** @param {bigint} value_576 */
  appendInt64(value_576) {
    let t_577 = new SqlInt64(value_576);
    listBuilderAdd_68(this.#buffer_527, t_577);
    return;
  }
  /** @param {Array<bigint>} values_579 */
  appendInt64List(values_579) {
    const this582 = this;
    function fn_580(x_581) {
      this582.appendInt64(x_581);
      return;
    }
    this.#appendList_542(values_579, fn_580);
    return;
  }
  /** @param {string} value_584 */
  appendString(value_584) {
    let t_585 = new SqlString(value_584);
    listBuilderAdd_68(this.#buffer_527, t_585);
    return;
  }
  /** @param {Array<string>} values_587 */
  appendStringList(values_587) {
    const this590 = this;
    function fn_588(x_589) {
      this590.appendString(x_589);
      return;
    }
    this.#appendList_542(values_587, fn_588);
    return;
  }
  /**
   * @template {unknown} T_597
   * @param {Array<T_597>} values_592
   * @param {(arg0: T_597) => void} appendValue_593
   */
  #appendList_542(values_592, appendValue_593) {
    let t_594;
    let t_595;
    let i_596 = 0;
    while (true) {
      t_594 = values_592.length;
      if (!(i_596 < t_594)) {
        break;
      }
      if (i_596 > 0) {
        this.appendSafe(", ");
      }
      t_595 = listedGet_179(values_592, i_596);
      appendValue_593(t_595);
      i_596 = i_596 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_69(this.#buffer_527));
  }
  constructor() {
    super ();
    let t_599 = [];
    this.#buffer_527 = t_599;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_600;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_603;
    const builder_604 = [""];
    let i_605 = 0;
    while (true) {
      t_603 = this.#parts_600.length;
      if (!(i_605 < t_603)) {
        break;
      }
      listedGet_179(this.#parts_600, i_605).formatTo(builder_604);
      i_605 = i_605 + 1 | 0;
    }
    return builder_604[0];
  }
  /** @param {Array<SqlPart>} parts_606 */
  constructor(parts_606) {
    super ();
    this.#parts_600 = parts_606;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_600;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_609 */
  formatTo(builder_609) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_610;
  /** @param {globalThis.Array<string>} builder_612 */
  formatTo(builder_612) {
    builder_612[0] += this.#source_610;
    return;
  }
  /** @param {string} source_613 */
  constructor(source_613) {
    super ();
    this.#source_610 = source_613;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_610;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_615;
  /** @param {globalThis.Array<string>} builder_617 */
  formatTo(builder_617) {
    let t_618;
    if (this.#value_615) {
      t_618 = "TRUE";
    } else {
      t_618 = "FALSE";
    }
    builder_617[0] += t_618;
    return;
  }
  /** @param {boolean} value_619 */
  constructor(value_619) {
    super ();
    this.#value_615 = value_619;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_615;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_621;
  /** @param {globalThis.Array<string>} builder_623 */
  formatTo(builder_623) {
    builder_623[0] += "'";
    let t_624 = this.#value_621.toISOString().split("T")[0];
    function fn_625(c_626) {
      if (c_626 === 39) {
        builder_623[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_627(builder_623, c_626);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_628(t_624, fn_625);
    builder_623[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_629 */
  constructor(value_629) {
    super ();
    this.#value_621 = value_629;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_621;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_631;
  /** @param {globalThis.Array<string>} builder_633 */
  formatTo(builder_633) {
    let t_634;
    let t_635;
    const s_636 = float64ToString_637(this.#value_631);
    if (s_636 === "NaN") {
      t_635 = true;
    } else {
      if (s_636 === "Infinity") {
        t_634 = true;
      } else {
        t_634 = s_636 === "-Infinity";
      }
      t_635 = t_634;
    }
    if (t_635) {
      builder_633[0] += "NULL";
    } else {
      builder_633[0] += s_636;
    }
    return;
  }
  /** @param {number} value_638 */
  constructor(value_638) {
    super ();
    this.#value_631 = value_638;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_631;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_640;
  /** @param {globalThis.Array<string>} builder_642 */
  formatTo(builder_642) {
    let t_643 = this.#value_640.toString();
    builder_642[0] += t_643;
    return;
  }
  /** @param {number} value_644 */
  constructor(value_644) {
    super ();
    this.#value_640 = value_644;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_640;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_646;
  /** @param {globalThis.Array<string>} builder_648 */
  formatTo(builder_648) {
    let t_649 = this.#value_646.toString();
    builder_648[0] += t_649;
    return;
  }
  /** @param {bigint} value_650 */
  constructor(value_650) {
    super ();
    this.#value_646 = value_650;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_646;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_652;
  /** @param {globalThis.Array<string>} builder_654 */
  formatTo(builder_654) {
    builder_654[0] += "'";
    function fn_655(c_656) {
      if (c_656 === 39) {
        builder_654[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_627(builder_654, c_656);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_628(this.#value_652, fn_655);
    builder_654[0] += "'";
    return;
  }
  /** @param {string} value_657 */
  constructor(value_657) {
    super ();
    this.#value_652 = value_657;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_652;
  }
};
/**
 * @param {TableDef} tableDef_659
 * @param {Map<string, string>} params_660
 * @returns {Changeset}
 */
export function changeset(tableDef_659, params_660) {
  let t_661 = mapConstructor_662(Object.freeze([]));
  return new ChangesetImpl_30(tableDef_659, params_660, t_661, Object.freeze([]), true);
};
/**
 * @param {number} c_664
 * @returns {boolean}
 */
function isIdentStart_663(c_664) {
  let return_665;
  let t_666;
  let t_667;
  if (c_664 >= 97) {
    t_666 = c_664 <= 122;
  } else {
    t_666 = false;
  }
  if (t_666) {
    return_665 = true;
  } else {
    if (c_664 >= 65) {
      t_667 = c_664 <= 90;
    } else {
      t_667 = false;
    }
    if (t_667) {
      return_665 = true;
    } else {
      return_665 = c_664 === 95;
    }
  }
  return return_665;
}
/**
 * @param {number} c_669
 * @returns {boolean}
 */
function isIdentPart_668(c_669) {
  let return_670;
  if (isIdentStart_663(c_669)) {
    return_670 = true;
  } else if (c_669 >= 48) {
    return_670 = c_669 <= 57;
  } else {
    return_670 = false;
  }
  return return_670;
}
/**
 * @param {string} name_671
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_671) {
  let t_672;
  if (! name_671) {
    throw Error();
  }
  let idx_673 = 0;
  if (! isIdentStart_663(stringGet_674(name_671, idx_673))) {
    throw Error();
  }
  let t_675 = stringNext_676(name_671, idx_673);
  idx_673 = t_675;
  while (true) {
    if (!(name_671.length > idx_673)) {
      break;
    }
    if (! isIdentPart_668(stringGet_674(name_671, idx_673))) {
      throw Error();
    }
    t_672 = stringNext_676(name_671, idx_673);
    idx_673 = t_672;
  }
  return new ValidatedIdentifier_499(name_671);
};
/**
 * @param {TableDef} tableDef_890
 * @param {number} id_891
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_890, id_891) {
  const b_892 = new SqlBuilder();
  b_892.appendSafe("DELETE FROM ");
  b_892.appendSafe(tableDef_890.tableName.sqlValue);
  b_892.appendSafe(" WHERE id = ");
  b_892.appendInt32(id_891);
  return b_892.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_893
 * @returns {Query}
 */
export function from(tableName_893) {
  return new Query(tableName_893, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} table_894
 * @param {SafeIdentifier} column_895
 * @returns {SqlFragment}
 */
export function col(table_894, column_895) {
  const b_896 = new SqlBuilder();
  b_896.appendSafe(table_894.sqlValue);
  b_896.appendSafe(".");
  b_896.appendSafe(column_895.sqlValue);
  return b_896.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_897 = new SqlBuilder();
  b_897.appendSafe("COUNT(*)");
  return b_897.accumulated;
};
/**
 * @param {SafeIdentifier} field_898
 * @returns {SqlFragment}
 */
export function countCol(field_898) {
  const b_899 = new SqlBuilder();
  b_899.appendSafe("COUNT(");
  b_899.appendSafe(field_898.sqlValue);
  b_899.appendSafe(")");
  return b_899.accumulated;
};
/**
 * @param {SafeIdentifier} field_900
 * @returns {SqlFragment}
 */
export function sumCol(field_900) {
  const b_901 = new SqlBuilder();
  b_901.appendSafe("SUM(");
  b_901.appendSafe(field_900.sqlValue);
  b_901.appendSafe(")");
  return b_901.accumulated;
};
/**
 * @param {SafeIdentifier} field_902
 * @returns {SqlFragment}
 */
export function avgCol(field_902) {
  const b_903 = new SqlBuilder();
  b_903.appendSafe("AVG(");
  b_903.appendSafe(field_902.sqlValue);
  b_903.appendSafe(")");
  return b_903.accumulated;
};
/**
 * @param {SafeIdentifier} field_904
 * @returns {SqlFragment}
 */
export function minCol(field_904) {
  const b_905 = new SqlBuilder();
  b_905.appendSafe("MIN(");
  b_905.appendSafe(field_904.sqlValue);
  b_905.appendSafe(")");
  return b_905.accumulated;
};
/**
 * @param {SafeIdentifier} field_906
 * @returns {SqlFragment}
 */
export function maxCol(field_906) {
  const b_907 = new SqlBuilder();
  b_907.appendSafe("MAX(");
  b_907.appendSafe(field_906.sqlValue);
  b_907.appendSafe(")");
  return b_907.accumulated;
};
/**
 * @param {Query} a_908
 * @param {Query} b_909
 * @returns {SqlFragment}
 */
export function unionSql(a_908, b_909) {
  const sb_910 = new SqlBuilder();
  sb_910.appendSafe("(");
  sb_910.appendFragment(a_908.toSql());
  sb_910.appendSafe(") UNION (");
  sb_910.appendFragment(b_909.toSql());
  sb_910.appendSafe(")");
  return sb_910.accumulated;
};
/**
 * @param {Query} a_911
 * @param {Query} b_912
 * @returns {SqlFragment}
 */
export function unionAllSql(a_911, b_912) {
  const sb_913 = new SqlBuilder();
  sb_913.appendSafe("(");
  sb_913.appendFragment(a_911.toSql());
  sb_913.appendSafe(") UNION ALL (");
  sb_913.appendFragment(b_912.toSql());
  sb_913.appendSafe(")");
  return sb_913.accumulated;
};
/**
 * @param {Query} a_914
 * @param {Query} b_915
 * @returns {SqlFragment}
 */
export function intersectSql(a_914, b_915) {
  const sb_916 = new SqlBuilder();
  sb_916.appendSafe("(");
  sb_916.appendFragment(a_914.toSql());
  sb_916.appendSafe(") INTERSECT (");
  sb_916.appendFragment(b_915.toSql());
  sb_916.appendSafe(")");
  return sb_916.accumulated;
};
/**
 * @param {Query} a_917
 * @param {Query} b_918
 * @returns {SqlFragment}
 */
export function exceptSql(a_917, b_918) {
  const sb_919 = new SqlBuilder();
  sb_919.appendSafe("(");
  sb_919.appendFragment(a_917.toSql());
  sb_919.appendSafe(") EXCEPT (");
  sb_919.appendFragment(b_918.toSql());
  sb_919.appendSafe(")");
  return sb_919.accumulated;
};
/**
 * @param {Query} q_920
 * @param {SafeIdentifier} alias_921
 * @returns {SqlFragment}
 */
export function subquery(q_920, alias_921) {
  const b_922 = new SqlBuilder();
  b_922.appendSafe("(");
  b_922.appendFragment(q_920.toSql());
  b_922.appendSafe(") AS ");
  b_922.appendSafe(alias_921.sqlValue);
  return b_922.accumulated;
};
/**
 * @param {Query} q_923
 * @returns {SqlFragment}
 */
export function existsSql(q_923) {
  const b_924 = new SqlBuilder();
  b_924.appendSafe("EXISTS (");
  b_924.appendFragment(q_923.toSql());
  b_924.appendSafe(")");
  return b_924.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_925
 * @returns {UpdateQuery}
 */
export function update(tableName_925) {
  return new UpdateQuery(tableName_925, Object.freeze([]), Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} tableName_926
 * @returns {DeleteQuery}
 */
export function deleteFrom(tableName_926) {
  return new DeleteQuery(tableName_926, Object.freeze([]), null);
};
