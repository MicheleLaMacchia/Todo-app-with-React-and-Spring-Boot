import React, {useContext, useEffect, useState} from 'react';
import {TodoContext} from '../context/TodoContext';
import { getUserLoggedIn } from './AuthenticationService';

const ListTodoComponent = (p) => {
    const {getTodos, deleteTodo} = useContext(TodoContext);
    const [todos, setTodos] = useState([]);
    const username = getUserLoggedIn();
    const handleTodosList = (username) => {
        getTodos(username).then(res => setTodos(res.data))
    }
    const handleDeleteClick = (id) => {
        deleteTodo(username, id).then(() => handleTodosList(username))
    }
    const handleUpdateClick = (todo) => {
        p.history.push(`/todos/${todo.id}`,todo );
    }
    
    useEffect(() => {
        handleTodosList(username)
    },[todos.length])

    


    return ( 
        <div>
            <h1>List Todos</h1>
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>target date</th>
                        <th>isDone?</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td>{todo.done.toString()}</td>
                            <td><button className="btn btn-primary" onClick={() => handleUpdateClick(todo)}>update</button></td>
                            <td><button className="btn btn-warning" onClick={() => handleDeleteClick(todo.id)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
     );
}

export default ListTodoComponent;