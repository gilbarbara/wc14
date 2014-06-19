WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Header = Backbone.View.extend({

		template: JST['app/scripts/templates/Header.ejs'],

		el: '.site-header',

		events: {
			'click .navbar-nav a': 'navigate'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());

			return this;
		},

		navigate: function (e) {
			var $this = $(e.target);

			$this.parent().addClass('active')
				.siblings().removeClass('active');
		}
	});

})();
