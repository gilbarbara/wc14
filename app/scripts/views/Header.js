WC.Views = WC.Views || { };

(function () {
	'use strict';

	WC.Views.Header = Backbone.View.extend({

		template: JST['app/scripts/templates/Header.ejs'],

		el: '.site-header',

		events: {
			'click .navbar-nav a, .navbar-brand': 'navigate'

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
			if ($this.parents('.navbar-nav').size()) {

				$this.parent().addClass('active')
					.siblings().removeClass('active');

				if ($('.navbar-collapse').hasClass('in')) {
					$('.navbar-toggle').trigger('click');
				}
			}
			else {
				$('.navbar-nav')
					.find('li').removeClass('active').end()
					.find('a[href="/#stats"]').parent().addClass('active');
			}
		}
	});

})();
