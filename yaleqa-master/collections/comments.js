Comments = new Mongo.Collection("comments");


Meteor.methods({
  pinComment: function (commentId, newPinnedStatus) {
    Meteor.qalib.ensureLoggedIn(['admin']);
    var comment = Meteor.qalib.getCommentById(commentId);
    Comments.update(commentId, {$set: {isPinned: newPinnedStatus}});
  },
  addComment: function (text, topicId, questionId) {
    Meteor.qalib.ensureLoggedIn()
    var topic = Meteor.qalib.getTopicById(topicId);
    var question = Meteor.qalib.getQuestionById(questionId);

    Comments.insert({
      text: text,
      topicId: topicId,
      questionId: questionId,
      votes: 0,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      isAdmin: Roles.userIsInRole(Meteor.user(), 'admin'),
      isPinned: false
    });
  }
});

