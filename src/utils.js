

export const crimeCoords = (data, filterBy) => {
    let crimeCoords = {};
   
    for (let i = 0; i < data.length; i++) {
        if (!data[i].lat_lon) {
            continue;
        }
        
        // crimeCoords.push(data[i].lat_lon.coordinates);
        if (filterBy) {
            // debugger
            if (
                data[i].lat_lon.coordinates[1] > filterBy.southWest.lat &&
                data[i].lat_lon.coordinates[0] > filterBy.southWest.lng && 
                data[i].lat_lon.coordinates[1] < filterBy.northEast.lat &&
                data[i].lat_lon.coordinates[0] < filterBy.northEast.lng 
                ) {
                crimeCoords[i] = data[i].lat_lon.coordinates;
                crimeCoords[i].push({
                    boro_nm: data[i].boro_nm, 
                    date: data[i].rpt_dt, 
                    offenseDescription: data[i].ofns_desc,
                    policeDescription: data[i].pd_desc,
                    complaintTime: data[i].cmplnt_fr_tm,
                    violationType: data[i].law_cat_cd,
                    
                });
            }
        } else {

            crimeCoords[i] = data[i].lat_lon.coordinates;
            crimeCoords[i].push({
                boro_nm: data[i].boro_nm, 
                date: data[i].rpt_dt, 
                offenseDescription: data[i].ofns_desc,
                policeDescription: data[i].pd_desc,
                complaintTime: data[i].cmplnt_fr_tm,
                violationType: data[i].law_cat_cd,
                
            });
        }
            
        // debugger
    }

    return crimeCoords;
};