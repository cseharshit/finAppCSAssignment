import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';
import {Button, Header} from '../../Common';
import BaseScene from '../BaseScene';
// import user
import contacts from '../../res/DummyData/transactions.json';
import PlaceHolderImage from 'react-native-placeholderimage';

const {height, width} = Dimensions.get('window');
class NewRequestScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      user: contacts[0],
      requestedAmount: 10000,
    };
  }

  renderHeader(styles) {
    return (
      <Header
        backButtonWithImage
        title={this.ls('newRequestHeaderTitle')}
        onPress={() => this.props.navigation.pop()}
        style={{marginTop: 30, left: -12}}
        titleStyle={{textAlign: 'center', alignSelf: 'center', marginLeft: -12}}
        mainContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      />
    );
  }

  renderUserAvatar(styles) {
    const source = this.state.user.image;
    return (
      <View style={styles.userAvatarOuterCircle}>
        <View style={styles.userAvatarInnerCircle}>
          <PlaceHolderImage
            source={{uri: source}}
            // placeHolderURI={this.appImages().userAvatar}
            style={styles.userAvatarStyle}
          />
        </View>
      </View>
    );
  }

  renderButtons(styles) {
    return (
      <View style={styles.buttonsView}>
        <Button
          onPress={() => navigation.goBack()}
          style={{...styles.buttonStyle, ...{}}}>
          {this.ls('sendMoneyButton')}
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          style={{
            ...styles.buttonStyle,
            ...styles.dontSendButton,
          }}>
          {this.ls('dontSendButton')}
        </Button>
      </View>
    );
  }

  renderRequestView(styles) {
    return (
      <View style={styles.requestView}>
        <Text style={styles.userName}>{this.state.user.name}</Text>
        <Text style={styles.requestingString}>{this.ls('isRequesting')}</Text>
        <Text
          style={
            styles.requestAmount
          }>{`₹ ${this.state.requestedAmount}`}</Text>
      </View>
    );
  }

  renderSubContainer(styles) {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        {this.renderUserAvatar(styles)}
        {this.renderRequestView(styles)}
        {this.renderButtons(styles)}
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return (
      <View style={styles.container}>
        {this.renderHeader(styles)}
        {this.renderSubContainer(styles)}
      </View>
    );
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    return {
      container: {
        flex: 1,
      },
      userAvatarOuterCircle: {
        height: 140,
        width: 140,
        borderRadius: 70,
        backgroundColor: Colors.CELL_BG1,
        alignItems: 'center',
        justifyContent: 'center',
        top: height / 12,
        marginVertical: 8,
      },
      userAvatarInnerCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: Colors.CELL_BG2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userAvatarStyle: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 30,
      },
      buttonsView: {
        flexDirection: 'column',
        width: width / 2.5,
        justifyContent: 'space-between',
      },
      buttonStyle: {marginVertical: 8, height: 55},
      requestView: {alignItems: 'center', marginVertical: 8},
      userName: {...Fonts.bold(18), color: 'white', marginVertical: 8},
      requestingString: {
        ...Fonts.medium(14),
        color: 'white',
        marginVertical: 8,
      },
      dontSendButton: {
        backgroundColor: Colors.CLEAR,
        borderWidth: 1,
        borderColor: Colors.BUTTON_BG_COLOR,
        marginTop: 8,
      },
      requestAmount: {...Fonts.bold(36), color: 'white', marginVertical: 8},
    };
  }
}

export default NewRequestScene;
