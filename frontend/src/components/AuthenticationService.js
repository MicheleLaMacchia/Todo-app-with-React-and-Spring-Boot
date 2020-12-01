import Axios from "axios";
import {API_URL} from '../Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

// per passare alla BasicAuth bisogna spostare il package in Java della classe SpringSecurityBasicAuth.java
//  e metterla sopra a tutti i package altrimenti non viene scannerizzata da spring

const createBasicAuthToken = (username,password) => {
    return 'Basic '+ window.btoa(username + ":" + password);
}

const createJwtToken = (token) => {
    return 'Bearer '+ token;
}

export const executeBasicAuthenticationService = (username,password) => {
    return Axios.get(`${API_URL}/basicauth`, {
        headers: {authorization: createBasicAuthToken(username,password)}
    })
};

export const executeJwtAuthenticationService = (username,password) => {
    return Axios.post(`${API_URL}/authenticate`,{
        username, 
        password
    })
};

export const registerSuccesfulLogin = (username, password) => {
    console.log('registerSuccesfulLogin');
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    setupAxiosInterceptors(createBasicAuthToken(username,password));
};

export const JwtregisterSuccesfulLogin = (username, token) => {
    console.log('registerSuccesfulLogin');
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    setupAxiosInterceptors(createJwtToken(token));
};

export const getUserLoggedIn = () => {
    return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
};

export const logout = () => {
    console.log('logout completed');
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
};

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user) {return true} else {return false}
};

const setupAxiosInterceptors = (basicAuthHeader) => {
        Axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn){
                config.headers.authorization = basicAuthHeader
            }
            return config;
        })
};

 