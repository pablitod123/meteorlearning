var questionPrototype = {
  userCanDelete: function(){
    if (Roles.userIsInRole(Meteor.user(), 'admin')) {
      return true;
    };
    if (this.userId === Meteor.userId()) {
      return true;
    };
    return false;
  }
};

// Define a new collection and use the prototype
// we created above to add methods that we need.
// See e.g. http://www.okgrow.com/posts/2014/05/19/meteor-transform/
//
Questions = new Mongo.Collection(
  "questions",
  {
    transform: function(doc){
      // create a new empty object with questionPrototype as it's prototype
      var newInstance = Object.create(questionPrototype);

      // copy the data from doc to newInstance and return newInstance
      return  _.extend(newInstance, doc);
    }
  }
);




Meteor.methods({
  addQuestion: function (text, topicId) {
    Meteor.qalib.ensureLoggedIn()
    var topic = Meteor.qalib.getTopicById(topicId);

    Questions.insert({
      text: text,
      topicId: topicId,
      votes: 0,
      isResolved: false,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteQuestion: function(questionId){
    Meteor.qalib.ensureLoggedIn();
    var question = Meteor.qalib.getQuestionById(questionId);

    if (!question.userCanDelete()) {
      throw new Meteor.Error(403, "Not authorized to delete questions");
    };
    Questions.remove(questionId);
    console.log('Removed question', questionId);
  },
  resolveQuestion: function(questionId){
    Meteor.qalib.ensureLoggedIn();
    var question = Meteor.qalib.getQuestionById(questionId);
    if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
      throw new Meteor.Error(403, "Not authorized to resolve questions");
    };
    Questions.update({_id: questionId}, {$set: {isResolved: !question.isResolved}});
    console.log('Set question resolution to ', !question.isResolved);
  },
});

