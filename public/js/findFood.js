
window.onload = initialize;

function initialize() {
	document.querySelector('#btnFind').addEventListener('click', sendRequest);
}

async function sendRequest(){
    const response = await getFood('http://localhost:3000/api/findFood');   
    console.log(response);
}

async function getFood(url){
    const response = await fetch(url, {
		method: "GET", 
		headers: {
			"Content-Type": "application/json",
			//"Authorization": "Bearer " + localStorage.getItem('token')
		},
    });	
	return response;
}