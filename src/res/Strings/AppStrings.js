'use strict';

const welcomeScene = {
  welcomeTutorial: {
    title: 'Transfer that is safe',
    description: 'You have nothing to be scared\nabout, we got you covered.',
  },
  startBanking: 'Start Banking',
};

const button = {};

const common = {
  back: 'Back',
  rupee: '₹',
  continue: 'Continue',
};

const home = {
  addMoney: 'Add Money',
  sortBy: 'Sort By: ',
  allTransactions: 'All Transactions',
  sendMoney: 'Send Money',
  requestMoney: 'Request Money',
  currentBalanceLabel: 'Your current balance is',
};

const newRequest = {
  newRequestHeaderTitle: 'New Request',
  isRequesting: 'is requesting for',
  sendMoneyButton: 'Send Money',
  dontSendButton: "Don't Send",
};

module.exports = {
  ...welcomeScene,
  ...common,
  ...home,
  ...newRequest,
};
