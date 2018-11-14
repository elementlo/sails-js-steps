/**
 * Activity.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string"
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
      type: "string",
      columnType: 'date'
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
