var moment = require('vendor/moment');

var REGIONS = {
  'americas': {
    start: { day: 'wednesday', hour: 16 },
    finish: { day: 'monday', hour: 10 }
  },
  'europe': {
    start: { day: 'wednesday', hour: 20 },
    finish: { day: 'monday', hour: 4 }
  },
  'korea': {
    start: { day: 'wednesday', hour: 21 },
    finish: { day: 'sunday', hour: 22 }
  },
  'taiwan-china': {
    start: { day: 'wednesday', hour: 21 },
    finish: { day: 'sunday', hour: 22 }
  }
};

function BrawlScheduler (region) {
  this.startTimestamp = getNextEventTimestamp(REGIONS[region].start);
  this.finishTimestamp = getNextEventTimestamp(REGIONS[region].finish);
}

BrawlScheduler.prototype = {
  brawlStillActive: function () {
    return this.finishTimestamp.isBefore(this.startTimestamp);
  },
  timeUntilNextEvent: function () {
    return this.brawlStillActive() ? this.finishTimestamp.fromNow() : this.startTimestamp.fromNow();
  }
};

function getNextEventTimestamp(timeConfig) {
  var now = moment();
  var nextEventTimestamp = moment().utc().set(timeConfig).startOf('hour');
  if (nextEventTimestamp.isBefore(now)) {
    nextEventTimestamp.add(1, 'week');
  }
  return nextEventTimestamp;
}

module.exports = BrawlScheduler;
