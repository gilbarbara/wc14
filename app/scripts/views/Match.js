WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Match = Backbone.View.extend({

		template: JST['app/scripts/templates/Match.ejs'],

		tagName: 'div',

		className: 'col-xs-12 col-sm-6 col-md-4 col-lg-4',

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
