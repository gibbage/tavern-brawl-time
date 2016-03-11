var UI = require('ui');

var FOOTER = ' (Q‘-‘)=O  O=(‘-‘Q)';

function BrawlUI () {
  this.card = new UI.Card({
    scrollable: true
  });
}

BrawlUI.prototype = {
  showLoadingScreen: function () {
    this.card.title('It\'s Tavern Brawl Time');
    this.card.body('Hold on to your butts...');
    this.card.show();
  },
  showBrawlDetails: function (data) {
    var finishText = '* Ends ' + data.timeUntilFinished + '\n';
    var deckTypeText = data.type ? '* ' + data.type + '\n' : '';
    var quoteText = data.quote ? '\n"' + data.quote + '"\n' : '';
    this.card.title(data.name);
    this.card.body(finishText + deckTypeText + quoteText + '\n' + FOOTER);
    this.card.show();
  },
  showError: function (error) {
    this.card.body('There was an error! Please try again later.\n' + error);
    this.card.show();
  },
  showBrawlClosed: function (timeUntilNextBrawl) {
    this.card.title('Brawl finished');
    this.card.body('\nBack ' + timeUntilNextBrawl + '!\n\n' + FOOTER);
    this.card.show();
  }
};

module.exports = BrawlUI;