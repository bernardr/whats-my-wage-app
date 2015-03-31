var ContactUsView = function (contactUsService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');

      this.render();

      this.$el.on('click','.btn-send', function(evt) {
        contactUsService.submitContactUs($("#contact-us").serializeObject());
      });
  };

  this.render = function() {
    this.$el.html(this.template({title: "Contact Us"}));
    return this;
  };

  this.initialize();
}

