'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import BaseComponent from './BaseComponent';

class Button extends BaseComponent {
  renderChild(styles) {
    if (typeof this.props.children === 'string') {
      return (
        <Text style={[styles.textStyle, this.props.textStyle]}>
          {this.props.children}
        </Text>
      );
    }
    return this.props.children;
  }

  renderButtonChild(styles) {
    return <React.Fragment>{this.renderChild(styles)}</React.Fragment>;
  }

  renderDefaultButton(styles) {
    return (
      <TouchableOpacity
        testID={this.props.testID}
        disabled={this.props.disabled}
        style={[
          styles.container,
          this.props.style,
          this.props.disabled && styles.containerDisable,
        ]}
        onPress={this.props.onPress}>
        {this.renderButtonChild(styles)}
      </TouchableOpacity>
    );
  }

  render() {
    const styles = this.styleSheet();
    return this.renderDefaultButton(styles);
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    return {
      container: {
        flex: -1,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.BUTTON_BG,
        borderRadius: 10,
      },
      containerDisable: {
        opacity: 0.5,
      },
      textStyle: {
        ...Fonts.medium(16),
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.BUTTON_TEXT,
        textAlign: 'center',
      },
    };
  }
}

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
  onPress: () => null,
  disabled: false,
};

export default Button;
