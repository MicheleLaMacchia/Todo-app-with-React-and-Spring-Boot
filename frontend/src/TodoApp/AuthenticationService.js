import Axios from "axios";
import {API_URL} from '../Constants';

export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser';

    export const createJwtToken = (token) => {
        return 'Bearer ' + token;
    }

    export const executeJwtAuthenticationService = (username, password) => {
        return Axios.post(`${API_URL}/authenticate`,
            {username,password})
    }

    export const registerSuccesfulLoginForJwt = (username, token) => {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username)
        setupAxiosInterceptors(createJwtToken(token));
    }

    export const logout = () => {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE)
    }

    export const isUserLoggedIn = () => {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    export const getLoggedInUsername = () => {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) {
            return '';
        } else {
            return user;
        } 
    }

    export const setupAxiosInterceptors = (token) => {
        Axios.interceptors.request.use(
            (config) => {
                if(isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            } 
        )
    }
    