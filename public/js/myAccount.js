/******************************


    File for findFood.html
    This file contains functions that handles the user interaction
    with the route for finding food.


 ******************************/


import {routes} from '../helpers/get.js';



window.onload = initialize;


function initialize() {

    sendRequest();

}

async function sendRequest(){
    const response = await routes.getData('http://localhost:3000/api/account'); 
    const data = await response.json();
    
    const username = document.createElement('h5');
    const email = document.createElement('p');
    username.innerHTML = `${data.name}`;
    email.innerHTML = `${data.email}`;	
    document.body.appendChild(username);
    document.body.appendChild(email);
}