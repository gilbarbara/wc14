'use strict';

window.WC = {
	Models: { },
	Collections: { },
	Views: { },
	Routers: { },

	models: { },
	collections: { },
	views: { },
	data: {
		teams: [],
		matches: []
	},

	ready: $.Deferred(),
	config: {
		apiUrl: 'http://worldcup.kimonolabs.com/api',
		apiKey: '9144470129c2788e93b377ffa8faa3ad'
	},

	init: function () {
		var that = this;

		this.$el = $('#content');

		this.buildData();

		this.ready
			.done(function () {
				that.$el.html('');
				that.router = new that.Routers.Router();
				Backbone.history.start({ pushState: Modernizr.history });

				that.Header = new WC.Views.Header();
			});

	},

	buildData: function () {
		var that = this,
			teams = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=teams'),
			matches = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=matches'),
			players = $.getJSON('http://wc14.kollectiv.org/api/?endpoint=players');

		$.when(teams, matches, players)
			.done(function (teamsResponse, matchesResponse, playersResponse) {
				that.data.teams = teamsResponse[0];
				that.data.matches = matchesResponse[0];
				that.data.players = playersResponse[0];

				that.ready.resolve();
			})
			.fail(function () {
			});
	},

	getTeam: function (id) {
		var teams = _.filter(WC.data.teams, function (d) {
			return d.id === id;
		});
		return teams[0];
	},

	getMatch: function (id) {
		var matches = _.filter(WC.data.matches, function (d) {
			return d.id === id;
		});
		return matches[0];
	},

	getPlayer: function (id) {
		var players = _.filter(WC.data.players, function (d) {
			return d.id === id;
		});
		return players[0];
	}
};
