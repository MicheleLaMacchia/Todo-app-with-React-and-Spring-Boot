import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {isUserLoggedIn} from './AuthenticationService';

const AuthenticatedRoute = (props) => {

    if (isUserLoggedIn()) {
        return <Route {...props}/>
    } else {
       return <Redirect to="/login"/> 
    }
}
 
export default AuthenticatedRoute;