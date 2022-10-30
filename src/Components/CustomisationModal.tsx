import './CustomisationModal.css';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectDuckName, selectEnabledModules, setName, toggleModuleEnabled} from "../redux/settingsSlice";
import {ModuleKey} from "../types/ModuleKeys";

type Module = {
    key: ModuleKey;
    label: string | React.ReactNode;
    icon: string;
    offIcon?: string;
}

const modules: Module[] = [
    {
        key: 'module.imageFilter',
        label: <span>Image<br />Filter</span>,
        icon: 'ImageRemover.png',
    },
    {
        key: 'module.breakReminder',
        label: 'Break Reminder',
        icon: 'AlarmOn.png',
        offIcon: 'AlarmOff.png',
    },
    {
        key: 'module.hideAndSeek',
        label: 'Hide and Seek',
        icon: 'HideAndSeekIcon.png',
    },
    {
        key: 'module.motivation',
        label: 'Motivational Quotes',
        icon: 'QuoteIcon.png',
    },
];

export default function CustomisationModal() {
    const dispatch = useAppDispatch();
    const duckName = useAppSelector(selectDuckName);
    const enabledModules = useAppSelector(selectEnabledModules);

    const [ TextFilterStrings, setTextFilterStrings ] = useState('');
    const onTextFilterChange = (event: any) => {
        setTextFilterStrings(event.target.value);
        chrome?.storage?.sync.set({ 'TextFilterStrings': event.target.value }).then(() => {});
    }
    const onTextFilterFinish = () => {
        if (enabledModules['module.imageFilter']) setTimeout(() => chrome?.tabs?.reload(), 200);
    }
    const onDuckNameChange = (event: any) => {
        dispatch(setName(event.target.value));
    }

    useEffect(() => {
        let mounted = true;

        if (chrome?.storage) {
            chrome?.storage?.sync.get('TextFilterStrings', (result: any) => {
                if (mounted && result?.TextFilterStrings) setTextFilterStrings(result?.TextFilterStrings);
            });
        }

        return () => { mounted = false };
    }, []);

    return (
        <div className="customisationModal">
            <h2>Customisation</h2>

            <div className="input">
                <label htmlFor="duckName">Duck Name</label>
                <input type="text" required minLength={1} maxLength={10} id="duckName" onChange={onDuckNameChange} value={duckName} placeholder="Ducky"></input>
            </div>

            <div className="enableModulesWrapper">
                <p>Enabled Modules</p>
                <div className="enableModules">
                    { modules.map(module => {
                        const enabled = enabledModules[module.key];

                        return (
                            <div key={module.key}>
                                <button onClick={() => dispatch(toggleModuleEnabled(module.key))} className={!enabled ? 'greyscale' : ''}>
                                    <img src={enabled ? `/icons/${module.icon}` : `/icons/${module.offIcon || module.icon}`} alt="Module Icon" />
                                </button>
                                <p>{module.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>


            <div className="input">
                <label htmlFor="TextFilterStrings">Image Filter - Alt Text Blacklist</label>
                <textarea className="textBox" rows={6} id="TextFilterStrings" onChange={onTextFilterChange} value={TextFilterStrings} placeholder="Quack" onBlur={onTextFilterFinish}></textarea>
            </div>
        </div>
    )
}