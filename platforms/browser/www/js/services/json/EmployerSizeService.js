var EmployerSizeService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.getSizeByName = function(name) {
        var deferred = $.Deferred();

        $.ajax({
          dataType: "json",
          url: "http://whatsmywage.org/api/v1/employer_size/report",
          data: {name: name},
          success: function(report) {
            deferred.resolve(report);
          },
          error: function(response, status, errorThrown) {
            deferred.reject("Unable to fetch employer size");
          },
          statusCode: {
            404: function() {
              deferred.reject("No report found");
            }
          }
        });

        return deferred.promise();
    }
}
