import React, {useState} from 'react';
import './App.css';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';
import duckImages from '../duckImages.json';
import {duckType} from './DuckType';
import DuckCustomisation from './DuckCustomisation';
import CustomisationModal from "./CustomisationModal";

function App() {
    const [ awake, setAwake ] = useState(true);
    const [ customDuckType, setCustomDuckType ] = useState<duckType>("none");
    const [ showCustomisationModal, setShowCustomisationModal ] = useState(false);

    const toggleAwake = () => {
        setAwake((_awake) => {
            chrome?.runtime?.sendMessage({
                action: 'setAwake',
                value: !_awake,
            }).then(() => {});

            return !_awake;
        });
    }

    return (
        <div className={`app ${awake ? 'awake' : 'asleep'}`} style={{ backgroundImage: awake ? 'url("/ducks/BackgroundDay.png")' : 'url("/ducks/BackgroundNight.png")'}}>
            <header>
                <button onClick={toggleAwake}>{ awake ? <FaMoon /> : <FaSun/>}{ awake ? 'Sleep' : 'Wake' }</button>
                <h1>Ducky</h1>
                <button style={{ marginLeft: 'auto' }} onClick={() => setShowCustomisationModal((_value) => !_value)}><FaPaintBrush/>{ showCustomisationModal ? 'Back' : 'Customise' }</button>

            </header>
            <div className="duckImage">
                <img src="/ducks/DuckShadow.png" alt="Duck Shadow" />
                <img src={`/ducks/${awake ? 'Duck.gif' : 'DuckSleep.gif'}`} alt="Duck" />
                { duckImages[customDuckType].hat && <img src={`/hats/${duckImages[customDuckType].hat}`} alt="Duck Hat" /> }
            </div>

            <DuckCustomisation currentDuck={customDuckType} awake={awake} setCustomDuckType={setCustomDuckType} />
            { showCustomisationModal && <CustomisationModal /> }
        </div>
    );
}

export default App;
