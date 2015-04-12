// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    QuestionView.prototype.template = Handlebars.compile($("#question-tpl").html());
    ResultView.prototype.template = Handlebars.compile($("#result-tpl").html());
    NoteView.prototype.template = Handlebars.compile($('#note-tpl').html());
    WageTheftView.prototype.template = Handlebars.compile($('#wage-theft-tpl').html());
    AtWorkView.prototype.template = Handlebars.compile($('#in-seattle-determination-at-work-tpl').html());
    AddressInSeattleView.prototype.template = Handlebars.compile($('#in-seattle-determination-address-tpl').html());
    ContactUsView.prototype.template = Handlebars.compile($('#contact-us-tpl').html());
    EmployerSizeAddressView.prototype.template = Handlebars.compile($('#employer-size-determination-address-tpl').html());
    EmployerSizeNameView.prototype.template = Handlebars.compile($('#employer-size-determination-name-tpl').html());
    ThanksView.prototype.template = Handlebars.compile($('#thanks-tpl').html());
    PrivacyPolicyView.prototype.template = Handlebars.compile($('#privacy-policy-tpl').html());

    Handlebars.registerPartial("contact-us-bar", $("#contact-us-bar-partial").html());
    Handlebars.registerPartial("header-bar", $("#header-bar-partial").html());
    Handlebars.registerPartial("disclaimer", $("#disclaimer-partial").html());

    var slider = new PageSlider($('body'));

    var questionService = new QuestionService();
    var answerService = new AnswerService();
    var wageService = new WageService();
    var definitionService = new DefinitionService();
    var noteService = new NoteService();
    var wageTheftReportService = new WageTheftReportService();
    var contactUsService = new ContactUsService();
    var employerSizeService = new EmployerSizeService();

    $.when(questionService.initialize(), answerService.initialize(), wageService.initialize(), definitionService.initialize(), noteService.initialize(), wageTheftReportService.initialize(), employerSizeService.initialize(), contactUsService.initialize()).done(function() {
      router.addRoute('', function() {
          slider.slidePage(new HomeView(answerService).render().$el);
      });

      router.addRoute('report-it', function() {
          slider.slidePage(new WageTheftView(wageTheftReportService).render().$el);
      });

      router.addRoute('results', function() {
        answerService.getAnswers().done(function(answers) {
          wageService.findByAnswers(answers).done(function(result) {
            slider.slidePage(new ResultView(result).render().$el);
            $('.result-view').readmore({
                collapsedHeight: $(".current-wage-view").outerHeight(),
                moreLink: "<button class=\"btn btn-block btn-primary btn-contrast\">See future wages...</button>",
                lessLink: "<button class=\"btn btn-block btn-primary btn-contrast\">Hide</button>"
            });
          });
        });
      });

      router.addRoute('question/:id', function(id) {
          questionService.findById(id).done(function(question) {
            console.log("Question: " + question);
            slider.slidePage(new QuestionView(question, answerService, definitionService).render().$el);
          });
      });

      router.addRoute('note/:id', function(id) {
          noteService.findById(id).done(function(note) {
            answerService.getAnswers().done(function(answers) {
              slider.slidePage(new NoteView(note).render().$el);

              $('.ordinance-info').readmore({
                collapsedHeight: $('.ordinance-info .explanation').outerHeight(),
                moreLink: "<button class=\"btn btn-block btn-primary btn-contrast\">Show Ordinance Text</button>",
                lessLink: "<button class=\"btn btn-block btn-primary btn-contrast\">Hide Ordinance Text</button>"
              });
            });
          });
      });

      router.addRoute('in-seattle-determination/:method', function(method) {
        if(method == "at-work"){
          slider.slidePage(new AtWorkView(answerService).render().$el);
        } else {
          slider.slidePage(new AddressInSeattleView(answerService).render().$el);
        }
      });

      router.addRoute('employer-size-determination/:method', function(method) {
        if(method == "address"){
          slider.slidePage(new EmployerSizeAddressView(employerSizeService, answerService).render().$el);
        } else {
          slider.slidePage(new EmployerSizeNameView(employerSizeService, answerService).render().$el);
        }
      });

      router.addRoute('contact-us', function() {
        slider.slidePage(new ContactUsView(contactUsService).render().$el);
      });

      router.addRoute('thanks', function() {
        slider.slidePage(new ThanksView().render().$el);
      });

      router.addRoute('privacy-policy', function() {
        slider.slidePage(new PrivacyPolicyView().render().$el);
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
                    "Forgotten Incidents", // title
                    'OK'        // buttonName
                );
            };
        }
      }, false);
    }

    FastClick.attach(document.body);

    ga('send', 'pageview', location.pathname + location.hash);

    // Add per link tracking
    $(document.body).on('click', 'a', function(evt) {
      var match = jQuery(this).attr('href').match(/#\S+/);
      ga('send', 'pageview', location.pathname + match[0]);
    });
}());
