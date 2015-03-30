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

      setTimeout(onGeolocate.bind(this), 1000);

      this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}

