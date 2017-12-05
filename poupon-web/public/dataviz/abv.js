var margin = { top: 50, right: 20, bottom: 150, left: 40 },
    width = document.querySelector("#abv-container").parentElement.offsetWidth - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);

//define the axis
var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).ticks(10);

var tip = d3.tip().attr("class", "d3-tip").offset([-10, 0]).html(function (d) {
  return `<div><strong>${d.name}</strong></div>
    <div>ABV: <span style="color:red">${d.abv}</span></div>`;
});

// add the SVG element
var svg = d3.select("#abv-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// var ingredient_list = [];

d3.json("https://tipsymix.com/api/search?category=ingredients&pagesize=47", function (error, data) {
  if (error) {
    console.log(error);
  }

  data.results.forEach(function (d) {
    d.name = d.name;
    d.abv = +d.abv;

    // d3.json("https://tipsymix.com/api/ingredients/"+d.id, function(error,data) {
    //   if (error) {
    //     console.log(error)
    //   }
    //   ingredient_list.push(data);
    // }); 
  });

  data.results.sort((a,b) => b.abv - a.abv);
  const maxABV = data.results.reduce((acc, current) => Math.max(acc, current), 0);

  x.domain(data.results.map(function (d) {
    return d.name;
  }));
  y.domain([0, d3.max(data.results, function (d) {
    return d.abv;
  })]);

  //add axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)");

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("ABV of Cocktail Ingredients");

  // Add bar chart
  svg.selectAll("bar")
    .data(data.results)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", function(d){return d3.interpolateYlOrBr(d.abv)})
    .attr("x", function (d) {
      return x(d.name);
  }).attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.abv);
  }).attr("height", function (d) {
      return height - y(d.abv);
  }).on('mouseover', tip.show)
    .on('mouseout', tip.hide);
});

// console.log(ingredient_list);