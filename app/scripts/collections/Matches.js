WC.Collections = WC.Collections || {};

(function () {
	'use strict';

	WC.Collections.Matches = Backbone.Collection.extend({

		model: WC.Models.Match,

		url: 'http://worldcup.kimonolabs.com/api/matches?apikey=9144470129c2788e93b377ffa8faa3ad',

		initialize: function () {}
	});
})();
