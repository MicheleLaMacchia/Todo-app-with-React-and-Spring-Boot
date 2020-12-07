import '../bootstrap.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import AuthenticatedRoute from './AuthenticatedRoute';

class TodoApp extends Component {
    render() { 
        return ( 
            <div className="TodoApp">
                <Router>
                  <HeaderComponent/>  
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos" component={ListTodoComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                  <FooterComponent/>
                </Router>
            </div>
         );
    }
}

class HeaderComponent extends Component {
    render() { 
        return ( 
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div className='navbar-brand'>LOGO</div>
                    <ul className='navbar-nav'>
                        <li ><Link className='nav-link' to='/welcome'>Home</Link></li>
                        <li ><Link className='nav-link' to='/todos'>Todos</Link></li>
                    </ul>
                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        <li ><Link className='nav-link' to='/login'>login</Link></li>
                        <li ><Link className='nav-link' to='/logout' onClick={AuthenticationService.logout}>logout</Link></li>
                    </ul>
                </nav>
            </header>
         );
    }
}

class FooterComponent extends Component {
    render() { 
        return ( 
            <footer className="footer">
                <span className="text-muted">la mia app</span>
            </footer>
         );
    }
}

class LogoutComponent extends Component {
    render() { 
        return ( 
            <div> 
                <h1>Hai eseguito il log out</h1> 
                <div className="container">
                    Grazie per aver usato la mia app
                </div>
            </div>
         );
    }
}

class ErrorComponent extends Component {
    render() { 
        return ( 
            <div>
                La pagina non esiste
            </div>
         );
    }
}

class ListTodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [{id:1, desc: 'Learn React', done: false, targetDate: new Date()},
                    {id:2, desc: 'Eat Pasta', done: false, targetDate: new Date()},
                    {id:3, desc: 'Visit Brooklin', done: false, targetDate: new Date()},]
        }
    }
    render() { 
        return ( 
            <div>
                <h1> List Todo </h1>
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>descrizione</th>
                                <th>data di esecuzione</th>
                                <th>completato?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr key={todo.id}>
                                        <th>{todo.id}</th>
                                        <th>{todo.desc}</th>
                                        <th>{todo.targetDate.toString()}</th>
                                        <th>{todo.done.toString()}</th>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}

class WelcomeComponent extends Component {
    render() { 
        return ( 
            <div>
                <h1>Benvenuto!</h1>
                <div className="container">
                Benvenuto, {this.props.match.params.name}. 
                Puoi gestire i tuoi TODO <Link to="/todos"> qui </Link>
                </div>
            </div>
         );
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false

        }
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    
    handleLoginChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    loginClicked(e) {
        if (this.state.username==='Michele' && this.state.password==='Michele') {
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        } else {
            console.log('fail login')
            this.setState({
                showSuccessMessage : false,
                hasLoginFailed : true
            }) 
        }
    }

    render() { 
        return ( 
            <div>
                <h1>Login Page</h1>
                 <div className='container'>
                    {this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid credential</div>}
                    {this.state.showSuccessMessage && <div>Successful login</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleLoginChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleLoginChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
            
         );
    }
}
 
export default TodoApp;