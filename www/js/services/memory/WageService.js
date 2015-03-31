var WageService = function() {
    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findByAnswers = function(answers) {
      var deferred = $.Deferred();

      console.log("Answers: " + JSON.stringify(answers));

      var result = {};

      var schedule;

      if(answers["work-seattle"] == "yes") {
        if(answers["number-employees"] == ">500") {
          if(answers["medical-benefits"] == "no") {
            schedule = "A";
          } else {
            schedule = "B";
          }
        } else {
          if(answers["health-insurance"] == "no" && answers["tips"] == "no") {
            schedule = "C";
          } else {
            schedule = "D";
          }
        }
      } else {
        schedule = "Washington State";
        result.state = true;
      }

      var intervals = [];
      var current;

      for (wageInterval in wageSchedules[schedule]){
          current = wageSchedules[schedule][wageInterval];

          if(schedule == "D") {
            var compensation = wageSchedules["C"][wageInterval]

            if( typeof compensation != "undefined" ) {
              current.compensation = compensation.wage
            }
          }

          if(!current.time_range.isPast()){
            intervals.push(current);
          }

      }

      result.intervals = intervals

      deferred.resolve(result);
      return deferred.promise();
    }

    // A = Schedule 1 employers (more than 500 employees in the U.S.)
    // B = Schedule 1 employers (more than 500 emp1loyees in the U.S.) with medical benefits
    // C = Schedule 2 employers (500 or fewer employees in the U.S.) with minimum compensation
    // D = Schedule 2 employers (500 or fewer employees in the U.S.)
    var wageSchedules = {
      "A": [
        {"wage": 9.47, "time_range": moment("2014-01-01").twix("2015-03-27", {allDay: true})},
        {"wage": 11.0, "time_range": moment("2015-03-28").twix("2015-12-31", {allDay: true})},
        {"wage": 13.0, "time_range": moment("2016-01-01").twix("2016-12-31", {allDay: true})},
        {"wage": 15.0, "time_range": moment("2017-01-01").twix("2018-12-31", {allDay: true})}
      ],
      "B": [
        {"wage": 9.47, "time_range": moment("2014-01-01").twix("2015-03-27", {allDay: true})},
        {"wage": 11.0, "time_range": moment("2015-03-28").twix("2015-12-31", {allDay: true})},
        {"wage": 12.5, "time_range": moment("2016-01-01").twix("2016-12-31", {allDay: true})},
        {"wage": 13.5, "time_range": moment("2017-01-01").twix("2017-12-31", {allDay: true})},
        {"wage": 15.0, "time_range": moment("2018-01-01").twix("2018-12-31", {allDay: true})}
      ],
      "C": [
        {"wage": 9.47, "time_range": moment("2014-01-01").twix("2015-03-27", {allDay: true})},
        {"wage": 11.0, "time_range": moment("2015-03-28").twix("2015-12-31", {allDay: true})},
        {"wage": 12.0, "time_range": moment("2016-01-01").twix("2016-12-31", {allDay: true})},
        {"wage": 13.0, "time_range": moment("2017-01-01").twix("2017-12-31", {allDay: true})},
        {"wage": 14.0, "time_range": moment("2018-01-01").twix("2018-12-31", {allDay: true})},
        {"wage": 15.0, "time_range": moment("2019-01-01").twix("2019-12-31", {allDay: true})}
      ],
      "D": [
        {"wage": 9.47, "time_range": moment("2014-01-01").twix("2015-03-27", {allDay: true})},
        {"wage": 10.0, "time_range": moment("2015-03-28").twix("2015-12-31", {allDay: true})},
        {"wage": 10.5, "time_range": moment("2016-01-01").twix("2016-12-31", {allDay: true})},
        {"wage": 11.0, "time_range": moment("2017-01-01").twix("2017-12-31", {allDay: true})},
        {"wage": 11.5, "time_range": moment("2018-01-01").twix("2018-12-31", {allDay: true})},
        {"wage": 12.0, "time_range": moment("2019-01-01").twix("2019-12-31", {allDay: true})},
        {"wage": 13.5, "time_range": moment("2020-01-01").twix("2020-12-31", {allDay: true})},
        {"wage": 15.0, "time_range": moment("2021-01-01").twix("2021-12-31", {allDay: true})}
      ],
      "Washington State": [
        {"wage":9.47,"time_range": moment("2015-01-01").twix("2115-12-31", {allDay: true})} 
      ]
    };
}
