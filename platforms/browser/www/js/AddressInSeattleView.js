var AddressInSeattleView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      queryAddress = function(evt) {
        answerService.saveAnswer("work-seattle","yes");
        var resultDisplayDiv = $(this.$el.find(".in-seattle-result-display"));
        var resultDiv = $(resultDisplayDiv.find(".in-seattle-result")).html("In Seattle");
        var continueButton = $(resultDisplayDiv.find("a.btn.hidden"));
        continueButton.removeClass("hidden");
      }

      this.$el.on("click",".query-address", queryAddress.bind(this));
      this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}

