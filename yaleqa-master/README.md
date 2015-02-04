# YaleQA

This is a real-time mobile-first question
and answer web application written using
[Meteor](https://www.meteor.com/).

## Running this code

Check out the repo and run `meteor`
  
    https://git.yale.edu/klj39/yaleqa
    cd yaleqa
    meteor --settings=settings.json

That will install all the dependencies, build the application,
and run it.

## User stories

* As any user, I can log-in using Yale's CAS.
* As an admin, I can create a new topic. That topic has
  - a unique string key
  - a boolean `isOpen` flag
* As an admin, I can edit an topic
  - I can delete it
  - I can change its `isOpen` flag
* As an admin, I can edit the `isResolved` flag of a question.
* As a user, I can see a list of topics after logging in
* As a user, I can click on an topic to see a list of questions that have been asked
  - These questions are sorted in decending order: the ones 
    with the most votes are on top.
* As a user, I can upvote and downvote questions
  - I may only vote once per question
* As a user, I can ask a new question in an topic.

## Adding admins

The application reads a `.env` file for environment variables.
You can make sure that certain users are admins if you specify
them using a environment file like

    ADMINS=klj39,mhl22

Given that environment variable, the meteor app will look for users
with those netids and add the "admin" role to their accounts. If they
can not be found, the role will not be added.

Only admins can create new topics. So, if you're working on this
application, you likely want to make your account an admin.

Accounts are created automatically when somebody logs in using
Yale CAS. So, if you're developing the app, you'll need to

* Run the app
* Log in
* Ensure your netid is in the `ADMINS` environment variable, likely
  in a `.env` file, which is automatically sourced.
* Restart the app

## Using the app

To add topics, as an admin, go to `/admin`. 

To view topics, go to `/`.

To view questions for a topic, go to `/topics/:id/`, where 
`id` is the topic id.

That's about it.

## Dependencies

There are some dependencies above Meteor about which you 
will want to read if you're altering this code. They are

* [Iron Router](http://eventedmind.github.io/iron-router/).
  We use this for client and server side routing and having
  subscriptions that are specific to different views.
* [Publish Composite](https://github.com/englue/meteor-publish-composite).
  We use this for publishing "reactive joins": collections of data,
  like a topic and all of its questions, together in one
  publication available to the view. See `routes.js` and
  `server/publications.js`.
* [Bootstrap](http://getbootstrap.com) was added using the
  [method described here](https://github.com/Nemo64/meteor-bootstrap).

All of the dependencies are listed in `.meteor/packages`.

## License (the un-license)

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>