window.onload = initialize;

function initialize() {
    // get button
	document.querySelector('#btnLogin').addEventListener('click', login);
	document.querySelector('#btnConfirmation').addEventListener('click', isLoggedIn);
}


/**
 * 	Function for posting a request through api/login
 */
function login() {
	const input = Array.from(document.querySelectorAll('input'));
	const email = input[0].value;
	const password = input[1].value; 

	postData('http://localhost:3000/api/login', { email, password})
  		.then(data => console.log(JSON.stringify(data)))
  		.catch(error => console.error(error));
};


/**
 * 	Function for posting data through an api
 * 	@param {String} url 
 * 	@param {json} data 
 */
async function postData(url, data) {
	const response = await fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	});

	const jsonRes = await response.json();
	const token = jsonRes.token;

	localStorage.setItem("token", token);

	return response;
	
	
}


async function isLoggedIn(){
	let bool = false;
	const token = localStorage.getItem('token');
	
	const response = await postData('http://localhost:3000/api/postFood', {token});

	console.log(response);
	if(response.status === 200){
		bool = true
	}
	
	document.getElementById('isLoggedIn').innerHTML = bool;	
}