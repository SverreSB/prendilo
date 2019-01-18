/******************************


    File for index.html
    This file contains functions that handles the user interaction
    with the route the frontpage of the website


 ******************************/


import {routes} from '../helpers/post.js';
import {redirect} from '../helpers/redirect.js';


window.onload = initialize;


function initialize() {
	document.querySelector('#btnLogin').addEventListener('click', login);
	document.querySelector('#btnPost').addEventListener('click', post);
	document.querySelector('#btnLogout').addEventListener('click', logout);
	document.querySelector('#btnFind').addEventListener('click', find)
}


/**
 * 	Function for posting a request through api/login.
		Takes the values from inputfields and passing it along
		with the url to api/login in function postData(a helper function).
 */
function login() {
	const input = Array.from(document.querySelectorAll('input'));
	const email = input[0].value;
	const password = input[1].value;

	routes.postLogin('http://localhost:3000/api/login', { email, password})
  		.then(data => console.log(JSON.stringify(data)))
  		.catch(error => console.error(error));
};


/**
 * 	Function for logging out users
		Clears local storrage so token given at login is removed.
 */
function logout(){
	localStorage.clear();
}


/**
 * 	Functions for redirecting to different routes
 */
function post(){
	redirect.redir('api/postFood/redirect');
}

function find(){
	redirect.redir('api/findFood/redirect');
}
