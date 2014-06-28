WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Matches = Backbone.View.extend({

		template: JST['app/scripts/templates/Matches.ejs'],

		events: { },

		initialize: function () {

			this.collection.on('add', this.addOne, this);

			this.stages = _.extend({}, WC.data.stages);

			this.render();
		},

		render: function () {
			this.setElement(this.template());
			WC.$el.html(this.$el);

			this.$el.find('>.items').html('');
			this.collection.each(this.addOne, this);

			return this;
		},

		addOne: function (match) {
			var matchBox = new WC.Views.Match({ model: match }),
				that = this,
				time = WC.formatDate(match.get('startTime')),
				stage;

			stage = _.find(_.invert(this.stages), function (d, i) {
				if (time.timestamp > i) {
					delete that.stages[d];
				}
				return time.timestamp > i;
			});

			if (stage) {
				this.$el.find('>.items').append('<h1 class="col-xs-12">' + stage + '</h1>');
			}

			this.$el.find('>.items').append(matchBox.render().el);
		},

		remove: function () {
			this.removeViews();

			this.undelegateEvents();

			this.$el.removeData().unbind();

			Backbone.View.prototype.remove.call(this);
		},

		removeViews: function () {
			this.trigger('cleanup');
		}

	});

})();
