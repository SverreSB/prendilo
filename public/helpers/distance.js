/******************************


    Helper file for finding distance between user and food


 ******************************/


export const distance = {
    getDistance
}


/**
 *  Function to calculate distance between two coordinates using latidude and longitude
 *  Author: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong
 *  @param {number} lat
 *  @param {number} lon 
 */
function getDistance(lat1,lon1,lat2,lon2) {
	const R = 6371; //Radius of earth in km
	
    const dLat = deg2rad(lat2-lat1);  
	const dLon = deg2rad(lon2-lon1); 
	
    const a = 
      	Math.sin(dLat/2) * Math.sin(dLat/2) +
      	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    d = Math.ceil(d);
    return d;
}


/**
 *  Helper function for getDistance
        Calculates the radian from degrees given.
 *  @param {number} deg 
 */
function deg2rad(deg) {
    return deg * (Math.PI/180)
}