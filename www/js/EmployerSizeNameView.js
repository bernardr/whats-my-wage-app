var EmployerSizeNameView = function (employerSizeService, answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');



      var onReportFetched = function(report) {
        var resultDisplayDiv = $(this.$el.find(".result-display"));
        var continueButton = $(resultDisplayDiv.find("a.btn-continue"));
        var reportItMessage = $(resultDisplayDiv.find(".report-it-message"));

        continueButton.removeClass("hidden");
        reportItMessage.addClass("hidden");

        if(report.size == "large") {
          answerService.saveAnswer("number-employees",">500");
          $(resultDisplayDiv.find(".result")).html("Over 500 Employees");
          continueButton.attr("href","#question/medical-benefits");
        } else {
          answerService.saveAnswer("number-employees","1-500");
          $(resultDisplayDiv.find(".result")).html("1 - 500 Employees");
          continueButton.attr("href", "#question/health-insurance");
        }
      }

      var onNoReport = function() {
        var resultDisplayDiv = $(this.$el.find(".result-display"));
        var continueButton = $(resultDisplayDiv.find("a.btn-continue"));
        var reportItMessage = $(resultDisplayDiv.find(".report-it-message"));

        continueButton.addClass("hidden");
        reportItMessage.removeClass("hidden");

        $(resultDisplayDiv.find(".result")).html("No Reported Size");
      }

      var query = function(evt) {
        if($("#employer-name").val() == "") {
          return alert("No employer name entered!");
        }

        var onReportDeferred = employerSizeService.getSizeByName($("#employer-name").val());

        onReportDeferred.done(onReportFetched.bind(this)).fail(onNoReport.bind(this));
      }


      this.$el.on("click",".query", query.bind(this));

      this.render();
  };

  this.render = function() {
    this.$el.html(this.template({title: "Employer Size?"}));
    return this;
  };

  this.initialize();
}

