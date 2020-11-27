import Axios from "axios";
import React, { createContext } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
    const getTodos = (name) => {
        return Axios.get(`http://localhost:8080/users/${name}/todos`)
    };
    const getOneTodo = (name, id) => {
        return Axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    };
    const deleteTodo = (username, id) => {
        return Axios.delete(`http://localhost:8080/users/${username}/todos/${id}`)
    }
    return ( 
        <TodoContext.Provider value={{getTodos, deleteTodo, getOneTodo}}>
            {props.children}
        </TodoContext.Provider>
      );
}

export default TodoContextProvider;