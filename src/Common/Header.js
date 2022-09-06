'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform, Image, TouchableOpacity} from 'react-native';

import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(props) {
    super(props);
  }

  renderDrawerButton(styles) {
    const {drawerButtonViewStyle, drawerIconStyle} = styles;
    const {source, style} = this.appImages('drawerIcon');
    return (
      <TouchableOpacity
        // onPress={this.navigate('DrawerTab')}
        style={drawerButtonViewStyle}>
        <Image
          source={source}
          style={[style, drawerIconStyle]}
          tintColor={drawerIconStyle.tintColor}
          overlayColor={drawerIconStyle.overlayColor}
        />
      </TouchableOpacity>
    );
  }

  renderButton(styles) {
    const {backIconStyle, buttonTextStyle, leftButtonViewStyle} = styles;
    if (!!this.props.backButtonWithImage) {
      const {source, style} = this.appImages('backButton');
      return (
        <TouchableOpacity
          style={leftButtonViewStyle}
          onPress={this.props.onPress}>
          <Image source={source} style={[style, backIconStyle]} />
          <Text style={buttonTextStyle}>
            {this.props.buttonText || this.ls('back')}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <Text style={buttonTextStyle}>
        {this.props.buttonText || this.ls('back')}
      </Text>
    );
  }

  renderTitle(styles) {
    if (this.props.title) {
      return (
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.titleTextStyle, this.props.titleStyle]}>
          {this.props.title}
        </Text>
      );
    }
  }

  renderContent(styles) {
    return (
      <View
        style={[
          styles.mainContainerStyle,
          {
            width: '100%',
            justifyContent: 'space-between',
          },
        ]}>
        {!this.props.showDrawerButton
          ? !this.props.hideLeftView && this.renderButton(styles)
          : this.renderDrawerButton(styles)}
        {this.props.children || this.renderTitle(styles)}
        {!!this.props.headerRightButton && (
          <View
            style={{
              flex: 2,
              alignSelf: 'flex-end',
            }}>
            {!!this.props.headerRightButton
              ? this.props.headerRightButton
              : null}
          </View>
        )}
      </View>
    );
  }

  renderMainContent(styles) {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderContent(styles)}
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return this.renderMainContent(styles);
  }

  defaultStyles() {
    const HEADER_HEIGHT = 56;
    const {Colors, Fonts} = this.theme();
    const iconStyle = {
      marginLeft: 5,
      height: 20,
      width: 20,
      tintColor: Colors.WHITE,
    };

    const backButtonText = {
      color: Colors.WHITE,
      fontSize: 14,
    };
    return {
      container: {
        height: HEADER_HEIGHT,
        marginTop: Platform.OS == 'ios' ? 50 : 20,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        flexDirection: 'column',
      },
      mainContainerStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        ...this.props.mainContainerStyle,
      },
      leftIconStyle: iconStyle,
      leftTextStyle: backButtonText,
      titleTextStyle: {
        flex: 3,
        marginLeft: 20,
        textAlign: 'left',
        color: Colors.WHITE,
        ...Fonts.bold(18),
      },
      backIconStyle: {
        tintColor: Colors.WHITE,
      },
      buttonTextStyle: {
        color: Colors.WHITE,
      },
      leftButtonViewStyle: {flexDirection: 'row', alignItems: 'center'},
      drawerButtonViewStyle: {
        backgroundColor: Colors.APP_INDIGO_LIGHT,
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
      drawerIconStyle: {
        tintColor: Colors.APP_RED,
        overlayColor: Colors.APP_RED,
      },
    };
  }
}
Header.propTypes = {
  backgroundImage: PropTypes.object, // Image type object { source, style }
  title: PropTypes.string,
  hideLeftView: PropTypes.bool,
  headerRightButton: PropTypes.element,
  showDrawerButton: PropTypes.bool,
};

Header.defaultProps = {
  backgroundImage: null,
  leftButton: null,
  rightButton: null,
  title: '',
  showDrawerButton: false,
  hideLeftView: false,
  headerRightButton: null,
};

export default Header;
