import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {retriveTodo, createTodo, updateTodo} from './TodoDataService';
import {getLoggedInUsername, setupAxiosInterceptors} from './AuthenticationService';

const TodoComponent = (props) => {
    const [id] = useState(props.match.params.id)
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(()=>{
        let username = getLoggedInUsername();
        setupAxiosInterceptors();
        retriveTodo(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate)
            })
    },[])

    const onSubmit = (val) => {
        let username = getLoggedInUsername();
        let todo = {
            id: id, 
            description: val.description,
            targetDate: val.targetDate
        }
        if (id === -1) {
            createTodo(username, todo)
                .then(()=> props.history.push(`/todos`))
        } else {
            updateTodo(username, id, todo)
                .then(()=> props.history.push(`/todos`))
        }
    }

    const validate = (val) => {
        let errors = {}
        if(!val.description) {
            errors.description = 'Inserire una descrizione'
        }else if(val.description.length < 5) {
            errors.description = 'La descrizione dovrebbe avere almeno 5 caratteri'
        }

        if(!moment(val.targetDate).isValid() | val.targetDate === undefined) {
            errors.targetDate = 'Inserire una data valida'
        } else if(moment(val.targetDate).isBefore()) {
            errors.targetDate = 'Inserire una data successiva ad oggi'
        }
        return errors;
    }

    return ( 
        <div> 
            <h1>Todo</h1>
            <div className="container">
                <Formik
                    initialValues={{description, targetDate}}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
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
 
export default TodoComponent;