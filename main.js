import * as d3 from "d3";
import vegaEmbed from "vega-embed";


// set the dimensions and margins of the graph
const margin = {top: 30, right: 10, bottom: 10, left: 0},
  width = 1500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#d3-div")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        `translate(${margin.left},${margin.top})`);

  d3.csv("data/wo_outliers_percent.csv").then( function(data) {
      console.log(data)
            // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
            let dimensions = Object.keys(data[0]).filter(function(d) { return (d != "ingredients") &&  (d != "mostcommon")})
            console.log(dimensions)
            // For each dimension, I build a linear scale. I store all in a y object
            const y = {}

            for (var i in dimensions) {
              name = dimensions[i]
              y[name] = d3.scaleLog()
                .domain([0.1,10]) // --> Same axis range for each group
                // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
                .range([height, 0])
            }
            // Color scale: give me a specie name, I return a color
            const color = d3.scaleOrdinal() //??
              .domain(dimensions)
              .range(["#0F0A0Aff", "#2292A4FF", "#BDBF09ff", "#D96C06FF", "#D30C7BFF", "#F42C04FF", "#D67AB1FF"])
            console.log("test")
            console.log(color("russian"))
            // Build the X scale -> it find the best position for each Y axis
            var x = d3.scalePoint()
              .range([0, width])
              .padding(1)
              .domain(dimensions);

              
            // tool tip
            const tooltip = d3.select("#d3-div")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
        /*
            const mouseover = function(event, d) {
              tooltip
                .style("opacity", 1)
              console.log("triggeerd")
            }

            const mousemove = function(event, d) {
              tooltip
                .html(`ingredient: ${d.ingredients} <br> most common in ${d.mostcommon} recipes`)
                .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (event.y)/2 + "px")
            }
            */

            // Highlight the specie that is hovered
  var current = "all"
  const highlight = function(event, d){
    tooltip
        .style("opacity", 1)
        .html(`ingredient: ${d.ingredients} <br> most common in ${d.mostcommon} recipes`)
  }

  // Unhighlight
  const doNotHighlight = function(event, d){
    if (current = "all" || d.mostcommon == current) {
      tooltip
      .style("opacity", 1)
      .html(`ingredient: ${d.ingredients} <br> most common in ${d.mostcommon} recipes`)
      .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (event.y)/2 + "px")
    }
  
  }
          
            // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  const mouseleave = function(event,d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
  }
            // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
            function path(d) {
                return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
            }
          
            // Draw the lines
            var mylines = svg
              .selectAll("myPath")
              .data(data)
              .join("path")
                .attr("class", function (d) { return "line " + d.mostcommon } )
                .attr("d",  path)
                .style("fill", "none")
                .style("stroke", function(d){ return( color(d.mostcommon))})
                .style("opacity", 0.5)
              .on("mouseover", highlight )
              .on("mousemove", doNotHighlight )
              .on("mouseleave", mouseleave )

  const showonly = function(event, d){
      console.log(d)
      const selected_specie = d
      current = d
      if (d != 'all'){
                // first every group turns grey
      d3.selectAll(".line") 
      .transition().duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + selected_specie)
      .transition().duration(200)
      .style("stroke", color(selected_specie))
      .style("opacity", "1")
      } else {
        d3.selectAll(".line") 
        .transition().duration(200)
        .style("opacity", "0.2")
      }


      }                      
            // Draw the axis:
            svg.selectAll("myAxis")
              // For each dimension of the dataset I add a 'g' element:
              .data(dimensions).enter()
              .append("g")
              // I translate this element to its right position on the x axis
              .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
              // And I build the axis with the call function
              .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
              // Add axis title
              .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(function(d) { return d; })
                .style("fill", "black")
              .on("click", showonly)
          
          })





