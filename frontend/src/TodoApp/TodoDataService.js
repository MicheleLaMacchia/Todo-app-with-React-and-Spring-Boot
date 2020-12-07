import { Component } from 'react';
import axios from 'axios';

class TodoDataService extends Component {
    retriveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }
    retriveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }
    deleteTodos(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }
}
 
export default new TodoDataService();