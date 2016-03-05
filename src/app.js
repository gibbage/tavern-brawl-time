var UI = require('ui');
var ajax = require('ajax');
var ConfigManager = require('./config-manager');

var URL = 'https://s3-us-west-2.amazonaws.com/tavern-brawl-time/current.json';

Pebble.addEventListener('ready', function(e) {
  console.log('App ready!');
  
  var region = ConfigManager.getRegion();
  console.log('Subscribe to ' + region);

  Pebble.timelineSubscribe('all-users', function () {
    console.log('Subscribed to all-users');
  }, function (error) {
    console.log('Error subscribing to topic: ' + error);
  });
});

// Loading screen
var card = new UI.Card({
  title:'It\'s Tavern Brawl Time',
  subtitle:'Hold on to your buttz...',
  scrollable: true
});
card.show();

ajax(
  {
    url: URL,
    type: 'json'
  },
  function (data) {
    console.log('Successfully fetched Brawl data!');
    card.title(data.name);
    card.subtitle(data.quote);
    card.body(data.overview);
  },
  function(error) {
    console.log('Failed fetching Brawl data: ' + error);
  }
);