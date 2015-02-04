
Template.loginButton.events({
  'click button': function () {
    Meteor.loginWithCas(function(){
      console.log('Woot Meteor.user()=', Meteor.user());
    });
  }
});