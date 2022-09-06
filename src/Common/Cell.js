'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import BaseComponent from './BaseComponent';
import PlaceHolderImage from 'react-native-placeholderimage';

class Cell extends BaseComponent {
  renderStatusTag(styles) {
    return (
      <View
        style={[
          styles.statusContainer,
          {backgroundColor: this.props.statusColor},
        ]}>
        <View style={[styles.statusViewStyle, this.props.statusViewStyle]}>
          {this.renderIcon(styles)}
          <Text style={[styles.statusTextStyle, this.props.statusViewStyle]}>
            {this.props.status}
          </Text>
        </View>
      </View>
    );
  }

  renderIcon(styles) {
    const {source, style} =
      this.appImages('statusIcon')[`${this.props.status.toLowerCase()}`];
    return (
      <View style={[styles.statusIconView]}>
        <Image
          source={source}
          style={style}
          tintColor={this.props.statusColor}
        />
      </View>
    );
  }
  renderPrimaryLabel(styles) {
    if (this.props.primaryLabel) {
      return (
        <Text style={styles.primaryLabelStyle}>{this.props.primaryLabel}</Text>
      );
    }
    return null;
  }

  // TODO: USE placeholder image instead of image directly
  renderUserAvatar(styles) {
    if (!!this.props.userAvatar) {
      const source = this.props.userAvatar;
      return (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'white',
          }}>
          <PlaceHolderImage
            source={{uri: source}}
            // placeHolderURI={this.appImages().userAvatar}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: 'white',
            }}
          />
        </View>
      );
    }
    return null;
  }

  renderLeftSegment(styles) {
    return (
      <View style={styles.leftContainer}>
        {this.renderPrimaryLabel(styles)}
        {this.renderStatusTag(styles)}
      </View>
    );
  }

  renderRightSegment(styles) {
    if (!!this.props.amount) {
      return (
        <Text style={[styles.amountTextStyle, {color: this.props.statusColor}]}>
          {this.props.amount}
        </Text>
      );
    }
    return null;
  }

  render() {
    const styles = this.styleSheet();
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={styles.mainContainer}
        onPress={this.props.onPress}>
        <View style={styles.container}>
          {this.renderUserAvatar(styles)}
          {this.renderLeftSegment(styles)}
          {this.renderRightSegment(styles)}
        </View>
      </TouchableOpacity>
    );
  }

  defaultStyles() {
    const {Colors, Fonts} = this.theme();
    const bgColor =
      this.props.index % 2 == 0 ? Colors.CELL_BG2 : Colors.CELL_BG1;
    return {
      mainContainer: {
        width: '100%',
        backgroundColor: bgColor,
      },
      container: {
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        justifyContent: 'space-between',
      },
      leftContainer: {
        flex: 0.6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: -24,
      },
      rightContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      primaryLabelStyle: {
        height: 30,
        ...Fonts.semiBold(16),
        color: Colors.CELL_PRIMARY_TEXT,
      },
      amountTextStyle: {
        ...Fonts.semiBold(16),
        alignSelf: 'center',
      },

      statusContainer: {
        maxWidth: 120,
        height: 34,
        flexDirection: 'row',
        paddingRight: 6,
        marginTop: 8,
        marginRight: 8,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
      },
      statusViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      statusIconView: {
        backgroundColor: Colors.WHITE,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        left: 4,
      },
      statusTextStyle: {
        ...Fonts.medium(12),
        color: Colors.WHITE,
        marginLeft: 12,
      },
    };
  }
}

Cell.propTypes = {
  primaryLabel: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func,
};

Cell.defaultProps = {
  primaryLabel: null,
  amount: null,
  status: null,
  onPress: () => null,
};

export default Cell;
