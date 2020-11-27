import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TodoContextProvider from '../context/TodoContext';
import AuthenticatedRoute from './AuthenticatedRoute';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodoComponent from './ListTodoComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import TodoComponent from './TodoComponent';
import WelcomeComponent from './WelcomeComponent';

const TodoApp = () => {
    return ( 
    <div className="TodoApp">
        <TodoContextProvider>
        <Router>
            <HeaderComponent/>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                <AuthenticatedRoute path="/todos" component={ListTodoComponent}/>
                <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                <Route component={ErrorComponent}/>
            </Switch>
            <FooterComponent/>
        </Router>
        </TodoContextProvider>
    </div>  );
}

export default TodoApp;