function addAdmins(adminString){
  if (typeof(adminString) !== 'string') {
    return;
  };
  var adminsYaleIds = adminString.split(',');
  users = Meteor.users.find({'profile.name': {$in: adminsYaleIds}}).fetch();
  Roles.addUsersToRoles(users, ['admin']);
  console.log('Wanted to ensure admin role for', adminsYaleIds);
  console.log('Ensured admin role for ', _.pluck(_.pluck(users, 'profile'), 'name'));
}

Meteor.startup(function(){
  console.log('STARTING UP');
  var users = Meteor.users.find()
  addAdmins(process.env.ADMINS);
  addAdmins(Meteor.settings.ADMINS);
})