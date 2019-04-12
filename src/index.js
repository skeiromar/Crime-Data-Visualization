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

    let crimeData = {
        ":@computed_region_92fq_4b7q": "31",
        ":@computed_region_efsh_h5xi": "11610",
        ":@computed_region_f5dn_yrer": "58",
        ":@computed_region_sbqj_enih": "26",
        ":@computed_region_yeji_bk3q": "5",
        "addr_pct_cd": "43",
        "boro_nm": "BRONX",
        "cmplnt_fr_dt": "2006-08-29T00:00:00.000",
        "cmplnt_fr_tm": "13:00:00",
        "cmplnt_num": "522575447",
        "crm_atpt_cptd_cd": "COMPLETED",
        "housing_psa": "NA",
        "juris_desc": "N.Y. POLICE DEPT",
        "jurisdiction_code": "0",
        "ky_cd": "578",
        "lat_lon": {
        "type": "Point",
        "coordinates": [
        -73.877945775,
        40.827414051
        ]
        },
        "latitude": "40.827414051",
        "law_cat_cd": "VIOLATION",
        "loc_of_occur_desc": "INSIDE",
        "longitude": "-73.877945775",
        "ofns_desc": "HARRASSMENT 2",
        "parks_nm": "NA",
        "patrol_boro": "PATROL BORO BRONX",
        "pd_cd": "638",
        "pd_desc": "HARASSMENT,SUBD 3,4,5",
        "prem_typ_desc": "RESIDENCE - APT. HOUSE",
        "rpt_dt": "2006-08-30T00:00:00.000",
        "susp_race": "UNKNOWN",
        "susp_sex": "M",
        "vic_age_group": "25-44",
        "vic_race": "BLACK HISPANIC",
        "vic_sex": "F",
        "x_coord_cd": "1018029",
        "y_coord_cd": "240747"
    };      

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
    // let overlay = new google.maps.OverlayView();
    
    
    // let bound = new google.maps.LatLngBounds();
    let samp_data = {"KMAE":[40.7128,-73.935242,"MADERA MUNICIPAL AIRPORT",[26,1,2,5,6,3,2,1,2,7,29,12,3]],
    "KSJC":[40.7122,-73.935244,"SAN JOSE INTERNATIONAL  AIRPORT",[28,1,1,1,6,10,5,3,2,4,14,21,7]]};
    
    
   d3.json('../data/crime_detail.json').then(function (data, error) {

    let crimeCoords = {};

    let selector = document.getElementById("selector");
    let selected = selector.options[selector.selectedIndex].value;
    // debugger
    if (selected === 'Bronx') {
     
        alert('hello');
    }

    function selected1() {
        console.log('hello')
    }
    for (let i = 0; i < data.length; i++) {
        if (!data[i].lat_lon) {
            continue;
        }
        
        // crimeCoords.push(data[i].lat_lon.coordinates);

            crimeCoords[i] = data[i].lat_lon.coordinates;
            crimeCoords[i].push({boro_nm: data[i].boro_nm});
        // debugger
    }

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