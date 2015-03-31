var ContactUsService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        if(typeof url == "undefined") {
          this.url = "http://whatsmywage.org/api/v1";
        } else {
          this.url = url;
        }

        deferred.resolve();
        return deferred.promise();
    }

    this.submitContactUs = function(contactInfo) {
      var deferred = $.Deferred();

      $.ajax(this.url + "/contact_us", {
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(contactInfo),
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
