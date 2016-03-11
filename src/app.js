var ajax = require('ajax');
var BrawlUI = require('./brawl-ui');
var ConfigManager = require('./config-manager');
var TimelineManager = require('./timeline-manager');
var BrawlScheduler = require('./brawl-scheduler');

var URL = 'https://s3-us-west-2.amazonaws.com/tavern-brawl-time/current.json';

console.log('App ready!');

var brawlUI = new BrawlUI();
brawlUI.showLoadingScreen();

var region = ConfigManager.getRegion();
TimelineManager.subscribeToTopic(region);
ConfigManager.addOnRegionChangeListener(TimelineManager.subscribeToTopic);
ConfigManager.addOnRegionChangeListener(loadMainScreen);

loadMainScreen(region);

function loadMainScreen(region) {
  var scheduler = new BrawlScheduler(region);
  if (!scheduler.brawlStillActive()) {
    ajax(
      {
        url: URL,
        type: 'json'
      },
      function onSuccess(data) {
        data.timeUntilFinished = scheduler.timeUntilNextEvent();
        brawlUI.showBrawlDetails(data);
      },
      function onError(error) {
        console.log('Failed fetching Brawl data: ' + error);
        brawlUI.showError(error);
      }
    );
  } else {
    brawlUI.showBrawlClosed(scheduler.timeUntilNextEvent());
  }
}