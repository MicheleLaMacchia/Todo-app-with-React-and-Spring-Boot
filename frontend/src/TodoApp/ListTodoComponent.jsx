import React, { useEffect, useState } from 'react';
import {deleteTodos, retriveAllTodos} from './TodoDataService';
import {getLoggedInUsername, setupAxiosInterceptors} from './AuthenticationService';
import moment from 'moment';

const ListTodoComponent = (props) => {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() =>{
        setupAxiosInterceptors();
        refreshTodos();
    },[])

    const refreshTodos = () => {
        let username = getLoggedInUsername();
        retriveAllTodos(username)
            .then(response => setTodos(response.data))
    }

    const deleteTodoClicked = (id) => {
        let username = getLoggedInUsername();
        deleteTodos(username,id)
            .then(() => {
                setMessage(`eliminazione del'elemento n.${id} avvenuta con successo`)
                refreshTodos();
            })
    }

    const updateTodoClicked = (id) => {
        props.history.push(`/todos/${id}`)
    }

    const addTodoClicked = () => {
        props.history.push(`/todos/-1`)
    }

    return ( 
        <div>
            <h1> List Todo </h1>
            {message && <div className='alert alert-success'>{message}</div>}
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>descrizione</th>
                            <th>data di scadenza</th>
                            <th>completato?</th>
                            <th>aggiorna</th>
                            <th>elimina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => 
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{moment(todo.targetDate).format('DD-MM-YYYY')}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button className='btn btn-success' onClick={() => updateTodoClicked(todo.id)}>modifica</button></td>
                                    <td><button className='btn btn-warning' onClick={() => deleteTodoClicked(todo.id)}>elimina</button></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={() => addTodoClicked()}>Aggiungi</button>
                </div>
            </div>
        </div>
     );
}
 
export default ListTodoComponent;