WC.Collections = WC.Collections || {};

(function () {
	'use strict';

	WC.Collections.Teams = Backbone.Collection.extend({

		model: WC.Models.Team,

		url: 'http://worldcup.kimonolabs.com/api/teams?apikey=9144470129c2788e93b377ffa8faa3ad',

		initialize: function () {
			this.type = 'goalsFor';
		},

		comparator: function (collection) {
			return -(collection.get('goalsFor'));
		},

		strategies: {
			goalsFor: function (model) {
				return -(model.get('goalsFor'));
			},

			name: function (model) {
				return model.get('name');
			},

			group: function (model) {
				return [model.get('group'), model.get('groupRank')];
			}
		},

		changeSort: function (sortProperty) {
			this.type = sortProperty;
			this.comparator = this.strategies[sortProperty];
			this.sort();
		}
	});
})();
