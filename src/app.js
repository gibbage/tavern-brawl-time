var UI = require('ui');
var ajax = require('ajax');
var ConfigManager = require('./config-manager');
var TimelineManager = require('./timeline-manager');
var BrawlScheduler = require('./brawl-scheduler');

var URL = 'https://s3-us-west-2.amazonaws.com/tavern-brawl-time/current.json';

// Loading screen
var card = new UI.Card({
  title:'It\'s Tavern Brawl Time',
  body:'Hold on to your butts...',
  scrollable: true
});
card.show();

console.log('App ready!');

var region = ConfigManager.getRegion();
TimelineManager.subscribeToTopic(region);
ConfigManager.addOnRegionChangeListener(TimelineManager.subscribeToTopic);
ConfigManager.addOnRegionChangeListener(loadMainScreen);

loadMainScreen(region);

function loadMainScreen(region) {
  var footer = ' (Q‘-‘)=O  O=(‘-‘Q)';
  var scheduler = new BrawlScheduler(region);
  if (scheduler.brawlStillActive()) {
    ajax(
      {
        url: URL,
        type: 'json'
      },
      function (data) {
        console.log('Successfully fetched Brawl data.', data);
        card.title(data.name);
        delete data.type;
        var finishText = '* Ends ' + scheduler.timeUntilNextEvent() + '\n';
        var deckTypeText = data.type ? '* ' + data.type + '\n' : '';
        var quoteText = data.quote ? '"' + data.quote + '"\n' : '';
        card.body(finishText + deckTypeText + quoteText + footer);
      },
      function(error) {
        console.log('Failed fetching Brawl data: ' + error);
        card.body('There was an error! Please try again later.\n' + error);
      }
    );
  } else {
    card.title('Brawl finished');
    card.body('\nBack ' + scheduler.timeUntilNextEvent() + '!\n\n' + footer);
  }
}