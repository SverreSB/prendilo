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
		body: JSON.stringify(data)
	});

	const jsonRes = await response.json();
	const token = jsonRes.token;
	localStorage.setItem("token", token);
	
	return response;	
}


exports.postData = postData;