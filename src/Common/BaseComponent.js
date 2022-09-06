'use strict';

import * as React from 'react';
import GRP from './GlobalResourceProvider';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.styles = this.defaultStyles();
  }

  appImages(key) {
    return key ? GRP.images[key] : GRP.images;
  }
  // local strings
  ls(key) {
    return GRP.lsV(key);
  }
  /// Stylesheet
  theme() {
    return GRP.theme;
  }
  styleSheet() {
    return this.styles;
  }
  defaultStyles() {
    return null;
  }
}

export default BaseComponent;
