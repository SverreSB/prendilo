export const routes = {
    postData
}
/**
 * 	Function for posting data through an api
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