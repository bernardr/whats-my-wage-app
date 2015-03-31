var AtWorkView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

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

      var onGeolocateAndLoad = function(loc, cityLimits) {
        var ww = Wherewolf();
        ww.add("Seattle", cityLimits);

        if(ww.find([loc.coords.longitude,loc.coords.latitude])["Seattle"]) {
          answerService.saveAnswer("work-seattle","yes");

          var resultDiv = $(this.$el.find(".result")).html("In Seattle");
          var continueButton = $(this.$el.find("a.btn.hidden"));
          continueButton.attr("href","#question/number-employees");
          continueButton.removeClass("hidden");
        } else {
          answerService.saveAnswer("work-seattle","no");

          var resultDiv = $(this.$el.find(".result")).html("Not In Seattle");
          var continueButton = $(this.$el.find("a.btn.hidden"));
          continueButton.attr("href","#results");
          continueButton.removeClass("hidden");
        }
      }

      var onFailedGeolocateOrLoad = function(err1, err2) {
        $(this.$el.find(".result")).html("Unable to Determine");
      };

      var whenGeolocatedAndLoaded = $.when(geolocationDeferred, loadCityLimitsDeferred).done(onGeolocateAndLoad.bind(this)).fail( onFailedGeolocateOrLoad.bind(this));

      this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}

