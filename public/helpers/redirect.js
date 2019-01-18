/******************************


    Helper file for redirecting user to a different route


 ******************************/


export const redirect = {
	redir
}


import {routes} from '../helpers/post.js';


/**
 * Function for redirecting the user to the path that is beeing passed in
 * @param {String} path 
 */
async function redir(path){
    //const response = await routes.postUrl('http://localhost:3000/api/findFood/redirect');
    const response = await routes.postUrl(`http://localhost:3000/${path}`);
	if(response.status === 200){
		window.location.href = response.url;
	}
}