import React from "react";


export const loginReducer = (prevState, action)=>{
	switch (action.type) {
		case 'get_token':
			return {
				...prevState,
				userToken: action.token,
				isLoading: false
			};
		case 'login':
			return {
				...prevState,
				userMail: action.mail,
				userToken: action.token,
				isLoading: false
			};
		case 'logout':
			return {
				...prevState,
				userToken: null,
				isLoading: false
			};
		case 'signup':
			return {
				...prevState,
				userMail: action.mail,
				userToken: action.token,
				isLoading: false
			};
		default:
			break;
	}
};

export const initialState = {
	userName: '',
	userToken: null,
	isLoading: true
}

