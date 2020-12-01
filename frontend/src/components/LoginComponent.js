import { useState } from "react";
import { Redirect } from "react-router-dom";
import { JwtregisterSuccesfulLogin, executeJwtAuthenticationService } from "./AuthenticationService";

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
      /* parte per autenticazione solo su front end
        if (username === 'Michele' && password === 'Michele') {
            registerSuccesfulLogin(username, password);
            setSuccMsg(true);setErrMsg(false);} 
        else{setErrMsg(true);setSuccMsg(false);}*/
        /* parte per autenticazione BasicAuth sul server
        executeBasicAuthenticationService(username,password)
        .then(() => {registerSuccesfulLogin(username, password);
                   setSuccMsg(true);setErrMsg(false);})
        .catch(() => {setErrMsg(true);setSuccMsg(false);})*/
        executeJwtAuthenticationService(username,password)
        .then((res) => {console.log(res);JwtregisterSuccesfulLogin(username, res.data.token);
                   setSuccMsg(true);setErrMsg(false);})
        .catch(() => {setErrMsg(true);setSuccMsg(false);})
    }

        return ( 
            <div>
                <h1>Login</h1>
                <div className="container-sm">
                    {errMsg && <div className="alert alert-warning">Credenziali errate</div>}
                    {succMsg && <Redirect to={`/welcome/${username}`} />}
                    
                    Username: <input type="text" name="username" value={username} onChange={handleUsername}/> 
                    Password: <input type="password" name="password" value={password} onChange={handlePassword}/>
                    <button className="btn btn-success" onClick={loginClicked}>Login</button>
                    </div>
            </div>
         );
    }

export default LoginComponent;