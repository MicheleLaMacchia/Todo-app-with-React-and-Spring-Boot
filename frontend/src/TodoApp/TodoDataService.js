import axios from 'axios';
import {JPA_API_URL} from '../Constants';

    export const retriveAllTodos = (name) => {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }
    export const retriveTodo = (name, id) => {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }
    export const deleteTodos = (name, id) => {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }
    export const updateTodo = (name, id, todo) => {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }
    export const createTodo = (name, todo) => {
        return axios.post(`${JPA_API_URL}/users/${name}/todos`, todo);
    }
