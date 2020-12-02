import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';


const AuthenticatedRoute = (p) => {
const {isUserLoggedIn} = useContext(AuthContext);

    if (isUserLoggedIn()) {
        return <Route {...p} />;
    } else {
        return <Redirect to="/login" />
    }
}

export default AuthenticatedRoute;