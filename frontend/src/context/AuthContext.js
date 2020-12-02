import Axios from "axios";
import React, { createContext } from "react";
import {API_URL, USER_NAME_SESSION_ATTRIBUTE_NAME} from '../Constants';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const createJwtToken = (token) => {
        return 'Bearer '+ token;
    }

    const executeJwtAuthenticationService = (username,password) => {
        return Axios.post(`${API_URL}/authenticate`,{
            username, 
            password
        })
    };

    const JwtregisterSuccesfulLogin = (username, token) => {
        console.log('registerSuccesfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        setupAxiosInterceptors(createJwtToken(token));
    };

    const getUserLoggedIn = () => {
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    };

    const logout = () => {
        console.log('logout completed');
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    };

    const isUserLoggedIn = () => {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user) {
            return true
        } else {
            return false
        }
    };

    const setupAxiosInterceptors = (basicAuthHeader) => {
            Axios.interceptors.request.use((config) => {
                if (isUserLoggedIn){
                    config.headers.authorization = basicAuthHeader
                }
                return config;
            })
    };

    return ( 
        <AuthContext.Provider value={{executeJwtAuthenticationService, JwtregisterSuccesfulLogin, 
                                      getUserLoggedIn, logout, isUserLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContextProvider; 