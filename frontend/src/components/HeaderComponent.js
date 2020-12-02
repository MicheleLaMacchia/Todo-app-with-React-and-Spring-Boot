import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const HeaderComponent = () => {
    const {isUserLoggedIn, getUserLoggedIn, logout} = useContext(AuthContext);
    const isLoggedIn = isUserLoggedIn();
    const username = getUserLoggedIn();
    return ( 
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div><a href="http://www.google.com" className="navbar-brand">ICONA</a></div>
                <ul className="navbar-nav">
                    {isLoggedIn && <li><Link className="nav-link" to={`/welcome/${username}`}>Home</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
     );
}

export default withRouter(HeaderComponent);