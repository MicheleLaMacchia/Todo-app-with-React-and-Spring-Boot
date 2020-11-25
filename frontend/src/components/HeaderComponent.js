import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout, isUserLoggedIn} from './AuthenticationService';

const HeaderComponent = () => {
    const isLoggedIn = isUserLoggedIn();
    return ( 
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div><a href="http://www.google.com" className="navbar-brand">ICONA</a></div>
                <ul className="navbar-nav">
                    {isLoggedIn && <li><Link className="nav-link" to="/welcome/Michele">Home</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    <li><Link className="nav-link" to="/login">Login</Link></li>
                    {isLoggedIn && <li><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
     );
}

export default withRouter(HeaderComponent);