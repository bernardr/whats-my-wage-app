var WageService = function() {
    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findByAnswers = function(answers) {
      var deferred = $.Deferred();

      var success = function(result) {
        for(var interval in result.intervals) {
          var current = result.intervals[interval];
          current.time_range = moment(current.time_range.start).twix(current.time_range.end, {allDay: true});
        }

        deferred.resolve(result);
      };

      var error = function(errorResponse, status, thrown) {
        deferred.reject(errorResponse, status, thrown);
      }

      $.ajax({
          method: "POST",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          url: "http://whatsmywage.org/api/v1/survey/wage",
          processData: false,
          data: JSON.stringify({answers: answers}),
          success: success,
          error: error
      });

      return deferred.promise();
    }
}
