import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Testando...</h1>
                <Link to='/sobre'>Página Sobre</Link>
            </div>
        );
    }
}

export default App;