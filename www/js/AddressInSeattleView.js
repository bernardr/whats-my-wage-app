var AddressInSeattleView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      var queryAddress = function(evt) {
        var geocodeDeferred = $.Deferred();

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: $("#employer-address").val() },function(results, status) {

          if(results.length == 0) {
            geocodeDeferred.reject("Error geocoding");
          } else {
            geocodeDeferred.resolve(results);
          }


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

        var onGeocodeAndLoad = function(results, cityLimits) {
          var ww = Wherewolf();
          ww.add("Seattle", cityLimits);

          var lngLat, inSeattle;

          //For each geocoder result
          for (var i = 0; i < results.length; i++) {

            lngLat = {
              lng: results[0].geometry.location.lng(),
              lat: results[0].geometry.location.lat()
            };

            inSeattle = ww.find(lngLat,{
              layer:"Seattle",
              wholeFeature: true
            });

            //If it's a match, stop
            if (inSeattle) {
              answerService.saveAnswer("work-seattle","yes");

              var resultDiv = $(this.$el.find(".result")).html("In Seattle");
              var continueButton = $(this.$el.find("a.btn"));
              continueButton.attr("href","#question/number-employees");
              continueButton.removeClass("hidden");

              return;
            }

          }

          answerService.saveAnswer("work-seattle","no");

          var resultDiv = $(this.$el.find(".result")).html("Not In Seattle");
          var continueButton = $(this.$el.find("a.btn"));
          continueButton.attr("href","#results");
          continueButton.removeClass("hidden");
        }

        var onFailedGeocodeOrLoad = function(err1, err2) {
          $(this.$el.find(".result")).html("Unable to Determine");
        };

        $.when(geocodeDeferred, loadCityLimitsDeferred).done(onGeocodeAndLoad.bind(this)).fail( onFailedGeocodeOrLoad.bind(this));
      };

      this.$el.on("click",".query", queryAddress.bind(this));
      this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}

