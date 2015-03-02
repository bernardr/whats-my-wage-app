var NoteService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var note = null;
        var l = notes.length;
        for (var i=0; i < l; i++) {
            if (notes[i].id == id) {
                note = notes[i];
                break;
            }
        }
        deferred.resolve(note);
        return deferred.promise();
    }

    var notes = [
        {
          "id": "part-time-seattle",
          "title":"Part Time in Seattle",
          "text": ["Employees should receive the minimum wage for each hour worked within the geographic boundaries of Seattle, provided that an employee who performs work in Seattle on an occasional basis should receive the appropriate minimum wage in a two-week period only if the employee performs more than two hours of work for an employer within Seattle during that two-week period.","Time spent in Seattle solely for the purpose of travelling through Seattle from a point of origin outside Seattle to a destination outside Seattle, with no employment-related or commercial stops in Seattle except for refueling or the employee's personal meals or errands, are not included."],
          "next":"#question/number-employees",
          "skip": function(answers) {
            return false
          }
        },
        {
          "id": "minimum-compensation",
          "title":"Minimum Compensation",
          "text":"",
          "next":"#results",
          "skip": function(answers) {
            return answers["health-insurance"] == "yes" || answers["tips"] == "yes";
          }
        },
    ];

}

