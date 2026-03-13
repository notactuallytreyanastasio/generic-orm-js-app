import {
  type as type__6, cmpFloat as cmpFloat__278, mapBuilderConstructor as mapBuilderConstructor_88, mappedGetOr as mappedGetOr_94, mapBuilderSet as mapBuilderSet_96, mappedToMap as mappedToMap_97, listBuilderAdd as listBuilderAdd_113, listBuilderToList as listBuilderToList_114, stringCountBetween as stringCountBetween_129, stringToInt32 as stringToInt32_143, stringToInt64 as stringToInt64_156, stringToFloat64 as stringToFloat64_169, mappedToList as mappedToList_195, listedGet as listedGet_197, float64ToString as float64ToString_280, requireStringIndex as requireStringIndex_351, stringNext as stringNext_381, stringGet as stringGet_384, listedJoin as listedJoin_431, listBuilderAddAll as listBuilderAddAll_774, stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_867, stringForEach as stringForEach_868, mapConstructor as mapConstructor_901, panic as panic_918, pairConstructor as pairConstructor_923
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
    if (! this.#_isValid_80) {
      throw Error();
    }
    let i_419 = 0;
    while (true) {
      t_409 = this.#_tableDef_76.fields.length;
      if (!(i_419 < t_409)) {
        break;
      }
      const f_420 = listedGet_197(this.#_tableDef_76.fields, i_419);
      if (! f_420.nullable) {
        t_410 = f_420.name.sqlValue;
        t_411 = this.#_changes_78.has(t_410);
        t_416 = ! t_411;
      } else {
        t_416 = false;
      }
      if (t_416) {
        throw Error();
      }
      i_419 = i_419 + 1 | 0;
    }
    const pairs_421 = mappedToList_195(this.#_changes_78);
    if (pairs_421.length === 0) {
      throw Error();
    }
    const colNames_422 = [];
    const valParts_423 = [];
    let i_424 = 0;
    while (true) {
      t_412 = pairs_421.length;
      if (!(i_424 < t_412)) {
        break;
      }
      const pair_425 = listedGet_197(pairs_421, i_424);
      t_413 = pair_425.key;
      t_417 = this.#_tableDef_76.field(t_413);
      const fd_426 = t_417;
      listBuilderAdd_113(colNames_422, fd_426.name.sqlValue);
      t_414 = pair_425.value;
      t_418 = this.#valueToSqlPart_398(fd_426, t_414);
      listBuilderAdd_113(valParts_423, t_418);
      i_424 = i_424 + 1 | 0;
    }
    const b_427 = new SqlBuilder();
    b_427.appendSafe("INSERT INTO ");
    b_427.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_427.appendSafe(" (");
    let t_428 = listBuilderToList_114(colNames_422);
    function fn_429(c_430) {
      return c_430;
    }
    b_427.appendSafe(listedJoin_431(t_428, ", ", fn_429));
    b_427.appendSafe(") VALUES (");
    b_427.appendPart(listedGet_197(valParts_423, 0));
    let j_432 = 1;
    while (true) {
      t_415 = valParts_423.length;
      if (!(j_432 < t_415)) {
        break;
      }
      b_427.appendSafe(", ");
      b_427.appendPart(listedGet_197(valParts_423, j_432));
      j_432 = j_432 + 1 | 0;
    }
    b_427.appendSafe(")");
    return b_427.accumulated;
  }
  /**
   * @param {number} id_434
   * @returns {SqlFragment}
   */
  toUpdateSql(id_434) {
    let t_435;
    let t_436;
    let t_437;
    let t_438;
    let t_439;
    if (! this.#_isValid_80) {
      throw Error();
    }
    const pairs_440 = mappedToList_195(this.#_changes_78);
    if (pairs_440.length === 0) {
      throw Error();
    }
    const b_441 = new SqlBuilder();
    b_441.appendSafe("UPDATE ");
    b_441.appendSafe(this.#_tableDef_76.tableName.sqlValue);
    b_441.appendSafe(" SET ");
    let i_442 = 0;
    while (true) {
      t_435 = pairs_440.length;
      if (!(i_442 < t_435)) {
        break;
      }
      if (i_442 > 0) {
        b_441.appendSafe(", ");
      }
      const pair_443 = listedGet_197(pairs_440, i_442);
      t_436 = pair_443.key;
      t_438 = this.#_tableDef_76.field(t_436);
      const fd_444 = t_438;
      b_441.appendSafe(fd_444.name.sqlValue);
      b_441.appendSafe(" = ");
      t_437 = pair_443.value;
      t_439 = this.#valueToSqlPart_398(fd_444, t_437);
      b_441.appendPart(t_439);
      i_442 = i_442 + 1 | 0;
    }
    b_441.appendSafe(" WHERE id = ");
    b_441.appendInt32(id_434);
    return b_441.accumulated;
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
   * @param {TableDef} _tableDef_445
   * @param {Map<string, string>} _params_446
   * @param {Map<string, string>} _changes_447
   * @param {Array<ChangesetError>} _errors_448
   * @param {boolean} _isValid_449
   */
  constructor(_tableDef_445, _params_446, _changes_447, _errors_448, _isValid_449) {
    super ();
    this.#_tableDef_76 = _tableDef_445;
    this.#_params_77 = _params_446;
    this.#_changes_78 = _changes_447;
    this.#_errors_79 = _errors_448;
    this.#_isValid_80 = _isValid_449;
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
  #joinType_456;
  /** @type {SafeIdentifier} */
  #table_457;
  /** @type {SqlFragment | null} */
  #onCondition_458;
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
   * @param {JoinType} joinType_459
   * @param {SafeIdentifier} table_460
   * @param {SqlFragment | null} onCondition_461
   */
  constructor(joinType_459, table_460, onCondition_461) {
    super ();
    this.#joinType_456 = joinType_459;
    this.#table_457 = table_460;
    this.#onCondition_458 = onCondition_461;
    return;
  }
  /** @returns {JoinType} */
  get joinType() {
    return this.#joinType_456;
  }
  /** @returns {SafeIdentifier} */
  get table() {
    return this.#table_457;
  }
  /** @returns {SqlFragment | null} */
  get onCondition() {
    return this.#onCondition_458;
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
  #field_468;
  /** @type {boolean} */
  #ascending_469;
  /** @type {NullsPosition | null} */
  #nullsPos_470;
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
   * @param {SafeIdentifier} field_471
   * @param {boolean} ascending_472
   * @param {NullsPosition | null} nullsPos_473
   */
  constructor(field_471, ascending_472, nullsPos_473) {
    super ();
    this.#field_468 = field_471;
    this.#ascending_469 = ascending_472;
    this.#nullsPos_470 = nullsPos_473;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_468;
  }
  /** @returns {boolean} */
  get ascending() {
    return this.#ascending_469;
  }
  /** @returns {NullsPosition | null} */
  get nullsPos() {
    return this.#nullsPos_470;
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
  #_condition_482;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_482;
  }
  /** @returns {string} */
  keyword() {
    return "AND";
  }
  /** @param {SqlFragment} _condition_485 */
  constructor(_condition_485) {
    super ();
    this.#_condition_482 = _condition_485;
    return;
  }
};
export class OrCondition extends type__6(WhereClause) {
  /** @type {SqlFragment} */
  #_condition_486;
  /** @returns {SqlFragment} */
  get condition() {
    return this.#_condition_486;
  }
  /** @returns {string} */
  keyword() {
    return "OR";
  }
  /** @param {SqlFragment} _condition_489 */
  constructor(_condition_489) {
    super ();
    this.#_condition_486 = _condition_489;
    return;
  }
};
export class Query extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_490;
  /** @type {Array<WhereClause>} */
  #conditions_491;
  /** @type {Array<SafeIdentifier>} */
  #selectedFields_492;
  /** @type {Array<OrderClause>} */
  #orderClauses_493;
  /** @type {number | null} */
  #limitVal_494;
  /** @type {number | null} */
  #offsetVal_495;
  /** @type {Array<JoinClause>} */
  #joinClauses_496;
  /** @type {Array<SafeIdentifier>} */
  #groupByFields_497;
  /** @type {Array<WhereClause>} */
  #havingConditions_498;
  /** @type {boolean} */
  #isDistinct_499;
  /** @type {Array<SqlFragment>} */
  #selectExprs_500;
  /** @type {LockMode | null} */
  #lockMode_501;
  /**
   * @param {SqlFragment} condition_503
   * @returns {Query}
   */
  where(condition_503) {
    const nb_504 = this.#conditions_491.slice();
    listBuilderAdd_113(nb_504, new AndCondition(condition_503));
    return new Query(this.#tableName_490, listBuilderToList_114(nb_504), this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SqlFragment} condition_506
   * @returns {Query}
   */
  orWhere(condition_506) {
    const nb_507 = this.#conditions_491.slice();
    listBuilderAdd_113(nb_507, new OrCondition(condition_506));
    return new Query(this.#tableName_490, listBuilderToList_114(nb_507), this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SafeIdentifier} field_509
   * @returns {Query}
   */
  whereNull(field_509) {
    const b_510 = new SqlBuilder();
    b_510.appendSafe(field_509.sqlValue);
    b_510.appendSafe(" IS NULL");
    let t_511 = b_510.accumulated;
    return this.where(t_511);
  }
  /**
   * @param {SafeIdentifier} field_513
   * @returns {Query}
   */
  whereNotNull(field_513) {
    const b_514 = new SqlBuilder();
    b_514.appendSafe(field_513.sqlValue);
    b_514.appendSafe(" IS NOT NULL");
    let t_515 = b_514.accumulated;
    return this.where(t_515);
  }
  /**
   * @param {SafeIdentifier} field_517
   * @param {Array<SqlPart>} values_518
   * @returns {Query}
   */
  whereIn(field_517, values_518) {
    let return_519;
    let t_520;
    let t_521;
    let t_522;
    fn_523: {
      if (! values_518.length) {
        const b_524 = new SqlBuilder();
        b_524.appendSafe("1 = 0");
        t_520 = b_524.accumulated;
        return_519 = this.where(t_520);
        break fn_523;
      }
      const b_525 = new SqlBuilder();
      b_525.appendSafe(field_517.sqlValue);
      b_525.appendSafe(" IN (");
      b_525.appendPart(listedGet_197(values_518, 0));
      let i_526 = 1;
      while (true) {
        t_521 = values_518.length;
        if (!(i_526 < t_521)) {
          break;
        }
        b_525.appendSafe(", ");
        b_525.appendPart(listedGet_197(values_518, i_526));
        i_526 = i_526 + 1 | 0;
      }
      b_525.appendSafe(")");
      t_522 = b_525.accumulated;
      return_519 = this.where(t_522);
    }
    return return_519;
  }
  /**
   * @param {SafeIdentifier} field_528
   * @param {Query} sub_529
   * @returns {Query}
   */
  whereInSubquery(field_528, sub_529) {
    const b_530 = new SqlBuilder();
    b_530.appendSafe(field_528.sqlValue);
    b_530.appendSafe(" IN (");
    b_530.appendFragment(sub_529.toSql());
    b_530.appendSafe(")");
    let t_531 = b_530.accumulated;
    return this.where(t_531);
  }
  /**
   * @param {SqlFragment} condition_533
   * @returns {Query}
   */
  whereNot(condition_533) {
    const b_534 = new SqlBuilder();
    b_534.appendSafe("NOT (");
    b_534.appendFragment(condition_533);
    b_534.appendSafe(")");
    let t_535 = b_534.accumulated;
    return this.where(t_535);
  }
  /**
   * @param {SafeIdentifier} field_537
   * @param {SqlPart} low_538
   * @param {SqlPart} high_539
   * @returns {Query}
   */
  whereBetween(field_537, low_538, high_539) {
    const b_540 = new SqlBuilder();
    b_540.appendSafe(field_537.sqlValue);
    b_540.appendSafe(" BETWEEN ");
    b_540.appendPart(low_538);
    b_540.appendSafe(" AND ");
    b_540.appendPart(high_539);
    let t_541 = b_540.accumulated;
    return this.where(t_541);
  }
  /**
   * @param {SafeIdentifier} field_543
   * @param {string} pattern_544
   * @returns {Query}
   */
  whereLike(field_543, pattern_544) {
    const b_545 = new SqlBuilder();
    b_545.appendSafe(field_543.sqlValue);
    b_545.appendSafe(" LIKE ");
    b_545.appendString(pattern_544);
    let t_546 = b_545.accumulated;
    return this.where(t_546);
  }
  /**
   * @param {SafeIdentifier} field_548
   * @param {string} pattern_549
   * @returns {Query}
   */
  whereILike(field_548, pattern_549) {
    const b_550 = new SqlBuilder();
    b_550.appendSafe(field_548.sqlValue);
    b_550.appendSafe(" ILIKE ");
    b_550.appendString(pattern_549);
    let t_551 = b_550.accumulated;
    return this.where(t_551);
  }
  /**
   * @param {Array<SafeIdentifier>} fields_553
   * @returns {Query}
   */
  select(fields_553) {
    return new Query(this.#tableName_490, this.#conditions_491, fields_553, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {Array<SqlFragment>} exprs_555
   * @returns {Query}
   */
  selectExpr(exprs_555) {
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, exprs_555, this.#lockMode_501);
  }
  /**
   * @param {SafeIdentifier} field_557
   * @param {boolean} ascending_558
   * @returns {Query}
   */
  orderBy(field_557, ascending_558) {
    const nb_559 = this.#orderClauses_493.slice();
    listBuilderAdd_113(nb_559, new OrderClause(field_557, ascending_558, null));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, listBuilderToList_114(nb_559), this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SafeIdentifier} field_561
   * @param {boolean} ascending_562
   * @param {NullsPosition} nulls_563
   * @returns {Query}
   */
  orderByNulls(field_561, ascending_562, nulls_563) {
    const nb_564 = this.#orderClauses_493.slice();
    listBuilderAdd_113(nb_564, new OrderClause(field_561, ascending_562, nulls_563));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, listBuilderToList_114(nb_564), this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {number} n_566
   * @returns {Query}
   */
  limit(n_566) {
    if (n_566 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, n_566, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {number} n_568
   * @returns {Query}
   */
  offset(n_568) {
    if (n_568 < 0) {
      throw Error();
    }
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, n_568, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {JoinType} joinType_570
   * @param {SafeIdentifier} table_571
   * @param {SqlFragment} onCondition_572
   * @returns {Query}
   */
  join(joinType_570, table_571, onCondition_572) {
    const nb_573 = this.#joinClauses_496.slice();
    listBuilderAdd_113(nb_573, new JoinClause(joinType_570, table_571, onCondition_572));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, listBuilderToList_114(nb_573), this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SafeIdentifier} table_575
   * @param {SqlFragment} onCondition_576
   * @returns {Query}
   */
  innerJoin(table_575, onCondition_576) {
    let t_577 = new InnerJoin();
    return this.join(t_577, table_575, onCondition_576);
  }
  /**
   * @param {SafeIdentifier} table_579
   * @param {SqlFragment} onCondition_580
   * @returns {Query}
   */
  leftJoin(table_579, onCondition_580) {
    let t_581 = new LeftJoin();
    return this.join(t_581, table_579, onCondition_580);
  }
  /**
   * @param {SafeIdentifier} table_583
   * @param {SqlFragment} onCondition_584
   * @returns {Query}
   */
  rightJoin(table_583, onCondition_584) {
    let t_585 = new RightJoin();
    return this.join(t_585, table_583, onCondition_584);
  }
  /**
   * @param {SafeIdentifier} table_587
   * @param {SqlFragment} onCondition_588
   * @returns {Query}
   */
  fullJoin(table_587, onCondition_588) {
    let t_589 = new FullJoin();
    return this.join(t_589, table_587, onCondition_588);
  }
  /**
   * @param {SafeIdentifier} table_591
   * @returns {Query}
   */
  crossJoin(table_591) {
    const nb_592 = this.#joinClauses_496.slice();
    listBuilderAdd_113(nb_592, new JoinClause(new CrossJoin(), table_591, null));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, listBuilderToList_114(nb_592), this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SafeIdentifier} field_594
   * @returns {Query}
   */
  groupBy(field_594) {
    const nb_595 = this.#groupByFields_497.slice();
    listBuilderAdd_113(nb_595, field_594);
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, listBuilderToList_114(nb_595), this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SqlFragment} condition_597
   * @returns {Query}
   */
  having(condition_597) {
    const nb_598 = this.#havingConditions_498.slice();
    listBuilderAdd_113(nb_598, new AndCondition(condition_597));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, listBuilderToList_114(nb_598), this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {SqlFragment} condition_600
   * @returns {Query}
   */
  orHaving(condition_600) {
    const nb_601 = this.#havingConditions_498.slice();
    listBuilderAdd_113(nb_601, new OrCondition(condition_600));
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, listBuilderToList_114(nb_601), this.#isDistinct_499, this.#selectExprs_500, this.#lockMode_501);
  }
  /** @returns {Query} */
  distinct() {
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, true, this.#selectExprs_500, this.#lockMode_501);
  }
  /**
   * @param {LockMode} mode_604
   * @returns {Query}
   */
  lock(mode_604) {
    return new Query(this.#tableName_490, this.#conditions_491, this.#selectedFields_492, this.#orderClauses_493, this.#limitVal_494, this.#offsetVal_495, this.#joinClauses_496, this.#groupByFields_497, this.#havingConditions_498, this.#isDistinct_499, this.#selectExprs_500, mode_604);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_606;
    let t_607;
    let t_608;
    const b_609 = new SqlBuilder();
    if (this.#isDistinct_499) {
      b_609.appendSafe("SELECT DISTINCT ");
    } else {
      b_609.appendSafe("SELECT ");
    }
    if (! ! this.#selectExprs_500.length) {
      b_609.appendFragment(listedGet_197(this.#selectExprs_500, 0));
      let i_610 = 1;
      while (true) {
        t_606 = this.#selectExprs_500.length;
        if (!(i_610 < t_606)) {
          break;
        }
        b_609.appendSafe(", ");
        b_609.appendFragment(listedGet_197(this.#selectExprs_500, i_610));
        i_610 = i_610 + 1 | 0;
      }
    } else if (! this.#selectedFields_492.length) {
      b_609.appendSafe("*");
    } else {
      function fn_611(f_612) {
        return f_612.sqlValue;
      }
      b_609.appendSafe(listedJoin_431(this.#selectedFields_492, ", ", fn_611));
    }
    b_609.appendSafe(" FROM ");
    b_609.appendSafe(this.#tableName_490.sqlValue);
    function fn_613(jc_614) {
      b_609.appendSafe(" ");
      let t_615 = jc_614.joinType.keyword();
      b_609.appendSafe(t_615);
      b_609.appendSafe(" ");
      let t_616 = jc_614.table.sqlValue;
      b_609.appendSafe(t_616);
      const oc_617 = jc_614.onCondition;
      if (!(oc_617 == null)) {
        const oc_618 = oc_617;
        b_609.appendSafe(" ON ");
        b_609.appendFragment(oc_618);
      }
      return;
    }
    this.#joinClauses_496.forEach(fn_613);
    if (! ! this.#conditions_491.length) {
      b_609.appendSafe(" WHERE ");
      b_609.appendFragment(listedGet_197(this.#conditions_491, 0).condition);
      let i_619 = 1;
      while (true) {
        t_607 = this.#conditions_491.length;
        if (!(i_619 < t_607)) {
          break;
        }
        b_609.appendSafe(" ");
        b_609.appendSafe(listedGet_197(this.#conditions_491, i_619).keyword());
        b_609.appendSafe(" ");
        b_609.appendFragment(listedGet_197(this.#conditions_491, i_619).condition);
        i_619 = i_619 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_497.length) {
      b_609.appendSafe(" GROUP BY ");
      function fn_620(f_621) {
        return f_621.sqlValue;
      }
      b_609.appendSafe(listedJoin_431(this.#groupByFields_497, ", ", fn_620));
    }
    if (! ! this.#havingConditions_498.length) {
      b_609.appendSafe(" HAVING ");
      b_609.appendFragment(listedGet_197(this.#havingConditions_498, 0).condition);
      let i_622 = 1;
      while (true) {
        t_608 = this.#havingConditions_498.length;
        if (!(i_622 < t_608)) {
          break;
        }
        b_609.appendSafe(" ");
        b_609.appendSafe(listedGet_197(this.#havingConditions_498, i_622).keyword());
        b_609.appendSafe(" ");
        b_609.appendFragment(listedGet_197(this.#havingConditions_498, i_622).condition);
        i_622 = i_622 + 1 | 0;
      }
    }
    if (! ! this.#orderClauses_493.length) {
      b_609.appendSafe(" ORDER BY ");
      let first_623 = true;
      function fn_624(orc_625) {
        let t_626;
        let t_627;
        if (! first_623) {
          b_609.appendSafe(", ");
        }
        first_623 = false;
        let t_628 = orc_625.field.sqlValue;
        b_609.appendSafe(t_628);
        if (orc_625.ascending) {
          t_627 = " ASC";
        } else {
          t_627 = " DESC";
        }
        b_609.appendSafe(t_627);
        const np_629 = orc_625.nullsPos;
        if (!(np_629 == null)) {
          t_626 = np_629.keyword();
          b_609.appendSafe(t_626);
        }
        return;
      }
      this.#orderClauses_493.forEach(fn_624);
    }
    const lv_630 = this.#limitVal_494;
    if (!(lv_630 == null)) {
      const lv_631 = lv_630;
      b_609.appendSafe(" LIMIT ");
      b_609.appendInt32(lv_631);
    }
    const ov_632 = this.#offsetVal_495;
    if (!(ov_632 == null)) {
      const ov_633 = ov_632;
      b_609.appendSafe(" OFFSET ");
      b_609.appendInt32(ov_633);
    }
    const lm_634 = this.#lockMode_501;
    if (!(lm_634 == null)) {
      b_609.appendSafe(lm_634.keyword());
    }
    return b_609.accumulated;
  }
  /** @returns {SqlFragment} */
  countSql() {
    let t_636;
    let t_637;
    const b_638 = new SqlBuilder();
    b_638.appendSafe("SELECT COUNT(*) FROM ");
    b_638.appendSafe(this.#tableName_490.sqlValue);
    function fn_639(jc_640) {
      b_638.appendSafe(" ");
      let t_641 = jc_640.joinType.keyword();
      b_638.appendSafe(t_641);
      b_638.appendSafe(" ");
      let t_642 = jc_640.table.sqlValue;
      b_638.appendSafe(t_642);
      const oc2_643 = jc_640.onCondition;
      if (!(oc2_643 == null)) {
        const oc2_644 = oc2_643;
        b_638.appendSafe(" ON ");
        b_638.appendFragment(oc2_644);
      }
      return;
    }
    this.#joinClauses_496.forEach(fn_639);
    if (! ! this.#conditions_491.length) {
      b_638.appendSafe(" WHERE ");
      b_638.appendFragment(listedGet_197(this.#conditions_491, 0).condition);
      let i_645 = 1;
      while (true) {
        t_636 = this.#conditions_491.length;
        if (!(i_645 < t_636)) {
          break;
        }
        b_638.appendSafe(" ");
        b_638.appendSafe(listedGet_197(this.#conditions_491, i_645).keyword());
        b_638.appendSafe(" ");
        b_638.appendFragment(listedGet_197(this.#conditions_491, i_645).condition);
        i_645 = i_645 + 1 | 0;
      }
    }
    if (! ! this.#groupByFields_497.length) {
      b_638.appendSafe(" GROUP BY ");
      function fn_646(f_647) {
        return f_647.sqlValue;
      }
      b_638.appendSafe(listedJoin_431(this.#groupByFields_497, ", ", fn_646));
    }
    if (! ! this.#havingConditions_498.length) {
      b_638.appendSafe(" HAVING ");
      b_638.appendFragment(listedGet_197(this.#havingConditions_498, 0).condition);
      let i_648 = 1;
      while (true) {
        t_637 = this.#havingConditions_498.length;
        if (!(i_648 < t_637)) {
          break;
        }
        b_638.appendSafe(" ");
        b_638.appendSafe(listedGet_197(this.#havingConditions_498, i_648).keyword());
        b_638.appendSafe(" ");
        b_638.appendFragment(listedGet_197(this.#havingConditions_498, i_648).condition);
        i_648 = i_648 + 1 | 0;
      }
    }
    return b_638.accumulated;
  }
  /**
   * @param {number} defaultLimit_650
   * @returns {SqlFragment}
   */
  safeToSql(defaultLimit_650) {
    let return_651;
    let t_652;
    if (defaultLimit_650 < 0) {
      throw Error();
    }
    if (!(this.#limitVal_494 == null)) {
      return_651 = this.toSql();
    } else {
      t_652 = this.limit(defaultLimit_650);
      return_651 = t_652.toSql();
    }
    return return_651;
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
   * @param {SafeIdentifier} tableName_653
   * @param {Array<WhereClause>} conditions_654
   * @param {Array<SafeIdentifier>} selectedFields_655
   * @param {Array<OrderClause>} orderClauses_656
   * @param {number | null} limitVal_657
   * @param {number | null} offsetVal_658
   * @param {Array<JoinClause>} joinClauses_659
   * @param {Array<SafeIdentifier>} groupByFields_660
   * @param {Array<WhereClause>} havingConditions_661
   * @param {boolean} isDistinct_662
   * @param {Array<SqlFragment>} selectExprs_663
   * @param {LockMode | null} lockMode_664
   */
  constructor(tableName_653, conditions_654, selectedFields_655, orderClauses_656, limitVal_657, offsetVal_658, joinClauses_659, groupByFields_660, havingConditions_661, isDistinct_662, selectExprs_663, lockMode_664) {
    super ();
    this.#tableName_490 = tableName_653;
    this.#conditions_491 = conditions_654;
    this.#selectedFields_492 = selectedFields_655;
    this.#orderClauses_493 = orderClauses_656;
    this.#limitVal_494 = limitVal_657;
    this.#offsetVal_495 = offsetVal_658;
    this.#joinClauses_496 = joinClauses_659;
    this.#groupByFields_497 = groupByFields_660;
    this.#havingConditions_498 = havingConditions_661;
    this.#isDistinct_499 = isDistinct_662;
    this.#selectExprs_500 = selectExprs_663;
    this.#lockMode_501 = lockMode_664;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_490;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_491;
  }
  /** @returns {Array<SafeIdentifier>} */
  get selectedFields() {
    return this.#selectedFields_492;
  }
  /** @returns {Array<OrderClause>} */
  get orderClauses() {
    return this.#orderClauses_493;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_494;
  }
  /** @returns {number | null} */
  get offsetVal() {
    return this.#offsetVal_495;
  }
  /** @returns {Array<JoinClause>} */
  get joinClauses() {
    return this.#joinClauses_496;
  }
  /** @returns {Array<SafeIdentifier>} */
  get groupByFields() {
    return this.#groupByFields_497;
  }
  /** @returns {Array<WhereClause>} */
  get havingConditions() {
    return this.#havingConditions_498;
  }
  /** @returns {boolean} */
  get isDistinct() {
    return this.#isDistinct_499;
  }
  /** @returns {Array<SqlFragment>} */
  get selectExprs() {
    return this.#selectExprs_500;
  }
  /** @returns {LockMode | null} */
  get lockMode() {
    return this.#lockMode_501;
  }
};
export class SetClause extends type__6() {
  /** @type {SafeIdentifier} */
  #field_677;
  /** @type {SqlPart} */
  #value_678;
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
   * @param {SafeIdentifier} field_679
   * @param {SqlPart} value_680
   */
  constructor(field_679, value_680) {
    super ();
    this.#field_677 = field_679;
    this.#value_678 = value_680;
    return;
  }
  /** @returns {SafeIdentifier} */
  get field() {
    return this.#field_677;
  }
  /** @returns {SqlPart} */
  get value() {
    return this.#value_678;
  }
};
export class UpdateQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_683;
  /** @type {Array<SetClause>} */
  #setClauses_684;
  /** @type {Array<WhereClause>} */
  #conditions_685;
  /** @type {number | null} */
  #limitVal_686;
  /**
   * @param {SafeIdentifier} field_688
   * @param {SqlPart} value_689
   * @returns {UpdateQuery}
   */
  set(field_688, value_689) {
    const nb_690 = this.#setClauses_684.slice();
    listBuilderAdd_113(nb_690, new SetClause(field_688, value_689));
    return new UpdateQuery(this.#tableName_683, listBuilderToList_114(nb_690), this.#conditions_685, this.#limitVal_686);
  }
  /**
   * @param {SqlFragment} condition_692
   * @returns {UpdateQuery}
   */
  where(condition_692) {
    const nb_693 = this.#conditions_685.slice();
    listBuilderAdd_113(nb_693, new AndCondition(condition_692));
    return new UpdateQuery(this.#tableName_683, this.#setClauses_684, listBuilderToList_114(nb_693), this.#limitVal_686);
  }
  /**
   * @param {SqlFragment} condition_695
   * @returns {UpdateQuery}
   */
  orWhere(condition_695) {
    const nb_696 = this.#conditions_685.slice();
    listBuilderAdd_113(nb_696, new OrCondition(condition_695));
    return new UpdateQuery(this.#tableName_683, this.#setClauses_684, listBuilderToList_114(nb_696), this.#limitVal_686);
  }
  /**
   * @param {number} n_698
   * @returns {UpdateQuery}
   */
  limit(n_698) {
    if (n_698 < 0) {
      throw Error();
    }
    return new UpdateQuery(this.#tableName_683, this.#setClauses_684, this.#conditions_685, n_698);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_700;
    let t_701;
    if (! this.#conditions_685.length) {
      throw Error();
    }
    if (! this.#setClauses_684.length) {
      throw Error();
    }
    const b_702 = new SqlBuilder();
    b_702.appendSafe("UPDATE ");
    b_702.appendSafe(this.#tableName_683.sqlValue);
    b_702.appendSafe(" SET ");
    b_702.appendSafe(listedGet_197(this.#setClauses_684, 0).field.sqlValue);
    b_702.appendSafe(" = ");
    b_702.appendPart(listedGet_197(this.#setClauses_684, 0).value);
    let i_703 = 1;
    while (true) {
      t_700 = this.#setClauses_684.length;
      if (!(i_703 < t_700)) {
        break;
      }
      b_702.appendSafe(", ");
      b_702.appendSafe(listedGet_197(this.#setClauses_684, i_703).field.sqlValue);
      b_702.appendSafe(" = ");
      b_702.appendPart(listedGet_197(this.#setClauses_684, i_703).value);
      i_703 = i_703 + 1 | 0;
    }
    b_702.appendSafe(" WHERE ");
    b_702.appendFragment(listedGet_197(this.#conditions_685, 0).condition);
    let i_704 = 1;
    while (true) {
      t_701 = this.#conditions_685.length;
      if (!(i_704 < t_701)) {
        break;
      }
      b_702.appendSafe(" ");
      b_702.appendSafe(listedGet_197(this.#conditions_685, i_704).keyword());
      b_702.appendSafe(" ");
      b_702.appendFragment(listedGet_197(this.#conditions_685, i_704).condition);
      i_704 = i_704 + 1 | 0;
    }
    const lv_705 = this.#limitVal_686;
    if (!(lv_705 == null)) {
      const lv_706 = lv_705;
      b_702.appendSafe(" LIMIT ");
      b_702.appendInt32(lv_706);
    }
    return b_702.accumulated;
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
   * @param {SafeIdentifier} tableName_707
   * @param {Array<SetClause>} setClauses_708
   * @param {Array<WhereClause>} conditions_709
   * @param {number | null} limitVal_710
   */
  constructor(tableName_707, setClauses_708, conditions_709, limitVal_710) {
    super ();
    this.#tableName_683 = tableName_707;
    this.#setClauses_684 = setClauses_708;
    this.#conditions_685 = conditions_709;
    this.#limitVal_686 = limitVal_710;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_683;
  }
  /** @returns {Array<SetClause>} */
  get setClauses() {
    return this.#setClauses_684;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_685;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_686;
  }
};
export class DeleteQuery extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_715;
  /** @type {Array<WhereClause>} */
  #conditions_716;
  /** @type {number | null} */
  #limitVal_717;
  /**
   * @param {SqlFragment} condition_719
   * @returns {DeleteQuery}
   */
  where(condition_719) {
    const nb_720 = this.#conditions_716.slice();
    listBuilderAdd_113(nb_720, new AndCondition(condition_719));
    return new DeleteQuery(this.#tableName_715, listBuilderToList_114(nb_720), this.#limitVal_717);
  }
  /**
   * @param {SqlFragment} condition_722
   * @returns {DeleteQuery}
   */
  orWhere(condition_722) {
    const nb_723 = this.#conditions_716.slice();
    listBuilderAdd_113(nb_723, new OrCondition(condition_722));
    return new DeleteQuery(this.#tableName_715, listBuilderToList_114(nb_723), this.#limitVal_717);
  }
  /**
   * @param {number} n_725
   * @returns {DeleteQuery}
   */
  limit(n_725) {
    if (n_725 < 0) {
      throw Error();
    }
    return new DeleteQuery(this.#tableName_715, this.#conditions_716, n_725);
  }
  /** @returns {SqlFragment} */
  toSql() {
    let t_727;
    if (! this.#conditions_716.length) {
      throw Error();
    }
    const b_728 = new SqlBuilder();
    b_728.appendSafe("DELETE FROM ");
    b_728.appendSafe(this.#tableName_715.sqlValue);
    b_728.appendSafe(" WHERE ");
    b_728.appendFragment(listedGet_197(this.#conditions_716, 0).condition);
    let i_729 = 1;
    while (true) {
      t_727 = this.#conditions_716.length;
      if (!(i_729 < t_727)) {
        break;
      }
      b_728.appendSafe(" ");
      b_728.appendSafe(listedGet_197(this.#conditions_716, i_729).keyword());
      b_728.appendSafe(" ");
      b_728.appendFragment(listedGet_197(this.#conditions_716, i_729).condition);
      i_729 = i_729 + 1 | 0;
    }
    const lv_730 = this.#limitVal_717;
    if (!(lv_730 == null)) {
      const lv_731 = lv_730;
      b_728.appendSafe(" LIMIT ");
      b_728.appendInt32(lv_731);
    }
    return b_728.accumulated;
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
   * @param {SafeIdentifier} tableName_732
   * @param {Array<WhereClause>} conditions_733
   * @param {number | null} limitVal_734
   */
  constructor(tableName_732, conditions_733, limitVal_734) {
    super ();
    this.#tableName_715 = tableName_732;
    this.#conditions_716 = conditions_733;
    this.#limitVal_717 = limitVal_734;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_715;
  }
  /** @returns {Array<WhereClause>} */
  get conditions() {
    return this.#conditions_716;
  }
  /** @returns {number | null} */
  get limitVal() {
    return this.#limitVal_717;
  }
};
export class SafeIdentifier extends type__6() {
  /** @returns {string} */
  get sqlValue() {
    null;
  }
};
class ValidatedIdentifier_739 extends type__6(SafeIdentifier) {
  /** @type {string} */
  #_value_740;
  /** @returns {string} */
  get sqlValue() {
    return this.#_value_740;
  }
  /** @param {string} _value_742 */
  constructor(_value_742) {
    super ();
    this.#_value_740 = _value_742;
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
  #name_743;
  /** @type {FieldType} */
  #fieldType_744;
  /** @type {boolean} */
  #nullable_745;
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
   * @param {SafeIdentifier} name_746
   * @param {FieldType} fieldType_747
   * @param {boolean} nullable_748
   */
  constructor(name_746, fieldType_747, nullable_748) {
    super ();
    this.#name_743 = name_746;
    this.#fieldType_744 = fieldType_747;
    this.#nullable_745 = nullable_748;
    return;
  }
  /** @returns {SafeIdentifier} */
  get name() {
    return this.#name_743;
  }
  /** @returns {FieldType} */
  get fieldType() {
    return this.#fieldType_744;
  }
  /** @returns {boolean} */
  get nullable() {
    return this.#nullable_745;
  }
};
export class TableDef extends type__6() {
  /** @type {SafeIdentifier} */
  #tableName_752;
  /** @type {Array<FieldDef>} */
  #fields_753;
  /**
   * @param {string} name_755
   * @returns {FieldDef}
   */
  field(name_755) {
    let return_756;
    fn_757: {
      const this_758 = this.#fields_753;
      const n_759 = this_758.length;
      let i_760 = 0;
      while (i_760 < n_759) {
        const el_761 = listedGet_197(this_758, i_760);
        i_760 = i_760 + 1 | 0;
        const f_762 = el_761;
        if (f_762.name.sqlValue === name_755) {
          return_756 = f_762;
          break fn_757;
        }
      }
      throw Error();
    }
    return return_756;
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
   * @param {SafeIdentifier} tableName_763
   * @param {Array<FieldDef>} fields_764
   */
  constructor(tableName_763, fields_764) {
    super ();
    this.#tableName_752 = tableName_763;
    this.#fields_753 = fields_764;
    return;
  }
  /** @returns {SafeIdentifier} */
  get tableName() {
    return this.#tableName_752;
  }
  /** @returns {Array<FieldDef>} */
  get fields() {
    return this.#fields_753;
  }
};
export class SqlBuilder extends type__6() {
  /** @type {Array<SqlPart>} */
  #buffer_767;
  /** @param {string} sqlSource_769 */
  appendSafe(sqlSource_769) {
    let t_770 = new SqlSource(sqlSource_769);
    listBuilderAdd_113(this.#buffer_767, t_770);
    return;
  }
  /** @param {SqlFragment} fragment_772 */
  appendFragment(fragment_772) {
    let t_773 = fragment_772.parts;
    listBuilderAddAll_774(this.#buffer_767, t_773);
    return;
  }
  /** @param {SqlPart} part_776 */
  appendPart(part_776) {
    listBuilderAdd_113(this.#buffer_767, part_776);
    return;
  }
  /** @param {Array<SqlPart>} values_778 */
  appendPartList(values_778) {
    const this781 = this;
    function fn_779(x_780) {
      this781.appendPart(x_780);
      return;
    }
    this.#appendList_782(values_778, fn_779);
    return;
  }
  /** @param {boolean} value_784 */
  appendBoolean(value_784) {
    let t_785 = new SqlBoolean(value_784);
    listBuilderAdd_113(this.#buffer_767, t_785);
    return;
  }
  /** @param {Array<boolean>} values_787 */
  appendBooleanList(values_787) {
    const this790 = this;
    function fn_788(x_789) {
      this790.appendBoolean(x_789);
      return;
    }
    this.#appendList_782(values_787, fn_788);
    return;
  }
  /** @param {globalThis.Date} value_792 */
  appendDate(value_792) {
    let t_793 = new SqlDate(value_792);
    listBuilderAdd_113(this.#buffer_767, t_793);
    return;
  }
  /** @param {Array<globalThis.Date>} values_795 */
  appendDateList(values_795) {
    const this798 = this;
    function fn_796(x_797) {
      this798.appendDate(x_797);
      return;
    }
    this.#appendList_782(values_795, fn_796);
    return;
  }
  /** @param {number} value_800 */
  appendFloat64(value_800) {
    let t_801 = new SqlFloat64(value_800);
    listBuilderAdd_113(this.#buffer_767, t_801);
    return;
  }
  /** @param {Array<number>} values_803 */
  appendFloat64List(values_803) {
    const this806 = this;
    function fn_804(x_805) {
      this806.appendFloat64(x_805);
      return;
    }
    this.#appendList_782(values_803, fn_804);
    return;
  }
  /** @param {number} value_808 */
  appendInt32(value_808) {
    let t_809 = new SqlInt32(value_808);
    listBuilderAdd_113(this.#buffer_767, t_809);
    return;
  }
  /** @param {Array<number>} values_811 */
  appendInt32List(values_811) {
    const this814 = this;
    function fn_812(x_813) {
      this814.appendInt32(x_813);
      return;
    }
    this.#appendList_782(values_811, fn_812);
    return;
  }
  /** @param {bigint} value_816 */
  appendInt64(value_816) {
    let t_817 = new SqlInt64(value_816);
    listBuilderAdd_113(this.#buffer_767, t_817);
    return;
  }
  /** @param {Array<bigint>} values_819 */
  appendInt64List(values_819) {
    const this822 = this;
    function fn_820(x_821) {
      this822.appendInt64(x_821);
      return;
    }
    this.#appendList_782(values_819, fn_820);
    return;
  }
  /** @param {string} value_824 */
  appendString(value_824) {
    let t_825 = new SqlString(value_824);
    listBuilderAdd_113(this.#buffer_767, t_825);
    return;
  }
  /** @param {Array<string>} values_827 */
  appendStringList(values_827) {
    const this830 = this;
    function fn_828(x_829) {
      this830.appendString(x_829);
      return;
    }
    this.#appendList_782(values_827, fn_828);
    return;
  }
  /**
   * @template {unknown} T_837
   * @param {Array<T_837>} values_832
   * @param {(arg0: T_837) => void} appendValue_833
   */
  #appendList_782(values_832, appendValue_833) {
    let t_834;
    let t_835;
    let i_836 = 0;
    while (true) {
      t_834 = values_832.length;
      if (!(i_836 < t_834)) {
        break;
      }
      if (i_836 > 0) {
        this.appendSafe(", ");
      }
      t_835 = listedGet_197(values_832, i_836);
      appendValue_833(t_835);
      i_836 = i_836 + 1 | 0;
    }
    return;
  }
  /** @returns {SqlFragment} */
  get accumulated() {
    return new SqlFragment(listBuilderToList_114(this.#buffer_767));
  }
  constructor() {
    super ();
    let t_839 = [];
    this.#buffer_767 = t_839;
    return;
  }
};
export class SqlFragment extends type__6() {
  /** @type {Array<SqlPart>} */
  #parts_840;
  /** @returns {SqlSource} */
  toSource() {
    return new SqlSource(this.toString());
  }
  /** @returns {string} */
  toString() {
    let t_843;
    const builder_844 = [""];
    let i_845 = 0;
    while (true) {
      t_843 = this.#parts_840.length;
      if (!(i_845 < t_843)) {
        break;
      }
      listedGet_197(this.#parts_840, i_845).formatTo(builder_844);
      i_845 = i_845 + 1 | 0;
    }
    return builder_844[0];
  }
  /** @param {Array<SqlPart>} parts_846 */
  constructor(parts_846) {
    super ();
    this.#parts_840 = parts_846;
    return;
  }
  /** @returns {Array<SqlPart>} */
  get parts() {
    return this.#parts_840;
  }
};
export class SqlPart extends type__6() {
  /** @param {globalThis.Array<string>} builder_849 */
  formatTo(builder_849) {
    null;
  }
};
export class SqlSource extends type__6(SqlPart) {
  /** @type {string} */
  #source_850;
  /** @param {globalThis.Array<string>} builder_852 */
  formatTo(builder_852) {
    builder_852[0] += this.#source_850;
    return;
  }
  /** @param {string} source_853 */
  constructor(source_853) {
    super ();
    this.#source_850 = source_853;
    return;
  }
  /** @returns {string} */
  get source() {
    return this.#source_850;
  }
};
export class SqlBoolean extends type__6(SqlPart) {
  /** @type {boolean} */
  #value_855;
  /** @param {globalThis.Array<string>} builder_857 */
  formatTo(builder_857) {
    let t_858;
    if (this.#value_855) {
      t_858 = "TRUE";
    } else {
      t_858 = "FALSE";
    }
    builder_857[0] += t_858;
    return;
  }
  /** @param {boolean} value_859 */
  constructor(value_859) {
    super ();
    this.#value_855 = value_859;
    return;
  }
  /** @returns {boolean} */
  get value() {
    return this.#value_855;
  }
};
export class SqlDate extends type__6(SqlPart) {
  /** @type {globalThis.Date} */
  #value_861;
  /** @param {globalThis.Array<string>} builder_863 */
  formatTo(builder_863) {
    builder_863[0] += "'";
    let t_864 = this.#value_861.toISOString().split("T")[0];
    function fn_865(c_866) {
      if (c_866 === 39) {
        builder_863[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_867(builder_863, c_866);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_868(t_864, fn_865);
    builder_863[0] += "'";
    return;
  }
  /** @param {globalThis.Date} value_869 */
  constructor(value_869) {
    super ();
    this.#value_861 = value_869;
    return;
  }
  /** @returns {globalThis.Date} */
  get value() {
    return this.#value_861;
  }
};
export class SqlFloat64 extends type__6(SqlPart) {
  /** @type {number} */
  #value_871;
  /** @param {globalThis.Array<string>} builder_873 */
  formatTo(builder_873) {
    let t_874;
    let t_875;
    const s_876 = float64ToString_280(this.#value_871);
    if (s_876 === "NaN") {
      t_875 = true;
    } else {
      if (s_876 === "Infinity") {
        t_874 = true;
      } else {
        t_874 = s_876 === "-Infinity";
      }
      t_875 = t_874;
    }
    if (t_875) {
      builder_873[0] += "NULL";
    } else {
      builder_873[0] += s_876;
    }
    return;
  }
  /** @param {number} value_877 */
  constructor(value_877) {
    super ();
    this.#value_871 = value_877;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_871;
  }
};
export class SqlInt32 extends type__6(SqlPart) {
  /** @type {number} */
  #value_879;
  /** @param {globalThis.Array<string>} builder_881 */
  formatTo(builder_881) {
    let t_882 = this.#value_879.toString();
    builder_881[0] += t_882;
    return;
  }
  /** @param {number} value_883 */
  constructor(value_883) {
    super ();
    this.#value_879 = value_883;
    return;
  }
  /** @returns {number} */
  get value() {
    return this.#value_879;
  }
};
export class SqlInt64 extends type__6(SqlPart) {
  /** @type {bigint} */
  #value_885;
  /** @param {globalThis.Array<string>} builder_887 */
  formatTo(builder_887) {
    let t_888 = this.#value_885.toString();
    builder_887[0] += t_888;
    return;
  }
  /** @param {bigint} value_889 */
  constructor(value_889) {
    super ();
    this.#value_885 = value_889;
    return;
  }
  /** @returns {bigint} */
  get value() {
    return this.#value_885;
  }
};
export class SqlString extends type__6(SqlPart) {
  /** @type {string} */
  #value_891;
  /** @param {globalThis.Array<string>} builder_893 */
  formatTo(builder_893) {
    builder_893[0] += "'";
    function fn_894(c_895) {
      if (c_895 === 39) {
        builder_893[0] += "''";
      } else {
        try {
          stringBuilderAppendCodePoint_867(builder_893, c_895);
        } catch {
          throw Error();
        }
      }
      return;
    }
    stringForEach_868(this.#value_891, fn_894);
    builder_893[0] += "'";
    return;
  }
  /** @param {string} value_896 */
  constructor(value_896) {
    super ();
    this.#value_891 = value_896;
    return;
  }
  /** @returns {string} */
  get value() {
    return this.#value_891;
  }
};
/**
 * @param {TableDef} tableDef_898
 * @param {Map<string, string>} params_899
 * @returns {Changeset}
 */
export function changeset(tableDef_898, params_899) {
  let t_900 = mapConstructor_901(Object.freeze([]));
  return new ChangesetImpl_75(tableDef_898, params_899, t_900, Object.freeze([]), true);
};
/**
 * @param {number} c_903
 * @returns {boolean}
 */
function isIdentStart_902(c_903) {
  let return_904;
  let t_905;
  let t_906;
  if (c_903 >= 97) {
    t_905 = c_903 <= 122;
  } else {
    t_905 = false;
  }
  if (t_905) {
    return_904 = true;
  } else {
    if (c_903 >= 65) {
      t_906 = c_903 <= 90;
    } else {
      t_906 = false;
    }
    if (t_906) {
      return_904 = true;
    } else {
      return_904 = c_903 === 95;
    }
  }
  return return_904;
}
/**
 * @param {number} c_908
 * @returns {boolean}
 */
function isIdentPart_907(c_908) {
  let return_909;
  if (isIdentStart_902(c_908)) {
    return_909 = true;
  } else if (c_908 >= 48) {
    return_909 = c_908 <= 57;
  } else {
    return_909 = false;
  }
  return return_909;
}
/**
 * @param {string} name_910
 * @returns {SafeIdentifier}
 */
export function safeIdentifier(name_910) {
  let t_911;
  if (! name_910) {
    throw Error();
  }
  let idx_912 = 0;
  if (! isIdentStart_902(stringGet_384(name_910, idx_912))) {
    throw Error();
  }
  let t_913 = stringNext_381(name_910, idx_912);
  idx_912 = t_913;
  while (true) {
    if (!(name_910.length > idx_912)) {
      break;
    }
    if (! isIdentPart_907(stringGet_384(name_910, idx_912))) {
      throw Error();
    }
    t_911 = stringNext_381(name_910, idx_912);
    idx_912 = t_911;
  }
  return new ValidatedIdentifier_739(name_910);
};
/**
 * @param {TableDef} tableDef_1392
 * @param {number} id_1393
 * @returns {SqlFragment}
 */
export function deleteSql(tableDef_1392, id_1393) {
  const b_1394 = new SqlBuilder();
  b_1394.appendSafe("DELETE FROM ");
  b_1394.appendSafe(tableDef_1392.tableName.sqlValue);
  b_1394.appendSafe(" WHERE id = ");
  b_1394.appendInt32(id_1393);
  return b_1394.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_1395
 * @returns {Query}
 */
export function from(tableName_1395) {
  return new Query(tableName_1395, Object.freeze([]), Object.freeze([]), Object.freeze([]), null, null, Object.freeze([]), Object.freeze([]), Object.freeze([]), false, Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} table_1396
 * @param {SafeIdentifier} column_1397
 * @returns {SqlFragment}
 */
export function col(table_1396, column_1397) {
  const b_1398 = new SqlBuilder();
  b_1398.appendSafe(table_1396.sqlValue);
  b_1398.appendSafe(".");
  b_1398.appendSafe(column_1397.sqlValue);
  return b_1398.accumulated;
};
/** @returns {SqlFragment} */
export function countAll() {
  const b_1399 = new SqlBuilder();
  b_1399.appendSafe("COUNT(*)");
  return b_1399.accumulated;
};
/**
 * @param {SafeIdentifier} field_1400
 * @returns {SqlFragment}
 */
export function countCol(field_1400) {
  const b_1401 = new SqlBuilder();
  b_1401.appendSafe("COUNT(");
  b_1401.appendSafe(field_1400.sqlValue);
  b_1401.appendSafe(")");
  return b_1401.accumulated;
};
/**
 * @param {SafeIdentifier} field_1402
 * @returns {SqlFragment}
 */
export function sumCol(field_1402) {
  const b_1403 = new SqlBuilder();
  b_1403.appendSafe("SUM(");
  b_1403.appendSafe(field_1402.sqlValue);
  b_1403.appendSafe(")");
  return b_1403.accumulated;
};
/**
 * @param {SafeIdentifier} field_1404
 * @returns {SqlFragment}
 */
export function avgCol(field_1404) {
  const b_1405 = new SqlBuilder();
  b_1405.appendSafe("AVG(");
  b_1405.appendSafe(field_1404.sqlValue);
  b_1405.appendSafe(")");
  return b_1405.accumulated;
};
/**
 * @param {SafeIdentifier} field_1406
 * @returns {SqlFragment}
 */
export function minCol(field_1406) {
  const b_1407 = new SqlBuilder();
  b_1407.appendSafe("MIN(");
  b_1407.appendSafe(field_1406.sqlValue);
  b_1407.appendSafe(")");
  return b_1407.accumulated;
};
/**
 * @param {SafeIdentifier} field_1408
 * @returns {SqlFragment}
 */
export function maxCol(field_1408) {
  const b_1409 = new SqlBuilder();
  b_1409.appendSafe("MAX(");
  b_1409.appendSafe(field_1408.sqlValue);
  b_1409.appendSafe(")");
  return b_1409.accumulated;
};
/**
 * @param {Query} a_1410
 * @param {Query} b_1411
 * @returns {SqlFragment}
 */
export function unionSql(a_1410, b_1411) {
  const sb_1412 = new SqlBuilder();
  sb_1412.appendSafe("(");
  sb_1412.appendFragment(a_1410.toSql());
  sb_1412.appendSafe(") UNION (");
  sb_1412.appendFragment(b_1411.toSql());
  sb_1412.appendSafe(")");
  return sb_1412.accumulated;
};
/**
 * @param {Query} a_1413
 * @param {Query} b_1414
 * @returns {SqlFragment}
 */
export function unionAllSql(a_1413, b_1414) {
  const sb_1415 = new SqlBuilder();
  sb_1415.appendSafe("(");
  sb_1415.appendFragment(a_1413.toSql());
  sb_1415.appendSafe(") UNION ALL (");
  sb_1415.appendFragment(b_1414.toSql());
  sb_1415.appendSafe(")");
  return sb_1415.accumulated;
};
/**
 * @param {Query} a_1416
 * @param {Query} b_1417
 * @returns {SqlFragment}
 */
export function intersectSql(a_1416, b_1417) {
  const sb_1418 = new SqlBuilder();
  sb_1418.appendSafe("(");
  sb_1418.appendFragment(a_1416.toSql());
  sb_1418.appendSafe(") INTERSECT (");
  sb_1418.appendFragment(b_1417.toSql());
  sb_1418.appendSafe(")");
  return sb_1418.accumulated;
};
/**
 * @param {Query} a_1419
 * @param {Query} b_1420
 * @returns {SqlFragment}
 */
export function exceptSql(a_1419, b_1420) {
  const sb_1421 = new SqlBuilder();
  sb_1421.appendSafe("(");
  sb_1421.appendFragment(a_1419.toSql());
  sb_1421.appendSafe(") EXCEPT (");
  sb_1421.appendFragment(b_1420.toSql());
  sb_1421.appendSafe(")");
  return sb_1421.accumulated;
};
/**
 * @param {Query} q_1422
 * @param {SafeIdentifier} alias_1423
 * @returns {SqlFragment}
 */
export function subquery(q_1422, alias_1423) {
  const b_1424 = new SqlBuilder();
  b_1424.appendSafe("(");
  b_1424.appendFragment(q_1422.toSql());
  b_1424.appendSafe(") AS ");
  b_1424.appendSafe(alias_1423.sqlValue);
  return b_1424.accumulated;
};
/**
 * @param {Query} q_1425
 * @returns {SqlFragment}
 */
export function existsSql(q_1425) {
  const b_1426 = new SqlBuilder();
  b_1426.appendSafe("EXISTS (");
  b_1426.appendFragment(q_1425.toSql());
  b_1426.appendSafe(")");
  return b_1426.accumulated;
};
/**
 * @param {SafeIdentifier} tableName_1427
 * @returns {UpdateQuery}
 */
export function update(tableName_1427) {
  return new UpdateQuery(tableName_1427, Object.freeze([]), Object.freeze([]), null);
};
/**
 * @param {SafeIdentifier} tableName_1428
 * @returns {DeleteQuery}
 */
export function deleteFrom(tableName_1428) {
  return new DeleteQuery(tableName_1428, Object.freeze([]), null);
};
