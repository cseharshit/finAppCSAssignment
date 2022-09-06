'use strict';

import {Images, AppStrings, Theme} from '../res';

// TODO: Do not make it accessible directly, use methods
let appImages = null;
let appStrings = null;
let appTheme = null;

class GlobalResourceProvider {
  constructor() {
    appImages = Images;
    appStrings = AppStrings;
    appTheme = Theme;
    return this;
  }

  get images() {
    return appImages;
  }
  get lottie() {
    return appLottie;
  }
  lsV(key) {
    return this.ls[key] || '';
  }

  get ls() {
    return appStrings;
  }

  get theme() {
    return appTheme;
  }
}

const GRP = new GlobalResourceProvider();

export default GRP;
