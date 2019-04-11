import message from './test';


document.addEventListener("DOMContentLoaded",() => {
    // console.log("hello");
    // message('wazzup');

    // d3.select('h3').style('color', 'blue');
    // d3.select('h3').style('font-size', '28px');

    // const fruits = ['apple', 'mango', 'orange', 'banana'];

    // d3.select('h3').selectAll('li')
    // .data(fruits)
    // .enter()
    // .append('li')
    // .text(d => d);

    // let svg = d3.select('svg');

    // let data = [80, 120, 60, 150, 200, 123];

    // let barHeight = 20;

    // let bar = svg.selectAll('rect')
    // .data(data).enter().append('rect').attr('width', d => d)
    // .attr('height', barHeight-1)
    // .attr('transform', (d, i) => "translate(0," + i * barHeight + ")");
    
    // d3.select('#btn').on('click', () => {
    //     d3.select('body')
    //     .append('h3')
    //     .text('Today is a day');
    // });


    let map;
    window.initMap = function() {
      map = new google.maps.Map(d3.select('#map').node(), {
        center: {lat: 40.7128, lng: -73.935242},
        zoom: 8,
        // mapTypeId: google.maps.MapTypeId.TERRAIN
      });
    };

    

});