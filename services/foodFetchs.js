//const url = 'localhost:3000';
import {url} from './jsonServer'


//Food managers.------------------------------------------------
export const getFoodAll = async (token) => {
  try {
    let response = await fetch(url + '/food/all', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getFoodByCode = async (token, code) => {
  try {
    let response = await fetch(url + '/food/barcode/'+code, {
      method: 'GET',
      headers: {
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
export const getFoodByName = async (token, name) => {
  try {
    let response = await fetch(url + '/food/name/'+name, {
      method: 'GET',
      headers: {
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
export const getFoodByCals = async (token, calNum) => {
  try {
    let response = await fetch(url + '/food/cals/'+calNum, {
      method: 'GET',
      headers: {
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
export const getFoodByType = async (token, typeName) => {
  try {
    let response = await fetch(url + '/food/type/'+typeName, {
      method: 'GET',
      headers: {
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

export const updateFoodByName = async (token, newFood) => {
  try {
    let response = await fetch(url + '/food/update', {
      method: 'POST',
      mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
		body: JSON.stringify({
			name: newFood.name,
			cals: newFood.cals,
			type: newFood.type
		 })
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFoodByName = async (token, newFood) => {
	try {
	  let response = await fetch(url + '/food/delete', {
		 method: 'POST',
		 mode: "cors", // or without this line
    	redirect: 'follow',
    	headers: {
        'content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		 },
		 body: JSON.stringify({
			 name: newFood.name,
			 cals: newFood.cals,
			 type: newFood.type
		  })
	  });
	  let json = await response.json();
	  return json;
	} catch (error) {
	  console.log(error);
	  return null;
	}
 };
