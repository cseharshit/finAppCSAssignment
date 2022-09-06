'use strict';

const mapColors = () => {
  const white = 'white';
  const black = 'black';
  const clear = 'transparent';
  const indigo = '#17288E';
  const radicalRed = '#FF2E63';
  const cetacianBlue = '#010A43';
  const indigoLight = '#212A6B';
  const royalBlue = '#426DDC';
  const oxfordBlue = '#10194E';
  const libertyBlue = '#4e589f';
  const spaceBlue = '#192259';
  const pastelBlue = '#858EC5';
  const borderNavy = '#464E8A';
  const seaGreen = '#1DC7AC';
  const cyclops = '#FE4A54';
  const yellow = '#FAAD39';

  const Common = {
    WHITE: white,
    BLACK: black,
    CLEAR: clear,
    DEFAULT_BACKGROUND: cetacianBlue,
    APP_RED: radicalRed,
    APP_INDIGO: indigo,
    APP_BLUE: cetacianBlue,
    APP_INDIGO_LIGHT: indigoLight,
    APP_ROYAL_BLUE: royalBlue,
    APP_OXFORD: oxfordBlue,
    APP_LIBERTY: libertyBlue,
    SEARCH_ICON_COLOR: white,
  };

  const Button = {
    BUTTON_BG: radicalRed,
    BUTTON_TEXT: white,
    BUTTON_BG_COLOR: borderNavy,
  };

  const Cell = {
    CELL_BG1: oxfordBlue,
    CELL_BG2: spaceBlue,
    CELL_PRIMARY_TEXT: pastelBlue,
    CELL_AMOUNT: white,
  };

  const StatusColors = {
    RECEIVED: seaGreen,
    SENT: yellow,
    FAILED: cyclops,
  };

  return {
    ...Common,
    ...Cell,
    ...Button,
    ...StatusColors,
  };
};

module.exports = {Colors: mapColors()};
