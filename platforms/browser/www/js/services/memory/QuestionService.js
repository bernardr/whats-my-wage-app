var QuestionService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        var successCallback = function(questions) {
          this.questions = questions;
          deferred.resolve();
        }

        $.getJSON("http://whatsmywage.org/api/v1/survey/question", successCallback.bind(this));
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var question = null;
        var l = this.questions.length;
        for (var i=0; i < l; i++) {
            if (this.questions[i].id == id) {
                question = this.questions[i];
                break;
            }
        }
        deferred.resolve(question);
        return deferred.promise();
    }
}
