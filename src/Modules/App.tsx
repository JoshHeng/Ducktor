import React, {useState} from 'react';
import './App.scss';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';

function App() {
    const [ awake, setAwake ] = useState(true);

    const toggleAwake = () => {
        setAwake((_awake) => !_awake);
    }

    return (
        <div className={`app ${awake ? 'awake' : 'asleep'}`}>
            <header>
                <button onClick={toggleAwake}>{ awake ? <FaMoon /> : <FaSun/>}{ awake ? 'Sleep' : 'Wake' }</button>
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
