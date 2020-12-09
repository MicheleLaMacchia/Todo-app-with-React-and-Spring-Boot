import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import {isUserLoggedIn} from './AuthenticationService';

const HeaderComponent = () => {
    
    const isUserLoggedIn = isUserLoggedIn();

        return ( 
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div className='navbar-brand'>LOGO</div>
                    <ul className='navbar-nav'>
                        {isUserLoggedIn && <li ><Link className='nav-link' to='/welcome'>Home</Link></li>}
                        {isUserLoggedIn && <li ><Link className='nav-link' to='/todos'>Todos</Link></li>}
                    </ul>
                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        {!isUserLoggedIn && <li ><Link className='nav-link' to='/login'>login</Link></li>}
                        {isUserLoggedIn && <li ><Link className='nav-link' to='/logout' onClick={AuthenticationService.logout} >logout</Link></li>}
                    </ul>
                </nav>
            </header>
         );
}
 
export default withRouter(HeaderComponent);