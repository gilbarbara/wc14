/*global WC, Backbone*/

WC.Models = WC.Models || {};

(function () {
    'use strict';

    WC.Models.Goal = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
