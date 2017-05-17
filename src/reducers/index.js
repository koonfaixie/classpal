import { combineReducers } from "redux";
import { combineForms } from 'react-redux-form';

import userReducer from "./userReducer.js"
import chatReducer from "./chatReducer.js"
import assignmentReducer from "./assignmentReducer.js"
import practiceReducer from "./practiceReducer.js"
import forumReducer from "./forumReducer.js"


export default combineReducers({
	form: combineForms({
  		login: {username: '', password: ''},
  		register: {register_code: '', username: '', first_name: '', last_name: '', email_address: '', password: '', password_confirm: ''},
	}), 
	account: userReducer,
	assignment: assignmentReducer,
	practice: practiceReducer,
	forum: forumReducer,
	chat: chatReducer,
})