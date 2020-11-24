import {isUserLoggedIn} from './AuthenticationService';
import {Route, Redirect} from 'react-router-dom';


const AuthenticatedRoute = (p) => {
    if (isUserLoggedIn()) {
        return <Route {...p} />;
    } else {
        return <Redirect to="/login" />
    }
}

export default AuthenticatedRoute;