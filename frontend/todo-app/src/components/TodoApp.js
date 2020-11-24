import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const TodoApp = () => {
    return ( 
    <div className="TodoApp">
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/welcome/:name" component={WelcomeComponent}/>
                <Route component={ErroComponent}/>
            </Switch>
        </Router>
    </div>  );
}

const WelcomeComponent = (p) => {
    return ( 
        <div>
            Benvenuto nell'App sig. {p.match.params.name}
        </div>
     );
}

const ErroComponent = () => {
    return ( 
        <div>Errore... la pagina non esiste</div>
      );
}

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
         setSuccMsg(true);
         setErrMsg(false);
    } else{
        setErrMsg(true);
        setSuccMsg(false);
    }
}
    return ( 
        <div>
            {errMsg && <div>Credenziali errate</div>}
            {succMsg && <Redirect to={`/welcome/${username}`} />}
            
            Username: <input type="text" name="username" value={username} onChange={handleUsername}/> 
            Password: <input type="password" name="username" value={password} onChange={handlePassword}/>
            <button onClick={loginClicked}>Login</button>
        </div>
     );
}
 
export default TodoApp;