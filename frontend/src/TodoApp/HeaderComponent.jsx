import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {getLoggedInUsername, isUserLoggedIn, logout} from './AuthenticationService';

const HeaderComponent = () => {
    const [logo, setLogo] = useState('');
    const isLoggedIn = isUserLoggedIn();

    useEffect(() => {
        console.log('logo')
        setLogo(getLoggedInUsername())
    },[isLoggedIn])
    

        return ( 
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div className='navbar-brand'>{logo}</div>
                    <ul className='navbar-nav'>
                        {isLoggedIn && <li ><Link className='nav-link' to='/welcome'>Home</Link></li>}
                        {isLoggedIn && <li ><Link className='nav-link' to='/todos'>Todos</Link></li>}
                    </ul>
                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        {!isLoggedIn && <li ><Link className='nav-link' to='/login'>login</Link></li>}
                        {isLoggedIn && <li ><Link className='nav-link' to='/logout' onClick={logout} >logout</Link></li>}
                    </ul>
                </nav>
            </header>
         );
}
 
export default withRouter(HeaderComponent);