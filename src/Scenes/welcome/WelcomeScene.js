'use strict';

import React from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import BaseScene from '../BaseScene';
import {Button} from '../../Common';
const {height, width} = Dimensions.get('window');

class WelcomeScene extends BaseScene {
  constructor(props) {
    super(props);
  }
  renderTitle(styles, title) {
    return <Text style={styles.titleStyle}>{title}</Text>;
  }

  renderDescriptionText(styles, description) {
    return (
      <Text style={styles.descriptionStyle} textAlign={'center'}>
        {description}
      </Text>
    );
  }

  renderHorizontalBars(styles) {
    const {source, style} = this.appImages('horizontalBarIcon');
    return <Image source={source} style={[style, styles]} />;
  }

  renderButton(styles) {
    return (
      <Button
        style={styles.buttonView}
        textStyle={styles.buttonTextStyle}
        onPress={() => this.navigate('HomeScene')}>
        {this.ls('startBanking')}
      </Button>
    );
  }

  renderSubContainer(styles) {
    const {title, description} = this.ls('welcomeTutorial');
    return (
      <SafeAreaView style={styles.subContainer}>
        {this.renderHorizontalBars(styles.imageStyle)}
        <View style={styles.textContainerStyle}>
          {this.renderTitle(styles, title)}
          {this.renderDescriptionText(styles, description)}
        </View>
        {this.renderButton(styles)}
      </SafeAreaView>
    );
  }

  renderMainContainer(styles) {
    return (
      <View style={styles.mainContainer}>
        {this.renderSubContainer(styles)}
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return (
      <View style={styles.container}>{this.renderMainContainer(styles)}</View>
    );
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    return {
      container: {
        flex: 1,
        alignItems: 'center',
      },
      mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: Platform.OS == 'android' ? width * 0.8 : width * 0.85,
        height: Platform.OS == 'android' ? height * 0.3 : height * 0.28,
        position: 'absolute',
        left: 0,
        bottom: 0,
        paddingVertical: 5,
        borderTopRightRadius: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: Colors.APP_INDIGO,
      },
      titleStyle: {
        ...Fonts.bold(18),
        color: Colors.WHITE,
      },
      textContainerStyle: {
        marginTop: 18,
        alignItems: 'flex-start',
      },
      subContainer: {
        width: '100%',
        paddingBottom: 15,
        marginTop: 24,
        marginLeft: 24,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        bottom: 12,
      },
      descriptionStyle: {
        marginVertical: 15,
        ...Fonts.regular(14),
        color: Colors.WHITE,
      },
      buttonView: {width: '50%', backgroundColor: Colors.WHITE, marginTop: 8},
      buttonTextStyle: {color: Colors.APP_INDIGO},
      imageStyle: {},
    };
  }
}

export default WelcomeScene;
