'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, View, Dimensions, Platform} from 'react-native';

import BaseComponent from './BaseComponent';
const {height, width} = Dimensions.get('window');
class Background extends BaseComponent {
  render() {
    const {Colors} = this.theme();
    if (!!this.props.type) {
      const viewStyle = {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'transparent',
        justifyContent: 'center',
      };
      const {source, style} = this.appImages(`${this.props.type}Background`);
      return (
        <ImageBackground
          source={source}
          style={[viewStyle, style, this.props.style]}
          resizeMode="contain"
          imageStyle={{resizeMode: 'cover'}}>
          {this.props.children}
        </ImageBackground>
      );
    } else {
      return (
        <View style={{flex: 1, backgroundColor: Colors.BASE_BACKGROUND_COLOR}}>
          {this.props.children}
        </View>
      );
    }
  }
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
};

Background.defaultProps = {
  type: 'default',
  style: null,
};

const BackgroundHOC = (
  SomeComponent,
  {type = 'default', style = null} = {},
) => {
  return class extends React.Component {
    render() {
      return (
        <Background type={type} style={style}>
          <SomeComponent {...this.props} />
        </Background>
      );
    }
  };
};

module.exports = {
  Background,
  BackgroundHOC,
};
