WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Matches = Backbone.View.extend({

		template: JST['app/scripts/templates/Matches.ejs'],

		events: { },

		initialize: function () {

			this.collection.on('sort', function () {
				this.$el.find('>.items').html('');
				this.collection.each(this.addOne, this);
			}, this);

			this.collection.on('add', this.addOne, this);

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
			var matchBox = new WC.Views.Match({ model: match });
			console.log(match.toJSON());

			if (this.collection.type === 'group' && this.group !== match.get('group')) {
				this.group = match.get('group');
				this.$el.find('>.items').append('<h2 class="col-xs-12"> Group ' + match.get('group') + '</h2>');
			}

			this.$el.find('>.items').append(matchBox.render().el);
		}

	});

})();
