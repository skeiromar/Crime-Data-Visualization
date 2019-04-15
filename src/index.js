import message from './test';
import {crimeCoords} from './utils';

document.addEventListener("DOMContentLoaded",() => {

    let map;
    let d3Map = d3.selectAll('#map');
    let initMap = function() {
      map = new google.maps.Map(d3Map.node(), {
        center: new google.maps.LatLng(40.7128, -73.935242),
        zoom: 12,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        disableDefaultUI: true,
        // mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
      });

            
    };
    initMap();
    

    let btnL = document.getElementById("locationButton");
    let btnyear = document.getElementById("yearButton");
    let selectAllBtn = document.querySelector('.button-select-showall');

    let selector = document.getElementById("selector");
    let selected = selector.options[selector.selectedIndex].value;
    let yearFilter = document.getElementById("filter_year");
    // debugger
    let yrFiltered = yearFilter.options[yearFilter.selectedIndex].value ;

    
   d3.json('../data/crime_detail.json').then(function (data, error) {

    // let crimeCoords = {};
   
    // for (let i = 0; i < data.length; i++) {
    //     if (!data[i].lat_lon) {
    //         continue;
    //     }
        
    //     // crimeCoords.push(data[i].lat_lon.coordinates);

    //         crimeCoords[i] = data[i].lat_lon.coordinates;
    //         crimeCoords[i].push({boro_nm: data[i].boro_nm});
    //     // debugger
    // }

   

    
    let crimeCoordsReturn = crimeCoords(data);
    let filtered = false;

    btnL.onclick = function() {

        selected = selector.options[selector.selectedIndex].value;
        if (selected === 'Bronx') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'BRONX'));

        } else if (selected === 'Manhattan') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'MANHATTAN'));
        } else if (selected === 'Brooklyn') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'BROOKLYN'));
        } else if (selected === 'STATEN ISLAND') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'STATEN ISLAND'));
        } 
    };

    btnyear.onclick = function() {
        yrFiltered = yearFilter.options[yearFilter.selectedIndex].value;
        // debugger
        if (yrFiltered === '2011') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2011'));

        } else if (yrFiltered === '2010') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2010'));
            
        } else if (yrFiltered === '2009') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2009'));
            
        } else if (yrFiltered === '2008') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2008'));
        } 
    };

    selectAllBtn.onclick = function() {
      crimeCoordsReturn = crimeCoords(data);
      filtered = false;
    };


    let violationBtn = document.getElementById("violationBtn");
    let violationSelector = document.getElementById("filter_violation_type");
    let violationSelected = violationSelector.options[violationSelector.selectedIndex].value;

    violationBtn.onclick = function() {
        violationSelected = violationSelector.options[violationSelector.selectedIndex].value;
        // debugger
        if (violationSelected === 'FELONY') {
            filtered = true;
            d3.selectAll("svg").remove();
            
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'FELONY'));

        } else if (violationSelected === 'MISDEMEANOR') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'MISDEMEANOR'));
            
        } else if (violationSelected === 'VIOLATION') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'VIOLATION'));
        } 
        // debugger
    };

    let Bounds = null;
    let mapZoom = 11;
    google.maps.event.addListener(map, 'bounds_changed', function() {
      // debugger
      mapZoom = map.getZoom();
      const { north, south, east, west } = map.getBounds().toJSON();
      Bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat: south, lng: west } };

      // debugger
                
    });

    let overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
       let layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
       .attr('class', 'stations');


      let zoomedOut = false;
       overlay.draw = function() {

            if (Bounds && mapZoom >= 13 && !zoomedOut && !filtered) {
             crimeCoordsReturn =  crimeCoords(data, Bounds);
              d3.selectAll("svg").remove();
              zoomedOut = true;


            } else if (mapZoom < 13 && zoomedOut && !filtered) {
              zoomedOut = false;
              crimeCoordsReturn =  crimeCoords(data);

            }

           let projection = this.getProjection(), padding = 10;
                
   
           // debugger
      
                
                let marker = layer.selectAll('svg')
                .data(d3.entries(crimeCoordsReturn))
                .each(transform)
                .enter().append('svg')
                .each(transform)
                .attr('class', 'marker');

                var div = d3.select("body").append("div")	
                    .attr("class", "tooltip")				
                    .style("opacity", 0);
        
                marker.append("circle")
                .attr("r", 6)
                .attr("cx", padding)
                .attr("cy", padding)
                .style("z-index", 2)		
                .on("click", function(d) {	
                    
                    let dataOfClick = d3.event.path[0].__data__;
                    
                    // debugger	
                    const crimeObj  = dataOfClick.value[2];

                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);
                        div.html(`
                        <div class='text-container'>
                          <span>
                            Offsense description: ${dataOfClick.value[2].offenseDescription.toLowerCase()}
                          </span>   
                          <span>
                            Police description: ${dataOfClick.value[2].policeDescription}
                          </span>
                          <span>
                            Complaint Date: ${dataOfClick.value[2].date.slice(0,10)} : ${dataOfClick.value[2].complaintTime}
                          </span>
                          <span>
                            Borough: ${crimeObj.boro_nm}
                          </span>
                          <span>
                            Violation Type: ${crimeObj.violationType}
                          </span>
                        </div>`)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");
                        // debugger
                        // google.maps.event.addListener(map, 'bounds_changed', function() {
                        //     div.html("<br/>"  + 'interested in some crime?')	
                        // .style("left", (d3.event.pageX) + "px")		
                        // .style("top", (d3.event.pageY - 28) + "px");
                        // });
                        				
                    })		
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
        
                


                marker.append("text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .text(function(d) { 
                    // debugger    
                    // return d.value[2].boro_nm; 
                });
       

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