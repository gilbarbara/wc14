WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Match = Backbone.View.extend({

		template: JST['app/scripts/templates/Match.ejs'],

		tagName: 'div',

		className: WC.columnSize,

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
