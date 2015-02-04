
Template.questionDetail.helpers({
  text: function () {
    return this.text;
  },
  votes: function(){
    return this.votes;
  }
});

Template.questionWithVoting.helpers({
  pinnedComments: function(){
    return Comments.find({questionId: this._id, isPinned: true});
  }
});


Template.questionForm.events({
  "submit .new-question": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;
    Meteor.call('addQuestion', text, this._id);

    // Clear form
    event.target.text.value = "";

    Router.go('topicQuestions', {_id: this._id});

    // Prevent default form submit
    return false;
  }
}); 

Template.questionList.helpers({
  questions: function () {
    return Questions.find({});
  }
});