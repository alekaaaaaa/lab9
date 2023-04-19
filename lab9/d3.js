function generateVisualizations(){
        // Generate 100 random points
const data = d3.range(100).map(() => [Math.random() * 500, Math.random() * 500]);

// Create a scatter plot
const svg = d3.select('svg');
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .attr('r', 5)
    .attr('fill', 'steelblue');
}

function generatepie(){
    d3.csv('titanic.csv').then(data => {
        // Compute the age distribution for passengers
        const svg = d3.select('#a1');
        const ageData = d3.rollup(data, v => v.length, d => d.Age);
        const pieData = Array.from(ageData, d => ({ age: d[0], count: d[1] }));
        const pie = d3.pie().value(d => d.count);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        const arc = d3.arc().innerRadius(0).outerRadius(200);
        const arcs = svg.selectAll('arc')
                      .data(pie(pieData))
                      .join('g')
                      .attr('transform', 'translate(250, 250)');
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => colors(d.data.age));
        
        
        // Create a table for age distribution
        const tableData = Array.from(ageData, d => ({ age: d[0], count: d[1], color: d3.color(colors(d[0])).formatRgb()}));
        const table = d3.select('#a1-container').append('table');
        const headers = ['Age', 'Count', 'Color'];
        const thead = table.append('thead').append('tr');
        thead.selectAll('th')
            .data(headers)
            .enter()
            .append('th')
            .text(d => d);
        const tbody = table.append('tbody');
        const rows = tbody.selectAll('tr')
        .data(tableData)
        .enter()
        .append('tr');
        rows.selectAll('td')
        .data(d => Object.values(d))
        .enter()
        .append('td')
        .html(d => {
            if (d == colors(d[0])) {
            return `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${colors(d[0])};"></div>`;
            } else {
                // console.log(d3.color(colors(d[0])).formatRgb());
            return d;
            }
        });
                      
        
      }).catch(error => {
        console.log(error); // log any errors to the console
      });
}