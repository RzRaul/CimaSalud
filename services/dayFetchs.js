import { url } from "./jsonServer";

export const getMyDays = async (token) => {
	try {
	  let response = await fetch(url + '/days', {
		 method: 'GET',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 }
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const getDayByDate = async (token, fecha) => {
	try {
	  let response = await fetch(url + '/days/date/'+fecha, {
		 method: 'GET',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 }
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const getWeekByDate = async (token, fecha) => {
	try {
	  let response = await fetch(url + '/days/week/'+fecha, {
		 method: 'GET',
		 headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 }
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const postDay = async (token, day) => {
	try {
	  let response = await fetch(url + '/days', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify(day)
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const updateDayBreakFast = async (token, fecha, foodId, type='add') => {
	try {
	  let response = await fetch(url + '/days/updateBreakFast', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			fecha,
			type,
			desayuno:foodId
		 }),
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const updateDayLunch = async (token, fecha, foodId, type='add') => {
	try {
	  let response = await fetch(url + '/days/updateLunch', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			fecha,
			type,
			almuerzo:foodId
		 }),
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const updateDayDinner = async (token, fecha, foodId, type='add') => {
	try {
	  let response = await fetch(url + '/days/updateDinner', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			fecha,
			type,
			cena:foodId
		 }),
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };

 export const updateDaySnacks = async (token, fecha, foodId, type='add') => {
	try {
	  let response = await fetch(url + '/days/updateSnacks', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			fecha,
			type,
			snacks: foodId
		 }),
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };