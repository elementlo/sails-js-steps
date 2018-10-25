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
};
