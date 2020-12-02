import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const WelcomeComponent = () => {
    const {getUserLoggedIn} = useContext(AuthContext);
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