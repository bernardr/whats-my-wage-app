var EmployerSizeAddressView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      var query = function(evt) {
        answerService.saveAnswer("number-employees",">500");
        var resultDisplayDiv = $(this.$el.find(".result-display"));
        var resultDiv = $(resultDisplayDiv.find(".result")).html("Over 500 Employees");
        var continueButton = $(resultDisplayDiv.find("a.btn.hidden"));
        continueButton.removeClass("hidden");
      };

      this.$el.on("click",".query", query.bind(this));

      this.render();
  };

  this.render = function() {
    this.$el.html(this.template({title: "Employer Size?"}));
    return this;
  };

  this.initialize();
}

