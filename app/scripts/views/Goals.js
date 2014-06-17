/*global WC, Backbone, JST*/

WC.Views = WC.Views || {};

(function () {
    'use strict';

    WC.Views.Goals = Backbone.View.extend({

        template: JST['app/scripts/templates/Goals.ejs'],

        events: {},

        initialize: function () {
            this.collection.on('reset', function () {
				this.$el.find('>.items').html('');
				this.collection.each(this.addOne, this);
			}, this);
            
            this.collection.on('add', this.addOne, this);
            
            this.render();
        },

        render: function () {
            this.setElement(this.template());
			WC.$el.append(this.$el);
            
            return this;
        },
        
        addOne: function (list) {
			var goalBox = new WC.Views.Goal({ model: list });

			this.$el.find('>.items').append(goalBox.render().el);
		},

    });

})();
