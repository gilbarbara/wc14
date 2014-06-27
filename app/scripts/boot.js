$(document).ready(function () {
	'use strict';

	$('#content').css('min-height', $(window).height() - 70 - $('footer').outerHeight());

	WC.init();

	$(document)
		.on('click', 'a[data-nav]', function (e) {
			var $this = $(e.currentTarget),
				href,
				passThrough,
				url;

			if (Modernizr.history) {
				href = $this.attr('href');

				// chain 'or's for other black list routes
				passThrough = href.indexOf('sign_out') >= 0;

				//Allow shift+click for new tabs, etc.
				if (!passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {

					e.preventDefault();

					//Remove leading slashes and hash bangs (backward compatablility)
					url = href.replace(/^\//, '').replace(/^#/, '');
					//Instruct Backbone to trigger routing events
					WC.router.navigate(url, { trigger: true });

					return false;
				}
			}

			return true;
		});
});
