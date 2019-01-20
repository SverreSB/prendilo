/******************************


    File for findFood.html
    This file contains functions that handles the user interaction
    with the route for finding food.


 ******************************/


import {routes} from '../helpers/get.js';



window.onload = initialize;


function initialize() {

    loadUser();
    document.querySelector('#btnFood').addEventListener('click', myFood);
    

}


/**
 *  Finding username and email to dispaly when going to my account
 */
async function loadUser(){
    const response = await routes.getData('http://localhost:3000/api/account'); 
    const data = await response.json();
    
    const username = document.createElement('h3');
    const info = document.createElement('p');
    username.innerHTML = `${data.name}`;
    info.innerHTML = `Email: ${data.email} <br>
                    Phone: ${data.phone} `;	
    document.body.appendChild(username);
    document.body.appendChild(info);
}

async function myFood(){
    const response = await routes.getData('http://localhost:3000/api/account/food'); 
    const data = await response.json();
    
    const foodTag = document.createElement('p');
    data.forEach(food => {
        foodTag.innerHTML = `${food.name}`
        
    }) 
    document.body.appendChild(foodTag);
    

}
