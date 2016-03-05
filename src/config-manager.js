var DEFAULT_REGION = 'americas';
var CONFIG_URL = 'https://rawgit.com/gibbage/tavern-brawl-time/master/config/index.html';

var Settings = require('settings');

var onRegionChangeListeners = [];

Settings.config(
  { url: CONFIG_URL },
  function onConfigWindowClose(e) {
    if (!e.failed) {
      var region = Settings.option('region');
      console.log('Successfully updated configuration. Region changed to "' + region + '".');
      onRegionChangeListeners.forEach(function (listener) {
        listener(region);
      });
    } else {
      console.error('Failed to update configuration settings', e);
    }
  }
);

function getRegion() {
  var region = Settings.option('region');
  if (!region) {
    console.log('No region set. Defaulting to "' + DEFAULT_REGION + '".');
    region = DEFAULT_REGION;
    Settings.option('region', region);
  }
  return region;
}

function addOnRegionChangeListener(callback) {
  if (typeof callback === 'function') {
    console.log('Register change listener', callback.name);
    onRegionChangeListeners.push(callback);
  }
  console.log('How many listeners?', onRegionChangeListeners.length);
}

module.exports = {
  getRegion: getRegion,
  addOnRegionChangeListener: addOnRegionChangeListener
};