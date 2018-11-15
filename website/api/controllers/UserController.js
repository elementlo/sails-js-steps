/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async function (req, res) {
    var loginReturn = req.session;

    if (req.method == "GET") return res.view('user/login', {
      loginReturn: loginReturn,
    });

    if (!req.body.username) return res.badRequest();
    if (!req.body.password) return res.badRequest();


    var user = await User.findOne({
      username: req.body.username
    });

    if (!user) {
      res.status(401);
      return res.send("User not found");
    }

    if (user.password != req.body.password) {
      res.status(401);
      return res.send("Wrong Password");
    }

    var models = await Activity.find({
      high_light: 'high_light'
    });
    req.session.regenerate(function (err) {

      if (err) return res.serverError(err);

      req.session.username = req.body.username;

      sails.log("Session: " + JSON.stringify(req.session));

      loginReturn = req.session;
      // return res.json(req.session);

      return res.view('activity/index', {
        loginReturn: loginReturn,
        activities: models
      });
    });

  },

  logout: async function (req, res) {
    sails.log(req.session)
    req.session.destroy(function (err) {

      if (err) return res.serverError(err);
      var loginReturn = req.session;
      sails.log("res *******" + req.session)
      return res.view('user/login', {
        loginReturn: ""
      });

    });
  },

  populate: async function (req, res) {

    if (!['register'].includes(req.params.association)) return res.notFound();

    const message = sails.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var loginReturn = req.session;
    var model = await User.find({
      username: req.params.username
    }).populate(req.params.association);

    if (!model) return res.notFound();

    return res.view("user/registrationDetail", {
      registration: model,
      loginReturn: loginReturn,
    });

  },

  add: async function (req, res) {

    if (!['register'].includes(req.params.association)) return res.notFound();

    const message = sails.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var student = await User.find({
      username: req.params.username
    });
    sails.log(student)
    if (student == null) return res.notFound();

    if (req.params.association == "register") {
      if (!await Activity.findOne(req.params.fk)) return res.notFound();
    }

    await User.addToCollection(student[0].id, req.params.association).members(req.params.fk);

    return res.ok('Operation completed.');

  },
};
