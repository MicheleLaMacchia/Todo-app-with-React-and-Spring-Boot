import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

class AuthenticatedRoute extends Component {
    render() { 
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
           return <Redirect to="/login"/> 
        }
    }
}
 
export default AuthenticatedRoute;