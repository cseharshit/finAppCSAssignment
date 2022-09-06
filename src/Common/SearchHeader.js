'use strict';

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {SearchBar} from 'react-native-elements';

import BaseComponent from './BaseComponent';
import Header from './Header';

class SearchHeader extends BaseComponent {
  constructor(props) {
    super(props);
    this.searchButton = this.searchButton.bind(this);
    this.state = {isSearching: false};
  }

  searchButton() {
    const {Colors} = this.theme();
    const {source: icon, style} = this.appImages('search');
    const iconStyle = {
      ...style,
      tintColor: Colors.SEARCH_ICON_COLOR,
      alignSelf: 'flex-end',
    };
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onSearchPress();
          this.setState({isSearching: !this.state.isSearching});
        }}
        style={iconStyle}>
        <Image source={icon} style={iconStyle} />
      </TouchableOpacity>
    );
  }

  renderHeader(styles) {
    return (
      <Header
        {...this.props}
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'space-between',
          marginTop: -20,
        }}
        title={this.props.title}
        headerRightButton={this.searchButton(styles)}
      />
    );
  }

  renderSearchBar(styles) {
    const {Colors} = this.theme();
    return (
      <SearchBar
        placeholder={this.props.placeholder}
        placeholderTextColor={'rgba(255,255,255,0.4)'}
        onChangeText={this.props.onSearchText}
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchBarInputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        clearIcon={null}
        searchIcon={null}
        value={this.props.searchValue}
        returnKeyType="done"
        autoFocus
        selectionColor={Colors.INPUT_CURSOR_COLOR}
        autoCorrect={false}
      />
    );
  }

  renderDrawerButton(styles) {
    const {drawerButtonViewStyle, drawerIconStyle} = styles;
    const {source, style} = this.appImages('drawerIcon');
    return (
      <TouchableOpacity style={drawerButtonViewStyle}>
        <Image source={source} style={[style, drawerIconStyle]} />
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
          onPress={() => this.setState({isSearching: false})}>
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
  renderSearchHeader(styles) {
    return (
      <View style={styles.mainContainerStyle}>
        {!this.props.showDrawerButton
          ? this.renderButton(styles)
          : this.renderDrawerButton(styles)}
        {this.renderSearchBar(styles)}
      </View>
    );
  }

  render() {
    const styles = this.styleSheet();
    return this.state.isSearching
      ? this.renderSearchHeader(styles)
      : this.renderHeader(styles);
  }

  defaultStyles() {
    const {Colors} = this.theme();
    const iconStyle = {
      marginLeft: 5,
      height: 20,
      width: 20,
      tintColor: Colors.WHITE,
    };

    return {
      mainContainerStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        ...this.props.mainContainerStyle,
      },
      searchBarContainer: {
        height: 50,
        backgroundColor: 'trangrsparent',
        borderWidth: 1,
        padding: 0,
        borderColor: 'green',
        flex: 4,
        borderTopColor: 'green',
        borderBottomColor: 'green',
        marginLeft: 8,
        borderRadius: 10,
        // alignItems: 'center',
      },
      inputContainerStyle: {
        backgroundColor: 'transparent',
        height: 50,
      },
      searchBarInputStyle: {
        height: 50,
        color: Colors.WHITE,
        borderRadius: 5,
      },
      searchIconStyle: {
        color: Colors.DEFAULT_TEXT_COLOR,
      },
      buttonTextStyle: {
        color: Colors.WHITE,
      },
      leftButtonViewStyle: {flexDirection: 'row', alignItems: 'center'},
    };
  }
}

SearchHeader.propTypes = {
  onSearchText: PropTypes.func,
  onSearchPress: PropTypes.func,
  leftButton: PropTypes.object,
  title: PropTypes.string,
};

SearchHeader.defaultProps = {
  onSearchText: () => {},
  onSearchPress: () => {},
  leftButton: null,
  title: null,
};

export default SearchHeader;
