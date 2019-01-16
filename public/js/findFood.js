import {routes} from '../helpers/get.js'
window.onload = initialize;


function initialize() {
	document.querySelector('#btnFind').addEventListener('click', sendRequest);
}


async function sendRequest(){
    const response = await routes.getData('http://localhost:3000/api/findFood'); 
    
	const data = await response.json();
	
	const printaAble = makeString(data);

	document.getElementById('test').innerHTML = printaAble;
}

function makeString(data){
	var string = "";
	for(let i = 0; i < data.length; i++){
		string += data[i].name;
		string += ", ";
	}

	return string;
}
