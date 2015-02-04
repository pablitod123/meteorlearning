Meteor.startup(function () {

});

// Prevent users from modifying their profile data,
// which is possible by default.
Meteor.users.deny({update: function () { return true; }});


