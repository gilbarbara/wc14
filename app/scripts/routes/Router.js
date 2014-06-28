WC.Routers = WC.Routers || { };

(function () {
	'use strict';

	WC.Routers.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			group: 'group',
			'second-stage': 'secondStage',
			players: 'players',
			stats: 'stats'
		},

		index: function () {
			WC.router.navigate('#stats', { trigger: true });
		},

		group: function () {
			WC.cleanUp('group');
			this.listenToOnce(Backbone, 'cleaned', function () {
				WC.collections.teams = new WC.Collections.Teams(WC.data.teams);
				WC.views.teams = new WC.Views.Teams({ collection: WC.collections.teams });
			});
		},

		secondStage: function () {
			WC.cleanUp('matches');
			this.listenToOnce(Backbone, 'cleaned', function () {
				WC.collections.matches = new WC.Collections.Matches(WC.getSecRoundMatches());
				WC.views.matches = new WC.Views.Matches({ collection: WC.collections.matches });
			});
		},

		players: function () {
			WC.cleanUp('players');
			this.listenToOnce(Backbone, 'cleaned', function () {
				WC.collections.players = new WC.Collections.Players(WC.data.players);
				WC.views.players = new WC.Views.Players({ collection: WC.collections.players });
			});
		},

		stats: function () {
			WC.cleanUp('stats');
			this.listenToOnce(Backbone, 'cleaned', function () {
				WC.views.stats = new WC.Views.Stats();
			});
		}
	});
})();
