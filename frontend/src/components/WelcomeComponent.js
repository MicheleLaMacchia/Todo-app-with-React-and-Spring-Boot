import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { GetMessage } from '../api/MessageHandler';


const WelcomeComponent = (p) => {
    const [message, setMessage] = useState('');
    useEffect( () => {
        GetMessage(p.match.params.name)
        .then(res => setMessage(res.data.message))
    });
    return ( 
        <div>
            <h1>{/*<GetMessage p={p.match.params.name}/>*/}{message}</h1>
            <div className="container">
            Puoi gestire i tuoi TODO <Link to="/todos">qui</Link>  
            </div>    
        </div>
     );
}

export default WelcomeComponent;