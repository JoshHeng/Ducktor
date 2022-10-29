import React, {useState} from 'react';
import './App.css';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';
import duckImages from '../duckImages.json';
import customDuck from './Customisation';
import {duckType} from './DuckType';
import CustomDuck from './Customisation';

function App() {
    const [ awake, setAwake ] = useState(true);
    const [ customDuckType, setCustomDuckType ] = useState<duckType>("none");

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
                <img src={`/ducks/${awake ? duckImages[customDuckType].awake : duckImages[customDuckType].asleep}`} alt="Duck" />
            </div>

            <CustomDuck currentDuck={customDuckType} awake={awake} setCustomDuckType={setCustomDuckType} />
        </div>
    );
}

export default App;
