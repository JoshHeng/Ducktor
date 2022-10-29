import React from 'react';
import './App.scss';
import {FaPaintBrush, FaSun} from 'react-icons/fa';

function App() {
    return (
        <div className="app">
            <header>
                <button><FaSun/>Wake</button>
                <h1>Ducky</h1>
                <button style={{ marginLeft: 'auto' }}><FaPaintBrush/>Customise</button>

            </header>
            <div className="duck">
                <img src="/ducks/Duck.png" alt="Duck" />
            </div>
        </div>
    );
}

export default App;
