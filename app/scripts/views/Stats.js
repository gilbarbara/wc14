WC.Views = WC.Views || {};

(function () {
	'use strict';

	WC.Views.Stats = Backbone.View.extend({

		template: JST['app/scripts/templates/Stats.ejs'],

		events: { },

		initialize: function () {
			this.render();
		},

		render: function () {
			this.setElement(this.template());
			WC.$el.html(this.$el);

			return this;
		},

		remove: function () {
			this.undelegateEvents();

			this.$el.removeData().unbind();

			Backbone.View.prototype.remove.call(this);
		}
	});
})();
