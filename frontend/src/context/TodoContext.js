import Axios from "axios";
import React, { createContext } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
    const getTodos = async (name) => {
        return await Axios.get(`http://192.168.1.10:8080/users/${name}/todos`)
    };
    const getOneTodo = async (name, id) => {
        return await Axios.get(`http://192.168.1.10:8080/users/${name}/todos/${id}`)
    };
    const deleteTodo = async (username, id) => {
        return await Axios.delete(`http://192.168.1.10:8080/users/${username}/todos/${id}`)
    }
    return ( 
        <TodoContext.Provider value={{getTodos, deleteTodo, getOneTodo}}>
            {props.children}
        </TodoContext.Provider>
      );
}

export default TodoContextProvider;