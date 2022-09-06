'use strict';
const background = {
  welcomeBackground: {source: require('./background/welcome.png'), style: null},
  defaultBackground: {source: require('./background/default.png'), style: null},
  transferBackground: {
    source: require('./background/transfer.png'),
    style: null,
  },
  usersBackground: {
    source: require('./background/usersBackground.png'),
    style: {width: 375, height: 375},
  },
};

const common = {
  horizontalBarIcon: {
    source: require('./common/horizontalBarIcon.png'),
    style: {width: 72, height: 8},
  },
  backButton: {
    source: require('./common/backButton.png'),
    style: {width: 24, height: 24},
  },
  drawerIcon: {
    source: require('./common/drawerIcon.png'),
    style: {width: 20, height: 8},
  },
  search: {
    source: require('./common/searchIcon.png'),
    style: {width: 30, height: 30},
  },
};

const statusIcon = {
  received: {
    source: require('./home/success.png'),
    style: {width: 9, height: 12},
  },
  sent: {
    source: require('./home/success.png'),
    style: {width: 9, height: 12},
  },
  failed: {
    source: require('./home/fail.png'),
    style: {width: 3, height: 12},
  },
};
module.exports = {
  ...common,
  ...background,
  statusIcon,
};
