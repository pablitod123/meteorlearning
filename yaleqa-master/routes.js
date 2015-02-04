Router.map(function() {
  var path = '';
  try{
    pathPrefix = Meteor.settings.public.pathPrefix;
  }catch (e){
    pathPrefix = '';
  }

  this.route(pathPrefix, {
    path: pathPrefix,
    template: 'index',
    name: 'index',
    waitOn: function() {
      return this.subscribe("topics");
    },
    data: {
      topics: Topics.find({})
    },
  });

  this.route(pathPrefix + '/topics/:_id', {
    pathPrefix: pathPrefix + '/topics/:_id',
    name: 'topicQuestions',
    waitOn: function () {
      return Meteor.subscribe('topicWithQuestions', this.params._id);
    },
    data: function () {
      return Topics.findOne({_id: this.params._id});
    }
  });

  this.route(pathPrefix + '/topics/:topicId/questions/:questionId', {
    pathPrefix: pathPrefix + '/topics/:topicId/questions/:questionId',
    name: 'questionWithComments',
    waitOn: function () {
        return this.subscribe("commentsForQuestion", this.params.topicId, this.params.questionId);
    },
    data: function () {
      console.log('question =');
      console.log(Questions.findOne({_id: this.params.questionId}));
      return {
        topic: Topics.findOne({_id: this.params.topicId}),
        question: Questions.findOne({_id: this.params.questionId}),
        comments: Comments.find({questionId: this.params.questionId})
      }
    }
  });

  this.route(pathPrefix + '/topics/:_id/new-question', {
    name: 'newQuestion',
    waitOn: function () {
      return Meteor.subscribe('topicWithQuestions', this.params._id);
    },
    data: function () {
      return Topics.findOne({_id: this.params._id});
    }
  });

  this.route(pathPrefix + '/admin', {
    loginRequired: true,
    template: 'admin',
    isLoggedIn: function(){
      console.log(Meteor.user());
      var isLoggedIn = Meteor.user() !== null;
      console.log('isLoggedIn =', isLoggedIn);
      return isLoggedIn;
    },
    waitOn: function() {
      return this.subscribe("topics");
    },
    data: {
      topics: Topics.find({})
    },
    onAfterAction: function() {
      SEO.set({
        title: 'admin | ' + SEO.settings.title
      });
    }
  });

  this.route(pathPrefix + 'profile', {
    data: function() {
      return Meteor.user();
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      console.log(this.request);
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
