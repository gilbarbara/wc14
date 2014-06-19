WC.Routers = WC.Routers || { };

(function () {
	'use strict';

	WC.Routers.Router = Backbone.Router.extend({
		routes: {
			'': 'teams',
			teams: 'teams',
			matches: 'matches',
			players: 'players'
		},

		teams: function () {
			WC.collections.teams = new WC.Collections.Teams(WC.data.teams);
			WC.views.teams = new WC.Views.Teams({ collection: WC.collections.teams });
		},

		matches: function () {
			WC.collections.matches = new WC.Collections.Matches(WC.data.matches);
			WC.views.matches = new WC.Views.Matches({ collection: WC.collections.matches });
		},

		players: function () {
			WC.collections.players = new WC.Collections.Players(WC.data.players);
			WC.views.players = new WC.Views.Players({ collection: WC.collections.players });
		}
	});
})();
