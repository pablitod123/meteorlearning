Topics = new Mongo.Collection("topics");

Meteor.methods({
  addTopic: function (text) {
    // Make sure the user is logged in before inserting a Topic
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Topics.insert({
      title: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      state: 'unopened', // can be 'unopened', 'open', or 'closed'
    });
  },
  setState: function(topicId, newState){
    if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
      throw new Meteor.Error("not-authorized");
    };
    Topics.update({_id: topicId}, {$set: {state: newState}});
  }
});