import Axios from "axios";
import {API_URL} from '../Constants';

export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser';

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username +':'+password);
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    executeJwtAuthenticationService(username, password) {
        return Axios.post(`${API_URL}/authenticate`,
            {username,password})
    }

    registerSuccesfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccesfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username)
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if (user === null) {
            return '';
        } else {
            return user;
        } 
    }

    setupAxiosInterceptors(token) {
        Axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            } 
        )
    }

}

export default new AuthenticationService();