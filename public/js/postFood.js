

window.onload = initialize;

function initialize() {
	document.querySelector('#btnPost').addEventListener('click', sendRequest);
}


function sendRequest(){
    const values = getValues();

    const name = values[0].value;
    const type = values[1].value;

    postData('http://localhost:3000/api/postFood', {
        name,
        type
    });
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


function getValues(){
    const input = Array.from(document.querySelectorAll('input'));
    return input;
}