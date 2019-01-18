/******************************


	Helper file for get request through api's


 ******************************/


export const routes = {
    getData
}


/**
 * 	Function for get requests without passing data
 
 * 	@param {String} url 
 */
async function getData(url){
    const response = await fetch(url, {
		method: "GET", 
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem('token')
		}
    });	
	return response;
}