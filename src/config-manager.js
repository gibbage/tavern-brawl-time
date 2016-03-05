var DEFAULT_REGION = 'americas';
var CONFIG_URL = 'https://rawgit.com/gibbage/tavern-brawl-time/master/config/index.html';

var Settings = require('settings');

Settings.config(
  { url: CONFIG_URL },
  function onConfigWindowClose(e) {
    if (!e.failed) {
      console.log('Region changed to "' + Settings.option('region') + '".');
      // now update Timeline subscriptions...
    } else {
      console.log(e.response);
    }
  }
);

function getRegion() {
  var region = Settings.option('region');
  if (!region) {
    console.log('No region set. Default to "' + DEFAULT_REGION + '".');
    region = DEFAULT_REGION;
    Settings.option('region', region);
  }
  return region;
}

module.exports = {
  getRegion: getRegion
};