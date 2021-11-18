import React from "react";
import { ActionSheetIOS } from "react-native";


export const loginReducer = (prevState, action)=>{
	switch (action.type) {
		case 'get_token':
			return {
				...prevState,
				userToken: action.userToken,
				isLoading: false
			};
		case 'login':
			return {
				...prevState,
				userMail: action.userMail,
				userName: action.userName,
				userToken: action.userToken,
				metas: action.metas,
				isLoading: false
			};
		case 'logout':
			return {
				...prevState,
				userToken: null,
				userName: '',
				userMail:'',
				metas: null,
				isLoading: false
			};
		case 'signup':
			return {
				...prevState,
				userMail: action.userMail,
				userName: action.userName,
				userToken: action.userToken,
				metas: action.metas,
				isLoading: false
			};
		case 'updateMetas':
				return {
					...prevState,
					metas: action.metas
				};
		default:
			break;
	}
};

export const initialState = {
	userName: '',
	userMail:'',
	userToken: null,
	isLoading: true,
	metas:null
}

