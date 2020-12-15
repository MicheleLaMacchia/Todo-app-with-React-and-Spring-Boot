import React from 'react';
import { Link } from 'react-router-dom';


const LogoutComponent = () => {
    return ( 
        <div className="container"> 
            <h1>Hai eseguito il log out</h1> 
            <h2>Clicca <Link to='/login'>qui</Link> per tornare al login</h2>
        </div>
     );
}
 
export default LogoutComponent;