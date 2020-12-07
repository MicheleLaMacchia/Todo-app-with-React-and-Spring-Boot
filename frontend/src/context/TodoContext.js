import Axios from "axios";
import React, { createContext, useEffect, useState } from 'react';
import {JPA_API_URL} from '../Constants';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {

    const getTodos = async (name) => {
        return await Axios.get(`${JPA_API_URL}/users/${name}/todos`)
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
        <TodoContext.Provider value={{getTodos, deleteTodo, getOneTodo, 
                                      updateTodo, createTodo}}>
            {props.children}
        </TodoContext.Provider>
      );
}

export default TodoContextProvider;