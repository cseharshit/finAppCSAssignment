import React from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Button, SearchHeader} from '../../Common';
import BaseScene from '../BaseScene';
import contacts from '../../res/DummyData/transactions.json';
import PlaceHolderImage from 'react-native-placeholderimage';
import BottomSheet from 'react-native-simple-bottom-sheet';

const {height, width} = Dimensions.get('window');
let paddingLeft = 4;
class NewRequestScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      listData: contacts,
      selectedUser: null,
      sortedListData: contacts,
      showBottomSheet: false,
    };
    this.onSearchText = this.onSearchText.bind(this);
  }

  onSearchButtonPress() {
    this.setState({isSearching: true});
  }
  onSearchText(searchText) {
    this.setState({
      sortedListData:
        searchText.length > 0
          ? this.state.listData.filter(l => {
              if (l.name.toLowerCase().startsWith(searchText.toLowerCase())) {
                return l;
              }
            })
          : this.state.sortedListData,
      isSearching: false,
      searchText: searchText.length > 0 ? searchText : '',
    });
  }

  renderBottomSheet(styles) {
    const {Colors} = this.theme();
    const contact = this.state.selectedUser;
    return (
      <SafeAreaView>
        <BottomSheet
          isOpen
          wrapperStyle={styles.wrapperStyle}
          lineStyle={styles.lineStyle}>
          <View style={styles.bottomCardView}>
            <PlaceHolderImage
              source={{uri: contact.image}}
              style={styles.userAvatarBigStyle}
            />
            <Text style={[styles.nameStyle, {marginVertical: 8}]}>
              {contact.name}
            </Text>
            <Text style={styles.phoneStyle}>{contact.phone}</Text>
            <Button
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}>
              {this.ls('continue')}
            </Button>
          </View>
        </BottomSheet>
      </SafeAreaView>
    );
  }
  onUserPress(item) {
    if (!!this.state.selectedUser) {
      if (
        this.state.selectedUser.name.toLowerCase() == item.name.toLowerCase()
      ) {
        this.setState({
          showBottomSheet: false,
          selectedUser: null,
        });
      } else {
        this.setState({
          showBottomSheet: true,
          selectedUser: item,
        });
      }
    } else {
      this.setState({
        showBottomSheet: true,
        selectedUser: item,
      });
    }
  }

  renderHeader() {
    return (
      <View style={{flexDirection: 'row', top: 30}}>
        <SearchHeader
          backButtonWithImage
          onPress={() => this.props.navigation.pop()}
          titleStyle={{
            textAlign: 'center',
            alignSelf: 'center',
          }}
          mainContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: Platform.OS == 'ios' ? 30 : 0,
          }}
          onSearchText={this.onSearchText}
          searchValue={this.state.searchText}
        />
      </View>
    );
  }

  renderRow({item, index}) {
    const styles = this.styleSheet();
    const source = item.image;
    const isUserSelected =
      !!this.state.selectedUser &&
      item.name.toLowerCase() == this.state.selectedUser.name.toLowerCase();
    const selectedColor = isUserSelected ? '#1DC76B' : 'white';
    const selectedUserStyle = isUserSelected
      ? {
          width: 90,
          height: 90,
          borderRadius: 45,
          borderWidth: 3,
          borderColor: selectedColor,
        }
      : null;
    return (
      <View
        style={{
          alignSelf: 'center',
          marginVertical: 20,
          marginTop: (index + 1) % 2 == 0 ? 50 : 20,
          marginHorizontal: (index + 2) % 3 == 1 ? 30 : 20,

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={this.onUserPress.bind(this, item)}>
          <PlaceHolderImage
            source={{uri: source}}
            style={[styles.userAvatarStyle, selectedUserStyle]}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.nameStyle,
              {marginVertical: 12, color: selectedColor},
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderList() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            width: width,
          }}
          data={this.state.sortedListData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={this.renderRow.bind(this)}
          numColumns={2}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{}}
        />
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return (
      <View style={styles.container}>
        {this.renderHeader(styles)}
        <ImageBackground
          source={this.appImages('usersBackground').source}
          style={[this.appImages('usersBackground').style, styles.galaxy]}>
          {this.renderList()}
        </ImageBackground>
        <View>
          {!!this.state.selectedUser &&
            !!this.state.showBottomSheet &&
            this.renderBottomSheet(styles)}
        </View>
      </View>
    );
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    return {
      container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      },
      galaxy: {
        flex: 1,
        top: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        overflow: 'hidden',
      },
      userAvatarStyle: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        alignSelf: 'center',
        backgroundColor: Colors.APP_LIBERTY,

        // transform: [{skewY: '0deg'}, {skewX: '0deg'}],
      },
      nameStyle: {
        ...Fonts.medium(16),
        color: Colors.WHITE,
        textAlign: 'center',
        lineHeight: 16,
      },
      numberStyle: {
        ...Fonts.medium(16),
      },

      userAvatarBigStyle: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderRadius: 45,
        borderColor: 'white',
        backgroundColor: Colors.APP_LIBERTY,
      },
      wrapperStyle: {
        backgroundColor: Colors.APP_OXFORD,
        borderColor: Colors.APP_OXFORD,
        paddingHorizontal: 0,
        width: '100%',
        flex: 1,
        borderWidth: 1,
      },
      lineStyle: {
        backgroundColor: Colors.APP_LIBERTY,
        width: 64,
        height: 7,
        borderRadius: 10,
      },
      bottomCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 50,
      },
      phoneStyle: {
        color: Colors.WHITE,
        padding: 6,
        ...Fonts.bold(16),
      },
      buttonTextStyle: {color: Colors.WHITE},
      buttonStyle: {width: '50%', height: 55, marginVertical: 4},
    };
  }
}

export default NewRequestScene;
