var AtWorkView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      onGeolocate = function(loc) {

        answerService.saveAnswer("work-seattle","yes");

        var resultDiv = $(this.$el.find(".result")).html("In Seattle");
        var continueButton = $(this.$el.find("a.btn.hidden"));
        continueButton.removeClass("hidden");
      }

      var geolocationDeferred = $.Deferred();

      navigator.geolocation.getCurrentPosition(function(loc) {
        geolocationDeferred.resolve(loc);
      }, function() {
        geolocationDeferred.reject("Error getting location");
      });

      var loadCityLimitsDeferred = $.Deferred();

      $.ajax({
          dataType: "json",
          url: "data/city-limits.json",
          success: function(cityLimits) {
            loadCityLimitsDeferred.resolve(cityLimits);
          },
          error: function(response, status, errorThrown) {
            loadCityLimitsDeferred.reject("Error loading city limits");
          }
      });

      $.when(geolocationDeferred, loadCityLimitsDeferred).done( function(loc, cityLimits) {
        var ww = Wherewolf();
        ww.add("city-limits", cityLimits);

        console.log(ww.find([loc.coords.latitude,loc.coords.longitude], {wholeFeature: true}));
      }).fail( function(err1, err2) {
        console.log(err1);
        console.log(err2);
      });

      setTimeout(onGeolocate.bind(this), 1000);

      this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}

