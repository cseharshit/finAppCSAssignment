'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, BackHandler, InteractionManager} from 'react-native';

import BaseComponent from '../Common/BaseComponent';

class BaseScene extends BaseComponent {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.goBack = this.goBack.bind(this);
    this.registerEvents();
  }

  // TODO: Handle back button press to avoid crash.
  // Handling Back button press
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  registerEvents() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  backButton({cancel = false, showOnAndroid = false, title = null} = {}) {
    if (Platform.OS === 'ios' || showOnAndroid) {
      return {
        title: title || (cancel ? this.ls('cancel') : this.ls('back')),
        onPress: () => this.goBack(),
      };
    }
    return null;
  }

  /// Navigation
  handleBack() {
    return false;
  }

  goBack() {
    if (this.props.navigation && this.props.navigation.goBack) {
      this.props.navigation.goBack();
    }
  }

  navigate(scene, ...params) {
    if (this.props.navigation && this.props.navigation.navigate) {
      this.props.navigation.navigate(scene, ...params);
    }
  }

  /// Text Input Auto focus for SEARCH HEADER
  //   textFieldAutoFocus(ref) {
  //     if (!!ref) {
  //       InteractionManager.runAfterInteractions(() => ref.focus());
  //     }
  //   }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>I am the BaseScene component, Super Class of all Scenes.</Text>
      </View>
    );
  }
}

BaseScene.propTypes = {
  navigation: PropTypes.object,
};

BaseScene.defaultProps = {
  navigation: {goBack: () => null, navigate: () => null},
};

export default BaseScene;
