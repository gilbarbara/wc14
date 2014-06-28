WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Teams = Backbone.View.extend({

		template: JST['app/scripts/templates/Teams.ejs'],

		events: {
			'click .btn-group a': 'sort'
		},

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

		addOne: function (team) {
			var goalBox = new WC.Views.Team({ model: team });

			if (this.collection.type === 'group' && this.group !== team.get('group')) {
				this.group = team.get('group');
				this.$el.find('>.items').append('<h2 class="col-xs-12"> Group ' + team.get('group') + '</h2>');
			}

			this.$el.find('>.items').append(goalBox.render().el);
		},

		sort: function (e) {
			e.preventDefault();

			var $this = $(e.target);
			$this.removeClass('btn-default').addClass('btn-primary')
				.siblings().removeClass('btn-primary').addClass('btn-default');

			this.collection.changeSort($this.data('sort'));
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
