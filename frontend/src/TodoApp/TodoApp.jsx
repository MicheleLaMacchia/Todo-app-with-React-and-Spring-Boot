import '../bootstrap.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListTodoComponent from './ListTodoComponent';
import HeaderComponent from './HeaderComponent';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import TodoComponent from './TodoComponent';

const TodoApp = () => {
  return ( 
      <div className="TodoApp">
      <Router>
        <HeaderComponent/>  
          <Switch>
              <Route path="/" exact component={LoginComponent}/>
              <Route path="/login" component={LoginComponent}/>
              <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
              <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
              <AuthenticatedRoute path="/todos" component={ListTodoComponent}/>
              <Route path="/logout" component={LogoutComponent}/>
              <Route component={ErrorComponent}/>
          </Switch>
        <FooterComponent/>
      </Router>
    </div> 
    );
}
 
export default TodoApp;