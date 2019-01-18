/******************************


	Helper file for post requests through api's


 ******************************/


export const routes = {
	postData,
	postLogin,
	postUrl
}


/**
 * 	Function for posting data through an api
		Passing jw-token in header.

 * 	@param {String} url 
 * 	@param {json} data 
 */
async function postData(url, data) {
	const response = await fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem('token')
		},
		body: JSON.stringify(data)
	});	
	return response;	
}


/**
 * 	Function for posting data through an api to log user into account
		Takes the response and creates a json.
		Then takes the token from the json and store it in local storrage as token

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


/**
 * 	Functiong for post request without passing data
		Function is used for redirecting when authorization is neccesary

 * 	@param {String} url 
 */
async function postUrl(url){
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem('token') 
		}
	});

	return response;
}
