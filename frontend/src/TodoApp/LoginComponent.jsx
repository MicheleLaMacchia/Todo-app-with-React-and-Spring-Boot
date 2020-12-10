import React, { useState } from 'react';
import {executeJwtAuthenticationService, registerSuccesfulLoginForJwt} from './AuthenticationService';

const LoginComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const loginClicked = () => {
        executeJwtAuthenticationService(username, password)
        .then((response) =>{
                registerSuccesfulLoginForJwt(username, response.data.token)
                props.history.push(`/welcome/${username}`)
        }).catch(() => {
            console.log('fail login')
            setHasLoginFailed(true)
            setShowSuccessMessage(false)
        });
    }

    return ( 
        <div>
            <h1>Login Page</h1>
             <div className='container'>
                {hasLoginFailed && <div className='alert alert-warning'>Invalid credential</div>}
                {showSuccessMessage && <div>Successful login</div>}
                Username: <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                Password: <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                <button className="btn btn-success" onClick={loginClicked}>Login</button>
            </div>
        </div>
        
     );
}
 
export default LoginComponent;