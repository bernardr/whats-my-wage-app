var QuestionService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var question = null;
        var l = questions.length;
        for (var i=0; i < l; i++) {
            if (questions[i].id == id) {
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
        {"id": "methods-for-determining-in-seattle", "summary":"Employed in Seattle?", "prompt":"Choose one of these methods to determine if you are employed in Seattle?", choices:[
          {"next": "#employer-determination/nearby", "text": "Choose from Nearest 20 Businesses"},
          {"next": "#employer-determination/address", "text": "Enter The Address Where You Work"},
          {"next": "#employer-determination/business-name", "text": "Enter Business Name"},
          {"next": "#employer-determination/top-50", "text": "Choose From Top 50 Employers In The State"},
          {"next": "#employer-determination/map", "text": "Indicate Where You Work On A Map"},
        ]},
        {"id": "number-employees", "summary":"Number of Employees", "prompt":"How many people work at your employer across the USA?", choices:[
          {"next": "#question/health-insurance", "value": "1-500", "text": "1 - 500"},
          {"next": "#question/medical-benefits", "value": ">500", "text": "Over 500"}
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
