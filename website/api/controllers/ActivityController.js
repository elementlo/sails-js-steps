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

};

