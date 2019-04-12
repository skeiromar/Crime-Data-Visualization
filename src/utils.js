

export const crimeCoords = (data) => {
    let crimeCoords = {};
   
    for (let i = 0; i < data.length; i++) {
        if (!data[i].lat_lon) {
            continue;
        }
        
        // crimeCoords.push(data[i].lat_lon.coordinates);

            crimeCoords[i] = data[i].lat_lon.coordinates;
            crimeCoords[i].push({
                boro_nm: data[i].boro_nm, 
                date: data[i].rpt_dt, 
                offenseDescription: data[i].ofns_desc,
                policeDescription: data[i].pd_desc.toLowerCase(),
                complaintTime: data[i].cmplnt_fr_tm,
                violationType: data[i].law_cat_cd,
                
            });
            
        // debugger
    }

    return crimeCoords;
};