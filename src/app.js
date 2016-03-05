var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');

var URL = 'https://s3-us-west-2.amazonaws.com/tavern-brawl-time/current.json';
var CONFIG_URL = 'https://rawgit.com/gibbage/tavern-brawl-time/master/config/index.html';
var DEFAULT_REGION = 'americas';

Pebble.addEventListener('ready', function(e) {
  console.log('App ready!');
  
  var region = Settings.option('region');
  if (!region) {
    console.log('gotta default');
    region = DEFAULT_REGION;
    Settings.option('region', region);
  }

  console.log('Subscribe to ', region);
  
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

Settings.config(
  { url: CONFIG_URL },
  function onConfigWindowClose(e) {
    if (!e.failed) {
      console.log('Region changed to "' + Settings.option('region') + '"');
    } else {
      console.log(e.response);
    }
  }
);