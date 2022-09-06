'use strict';
const Fonts = {
  medium: (s = 12) => {
    return {
      fontFamily: 'Inter-Medium',
      fontSize: s,
    };
  },
  regular: (s = 12) => {
    return {
      fontFamily: 'Inter-Regular',
      fontSize: s,
    };
  },
  bold: (s = 12) => {
    return {
      fontFamily: 'Inter-Bold',
      fontSize: s,
    };
  },
  light: (s = 12) => {
    return {
      fontFamily: 'Inter-Light',
      fontSize: s,
    };
  },
  semiBold: (s = 12) => {
    return {
      fontFamily: 'Inter-SemiBold',
      fontSize: s,
    };
  },
  black: (s = 12) => {
    return {
      fontFamily: 'Inter-Black',
      fontSize: s,
    };
  },
  extraLight: (s = 12) => {
    return {
      fontFamily: 'Inter-ExtraLight',
      fontSize: s,
    };
  },
  extraBold: (s = 12) => {
    return {
      fontFamily: 'Inter-ExtraBold',
      fontSize: s,
    };
  },
  extraThin: (s = 12) => {
    return {
      fontFamily: 'Inter-Thin',
      fontSize: s,
    };
  },
};

module.exports = {...Fonts};
