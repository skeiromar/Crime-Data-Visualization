import message from './test';


document.addEventListener("DOMContentLoaded",() => {

    let map;
    let d3Map = d3.selectAll('#map');
    let initMap = function() {
      map = new google.maps.Map(d3Map.node(), {
        center: new google.maps.LatLng(40.7128, -73.935242),
        zoom: 12,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeId: google.maps.MapTypeId.TERRAIN
      });

            
    };
    initMap();
    

    let btnS = document.getElementById("selectButton");
    let selector = document.getElementById("selector");
    let selected = selector.options[selector.selectedIndex].value;

    
   d3.json('../data/crime_detail.json').then(function (data, error) {

    let crimeCoords = {};


    // debugger



   
    for (let i = 0; i < data.length; i++) {
        if (!data[i].lat_lon) {
            continue;
        }
        
        // crimeCoords.push(data[i].lat_lon.coordinates);

            crimeCoords[i] = data[i].lat_lon.coordinates;
            crimeCoords[i].push({boro_nm: data[i].boro_nm});
        // debugger
    }

    btnS.onclick = function() {

        selected = selector.options[selector.selectedIndex].value;
        console.log('works');
            if (selected === 'Bronx') {
                crimeCoords = {};
                d3.selectAll("svg").remove();
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].lat_lon) {
                        continue;
                    }
                    
                    // crimeCoords.push(data[i].lat_lon.coordinates);
                    if (data[i].boro_nm === 'BRONX') {
                        crimeCoords[i] = data[i].lat_lon.coordinates;
                        crimeCoords[i].push({boro_nm: data[i].boro_nm});
                    // debugger
                    }
                }
                // debugger
          }
        };

    let overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
       let layer = d3.select(this.getPanes().overlayLayer).append('div')
       .attr('class', 'stations');



       overlay.draw = function() {
           // debugger
           let projection = this.getProjection(), padding = 10;
                
   
                // debugger
                let marker = layer.selectAll('svg')
                .data(d3.entries(crimeCoords))
                .each(transform)
                .enter().append('svg')
                .each(transform)
                .attr('class', 'marker');
        
                marker.append("circle")
                .attr("r", 4.5)
                .attr("cx", padding)
                .attr("cy", padding);
        
                marker.append("text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .text(function(d) { return d.key; });

            // }
            function transform(d) {
                //  debugger

                d = new google.maps.LatLng(d.value[1], d.value[0]);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    // .transition().duration(10)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }

        //    debugger

       };

   };

   overlay.setMap(map);
   });
    
//     let overlay = new google.maps.OverlayView();


//     overlay.onAdd = function() {
//        let layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
//        .attr('class', 'stations');

//        overlay.draw = function() {
//            let projection = this.getProjection(), padding = 10;

//            let marker = layer.selectAll('svg')
//            .data(d3.entries(samp_data))
//            .each(transform)
//            .enter().append('svg')
//            .each(transform)
//            .attr('class', 'marker');

//            marker.append("circle")
//            .attr("r", 4.5)
//            .attr("cx", padding)
//            .attr("cy", padding);

//            function transform(d) {

//                d = new google.maps.LatLng(d.value[0], d.value[1]);
//                d = projection.fromLatLngToDivPixel(d);
//                return d3.select(this)
//                    .style("left", (d.x - padding) + "px")
//                    .style("top", (d.y - padding) + "px");
//            }

//        };

//    };

//    overlay.setMap(map);

});