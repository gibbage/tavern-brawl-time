var PebbleApi = require('./pebble-api');

function subscribe(topic) {
  PebbleApi.timelineSubscribe(
    topic,
    function onSuccess() {
      console.log('Successfully subscribed to topic "' + topic + '".');
    },
    function onError(e) {
      console.log('Failed to unsubscribe to topic "' + topic + '".', e);
    }
  );
}

function unsubscribe(topic) {
  PebbleApi.timelineUnsubscribe(
    topic,
    function onSuccess() {
      console.log('Successfully unsubscribed from topic "' + topic + '".');
    },
    function onError(e) {
      console.error('Failed to unsubscribe from topic "' + topic + '".', e);
    }
  );
}

function subscribeToTopic(topic) {
  if (!(PebbleApi && typeof PebbleApi.timelineSubscriptions  === 'function')) {
    console.log('Timeline not supported by this pebble');
    return;
  }

  PebbleApi.timelineSubscriptions(
    function onSuccess(existingTopics) {
      var alreadySubscribed = false;

      if (existingTopics && existingTopics.length > 0) {
        existingTopics.forEach(function (existingTopic) {
          if (existingTopic === topic) {
            alreadySubscribed = true;
          } else {
            unsubscribe(existingTopic);
          }
        });
      }

      if (!alreadySubscribed) {
        subscribe(topic);
      }
    },
    function onError(e) {
      console.log('Error occured obtaining current timeline subscriptions', e);
    }
  );
}

module.exports = {
  subscribeToTopic: subscribeToTopic
};
