var WageTheftView = function (wageTheftReportService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      this.render();

      this.$el.on('click','.btn-report', function(evt) {
        wageTheftReportService.submitReport($("#wage-theft-report").serializeObject());
      });
  };

  this.render = function() {
    this.$el.html(this.template(this.info));
    return this;
  };

  this.initialize();
}
