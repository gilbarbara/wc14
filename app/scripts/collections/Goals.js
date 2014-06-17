/*global WC, Backbone*/

WC.Collections = WC.Collections || {};

(function () {
    'use strict';

    WC.Collections.Goals = Backbone.Collection.extend({

        model: WC.Models.Goal,
        
        url: 'http://worldcup.kimonolabs.com/api/teams?apikey=9144470129c2788e93b377ffa8faa3ad&sort=goalsFor,-1'

    });

})();
