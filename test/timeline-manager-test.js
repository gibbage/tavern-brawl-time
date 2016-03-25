var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Pebble = require('../src/pebble-api');
var TimelineManager = require('../src/timeline-manager');

describe('TimelineManager', function () {

  describe('subscribeToTopic', function () {
    describe('on aplite devices', function () {
      it('does not blow up on old API versions', function () {
        TimelineManager.subscribeToTopic('americas');
      });
    });

    describe('on Timeline supported devices', function () {
      beforeEach(function () {
        Pebble.timelineSubscriptions = sinon.stub();
        Pebble.timelineSubscribe = sinon.stub();
        Pebble.timelineUnsubscribe = sinon.stub();
      });

      describe('when not subscribed to any topic', function () {
        beforeEach(function () {
          var existingSubscriptions = null;
          Pebble.timelineSubscriptions.callsArgWith(0, existingSubscriptions);
          TimelineManager.subscribeToTopic('americas');
        });

        it('does not need to unsubscribe', function () {
          sinon.assert.notCalled(Pebble.timelineUnsubscribe);
        });

        it('subscribe to topic', function () {
          sinon.assert.calledWith(Pebble.timelineSubscribe, 'americas');
        });
      });

      describe('when already subscribed to a different topic', function () {
        beforeEach(function () {
          var existingSubscriptions = ['europe'];
          Pebble.timelineSubscriptions.callsArgWith(0, existingSubscriptions);
          TimelineManager.subscribeToTopic('americas');
        });

        it('unsubscribes from old topic', function () {
          sinon.assert.calledWith(Pebble.timelineUnsubscribe, 'europe');
        });

        it('subscribes to new topic', function () {
          sinon.assert.calledWith(Pebble.timelineSubscribe, 'americas');
        });
      });

      describe('when already subscribed to topic', function () {
        beforeEach(function () {
          var existingSubscriptions = ['americas'];
          Pebble.timelineSubscriptions.callsArgWith(0, existingSubscriptions);
          TimelineManager.subscribeToTopic('americas');
        });

        it('does not need to unsubscribe', function () {
          sinon.assert.notCalled(Pebble.timelineUnsubscribe);
        });

        it('does not need to subscribe', function () {
          sinon.assert.notCalled(Pebble.timelineSubscribe);
        });
      });
    });
  });
});
