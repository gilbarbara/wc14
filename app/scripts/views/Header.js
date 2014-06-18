/*global WC, Backbone, JST*/

WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Header = Backbone.View.extend({

		template: JST['app/scripts/templates/Header.ejs'],

		el: '#header',

		events: { },

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());

			return this;
		}

	});

})();
