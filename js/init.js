define(function (require) {
  var React = require('react');
  var Backbone = require('backbone');
  var CLOCK_INTERVAL_MS = 100;

  var Board = require('jsx!components/Board');
  var ClockModel = Backbone.Model.extend({
    defaults: {
      tickLength: CLOCK_INTERVAL_MS
    },
    start: function () {
      if (this.get('interval')) {
        return;
      }
      var interval = setInterval(function () {
        this.trigger('tick');
      }.bind(this), this.get('tickLength'));
      this.set('interval', interval);
    },
    stop: function () {
      clearInterval(this.get('interval'));
      this.unset('interval');
    }
  });

  React.renderComponent(
    <Board clock={new ClockModel()} rows={22} cols={22}/>,
    document.getElementById('container')
  );
});
