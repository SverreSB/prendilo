export const routes = {
    getData
}

async function getData(url){
    const response = await fetch(url, {
		method: "GET", 
		headers: {
			"Content-Type": "application/json",
		}
    });	
	return response;
}