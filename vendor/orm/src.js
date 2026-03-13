import {
  type as type__6, cmpFloat as cmpFloat__242, listBuilderAdd as listBuilderAdd_90, listBuilderToList as listBuilderToList_91, mapBuilderConstructor as mapBuilderConstructor_95, mappedGetOr as mappedGetOr_101, mapBuilderSet as mapBuilderSet_103, mappedToMap as mappedToMap_104, stringCountBetween as stringCountBetween_133, stringToInt32 as stringToInt32_142, stringToInt64 as stringToInt64_151, stringToFloat64 as stringToFloat64_160, mappedToList as mappedToList_181, listedGet as listedGet_183, float64ToString as float64ToString_243, requireStringIndex as requireStringIndex_295, stringNext as stringNext_317, stringGet as stringGet_320, listedJoin as listedJoin_376, listBuilderAddAll as listBuilderAddAll_711, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_804, stringForEach as stringForEach_805, mapConstructor as mapConstructor_840, panic as panic_857, pairConstructor as pairConstructor_862
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
export class NumberValidationOpts extends type__6() {
  /** @type {number | null} */
  #greaterThan_7;
  /** @type {number | null} */
  #lessThan_8;
  /** @type {number | null} */
  #greaterThanOrEqual_9;
  /** @type {number | null} */
  #lessThanOrEqual_10;
  /** @type {number | null} */
  #equalTo_11;
  /**
   * @param {{
   *   greaterThan: number | null, lessThan: number | null, greaterThanOrEqual: number | null, lessThanOrEqual: number | null, equalTo: number | null
   * }}
   * props
   * @returns {NumberValidationOpts}
   */
  static["new"](props) {
    return new NumberValidationOpts(props.greaterThan, props.lessThan, props.greaterThanOrEqual, props.lessThanOrEqual, props.equalTo);
  }
  /**
   * @param {number | null} greaterThan_12
   * @param {number | null} lessThan_13
   * @param {number | null} greaterThanOrEqual_14
   * @param {number | null} lessThanOrEqual_15
   * @param {number | null} equalTo_16
   */
  constructor(greaterThan_12, lessThan_13, greaterThanOrEqual_14, lessThanOrEqual_15, equalTo_16) {
    super ();
    this.#greaterThan_7 = greaterThan_12;
    this.#lessThan_8 = lessThan_13;
    this.#greaterThanOrEqual_9 = greaterThanOrEqual_14;
    this.#lessThanOrEqual_10 = lessThanOrEqual_15;
    this.#equalTo_11 = equalTo_16;
    return;
  }
  /** @returns {number | null} */
  get greaterThan() {
    return this.#greaterThan_7;
  }
  /** @returns {number | null} */
  get lessThan() {
    return this.#lessThan_8;
  }
  /** @returns {number | null} */
  get greaterThanOrEqual() {
    return this.#greaterThanOrEqual_9;
  }
  /** @returns {number | null} */
  get lessThanOrEqual() {
    return this.#lessThanOrEqual_10;
  }
  /** @returns {number | null} */
  get equalTo() {
    return this.#equalTo_11;
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
   * @param {Array<SafeIdentifier>} allowedFields_27
   * @returns {Changeset}
   */
  cast(allowedFields_27) {
    null;
  }
  /**
   * @param {Array<SafeIdentifier>} fields_29
   * @returns {Changeset}
   */
  validateRequired(fields_29) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_31
   * @param {number} min_32
   * @param {number} max_33
   * @returns {Changeset}
   */
  validateLength(field_31, min_32, max_33) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_35
   * @returns {Changeset}
   */
  validateInt(field_35) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_37
   * @returns {Changeset}
   */
  validateInt64(field_37) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_39
   * @returns {Changeset}
   */
  validateFloat(field_39) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_41
   * @returns {Changeset}
   */
  validateBool(field_41) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_43
   * @param {string} value_44
   * @returns {Changeset}
   */
  putChange(field_43, value_44) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_46
   * @returns {string}
   */
  getChange(field_46) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_48
   * @returns {Changeset}
   */
  deleteChange(field_48) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_50
   * @param {Array<string>} allowed_51
   * @returns {Changeset}
   */
  validateInclusion(field_50, allowed_51) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_53
   * @param {Array<string>} disallowed_54
   * @returns {Changeset}
   */
  validateExclusion(field_53, disallowed_54) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_56
   * @param {NumberValidationOpts} opts_57
   * @returns {Changeset}
   */
  validateNumber(field_56, opts_57) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_59
   * @returns {Changeset}
   */
  validateAcceptance(field_59) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_61
   * @param {SafeIdentifier} confirmationField_62
   * @returns {Changeset}
   */
  validateConfirmation(field_61, confirmationField_62) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_64
   * @param {string} substring_65
   * @returns {Changeset}
   */
  validateContains(field_64, substring_65) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_67
   * @param {string} prefix_68
   * @returns {Changeset}
   */
  validateStartsWith(field_67, prefix_68) {
    null;
  }
  /**
   * @param {SafeIdentifier} field_70
   * @param {string} suffix_71
   * @returns {Changeset}
   */
  validateEndsWith(field_70, suffix_71) {
    null;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    null;
  }
  /**
   * @param {number} id_74
   * @returns {SqlFragment}
   */
  toUpdateSql(id_74) {
    null;
  }
};
class ChangesetImpl_75 extends type__6(Changeset) {
  /** @type {TableDef} */
  #_tableDef_76;
  /** @type {Map<string, string>} */
  #_params_77;
  /** @type {Map<string, string>} */
  #_changes_78;
  /** @type {Array<ChangesetError>} */
  #_errors_79;
  /** @type {boolean} */
  #_isValid_80;
  /** @returns {TableDef} */
  get tableDef() {
    return this.#_tableDef_76;
  }
  /** @returns {Map<string, string>} */
  get changes() {
    return this.#_changes_78;
  }
  /** @returns {Array<ChangesetError>} */
  get errors() {
    return this.#_errors_79;
  }
  /** @returns {boolean} */
  get isValid() {
    return this.#_isValid_80;
  }
  /**
   * @param {string} field_87
   * @param {string} message_88
   * @returns {Changeset}
   */
  #addError_86(field_87, message_88) {
    const eb_89 = this.#_errors_79.slice();
    listBuilderAdd_90(eb_89, new ChangesetError(field_87, message_88));
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, this.#_changes_78, listBuilderToList_91(eb_89), false);
  }
  /**
   * @param {Array<SafeIdentifier>} allowedFields_93
   * @returns {Changeset}
   */
  cast(allowedFields_93) {
    const this102 = this;
    const mb_94 = mapBuilderConstructor_95();
    function fn_96(f_97) {
      let t_98;
      let t_99 = f_97.sqlValue;
      const val_100 = mappedGetOr_101(this102.#_params_77, t_99, "");
      if (! ! val_100) {
        t_98 = f_97.sqlValue;
        mapBuilderSet_103(mb_94, t_98, val_100);
      }
      return;
    }
    allowedFields_93.forEach(fn_96);
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_104(mb_94), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_106
   * @returns {Changeset}
   */
  validateRequired(fields_106) {
    const this119 = this;
    let return_107;
    let t_108;
    let t_109;
    let t_110;
    let t_111;
    fn_112: {
      if (! this.#_isValid_80) {
        return_107 = this;
        break fn_112;
      }
      const eb_113 = this.#_errors_79.slice();
      let valid_114 = true;
      function fn_115(f_116) {
        let t_117;
        let t_118 = f_116.sqlValue;
        if (! this119.#_changes_78.has(t_118)) {
          t_117 = new ChangesetError(f_116.sqlValue, "is required");
          listBuilderAdd_90(eb_113, t_117);
          valid_114 = false;
        }
        return;
      }
      fields_106.forEach(fn_115);
      t_109 = this.#_tableDef_76;
      t_110 = this.#_params_77;
      t_111 = this.#_changes_78;
      t_108 = listBuilderToList_91(eb_113);
      return_107 = new ChangesetImpl_75(t_109, t_110, t_111, t_108, valid_114);
    }
    return return_107;
  }
  /**
   * @param {SafeIdentifier} field_121
   * @param {number} min_122
   * @param {number} max_123
   * @returns {Changeset}
   */
  validateLength(field_121, min_122, max_123) {
    let return_124;
    let t_125;
    let t_126;
    let t_127;
    let t_128;
    let t_129;
    fn_130: {
      if (! this.#_isValid_80) {
        return_124 = this;
        break fn_130;
      }
      t_125 = field_121.sqlValue;
      const val_131 = mappedGetOr_101(this.#_changes_78, t_125, "");
      const len_132 = stringCountBetween_133(val_131, 0, val_131.length);
      if (len_132 < min_122) {
        t_129 = true;
      } else {
        t_129 = len_132 > max_123;
      }
      if (t_129) {
        t_126 = field_121.sqlValue;
        t_127 = min_122.toString();
        t_128 = max_123.toString();
        return_124 = this.#addError_86(t_126, "must be between " + t_127 + " and " + t_128 + " characters");
        break fn_130;
      }
      return_124 = this;
    }
    return return_124;
  }
  /**
   * @param {SafeIdentifier} field_135
   * @returns {Changeset}
   */
  validateInt(field_135) {
    let return_136;
    let t_137;
    let t_138;
    fn_139: {
      if (! this.#_isValid_80) {
        return_136 = this;
        break fn_139;
      }
      t_137 = field_135.sqlValue;
      const val_140 = mappedGetOr_101(this.#_changes_78, t_137, "");
      if (! val_140) {
        return_136 = this;
        break fn_139;
      }
      let parseOk_141;
      try {
        stringToInt32_142(val_140);
        parseOk_141 = true;
      } catch {
        parseOk_141 = false;
      }
      if (! parseOk_141) {
        t_138 = field_135.sqlValue;
        return_136 = this.#addError_86(t_138, "must be an integer");
        break fn_139;
      }
      return_136 = this;
    }
    return return_136;
  }
  /**
   * @param {SafeIdentifier} field_144
   * @returns {Changeset}
   */
  validateInt64(field_144) {
    let return_145;
    let t_146;
    let t_147;
    fn_148: {
      if (! this.#_isValid_80) {
        return_145 = this;
        break fn_148;
      }
      t_146 = field_144.sqlValue;
      const val_149 = mappedGetOr_101(this.#_changes_78, t_146, "");
      if (! val_149) {
        return_145 = this;
        break fn_148;
      }
      let parseOk_150;
      try {
        stringToInt64_151(val_149);
        parseOk_150 = true;
      } catch {
        parseOk_150 = false;
      }
      if (! parseOk_150) {
        t_147 = field_144.sqlValue;
        return_145 = this.#addError_86(t_147, "must be a 64-bit integer");
        break fn_148;
      }
      return_145 = this;
    }
    return return_145;
  }
  /**
   * @param {SafeIdentifier} field_153
   * @returns {Changeset}
   */
  validateFloat(field_153) {
    let return_154;
    let t_155;
    let t_156;
    fn_157: {
      if (! this.#_isValid_80) {
        return_154 = this;
        break fn_157;
      }
      t_155 = field_153.sqlValue;
      const val_158 = mappedGetOr_101(this.#_changes_78, t_155, "");
      if (! val_158) {
        return_154 = this;
        break fn_157;
      }
      let parseOk_159;
      try {
        stringToFloat64_160(val_158);
        parseOk_159 = true;
      } catch {
        parseOk_159 = false;
      }
      if (! parseOk_159) {
        t_156 = field_153.sqlValue;
        return_154 = this.#addError_86(t_156, "must be a number");
        break fn_157;
      }
      return_154 = this;
    }
    return return_154;
  }
  /**
   * @param {SafeIdentifier} field_162
   * @returns {Changeset}
   */
  validateBool(field_162) {
    let return_163;
    let t_164;
    let t_165;
    let t_166;
    let t_167;
    let t_168;
    let t_169;
    let t_170;
    fn_171: {
      if (! this.#_isValid_80) {
        return_163 = this;
        break fn_171;
      }
      t_164 = field_162.sqlValue;
      const val_172 = mappedGetOr_101(this.#_changes_78, t_164, "");
      if (! val_172) {
        return_163 = this;
        break fn_171;
      }
      let isTrue_173;
      if (val_172 === "true") {
        isTrue_173 = true;
      } else {
        if (val_172 === "1") {
          t_167 = true;
        } else {
          if (val_172 === "yes") {
            t_166 = true;
          } else {
            t_166 = val_172 === "on";
          }
          t_167 = t_166;
        }
        isTrue_173 = t_167;
      }
      let isFalse_174;
      if (val_172 === "false") {
        isFalse_174 = true;
      } else {
        if (val_172 === "0") {
          t_169 = true;
        } else {
          if (val_172 === "no") {
            t_168 = true;
          } else {
            t_168 = val_172 === "off";
          }
          t_169 = t_168;
        }
        isFalse_174 = t_169;
      }
      if (! isTrue_173) {
        t_170 = ! isFalse_174;
      } else {
        t_170 = false;
      }
      if (t_170) {
        t_165 = field_162.sqlValue;
        return_163 = this.#addError_86(t_165, "must be a boolean (true/false/1/0/yes/no/on/off)");
        break fn_171;
      }
      return_163 = this;
    }
    return return_163;
  }
  /**
   * @param {SafeIdentifier} field_176
   * @param {string} value_177
   * @returns {Changeset}
   */
  putChange(field_176, value_177) {
    let t_178;
    const mb_179 = mapBuilderConstructor_95();
    const pairs_180 = mappedToList_181(this.#_changes_78);
    let i_182 = 0;
    while (true) {
      t_178 = pairs_180.length;
      if (!(i_182 < t_178)) {
        break;
      }
      mapBuilderSet_103(mb_179, listedGet_183(pairs_180, i_182).key, listedGet_183(pairs_180, i_182).value);
      i_182 = i_182 + 1 | 0;
    }
    mapBuilderSet_103(mb_179, field_176.sqlValue, value_177);
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_104(mb_179), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {SafeIdentifier} field_185
   * @returns {string}
   */
  getChange(field_185) {
    let t_186 = field_185.sqlValue;
    if (! this.#_changes_78.has(t_186)) {
      throw Error();
    }
    let t_187 = field_185.sqlValue;
    return mappedGetOr_101(this.#_changes_78, t_187, "");
  }
  /**
   * @param {SafeIdentifier} field_189
   * @returns {Changeset}
   */
  deleteChange(field_189) {
    let t_190;
    const mb_191 = mapBuilderConstructor_95();
    const pairs_192 = mappedToList_181(this.#_changes_78);
    let i_193 = 0;
    while (true) {
      t_190 = pairs_192.length;
      if (!(i_193 < t_190)) {
        break;
      }
      if (listedGet_183(pairs_192, i_193).key !== field_189.sqlValue) {
        mapBuilderSet_103(mb_191, listedGet_183(pairs_192, i_193).key, listedGet_183(pairs_192, i_193).value);
      }
      i_193 = i_193 + 1 | 0;
    }
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_104(mb_191), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {SafeIdentifier} field_195
   * @param {Array<string>} allowed_196
   * @returns {Changeset}
   */
  validateInclusion(field_195, allowed_196) {
    let return_197;
    let t_198;
    let t_199;
    let t_200;
    fn_201: {
      if (! this.#_isValid_80) {
        return_197 = this;
        break fn_201;
      }
      t_198 = field_195.sqlValue;
      if (! this.#_changes_78.has(t_198)) {
        return_197 = this;
        break fn_201;
      }
      t_199 = field_195.sqlValue;
      const val_202 = mappedGetOr_101(this.#_changes_78, t_199, "");
      let found_203 = false;
      function fn_204(a_205) {
        if (a_205 === val_202) {
          found_203 = true;
        }
        return;
      }
      allowed_196.forEach(fn_204);
      if (! found_203) {
        t_200 = field_195.sqlValue;
        return_197 = this.#addError_86(t_200, "is not included in the list");
        break fn_201;
      }
      return_197 = this;
    }
    return return_197;
  }
  /**
   * @param {SafeIdentifier} field_207
   * @param {Array<string>} disallowed_208
   * @returns {Changeset}
   */
  validateExclusion(field_207, disallowed_208) {
    let return_209;
    let t_210;
    let t_211;
    let t_212;
    fn_213: {
      if (! this.#_isValid_80) {
        return_209 = this;
        break fn_213;
      }
      t_210 = field_207.sqlValue;
      if (! this.#_changes_78.has(t_210)) {
        return_209 = this;
        break fn_213;
      }
      t_211 = field_207.sqlValue;
      const val_214 = mappedGetOr_101(this.#_changes_78, t_211, "");
      let found_215 = false;
      function fn_216(d_217) {
        if (d_217 === val_214) {
          found_215 = true;
        }
        return;
      }
      disallowed_208.forEach(fn_216);
      if (found_215) {
        t_212 = field_207.sqlValue;
        return_209 = this.#addError_86(t_212, "is reserved");
        break fn_213;
      }
      return_209 = this;
    }
    return return_209;
  }
  /**
   * @param {SafeIdentifier} field_219
   * @param {NumberValidationOpts} opts_220
   * @returns {Changeset}
   */
  validateNumber(field_219, opts_220) {
    let return_221;
    let t_222;
    let t_223;
    let t_224;
    let t_225;
    let t_226;
    let t_227;
    let t_228;
    let t_229;
    let t_230;
    let t_231;
    let t_232;
    let t_233;
    let t_234;
    let t_235;
    fn_236: {
      if (! this.#_isValid_80) {
        return_221 = this;
        break fn_236;
      }
      t_222 = field_219.sqlValue;
      if (! this.#_changes_78.has(t_222)) {
        return_221 = this;
        break fn_236;
      }
      t_223 = field_219.sqlValue;
      const val_237 = mappedGetOr_101(this.#_changes_78, t_223, "");
      let parseOk_238;
      try {
        stringToFloat64_160(val_237);
        parseOk_238 = true;
      } catch {
        parseOk_238 = false;
      }
      if (! parseOk_238) {
        t_224 = field_219.sqlValue;
        return_221 = this.#addError_86(t_224, "must be a number");
        break fn_236;
      }
      let num_239;
      try {
        t_235 = stringToFloat64_160(val_237);
        num_239 = t_235;
      } catch {
        num_239 = 0.0;
      }
      const gt_240 = opts_220.greaterThan;
      if (!(gt_240 == null)) {
        const gt_241 = gt_240;
        if (!(cmpFloat__242(num_239, gt_241) > 0)) {
          t_225 = field_219.sqlValue;
          t_226 = float64ToString_243(gt_241);
          return_221 = this.#addError_86(t_225, "must be greater than " + t_226);
          break fn_236;
        }
      }
      const lt_244 = opts_220.lessThan;
      if (!(lt_244 == null)) {
        const lt_245 = lt_244;
        if (!(cmpFloat__242(num_239, lt_245) < 0)) {
          t_227 = field_219.sqlValue;
          t_228 = float64ToString_243(lt_245);
          return_221 = this.#addError_86(t_227, "must be less than " + t_228);
          break fn_236;
        }
      }
      const gte_246 = opts_220.greaterThanOrEqual;
      if (!(gte_246 == null)) {
        const gte_247 = gte_246;
        if (!(cmpFloat__242(num_239, gte_247) >= 0)) {
          t_229 = field_219.sqlValue;
          t_230 = float64ToString_243(gte_247);
          return_221 = this.#addError_86(t_229, "must be greater than or equal to " + t_230);
          break fn_236;
        }
      }
      const lte_248 = opts_220.lessThanOrEqual;
      if (!(lte_248 == null)) {
        const lte_249 = lte_248;
        if (!(cmpFloat__242(num_239, lte_249) <= 0)) {
          t_231 = field_219.sqlValue;
          t_232 = float64ToString_243(lte_249);
          return_221 = this.#addError_86(t_231, "must be less than or equal to " + t_232);
          break fn_236;
        }
      }
      const eq_250 = opts_220.equalTo;
      if (!(eq_250 == null)) {
        const eq_251 = eq_250;
        if (!(cmpFloat__242(num_239, eq_251) === 0)) {
          t_233 = field_219.sqlValue;
          t_234 = float64ToString_243(eq_251);
          return_221 = this.#addError_86(t_233, "must be equal to " + t_234);
          break fn_236;
        }
      }
      return_221 = this;
    }
    return return_221;
  }
  /**
   * @param {SafeIdentifier} field_253
   * @returns {Changeset}
   */
  validateAcceptance(field_253) {
    let return_254;
    let t_255;
    let t_256;
    let t_257;
    let t_258;
    let t_259;
    fn_260: {
      if (! this.#_isValid_80) {
        return_254 = this;
        break fn_260;
      }
      t_255 = field_253.sqlValue;
      if (! this.#_changes_78.has(t_255)) {
        return_254 = this;
        break fn_260;
      }
      t_256 = field_253.sqlValue;
      const val_261 = mappedGetOr_101(this.#_changes_78, t_256, "");
      let accepted_262;
      if (val_261 === "true") {
        accepted_262 = true;
      } else {
        if (val_261 === "1") {
          t_259 = true;
        } else {
          if (val_261 === "yes") {
            t_258 = true;
          } else {
            t_258 = val_261 === "on";
          }
          t_259 = t_258;
        }
        accepted_262 = t_259;
      }
      if (! accepted_262) {
        t_257 = field_253.sqlValue;
        return_254 = this.#addError_86(t_257, "must be accepted");
        break fn_260;
      }
      return_254 = this;
    }
    return return_254;
  }
  /**
   * @param {SafeIdentifier} field_264
   * @param {SafeIdentifier} confirmationField_265
   * @returns {Changeset}
   */
  validateConfirmation(field_264, confirmationField_265) {
    let return_266;
    let t_267;
    let t_268;
    let t_269;
    let t_270;
    fn_271: {
      if (! this.#_isValid_80) {
        return_266 = this;
        break fn_271;
      }
      t_267 = field_264.sqlValue;
      if (! this.#_changes_78.has(t_267)) {
        return_266 = this;
        break fn_271;
      }
      t_268 = field_264.sqlValue;
      const val_272 = mappedGetOr_101(this.#_changes_78, t_268, "");
      t_269 = confirmationField_265.sqlValue;
      const conf_273 = mappedGetOr_101(this.#_changes_78, t_269, "");
      if (val_272 !== conf_273) {
        t_270 = confirmationField_265.sqlValue;
        return_266 = this.#addError_86(t_270, "does not match");
        break fn_271;
      }
      return_266 = this;
    }
    return return_266;
  }
  /**
   * @param {SafeIdentifier} field_275
   * @param {string} substring_276
   * @returns {Changeset}
   */
  validateContains(field_275, substring_276) {
    let return_277;
    let t_278;
    let t_279;
    let t_280;
    fn_281: {
      if (! this.#_isValid_80) {
        return_277 = this;
        break fn_281;
      }
      t_278 = field_275.sqlValue;
      if (! this.#_changes_78.has(t_278)) {
        return_277 = this;
        break fn_281;
      }
      t_279 = field_275.sqlValue;
      const val_282 = mappedGetOr_101(this.#_changes_78, t_279, "");
      if (!(val_282.indexOf(substring_276) >= 0)) {
        t_280 = field_275.sqlValue;
        return_277 = this.#addError_86(t_280, "must contain the given substring");
        break fn_281;
      }
      return_277 = this;
    }
    return return_277;
  }
  /**
   * @param {SafeIdentifier} field_284
   * @param {string} prefix_285
   * @returns {Changeset}
   */
  validateStartsWith(field_284, prefix_285) {
    let return_286;
    let t_287;
    let t_288;
    let t_289;
    let t_290;
    fn_291: {
      if (! this.#_isValid_80) {
        return_286 = this;
        break fn_291;
      }
      t_287 = field_284.sqlValue;
      if (! this.#_changes_78.has(t_287)) {
        return_286 = this;
        break fn_291;
      }
      t_288 = field_284.sqlValue;
      const val_292 = mappedGetOr_101(this.#_changes_78, t_288, "");
      const idx_293 = val_292.indexOf(prefix_285);
      let starts_294;
      if (idx_293 >= 0) {
        t_289 = stringCountBetween_133(val_292, 0, requireStringIndex_295(idx_293));
        starts_294 = t_289 === 0;
      } else {
        starts_294 = false;
      }
      if (! starts_294) {
        t_290 = field_284.sqlValue;
        return_286 = this.#addError_86(t_290, "must start with the given prefix");
        break fn_291;
      }
      return_286 = this;
    }
    return return_286;
  }
  /**
   * @param {SafeIdentifier} field_297
   * @param {string} suffix_298
   * @returns {Changeset}
   */
  validateEndsWith(field_297, suffix_298) {
    let return_299;
    let t_300;
    let t_301;
    let t_302;
    let t_303;
    let t_304;
    let t_305;
    let t_306;
    let t_307;
    let t_308;
    let t_309;
    fn_310: {
      if (! this.#_isValid_80) {
        return_299 = this;
        break fn_310;
      }
      t_300 = field_297.sqlValue;
      if (! this.#_changes_78.has(t_300)) {
        return_299 = this;
        break fn_310;
      }
      t_301 = field_297.sqlValue;
      const val_311 = mappedGetOr_101(this.#_changes_78, t_301, "");
      const valLen_312 = stringCountBetween_133(val_311, 0, val_311.length);
      t_302 = suffix_298.length;
      const suffixLen_313 = stringCountBetween_133(suffix_298, 0, t_302);
      if (valLen_312 < suffixLen_313) {
        t_303 = field_297.sqlValue;
        return_299 = this.#addError_86(t_303, "must end with the given suffix");
        break fn_310;
      }
      const skipCount_314 = valLen_312 - suffixLen_313 | 0;
      let strIdx_315 = 0;
      let i_316 = 0;
      while (i_316 < skipCount_314) {
        t_304 = stringNext_317(val_311, strIdx_315);
        strIdx_315 = t_304;
        i_316 = i_316 + 1 | 0;
      }
      let sufIdx_318 = 0;
      let matches_319 = true;
      while (true) {
        if (matches_319) {
          t_305 = suffix_298.length > sufIdx_318;
          t_309 = t_305;
        } else {
          t_309 = false;
        }
        if (! t_309) {
          break;
        }
        if (!(val_311.length > strIdx_315)) {
          matches_319 = false;
        } else if (stringGet_320(val_311, strIdx_315) !== stringGet_320(suffix_298, sufIdx_318)) {
          matches_319 = false;
        } else {
          t_306 = stringNext_317(val_311, strIdx_315);
          strIdx_315 = t_306;
          t_307 = stringNext_317(suffix_298, sufIdx_318);
          sufIdx_318 = t_307;
        }
      }
      if (! matches_319) {
        t_308 = field_297.sqlValue;
        return_299 = this.#addError_86(t_308, "must end with the given suffix");
        break fn_310;
      }
      return_299 = this;
    }
    return return_299;
  }
  /**
   * @param {string} val_323
   * @returns {SqlBoolean}
   */
  #parseBoolSqlPart_322(val_323) {
    let return_324;
    let t_325;
    let t_326;
    let t_327;
    let t_328;
    let t_329;
    let t_330;
    fn_331: {
      if (val_323 === "true") {
        t_327 = true;
      } else {
        if (val_323 === "1") {
          t_326 = true;
        } else {
          if (val_323 === "yes") {
            t_325 = true;
          } else {
            t_325 = val_323 === "on";
          }
          t_326 = t_325;
        }
        t_327 = t_326;
      }
      if (t_327) {
        return_324 = new SqlBoolean(true);
        break fn_331;
      }
      if (val_323 === "false") {
        t_330 = true;
      } else {
        if (val_323 === "0") {
          t_329 = true;
        } else {
          if (val_323 === "no") {
            t_328 = true;
          } else {
            t_328 = val_323 === "off";
          }
          t_329 = t_328;
        }
        t_330 = t_329;
      }
      if (t_330) {
        return_324 = new SqlBoolean(false);
        break fn_331;
      }
      throw Error();
    }
    return return_324;
  }
  /**
   * @param {FieldDef} fieldDef_334
   * @param {string} val_335
   * @returns {SqlPart}
   */
  #valueToSqlPart_333(fieldDef_334, val_335) {
    let return_336;
    let t_337;
    let t_338;
    let t_339;
    let t_340;
    fn_341: {
      const ft_342 = fieldDef_334.fieldType;
      if (ft_342 instanceof StringField) {
        return_336 = new SqlString(val_335);
        break fn_341;
      }
      if (ft_342 instanceof IntField) {
        t_337 = stringToInt32_142(val_335);
        return_336 = new SqlInt32(t_337);
        break fn_341;
      }
      if (ft_342 instanceof Int64Field) {
        t_338 = stringToInt64_151(val_335);
        return_336 = new SqlInt64(t_338);
        break fn_341;
      }
      if (ft_342 instanceof FloatField) {
        t_339 = stringToFloat64_160(val_335);
        return_336 = new SqlFloat64(t_339);
        break fn_341;
      }
      if (ft_342 instanceof BoolField) {
        return_336 = this.#parseBoolSqlPart_322(val_335);
        break fn_341;
      }
      if (ft_342 instanceof DateField) {
        t_340 = new (globalThis.Date)(globalThis.Date.parse(val_335));
        return_336 = new SqlDate(t_340);
        break fn_341;
      }
      throw Error();
    }
    return return_336;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    let t_344;
    let t_345;
    let t_346;
    let t_347;
    let t_348;
    let t_349;
    let t_350;
    let t_351;
    let t_352;
    let t_353;
    let t_354;
    let t_355;
    if (! this.#_isValid_80) {
      throw Error();
    }
    let i_356 = 0;
    while (true) {
      continue_357: {
        t_344 = this.#_tableDef_76.fields.length;
        if (!(i_356 < t_344)) {
          break;
        }
        const f_358 = listedGet_183(this.#_tableDef_76.fields, i_356);
        if (f_358.virtual) {
          break continue_357;
        }
        const dv_359 = f_358.defaultValue;
        if (! f_358.nullable) {
          t_345 = f_358.name.sqlValue;
          if (! this.#_changes_78.has(t_345)) {
            t_352 = dv_359 == null;
          } else {
            t_352 = false;
          }
          t_353 = t_352;
        } else {
          t_353 = false;
        }
        if (t_353) {
          throw Error();
        }
      }
      i_356 = i_356 + 1 | 0;
    }
    const colNames_360 = [];
    const valParts_361 = [];
    const pairs_362 = mappedToList_181(this.#_changes_78);
    let i_363 = 0;
    while (true) {
      continue_364: {
        t_346 = pairs_362.length;
        if (!(i_363 < t_346)) {
          break;
        }
        const pair_365 = listedGet_183(pairs_362, i_363);
        t_347 = pair_365.key;
        t_354 = this.#_tableDef_76.field(t_347);
        const fd_366 = t_354;
        if (fd_366.virtual) {
          break continue_364;
        }
        listBuilderAdd_90(colNames_360, fd_366.name.sqlValue);
        t_348 = pair_365.value;
        t_355 = this.#valueToSqlPart_333(fd_366, t_348);
        listBuilderAdd_90(valParts_361, t_355);
      }
      i_363 = i_363 + 1 | 0;
    }
    let i_367 = 0;
    while (true) {
      continue_368: {
        t_349 = this.#_tableDef_76.fields.length;
        if (!(i_367 < t_349)) {
          break;
        }
        const f_369 = listedGet_183(this.#_tableDef_76.fields, i_367);
        if (f_369.virtual) {
          break continue_368;
        }
        const dv_370 = f_369.defaultValue;
        if (!(dv_370 == null)) {
          const dv_371 = dv_370;
          t_350 = f_369.name.sqlValue;
          if (! this.#_changes_78.has(t_350)) {
            listBuilderAdd_90(colNames_360, f_369.name.sqlValue);
            listBuilderAdd_90(valParts_361, dv_371);
          }
        }
      }
      i_367 = i_367 + 1 | 0;
    }
    if (valParts_361.length === 0) {
      throw Error();
    }
    const b_372 = new SqlBuilder();
    b_372.appendSafe("INSERT INTO ");
    b_372.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_372.appendSafe(" (");
    let t_373 = listBuilderToList_91(colNames_360);
    function fn_374(c_375) {
      return c_375;
    }
    b_372.appendSafe(listedJoin_376(t_373, ", ", fn_374));
    b_372.appendSafe(") VALUES (");
    b_372.appendPart(listedGet_183(valParts_361, 0));
    let j_377 = 1;
    while (true) {
      t_351 = valParts_361.length;
      if (!(j_377 < t_351)) {
        break;
      }
      b_372.appendSafe(", ");
      b_372.appendPart(listedGet_183(valParts_361, j_377));
      j_377 = j_377 + 1 | 0;
    }
    b_372.appendSafe(")");
    return b_372.accumulated;
  }
  /**
   * @param {number} id_379
   * @returns {SqlFragment}
   */
  toUpdateSql(id_379) {
    let t_380;
    let t_381;
    let t_382;
    let t_383;
    let t_384;
    if (! this.#_isValid_80) {
      throw Error();
    }
    const pairs_385 = mappedToList_181(this.#_changes_78);
    if (pairs_385.length === 0) {
      throw Error();
    }
    const b_386 = new SqlBuilder();
    b_386.appendSafe("UPDATE ");
    b_386.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_386.appendSafe(" SET ");
    let setCount_387 = 0;
    let i_388 = 0;
    while (true) {
      continue_389: {
        t_380 = pairs_385.length;
        if (!(i_388 < t_380)) {
          break;
        }
        const pair_390 = listedGet_183(pairs_385, i_388);
        t_381 = pair_390.key;
        t_383 = this.#_tableDef_76.field(t_381);
        const fd_391 = t_383;
        if (fd_391.virtual) {
          break continue_389;
        }
        if (setCount_387 > 0) {
          b_386.appendSafe(", ");
        }
        b_386.appendSafe(fd_391.name.sqlValue);
        b_386.appendSafe(" = ");
        t_382 = pair_390.value;
        t_384 = this.#valueToSqlPart_333(fd_391, t_382);
        b_386.appendPart(t_384);
        setCount_387 = setCount_387 + 1 | 0;
      }
      i_388 = i_388 + 1 | 0;
    }
    if (setCount_387 === 0) {
      throw Error();
    }
    b_386.appendSafe(" WHERE ");
    b_386.appendSafe(this.#_tableDef_76.pkName());
    b_386.appendSafe(" = ");
    b_386.appendInt32(id_379);
    return b_386.accumulated;
  }
  /**
   * @param {{
   *   _tableDef: TableDef, _params: Map<string, string>, _changes: Map<string, string>, _errors: Array<ChangesetError>, _isValid: boolean
   * }}
   * props
   * @returns {ChangesetImpl_75}
   */
  static["new"](props) {
    return new ChangesetImpl_75(props._tableDef, props._params, props._changes, props._errors, props._isValid);
  }
  /**
   * @param {TableDef} _tableDef_392
   * @param {Map<string, string>} _params_393
   * @param {Map<string, string>} _changes_394
   * @param {Array<ChangesetError>} _errors_395
   * @param {boolean} _isValid_396
   */
  constructor(_tableDef_392, _params_393, _changes_394, _errors_395, _isValid_396) {
    super ();
    this.#_tableDef_76 = _tableDef_392;
    this.#_params_77 = _params_393;
    this.#_changes_78 = _changes_394;
    this.#_errors_79 = _errors_395;
    this.#_isValid_80 = _isValid_396;
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
  #joinType_403;
  /** @type {SafeIdentifier} */
  #table_404;
  /** @type {SqlFragment | null} */
  #onCondition_405;
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
   * @param {JoinType} joinType_406
   * @param {SafeIdentifier} table_407
   * @param {SqlFragment | null} onCondition_408
   */
  constructor(joinType_406, table_407, onCondition_408) {
    super ();
    this.#joinType_403 = joinType_406;
    this.#table_404 = table_407;
    this.#onCondition_405 = onCondition_408;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_403;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_404;
  }
  /** @returns {SqlFragment | null} */
  get onCondition() {
    return this.#onCondition_405;
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
  #field_415;
  /** @type {boolean} */
  #ascending_416;
  /** @type {NullsPosition | null} */
  #nullsPos_417;
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
   * @param {SafeIdentifier} field_418
   * @param {boolean} ascending_419
   * @param {NullsPosition | null} nullsPos_420
   */
  constructor(field_418, ascending_419, nullsPos_420) {
    super ();
    this.#field_415 = field_418;
    this.#ascending_416 = ascending_419;
    this.#nullsPos_417 = nullsPos_420;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_415;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_416;
  }
  /** @returns {NullsPosition | null} */
  get nullsPos() {
    return this.#nullsPos_417;
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
  #_condition_429;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_429;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_432 */
  constructor(_condition_432) {
    super ();
    this.#_condition_429 = _condition_432;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_433;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_433;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_436 */
  constructor(_condition_436) {
    super ();
    this.#_condition_433 = _condition_436;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_437;
  /** @type {Array<WhereClause>} */
  #conditions_438;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_439;
  /** @type {Array<OrderClause>} */
  #orderClauses_440;
  /** @type {number | null} */
  #limitVal_441;
  /** @type {number | null} */
  #offsetVal_442;
  /** @type {Array<JoinClause>} */
  #joinClauses_443;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_444;
  /** @type {Array<WhereClause>} */
  #havingConditions_445;
  /** @type {boolean} */
  #isDistinct_446;
  /** @type {Array<SqlFragment>} */
  #selectExprs_447;
  /** @type {LockMode | null} */
  #lockMode_448;
  /**
   * @param {SqlFragment} condition_450
   * @returns {Query}
   */
  where(condition_450) {
    const nb_451 = this.#conditions_438.slice();
    listBuilderAdd_90(nb_451, new AndCondition(condition_450));
    return new Query(this.#tableName_437, listBuilderToList_91(nb_451), this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SqlFragment} condition_453
   * @returns {Query}
   */
  orWhere(condition_453) {
    const nb_454 = this.#conditions_438.slice();
    listBuilderAdd_90(nb_454, new OrCondition(condition_453));
    return new Query(this.#tableName_437, listBuilderToList_91(nb_454), this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SafeIdentifier} field_456
   * @returns {Query}
   */
  whereNull(field_456) {
    const b_457 = new SqlBuilder();
    b_457.appendSafe(field_456.sqlValue);
    b_457.appendSafe(" IS NULL");
    let t_458 = b_457.accumulated;
    return this.where(t_458);
  }
  /**
   * @param {SafeIdentifier} field_460
   * @returns {Query}
   */
  whereNotNull(field_460) {
    const b_461 = new SqlBuilder();
    b_461.appendSafe(field_460.sqlValue);
    b_461.appendSafe(" IS NOT NULL");
    let t_462 = b_461.accumulated;
    return this.where(t_462);
  }
  /**
   * @param {SafeIdentifier} field_464
   * @param {Array<SqlPart>} values_465
   * @returns {Query}
   */
  whereIn(field_464, values_465) {
    let return_466;
    let t_467;
    let t_468;
    let t_469;
    fn_470: {
      if (! values_465.length) {
        const b_471 = new SqlBuilder();
        b_471.appendSafe("1 = 0");
        t_467 = b_471.accumulated;
        return_466 = this.where(t_467);
        break fn_470;
      }
      const b_472 = new SqlBuilder();
      b_472.appendSafe(field_464.sqlValue);
      b_472.appendSafe(" IN (");
      b_472.appendPart(listedGet_183(values_465, 0));
      let i_473 = 1;
      while (true) {
        t_468 = values_465.length;
        if (!(i_473 < t_468)) {
          break;
        }
        b_472.appendSafe(", ");
        b_472.appendPart(listedGet_183(values_465, i_473));
        i_473 = i_473 + 1 | 0;
      }
      b_472.appendSafe(")");
      t_469 = b_472.accumulated;
      return_466 = this.where(t_469);
    }
    return return_466;
  }
  /**
   * @param {SafeIdentifier} field_475
   * @param {Query} sub_476
   * @returns {Query}
   */
  whereInSubquery(field_475, sub_476) {
    const b_477 = new SqlBuilder();
    b_477.appendSafe(field_475.sqlValue);
    b_477.appendSafe(" IN (");
    b_477.appendFragment(sub_476.toSql());
    b_477.appendSafe(")");
    let t_478 = b_477.accumulated;
    return this.where(t_478);
  }
  /**
   * @param {SqlFragment} condition_480
   * @returns {Query}
   */
  whereNot(condition_480) {
    const b_481 = new SqlBuilder();
    b_481.appendSafe("NOT (");
    b_481.appendFragment(condition_480);
    b_481.appendSafe(")");
    let t_482 = b_481.accumulated;
    return this.where(t_482);
  }
  /**
   * @param {SafeIdentifier} field_484
   * @param {SqlPart} low_485
   * @param {SqlPart} high_486
   * @returns {Query}
   */
  whereBetween(field_484, low_485, high_486) {
    const b_487 = new SqlBuilder();
    b_487.appendSafe(field_484.sqlValue);
    b_487.appendSafe(" BETWEEN ");
    b_487.appendPart(low_485);
    b_487.appendSafe(" AND ");
    b_487.appendPart(high_486);
    let t_488 = b_487.accumulated;
    return this.where(t_488);
  }
  /**
   * @param {SafeIdentifier} field_490
   * @param {string} pattern_491
   * @returns {Query}
   */
  whereLike(field_490, pattern_491) {
    const b_492 = new SqlBuilder();
    b_492.appendSafe(field_490.sqlValue);
    b_492.appendSafe(" LIKE ");
    b_492.appendString(pattern_491);
    let t_493 = b_492.accumulated;
    return this.where(t_493);
  }
  /**
   * @param {SafeIdentifier} field_495
   * @param {string} pattern_496
   * @returns {Query}
   */
  whereILike(field_495, pattern_496) {
    const b_497 = new SqlBuilder();
    b_497.appendSafe(field_495.sqlValue);
    b_497.appendSafe(" ILIKE ");
    b_497.appendString(pattern_496);
    let t_498 = b_497.accumulated;
    return this.where(t_498);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_500
   * @returns {Query}
   */
  select(fields_500) {
    return new Query(this.#tableName_437, this.#conditions_438, fields_500, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {Array<SqlFragment>} exprs_502
   * @returns {Query}
   */
  selectExpr(exprs_502) {
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, exprs_502, this.#lockMode_448);
  }
  /**
   * @param {SafeIdentifier} field_504
   * @param {boolean} ascending_505
   * @returns {Query}
   */
  orderBy(field_504, ascending_505) {
    const nb_506 = this.#orderClauses_440.slice();
    listBuilderAdd_90(nb_506, new OrderClause(field_504, ascending_505, null));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, listBuilderToList_91(nb_506), this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SafeIdentifier} field_508
   * @param {boolean} ascending_509
   * @param {NullsPosition} nulls_510
   * @returns {Query}
   */
  orderByNulls(field_508, ascending_509, nulls_510) {
    const nb_511 = this.#orderClauses_440.slice();
    listBuilderAdd_90(nb_511, new OrderClause(field_508, ascending_509, nulls_510));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, listBuilderToList_91(nb_511), this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {number} n_513
   * @returns {Query}
   */
  limit(n_513) {
    if (n_513 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, n_513, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {number} n_515
   * @returns {Query}
   */
  offset(n_515) {
    if (n_515 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, n_515, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {JoinType} joinType_517
   * @param {SafeIdentifier} table_518
   * @param {SqlFragment} onCondition_519
   * @returns {Query}
   */
  join(joinType_517, table_518, onCondition_519) {
    const nb_520 = this.#joinClauses_443.slice();
    listBuilderAdd_90(nb_520, new JoinClause(joinType_517, table_518, onCondition_519));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, listBuilderToList_91(nb_520), this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SafeIdentifier} table_522
   * @param {SqlFragment} onCondition_523
   * @returns {Query}
   */
  innerJoin(table_522, onCondition_523) {
    let t_524 = new InnerJoin();
    return this.join(t_524, table_522, onCondition_523);
  }
  /**
   * @param {SafeIdentifier} table_526
   * @param {SqlFragment} onCondition_527
   * @returns {Query}
   */
  leftJoin(table_526, onCondition_527) {
    let t_528 = new LeftJoin();
    return this.join(t_528, table_526, onCondition_527);
  }
  /**
   * @param {SafeIdentifier} table_530
   * @param {SqlFragment} onCondition_531
   * @returns {Query}
   */
  rightJoin(table_530, onCondition_531) {
    let t_532 = new RightJoin();
    return this.join(t_532, table_530, onCondition_531);
  }
  /**
   * @param {SafeIdentifier} table_534
   * @param {SqlFragment} onCondition_535
   * @returns {Query}
   */
  fullJoin(table_534, onCondition_535) {
    let t_536 = new FullJoin();
    return this.join(t_536, table_534, onCondition_535);
  }
  /**
   * @param {SafeIdentifier} table_538
   * @returns {Query}
   */
  crossJoin(table_538) {
    const nb_539 = this.#joinClauses_443.slice();
    listBuilderAdd_90(nb_539, new JoinClause(new CrossJoin(), table_538, null));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, listBuilderToList_91(nb_539), this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SafeIdentifier} field_541
   * @returns {Query}
   */
  groupBy(field_541) {
    const nb_542 = this.#groupByFields_444.slice();
    listBuilderAdd_90(nb_542, field_541);
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, listBuilderToList_91(nb_542), this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SqlFragment} condition_544
   * @returns {Query}
   */
  having(condition_544) {
    const nb_545 = this.#havingConditions_445.slice();
    listBuilderAdd_90(nb_545, new AndCondition(condition_544));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, listBuilderToList_91(nb_545), this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {SqlFragment} condition_547
   * @returns {Query}
   */
  orHaving(condition_547) {
    const nb_548 = this.#havingConditions_445.slice();
    listBuilderAdd_90(nb_548, new OrCondition(condition_547));
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, listBuilderToList_91(nb_548), this.#isDistinct_446, this.#selectExprs_447, this.#lockMode_448);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, true, this.#selectExprs_447, this.#lockMode_448);
  }
  /**
   * @param {LockMode} mode_551
   * @returns {Query}
   */
  lock(mode_551) {
    return new Query(this.#tableName_437, this.#conditions_438, this.#selectedFields_439, this.#orderClauses_440, this.#limitVal_441, this.#offsetVal_442, this.#joinClauses_443, this.#groupByFields_444, this.#havingConditions_445, this.#isDistinct_446, this.#selectExprs_447, mode_551);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_553;
    const b_554 = new SqlBuilder();
    if (this.#isDistinct_446) {
      b_554.appendSafe("SELECT DISTINCT ");
    } else {
      b_554.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_447.length) {
      b_554.appendFragment(listedGet_183(this.#selectExprs_447, 0));
      let i_555 = 1;
      while (true) {
        t_553 = this.#selectExprs_447.length;
        if (!(i_555 < t_553)) {
          break;
        }
        b_554.appendSafe(", ");
        b_554.appendFragment(listedGet_183(this.#selectExprs_447, i_555));
        i_555 = i_555 + 1 | 0;
      }
    } else if (! this.#selectedFields_439.length) {
      b_554.appendSafe("*");
    } else {
      function fn_556(f_557) {
        return f_557.sqlValue;
      }
      b_554.appendSafe(listedJoin_376(this.#selectedFields_439, ", ", fn_556));
    }
    b_554.appendSafe(" FROM ");
    b_554.appendSafe(this.#tableName_437.sqlValue);
    renderJoins_558(b_554, this.#joinClauses_443);
    renderWhere_559(b_554, this.#conditions_438);
    renderGroupBy_560(b_554, this.#groupByFields_444);
    renderHaving_561(b_554, this.#havingConditions_445);
    if (! ! this.#orderClauses_440.length) {
      b_554.appendSafe(" ORDER BY ");
      let first_562 = true;
      function fn_563(orc_564) {
        let t_565;
        let t_566;
        if (! first_562) {
          b_554.appendSafe(", ");
        }
        first_562 = false;
        let t_567 = orc_564.field.sqlValue;
        b_554.appendSafe(t_567);
        if (orc_564.ascending) {
          t_566 = " ASC";
        } else {
          t_566 = " DESC";
        }
        b_554.appendSafe(t_566);
        const np_568 = orc_564.nullsPos;
        if (!(np_568 == null)) {
          t_565 = np_568.keyword();
          b_554.appendSafe(t_565);
        }
        return;
      }
      this.#orderClauses_440.forEach(fn_563);
    }
    const lv_569 = this.#limitVal_441;
    if (!(lv_569 == null)) {
      const lv_570 = lv_569;
      b_554.appendSafe(" LIMIT ");
      b_554.appendInt32(lv_570);
    }
    const ov_571 = this.#offsetVal_442;
    if (!(ov_571 == null)) {
      const ov_572 = ov_571;
      b_554.appendSafe(" OFFSET ");
      b_554.appendInt32(ov_572);
    }
    const lm_573 = this.#lockMode_448;
    if (!(lm_573 == null)) {
      b_554.appendSafe(lm_573.keyword());
    }
    return b_554.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    const b_575 = new SqlBuilder();
    b_575.appendSafe("SELECT COUNT(*) FROM ");
    b_575.appendSafe(this.#tableName_437.sqlValue);
    renderJoins_558(b_575, this.#joinClauses_443);
    renderWhere_559(b_575, this.#conditions_438);
    renderGroupBy_560(b_575, this.#groupByFields_444);
    renderHaving_561(b_575, this.#havingConditions_445);
    return b_575.accumulated;
  }
  /**
   * @param {number} defaultLimit_577
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_577) {
    let return_578;
    let t_579;
    if (defaultLimit_577 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_441 == null)) {
      return_578 = this.toSql();
    } else {
      t_579 = this.limit(defaultLimit_577);
      return_578 = t_579.toSql();
    }
    return return_578;
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
   * @param {SafeIdentifier} tableName_580
   * @param {Array<WhereClause>} conditions_581
   * @param {Array<SafeIdentifier>} selectedFields_582
   * @param {Array<OrderClause>} orderClauses_583
   * @param {number | null} limitVal_584
   * @param {number | null} offsetVal_585
   * @param {Array<JoinClause>} joinClauses_586
   * @param {Array<SafeIdentifier>} groupByFields_587
   * @param {Array<WhereClause>} havingConditions_588
   * @param {boolean} isDistinct_589
   * @param {Array<SqlFragment>} selectExprs_590
   * @param {LockMode | null} lockMode_591
   */
  constructor(tableName_580, conditions_581, selectedFields_582, orderClauses_583, limitVal_584, offsetVal_585, joinClauses_586, groupByFields_587, havingConditions_588, isDistinct_589, selectExprs_590, lockMode_591) {
    super ();
    this.#tableName_437 = tableName_580;
    this.#conditions_438 = conditions_581;
    this.#selectedFields_439 = selectedFields_582;
    this.#orderClauses_440 = orderClauses_583;
    this.#limitVal_441 = limitVal_584;
    this.#offsetVal_442 = offsetVal_585;
    this.#joinClauses_443 = joinClauses_586;
    this.#groupByFields_444 = groupByFields_587;
    this.#havingConditions_445 = havingConditions_588;
    this.#isDistinct_446 = isDistinct_589;
    this.#selectExprs_447 = selectExprs_590;
    this.#lockMode_448 = lockMode_591;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_437;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_438;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_439;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_440;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_441;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_442;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_443;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_444;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_445;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_446;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_447;
  }
  /** @returns {LockMode | null} */
  get lockMode() {
    return this.#lockMode_448;
  }
};
export class SetClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_604;
  /** @type {SqlPart} */
  #value_605;
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
   * @param {SafeIdentifier} field_606
   * @param {SqlPart} value_607
   */
  constructor(field_606, value_607) {
    super ();
    this.#field_604 = field_606;
    this.#value_605 = value_607;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_604;
  }
  /** @returns {SqlPart} */
  get value() {
    return this.#value_605;
  }
};
export class UpdateQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_610;
  /** @type {Array<SetClause>} */
  #setClauses_611;
  /** @type {Array<WhereClause>} */
  #conditions_612;
  /** @type {number | null} */
  #limitVal_613;
  /**
   * @param {SafeIdentifier} field_615
   * @param {SqlPart} value_616
   * @returns {UpdateQuery}
   */
  set(field_615, value_616) {
    const nb_617 = this.#setClauses_611.slice();
    listBuilderAdd_90(nb_617, new SetClause(field_615, value_616));
    return new UpdateQuery(this.#tableName_610, listBuilderToList_91(nb_617), this.#conditions_612, this.#limitVal_613);
  }
  /**
   * @param {SqlFragment} condition_619
   * @returns {UpdateQuery}
   */
  where(condition_619) {
    const nb_620 = this.#conditions_612.slice();
    listBuilderAdd_90(nb_620, new AndCondition(condition_619));
    return new UpdateQuery(this.#tableName_610, this.#setClauses_611, listBuilderToList_91(nb_620), this.#limitVal_613);
  }
  /**
   * @param {SqlFragment} condition_622
   * @returns {UpdateQuery}
   */
  orWhere(condition_622) {
    const nb_623 = this.#conditions_612.slice();
    listBuilderAdd_90(nb_623, new OrCondition(condition_622));
    return new UpdateQuery(this.#tableName_610, this.#setClauses_611, listBuilderToList_91(nb_623), this.#limitVal_613);
  }
  /**
   * @param {number} n_625
   * @returns {UpdateQuery}
   */
  limit(n_625) {
    if (n_625 < 0) {
      throw Error();
    }
    return new UpdateQuery(this.#tableName_610, this.#setClauses_611, this.#conditions_612, n_625);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_627;
    if (! this.#conditions_612.length) {
      throw Error();
    }
    if (! this.#setClauses_611.length) {
      throw Error();
    }
    const b_628 = new SqlBuilder();
    b_628.appendSafe("UPDATE ");
    b_628.appendSafe(this.#tableName_610.sqlValue);
    b_628.appendSafe(" SET ");
    b_628.appendSafe(listedGet_183(this.#setClauses_611, 0).field.sqlValue);
    b_628.appendSafe(" = ");
    b_628.appendPart(listedGet_183(this.#setClauses_611, 0).value);
    let i_629 = 1;
    while (true) {
      t_627 = this.#setClauses_611.length;
      if (!(i_629 < t_627)) {
        break;
      }
      b_628.appendSafe(", ");
      b_628.appendSafe(listedGet_183(this.#setClauses_611, i_629).field.sqlValue);
      b_628.appendSafe(" = ");
      b_628.appendPart(listedGet_183(this.#setClauses_611, i_629).value);
      i_629 = i_629 + 1 | 0;
    }
    renderWhere_559(b_628, this.#conditions_612);
    const lv_630 = this.#limitVal_613;
    if (!(lv_630 == null)) {
      const lv_631 = lv_630;
      b_628.appendSafe(" LIMIT ");
      b_628.appendInt32(lv_631);
    }
    return b_628.accumulated;
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
   * @param {SafeIdentifier} tableName_632
   * @param {Array<SetClause>} setClauses_633
   * @param {Array<WhereClause>} conditions_634
   * @param {number | null} limitVal_635
   */
  constructor(tableName_632, setClauses_633, conditions_634, limitVal_635) {
    super ();
    this.#tableName_610 = tableName_632;
    this.#setClauses_611 = setClauses_633;
    this.#conditions_612 = conditions_634;
    this.#limitVal_613 = limitVal_635;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_610;
  }
  /** @returns {Array<SetClause>} */
  get setClauses() {
    return this.#setClauses_611;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_612;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_613;
  }
};
export class DeleteQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_640;
  /** @type {Array<WhereClause>} */
  #conditions_641;
  /** @type {number | null} */
  #limitVal_642;
  /**
   * @param {SqlFragment} condition_644
   * @returns {DeleteQuery}
   */
  where(condition_644) {
    const nb_645 = this.#conditions_641.slice();
    listBuilderAdd_90(nb_645, new AndCondition(condition_644));
    return new DeleteQuery(this.#tableName_640, listBuilderToList_91(nb_645), this.#limitVal_642);
  }
  /**
   * @param {SqlFragment} condition_647
   * @returns {DeleteQuery}
   */
  orWhere(condition_647) {
    const nb_648 = this.#conditions_641.slice();
    listBuilderAdd_90(nb_648, new OrCondition(condition_647));
    return new DeleteQuery(this.#tableName_640, listBuilderToList_91(nb_648), this.#limitVal_642);
  }
  /**
   * @param {number} n_650
   * @returns {DeleteQuery}
   */
  limit(n_650) {
    if (n_650 < 0) {
      throw Error();
    }
    return new DeleteQuery(this.#tableName_640, this.#conditions_641, n_650);
  }
  /** @returns {SqlFragment} */
  toSql() {
    if (! this.#conditions_641.length) {
      throw Error();
    }
    const b_652 = new SqlBuilder();
    b_652.appendSafe("DELETE FROM ");
    b_652.appendSafe(this.#tableName_640.sqlValue);
    renderWhere_559(b_652, this.#conditions_641);
    const lv_653 = this.#limitVal_642;
    if (!(lv_653 == null)) {
      const lv_654 = lv_653;
      b_652.appendSafe(" LIMIT ");
      b_652.appendInt32(lv_654);
    }
    return b_652.accumulated;
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
   * @param {SafeIdentifier} tableName_655
   * @param {Array<WhereClause>} conditions_656
   * @param {number | null} limitVal_657
   */
  constructor(tableName_655, conditions_656, limitVal_657) {
    super ();
    this.#tableName_640 = tableName_655;
    this.#conditions_641 = conditions_656;
    this.#limitVal_642 = limitVal_657;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_640;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_641;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_642;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_662 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_663;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_663;
  }
  /** @param {string} _value_665 */
  constructor(_value_665) {
    super ();
    this.#_value_663 = _value_665;
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
  #name_666;
  /** @type {FieldType} */
  #fieldType_667;
  /** @type {boolean} */
  #nullable_668;
  /** @type {SqlPart | null} */
  #defaultValue_669;
  /** @type {boolean} */
  #virtual_670;
  /**
   * @param {{
   *   name: SafeIdentifier, fieldType: FieldType, nullable: boolean, defaultValue: SqlPart | null, virtual: boolean
   * }}
   * props
   * @returns {FieldDef}
   */
  static["new"](props) {
    return new FieldDef(props.name, props.fieldType, props.nullable, props.defaultValue, props.virtual);
  }
  /**
   * @param {SafeIdentifier} name_671
   * @param {FieldType} fieldType_672
   * @param {boolean} nullable_673
   * @param {SqlPart | null} defaultValue_674
   * @param {boolean} virtual_675
   */
  constructor(name_671, fieldType_672, nullable_673, defaultValue_674, virtual_675) {
    super ();
    this.#name_666 = name_671;
    this.#fieldType_667 = fieldType_672;
    this.#nullable_668 = nullable_673;
    this.#defaultValue_669 = defaultValue_674;
    this.#virtual_670 = virtual_675;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_666;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_667;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_668;
  }
  /** @returns {SqlPart | null} */
  get defaultValue() {
    return this.#defaultValue_669;
  }
  /** @returns {boolean} */
  get virtual() {
    return this.#virtual_670;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_681;
  /** @type {Array<FieldDef>} */
  #fields_682;
  /** @type {SafeIdentifier | null} */
  #primaryKey_683;
  /**
   * @param {string} name_685
   * @returns {FieldDef}
   */
  field(name_685) {
    let return_686;
    fn_687: {
      const this_688 = this.#fields_682;
      const n_689 = this_688.length;
      let i_690 = 0;
      while (i_690 < n_689) {
        const el_691 = listedGet_183(this_688, i_690);
        i_690 = i_690 + 1 | 0;
        const f_692 = el_691;
        if (f_692.name.sqlValue === name_685) {
          return_686 = f_692;
          break fn_687;
        }
      }
      throw Error();
    }
    return return_686;
  }
  /** @returns {string} */
  pkName() {
    let return_694;
    fn_695: {
      const pk_696 = this.#primaryKey_683;
      if (!(pk_696 == null)) {
        const pk_697 = pk_696;
        return_694 = pk_697.sqlValue;
        break fn_695;
      }
      return_694 = "id";
    }
    return return_694;
  }
  /**
   * @param {{
   *   tableName: SafeIdentifier, fields: Array<FieldDef>, primaryKey: SafeIdentifier | null
   * }}
   * props
   * @returns {TableDef}
   */
  static["new"](props) {
    return new TableDef(props.tableName, props.fields, props.primaryKey);
  }
  /**
   * @param {SafeIdentifier} tableName_698
   * @param {Array<FieldDef>} fields_699
   * @param {SafeIdentifier | null} primaryKey_700
   */
  constructor(tableName_698, fields_699, primaryKey_700) {
    super ();
    this.#tableName_681 = tableName_698;
    this.#fields_682 = fields_699;
    this.#primaryKey_683 = primaryKey_700;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_681;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_682;
  }
  /** @returns {SafeIdentifier | null} */
  get primaryKey() {
    return this.#primaryKey_683;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_704;
  /** @param {string} sqlSource_706 */
  appendSafe(sqlSource_706) {
    let t_707 = new SqlSource(sqlSource_706);
    listBuilderAdd_90(this.#buffer_704, t_707);
    return;
  }
  /** @param {SqlFragment} fragment_709 */
  appendFragment(fragment_709) {
    let t_710 = fragment_709.parts;
    listBuilderAddAll_711(this.#buffer_704, t_710);
    return;
  }
  /** @param {SqlPart} part_713 */
  appendPart(part_713) {
    listBuilderAdd_90(this.#buffer_704, part_713);
    return;
  }
  /** @param {Array<SqlPart>} values_715 */
  appendPartList(values_715) {
    const this718 = this;
    function fn_716(x_717) {
      this718.appendPart(x_717);
      return;
    }
    this.#appendList_719(values_715, fn_716);
    return;
  }
  /** @param {boolean} value_721 */
  appendBoolean(value_721) {
    let t_722 = new SqlBoolean(value_721);
    listBuilderAdd_90(this.#buffer_704, t_722);
    return;
  }
  /** @param {Array<boolean>} values_724 */
  appendBooleanList(values_724) {
    const this727 = this;
    function fn_725(x_726) {
      this727.appendBoolean(x_726);
      return;
    }
    this.#appendList_719(values_724, fn_725);
    return;
  }
  /** @param {globalThis.Date} value_729 */
  appendDate(value_729) {
    let t_730 = new SqlDate(value_729);
    listBuilderAdd_90(this.#buffer_704, t_730);
    return;
  }
  /** @param {Array<globalThis.Date>} values_732 */
  appendDateList(values_732) {
    const this735 = this;
    function fn_733(x_734) {
      this735.appendDate(x_734);
      return;
    }
    this.#appendList_719(values_732, fn_733);
    return;
  }
  /** @param {number} value_737 */
  appendFloat64(value_737) {
    let t_738 = new SqlFloat64(value_737);
    listBuilderAdd_90(this.#buffer_704, t_738);
    return;
  }
  /** @param {Array<number>} values_740 */
  appendFloat64List(values_740) {
    const this743 = this;
    function fn_741(x_742) {
      this743.appendFloat64(x_742);
      return;
    }
    this.#appendList_719(values_740, fn_741);
    return;
  }
  /** @param {number} value_745 */
  appendInt32(value_745) {
    let t_746 = new SqlInt32(value_745);
    listBuilderAdd_90(this.#buffer_704, t_746);
    return;
  }
  /** @param {Array<number>} values_748 */
  appendInt32List(values_748) {
    const this751 = this;
    function fn_749(x_750) {
      this751.appendInt32(x_750);
      return;
    }
    this.#appendList_719(values_748, fn_749);
    return;
  }
  /** @param {bigint} value_753 */
  appendInt64(value_753) {
    let t_754 = new SqlInt64(value_753);
    listBuilderAdd_90(this.#buffer_704, t_754);
    return;
  }
  /** @param {Array<bigint>} values_756 */
  appendInt64List(values_756) {
    const this759 = this;
    function fn_757(x_758) {
      this759.appendInt64(x_758);
      return;
    }
    this.#appendList_719(values_756, fn_757);
    return;
  }
  /** @param {string} value_761 */
  appendString(value_761) {
    let t_762 = new SqlString(value_761);
    listBuilderAdd_90(this.#buffer_704, t_762);
    return;
  }
  /** @param {Array<string>} values_764 */
  appendStringList(values_764) {
    const this767 = this;
    function fn_765(x_766) {
      this767.appendString(x_766);
      return;
    }
    this.#appendList_719(values_764, fn_765);
    return;
  }
  /**
   * @template {unknown} T_774
   * @param {Array<T_774>} values_769
   * @param {(arg0: T_774) => void} appendValue_770
   */
  #appendList_719(values_769, appendValue_770) {
    let t_771;
    let t_772;
    let i_773 = 0;
    while (true) {
      t_771 = values_769.length;
      if (!(i_773 < t_771)) {
        break;
      }
      if (i_773 > 0) {
        this.appendSafe(", ");
      }
      t_772 = listedGet_183(values_769, i_773);
      appendValue_770(t_772);
      i_773 = i_773 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_91(this.#buffer_704));
  }
  constructor() {
    super ();
    let t_776 = [];
    this.#buffer_704 = t_776;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_777;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_780;
    const builder_781 = [""];
    let i_782 = 0;
    while (true) {
      t_780 = this.#parts_777.length;
      if (!(i_782 < t_780)) {
        break;
      }
      listedGet_183(this.#parts_777, i_782).formatTo(builder_781);
      i_782 = i_782 + 1 | 0;
    }
    return builder_781[0];
  }
  /** @param {Array<SqlPart>} parts_783 */
  constructor(parts_783) {
    super ();
    this.#parts_777 = parts_783;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_777;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_786 */
  formatTo(builder_786) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_787;
  /** @param {globalThis.Array<string>} builder_789 */
  formatTo(builder_789) {
    builder_789[0] += this.#source_787;
    return;
  }
  /** @param {string} source_790 */
  constructor(source_790) {
    super ();
    this.#source_787 = source_790;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_787;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_792;
  /** @param {globalThis.Array<string>} builder_794 */
  formatTo(builder_794) {
    let t_795;
    if (this.#value_792) {
      t_795 = "TRUE";
    } else {
      t_795 = "FALSE";
    }
    builder_794[0] += t_795;
    return;
  }
  /** @param {boolean} value_796 */
  constructor(value_796) {
    super ();
    this.#value_792 = value_796;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_792;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_798;
  /** @param {globalThis.Array<string>} builder_800 */
  formatTo(builder_800) {
    builder_800[0] += "'";
    let t_801 = this.#value_798.toISOString().split("T")[0];
    function fn_802(c_803) {
      if (c_803 === 39) {
        builder_800[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_804(builder_800, c_803);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_805(t_801, fn_802);
    builder_800[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_806 */
  constructor(value_806) {
    super ();
    this.#value_798 = value_806;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_798;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_808;
  /** @param {globalThis.Array<string>} builder_810 */
  formatTo(builder_810) {
    let t_811;
    let t_812;
    const s_813 = float64ToString_243(this.#value_808);
    if (s_813 === "NaN") {
      t_812 = true;
    } else {
      if (s_813 === "Infinity") {
        t_811 = true;
      } else {
        t_811 = s_813 === "-Infinity";
      }
      t_812 = t_811;
    }
    if (t_812) {
      builder_810[0] += "NULL";
    } else {
      builder_810[0] += s_813;
    }
    return;
  }
  /** @param {number} value_814 */
  constructor(value_814) {
    super ();
    this.#value_808 = value_814;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_808;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_816;
  /** @param {globalThis.Array<string>} builder_818 */
  formatTo(builder_818) {
    let t_819 = this.#value_816.toString();
    builder_818[0] += t_819;
    return;
  }
  /** @param {number} value_820 */
  constructor(value_820) {
    super ();
    this.#value_816 = value_820;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_816;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_822;
  /** @param {globalThis.Array<string>} builder_824 */
  formatTo(builder_824) {
    let t_825 = this.#value_822.toString();
    builder_824[0] += t_825;
    return;
  }
  /** @param {bigint} value_826 */
  constructor(value_826) {
    super ();
    this.#value_822 = value_826;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_822;
  }
};
export class SqlDefault extends type__6(SqlPart) {
  /** @param {globalThis.Array<string>} builder_829 */
  formatTo(builder_829) {
    builder_829[0] += "DEFAULT";
    return;
  }
  constructor() {
    super ();
    return;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_830;
  /** @param {globalThis.Array<string>} builder_832 */
  formatTo(builder_832) {
    builder_832[0] += "'";
    function fn_833(c_834) {
      if (c_834 === 39) {
        builder_832[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_804(builder_832, c_834);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_805(this.#value_830, fn_833);
    builder_832[0] += "'";
    return;
  }
  /** @param {string} value_835 */
  constructor(value_835) {
    super ();
    this.#value_830 = value_835;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_830;
  }
};
/**
 * @param {TableDef} tableDef_837
 * @param {Map<string, string>} params_838
 * @returns {Changeset}
 */
export function changeset(tableDef_837, params_838) {
  let t_839 = mapConstructor_840(Object.freeze([]));
  return new ChangesetImpl_75(tableDef_837, params_838, t_839, Object.freeze([]), true);
};
/**
 * @param {number} c_842
 * @returns {boolean}
 */
function isIdentStart_841(c_842) {
  let return_843;
  let t_844;
  let t_845;
  if (c_842 >= 97) {
    t_844 = c_842 <= 122;
  } else {
    t_844 = false;
  }
  if (t_844) {
    return_843 = true;
  } else {
    if (c_842 >= 65) {
      t_845 = c_842 <= 90;
    } else {
      t_845 = false;
    }
    if (t_845) {
      return_843 = true;
    } else {
      return_843 = c_842 === 95;
    }
  }
  return return_843;
}
/**
 * @param {number} c_847
 * @returns {boolean}
 */
function isIdentPart_846(c_847) {
  let return_848;
  if (isIdentStart_841(c_847)) {
    return_848 = true;
  } else if (c_847 >= 48) {
    return_848 = c_847 <= 57;
  } else {
    return_848 = false;
  }
  return return_848;
}
/**
 * @param {string} name_849
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_849) {
  let t_850;
  if (! name_849) {
    throw Error();
  }
  let idx_851 = 0;
  if (! isIdentStart_841(stringGet_320(name_849, idx_851))) {
    throw Error();
  }
  let t_852 = stringNext_317(name_849, idx_851);
  idx_851 = t_852;
  while (true) {
    if (!(name_849.length > idx_851)) {
      break;
    }
    if (! isIdentPart_846(stringGet_320(name_849, idx_851))) {
      throw Error();
    }
    t_850 = stringNext_317(name_849, idx_851);
    idx_851 = t_850;
  }
  return new ValidatedIdentifier_662(name_849);
};
/** @returns {Array<FieldDef>} */
export function timestamps() {
  let t_1356;
  t_1356 = safeIdentifier("inserted_at");
  let t_1357 = new FieldDef(t_1356, new DateField(), true, new SqlDefault(), false);
  let t_1358;
  t_1358 = safeIdentifier("updated_at");
  return Object.freeze([t_1357, new FieldDef(t_1358, new DateField(), true, new SqlDefault(), false)]);
};
/**
 * @param {TableDef} tableDef_1424
 * @param {number} id_1425
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_1424, id_1425) {
  const b_1426 = new SqlBuilder();
  b_1426.appendSafe("DELETE FROM ");
  b_1426.appendSafe(tableDef_1424.tableName.sqlValue);
  b_1426.appendSafe(" WHERE ");
  b_1426.appendSafe(tableDef_1424.pkName());
  b_1426.appendSafe(" = ");
  b_1426.appendInt32(id_1425);
  return b_1426.accumulated;
};
/**
 * @param {SqlBuilder} b_1638
 * @param {Array<WhereClause>} conditions_1639
 */
function renderWhere_559(b_1638, conditions_1639) {
  let t_1640;
  let t_1641;
  let t_1642;
  let t_1643;
  if (! ! conditions_1639.length) {
    b_1638.appendSafe(" WHERE ");
    t_1640 = listedGet_183(conditions_1639, 0).condition;
    b_1638.appendFragment(t_1640);
    let i_1644 = 1;
    while (true) {
      t_1641 = conditions_1639.length;
      if (!(i_1644 < t_1641)) {
        break;
      }
      b_1638.appendSafe(" ");
      t_1642 = listedGet_183(conditions_1639, i_1644).keyword();
      b_1638.appendSafe(t_1642);
      b_1638.appendSafe(" ");
      t_1643 = listedGet_183(conditions_1639, i_1644).condition;
      b_1638.appendFragment(t_1643);
      i_1644 = i_1644 + 1 | 0;
    }
  }
  return;
}
/**
 * @param {SqlBuilder} b_1645
 * @param {Array<JoinClause>} joinClauses_1646
 */
function renderJoins_558(b_1645, joinClauses_1646) {
  function fn_1647(jc_1648) {
    b_1645.appendSafe(" ");
    let t_1649 = jc_1648.joinType.keyword();
    b_1645.appendSafe(t_1649);
    b_1645.appendSafe(" ");
    let t_1650 = jc_1648.table.sqlValue;
    b_1645.appendSafe(t_1650);
    const oc_1651 = jc_1648.onCondition;
    if (!(oc_1651 == null)) {
      const oc_1652 = oc_1651;
      b_1645.appendSafe(" ON ");
      b_1645.appendFragment(oc_1652);
    }
    return;
  }
  joinClauses_1646.forEach(fn_1647);
  return;
}
/**
 * @param {SqlBuilder} b_1653
 * @param {Array<SafeIdentifier>} groupByFields_1654
 */
function renderGroupBy_560(b_1653, groupByFields_1654) {
  let t_1655;
  if (! ! groupByFields_1654.length) {
    b_1653.appendSafe(" GROUP BY ");
    function fn_1656(f_1657) {
      return f_1657.sqlValue;
    }
    t_1655 = listedJoin_376(groupByFields_1654, ", ", fn_1656);
    b_1653.appendSafe(t_1655);
  }
  return;
}
/**
 * @param {SqlBuilder} b_1658
 * @param {Array<WhereClause>} havingConditions_1659
 */
function renderHaving_561(b_1658, havingConditions_1659) {
  let t_1660;
  let t_1661;
  let t_1662;
  let t_1663;
  if (! ! havingConditions_1659.length) {
    b_1658.appendSafe(" HAVING ");
    t_1660 = listedGet_183(havingConditions_1659, 0).condition;
    b_1658.appendFragment(t_1660);
    let i_1664 = 1;
    while (true) {
      t_1661 = havingConditions_1659.length;
      if (!(i_1664 < t_1661)) {
        break;
      }
      b_1658.appendSafe(" ");
      t_1662 = listedGet_183(havingConditions_1659, i_1664).keyword();
      b_1658.appendSafe(t_1662);
      b_1658.appendSafe(" ");
      t_1663 = listedGet_183(havingConditions_1659, i_1664).condition;
      b_1658.appendFragment(t_1663);
      i_1664 = i_1664 + 1 | 0;
    }
  }
  return;
}
/**
 * @param {SafeIdentifier} tableName_1665
 * @returns {Query}
 */
export function from(tableName_1665) {
  return new Query(tableName_1665, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} table_1666
 * @param {SafeIdentifier} column_1667
 * @returns {SqlFragment}
 */
export function col(table_1666, column_1667) {
  const b_1668 = new SqlBuilder();
  b_1668.appendSafe(table_1666.sqlValue);
  b_1668.appendSafe(".");
  b_1668.appendSafe(column_1667.sqlValue);
  return b_1668.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_1669 = new SqlBuilder();
  b_1669.appendSafe("COUNT(*)");
  return b_1669.accumulated;
};
/**
 * @param {SafeIdentifier} field_1670
 * @returns {SqlFragment}
 */
export function countCol(field_1670) {
  const b_1671 = new SqlBuilder();
  b_1671.appendSafe("COUNT(");
  b_1671.appendSafe(field_1670.sqlValue);
  b_1671.appendSafe(")");
  return b_1671.accumulated;
};
/**
 * @param {SafeIdentifier} field_1672
 * @returns {SqlFragment}
 */
export function sumCol(field_1672) {
  const b_1673 = new SqlBuilder();
  b_1673.appendSafe("SUM(");
  b_1673.appendSafe(field_1672.sqlValue);
  b_1673.appendSafe(")");
  return b_1673.accumulated;
};
/**
 * @param {SafeIdentifier} field_1674
 * @returns {SqlFragment}
 */
export function avgCol(field_1674) {
  const b_1675 = new SqlBuilder();
  b_1675.appendSafe("AVG(");
  b_1675.appendSafe(field_1674.sqlValue);
  b_1675.appendSafe(")");
  return b_1675.accumulated;
};
/**
 * @param {SafeIdentifier} field_1676
 * @returns {SqlFragment}
 */
export function minCol(field_1676) {
  const b_1677 = new SqlBuilder();
  b_1677.appendSafe("MIN(");
  b_1677.appendSafe(field_1676.sqlValue);
  b_1677.appendSafe(")");
  return b_1677.accumulated;
};
/**
 * @param {SafeIdentifier} field_1678
 * @returns {SqlFragment}
 */
export function maxCol(field_1678) {
  const b_1679 = new SqlBuilder();
  b_1679.appendSafe("MAX(");
  b_1679.appendSafe(field_1678.sqlValue);
  b_1679.appendSafe(")");
  return b_1679.accumulated;
};
/**
 * @param {Query} a_1680
 * @param {Query} b_1681
 * @returns {SqlFragment}
 */
export function unionSql(a_1680, b_1681) {
  const sb_1682 = new SqlBuilder();
  sb_1682.appendSafe("(");
  sb_1682.appendFragment(a_1680.toSql());
  sb_1682.appendSafe(") UNION (");
  sb_1682.appendFragment(b_1681.toSql());
  sb_1682.appendSafe(")");
  return sb_1682.accumulated;
};
/**
 * @param {Query} a_1683
 * @param {Query} b_1684
 * @returns {SqlFragment}
 */
export function unionAllSql(a_1683, b_1684) {
  const sb_1685 = new SqlBuilder();
  sb_1685.appendSafe("(");
  sb_1685.appendFragment(a_1683.toSql());
  sb_1685.appendSafe(") UNION ALL (");
  sb_1685.appendFragment(b_1684.toSql());
  sb_1685.appendSafe(")");
  return sb_1685.accumulated;
};
/**
 * @param {Query} a_1686
 * @param {Query} b_1687
 * @returns {SqlFragment}
 */
export function intersectSql(a_1686, b_1687) {
  const sb_1688 = new SqlBuilder();
  sb_1688.appendSafe("(");
  sb_1688.appendFragment(a_1686.toSql());
  sb_1688.appendSafe(") INTERSECT (");
  sb_1688.appendFragment(b_1687.toSql());
  sb_1688.appendSafe(")");
  return sb_1688.accumulated;
};
/**
 * @param {Query} a_1689
 * @param {Query} b_1690
 * @returns {SqlFragment}
 */
export function exceptSql(a_1689, b_1690) {
  const sb_1691 = new SqlBuilder();
  sb_1691.appendSafe("(");
  sb_1691.appendFragment(a_1689.toSql());
  sb_1691.appendSafe(") EXCEPT (");
  sb_1691.appendFragment(b_1690.toSql());
  sb_1691.appendSafe(")");
  return sb_1691.accumulated;
};
/**
 * @param {Query} q_1692
 * @param {SafeIdentifier} alias_1693
 * @returns {SqlFragment}
 */
export function subquery(q_1692, alias_1693) {
  const b_1694 = new SqlBuilder();
  b_1694.appendSafe("(");
  b_1694.appendFragment(q_1692.toSql());
  b_1694.appendSafe(") AS ");
  b_1694.appendSafe(alias_1693.sqlValue);
  return b_1694.accumulated;
};
/**
 * @param {Query} q_1695
 * @returns {SqlFragment}
 */
export function existsSql(q_1695) {
  const b_1696 = new SqlBuilder();
  b_1696.appendSafe("EXISTS (");
  b_1696.appendFragment(q_1695.toSql());
  b_1696.appendSafe(")");
  return b_1696.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_1697
 * @returns {UpdateQuery}
 */
export function update(tableName_1697) {
  return new UpdateQuery(tableName_1697, Object.freeze([]), Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} tableName_1698
 * @returns {DeleteQuery}
 */
export function deleteFrom(tableName_1698) {
  return new DeleteQuery(tableName_1698, Object.freeze([]), null);
};
