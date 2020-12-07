import { Avatar } from '@material-ui/core';
import pic from '../images/LA_MACCHIA.jpeg';
import './Header.css';

const Header = () => {
    return ( 
        <div className="header">
            <div className="container row">
                <div className="col-1">
                <Avatar src={pic} />
                </div>
                <div className="navbar-nav col-10">
                <a class="nav-link" href="#">Features</a>
                <a class="nav-link" href="#">Pricing</a>
                </div>
                <div className="col-1">
                login/logout
                </div>
            </div>
        </div>
     );
}
 
export default Header;