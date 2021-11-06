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
	  console.log('Rechazo de login->'+error);
	  return null;
	}
 };
 export const signup = async (mail, pass, userName) => {
	try {
	  let response = await fetch(url + '/signup', {
		 method: 'POST',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({
			email: mail,
			password: pass,
			name: userName
		 }),
	  });
	  let json = await response.json();
	  console.log('Serv token->'+json.token);
	  return json.token;
	} catch (error) {
		console.log('Rechazo->'+error);
	  return null;
	}
 };
 export const getUserInfo = async (token) => {
	try {
	  let response = await fetch(url + '/myinfo', {
		 method: 'GET',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 },
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
		console.log('Rechazo->'+error);
	  return null;
	}
 };
 export const updateUserInfo = async (token, newUser) => {
	try {
	  let response = await fetch(url + '/user/update', {
		 method: 'POST',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			user: newUser
		 })
	  });
	  let json = await response.json();
	  return json.user;
	} catch (error) {
		console.log('Rechazo->'+error);
	  return null;
	}
 };
 export const updateUserIMC = async (token, imc) => {
	try {
	  let response = await fetch(url + '/user/updateIMC', {
		 method: 'POST',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			imc: imc
		 })
	  });
	  let json = await response.json();
	  return json.user;
	} catch (error) {
		console.log('Rechazo->'+error);
	  return null;
	}
 };
 export const updateUserGoals = async (token, goals) => {
	try {
	  let response = await fetch(url + '/user/updateGoal', {
		 method: 'POST',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			goal: goals
		 })
	  });
	  let json = await response.json();
	  return json.user;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };