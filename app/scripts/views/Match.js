WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Match = Backbone.View.extend({

		template: JST['app/scripts/templates/Match.ejs'],

		tagName: 'div',

		className: function () {
			var index = this.model.collection.models.indexOf(this.model);
			return (index % 2 === 0 ? 'col-xs-12 col-sm-6 col-md-5' : 'col-xs-12 col-sm-6 col-md-5 col-md-offset-2');
		},

		events: { },

		initialize: function () {
			this.model.on('change', this.render, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		remove: function () {
			this.$el.removeData().unbind();

			Backbone.View.prototype.remove.call(this);
		}

	});

})();
