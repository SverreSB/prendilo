import {routes} from '../helpers/post.js'

window.onload = initialize;

function initialize() {
	document.querySelector('#btnPost').addEventListener('click', sendRequest);
}


function sendRequest(){
    const values = getValues();

    const name = values[0].value;
    const type = values[1].value;

    routes.postData('http://localhost:3000/api/postFood', {
        name,
        type
    });
}


function getValues(){
    const input = Array.from(document.querySelectorAll('input'));
    return input;
}