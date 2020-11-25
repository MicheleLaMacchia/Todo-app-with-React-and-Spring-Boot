import React, {useState} from 'react';

const ListTodoComponent = () => {

    const [todo] = useState(
        [
            {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
            {id: 2, description: 'Read a book', done: false, targetDate: new Date()},
            {id: 3, description: 'Visit Rome', done: false, targetDate: new Date()},
        ])

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
                        <th>done</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map(e => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.description}</td>
                            <td>{e.targetDate.toString()}</td>
                            <td>{e.done.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
     );
}

export default ListTodoComponent;