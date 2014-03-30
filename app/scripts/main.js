d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

data = [
    {
        "label":"one",
        "value":20
    },
    {
        "label":"two",
        "value":50
    },
    {
        "label":"three",
        "value":30
    }
];

    var w = 600,                        //width
    h = 300,                            //height
    r = 100,                            //radius
    ir = 50,
    lr = r + 30,                        // radius for label anchor
    pi = Math.PI,
    bbox,
    // color = d3.scale.category20c(),
    length=3,
    color = d3.scale.linear().domain([1,length]).range(['#b3a07f', '#e7d9be']),
    primaryColor = '#f2f2f2',
    secondaryColor = '#747881';



    var vis = d3.select("body").append('svg')
        .attr('id', 'donut')
        .data([data])
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
            .attr('class', 'vis');


    var arc = d3.svg.arc()
        .outerRadius(r)
        .innerRadius(ir);

    var pie = d3.layout.pie()
        .value(function(d) { return d.value; })
        .startAngle(0 * (pi/180))
        .endAngle(180 * (pi/180))
        .sort(null);

    vis.append('svg:circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r + 10)
        .attr('class', 'ic')
        .attr('fill', '#f2f2f2');

    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice");

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } )
                .attr("d", arc);

        arcs.append('svg:g');
        arcs.selectAll('g')
            .attr("transform", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return "translate(" + 310 +  ',' + y/h*r +  ")";
            });


        arcs.selectAll('g').append("svg:text")
                .attr('dy', '.35em')
                .attr('text-anchor', 'left')
                .attr('class', 'value-text')
                .text(function(d, i) { return d.value.toFixed(2); })
                .attr('fill', '#fff');

        arcs.select('g').append('svg:rect')
            .attr("x", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.x-10;
            })
            .attr("y", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.y-5;
            })
            .attr("width", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.width+20;
            })
            .attr("height", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.height+10;
            })
            .style("fill", secondaryColor)

        arcs.select('.value-text').moveToFront();

        arcs.select('g').append("svg:text")
                .attr('x', function(d, i) {
                    var b = arcs.select('.value-text')[0][i].getBBox();
                    return b.width+20;
                })
                .attr('dy', '.35em')
                .attr("text-anchor", 'left')
                .attr('class', 'label-text')
                .text(function(d, i) {
                    return data[i].label;
                })
                .attr('fill', secondaryColor);

        arcs.select('g').append('svg:rect')
            .attr("x", function(d, i) {
                var b = arcs.select('.label-text')[0][i].getBBox();
                return b.x-10;
            })
            .attr("y", function(d, i) {
                var b = arcs.select('.label-text')[0][i].getBBox();
                return b.y-5;
            })
            .attr("width", function(d, i) {
                var b = arcs.select('.label-text')[0][i].getBBox();
                return b.width+20;
            })
            .attr("height", function(d, i) {
                var b = arcs.select('.label-text')[0][i].getBBox();
                return b.height+10;
            })
            .style("fill", primaryColor)

        arcs.select('.label-text').moveToFront();

        var lines = arcs.append('svg:line')
            .attr("x1", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return x/h*r;
            })
            .attr("x2", function(d) {
                return 290;
            })
            .attr("y1", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return y/h*r;
            })
            .attr("y2", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return y/h*r;
            })
            .attr('class', 'line')
            .attr("stroke", "gray");

        arcs.append('svg:circle')
            .attr('cx', function(d, i) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return x/h*r;
            })
            .attr('cy', function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    h = Math.sqrt(x*x + y*y);
                return y/h*r;
            })
            .attr('r', 4.5)
            .attr('fill', secondaryColor)
            .attr('stroke', '#fff');

        arcs.select('g').append('svg:rect')
            .attr("x", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.x-21;
            })
            .attr("y", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.y-5;
            })
            .attr("width", 10)
            .attr("height", function(d, i) {
                var b = arcs.select('.value-text')[0][i].getBBox();
                return b.height+10;
            })
            .attr("fill", function(d, i) { return color(i); } )

        var finalSize = d3.select('#donut').node().getBBox();
        d3.select('.vis').attr("transform", "translate(" + 0 + "," + h/2 + ")");
