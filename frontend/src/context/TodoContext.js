import Axios from "axios";
import React, { createContext } from 'react';
import {API_URL, JPA_API_URL} from '../Constants';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {

    let username = 'Michele';
    let password = 'Michele';
    let basicAuthHeader = 'Basic '+ window.btoa(username + ":" + password);

    const getTodos = async (name) => {
        // qui definisco l'header per la chiamata al server manualmente aggiungendo la config
        // ma il modo migliore è quello con l'interceptor fatto nell AuthenticationService
        return await Axios.get(`${JPA_API_URL}/users/${name}/todos`,
        {
            headers: {
                authorization: basicAuthHeader
            }
        })
    };
    const getOneTodo = async (name, id) => {
        return await Axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    };
    const deleteTodo = async (username, id) => {
        return await Axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }
    const updateTodo = async (username, id, todo) => {
        return await Axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`,
            todo)
    }
    const createTodo = async (username, todo) => {
        return await Axios.post(`${JPA_API_URL}/users/${username}/todos`,
            todo)
    }
    return ( 
        <TodoContext.Provider value={{getTodos, deleteTodo, getOneTodo, updateTodo, createTodo}}>
            {props.children}
        </TodoContext.Provider>
      );
}

export default TodoContextProvider;