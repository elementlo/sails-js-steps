/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
      return "Primary key specfied is invalid (incorrect type).";
    }

    if (opts.fk && isNaN(parseInt(opts.fk))) {
      return "Foreign key specfied is invalid (incorrect type).";
    }

    return null; // falsy

  }

  if (await Activity.count() > 0) {
    return done();
  }

  await Activity.createEach([{
      name: "reading activity",
      time: "19",
      img_url: "http://big5.minghui.org/mh/article_images/2014-9-9-minghui-newyork-1--ss.jpg",
      short_description: "These activities have been developed for teachers to use as a guide",
      full_description: "These activities have been developed for teachers to use as a guide. Our intent is to give teachers a framework to follow for use in a Holocaust unit of study. The philosophy behind these activities is based on constructivist pedagogy, brain-based learning and the awareness of the theory of multiple intelligences. We hope teachers will use them and build on them to fit the needs of students, taking into account their age, maturity, and ability levels.",
      event_date: "2018-9-30",
      organizer: "student",
      venue: "LT1",
      quota: "30",
      high_light: "high_light",
    },
    {
      name: "learning activity",
      time: "19",
      img_url: "http://big5.minghui.org/mh/article_images/2014-9-9-minghui-newyork-1--ss.jpg",
      short_description: "These activities have been developed for teachers to use as a guide",
      full_description: "These activities have been developed for teachers to use as a guide. Our intent is to give teachers a framework to follow for use in a Holocaust unit of study. The philosophy behind these activities is based on constructivist pedagogy, brain-based learning and the awareness of the theory of multiple intelligences. We hope teachers will use them and build on them to fit the needs of students, taking into account their age, maturity, and ability levels.",
      event_date: "2018-9-30",
      organizer: "student",
      venue: "LT1",
      quota: "30",
      high_light: "high_light",
    },
    {
      name: "playing activity",
      time: "19",
      img_url: "http://big5.minghui.org/mh/article_images/2014-9-9-minghui-newyork-1--ss.jpg",
      short_description: "These activities have been developed for teachers to use as a guide",
      full_description: "These activities have been developed for teachers to use as a guide. Our intent is to give teachers a framework to follow for use in a Holocaust unit of study. The philosophy behind these activities is based on constructivist pedagogy, brain-based learning and the awareness of the theory of multiple intelligences. We hope teachers will use them and build on them to fit the needs of students, taking into account their age, maturity, and ability levels.",
      event_date: "2018-9-30",
      organizer: "student",
      venue: "LT1",
      quota: "30",
      high_light: "high_light",
    },
    {
      name: "hiking activity",
      time: "19",
      img_url: "http://big5.minghui.org/mh/article_images/2014-9-9-minghui-newyork-1--ss.jpg",
      short_description: "These activities have been developed for teachers to use as a guide",
      full_description: "These activities have been developed for teachers to use as a guide. Our intent is to give teachers a framework to follow for use in a Holocaust unit of study. The philosophy behind these activities is based on constructivist pedagogy, brain-based learning and the awareness of the theory of multiple intelligences. We hope teachers will use them and build on them to fit the needs of students, taking into account their age, maturity, and ability levels.",
      event_date: "2018-9-30",
      organizer: "student",
      venue: "LT1",
      quota: "30",
      high_light: "high_light",
    },
    // etc.
  ]);

  await User.createEach([{
      "username": "admin",
      "password": "1234"
    },
    {
      "username": "student",
      "password": "1234"
    }
    // etc.
  ]);

  const student = await User.findOne({
    username: "student"
  });
  const activity1 = await Activity.findOne({
    name: "reading activity"
  });
  const activity2 = await Activity.findOne({
    name: "hiking activity"
  });

  await User.addToCollection(student.id, 'register').members([activity1.id, activity2.id]);

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
