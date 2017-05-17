import { setCookie } from "../components/functions/CookieFunctions.js";
import store from "../store.js";
import axios from 'axios';

export function login(val) {
    store.dispatch({type: "LOGIN_USER", payload: axios.post("/api-token-auth/", val) }).then((response) => {
        axios.defaults.headers.common["Authorization"] = " JWT "+response.value.data.token;
        store.dispatch({type: "OBTAIN_USER_INFO", payload: axios.get("/user_api/") })
    })
}

export function logout() {
	setCookie('jwt', '', -1)
	store.dispatch({type: 'LOGOUT', payload: {username: '', jwt: ''}})
}


export function verifyToken(jwt) {
	const data = {token: jwt};
    store.dispatch({type: 'VERIFY_USER', payload: axios.post("/api-token-verify/", data)}).then((response) => {
        axios.defaults.headers.common["Authorization"] = " JWT "+response.value.data.token;
        store.dispatch({type: "OBTAIN_USER_INFO", payload: axios.get("/user_api/")})
    })
}
