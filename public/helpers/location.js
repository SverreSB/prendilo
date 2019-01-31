export const location = {
	getLocation
}

//Function for getting location from browser. This is called when html for findFood is loaded
function getLocation(userCoords) {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userCoords.lat = position.coords.latitude;
			userCoords.long = position.coords.longitude;
		});	
	}
	else[
		console.log("Geolocation not supported")
	]
}