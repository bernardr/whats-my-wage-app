var ResultView = function(result) {

  this.initialize = function() {
      this.$el = $('<div/>');

      this.$el.on('click', '.btn-see-more', this.revealHidden);

      this.render();
  };

  this.render = function() {
      var pretty = [];
      for (interval in result.intervals) {
          var wage = accounting.formatMoney(result.intervals[interval].wage);
          var range = result.intervals[interval].time_range.format({implicitYear: false});

          var compensation;

          if( typeof result.intervals[interval].compensation != "undefined" ) {
            compensation = accounting.formatMoney(result.intervals[interval].compensation);
          }
          pretty.push({
            wage: wage,
            compensation: compensation,
            range: range,
            raw: result.intervals[interval]
          });
      }

      pretty[0].range = "Now - " + pretty[0].raw.time_range.end.format("MMM Do, YYYY")

      var input = {
        current: pretty[0],
        future: pretty.slice(1),
        state: result.state
      };

      this.$el.html(this.template(input));
      return this;
  };

  this.initialize();
}
