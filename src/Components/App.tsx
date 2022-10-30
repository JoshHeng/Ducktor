import React, {useEffect, useState} from 'react';
import './App.css';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';
import duckImages from '../duckImages.json';
import DuckCustomisation from './DuckCustomisation';
import CustomisationModal from './CustomisationModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {initialiseValues, selectAwake, selectDuckName, selectDuckType, toggleAwake} from '../redux/settingsSlice';

function App() {
    const dispatch = useAppDispatch();
    const awake = useAppSelector(selectAwake);
    const duckType = useAppSelector(selectDuckType);
    const duckName = useAppSelector(selectDuckName);
    const [ showCustomisationModal, setShowCustomisationModal ] = useState(false);

    useEffect(() => {
        let mounted = true;

        chrome?.storage?.sync.get(['settings.awake', 'settings.duckType', 'settings.name'], (values: any) => {
            if (mounted && values) {
                dispatch(initialiseValues({
                    awake: values['settings.awake'],
                    duckType: values['settings.duckType'],
                    duckName: values['settings.name'],
                }));
            }
        });

        return () => { mounted = false; }
    }, []);

    return (
        <div className={`app ${awake ? 'awake' : 'asleep'}`} style={{ backgroundImage: awake ? 'url("/ducks/BackgroundDay.png")' : 'url("/ducks/BackgroundNight.png")'}}>
            <header>
                <button onClick={() => dispatch(toggleAwake())}>{ awake ? <FaMoon /> : <FaSun/>}{ awake ? 'Sleep' : 'Wake' }</button>
                <h1>{duckName || 'Ducky'}</h1>
                <button style={{ marginLeft: 'auto' }} onClick={() => setShowCustomisationModal((_value) => !_value)}><FaPaintBrush/>{ showCustomisationModal ? 'Back' : 'Customise' }</button>

            </header>
            <div className="duckImage">
                <img src="/ducks/DuckShadow.png" alt="Duck Shadow" />
                <img src={`/ducks/${awake ? 'Duck.gif' : 'DuckSleep.gif'}`} alt="Duck" />
                { duckImages[duckType].hat && <img src={`/hats/${duckImages[duckType].hat}`} alt="Duck Hat" /> }
            </div>

            <DuckCustomisation />
            { showCustomisationModal && <CustomisationModal /> }

            <button onClick={() => {
                chrome.storage.sync.set({'msg.floatDuck': 'test message here'}, function() {
                });
            }}>Set Message</button>
            <button onClick={() => {
                chrome.storage.sync.set({'msg.floatDuck': ''}, function() {
                });
            }}>Remove Message</button>
        </div>
    );
}

export default App;
