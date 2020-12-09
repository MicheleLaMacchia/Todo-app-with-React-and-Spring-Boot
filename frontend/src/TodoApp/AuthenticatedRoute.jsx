import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {isUserLoggedIn} from './AuthenticationService';

const AuthenticatedRoute = () => {
    if (isUserLoggedIn()) {
        return <Route {...this.props}/>
    } else {
       return <Redirect to="/login"/> 
    }
}
 
export default AuthenticatedRoute;