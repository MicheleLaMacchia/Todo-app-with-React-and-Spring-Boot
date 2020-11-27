import React from 'react';
import {Link} from 'react-router-dom';
import { getUserLoggedIn } from './AuthenticationService';

const WelcomeComponent = (p) => {
    
    return ( 
        <div>
            <h1>Benvenuto {getUserLoggedIn()}</h1>
            <div className="container">
            Puoi gestire i tuoi TODO <Link to="/todos">qui</Link>  
            </div>    
        </div>
     );
}

export default WelcomeComponent;        