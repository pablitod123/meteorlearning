Meteor.qalib = {
  ensureLoggedIn: function (roles) {
    // Make sure the user is logged in before inserting a question
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (roles !== null && typeof(roles) !== 'undefined') {
      if (!Roles.userIsInRole(Meteor.user(), roles)) {
        throw new Meteor.Error("not-authorized");
      };
    }  
  },

  getTopicById: function (topicId) {
    var topic = Topics.findOne({_id: topicId});
    if (!topic) {
      throw new Meteor.Error(400, "No such topic");
    };
    return topic;
  },

  getCommentById: function (commentId) {
    var comment = Comments.findOne({_id: commentId});
    if (!comment) {
      throw new Meteor.Error(400, "No such comment");
    };
    return comment;
  },

  getQuestionById: function(questionId){
    var question = Questions.findOne({_id: questionId});

    // Check permissions
    if (! Meteor.userId()) {
      throw new Meteor.Error("Not Authorized");
    }
    if (!question) {
      throw new Meteor.Error(404, "No such question");
    };
    return question;
  }

};
