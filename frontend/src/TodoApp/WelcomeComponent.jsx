import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() { 
        return ( 
            <div>
                <h1>Benvenuto!</h1>
                <div className="container">
                Benvenuto, {this.props.match.params.name}. 
                Puoi gestire i tuoi TODO <Link to="/todos"> qui </Link>
                </div>
            </div>
         );
    }
}

export default WelcomeComponent