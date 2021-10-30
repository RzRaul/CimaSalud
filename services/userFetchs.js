import {url} from './jsonServer';
//User manager
export const login = async (mail, pass) => {
	try {
	  let response = await fetch(url + '/login', {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({
			email: mail,
			password: pass,
		 }),
	  });
	  let json = await response.json();
	  return json.token;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };
 export const signup = async (mail, pass, userName) => {
	try {
	  let response = await fetch(url + '/signup', {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({
			email: mail,
			password: pass,
			name: userName
		 }),
	  });
	  let json = await response.json();
	  return json.token;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };
 export const getUserInfo = async (token) => {
	try {
	  let response = await fetch(url + '/myinfo', {
		 method: 'GET',
		 headers: {
			Authorization: 'Bearer ' + token,
		 },
	  });
	  let json = await response.json();
	  return json.user;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };
 export const updateUserInfo = async (token, newUser) => {
	try {
	  let response = await fetch(url + '/user/update', {
		 method: 'GET',
		 headers: {
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify(
			newUser
		 )
	  });
	  let json = await response.json();
	  return json.user;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };