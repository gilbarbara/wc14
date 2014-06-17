/*global WC, Backbone, JST*/

WC.Views = WC.Views || {};

(function () {
    'use strict';

    WC.Views.Goal = Backbone.View.extend({

        template: JST['app/scripts/templates/Goal.ejs'],

        tagName: 'div',

        id: '',

        className: 'col-xs-6 col-md-4 col-lg-3',

        events: {},

        initialize: function () {
            this.model.on('change', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

			return this;
        }

    });

})();
