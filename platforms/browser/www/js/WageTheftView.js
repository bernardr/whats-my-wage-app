var WageTheftView = function (wageTheftReportService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');
      this.render();

      this.$el.on('click','.btn-report', function(evt) {
        //evt.preventDefault();
        console.log("Clicking");
        wageTheftReportService.submitReport({});
      });
  };

  this.render = function() {
    this.$el.html(this.template());
    return this;
  };

  this.initialize();
}
