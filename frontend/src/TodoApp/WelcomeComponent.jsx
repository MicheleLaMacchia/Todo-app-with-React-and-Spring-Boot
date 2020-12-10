import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeComponent = (props) => {
    return ( 
        <div>
            <h1>Benvenuto!</h1>
            <div className="container">
            Benvenuto, {props.match.params.name}. 
            Puoi gestire i tuoi TODO <Link to="/todos"> qui </Link>
            </div>
        </div>
     );
}
 
export default WelcomeComponent;