/******************************


    File for findFood.html
    This file contains functions that handles the user interaction
    with the route for finding food.


 ******************************/


import {routes} from '../helpers/get.js'
import {distance} from '../helpers/distance.js';


window.onload = initialize;


function initialize() {
	document.querySelector('#btnFind').addEventListener('click', sendRequest);
}


/**
 * 	Function for sending a get request to find food
		Calling function getData and passing url for rout findFood.
		Then uses the response to get the data from the json file that is beeing returned.
		Passes the data to print out every food
 */
async function sendRequest(){
    const response = await routes.getData('http://localhost:3000/api/findFood'); 
	const data = await response.json();

	createFoodList(data);
}


/**
 * 	Function for printing out all the food items.
		Gets the food items as paramater,
		createing an html tag and fills the tag with
		food for each food element. 

 * 	Author: Sander Hellesø. Shoutout.
 * 	Github: https://github.com/sanderhelleso
 * 	@param {String} data 
 */
function createFoodList(data){
	const food = data[0];
	const user = data[1];
	food.forEach(food => {
		const foodName = document.createElement('h5');
		//Making the text clickable.
		/*foodName.addEventListener('click', () => {
			window.location.href = `/foods/${food._id}`;
		});*/
		//const distance = getDistanceFromLatLonInKm(food.lat, food.long, user.lat, user.long);
		const dist = distance.getDistance(food.lat, food.long, user.lat, user.long);
		if(dist <= 5){
			foodName.innerHTML = `${food.name}. Less than ${dist} km`;
			document.body.appendChild(foodName);
		}
		
	});
}


/*function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	
    var a = 
      	Math.sin(dLat/2) * Math.sin(dLat/2) +
      	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}*/
