/*global WC, $*/


window.WC = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    
    models: {},
    collections: {},
    views: {},
    
    init: function () {
        'use strict';
        this.$el = $('#content');
        
        /*$.ajax({
            url: 'http://worldcup.kimonolabs.com/api/teams?apikey=9144470129c2788e93b377ffa8faa3ad&sort=goalsFor,-1',
            success: function(resutls) {
	            _.each(resutls, function(d) {
                   console.log(d); 
                });
    	    }
    	});*/
        
        this.router = new this.Routers.Router();
		Backbone.history.start({ pushState: Modernizr.history });
        //this.bubble();
    },
    
    bubble: function () {
        var diameter = 960,
            format = d3.format(",d"),
            color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("body").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        d3.json("http://worldcup.kimonolabs.com/api/teams?apikey=9144470129c2788e93b377ffa8faa3ad&sort=goalsFor,-1", function(error, root) {
          var node = svg.selectAll(".node")
              .data(bubble.nodes(classes(root)))
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
              .text(function(d) { return d.className + ": " + format(d.value); });

          node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d) { return color(d.packageName); });

          node.append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.className.substring(0, d.r / 3); });
        });

        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
          var classes = [];

          function recurse(name, node) {
            if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
            else classes.push({packageName: name, className: node.name, value: node.size});
          }

          recurse(null, root);
          return {children: classes};
        }

        d3.select(self.frameElement).style("height", diameter + "px");
    }
};

$(document).ready(function () {
    'use strict';
    WC.init();
});
