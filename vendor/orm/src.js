import {
  type as type__6, cmpFloat as cmpFloat__278, mapBuilderConstructor as mapBuilderConstructor_88, mappedGetOr as mappedGetOr_94, mapBuilderSet as mapBuilderSet_96, mappedToMap as mappedToMap_97, listBuilderAdd as listBuilderAdd_113, listBuilderToList as listBuilderToList_114, stringCountBetween as stringCountBetween_129, stringToInt32 as stringToInt32_143, stringToInt64 as stringToInt64_156, stringToFloat64 as stringToFloat64_169, mappedToList as mappedToList_195, listedGet as listedGet_197, float64ToString as float64ToString_280, requireStringIndex as requireStringIndex_351, stringNext as stringNext_381, stringGet as stringGet_384, listedJoin as listedJoin_441, listBuilderAddAll as listBuilderAddAll_800, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_893, stringForEach as stringForEach_894, mapConstructor as mapConstructor_929, panic as panic_946, pairConstructor as pairConstructor_951
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
   * @param {Array<SafeIdentifier>} allowedFields_86
   * @returns {Changeset}
   */
  cast(allowedFields_86) {
    const this95 = this;
    const mb_87 = mapBuilderConstructor_88();
    function fn_89(f_90) {
      let t_91;
      let t_92 = f_90.sqlValue;
      const val_93 = mappedGetOr_94(this95.#_params_77, t_92, "");
      if (! ! val_93) {
        t_91 = f_90.sqlValue;
        mapBuilderSet_96(mb_87, t_91, val_93);
      }
      return;
    }
    allowedFields_86.forEach(fn_89);
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_97(mb_87), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_99
   * @returns {Changeset}
   */
  validateRequired(fields_99) {
    const this112 = this;
    let return_100;
    let t_101;
    let t_102;
    let t_103;
    let t_104;
    fn_105: {
      if (! this.#_isValid_80) {
        return_100 = this;
        break fn_105;
      }
      const eb_106 = this.#_errors_79.slice();
      let valid_107 = true;
      function fn_108(f_109) {
        let t_110;
        let t_111 = f_109.sqlValue;
        if (! this112.#_changes_78.has(t_111)) {
          t_110 = new ChangesetError(f_109.sqlValue, "is required");
          listBuilderAdd_113(eb_106, t_110);
          valid_107 = false;
        }
        return;
      }
      fields_99.forEach(fn_108);
      t_102 = this.#_tableDef_76;
      t_103 = this.#_params_77;
      t_104 = this.#_changes_78;
      t_101 = listBuilderToList_114(eb_106);
      return_100 = new ChangesetImpl_75(t_102, t_103, t_104, t_101, valid_107);
    }
    return return_100;
  }
  /**
   * @param {SafeIdentifier} field_116
   * @param {number} min_117
   * @param {number} max_118
   * @returns {Changeset}
   */
  validateLength(field_116, min_117, max_118) {
    let return_119;
    let t_120;
    let t_121;
    let t_122;
    let t_123;
    let t_124;
    let t_125;
    fn_126: {
      if (! this.#_isValid_80) {
        return_119 = this;
        break fn_126;
      }
      t_120 = field_116.sqlValue;
      const val_127 = mappedGetOr_94(this.#_changes_78, t_120, "");
      const len_128 = stringCountBetween_129(val_127, 0, val_127.length);
      if (len_128 < min_117) {
        t_122 = true;
      } else {
        t_122 = len_128 > max_118;
      }
      if (t_122) {
        const msg_130 = "must be between " + min_117.toString() + " and " + max_118.toString() + " characters";
        const eb_131 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_131, new ChangesetError(field_116.sqlValue, msg_130));
        t_123 = this.#_tableDef_76;
        t_124 = this.#_params_77;
        t_125 = this.#_changes_78;
        t_121 = listBuilderToList_114(eb_131);
        return_119 = new ChangesetImpl_75(t_123, t_124, t_125, t_121, false);
        break fn_126;
      }
      return_119 = this;
    }
    return return_119;
  }
  /**
   * @param {SafeIdentifier} field_133
   * @returns {Changeset}
   */
  validateInt(field_133) {
    let return_134;
    let t_135;
    let t_136;
    let t_137;
    let t_138;
    let t_139;
    fn_140: {
      if (! this.#_isValid_80) {
        return_134 = this;
        break fn_140;
      }
      t_135 = field_133.sqlValue;
      const val_141 = mappedGetOr_94(this.#_changes_78, t_135, "");
      if (! val_141) {
        return_134 = this;
        break fn_140;
      }
      let parseOk_142;
      try {
        stringToInt32_143(val_141);
        parseOk_142 = true;
      } catch {
        parseOk_142 = false;
      }
      if (! parseOk_142) {
        const eb_144 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_144, new ChangesetError(field_133.sqlValue, "must be an integer"));
        t_137 = this.#_tableDef_76;
        t_138 = this.#_params_77;
        t_139 = this.#_changes_78;
        t_136 = listBuilderToList_114(eb_144);
        return_134 = new ChangesetImpl_75(t_137, t_138, t_139, t_136, false);
        break fn_140;
      }
      return_134 = this;
    }
    return return_134;
  }
  /**
   * @param {SafeIdentifier} field_146
   * @returns {Changeset}
   */
  validateInt64(field_146) {
    let return_147;
    let t_148;
    let t_149;
    let t_150;
    let t_151;
    let t_152;
    fn_153: {
      if (! this.#_isValid_80) {
        return_147 = this;
        break fn_153;
      }
      t_148 = field_146.sqlValue;
      const val_154 = mappedGetOr_94(this.#_changes_78, t_148, "");
      if (! val_154) {
        return_147 = this;
        break fn_153;
      }
      let parseOk_155;
      try {
        stringToInt64_156(val_154);
        parseOk_155 = true;
      } catch {
        parseOk_155 = false;
      }
      if (! parseOk_155) {
        const eb_157 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_157, new ChangesetError(field_146.sqlValue, "must be a 64-bit integer"));
        t_150 = this.#_tableDef_76;
        t_151 = this.#_params_77;
        t_152 = this.#_changes_78;
        t_149 = listBuilderToList_114(eb_157);
        return_147 = new ChangesetImpl_75(t_150, t_151, t_152, t_149, false);
        break fn_153;
      }
      return_147 = this;
    }
    return return_147;
  }
  /**
   * @param {SafeIdentifier} field_159
   * @returns {Changeset}
   */
  validateFloat(field_159) {
    let return_160;
    let t_161;
    let t_162;
    let t_163;
    let t_164;
    let t_165;
    fn_166: {
      if (! this.#_isValid_80) {
        return_160 = this;
        break fn_166;
      }
      t_161 = field_159.sqlValue;
      const val_167 = mappedGetOr_94(this.#_changes_78, t_161, "");
      if (! val_167) {
        return_160 = this;
        break fn_166;
      }
      let parseOk_168;
      try {
        stringToFloat64_169(val_167);
        parseOk_168 = true;
      } catch {
        parseOk_168 = false;
      }
      if (! parseOk_168) {
        const eb_170 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_170, new ChangesetError(field_159.sqlValue, "must be a number"));
        t_163 = this.#_tableDef_76;
        t_164 = this.#_params_77;
        t_165 = this.#_changes_78;
        t_162 = listBuilderToList_114(eb_170);
        return_160 = new ChangesetImpl_75(t_163, t_164, t_165, t_162, false);
        break fn_166;
      }
      return_160 = this;
    }
    return return_160;
  }
  /**
   * @param {SafeIdentifier} field_172
   * @returns {Changeset}
   */
  validateBool(field_172) {
    let return_173;
    let t_174;
    let t_175;
    let t_176;
    let t_177;
    let t_178;
    let t_179;
    let t_180;
    let t_181;
    let t_182;
    let t_183;
    fn_184: {
      if (! this.#_isValid_80) {
        return_173 = this;
        break fn_184;
      }
      t_174 = field_172.sqlValue;
      const val_185 = mappedGetOr_94(this.#_changes_78, t_174, "");
      if (! val_185) {
        return_173 = this;
        break fn_184;
      }
      let isTrue_186;
      if (val_185 === "true") {
        isTrue_186 = true;
      } else {
        if (val_185 === "1") {
          t_177 = true;
        } else {
          if (val_185 === "yes") {
            t_176 = true;
          } else {
            t_176 = val_185 === "on";
          }
          t_177 = t_176;
        }
        isTrue_186 = t_177;
      }
      let isFalse_187;
      if (val_185 === "false") {
        isFalse_187 = true;
      } else {
        if (val_185 === "0") {
          t_179 = true;
        } else {
          if (val_185 === "no") {
            t_178 = true;
          } else {
            t_178 = val_185 === "off";
          }
          t_179 = t_178;
        }
        isFalse_187 = t_179;
      }
      if (! isTrue_186) {
        t_180 = ! isFalse_187;
      } else {
        t_180 = false;
      }
      if (t_180) {
        const eb_188 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_188, new ChangesetError(field_172.sqlValue, "must be a boolean (true/false/1/0/yes/no/on/off)"));
        t_181 = this.#_tableDef_76;
        t_182 = this.#_params_77;
        t_183 = this.#_changes_78;
        t_175 = listBuilderToList_114(eb_188);
        return_173 = new ChangesetImpl_75(t_181, t_182, t_183, t_175, false);
        break fn_184;
      }
      return_173 = this;
    }
    return return_173;
  }
  /**
   * @param {SafeIdentifier} field_190
   * @param {string} value_191
   * @returns {Changeset}
   */
  putChange(field_190, value_191) {
    let t_192;
    const mb_193 = mapBuilderConstructor_88();
    const pairs_194 = mappedToList_195(this.#_changes_78);
    let i_196 = 0;
    while (true) {
      t_192 = pairs_194.length;
      if (!(i_196 < t_192)) {
        break;
      }
      mapBuilderSet_96(mb_193, listedGet_197(pairs_194, i_196).key, listedGet_197(pairs_194, i_196).value);
      i_196 = i_196 + 1 | 0;
    }
    mapBuilderSet_96(mb_193, field_190.sqlValue, value_191);
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_97(mb_193), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {SafeIdentifier} field_199
   * @returns {string}
   */
  getChange(field_199) {
    let t_200 = field_199.sqlValue;
    if (! this.#_changes_78.has(t_200)) {
      throw Error();
    }
    let t_201 = field_199.sqlValue;
    return mappedGetOr_94(this.#_changes_78, t_201, "");
  }
  /**
   * @param {SafeIdentifier} field_203
   * @returns {Changeset}
   */
  deleteChange(field_203) {
    let t_204;
    const mb_205 = mapBuilderConstructor_88();
    const pairs_206 = mappedToList_195(this.#_changes_78);
    let i_207 = 0;
    while (true) {
      t_204 = pairs_206.length;
      if (!(i_207 < t_204)) {
        break;
      }
      if (listedGet_197(pairs_206, i_207).key !== field_203.sqlValue) {
        mapBuilderSet_96(mb_205, listedGet_197(pairs_206, i_207).key, listedGet_197(pairs_206, i_207).value);
      }
      i_207 = i_207 + 1 | 0;
    }
    return new ChangesetImpl_75(this.#_tableDef_76, this.#_params_77, mappedToMap_97(mb_205), this.#_errors_79, this.#_isValid_80);
  }
  /**
   * @param {SafeIdentifier} field_209
   * @param {Array<string>} allowed_210
   * @returns {Changeset}
   */
  validateInclusion(field_209, allowed_210) {
    let return_211;
    let t_212;
    let t_213;
    let t_214;
    let t_215;
    let t_216;
    let t_217;
    fn_218: {
      if (! this.#_isValid_80) {
        return_211 = this;
        break fn_218;
      }
      t_212 = field_209.sqlValue;
      if (! this.#_changes_78.has(t_212)) {
        return_211 = this;
        break fn_218;
      }
      t_213 = field_209.sqlValue;
      const val_219 = mappedGetOr_94(this.#_changes_78, t_213, "");
      let found_220 = false;
      function fn_221(a_222) {
        if (a_222 === val_219) {
          found_220 = true;
        }
        return;
      }
      allowed_210.forEach(fn_221);
      if (! found_220) {
        const eb_223 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_223, new ChangesetError(field_209.sqlValue, "is not included in the list"));
        t_215 = this.#_tableDef_76;
        t_216 = this.#_params_77;
        t_217 = this.#_changes_78;
        t_214 = listBuilderToList_114(eb_223);
        return_211 = new ChangesetImpl_75(t_215, t_216, t_217, t_214, false);
        break fn_218;
      }
      return_211 = this;
    }
    return return_211;
  }
  /**
   * @param {SafeIdentifier} field_225
   * @param {Array<string>} disallowed_226
   * @returns {Changeset}
   */
  validateExclusion(field_225, disallowed_226) {
    let return_227;
    let t_228;
    let t_229;
    let t_230;
    let t_231;
    let t_232;
    let t_233;
    fn_234: {
      if (! this.#_isValid_80) {
        return_227 = this;
        break fn_234;
      }
      t_228 = field_225.sqlValue;
      if (! this.#_changes_78.has(t_228)) {
        return_227 = this;
        break fn_234;
      }
      t_229 = field_225.sqlValue;
      const val_235 = mappedGetOr_94(this.#_changes_78, t_229, "");
      let found_236 = false;
      function fn_237(d_238) {
        if (d_238 === val_235) {
          found_236 = true;
        }
        return;
      }
      disallowed_226.forEach(fn_237);
      if (found_236) {
        const eb_239 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_239, new ChangesetError(field_225.sqlValue, "is reserved"));
        t_231 = this.#_tableDef_76;
        t_232 = this.#_params_77;
        t_233 = this.#_changes_78;
        t_230 = listBuilderToList_114(eb_239);
        return_227 = new ChangesetImpl_75(t_231, t_232, t_233, t_230, false);
        break fn_234;
      }
      return_227 = this;
    }
    return return_227;
  }
  /**
   * @param {SafeIdentifier} field_241
   * @param {NumberValidationOpts} opts_242
   * @returns {Changeset}
   */
  validateNumber(field_241, opts_242) {
    let return_243;
    let t_244;
    let t_245;
    let t_246;
    let t_247;
    let t_248;
    let t_249;
    let t_250;
    let t_251;
    let t_252;
    let t_253;
    let t_254;
    let t_255;
    let t_256;
    let t_257;
    let t_258;
    let t_259;
    let t_260;
    let t_261;
    let t_262;
    let t_263;
    let t_264;
    let t_265;
    let t_266;
    let t_267;
    let t_268;
    let t_269;
    let t_270;
    fn_271: {
      if (! this.#_isValid_80) {
        return_243 = this;
        break fn_271;
      }
      t_244 = field_241.sqlValue;
      if (! this.#_changes_78.has(t_244)) {
        return_243 = this;
        break fn_271;
      }
      t_245 = field_241.sqlValue;
      const val_272 = mappedGetOr_94(this.#_changes_78, t_245, "");
      let parseOk_273;
      try {
        stringToFloat64_169(val_272);
        parseOk_273 = true;
      } catch {
        parseOk_273 = false;
      }
      if (! parseOk_273) {
        const eb_274 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_274, new ChangesetError(field_241.sqlValue, "must be a number"));
        t_252 = this.#_tableDef_76;
        t_253 = this.#_params_77;
        t_254 = this.#_changes_78;
        t_246 = listBuilderToList_114(eb_274);
        return_243 = new ChangesetImpl_75(t_252, t_253, t_254, t_246, false);
        break fn_271;
      }
      let num_275;
      try {
        t_255 = stringToFloat64_169(val_272);
        num_275 = t_255;
      } catch {
        num_275 = 0.0;
      }
      const gt_276 = opts_242.greaterThan;
      if (!(gt_276 == null)) {
        const gt_277 = gt_276;
        if (!(cmpFloat__278(num_275, gt_277) > 0)) {
          const eb_279 = this.#_errors_79.slice();
          listBuilderAdd_113(eb_279, new ChangesetError(field_241.sqlValue, "must be greater than " + float64ToString_280(gt_277)));
          t_256 = this.#_tableDef_76;
          t_257 = this.#_params_77;
          t_258 = this.#_changes_78;
          t_247 = listBuilderToList_114(eb_279);
          return_243 = new ChangesetImpl_75(t_256, t_257, t_258, t_247, false);
          break fn_271;
        }
      }
      const lt_281 = opts_242.lessThan;
      if (!(lt_281 == null)) {
        const lt_282 = lt_281;
        if (!(cmpFloat__278(num_275, lt_282) < 0)) {
          const eb_283 = this.#_errors_79.slice();
          listBuilderAdd_113(eb_283, new ChangesetError(field_241.sqlValue, "must be less than " + float64ToString_280(lt_282)));
          t_259 = this.#_tableDef_76;
          t_260 = this.#_params_77;
          t_261 = this.#_changes_78;
          t_248 = listBuilderToList_114(eb_283);
          return_243 = new ChangesetImpl_75(t_259, t_260, t_261, t_248, false);
          break fn_271;
        }
      }
      const gte_284 = opts_242.greaterThanOrEqual;
      if (!(gte_284 == null)) {
        const gte_285 = gte_284;
        if (!(cmpFloat__278(num_275, gte_285) >= 0)) {
          const eb_286 = this.#_errors_79.slice();
          listBuilderAdd_113(eb_286, new ChangesetError(field_241.sqlValue, "must be greater than or equal to " + float64ToString_280(gte_285)));
          t_262 = this.#_tableDef_76;
          t_263 = this.#_params_77;
          t_264 = this.#_changes_78;
          t_249 = listBuilderToList_114(eb_286);
          return_243 = new ChangesetImpl_75(t_262, t_263, t_264, t_249, false);
          break fn_271;
        }
      }
      const lte_287 = opts_242.lessThanOrEqual;
      if (!(lte_287 == null)) {
        const lte_288 = lte_287;
        if (!(cmpFloat__278(num_275, lte_288) <= 0)) {
          const eb_289 = this.#_errors_79.slice();
          listBuilderAdd_113(eb_289, new ChangesetError(field_241.sqlValue, "must be less than or equal to " + float64ToString_280(lte_288)));
          t_265 = this.#_tableDef_76;
          t_266 = this.#_params_77;
          t_267 = this.#_changes_78;
          t_250 = listBuilderToList_114(eb_289);
          return_243 = new ChangesetImpl_75(t_265, t_266, t_267, t_250, false);
          break fn_271;
        }
      }
      const eq_290 = opts_242.equalTo;
      if (!(eq_290 == null)) {
        const eq_291 = eq_290;
        if (!(cmpFloat__278(num_275, eq_291) === 0)) {
          const eb_292 = this.#_errors_79.slice();
          listBuilderAdd_113(eb_292, new ChangesetError(field_241.sqlValue, "must be equal to " + float64ToString_280(eq_291)));
          t_268 = this.#_tableDef_76;
          t_269 = this.#_params_77;
          t_270 = this.#_changes_78;
          t_251 = listBuilderToList_114(eb_292);
          return_243 = new ChangesetImpl_75(t_268, t_269, t_270, t_251, false);
          break fn_271;
        }
      }
      return_243 = this;
    }
    return return_243;
  }
  /**
   * @param {SafeIdentifier} field_294
   * @returns {Changeset}
   */
  validateAcceptance(field_294) {
    let return_295;
    let t_296;
    let t_297;
    let t_298;
    let t_299;
    let t_300;
    let t_301;
    let t_302;
    let t_303;
    fn_304: {
      if (! this.#_isValid_80) {
        return_295 = this;
        break fn_304;
      }
      t_296 = field_294.sqlValue;
      if (! this.#_changes_78.has(t_296)) {
        return_295 = this;
        break fn_304;
      }
      t_297 = field_294.sqlValue;
      const val_305 = mappedGetOr_94(this.#_changes_78, t_297, "");
      let accepted_306;
      if (val_305 === "true") {
        accepted_306 = true;
      } else {
        if (val_305 === "1") {
          t_300 = true;
        } else {
          if (val_305 === "yes") {
            t_299 = true;
          } else {
            t_299 = val_305 === "on";
          }
          t_300 = t_299;
        }
        accepted_306 = t_300;
      }
      if (! accepted_306) {
        const eb_307 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_307, new ChangesetError(field_294.sqlValue, "must be accepted"));
        t_301 = this.#_tableDef_76;
        t_302 = this.#_params_77;
        t_303 = this.#_changes_78;
        t_298 = listBuilderToList_114(eb_307);
        return_295 = new ChangesetImpl_75(t_301, t_302, t_303, t_298, false);
        break fn_304;
      }
      return_295 = this;
    }
    return return_295;
  }
  /**
   * @param {SafeIdentifier} field_309
   * @param {SafeIdentifier} confirmationField_310
   * @returns {Changeset}
   */
  validateConfirmation(field_309, confirmationField_310) {
    let return_311;
    let t_312;
    let t_313;
    let t_314;
    let t_315;
    let t_316;
    let t_317;
    let t_318;
    fn_319: {
      if (! this.#_isValid_80) {
        return_311 = this;
        break fn_319;
      }
      t_312 = field_309.sqlValue;
      if (! this.#_changes_78.has(t_312)) {
        return_311 = this;
        break fn_319;
      }
      t_313 = field_309.sqlValue;
      const val_320 = mappedGetOr_94(this.#_changes_78, t_313, "");
      t_314 = confirmationField_310.sqlValue;
      const conf_321 = mappedGetOr_94(this.#_changes_78, t_314, "");
      if (val_320 !== conf_321) {
        const eb_322 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_322, new ChangesetError(confirmationField_310.sqlValue, "does not match"));
        t_316 = this.#_tableDef_76;
        t_317 = this.#_params_77;
        t_318 = this.#_changes_78;
        t_315 = listBuilderToList_114(eb_322);
        return_311 = new ChangesetImpl_75(t_316, t_317, t_318, t_315, false);
        break fn_319;
      }
      return_311 = this;
    }
    return return_311;
  }
  /**
   * @param {SafeIdentifier} field_324
   * @param {string} substring_325
   * @returns {Changeset}
   */
  validateContains(field_324, substring_325) {
    let return_326;
    let t_327;
    let t_328;
    let t_329;
    let t_330;
    let t_331;
    let t_332;
    fn_333: {
      if (! this.#_isValid_80) {
        return_326 = this;
        break fn_333;
      }
      t_327 = field_324.sqlValue;
      if (! this.#_changes_78.has(t_327)) {
        return_326 = this;
        break fn_333;
      }
      t_328 = field_324.sqlValue;
      const val_334 = mappedGetOr_94(this.#_changes_78, t_328, "");
      if (!(val_334.indexOf(substring_325) >= 0)) {
        const eb_335 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_335, new ChangesetError(field_324.sqlValue, "must contain the given substring"));
        t_330 = this.#_tableDef_76;
        t_331 = this.#_params_77;
        t_332 = this.#_changes_78;
        t_329 = listBuilderToList_114(eb_335);
        return_326 = new ChangesetImpl_75(t_330, t_331, t_332, t_329, false);
        break fn_333;
      }
      return_326 = this;
    }
    return return_326;
  }
  /**
   * @param {SafeIdentifier} field_337
   * @param {string} prefix_338
   * @returns {Changeset}
   */
  validateStartsWith(field_337, prefix_338) {
    let return_339;
    let t_340;
    let t_341;
    let t_342;
    let t_343;
    let t_344;
    let t_345;
    let t_346;
    fn_347: {
      if (! this.#_isValid_80) {
        return_339 = this;
        break fn_347;
      }
      t_340 = field_337.sqlValue;
      if (! this.#_changes_78.has(t_340)) {
        return_339 = this;
        break fn_347;
      }
      t_341 = field_337.sqlValue;
      const val_348 = mappedGetOr_94(this.#_changes_78, t_341, "");
      const idx_349 = val_348.indexOf(prefix_338);
      let starts_350;
      if (idx_349 >= 0) {
        t_342 = stringCountBetween_129(val_348, 0, requireStringIndex_351(idx_349));
        starts_350 = t_342 === 0;
      } else {
        starts_350 = false;
      }
      if (! starts_350) {
        const eb_352 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_352, new ChangesetError(field_337.sqlValue, "must start with the given prefix"));
        t_344 = this.#_tableDef_76;
        t_345 = this.#_params_77;
        t_346 = this.#_changes_78;
        t_343 = listBuilderToList_114(eb_352);
        return_339 = new ChangesetImpl_75(t_344, t_345, t_346, t_343, false);
        break fn_347;
      }
      return_339 = this;
    }
    return return_339;
  }
  /**
   * @param {SafeIdentifier} field_354
   * @param {string} suffix_355
   * @returns {Changeset}
   */
  validateEndsWith(field_354, suffix_355) {
    let return_356;
    let t_357;
    let t_358;
    let t_359;
    let t_360;
    let t_361;
    let t_362;
    let t_363;
    let t_364;
    let t_365;
    let t_366;
    let t_367;
    let t_368;
    let t_369;
    let t_370;
    let t_371;
    let t_372;
    fn_373: {
      if (! this.#_isValid_80) {
        return_356 = this;
        break fn_373;
      }
      t_357 = field_354.sqlValue;
      if (! this.#_changes_78.has(t_357)) {
        return_356 = this;
        break fn_373;
      }
      t_358 = field_354.sqlValue;
      const val_374 = mappedGetOr_94(this.#_changes_78, t_358, "");
      const valLen_375 = stringCountBetween_129(val_374, 0, val_374.length);
      t_359 = suffix_355.length;
      const suffixLen_376 = stringCountBetween_129(suffix_355, 0, t_359);
      if (valLen_375 < suffixLen_376) {
        const eb_377 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_377, new ChangesetError(field_354.sqlValue, "must end with the given suffix"));
        t_366 = this.#_tableDef_76;
        t_367 = this.#_params_77;
        t_368 = this.#_changes_78;
        t_360 = listBuilderToList_114(eb_377);
        return_356 = new ChangesetImpl_75(t_366, t_367, t_368, t_360, false);
        break fn_373;
      }
      const skipCount_378 = valLen_375 - suffixLen_376 | 0;
      let strIdx_379 = 0;
      let i_380 = 0;
      while (i_380 < skipCount_378) {
        t_361 = stringNext_381(val_374, strIdx_379);
        strIdx_379 = t_361;
        i_380 = i_380 + 1 | 0;
      }
      let sufIdx_382 = 0;
      let matches_383 = true;
      while (true) {
        if (matches_383) {
          t_362 = suffix_355.length > sufIdx_382;
          t_369 = t_362;
        } else {
          t_369 = false;
        }
        if (! t_369) {
          break;
        }
        if (!(val_374.length > strIdx_379)) {
          matches_383 = false;
        } else if (stringGet_384(val_374, strIdx_379) !== stringGet_384(suffix_355, sufIdx_382)) {
          matches_383 = false;
        } else {
          t_363 = stringNext_381(val_374, strIdx_379);
          strIdx_379 = t_363;
          t_364 = stringNext_381(suffix_355, sufIdx_382);
          sufIdx_382 = t_364;
        }
      }
      if (! matches_383) {
        const eb_385 = this.#_errors_79.slice();
        listBuilderAdd_113(eb_385, new ChangesetError(field_354.sqlValue, "must end with the given suffix"));
        t_370 = this.#_tableDef_76;
        t_371 = this.#_params_77;
        t_372 = this.#_changes_78;
        t_365 = listBuilderToList_114(eb_385);
        return_356 = new ChangesetImpl_75(t_370, t_371, t_372, t_365, false);
        break fn_373;
      }
      return_356 = this;
    }
    return return_356;
  }
  /**
   * @param {string} val_388
   * @returns {SqlBoolean}
   */
  #parseBoolSqlPart_387(val_388) {
    let return_389;
    let t_390;
    let t_391;
    let t_392;
    let t_393;
    let t_394;
    let t_395;
    fn_396: {
      if (val_388 === "true") {
        t_392 = true;
      } else {
        if (val_388 === "1") {
          t_391 = true;
        } else {
          if (val_388 === "yes") {
            t_390 = true;
          } else {
            t_390 = val_388 === "on";
          }
          t_391 = t_390;
        }
        t_392 = t_391;
      }
      if (t_392) {
        return_389 = new SqlBoolean(true);
        break fn_396;
      }
      if (val_388 === "false") {
        t_395 = true;
      } else {
        if (val_388 === "0") {
          t_394 = true;
        } else {
          if (val_388 === "no") {
            t_393 = true;
          } else {
            t_393 = val_388 === "off";
          }
          t_394 = t_393;
        }
        t_395 = t_394;
      }
      if (t_395) {
        return_389 = new SqlBoolean(false);
        break fn_396;
      }
      throw Error();
    }
    return return_389;
  }
  /**
   * @param {FieldDef} fieldDef_399
   * @param {string} val_400
   * @returns {SqlPart}
   */
  #valueToSqlPart_398(fieldDef_399, val_400) {
    let return_401;
    let t_402;
    let t_403;
    let t_404;
    let t_405;
    fn_406: {
      const ft_407 = fieldDef_399.fieldType;
      if (ft_407 instanceof StringField) {
        return_401 = new SqlString(val_400);
        break fn_406;
      }
      if (ft_407 instanceof IntField) {
        t_402 = stringToInt32_143(val_400);
        return_401 = new SqlInt32(t_402);
        break fn_406;
      }
      if (ft_407 instanceof Int64Field) {
        t_403 = stringToInt64_156(val_400);
        return_401 = new SqlInt64(t_403);
        break fn_406;
      }
      if (ft_407 instanceof FloatField) {
        t_404 = stringToFloat64_169(val_400);
        return_401 = new SqlFloat64(t_404);
        break fn_406;
      }
      if (ft_407 instanceof BoolField) {
        return_401 = this.#parseBoolSqlPart_387(val_400);
        break fn_406;
      }
      if (ft_407 instanceof DateField) {
        t_405 = new (globalThis.Date)(globalThis.Date.parse(val_400));
        return_401 = new SqlDate(t_405);
        break fn_406;
      }
      throw Error();
    }
    return return_401;
  }
  /** @returns {SqlFragment} */
  toInsertSql() {
    let t_409;
    let t_410;
    let t_411;
    let t_412;
    let t_413;
    let t_414;
    let t_415;
    let t_416;
    let t_417;
    let t_418;
    let t_419;
    let t_420;
    if (! this.#_isValid_80) {
      throw Error();
    }
    let i_421 = 0;
    while (true) {
      continue_422: {
        t_409 = this.#_tableDef_76.fields.length;
        if (!(i_421 < t_409)) {
          break;
        }
        const f_423 = listedGet_197(this.#_tableDef_76.fields, i_421);
        if (f_423.virtual) {
          break continue_422;
        }
        const dv_424 = f_423.defaultValue;
        if (! f_423.nullable) {
          t_410 = f_423.name.sqlValue;
          if (! this.#_changes_78.has(t_410)) {
            t_417 = dv_424 == null;
          } else {
            t_417 = false;
          }
          t_418 = t_417;
        } else {
          t_418 = false;
        }
        if (t_418) {
          throw Error();
        }
      }
      i_421 = i_421 + 1 | 0;
    }
    const colNames_425 = [];
    const valParts_426 = [];
    const pairs_427 = mappedToList_195(this.#_changes_78);
    let i_428 = 0;
    while (true) {
      continue_429: {
        t_411 = pairs_427.length;
        if (!(i_428 < t_411)) {
          break;
        }
        const pair_430 = listedGet_197(pairs_427, i_428);
        t_412 = pair_430.key;
        t_419 = this.#_tableDef_76.field(t_412);
        const fd_431 = t_419;
        if (fd_431.virtual) {
          break continue_429;
        }
        listBuilderAdd_113(colNames_425, fd_431.name.sqlValue);
        t_413 = pair_430.value;
        t_420 = this.#valueToSqlPart_398(fd_431, t_413);
        listBuilderAdd_113(valParts_426, t_420);
      }
      i_428 = i_428 + 1 | 0;
    }
    let i_432 = 0;
    while (true) {
      continue_433: {
        t_414 = this.#_tableDef_76.fields.length;
        if (!(i_432 < t_414)) {
          break;
        }
        const f_434 = listedGet_197(this.#_tableDef_76.fields, i_432);
        if (f_434.virtual) {
          break continue_433;
        }
        const dv_435 = f_434.defaultValue;
        if (!(dv_435 == null)) {
          const dv_436 = dv_435;
          t_415 = f_434.name.sqlValue;
          if (! this.#_changes_78.has(t_415)) {
            listBuilderAdd_113(colNames_425, f_434.name.sqlValue);
            listBuilderAdd_113(valParts_426, dv_436);
          }
        }
      }
      i_432 = i_432 + 1 | 0;
    }
    if (valParts_426.length === 0) {
      throw Error();
    }
    const b_437 = new SqlBuilder();
    b_437.appendSafe("INSERT INTO ");
    b_437.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_437.appendSafe(" (");
    let t_438 = listBuilderToList_114(colNames_425);
    function fn_439(c_440) {
      return c_440;
    }
    b_437.appendSafe(listedJoin_441(t_438, ", ", fn_439));
    b_437.appendSafe(") VALUES (");
    b_437.appendPart(listedGet_197(valParts_426, 0));
    let j_442 = 1;
    while (true) {
      t_416 = valParts_426.length;
      if (!(j_442 < t_416)) {
        break;
      }
      b_437.appendSafe(", ");
      b_437.appendPart(listedGet_197(valParts_426, j_442));
      j_442 = j_442 + 1 | 0;
    }
    b_437.appendSafe(")");
    return b_437.accumulated;
  }
  /**
   * @param {number} id_444
   * @returns {SqlFragment}
   */
  toUpdateSql(id_444) {
    let t_445;
    let t_446;
    let t_447;
    let t_448;
    let t_449;
    if (! this.#_isValid_80) {
      throw Error();
    }
    const pairs_450 = mappedToList_195(this.#_changes_78);
    if (pairs_450.length === 0) {
      throw Error();
    }
    const b_451 = new SqlBuilder();
    b_451.appendSafe("UPDATE ");
    b_451.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_451.appendSafe(" SET ");
    let setCount_452 = 0;
    let i_453 = 0;
    while (true) {
      continue_454: {
        t_445 = pairs_450.length;
        if (!(i_453 < t_445)) {
          break;
        }
        const pair_455 = listedGet_197(pairs_450, i_453);
        t_446 = pair_455.key;
        t_448 = this.#_tableDef_76.field(t_446);
        const fd_456 = t_448;
        if (fd_456.virtual) {
          break continue_454;
        }
        if (setCount_452 > 0) {
          b_451.appendSafe(", ");
        }
        b_451.appendSafe(fd_456.name.sqlValue);
        b_451.appendSafe(" = ");
        t_447 = pair_455.value;
        t_449 = this.#valueToSqlPart_398(fd_456, t_447);
        b_451.appendPart(t_449);
        setCount_452 = setCount_452 + 1 | 0;
      }
      i_453 = i_453 + 1 | 0;
    }
    if (setCount_452 === 0) {
      throw Error();
    }
    b_451.appendSafe(" WHERE ");
    b_451.appendSafe(this.#_tableDef_76.pkName());
    b_451.appendSafe(" = ");
    b_451.appendInt32(id_444);
    return b_451.accumulated;
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
   * @param {TableDef} _tableDef_457
   * @param {Map<string, string>} _params_458
   * @param {Map<string, string>} _changes_459
   * @param {Array<ChangesetError>} _errors_460
   * @param {boolean} _isValid_461
   */
  constructor(_tableDef_457, _params_458, _changes_459, _errors_460, _isValid_461) {
    super ();
    this.#_tableDef_76 = _tableDef_457;
    this.#_params_77 = _params_458;
    this.#_changes_78 = _changes_459;
    this.#_errors_79 = _errors_460;
    this.#_isValid_80 = _isValid_461;
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
  #joinType_468;
  /** @type {SafeIdentifier} */
  #table_469;
  /** @type {SqlFragment | null} */
  #onCondition_470;
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
   * @param {JoinType} joinType_471
   * @param {SafeIdentifier} table_472
   * @param {SqlFragment | null} onCondition_473
   */
  constructor(joinType_471, table_472, onCondition_473) {
    super ();
    this.#joinType_468 = joinType_471;
    this.#table_469 = table_472;
    this.#onCondition_470 = onCondition_473;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_468;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_469;
  }
  /** @returns {SqlFragment | null} */
  get onCondition() {
    return this.#onCondition_470;
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
  #field_480;
  /** @type {boolean} */
  #ascending_481;
  /** @type {NullsPosition | null} */
  #nullsPos_482;
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
   * @param {SafeIdentifier} field_483
   * @param {boolean} ascending_484
   * @param {NullsPosition | null} nullsPos_485
   */
  constructor(field_483, ascending_484, nullsPos_485) {
    super ();
    this.#field_480 = field_483;
    this.#ascending_481 = ascending_484;
    this.#nullsPos_482 = nullsPos_485;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_480;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_481;
  }
  /** @returns {NullsPosition | null} */
  get nullsPos() {
    return this.#nullsPos_482;
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
  #_condition_494;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_494;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_497 */
  constructor(_condition_497) {
    super ();
    this.#_condition_494 = _condition_497;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_498;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_498;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_501 */
  constructor(_condition_501) {
    super ();
    this.#_condition_498 = _condition_501;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_502;
  /** @type {Array<WhereClause>} */
  #conditions_503;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_504;
  /** @type {Array<OrderClause>} */
  #orderClauses_505;
  /** @type {number | null} */
  #limitVal_506;
  /** @type {number | null} */
  #offsetVal_507;
  /** @type {Array<JoinClause>} */
  #joinClauses_508;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_509;
  /** @type {Array<WhereClause>} */
  #havingConditions_510;
  /** @type {boolean} */
  #isDistinct_511;
  /** @type {Array<SqlFragment>} */
  #selectExprs_512;
  /** @type {LockMode | null} */
  #lockMode_513;
  /**
   * @param {SqlFragment} condition_515
   * @returns {Query}
   */
  where(condition_515) {
    const nb_516 = this.#conditions_503.slice();
    listBuilderAdd_113(nb_516, new AndCondition(condition_515));
    return new Query(this.#tableName_502, listBuilderToList_114(nb_516), this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SqlFragment} condition_518
   * @returns {Query}
   */
  orWhere(condition_518) {
    const nb_519 = this.#conditions_503.slice();
    listBuilderAdd_113(nb_519, new OrCondition(condition_518));
    return new Query(this.#tableName_502, listBuilderToList_114(nb_519), this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SafeIdentifier} field_521
   * @returns {Query}
   */
  whereNull(field_521) {
    const b_522 = new SqlBuilder();
    b_522.appendSafe(field_521.sqlValue);
    b_522.appendSafe(" IS NULL");
    let t_523 = b_522.accumulated;
    return this.where(t_523);
  }
  /**
   * @param {SafeIdentifier} field_525
   * @returns {Query}
   */
  whereNotNull(field_525) {
    const b_526 = new SqlBuilder();
    b_526.appendSafe(field_525.sqlValue);
    b_526.appendSafe(" IS NOT NULL");
    let t_527 = b_526.accumulated;
    return this.where(t_527);
  }
  /**
   * @param {SafeIdentifier} field_529
   * @param {Array<SqlPart>} values_530
   * @returns {Query}
   */
  whereIn(field_529, values_530) {
    let return_531;
    let t_532;
    let t_533;
    let t_534;
    fn_535: {
      if (! values_530.length) {
        const b_536 = new SqlBuilder();
        b_536.appendSafe("1 = 0");
        t_532 = b_536.accumulated;
        return_531 = this.where(t_532);
        break fn_535;
      }
      const b_537 = new SqlBuilder();
      b_537.appendSafe(field_529.sqlValue);
      b_537.appendSafe(" IN (");
      b_537.appendPart(listedGet_197(values_530, 0));
      let i_538 = 1;
      while (true) {
        t_533 = values_530.length;
        if (!(i_538 < t_533)) {
          break;
        }
        b_537.appendSafe(", ");
        b_537.appendPart(listedGet_197(values_530, i_538));
        i_538 = i_538 + 1 | 0;
      }
      b_537.appendSafe(")");
      t_534 = b_537.accumulated;
      return_531 = this.where(t_534);
    }
    return return_531;
  }
  /**
   * @param {SafeIdentifier} field_540
   * @param {Query} sub_541
   * @returns {Query}
   */
  whereInSubquery(field_540, sub_541) {
    const b_542 = new SqlBuilder();
    b_542.appendSafe(field_540.sqlValue);
    b_542.appendSafe(" IN (");
    b_542.appendFragment(sub_541.toSql());
    b_542.appendSafe(")");
    let t_543 = b_542.accumulated;
    return this.where(t_543);
  }
  /**
   * @param {SqlFragment} condition_545
   * @returns {Query}
   */
  whereNot(condition_545) {
    const b_546 = new SqlBuilder();
    b_546.appendSafe("NOT (");
    b_546.appendFragment(condition_545);
    b_546.appendSafe(")");
    let t_547 = b_546.accumulated;
    return this.where(t_547);
  }
  /**
   * @param {SafeIdentifier} field_549
   * @param {SqlPart} low_550
   * @param {SqlPart} high_551
   * @returns {Query}
   */
  whereBetween(field_549, low_550, high_551) {
    const b_552 = new SqlBuilder();
    b_552.appendSafe(field_549.sqlValue);
    b_552.appendSafe(" BETWEEN ");
    b_552.appendPart(low_550);
    b_552.appendSafe(" AND ");
    b_552.appendPart(high_551);
    let t_553 = b_552.accumulated;
    return this.where(t_553);
  }
  /**
   * @param {SafeIdentifier} field_555
   * @param {string} pattern_556
   * @returns {Query}
   */
  whereLike(field_555, pattern_556) {
    const b_557 = new SqlBuilder();
    b_557.appendSafe(field_555.sqlValue);
    b_557.appendSafe(" LIKE ");
    b_557.appendString(pattern_556);
    let t_558 = b_557.accumulated;
    return this.where(t_558);
  }
  /**
   * @param {SafeIdentifier} field_560
   * @param {string} pattern_561
   * @returns {Query}
   */
  whereILike(field_560, pattern_561) {
    const b_562 = new SqlBuilder();
    b_562.appendSafe(field_560.sqlValue);
    b_562.appendSafe(" ILIKE ");
    b_562.appendString(pattern_561);
    let t_563 = b_562.accumulated;
    return this.where(t_563);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_565
   * @returns {Query}
   */
  select(fields_565) {
    return new Query(this.#tableName_502, this.#conditions_503, fields_565, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {Array<SqlFragment>} exprs_567
   * @returns {Query}
   */
  selectExpr(exprs_567) {
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, exprs_567, this.#lockMode_513);
  }
  /**
   * @param {SafeIdentifier} field_569
   * @param {boolean} ascending_570
   * @returns {Query}
   */
  orderBy(field_569, ascending_570) {
    const nb_571 = this.#orderClauses_505.slice();
    listBuilderAdd_113(nb_571, new OrderClause(field_569, ascending_570, null));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, listBuilderToList_114(nb_571), this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SafeIdentifier} field_573
   * @param {boolean} ascending_574
   * @param {NullsPosition} nulls_575
   * @returns {Query}
   */
  orderByNulls(field_573, ascending_574, nulls_575) {
    const nb_576 = this.#orderClauses_505.slice();
    listBuilderAdd_113(nb_576, new OrderClause(field_573, ascending_574, nulls_575));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, listBuilderToList_114(nb_576), this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {number} n_578
   * @returns {Query}
   */
  limit(n_578) {
    if (n_578 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, n_578, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {number} n_580
   * @returns {Query}
   */
  offset(n_580) {
    if (n_580 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, n_580, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {JoinType} joinType_582
   * @param {SafeIdentifier} table_583
   * @param {SqlFragment} onCondition_584
   * @returns {Query}
   */
  join(joinType_582, table_583, onCondition_584) {
    const nb_585 = this.#joinClauses_508.slice();
    listBuilderAdd_113(nb_585, new JoinClause(joinType_582, table_583, onCondition_584));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, listBuilderToList_114(nb_585), this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SafeIdentifier} table_587
   * @param {SqlFragment} onCondition_588
   * @returns {Query}
   */
  innerJoin(table_587, onCondition_588) {
    let t_589 = new InnerJoin();
    return this.join(t_589, table_587, onCondition_588);
  }
  /**
   * @param {SafeIdentifier} table_591
   * @param {SqlFragment} onCondition_592
   * @returns {Query}
   */
  leftJoin(table_591, onCondition_592) {
    let t_593 = new LeftJoin();
    return this.join(t_593, table_591, onCondition_592);
  }
  /**
   * @param {SafeIdentifier} table_595
   * @param {SqlFragment} onCondition_596
   * @returns {Query}
   */
  rightJoin(table_595, onCondition_596) {
    let t_597 = new RightJoin();
    return this.join(t_597, table_595, onCondition_596);
  }
  /**
   * @param {SafeIdentifier} table_599
   * @param {SqlFragment} onCondition_600
   * @returns {Query}
   */
  fullJoin(table_599, onCondition_600) {
    let t_601 = new FullJoin();
    return this.join(t_601, table_599, onCondition_600);
  }
  /**
   * @param {SafeIdentifier} table_603
   * @returns {Query}
   */
  crossJoin(table_603) {
    const nb_604 = this.#joinClauses_508.slice();
    listBuilderAdd_113(nb_604, new JoinClause(new CrossJoin(), table_603, null));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, listBuilderToList_114(nb_604), this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SafeIdentifier} field_606
   * @returns {Query}
   */
  groupBy(field_606) {
    const nb_607 = this.#groupByFields_509.slice();
    listBuilderAdd_113(nb_607, field_606);
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, listBuilderToList_114(nb_607), this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SqlFragment} condition_609
   * @returns {Query}
   */
  having(condition_609) {
    const nb_610 = this.#havingConditions_510.slice();
    listBuilderAdd_113(nb_610, new AndCondition(condition_609));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, listBuilderToList_114(nb_610), this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {SqlFragment} condition_612
   * @returns {Query}
   */
  orHaving(condition_612) {
    const nb_613 = this.#havingConditions_510.slice();
    listBuilderAdd_113(nb_613, new OrCondition(condition_612));
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, listBuilderToList_114(nb_613), this.#isDistinct_511, this.#selectExprs_512, this.#lockMode_513);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, true, this.#selectExprs_512, this.#lockMode_513);
  }
  /**
   * @param {LockMode} mode_616
   * @returns {Query}
   */
  lock(mode_616) {
    return new Query(this.#tableName_502, this.#conditions_503, this.#selectedFields_504, this.#orderClauses_505, this.#limitVal_506, this.#offsetVal_507, this.#joinClauses_508, this.#groupByFields_509, this.#havingConditions_510, this.#isDistinct_511, this.#selectExprs_512, mode_616);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_618;
    let t_619;
    let t_620;
    const b_621 = new SqlBuilder();
    if (this.#isDistinct_511) {
      b_621.appendSafe("SELECT DISTINCT ");
    } else {
      b_621.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_512.length) {
      b_621.appendFragment(listedGet_197(this.#selectExprs_512, 0));
      let i_622 = 1;
      while (true) {
        t_618 = this.#selectExprs_512.length;
        if (!(i_622 < t_618)) {
          break;
        }
        b_621.appendSafe(", ");
        b_621.appendFragment(listedGet_197(this.#selectExprs_512, i_622));
        i_622 = i_622 + 1 | 0;
      }
    } else if (! this.#selectedFields_504.length) {
      b_621.appendSafe("*");
    } else {
      function fn_623(f_624) {
        return f_624.sqlValue;
      }
      b_621.appendSafe(listedJoin_441(this.#selectedFields_504, ", ", fn_623));
    }
    b_621.appendSafe(" FROM ");
    b_621.appendSafe(this.#tableName_502.sqlValue);
    function fn_625(jc_626) {
      b_621.appendSafe(" ");
      let t_627 = jc_626.joinType.keyword();
      b_621.appendSafe(t_627);
      b_621.appendSafe(" ");
      let t_628 = jc_626.table.sqlValue;
      b_621.appendSafe(t_628);
      const oc_629 = jc_626.onCondition;
      if (!(oc_629 == null)) {
        const oc_630 = oc_629;
        b_621.appendSafe(" ON ");
        b_621.appendFragment(oc_630);
      }
      return;
    }
    this.#joinClauses_508.forEach(fn_625);
    if (! ! this.#conditions_503.length) {
      b_621.appendSafe(" WHERE ");
      b_621.appendFragment(listedGet_197(this.#conditions_503, 0).condition);
      let i_631 = 1;
      while (true) {
        t_619 = this.#conditions_503.length;
        if (!(i_631 < t_619)) {
          break;
        }
        b_621.appendSafe(" ");
        b_621.appendSafe(listedGet_197(this.#conditions_503, i_631).keyword());
        b_621.appendSafe(" ");
        b_621.appendFragment(listedGet_197(this.#conditions_503, i_631).condition);
        i_631 = i_631 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_509.length) {
      b_621.appendSafe(" GROUP BY ");
      function fn_632(f_633) {
        return f_633.sqlValue;
      }
      b_621.appendSafe(listedJoin_441(this.#groupByFields_509, ", ", fn_632));
    }
    if (! ! this.#havingConditions_510.length) {
      b_621.appendSafe(" HAVING ");
      b_621.appendFragment(listedGet_197(this.#havingConditions_510, 0).condition);
      let i_634 = 1;
      while (true) {
        t_620 = this.#havingConditions_510.length;
        if (!(i_634 < t_620)) {
          break;
        }
        b_621.appendSafe(" ");
        b_621.appendSafe(listedGet_197(this.#havingConditions_510, i_634).keyword());
        b_621.appendSafe(" ");
        b_621.appendFragment(listedGet_197(this.#havingConditions_510, i_634).condition);
        i_634 = i_634 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_505.length) {
      b_621.appendSafe(" ORDER BY ");
      let first_635 = true;
      function fn_636(orc_637) {
        let t_638;
        let t_639;
        if (! first_635) {
          b_621.appendSafe(", ");
        }
        first_635 = false;
        let t_640 = orc_637.field.sqlValue;
        b_621.appendSafe(t_640);
        if (orc_637.ascending) {
          t_639 = " ASC";
        } else {
          t_639 = " DESC";
        }
        b_621.appendSafe(t_639);
        const np_641 = orc_637.nullsPos;
        if (!(np_641 == null)) {
          t_638 = np_641.keyword();
          b_621.appendSafe(t_638);
        }
        return;
      }
      this.#orderClauses_505.forEach(fn_636);
    }
    const lv_642 = this.#limitVal_506;
    if (!(lv_642 == null)) {
      const lv_643 = lv_642;
      b_621.appendSafe(" LIMIT ");
      b_621.appendInt32(lv_643);
    }
    const ov_644 = this.#offsetVal_507;
    if (!(ov_644 == null)) {
      const ov_645 = ov_644;
      b_621.appendSafe(" OFFSET ");
      b_621.appendInt32(ov_645);
    }
    const lm_646 = this.#lockMode_513;
    if (!(lm_646 == null)) {
      b_621.appendSafe(lm_646.keyword());
    }
    return b_621.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    let t_648;
    let t_649;
    const b_650 = new SqlBuilder();
    b_650.appendSafe("SELECT COUNT(*) FROM ");
    b_650.appendSafe(this.#tableName_502.sqlValue);
    function fn_651(jc_652) {
      b_650.appendSafe(" ");
      let t_653 = jc_652.joinType.keyword();
      b_650.appendSafe(t_653);
      b_650.appendSafe(" ");
      let t_654 = jc_652.table.sqlValue;
      b_650.appendSafe(t_654);
      const oc2_655 = jc_652.onCondition;
      if (!(oc2_655 == null)) {
        const oc2_656 = oc2_655;
        b_650.appendSafe(" ON ");
        b_650.appendFragment(oc2_656);
      }
      return;
    }
    this.#joinClauses_508.forEach(fn_651);
    if (! ! this.#conditions_503.length) {
      b_650.appendSafe(" WHERE ");
      b_650.appendFragment(listedGet_197(this.#conditions_503, 0).condition);
      let i_657 = 1;
      while (true) {
        t_648 = this.#conditions_503.length;
        if (!(i_657 < t_648)) {
          break;
        }
        b_650.appendSafe(" ");
        b_650.appendSafe(listedGet_197(this.#conditions_503, i_657).keyword());
        b_650.appendSafe(" ");
        b_650.appendFragment(listedGet_197(this.#conditions_503, i_657).condition);
        i_657 = i_657 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_509.length) {
      b_650.appendSafe(" GROUP BY ");
      function fn_658(f_659) {
        return f_659.sqlValue;
      }
      b_650.appendSafe(listedJoin_441(this.#groupByFields_509, ", ", fn_658));
    }
    if (! ! this.#havingConditions_510.length) {
      b_650.appendSafe(" HAVING ");
      b_650.appendFragment(listedGet_197(this.#havingConditions_510, 0).condition);
      let i_660 = 1;
      while (true) {
        t_649 = this.#havingConditions_510.length;
        if (!(i_660 < t_649)) {
          break;
        }
        b_650.appendSafe(" ");
        b_650.appendSafe(listedGet_197(this.#havingConditions_510, i_660).keyword());
        b_650.appendSafe(" ");
        b_650.appendFragment(listedGet_197(this.#havingConditions_510, i_660).condition);
        i_660 = i_660 + 1 | 0;
      }
    }
    return b_650.accumulated;
  }
  /**
   * @param {number} defaultLimit_662
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_662) {
    let return_663;
    let t_664;
    if (defaultLimit_662 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_506 == null)) {
      return_663 = this.toSql();
    } else {
      t_664 = this.limit(defaultLimit_662);
      return_663 = t_664.toSql();
    }
    return return_663;
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
   * @param {SafeIdentifier} tableName_665
   * @param {Array<WhereClause>} conditions_666
   * @param {Array<SafeIdentifier>} selectedFields_667
   * @param {Array<OrderClause>} orderClauses_668
   * @param {number | null} limitVal_669
   * @param {number | null} offsetVal_670
   * @param {Array<JoinClause>} joinClauses_671
   * @param {Array<SafeIdentifier>} groupByFields_672
   * @param {Array<WhereClause>} havingConditions_673
   * @param {boolean} isDistinct_674
   * @param {Array<SqlFragment>} selectExprs_675
   * @param {LockMode | null} lockMode_676
   */
  constructor(tableName_665, conditions_666, selectedFields_667, orderClauses_668, limitVal_669, offsetVal_670, joinClauses_671, groupByFields_672, havingConditions_673, isDistinct_674, selectExprs_675, lockMode_676) {
    super ();
    this.#tableName_502 = tableName_665;
    this.#conditions_503 = conditions_666;
    this.#selectedFields_504 = selectedFields_667;
    this.#orderClauses_505 = orderClauses_668;
    this.#limitVal_506 = limitVal_669;
    this.#offsetVal_507 = offsetVal_670;
    this.#joinClauses_508 = joinClauses_671;
    this.#groupByFields_509 = groupByFields_672;
    this.#havingConditions_510 = havingConditions_673;
    this.#isDistinct_511 = isDistinct_674;
    this.#selectExprs_512 = selectExprs_675;
    this.#lockMode_513 = lockMode_676;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_502;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_503;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_504;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_505;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_506;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_507;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_508;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_509;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_510;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_511;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_512;
  }
  /** @returns {LockMode | null} */
  get lockMode() {
    return this.#lockMode_513;
  }
};
export class SetClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_689;
  /** @type {SqlPart} */
  #value_690;
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
   * @param {SafeIdentifier} field_691
   * @param {SqlPart} value_692
   */
  constructor(field_691, value_692) {
    super ();
    this.#field_689 = field_691;
    this.#value_690 = value_692;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_689;
  }
  /** @returns {SqlPart} */
  get value() {
    return this.#value_690;
  }
};
export class UpdateQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_695;
  /** @type {Array<SetClause>} */
  #setClauses_696;
  /** @type {Array<WhereClause>} */
  #conditions_697;
  /** @type {number | null} */
  #limitVal_698;
  /**
   * @param {SafeIdentifier} field_700
   * @param {SqlPart} value_701
   * @returns {UpdateQuery}
   */
  set(field_700, value_701) {
    const nb_702 = this.#setClauses_696.slice();
    listBuilderAdd_113(nb_702, new SetClause(field_700, value_701));
    return new UpdateQuery(this.#tableName_695, listBuilderToList_114(nb_702), this.#conditions_697, this.#limitVal_698);
  }
  /**
   * @param {SqlFragment} condition_704
   * @returns {UpdateQuery}
   */
  where(condition_704) {
    const nb_705 = this.#conditions_697.slice();
    listBuilderAdd_113(nb_705, new AndCondition(condition_704));
    return new UpdateQuery(this.#tableName_695, this.#setClauses_696, listBuilderToList_114(nb_705), this.#limitVal_698);
  }
  /**
   * @param {SqlFragment} condition_707
   * @returns {UpdateQuery}
   */
  orWhere(condition_707) {
    const nb_708 = this.#conditions_697.slice();
    listBuilderAdd_113(nb_708, new OrCondition(condition_707));
    return new UpdateQuery(this.#tableName_695, this.#setClauses_696, listBuilderToList_114(nb_708), this.#limitVal_698);
  }
  /**
   * @param {number} n_710
   * @returns {UpdateQuery}
   */
  limit(n_710) {
    if (n_710 < 0) {
      throw Error();
    }
    return new UpdateQuery(this.#tableName_695, this.#setClauses_696, this.#conditions_697, n_710);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_712;
    let t_713;
    if (! this.#conditions_697.length) {
      throw Error();
    }
    if (! this.#setClauses_696.length) {
      throw Error();
    }
    const b_714 = new SqlBuilder();
    b_714.appendSafe("UPDATE ");
    b_714.appendSafe(this.#tableName_695.sqlValue);
    b_714.appendSafe(" SET ");
    b_714.appendSafe(listedGet_197(this.#setClauses_696, 0).field.sqlValue);
    b_714.appendSafe(" = ");
    b_714.appendPart(listedGet_197(this.#setClauses_696, 0).value);
    let i_715 = 1;
    while (true) {
      t_712 = this.#setClauses_696.length;
      if (!(i_715 < t_712)) {
        break;
      }
      b_714.appendSafe(", ");
      b_714.appendSafe(listedGet_197(this.#setClauses_696, i_715).field.sqlValue);
      b_714.appendSafe(" = ");
      b_714.appendPart(listedGet_197(this.#setClauses_696, i_715).value);
      i_715 = i_715 + 1 | 0;
    }
    b_714.appendSafe(" WHERE ");
    b_714.appendFragment(listedGet_197(this.#conditions_697, 0).condition);
    let i_716 = 1;
    while (true) {
      t_713 = this.#conditions_697.length;
      if (!(i_716 < t_713)) {
        break;
      }
      b_714.appendSafe(" ");
      b_714.appendSafe(listedGet_197(this.#conditions_697, i_716).keyword());
      b_714.appendSafe(" ");
      b_714.appendFragment(listedGet_197(this.#conditions_697, i_716).condition);
      i_716 = i_716 + 1 | 0;
    }
    const lv_717 = this.#limitVal_698;
    if (!(lv_717 == null)) {
      const lv_718 = lv_717;
      b_714.appendSafe(" LIMIT ");
      b_714.appendInt32(lv_718);
    }
    return b_714.accumulated;
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
   * @param {SafeIdentifier} tableName_719
   * @param {Array<SetClause>} setClauses_720
   * @param {Array<WhereClause>} conditions_721
   * @param {number | null} limitVal_722
   */
  constructor(tableName_719, setClauses_720, conditions_721, limitVal_722) {
    super ();
    this.#tableName_695 = tableName_719;
    this.#setClauses_696 = setClauses_720;
    this.#conditions_697 = conditions_721;
    this.#limitVal_698 = limitVal_722;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_695;
  }
  /** @returns {Array<SetClause>} */
  get setClauses() {
    return this.#setClauses_696;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_697;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_698;
  }
};
export class DeleteQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_727;
  /** @type {Array<WhereClause>} */
  #conditions_728;
  /** @type {number | null} */
  #limitVal_729;
  /**
   * @param {SqlFragment} condition_731
   * @returns {DeleteQuery}
   */
  where(condition_731) {
    const nb_732 = this.#conditions_728.slice();
    listBuilderAdd_113(nb_732, new AndCondition(condition_731));
    return new DeleteQuery(this.#tableName_727, listBuilderToList_114(nb_732), this.#limitVal_729);
  }
  /**
   * @param {SqlFragment} condition_734
   * @returns {DeleteQuery}
   */
  orWhere(condition_734) {
    const nb_735 = this.#conditions_728.slice();
    listBuilderAdd_113(nb_735, new OrCondition(condition_734));
    return new DeleteQuery(this.#tableName_727, listBuilderToList_114(nb_735), this.#limitVal_729);
  }
  /**
   * @param {number} n_737
   * @returns {DeleteQuery}
   */
  limit(n_737) {
    if (n_737 < 0) {
      throw Error();
    }
    return new DeleteQuery(this.#tableName_727, this.#conditions_728, n_737);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_739;
    if (! this.#conditions_728.length) {
      throw Error();
    }
    const b_740 = new SqlBuilder();
    b_740.appendSafe("DELETE FROM ");
    b_740.appendSafe(this.#tableName_727.sqlValue);
    b_740.appendSafe(" WHERE ");
    b_740.appendFragment(listedGet_197(this.#conditions_728, 0).condition);
    let i_741 = 1;
    while (true) {
      t_739 = this.#conditions_728.length;
      if (!(i_741 < t_739)) {
        break;
      }
      b_740.appendSafe(" ");
      b_740.appendSafe(listedGet_197(this.#conditions_728, i_741).keyword());
      b_740.appendSafe(" ");
      b_740.appendFragment(listedGet_197(this.#conditions_728, i_741).condition);
      i_741 = i_741 + 1 | 0;
    }
    const lv_742 = this.#limitVal_729;
    if (!(lv_742 == null)) {
      const lv_743 = lv_742;
      b_740.appendSafe(" LIMIT ");
      b_740.appendInt32(lv_743);
    }
    return b_740.accumulated;
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
   * @param {SafeIdentifier} tableName_744
   * @param {Array<WhereClause>} conditions_745
   * @param {number | null} limitVal_746
   */
  constructor(tableName_744, conditions_745, limitVal_746) {
    super ();
    this.#tableName_727 = tableName_744;
    this.#conditions_728 = conditions_745;
    this.#limitVal_729 = limitVal_746;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_727;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_728;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_729;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_751 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_752;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_752;
  }
  /** @param {string} _value_754 */
  constructor(_value_754) {
    super ();
    this.#_value_752 = _value_754;
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
  #name_755;
  /** @type {FieldType} */
  #fieldType_756;
  /** @type {boolean} */
  #nullable_757;
  /** @type {SqlPart | null} */
  #defaultValue_758;
  /** @type {boolean} */
  #virtual_759;
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
   * @param {SafeIdentifier} name_760
   * @param {FieldType} fieldType_761
   * @param {boolean} nullable_762
   * @param {SqlPart | null} defaultValue_763
   * @param {boolean} virtual_764
   */
  constructor(name_760, fieldType_761, nullable_762, defaultValue_763, virtual_764) {
    super ();
    this.#name_755 = name_760;
    this.#fieldType_756 = fieldType_761;
    this.#nullable_757 = nullable_762;
    this.#defaultValue_758 = defaultValue_763;
    this.#virtual_759 = virtual_764;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_755;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_756;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_757;
  }
  /** @returns {SqlPart | null} */
  get defaultValue() {
    return this.#defaultValue_758;
  }
  /** @returns {boolean} */
  get virtual() {
    return this.#virtual_759;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_770;
  /** @type {Array<FieldDef>} */
  #fields_771;
  /** @type {SafeIdentifier | null} */
  #primaryKey_772;
  /**
   * @param {string} name_774
   * @returns {FieldDef}
   */
  field(name_774) {
    let return_775;
    fn_776: {
      const this_777 = this.#fields_771;
      const n_778 = this_777.length;
      let i_779 = 0;
      while (i_779 < n_778) {
        const el_780 = listedGet_197(this_777, i_779);
        i_779 = i_779 + 1 | 0;
        const f_781 = el_780;
        if (f_781.name.sqlValue === name_774) {
          return_775 = f_781;
          break fn_776;
        }
      }
      throw Error();
    }
    return return_775;
  }
  /** @returns {string} */
  pkName() {
    let return_783;
    fn_784: {
      const pk_785 = this.#primaryKey_772;
      if (!(pk_785 == null)) {
        const pk_786 = pk_785;
        return_783 = pk_786.sqlValue;
        break fn_784;
      }
      return_783 = "id";
    }
    return return_783;
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
   * @param {SafeIdentifier} tableName_787
   * @param {Array<FieldDef>} fields_788
   * @param {SafeIdentifier | null} primaryKey_789
   */
  constructor(tableName_787, fields_788, primaryKey_789) {
    super ();
    this.#tableName_770 = tableName_787;
    this.#fields_771 = fields_788;
    this.#primaryKey_772 = primaryKey_789;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_770;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_771;
  }
  /** @returns {SafeIdentifier | null} */
  get primaryKey() {
    return this.#primaryKey_772;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_793;
  /** @param {string} sqlSource_795 */
  appendSafe(sqlSource_795) {
    let t_796 = new SqlSource(sqlSource_795);
    listBuilderAdd_113(this.#buffer_793, t_796);
    return;
  }
  /** @param {SqlFragment} fragment_798 */
  appendFragment(fragment_798) {
    let t_799 = fragment_798.parts;
    listBuilderAddAll_800(this.#buffer_793, t_799);
    return;
  }
  /** @param {SqlPart} part_802 */
  appendPart(part_802) {
    listBuilderAdd_113(this.#buffer_793, part_802);
    return;
  }
  /** @param {Array<SqlPart>} values_804 */
  appendPartList(values_804) {
    const this807 = this;
    function fn_805(x_806) {
      this807.appendPart(x_806);
      return;
    }
    this.#appendList_808(values_804, fn_805);
    return;
  }
  /** @param {boolean} value_810 */
  appendBoolean(value_810) {
    let t_811 = new SqlBoolean(value_810);
    listBuilderAdd_113(this.#buffer_793, t_811);
    return;
  }
  /** @param {Array<boolean>} values_813 */
  appendBooleanList(values_813) {
    const this816 = this;
    function fn_814(x_815) {
      this816.appendBoolean(x_815);
      return;
    }
    this.#appendList_808(values_813, fn_814);
    return;
  }
  /** @param {globalThis.Date} value_818 */
  appendDate(value_818) {
    let t_819 = new SqlDate(value_818);
    listBuilderAdd_113(this.#buffer_793, t_819);
    return;
  }
  /** @param {Array<globalThis.Date>} values_821 */
  appendDateList(values_821) {
    const this824 = this;
    function fn_822(x_823) {
      this824.appendDate(x_823);
      return;
    }
    this.#appendList_808(values_821, fn_822);
    return;
  }
  /** @param {number} value_826 */
  appendFloat64(value_826) {
    let t_827 = new SqlFloat64(value_826);
    listBuilderAdd_113(this.#buffer_793, t_827);
    return;
  }
  /** @param {Array<number>} values_829 */
  appendFloat64List(values_829) {
    const this832 = this;
    function fn_830(x_831) {
      this832.appendFloat64(x_831);
      return;
    }
    this.#appendList_808(values_829, fn_830);
    return;
  }
  /** @param {number} value_834 */
  appendInt32(value_834) {
    let t_835 = new SqlInt32(value_834);
    listBuilderAdd_113(this.#buffer_793, t_835);
    return;
  }
  /** @param {Array<number>} values_837 */
  appendInt32List(values_837) {
    const this840 = this;
    function fn_838(x_839) {
      this840.appendInt32(x_839);
      return;
    }
    this.#appendList_808(values_837, fn_838);
    return;
  }
  /** @param {bigint} value_842 */
  appendInt64(value_842) {
    let t_843 = new SqlInt64(value_842);
    listBuilderAdd_113(this.#buffer_793, t_843);
    return;
  }
  /** @param {Array<bigint>} values_845 */
  appendInt64List(values_845) {
    const this848 = this;
    function fn_846(x_847) {
      this848.appendInt64(x_847);
      return;
    }
    this.#appendList_808(values_845, fn_846);
    return;
  }
  /** @param {string} value_850 */
  appendString(value_850) {
    let t_851 = new SqlString(value_850);
    listBuilderAdd_113(this.#buffer_793, t_851);
    return;
  }
  /** @param {Array<string>} values_853 */
  appendStringList(values_853) {
    const this856 = this;
    function fn_854(x_855) {
      this856.appendString(x_855);
      return;
    }
    this.#appendList_808(values_853, fn_854);
    return;
  }
  /**
   * @template {unknown} T_863
   * @param {Array<T_863>} values_858
   * @param {(arg0: T_863) => void} appendValue_859
   */
  #appendList_808(values_858, appendValue_859) {
    let t_860;
    let t_861;
    let i_862 = 0;
    while (true) {
      t_860 = values_858.length;
      if (!(i_862 < t_860)) {
        break;
      }
      if (i_862 > 0) {
        this.appendSafe(", ");
      }
      t_861 = listedGet_197(values_858, i_862);
      appendValue_859(t_861);
      i_862 = i_862 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_114(this.#buffer_793));
  }
  constructor() {
    super ();
    let t_865 = [];
    this.#buffer_793 = t_865;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_866;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_869;
    const builder_870 = [""];
    let i_871 = 0;
    while (true) {
      t_869 = this.#parts_866.length;
      if (!(i_871 < t_869)) {
        break;
      }
      listedGet_197(this.#parts_866, i_871).formatTo(builder_870);
      i_871 = i_871 + 1 | 0;
    }
    return builder_870[0];
  }
  /** @param {Array<SqlPart>} parts_872 */
  constructor(parts_872) {
    super ();
    this.#parts_866 = parts_872;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_866;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_875 */
  formatTo(builder_875) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_876;
  /** @param {globalThis.Array<string>} builder_878 */
  formatTo(builder_878) {
    builder_878[0] += this.#source_876;
    return;
  }
  /** @param {string} source_879 */
  constructor(source_879) {
    super ();
    this.#source_876 = source_879;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_876;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_881;
  /** @param {globalThis.Array<string>} builder_883 */
  formatTo(builder_883) {
    let t_884;
    if (this.#value_881) {
      t_884 = "TRUE";
    } else {
      t_884 = "FALSE";
    }
    builder_883[0] += t_884;
    return;
  }
  /** @param {boolean} value_885 */
  constructor(value_885) {
    super ();
    this.#value_881 = value_885;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_881;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_887;
  /** @param {globalThis.Array<string>} builder_889 */
  formatTo(builder_889) {
    builder_889[0] += "'";
    let t_890 = this.#value_887.toISOString().split("T")[0];
    function fn_891(c_892) {
      if (c_892 === 39) {
        builder_889[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_893(builder_889, c_892);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_894(t_890, fn_891);
    builder_889[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_895 */
  constructor(value_895) {
    super ();
    this.#value_887 = value_895;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_887;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_897;
  /** @param {globalThis.Array<string>} builder_899 */
  formatTo(builder_899) {
    let t_900;
    let t_901;
    const s_902 = float64ToString_280(this.#value_897);
    if (s_902 === "NaN") {
      t_901 = true;
    } else {
      if (s_902 === "Infinity") {
        t_900 = true;
      } else {
        t_900 = s_902 === "-Infinity";
      }
      t_901 = t_900;
    }
    if (t_901) {
      builder_899[0] += "NULL";
    } else {
      builder_899[0] += s_902;
    }
    return;
  }
  /** @param {number} value_903 */
  constructor(value_903) {
    super ();
    this.#value_897 = value_903;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_897;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_905;
  /** @param {globalThis.Array<string>} builder_907 */
  formatTo(builder_907) {
    let t_908 = this.#value_905.toString();
    builder_907[0] += t_908;
    return;
  }
  /** @param {number} value_909 */
  constructor(value_909) {
    super ();
    this.#value_905 = value_909;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_905;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_911;
  /** @param {globalThis.Array<string>} builder_913 */
  formatTo(builder_913) {
    let t_914 = this.#value_911.toString();
    builder_913[0] += t_914;
    return;
  }
  /** @param {bigint} value_915 */
  constructor(value_915) {
    super ();
    this.#value_911 = value_915;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_911;
  }
};
export class SqlDefault extends type__6(SqlPart) {
  /** @param {globalThis.Array<string>} builder_918 */
  formatTo(builder_918) {
    builder_918[0] += "DEFAULT";
    return;
  }
  constructor() {
    super ();
    return;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_919;
  /** @param {globalThis.Array<string>} builder_921 */
  formatTo(builder_921) {
    builder_921[0] += "'";
    function fn_922(c_923) {
      if (c_923 === 39) {
        builder_921[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_893(builder_921, c_923);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_894(this.#value_919, fn_922);
    builder_921[0] += "'";
    return;
  }
  /** @param {string} value_924 */
  constructor(value_924) {
    super ();
    this.#value_919 = value_924;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_919;
  }
};
/**
 * @param {TableDef} tableDef_926
 * @param {Map<string, string>} params_927
 * @returns {Changeset}
 */
export function changeset(tableDef_926, params_927) {
  let t_928 = mapConstructor_929(Object.freeze([]));
  return new ChangesetImpl_75(tableDef_926, params_927, t_928, Object.freeze([]), true);
};
/**
 * @param {number} c_931
 * @returns {boolean}
 */
function isIdentStart_930(c_931) {
  let return_932;
  let t_933;
  let t_934;
  if (c_931 >= 97) {
    t_933 = c_931 <= 122;
  } else {
    t_933 = false;
  }
  if (t_933) {
    return_932 = true;
  } else {
    if (c_931 >= 65) {
      t_934 = c_931 <= 90;
    } else {
      t_934 = false;
    }
    if (t_934) {
      return_932 = true;
    } else {
      return_932 = c_931 === 95;
    }
  }
  return return_932;
}
/**
 * @param {number} c_936
 * @returns {boolean}
 */
function isIdentPart_935(c_936) {
  let return_937;
  if (isIdentStart_930(c_936)) {
    return_937 = true;
  } else if (c_936 >= 48) {
    return_937 = c_936 <= 57;
  } else {
    return_937 = false;
  }
  return return_937;
}
/**
 * @param {string} name_938
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_938) {
  let t_939;
  if (! name_938) {
    throw Error();
  }
  let idx_940 = 0;
  if (! isIdentStart_930(stringGet_384(name_938, idx_940))) {
    throw Error();
  }
  let t_941 = stringNext_381(name_938, idx_940);
  idx_940 = t_941;
  while (true) {
    if (!(name_938.length > idx_940)) {
      break;
    }
    if (! isIdentPart_935(stringGet_384(name_938, idx_940))) {
      throw Error();
    }
    t_939 = stringNext_381(name_938, idx_940);
    idx_940 = t_939;
  }
  return new ValidatedIdentifier_751(name_938);
};
/** @returns {Array<FieldDef>} */
export function timestamps() {
  let t_1445;
  t_1445 = safeIdentifier("inserted_at");
  let t_1446 = new FieldDef(t_1445, new DateField(), true, new SqlDefault(), false);
  let t_1447;
  t_1447 = safeIdentifier("updated_at");
  return Object.freeze([t_1446, new FieldDef(t_1447, new DateField(), true, new SqlDefault(), false)]);
};
/**
 * @param {TableDef} tableDef_1513
 * @param {number} id_1514
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_1513, id_1514) {
  const b_1515 = new SqlBuilder();
  b_1515.appendSafe("DELETE FROM ");
  b_1515.appendSafe(tableDef_1513.tableName.sqlValue);
  b_1515.appendSafe(" WHERE ");
  b_1515.appendSafe(tableDef_1513.pkName());
  b_1515.appendSafe(" = ");
  b_1515.appendInt32(id_1514);
  return b_1515.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_1526
 * @returns {Query}
 */
export function from(tableName_1526) {
  return new Query(tableName_1526, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} table_1527
 * @param {SafeIdentifier} column_1528
 * @returns {SqlFragment}
 */
export function col(table_1527, column_1528) {
  const b_1529 = new SqlBuilder();
  b_1529.appendSafe(table_1527.sqlValue);
  b_1529.appendSafe(".");
  b_1529.appendSafe(column_1528.sqlValue);
  return b_1529.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_1530 = new SqlBuilder();
  b_1530.appendSafe("COUNT(*)");
  return b_1530.accumulated;
};
/**
 * @param {SafeIdentifier} field_1531
 * @returns {SqlFragment}
 */
export function countCol(field_1531) {
  const b_1532 = new SqlBuilder();
  b_1532.appendSafe("COUNT(");
  b_1532.appendSafe(field_1531.sqlValue);
  b_1532.appendSafe(")");
  return b_1532.accumulated;
};
/**
 * @param {SafeIdentifier} field_1533
 * @returns {SqlFragment}
 */
export function sumCol(field_1533) {
  const b_1534 = new SqlBuilder();
  b_1534.appendSafe("SUM(");
  b_1534.appendSafe(field_1533.sqlValue);
  b_1534.appendSafe(")");
  return b_1534.accumulated;
};
/**
 * @param {SafeIdentifier} field_1535
 * @returns {SqlFragment}
 */
export function avgCol(field_1535) {
  const b_1536 = new SqlBuilder();
  b_1536.appendSafe("AVG(");
  b_1536.appendSafe(field_1535.sqlValue);
  b_1536.appendSafe(")");
  return b_1536.accumulated;
};
/**
 * @param {SafeIdentifier} field_1537
 * @returns {SqlFragment}
 */
export function minCol(field_1537) {
  const b_1538 = new SqlBuilder();
  b_1538.appendSafe("MIN(");
  b_1538.appendSafe(field_1537.sqlValue);
  b_1538.appendSafe(")");
  return b_1538.accumulated;
};
/**
 * @param {SafeIdentifier} field_1539
 * @returns {SqlFragment}
 */
export function maxCol(field_1539) {
  const b_1540 = new SqlBuilder();
  b_1540.appendSafe("MAX(");
  b_1540.appendSafe(field_1539.sqlValue);
  b_1540.appendSafe(")");
  return b_1540.accumulated;
};
/**
 * @param {Query} a_1541
 * @param {Query} b_1542
 * @returns {SqlFragment}
 */
export function unionSql(a_1541, b_1542) {
  const sb_1543 = new SqlBuilder();
  sb_1543.appendSafe("(");
  sb_1543.appendFragment(a_1541.toSql());
  sb_1543.appendSafe(") UNION (");
  sb_1543.appendFragment(b_1542.toSql());
  sb_1543.appendSafe(")");
  return sb_1543.accumulated;
};
/**
 * @param {Query} a_1544
 * @param {Query} b_1545
 * @returns {SqlFragment}
 */
export function unionAllSql(a_1544, b_1545) {
  const sb_1546 = new SqlBuilder();
  sb_1546.appendSafe("(");
  sb_1546.appendFragment(a_1544.toSql());
  sb_1546.appendSafe(") UNION ALL (");
  sb_1546.appendFragment(b_1545.toSql());
  sb_1546.appendSafe(")");
  return sb_1546.accumulated;
};
/**
 * @param {Query} a_1547
 * @param {Query} b_1548
 * @returns {SqlFragment}
 */
export function intersectSql(a_1547, b_1548) {
  const sb_1549 = new SqlBuilder();
  sb_1549.appendSafe("(");
  sb_1549.appendFragment(a_1547.toSql());
  sb_1549.appendSafe(") INTERSECT (");
  sb_1549.appendFragment(b_1548.toSql());
  sb_1549.appendSafe(")");
  return sb_1549.accumulated;
};
/**
 * @param {Query} a_1550
 * @param {Query} b_1551
 * @returns {SqlFragment}
 */
export function exceptSql(a_1550, b_1551) {
  const sb_1552 = new SqlBuilder();
  sb_1552.appendSafe("(");
  sb_1552.appendFragment(a_1550.toSql());
  sb_1552.appendSafe(") EXCEPT (");
  sb_1552.appendFragment(b_1551.toSql());
  sb_1552.appendSafe(")");
  return sb_1552.accumulated;
};
/**
 * @param {Query} q_1553
 * @param {SafeIdentifier} alias_1554
 * @returns {SqlFragment}
 */
export function subquery(q_1553, alias_1554) {
  const b_1555 = new SqlBuilder();
  b_1555.appendSafe("(");
  b_1555.appendFragment(q_1553.toSql());
  b_1555.appendSafe(") AS ");
  b_1555.appendSafe(alias_1554.sqlValue);
  return b_1555.accumulated;
};
/**
 * @param {Query} q_1556
 * @returns {SqlFragment}
 */
export function existsSql(q_1556) {
  const b_1557 = new SqlBuilder();
  b_1557.appendSafe("EXISTS (");
  b_1557.appendFragment(q_1556.toSql());
  b_1557.appendSafe(")");
  return b_1557.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_1558
 * @returns {UpdateQuery}
 */
export function update(tableName_1558) {
  return new UpdateQuery(tableName_1558, Object.freeze([]), Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} tableName_1559
 * @returns {DeleteQuery}
 */
export function deleteFrom(tableName_1559) {
  return new DeleteQuery(tableName_1559, Object.freeze([]), null);
};
