import React, {useState} from 'react';
import './App.css';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';
import duckImages from '../duckImages.json';

function App() {
    const [ awake, setAwake ] = useState(true);

    const toggleAwake = () => {
        setAwake((_awake) => {
            chrome?.runtime?.sendMessage({
                action: 'setAwake',
                value: !_awake,
            }).then(r => {});

            return !_awake;
        });
    }

    return (
        <div className={`app ${awake ? 'awake' : 'asleep'}`} style={{ backgroundImage: awake ? 'url("/ducks/BackgroundDay.png")' : 'url("/ducks/BackgroundNight.png")'}}>
            <header>
                <button onClick={toggleAwake}>{ awake ? <FaMoon /> : <FaSun/>}{ awake ? 'Sleep' : 'Wake' }</button>
                <h1>Ducky</h1>
                <button style={{ marginLeft: 'auto' }}><FaPaintBrush/>Customise</button>

            </header>
            <div className="duck">
                <img src={`/ducks/${awake ? duckImages.none.awake : duckImages.none.asleep}`} alt="Duck" />
            </div>
        </div>
    );
}

export default App;
