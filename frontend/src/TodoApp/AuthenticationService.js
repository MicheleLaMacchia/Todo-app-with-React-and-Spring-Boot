import Axios from "axios";
import {API_URL} from '../Constants';

export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser';
export const TOKEN_SESSION_ATTRIBUTE = 'userToken';

    export const createJwtToken = (token) => {
        const sessionToken = 'Bearer '+token;
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE, sessionToken)
        return sessionToken;
    }

    export const executeJwtAuthenticationService = (username, password) => {
        return Axios.post(`${API_URL}/authenticate`,
            {username,password})
    }

    export const registerSuccesfulLoginForJwt = (username, token) => {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username)
        createJwtToken(token);
        setupAxiosInterceptors();
    }

    export const logout = () => {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE)
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE)
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

    export const setupAxiosInterceptors = () => {
        Axios.interceptors.request.use(
            (config) => {
                if(isUserLoggedIn()){
                    config.headers.authorization = sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE);
                }
                return config;
            } 
        )
    }
    