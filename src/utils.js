

export const crimeCoords = (data, filterBy) => {
    let crimeCoords = {};
   
    for (let i = 0; i < data.length; i++) {
        if (!data[i].lat_lon) {
            continue;
        }
        if (filterBy) {
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
                    premierDescription: data[i].prem_typ_desc,
                    occurenceLocDescription: data[i].loc_of_occur_desc
                    
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
                premierDescription: data[i].prem_typ_desc,
                occurenceLocDescription: data[i].loc_of_occur_desc
            });
        }
    }

    return crimeCoords;
};