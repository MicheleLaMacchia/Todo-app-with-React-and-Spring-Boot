import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import {executeJwtAuthenticationService, registerSuccesfulLoginForJwt} from './AuthenticationService';

const LoginComponent = (props) => {
    const [username] = useState('');
    const [password] = useState('')
    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const loginClicked = (val) => {
        executeJwtAuthenticationService(val.username, val.password)
        .then((response) =>{
                registerSuccesfulLoginForJwt(val.username, response.data.token)
                props.history.push(`/welcome/${val.username}`)
        }).catch(() => {
            setHasLoginFailed(true)
            setShowSuccessMessage(false)
        });
    }

    return ( 
        <div >
        
                <div className='container'>
                <h1>Login Page</h1>
                    <Formik
                        initialValues={{username, password}}
                        onSubmit={loginClicked}
                        enableReinitialize={true}
                        >
                        {
                            (props) => (
                                <Form>
                                {hasLoginFailed && <div className='alert alert-warning'>Invalid credential</div>}
                                {showSuccessMessage && <div>Successful login</div>}
                                    <fieldset className='form-group'>
                                        <label>Username</label>
                                        <Field className='form-control' type='text' name='username' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Password</label>
                                        <Field className='form-control' type='password' name='password'/>
                                    </fieldset>
                                    <button className='btn btn-success' type='submit'>Login</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
          
        </div>
        
     );
}
 
export default LoginComponent;