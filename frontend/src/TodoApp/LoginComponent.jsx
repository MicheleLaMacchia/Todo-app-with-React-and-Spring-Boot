import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';

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
        if (this.state.username==='Michele' && this.state.password==='123') {
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
 
export default LoginComponent;