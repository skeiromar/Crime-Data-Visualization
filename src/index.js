import message from './test';
import {crimeCoords} from './utils';
import {crime} from '../data/crime_det';

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
    let selectMulBtn = document.querySelector(".button-select-multiple");
    

    let selector = document.getElementById("selector");
    let selected = selector.options[selector.selectedIndex].value;
    let yearFilter = document.getElementById("filter_year");
    // debugger
    let yrFiltered = yearFilter.options[yearFilter.selectedIndex].value ;

   function render(data, error) {


    
    let crimeCoordsReturn = crimeCoords(data);
    let filtered = false;
    let filterType = null;

    // Once the button is pressed, we check for what was selected within the selectors. 
    // We save the corresponding values within the hash. If the key is found, we use the corresponding 
    // value as the basis for the filtering of data
    // We'll have three if elses for depending on how many selectors were selected 

    selectMulBtn.onclick = function() {
      let selectees = document.querySelectorAll(".selector");
      let selectedOptions = [];
      
      
      
      for (let i = 0; i < selectees.length; i++) {
        let selected = selectees[i].options[selectees[i].selectedIndex].value;
        
        if (selected === 'Bronx') {
          filtered = true;
          d3.selectAll("svg").remove();
          // crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'BRONX'));
          selectedOptions = [...selectedOptions, ['boro_nm', 'BRONX']];
          filterType = null;

        } else if (selected === 'Manhattan') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['boro_nm', 'MANHATTAN']];
            
            filterType = null;

        } else if (selected === 'Queens') {
          filtered = true;
          d3.selectAll("svg").remove();
          
          selectedOptions = [...selectedOptions, ['boro_nm', 'QUEENS']];
          
          filterType = null;
        } else if (selected === 'Brooklyn') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['boro_nm', 'BROOKLYN']];
            filterType = null;
        } else if (selected === 'STATEN ISLAND') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['boro_nm', 'STATEN ISLAND']];
            
            filterType = null;
        } else if (selected === '2018') {
          filtered = true;
          d3.selectAll("svg").remove();
          selectedOptions = [...selectedOptions, ['rpt_dt', '2018']];

          
          filterType = null;


        } else if (selected === '2011') {
            filtered = true;
            d3.selectAll("svg").remove();
            // crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2011'));
            selectedOptions = [...selectedOptions, ['rpt_dt', '2011']];
            filterType = null;

        } else if (selected === '2010') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['rpt_dt', '2010']];
            
            filterType = null;

            
        } else if (selected === '2009') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['rpt_dt', '2009']];            
            
            filterType = null;
            
        } else if (selected === '2008') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['rpt_dt', '2008']];
            
            filterType = null;
        } else if (selected === '2007') {
          filtered = true;
          d3.selectAll("svg").remove();
          selectedOptions = [...selectedOptions, ['rpt_dt', '2007']];
          
          filterType = null;
        } else if (selected === '2006') {
          filtered = true;
          d3.selectAll("svg").remove();
          selectedOptions = [...selectedOptions, ['rpt_dt', '2006']];
          
          filterType = null;
        } else if (selected === 'FELONY') {
          filtered = true;
          d3.selectAll("svg").remove();
          filterType = 'Felony';
          // crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'FELONY'));
          selectedOptions = [...selectedOptions, ['law_cat_cd', 'FELONY']];
          filterType = null;

        } else if (selected === 'MISDEMEANOR') {
            filtered = true;
            d3.selectAll("svg").remove();
            // crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'MISDEMEANOR'));
            selectedOptions = [...selectedOptions, ['law_cat_cd', 'MISDEMEANOR']]; 
            // map.fitBounds(map.getBounds());
            filterType = null;

        } else if (selected === 'VIOLATION') {
            filtered = true;
            d3.selectAll("svg").remove();
            selectedOptions = [...selectedOptions, ['law_cat_cd', 'VIOLATION']]; 

            // crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'VIOLATION'));
            
            filterType = null;
        } 

      }
      let multFiler = (data, arg1, arg2) => {

        let newData = data;
        if (arg1 === 'rpt_dt') {
          newData = newData.filter(d => d.rpt_dt.slice(0, 4) === arg2);
        } else {
          newData = newData.filter(d => d[arg1] === arg2);
        }
        // debugger
        return (a3, a4) => {
          if (a3 === 'rpt_dt') {
            newData = newData.filter(d => d.rpt_dt.slice(0, 4) === a4);
          } else {
            newData = newData.filter(d => d[a3] === a4);
          }
          return (a5, a6, has = true) => {
            if (!has) {
              return newData;
            } else {
              if (a5 === 'rpt_dt') {
                newData = newData.filter(d => d.rpt_dt.slice(0, 4) === a6);
              } else {
                newData = newData.filter(d => d[a5] === a6);
              }
              return newData;
            }
          };
        };
      };

      let mult = multFiler;
      let count = 0;

      for (let i = 0; i < selectedOptions.length; i++) {
        if (i === 0) {

          mult = mult(data, selectedOptions[i][0], selectedOptions[i][1]);        
        } else {
          mult = mult(selectedOptions[i][0], selectedOptions[i][1]);        
        }
        count++;
      }
      if (count === 1) {
        alert("please select more filters");
        map.setZoom(map.getZoom());

      } else {
        if (count < 3) {
          mult = mult(0, 0, false);
        }
        crimeCoordsReturn = crimeCoords(mult);
        map.setZoom(map.getZoom());
      }


    };

    btnL.onclick = function() {

        selected = selector.options[selector.selectedIndex].value;
        if (selected === 'Bronx') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'BRONX'));
          map.setZoom(map.getZoom());
          filterType = null;

        } else if (selected === 'Manhattan') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'MANHATTAN'));
            map.setZoom(map.getZoom());
            filterType = null;

        } else if (selected === 'Queens') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'QUEENS'));
          map.setZoom(map.getZoom());
          filterType = null;
        } else if (selected === 'Brooklyn') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'BROOKLYN'));
            map.setZoom(map.getZoom());
            filterType = null;
        } else if (selected === 'STATEN ISLAND') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.boro_nm === 'STATEN ISLAND'));
            map.setZoom(map.getZoom());
            filterType = null;
        } 
    };

    btnyear.onclick = function() {
        yrFiltered = yearFilter.options[yearFilter.selectedIndex].value;
        // debugger
        if (yrFiltered === '2018') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2018'), Bounds);
          map.setZoom(map.getZoom());
          filterType = '2018';


        } else if (yrFiltered === '2011') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2011'));
            map.setZoom(map.getZoom());
            filterType = null;

        } else if (yrFiltered === '2010') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2010'));
            map.setZoom(map.getZoom());
            filterType = null;

            
        } else if (yrFiltered === '2009') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2009'));
            map.setZoom(map.getZoom());
            filterType = null;
            
        } else if (yrFiltered === '2008') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2008'));
            map.setZoom(map.getZoom());
            filterType = null;
        } else if (yrFiltered === '2007') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2007'));
          map.setZoom(map.getZoom());
          filterType = null;
        } else if (yrFiltered === '2006') {
          filtered = true;
          d3.selectAll("svg").remove();
          crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2006'));
          map.setZoom(map.getZoom());
          filterType = null;
        }


    };

    selectAllBtn.onclick = function() {
      crimeCoordsReturn = crimeCoords(data);
      filtered = false;
      filterType = null;
      map.setZoom(map.getZoom());
      
    };

    // overlay defined here
    let overlay = new google.maps.OverlayView();


    let violationBtn = document.getElementById("violationBtn");
    let violationSelector = document.getElementById("filter_violation_type");
    let violationSelected = violationSelector.options[violationSelector.selectedIndex].value;
    

    violationBtn.onclick = function() {
        violationSelected = violationSelector.options[violationSelector.selectedIndex].value;
        // debugger
        if (violationSelected === 'FELONY') {
            filtered = true;
            d3.selectAll("svg").remove();
            filterType = 'Felony';
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'FELONY'));
            map.setZoom(map.getZoom());
            filterType = null;

        } else if (violationSelected === 'MISDEMEANOR') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'MISDEMEANOR'));
            // map.fitBounds(map.getBounds());
            map.setZoom(map.getZoom());
            filterType = null;

        } else if (violationSelected === 'VIOLATION') {
            filtered = true;
            d3.selectAll("svg").remove();
            crimeCoordsReturn = crimeCoords(data.filter(d => d.law_cat_cd === 'VIOLATION'));
            map.setZoom(map.getZoom());
            filterType = null;
        } 
        // debugger
    };

    let Bounds = null;
    let mapZoom = 11;
    let isZooming = true;
    google.maps.event.addListener(map, 'bounds_changed', function() {
      // debugger
      isZooming = false;
      mapZoom = map.getZoom();
      const { north, south, east, west } = map.getBounds().toJSON();
      Bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat: south, lng: west } };

      // debugger
                
    });
    google.maps.event.addListener(map, 'idle', function() {
      isZooming = true;
    });
    
    let dragEnd = true; 

    google.maps.event.addListener(map, 'dragend', function() {
      dragEnd = true;    
    });
    let div;
    google.maps.event.addListener(map, 'dragstart', function() {
      dragEnd = false;    
      d3.selectAll('.tooltip').remove();

    });
    
    

    overlay.onAdd = function() {
       let layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
       .attr('class', 'stations');


      let zoomedOut = false;
      
      let count = 0;
      let draw = function() {

        
        
        
        // debugger
        
        
        if (dragEnd || isZooming) {
          
            if (Bounds && !filtered && dragEnd) {
              crimeCoordsReturn =  crimeCoords(data, Bounds);
              d3.selectAll("svg").remove();
                  
                  
            } else if (filterType === '2018' && filtered && dragEnd && Bounds) {
    
              crimeCoordsReturn = crimeCoords(data.filter(d => d.rpt_dt.slice(0, 4) === '2018'), Bounds);
              d3.selectAll("svg").remove();
            }
                  
            let projection = this.getProjection(), padding = 10;

            const transform = function(d) {

              d = new google.maps.LatLng(d.value[1], d.value[0]);
              d = projection.fromLatLngToDivPixel(d);
              return d3.select(this)
                .style("left", (d.x - padding) + "px")
                .style("top", (d.y - padding) + "px");
            };
            
            let marker = layer.selectAll('svg')
            .data(d3.entries(crimeCoordsReturn))
            .each(transform)
            .enter().append('svg')
            .each(transform)
            .attr('class', 'marker');

            div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
    
            marker.append("circle")
            .attr("r", 6)
            .attr("cx", padding)
            .attr("cy", padding)
            .style("z-index", 2)		
            .on("click", function(d) {	
                
                let dataOfClick = d3.event.path[0].__data__;
                
                const crimeObj  = dataOfClick.value[2];
                
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);
                    div.html(`
                    <div class='text-container'>
                      <span>
                        Offsense Description: ${dataOfClick.value[2].offenseDescription.toLowerCase()}
                      </span>   
                      <span>
                        Police Description: ${dataOfClick.value[2].policeDescription}
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
                      <span>
                        Premier Description: ${crimeObj.premierDescription}
                      </span>
                      <span>
                        Occurence Location Description: ${crimeObj.occurenceLocDescription}
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
            });
  

        
    }      

        //    debugger

       };
       overlay.draw = draw;
      //  setInterval(() => {
      //    if (overlay.draw) {
      //      overlay.draw = null;
      //    } else {
      //       overlay.draw = draw;
      //    }
      //  }, 100);

   };

   overlay.setMap(map);
   }
   render(crime);
    
});