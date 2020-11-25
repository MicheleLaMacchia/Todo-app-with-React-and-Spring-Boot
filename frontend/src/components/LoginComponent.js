import { useState } from "react";
import { Redirect } from "react-router-dom";
import { registerSuccesfulLogin } from "./AuthenticationService";

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [succMsg, setSuccMsg] = useState(false);
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const loginClicked = () => {
        if (username === 'Michele' && password === 'Michele') {
            registerSuccesfulLogin(username, password);
            setSuccMsg(true);setErrMsg(false);} 
        else{setErrMsg(true);setSuccMsg(false);}
    }
        return ( 
            <div>
                <h1>Login</h1>
                <div className="container-sm">
                    {errMsg && <div className="alert alert-warning">Credenziali errate</div>}
                    {succMsg && <Redirect to={`/welcome/${username}`} />}
                    
                    Username: <input type="text" name="username" value={username} onChange={handleUsername}/> 
                    Password: <input type="password" name="username" value={password} onChange={handlePassword}/>
                    <button className="btn btn-success" onClick={loginClicked}>Login</button>
                    </div>
            </div>
         );
    }

export default LoginComponent;