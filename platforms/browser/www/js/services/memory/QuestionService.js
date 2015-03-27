var QuestionService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        var successCallback = function(questions) {
          console.log("Resolving");
          this.questions = questions;
          deferred.resolve();
        }

        $.getJSON("http://minimum-wage-service.herokuapp.com/api/v1/survey/question", successCallback.bind(this));
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var question = null;
        var l = this.questions.length;
        for (var i=0; i < l; i++) {
            if (this.questions[i].id == id) {
                question = questions[i];
                break;
            }
        }
        deferred.resolve(question);
        return deferred.promise();
    }

    var questions = [
        {"id": "work-seattle", "summary":"Employed in Seattle", "prompt":"Is your place of employment located in Seattle?", choices:[
          {"next": "#question/number-employees", "value": "yes", "text": "Yes"},
          {"next": "#results", "value": "no", "text": "No"},
          {"next": "#note/part-time-seattle", "value": "yes", "text": "Sometimes"},
          {"next": "#question/methods-for-determining-in-seattle", "value": "", "text": "I Don't Know"}
        ]},
        {"id": "methods-for-determining-in-seattle", "summary":"Employed in Seattle?", "prompt":"Choose one of these methods to determine if you are employed in Seattle:", choices:[
          {"next": "#in-seattle-determination/nearby", "text": "Choose from Nearest 20 Businesses"},
          {"next": "#in-seattle-determination/address", "text": "Enter The Address Where You Work"},
          {"next": "#in-seattle-determination/business-name", "text": "Enter Business Name"},
          {"next": "#in-seattle-determination/top-50", "text": "Choose From Top 50 Employers In The State"},
          {"next": "#in-seattle-determination/map", "text": "Indicate Where You Work On A Map"},
        ]},
        {"id": "number-employees", "summary":"Number of Employees", "prompt":"Does your employer have more than 500 employees in total, across the country?", choices:[
          {"next": "#question/medical-benefits", "value": ">500", "text": "Yes"},
          {"next": "#question/health-insurance", "value": "1-500", "text": "No"},
          {"next": "#question/big-national-chain", "value": "", "text": "I Don't Know"}
        ]},
        {"id": "big-national-chain", "summary":"Large Corporation or Franchise", "prompt":"Is your employer a large corporation or franchise, or a national chain?", choices:[
          {"next": "#note/big-national-chain-assumption", "value": "yes", "text": "Yes"},
          {"next": "#question/methods-for-determining-employee-count", "value": "no", "text": "No"},
          {"next": "#question/methods-for-determining-employee-count", "value": "", "text": "I Don't Know"}
        ]},
        {"id": "methods-for-determining-employee-count", "summary":"Number of Employees?", "prompt":"Choose one of these methods to try looking up the number of employees:", choices:[
          {"next": "#employee-count-determination/name", "value": "yes", "text": "By Name"},
          {"next": "#employee-count-determination/address", "value": "no", "text": "By Address"},
        ]},
        {"id": "medical-benefits", "summary":"Medical Benefits", "prompt":"Does your employer provide medical benefits to you?", choices:[
          {"next": "#results", "value": "yes", "text": "Yes"},
          {"next": "#results", "value": "no", "text": "No"}
        ]},
        {"id": "health-insurance", "summary":"Health Insurance", "prompt":"Does your employer pay for any of your health insurance?", choices:[
          {"next": "#question/tips", "value": "yes", "text": "Yes"},
          {"next": "#question/tips", "value": "no", "text": "No"}
        ]},
        {"id": "tips", "summary":"Tips", "prompt":"Do you receive tips?", choices:[
          {"next": "#note/minimum-compensation", "value": "yes", "text": "Yes"},
          {"next": "#note/minimum-compensation", "value": "no", "text": "No"}
        ]},
    ];

}
