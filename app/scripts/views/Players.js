WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Players = Backbone.View.extend({

		template: JST['app/scripts/templates/Players.ejs'],

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

		addOne: function (player) {
			var playerBox = new WC.Views.Player({ model: player });
			console.log(player.toJSON());

			if (this.collection.type === 'group' && this.group !== player.get('group')) {
				this.group = player.get('group');
				this.$el.find('>.items').append('<h2 class="col-xs-12"> Group ' + player.get('group') + '</h2>');
			}

			this.$el.find('>.items').append(playerBox.render().el);
		}

	});

})();
