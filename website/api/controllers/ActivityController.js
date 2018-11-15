/**
 * ActivityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    var loginReturn=req.session;
    if (req.method == "GET")
      return res.view('activity/create', {
        loginReturn: loginReturn,
      });

    if (typeof req.body.Activity === "undefined")
      return res.badRequest("Form-data not received.");

    var activity=req.body.Activity;
    var date= new Date(req.body.Activity.event_date);
    activity.event_date=date;
    await Activity.create(activity);

    return res.ok("Successfully created!");
  },

  index: async function (req, res) {
    var loginReturn=req.session;

    var models = await Activity.find({
      high_light: 'high_light'
    });
    sails.log("Session: " + JSON.stringify(req.session));
    return res.view('activity/index', {
      activities: models,
      loginReturn: loginReturn,
    });

  },

  detail: async function (req, res) {
    var loginReturn=req.session;
    var message = Activity.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Activity.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('activity/detail', {
      activity: model,
      loginReturn: loginReturn,
    });

  },
  admin: async function (req, res) {
    var loginReturn=req.session;
    var models = await Activity.find();
    return res.view('activity/admin', {
      activities: models,
      loginReturn: loginReturn,
    });

  },

  // action - update
  update: async function (req, res) {
    var loginReturn=req.session;

    var message = Activity.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    if (req.method == "GET") {

      var model = await Activity.findOne(req.params.id);

      if (!model) return res.notFound();

      return res.view('activity/update', {
        activity: model,
        loginReturn: loginReturn,
      });

    } else {

      if (typeof req.body.Activity === "undefined")
        return res.badRequest("Form-data not received.");

      var models = await Activity.update(req.params.id).set({
        name: req.body.Activity.name,
        short_description: req.body.Activity.short_description,
        full_description: req.body.Activity.full_description,
        event_date: new Date(req.body.Activity.event_date),


        organizer: req.body.Activity.organizer,
        venue: req.body.Activity.venue,
        quota: req.body.Activity.quota,
        high_light: req.body.Activity.high_light,
      }).fetch();

      if (models.length == 0) return res.notFound();

      return res.ok("Record updated");

    }
  },

  delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var message = Activity.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var models = await Activity.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    return res.ok("Activity Deleted.");

  },

  search: async function (req, res) {
    var loginReturn=req.session;
    const qName = req.query.name || '';
    var qOrganizer = req.query.organizer;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    var qVenue = req.query.venue;
    const qPage = Math.max(req.query.page - 1, 0) || 0;
    const numOfItemsPerPage = 2;

    console.log(qName, qOrganizer, startTime, endTime, qVenue)
    if (qOrganizer == 'nan') {
      qOrganizer = ''
    }
    if (qVenue == 'nan') {
      qVenue = ''
    }
    if (startTime == '') {
      startTime = '1900-01-01'
    }
    if (endTime == '') {
      endTime = '3000-01-01'
    }
    console.log(startTime)
    console.log(endTime)
    var modelsSize = await Activity.find({
      where: {
        name: {
          contains: qName
        },
        organizer: {
          contains: qOrganizer
        },
        event_date: {
          '>': new Date(startTime),
          '<': new Date(endTime)
        },
        venue: {
          contains: qVenue
        }
      },
      sort: 'name',
    });
    var models = await Activity.find({
      where: {
        name: {
          contains: qName
        },
        organizer: {
          contains: qOrganizer
        },
        event_date: {
          '>': new Date(startTime),
          '<': new Date(endTime)
        },
        venue: {
          contains: qVenue
        }
      },
      sort: 'name',
      limit: numOfItemsPerPage,
      skip: numOfItemsPerPage * qPage
    });
    console.log(modelsSize.length)
    var numOfPage = Math.ceil(await modelsSize.length / numOfItemsPerPage);
    return res.view('activity/search', {
      activities: models,
      count: numOfPage,
      mOrganizer: qOrganizer,
      mName: qName,
      mStartTime: startTime,
      mEndTime: endTime,
      mVenue: qVenue,
      loginReturn: loginReturn,
    });
  },
  paginate: async function (req, res) {
    var loginReturn=req.session;

    const qPage = Math.max(req.query.page - 1, 0) || 0;

    const numOfItemsPerPage = 2;

    var models = await Activity.find({
      limit: numOfItemsPerPage,
      skip: numOfItemsPerPage * qPage
    });

    var numOfPage = Math.ceil(await Activity.count() / numOfItemsPerPage);

    return res.view('activity/paginate', {
      activities: models,
      count: numOfPage,
      loginReturn: loginReturn,
    });
  },
};
