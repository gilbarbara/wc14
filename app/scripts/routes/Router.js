WC.Routers = WC.Routers || { };

(function () {
	'use strict';

	WC.Routers.Router = Backbone.Router.extend({
		routes: {
			'': 'index'
		},

		index: function () {
			WC.collections.goals = new WC.Collections.Goals();
			WC.views.goals = new WC.Views.Goals({ collection: WC.collections.goals });
			WC.collections.goals.fetch({ reset: true });
		}
	});
})();
