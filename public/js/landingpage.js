import {routes} from '../helpers/post.js';
import {redirect} from '../helpers/redirect.js';

window.onload = initialize;

function initialize() {
    // get button
	document.querySelector('#btnLogin').addEventListener('click', login);
	document.querySelector('#btnPost').addEventListener('click', post);
	document.querySelector('#btnLogout').addEventListener('click', logout);
	document.querySelector('#btnFind').addEventListener('click', find)
}


/**
 * 	Function for posting a request through api/login
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
 * Function for redirecting to different routes
 */
function post(){
	redirect.redir('api/postFood/redirect');
}

function find(){
	redirect.redir('api/findFood/redirect');
}


function logout(){
	localStorage.clear();
}