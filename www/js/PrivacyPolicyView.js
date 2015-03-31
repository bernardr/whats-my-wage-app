var PrivacyPolicyView = function (answerService) {
  this.initialize = function () {
      // Define a div wrapper for the view (used to attach events)
      this.$el = $('<div/>');
      this.render();
  };

  this.render = function() {
    this.$el.html(this.template({title:"Privacy Policy"}));
    return this;
  };

  this.initialize();
}
