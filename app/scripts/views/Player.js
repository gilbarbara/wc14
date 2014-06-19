WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Player = Backbone.View.extend({

		template: JST['app/scripts/templates/Player.ejs'],

		tagName: 'div',

		className: 'col-xs-12 col-md-4 col-lg-3',

		events: { },

		initialize: function () {
			this.model.on('change', this.render, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}

	});

})();