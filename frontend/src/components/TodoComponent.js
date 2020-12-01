import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { getUserLoggedIn } from './AuthenticationService';

const TodoComponent = (p) => {
    console.log(p)
    const id = p.match.params.id;
    const {getOneTodo, updateTodo, createTodo} = useContext(TodoContext);
    const [todo, setTodo] = useState({});
    const username = getUserLoggedIn();

    useEffect(() => {
        getOneTodo(username,id)
            .then((res) => setTodo(res.data))
    },[])

    const onSubmit = (val) =>{
        console.log(id)
        if (p.match.params.id === '-1') {
            createTodo(username,{
                username: username,
                description: val.description,
                targetDate: val.targetDate,
                isDone: false
            }).then(() => p.history.push('/todos'))
        } else {
            updateTodo(username,id,{
                id: id,
                username: username,
                description: val.description,
                targetDate: val.targetDate,
                isDone: false
            }).then(() => p.history.push('/todos'))
        }
        
    };
    const validate = (val) => {
        let errors = {};
        if (!val.description) {
            errors.description = 'Inserire una descrizione'
        } else if (val.description.length < 5) {
            errors.description = 'La descrizione dovrebbe avere almeno 5 caratteri'
        }
        if (!moment(val.targetDate).isValid()) {
            errors.targetDate = 'La data non è valida'
        } else if (moment(val.targetDate).isBefore(new Date())) {
            errors.targetDate = 'La data di compleamento deve essere successiva ad oggi'
        }
        return errors;
    }
    return ( 
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                    initialValues={{
                        description: todo.description,
                        targetDate: todo.targetDate
                    }}
                    onSubmit={onSubmit}
                    validate={validate}
                    enableReinitialize={true}
                    // se validateOnChange è true ti valida mentre scrivi 
                    validateOnChange={false}

                >
                    <Form>
                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                        <fieldset className="form-group">
                            <label>Description</label>
                            <Field className="form-control" type="text" name="description"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Target Date</label>
                            <Field className="form-control" type="date" name="targetDate"/>
                        </fieldset>
                        <button className="btn btn-success" type="submit">Update</button>
                    </Form>
                </Formik>
            </div>
        </div>
     );
}
 
export default TodoComponent;