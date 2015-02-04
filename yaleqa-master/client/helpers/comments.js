
Template.questionWithComments.events({
  "submit .new-comment": function (event) {
    
    var text = event.target.text.value;
    Meteor.call('addComment', text, this.topic._id, this.question._id);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  'click a.pin': function(event){
    Meteor.call('pinComment', this._id, !this.isPinned);
  }
}); 