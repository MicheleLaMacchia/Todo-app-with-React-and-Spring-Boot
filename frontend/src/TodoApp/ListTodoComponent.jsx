import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';
import TodoDataService from './TodoDataService';

class ListTodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retriveAllTodos(username)
            .then(response => this.setState({
                todos: response.data
            }))
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.deleteTodos(username,id)
            .then(response => {
                this.setState({message: `eliminazione del'elemento n.${id} avvenuta con successo`})
                this.refreshTodos();
            })
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }

    render() { 
        return ( 
            <div>
                <h1> List Todo </h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
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
                                this.state.todos.map(
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.desc}</td>
                                        <td>{todo.targetDate.toLocaleDateString()}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className='btn btn-success' onClick={() => this.updateTodoClicked(todo.id)}>modifica</button></td>
                                        <td><button className='btn btn-warning' onClick={() => this.deleteTodoClicked(todo.id)}>elimina</button></td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}

export default ListTodoComponent;