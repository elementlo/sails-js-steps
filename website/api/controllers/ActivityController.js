/**
 * ActivityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    if (req.method == "GET")
      return res.view('activity/create');

    if (typeof req.body.Activity === "undefined")
      return res.badRequest("Form-data not received.");

    await Activity.create(req.body.Activity);

    return res.ok("Successfully created!");
  },

  index: async function (req, res) {

    var models = await Activity.find({
      high_light: 'high_light'
    });
    return res.view('activity/index', {
      activities: models
    });

  },

  detail: async function (req, res) {

    var message = Activity.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Activity.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('activity/detail', {
      activity: model
    });

  },
  admin: async function (req, res) {
    var models = await Activity.find();
    return res.view('activity/admin', {
      activities: models
    });

  },

  // action - update
  update: async function (req, res) {

    var message = Activity.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    if (req.method == "GET") {

      var model = await Activity.findOne(req.params.id);

      if (!model) return res.notFound();

      return res.view('activity/update', {
        activity: model
      });

    } else {

      if (typeof req.body.Activity === "undefined")
        return res.badRequest("Form-data not received.");

      var models = await Activity.update(req.params.id).set({
        name: req.body.Activity.name,
        short_description: req.body.Activity.short_description,
        full_description: req.body.Activity.full_description,
        event_date: req.body.Activity.event_date,
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
};
