import React, {useEffect, useState} from 'react';
import './App.css';
import {FaPaintBrush, FaSun, FaMoon} from 'react-icons/fa';
import duckImages from '../duckImages.json';
import DuckCustomisation from './DuckCustomisation';
import CustomisationModal from './CustomisationModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {initialiseValues, selectAwake, selectDuckName, selectDuckType, toggleAwake} from '../redux/settingsSlice';
import MotivationalQuote from "./MotivationalQuote";

function App() {
    const dispatch = useAppDispatch();
    const awake = useAppSelector(selectAwake);
    const duckType = useAppSelector(selectDuckType);
    const duckName = useAppSelector(selectDuckName);
    const [ showCustomisationModal, setShowCustomisationModal ] = useState(false);

    useEffect(() => {
        let mounted = true;

        chrome?.storage?.sync.get([
            'settings.awake',
            'settings.duckType',
            'settings.name',
            'settings.enabledModules.module.imageFilter',
            'settings.enabledModules.module.breakReminder',
            'settings.enabledModules.module.hideAndSeek',
            'settings.enabledModules.module.motivation'
        ], (values: any) => {
            if (mounted && values) {
                dispatch(initialiseValues({
                    awake: values['settings.awake'],
                    duckType: values['settings.duckType'],
                    duckName: values['settings.name'],
                    enabledModules: {
                        'module.imageFilter': values['settings.enabledModules.module.imageFilter'],
                        'module.breakReminder': values['settings.enabledModules.module.breakReminder'],
                        'module.hideAndSeek': values['settings.enabledModules.module.hideAndSeek'],
                        'module.motivation': values['settings.enabledModules.module.motivation']
                    }
                }));
            }
        });

        return () => { mounted = false; }
    }, [dispatch]);

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
                <MotivationalQuote />
            </div>

            <DuckCustomisation />
            { showCustomisationModal && <CustomisationModal /> }
        </div>
    );
}

export default App;
