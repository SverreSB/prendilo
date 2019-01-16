export const redirect = {
	redir
}
import {routes} from '../helpers/post.js';

async function redir(path){
    //const response = await routes.postUrl('http://localhost:3000/api/findFood/redirect');
    const response = await routes.postUrl(`http://localhost:3000/${path}`);
	if(response.status === 200){
		window.location.href = response.url;
	}
}