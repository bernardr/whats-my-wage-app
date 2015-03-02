// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    QuestionView.prototype.template = Handlebars.compile($("#question-tpl").html());
    ResultView.prototype.template = Handlebars.compile($("#result-tpl").html());
    DefinitionsView.prototype.template = Handlebars.compile($('#definitions-tpl').html());
    NoteView.prototype.template = Handlebars.compile($('#note-tpl').html());

    var slider = new PageSlider($('body'));

    var questionService = new QuestionService();
    var answerService = new AnswerService();
    var wageService = new WageService();
    var definitionService = new DefinitionService();
    var noteService = new NoteService();

    $.when([questionService.initialize(), answerService.initialize(), wageService.initialize(), definitionService.initialize(), noteService.initialize()]).done(function() {
      router.addRoute('', function() {
          slider.slidePage(new HomeView(answerService).render().$el);
      });

      router.addRoute('results', function() {
        answerService.getAnswers().done(function(answers) {
          wageService.findByAnswers(answers).done(function(wageIntervals) {
            slider.slidePage(new ResultView(wageIntervals).render().$el);
            $('.results-table').readmore({
                collapsedHeight: 130,
                moreLink: "<button class=\"btn btn-block btn-primary btn-contrast\">See more future wages...</button>",
                lessLink: "<button class=\"btn btn-block btn-primary btn-contrast\">Hide</button>"
            });
          });
        });
      });

      router.addRoute('question/:id', function(id) {
          questionService.findById(id).done(function(question) {
            slider.slidePage(new QuestionView(question, answerService, definitionService).render().$el);
          });
      });

      router.addRoute('note/:id', function(id) {
          noteService.findById(id).done(function(note) {
            slider.slidePage(new NoteView(note).render().$el);
          });
      });

      router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */

    if ('addEventListener' in document) {
      document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
      }, false);
    }

    FastClick.attach(document.body);
}());
