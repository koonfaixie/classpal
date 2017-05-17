import jwtDecode from 'jwt-decode';
import { setCookie } from '../components/functions/CookieFunctions.js'

export default function reducer(state={
	initial_check: false,
	fetching_login: false,
	fetched_login: false,
	fetching_verify: false,
	fetched_verify: false,
	fetching_register: false,
	fetched_register: false,
	fetching_user_info: false,
	fetched_user_info: false,
	jwt: '',
	username: '',
	first_name: '',
	last_name: '',
	email: '',
	groups: [],
	announcements: [],
	assignments: {},
	assignments_answers: {},
	practices: {},
	practices_answers: {},
	topics: {},
	settings: '',
	peers: [],
	register_error_message: '',
	chat_notifications_on: false,
	portal_hide: false,
	fetching_password_reset: false,
	fetched_password_reset: false,
	}, action) {
	
	switch (action.type) {
		case "INITIAL_CHECK_OK": {
			return Object.assign({}, state, {initial_check: true})
			break;
		}
		case "LOGIN_USER_PENDING": {
			return Object.assign({}, state, {fetching_login: true})
			break;
		}
		case "LOGIN_USER_REJECTED": {
			return Object.assign({}, state, {fetching_login: false, jwt: '', username: '', initial_check: true})
			break;
		}
		case "LOGIN_USER_FULFILLED": {
			let _jwt = action.payload.data.token;
			let _dataDecoded = jwtDecode(_jwt);
			let _username = _dataDecoded.username;
			setCookie('jwt', _jwt, 1);
			return Object.assign(
				{}, 
				state, 
				{fetching_login: false, fetched_login: true, jwt: _jwt, username: _username, initial_check: true}
				)
			break;
		}
		case "OBTAIN_USER_INFO_PENDING": {
			return Object.assign({}, state, {fetching_user_info: true})
			break;			
		}
		case "OBTAIN_USER_INFO_REJECTED": {
			return Object.assign({}, state, {fetching_user_info: false})
			break;			
		}
		case "OBTAIN_USER_INFO_FULFILLED": {
			var assignments_list = {}
			action.payload.data.groups[0].assignments.map((assignment) => (
				assignments_list[assignment.id] = assignment.problems
				))
			var practices_list =  {}
			action.payload.data.groups[0].practices.map((practice) => (
				practices_list[practice.id] = practice.problems
				))
			var topics_list = {}
			action.payload.data.groups[0].topics.map((topic) => (
				topics_list[topic.id] = topic.name
				))
			var user_id = action.payload.data.id
			return Object.assign(
				{}, 
				state, 
				{
					fetching_user_info: false, 
					fetched_user_info: true,
					user_id: user_id,
					first_name: action.payload.data.first_name,
					last_name: action.payload.data.last_name,
					email: action.payload.data.email,
					groups: action.payload.data.groups,
					announcements: action.payload.data.groups[0].announcements,
					assignments: assignments_list,
					topics: topics_list,
					practices: practices_list,
					settings: action.payload.data.settings[0],
					peers: action.payload.data.peers,
				}
			)
			break;			
		}
		case "VERIFY_USER_PENDING": {
			return Object.assign({}, state, {fetching_verify: true, })
			break;
		}
		case "VERIFY_USER_REJECTED": {
			setCookie('jwt', '', -1);
			return Object.assign({}, state, {fetching_verify: false, initial_check: true, jwt: '', username: ''})
			break;
		}
		case "VERIFY_USER_FULFILLED": {
			let _jwt = action.payload.data.token;
			let _dataDecoded = jwtDecode(_jwt);
			let _username = _dataDecoded.username;
			setCookie('jwt', _jwt, 1);
			return Object.assign(
				{},
				state,
				{fetching_verify: false, fetched_verify: true, initial_check: true, jwt: _jwt, username: _username}
				)
			break;
		}
		case "REGISTER_USER_PENDING": {
			return Object.assign({}, state, {fetching_register: true})
			break;
		}
		case "REGISTER_USER_REJECTED": {
			return Object.assign({}, state, {fetching_register: false})
			break;
		}
		case "REGISTER_USER_FULFILLED": {
			return Object.assign(
				{},
				state,
				{fetching_register: false, fetched_register: true}
				)
			break;
		}
		case "REGISTER_ERROR": {
			return Object.assign({}, state, {register_error_message: action.payload})
			break;
		}
		case "TOGGLE_PORTAL": {
			return Object.assign({}, state, {portal_hide: !state.portal_hide})
			break;
		}
		case "LOGOUT": {
			return Object.assign({}, state, {
				initial_check: true,
				fetching_login: false,
				fetched_login: false,
				fetching_verify: false,
				fetched_verify: false,
				fetching_register: false,
				fetched_register: false,
				fetching_user_info: false,
				fetched_user_info: false,
				jwt: '',
				username: '',
				first_name: '',
				last_name: '',
				email: '',
				groups: [],
				announcements: [],
				assignments: {},
				assignments_answers: {},
				practices: {},
				practices_answers: {},
				topics: {},
				settings: '',
				peers: [],
				register_error_message: '',
				chat_notifications_on: false,
				portal_hide: false,
				fetching_password_reset: false,
				fetched_password_reset: false,
			})			
			break;
		}
		case "RESET_PASSWORD_PENDING": {
			return Object.assign({}, state, {fetching_password_reset: true})
			break;
		}
		case "RESET_PASSWORD_REJECTED": {
			return Object.assign({}, state, {fetching_password_reset: false})
			break;
		}
		case "RESET_PASSWORD_FULFILLED": {
			return Object.assign({}, state, {fetching_password_reset: false, fetched_password_reset: true})
			break;
		}
	}
	return state;
};