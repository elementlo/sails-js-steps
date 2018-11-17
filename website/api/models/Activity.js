/**
 * Activity.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      unique: true,
      required: true
    },
    time: {
      type: "number"
    },
    img_url: {
      type: "string"
    },
    short_description: {
      type: "string"
    },
    full_description: {
      type: "string"
    },
    event_date: {
      type: "ref",
      columnType: 'datetime'
    },
    organizer: {
      type: "string"
    },
    venue: {
      type: "string"
    },
    quota: {
      type: "number"
    },
    high_light: {
      type: "string"
    },
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    registered:{
      collection:'User',
      via:'register',
    }
  },
  getInvalidIdMsg: function (opts) {
    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Activity id not specified or with incorrect type.";

    return null; // falsy
  },
};
