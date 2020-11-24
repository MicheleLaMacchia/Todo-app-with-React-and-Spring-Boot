import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

const TodoApp = () => {
    return ( 
    <div className="TodoApp">
        <Router>
            <HeaderComponent/>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/welcome/:name" component={WelcomeComponent}/>
                <Route path="/todos" component={ListTodoComponent}/>
                <Route path="/logout" component={LogoutComponent}/>
                <Route component={ErrorComponent}/>
            </Switch>
            <FooterComponent/>
        </Router>
    </div>  );
}

const HeaderComponent = () => {
    return ( 
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div><a href="http://www.google.com" className="navbar-brand">ICONA</a></div>
                <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/welcome/Michele">Home</Link></li>
                    <li><Link className="nav-link" to="/todos">Todos</Link></li>
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    <li><Link className="nav-link" to="/login">Login</Link></li>
                    <li><Link className="nav-link" to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
     );
}

const FooterComponent = () => {
    return ( 
        <footer className="footer">
            <span className="text-muted">Questa la mia app di esercitazione</span>
        </footer>
     );
}

const LogoutComponent = () => {
    return ( 
        <div>
            <h1>Logout completato</h1>
            <div className="container">
                Grazie per aver utilizzato l'applicazione
            </div>
        </div>
     );
}

const ListTodoComponent = () => {

    const [todo] = useState(
        [
            {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
            {id: 2, description: 'Read a book', done: false, targetDate: new Date()},
            {id: 3, description: 'Visit Rome', done: false, targetDate: new Date()},
        ])

    return ( 
        <div>
            <h1>List Todos</h1>
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>target date</th>
                        <th>done</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map(e => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.description}</td>
                            <td>{e.targetDate.toString()}</td>
                            <td>{e.done.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
     );
}

const WelcomeComponent = (p) => {
    return ( 
        <div>
            <h1>Benvenuto nell'App sig. {p.match.params.name}</h1>
            <div className="container">
            Puoi gestire i tuoi TODO <Link to="/todos">qui</Link>  
            </div>    
        </div>
     );
}

const ErrorComponent = () => {
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
    if (username === 'Michele' && password === 'Michele') {setSuccMsg(true);setErrMsg(false);} 
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
 
export default TodoApp;