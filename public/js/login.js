window.onload = initialize;

function initialize() {
    // get button
	document.querySelector('#btnLogin').addEventListener('click', login);
	document.querySelector('#btnConfirmation').addEventListener('click', isLoggedIn);
	document.querySelector('#btnLogout').addEventListener('click', logout);
}


/**
 * 	Function for posting a request through api/login
 */
function login() {
	const input = Array.from(document.querySelectorAll('input'));
	const email = input[0].value;
	const password = input[1].value; 

	postLogin('http://localhost:3000/api/login', { email, password})
  		.then(data => console.log(JSON.stringify(data)))
  		.catch(error => console.error(error));
};


/**
 * 	Function for posting data through an api
 * 	@param {String} url 
 * 	@param {json} data 
 */
async function postLogin(url, data) {
	const response = await fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	const jsonRes = await response.json();
	const token = jsonRes.token;
	localStorage.setItem("token", token);
	
	return response;	
}


async function postData(url){
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem('token') 
		}
	});

	return response;
}


/**
 * 	Test function to see if user is logged in
 */
async function isLoggedIn(){
	const response = await postData('http://localhost:3000/api/postFood/redirect');
	
	if(response.status === 200){
		window.location.href = response.url;	
	}
}


function logout(){
	localStorage.clear();
}