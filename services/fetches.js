const url = 'localhost:3000';

export const getUserInfo = async ()=>{
	let response = await fetch(url+'/', {
		method: 'POST',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  firstParam: 'yourValue'
		})
	 });
	 let json = await response.json();
	 return json;
}

export const login = async (mail, pass)=>{
	try {
		let response = await fetch(url+'/login', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  email: mail,
			  password: pass
			})
		 });
		 let json = await response.json();
		 console.log(json);
		 return json;
	} catch (error) {
		console.log(error);
	}
	
}