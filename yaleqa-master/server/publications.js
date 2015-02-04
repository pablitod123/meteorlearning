Meteor.publish("questions", function () {
  return Questions.find();
});

Meteor.publish("topics", function () {
  return Topics.find();
});

// Note here that a function is being passed as the 
// `options` argument to `publishComposite`. See the
// documentation at https://github.com/englue/meteor-publish-composite
//
Meteor.publish('topicWithQuestions', function(topicId) {
  return [
    Topics.find({_id: topicId}),
    Questions.find({topicId: topicId}),
    Comments.find({topicId: topicId, isPinned: true})
  ];
});

Meteor.publish("commentsForQuestion", function (topicId, questionId) {
  return [
    Topics.find({_id: topicId}),
    Questions.find({_id: questionId}),
    Comments.find({questionId: questionId})
  ];
});