import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';
import TodoDataService from './TodoDataService';

class TodoComponent extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            id: this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if(this.state.id === -1)  {
            return;
        }
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retriveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    onSubmit(val) {
        let username = AuthenticationService.getLoggedInUsername();
        let todo = {
            id: this.state.id, 
            description: val.description,
            targetDate: val.targetDate
        }
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(()=>this.props.history.push(`/todos`))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(()=>this.props.history.push(`/todos`))
        }
    }

    validate(val) {
        let errors = {}
        if(!val.description) {
            errors.description = 'Inserire una descrizione'
        }else if(val.description.length < 5) {
            errors.description = 'La descrizione dovrebbe avere almeno 5 caratteri'
        }

        if(!moment(val.targetDate).isValid()) {
            errors.targetDate = 'Inserire una data valida'
        }
        return errors;
    }

    render() { 
        let {description, targetDate} = this.state;
        return ( 
            <div> 
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning'/>
                                    <ErrorMessage name='targetDate' component='div' className='alert alert-warning'/>
                                    <fieldset className='form-group'>
                                        <label>Descrizione</label>
                                        <Field className='form-control' type='text' name='description' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Data di scadenza</label>
                                        <Field className='form-control' type='date' name='targetDate'/>
                                    </fieldset>
                                    <button className='btn btn-success' type='submit'>Salva</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
         );
    }
}
 
export default TodoComponent;