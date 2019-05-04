const height = 500
const width = 500

const margin = ({top: 20, right: 0, bottom: 30, left: 40})

const barCreditCard = (data,id) => {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var xValue = function(d) { return d.date; } // data -> value 

  var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1)
  console.log(xScale)// value -> display
  var xMap = function(d) { return xScale(xValue(d)); } // data -> display
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

var yValue = function(d) { return d.cards; }, // data -> value
  yScale = d3.scale.linear().range([height, 0]), // value -> display
  yMap = function(d) { return yScale(yValue(d)); }, // data -> display
  yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(formatPercent);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.JSON(data, type, function(error, data) {
xScale.domain(data.map(xValue));
yScale.domain([0, d3.max(data, yValue)]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", xMap)
    .attr("width", xScale.rangeBand)
    .attr("y", yMap)
    .attr("height", function(d) { return height - yMap(d); });

});

function type(d) {
d.cards = +d.cards;
return d;
}

    
}