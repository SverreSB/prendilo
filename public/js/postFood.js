/******************************


    File for postFood.html
    This file contains functions that handles the user interaction
    with the route for posting food.


 ******************************/


import {routes} from '../helpers/post.js';


window.onload = initialize;


function initialize() {
	document.querySelector('#btnPost').addEventListener('click', sendRequest);
}


/**
 *  Function for sending a request to api/postFood. 
        Calling getValues to fetch and return the user inputs.
        Using function from ../helpers/routes to post the data.
        Passing url and values found in input fields.
 */
function sendRequest(){
    const values = getValues();

    const name = values[0].value;
    const type = values[1].value;
    /*const lat = values[2].value;
    const long = values[3].value;*/

    routes.postData('http://localhost:3000/api/postFood', {
        name,
        type
        /*lat,
        long*/
    });
}


/**
 *  Gets values from input fields and returns the values to caller.
 */
function getValues(){
    const input = Array.from(document.querySelectorAll('input'));
    return input;
}