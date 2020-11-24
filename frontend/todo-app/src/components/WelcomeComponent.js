import React from 'react';
import {Link} from 'react-router-dom';

const WelcomeComponent = (p) => {
    return ( 
        <div>
            <h1>Benvenuto nell'App sig. {p.match.params.name}</h1>
            <div className="container">
            Puoi gestire i tuoi TODO <Link to="/todos">qui</Link>  
            </div>    
        </div>
     );
}

export default WelcomeComponent;