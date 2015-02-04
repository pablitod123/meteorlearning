Votes = new Mongo.Collection("votes");

Meteor.methods({

  /* Votes on a question for a user. Records that 
   the user voted and doesn't let them vote more
   than one time
  */
  voteOnQuestion: function (questionId, negate) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var question = Questions.findOne({_id: questionId});
    if (! question) {
      throw new Meteor.Error("not-found");
    }

    var increment = 1,
        oldIncrement = 0;
    if (negate === true) {
      increment = -1;
    };

    var vote = Votes.findOne({userId: Meteor.userId(), questionId: questionId});
    if (vote) {
      oldIncrement = vote.increment;
    }
    console.log('vote =', vote);

    Votes.update({
        userId: Meteor.userId(),
        questionId: questionId
      },{
        userId: Meteor.userId(),
        questionId: questionId,
        topicId: question.topicId,
        increment: increment
      }, {upsert: true}
    );

    Questions.update(
      {_id: questionId},
      {$inc: {votes: increment - oldIncrement}}
    );
  }

});