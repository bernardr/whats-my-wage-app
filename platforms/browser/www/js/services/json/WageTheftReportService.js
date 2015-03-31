var WageTheftReportService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        if(typeof url == "undefined") {
          this.url = "http://whatsmywage.org/api/v1/wage_theft";
        } else {
          this.url = url;
        }

        deferred.resolve();
        return deferred.promise();
    }

    this.submitReport = function(report) {
      var deferred = $.Deferred();

      $.ajax(this.url + "/report", {
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(report),
        dataType: "json",
        processData: false,
        success: function(data) {
          deferred.resolve();
        },
        error: function(reply, status, errorThrown) {
          deferred.reject(reply, status, errorThrown)
        }
      });

      return deferred.promise();
    }
}
