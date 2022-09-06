'use strict';

import React from 'react';
import {
  View,
  Platform,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import BaseScene from '../BaseScene';
import {Button, Header, Cell} from '../../Common';
const {height, width} = Dimensions.get('window');
import BottomSheet from 'react-native-simple-bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import transactions from '../../res/DummyData/transactions.json';

class HomeScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      listData: transactions,
      currentBalance: '200000',
    };
  }

  renderHeaderRightButton(styles) {
    return (
      <Button
        style={styles.addMoneyButtonView}
        textStyle={styles.addMoneyButtonTextStyle}
        onPress={() => this.props.navigation.pop()}>
        {this.ls('addMoney')}
      </Button>
    );
  }
  renderHeader(styles) {
    return (
      <Header
        title={'Hello Sandra, '}
        backButtonWithImage
        showDrawerButton
        headerRightButton={this.renderHeaderRightButton(styles)}
      />
    );
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

  renderButtons(styles) {
    const buttons = (
      <View style={styles.buttonViewStyle}>
        <Button
          style={styles.buttonView}
          textStyle={styles.buttonLabelStyle}
          onPress={() => this.navigate('RequestMoneyScene')}>
          {this.ls('requestMoney')}
        </Button>
        <Button
          style={styles.buttonView}
          textStyle={styles.buttonLabelStyle}
          onPress={() => this.navigate('NewRequest')}>
          {this.ls('sendMoney')}
        </Button>
      </View>
    );
    return buttons;
  }
  statusColor = status => {
    const {Colors} = this.theme();
    switch (status) {
      case 'received':
        return Colors.RECEIVED;
      case 'sent':
        return Colors.SENT;
      case 'failed':
        return Colors.FAILED;
      default:
        return Colors.APP_RED;
    }
  };
  renderRow({item, index}) {
    const {Colors} = this.theme();
    const {name: primaryLabel, amount, image, status} = item;
    return (
      <Cell
        index={index}
        primaryLabel={primaryLabel}
        amount={`₹ ${amount}`}
        status={status}
        style={this.styleSheet().rowStyle}
        userAvatar={image}
        statusColor={this.statusColor(status.toLowerCase())}
      />
    );
  }

  renderList() {
    return (
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 10}}
        data={this.state.listData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={this.renderRow.bind(this)}
        ListHeaderComponent={this.renderTransactionView.bind(this)}
      />
    );
  }
  //TODO: IMPLEMENT DROPDOWN
  renderTransactionView() {
    const {
      transactionView,
      sortByView,
      sortByTextStyle,
      dropDownLabelStyle,
      allTransactionTextStyle,
    } = this.styleSheet();
    return (
      <View style={(transactionView, {justifyContent: 'center', padding: 8})}>
        <Text style={allTransactionTextStyle}>
          {this.ls('allTransactions')}
        </Text>
        <View style={sortByView}>
          <Text style={sortByTextStyle}>{this.ls('sortBy')}</Text>
          <Text style={dropDownLabelStyle}> Recent v</Text>
        </View>
      </View>
    );
  }

  renderSubContainer(styles) {
    return (
      <SafeAreaView>
        {
          <BottomSheet
            wrapperStyle={styles.wrapperStyle}
            lineStyle={styles.lineStyle}
            sliderMaxHeight={height * 0.5}>
            {this.renderList.bind(this)}
          </BottomSheet>
        }
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

  renderCurrentBalance(styles) {
    return (
      <View style={styles.currentBalanceView}>
        <Text style={styles.currentBalanceLabel}>
          {this.ls('currentBalanceLabel')}
        </Text>
        <Text style={styles.currentBalance}>
          {`₹ ${this.state.currentBalance}`}
        </Text>
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return (
      <View style={styles.container}>
        {this.renderHeader(styles)}
        {this.renderCurrentBalance(styles)}
        {this.renderButtons(styles)}
        {this.renderMainContainer(styles)}
      </View>
    );
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    return {
      container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_BACKGROUND,
      },

      mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      currentBalanceView: {
        width: '70%',
        marginHorizontal: 20,
        paddingTop: 40,
      },
      currentBalanceLabel: {color: Colors.WHITE, padding: 5, paddingBottom: 10},
      currentBalance: {
        ...Fonts.bold(32),
        color: Colors.WHITE,
        padding: 5,
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
      },
      descriptionStyle: {
        marginVertical: 15,
        ...Fonts.regular(14),
        color: Colors.WHITE,
      },
      buttonViewStyle: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingBottom: 20,
      },
      buttonView: {
        width: '50%',
        height: 60,
        backgroundColor: Colors.CLEAR,
        borderWidth: 1,
        borderColor: Colors.BUTTON_BG_COLOR,
        marginTop: 8,
        marginHorizontal: 5,
      },
      buttonTextStyle: {color: Colors.WHITE},
      imageStyle: {},
      addMoneyButtonView: {
        width: '100%',
        backgroundColor: Colors.APP_INDIGO_LIGHT,
      },
      addMoneyButtonTextStyle: {
        color: Colors.APP_ROYAL_BLUE,
      },
      rowStyle: {},
      wrapperStyle: {
        paddingHorizontal: 0,
        backgroundColor: Colors.APP_OXFORD,
      },
      lineStyle: {
        backgroundColor: Colors.APP_LIBERTY,
        width: 64,
        height: 7,
        borderRadius: 10,
      },
      transactionView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'space-between',
        marginVertical: 30,
        // backgroundColor: 'trap',
      },
      sortByView: {
        alignSelf: 'space-between',
        flexDirection: 'row',
        right: 4,
        justifyContent: 'center',
        paddingBottom: 4,
        marginTop: -12,
      },
      sortByTextStyle: {
        ...Fonts.medium(12),
        color: Colors.APP_LIBERTY,
      },
      dropDownLabelStyle: {
        ...Fonts.medium(12),
        color: Colors.WHITE,
      },
      allTransactionTextStyle: {
        ...Fonts.medium(16),
        color: Colors.WHITE,
      },
    };
  }
}

export default HomeScene;
