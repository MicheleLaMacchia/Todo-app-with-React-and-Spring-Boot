const AuthenticationService = () => {

    return ( <div></div> );
}

export const registerSuccesfulLogin = (username, password) => {
    console.log('registerSuccesfulLogin');
    sessionStorage.setItem('authenticatedUser', username);
};

export const getUserLoggedIn = () => {
    return sessionStorage.getItem('authenticatedUser');
};

export const logout = () => {
    console.log('logout completed');
    sessionStorage.removeItem('authenticatedUser');
};

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user) {return true} else {return false}
};

export default AuthenticationService;
 