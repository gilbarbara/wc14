'use strict';

window.WC = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},

	models: {},
	collections: {},
	views: {},

	init: function () {

		this.Header = new WC.Views.Header();
		this.$el = $('#content');

		this.router = new this.Routers.Router();
		Backbone.history.start({ pushState: Modernizr.history });
		//this.bubble();
	}
};
