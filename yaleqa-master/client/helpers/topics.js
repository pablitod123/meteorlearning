

Template.topicForm.events({
  "submit .new-topic": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;
    Meteor.call('addTopic', text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
}); 

Template.topicList.helpers({
  topics: function () {
    var query = {state: 'open'};
    if (Session.get('showAllTopics')) {
      query = {};
    };
    return Topics.find(query, {sort: {createdAt: -1}});
  },
  showAllTopics: function(){
    Session.get('showAllTopics');
  }
});

Template.topicList.events({
  "change .show-all-topics input": function (event) {
    Session.set("showAllTopics", event.target.checked);
  }
});

Template.topicDetail.helpers({
  title: function () {
    return this.title;
  },
  id: function(){
    return this._id;
  },
  isOpen: function(){
    return this.state === 'open';
  },
  isUnopened: function(){
    return this.state === 'unopened';
  },
  isClosed: function(){
    return this.state === 'closed';
  },
  wasOpened: function(){
    return (this.state === 'closed' || this.state === 'open');
  }
});

Template.topicQuestions.helpers({
  questions: function () {
    var query = {};
    if (!Session.get('showResolved')) {
      query.isResolved = {$ne: true};
    };
    return Questions.find(query, {sort: [['votes', 'desc'], ['createdAt', 'asc']]});
  },
  showResolved: function(){
    return Session.get('showResolved');
  }
});

Template.topicQuestions.events({
  "change .hide-resolved input": function (event) {
    Session.set("showResolved", event.target.checked);
  }
});

Template.questionWithVoting.helpers({
  upvoted: function () {
    var vote = Votes.findOne({userId: Meteor.userId(), questionId: this._id});
    if(vote && vote.increment > 0){
      return true;
    }
    return false;
  },
  downvoted: function () {
    var vote = Votes.findOne({userId: Meteor.userId(), questionId: this._id});
    if(vote && vote.increment < 0){
      return true;
    }
    return false;
  }
});

Template.questionWithVoting.events({
  'click .upvote': function(event){
    Meteor.call('voteOnQuestion', this._id);
  },
  'click .downvote': function(event){
    Meteor.call('voteOnQuestion', this._id, true);
  },
  'click .delete': function(event){
    Meteor.call('deleteQuestion', this._id);
  },
  'click .resolve': function(event){
    Meteor.call('resolveQuestion', this._id);
  }
});

Template.topicStateForm.helpers({
  stateIs: function(possibleState){
    return this.state === possibleState;
  }
});

Template.topicStateForm.events({
  'change .topic-state input': function(event){
    Meteor.call('setState', this._id, event.target.value);
  }
});
