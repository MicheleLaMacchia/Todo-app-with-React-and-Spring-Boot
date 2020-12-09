import { Component } from 'react';
import axios from 'axios';
import {JPA_API_URL} from '../Constants';

class TodoDataService extends Component {
    retriveAllTodos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }
    retriveTodo(name, id) {
        return axios.get(`${JPA_API_URL}users/${name}/todos/${id}`);
    }
    deleteTodos(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }
    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }
    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos`, todo);
    }
}
 
export default new TodoDataService();