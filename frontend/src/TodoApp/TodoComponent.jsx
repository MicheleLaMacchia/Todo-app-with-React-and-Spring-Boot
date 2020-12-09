import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import {retriveTodo, createTodo, updateTodo, getLoggedInUsername} from './TodoDataService';

const TodoComponent = (props) => {
    const [id] = useState(props.match.params.id)
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    useEffect(()=>{
        if(this.state.id === -1)  {
            return;
        }
        let username = getLoggedInUsername();
        retriveTodo(username, id)
            .then(response => {
                setDescription(response.data.description);
                setDate(moment(response.data.targetDate).format('YYYY-MM-DD'))
            })
    },[])

    const onSubmit = (val) => {
        let username = getLoggedInUsername();
        let todo = {
            id: id, 
            description: val.description,
            targetDate: val.targetDate
        }
        if (this.state.id === -1) {
            createTodo(username, todo)
                .then(()=>this.props.history.push(`/todos`))
        } else {
            updateTodo(username, this.state.id, todo)
                .then(()=>this.props.history.push(`/todos`))
        }
    }

    const validate = (val) => {
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

    return ( 
        <div> 
            <h1>Todo</h1>
            <div className="container">
                <Formik
                    initialValues={{description, date}}
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