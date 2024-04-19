//Define data
const health = d3.csv("mental_health_data.csv");

health.then(function(data) {
  // Convert string values to numbers
  data.forEach(function(d) {
      d.depression_percent = +d.depression_percent;
      d.alcohol_use_percent = +d.alcohol_use_percent;
  });
  


let width = 600, height = 400;
let margin = {
  top: 30,
  bottom: 40,
  left: 30, 
  right: 30
}
let svg = d3.select('#plot')
          //.append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('background', 'white')

// Set up scales for x and y axes
    // example given: d3.min(data, d => d.bill_length_mm)-5

    let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.depression_percent) + 0.5])
    .range([height - margin.bottom, margin.top]);


    let xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.alcohol_use_percent) + 0.5])
        .range([margin.left, width - margin.right]);

   
    // Add scales    
    let xAxis = svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));
 
    let yAxis = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft().scale(yScale));


    let circle = svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.alcohol_use_percent))
                .attr('cy', d => yScale(d.depression_percent))
                .attr('r', 1)
                .attr('fill', 'black');

    // Add x-axis label
    xAxis.append('text')
    .attr('x', 300) 
    .attr('y', 20) 
    .style('stroke', 'black')
    .text('Alcohol Use (% of Population)');

    // Add y-axis label
    yAxis.append('text')
    .attr('x', -200) 
    .attr('y', -5) 
    .attr('transform', 'rotate(-90)') 
    .style('stroke', 'black')
    .text('Depression (% of Population)');
    

});
