var WageTheftReportService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.submitReport = function(report) {
        var deferred = $.Deferred();

        $.get("http://whatsmywage.org/api/v1/wage_theft/report_url", function(url) {
          console.log("Url: " + url);
          $.post(url, report, function(data) {
            console.log("Data: " + data);
            deferred.resolve();
          });
        });

        return deferred.promise();
    }
}
