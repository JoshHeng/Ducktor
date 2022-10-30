import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {DuckType} from "../types/DuckType";
import {ModuleKey} from "../types/ModuleKeys";

interface SettingsState {
    awake: boolean;
    duckType: DuckType;
    duckName: string;
    enabledModules: {
        [moduleKey in ModuleKey]: boolean;
    };
    breakInterval: number;
}

const initialState: SettingsState = {
    awake: false,
    duckType: 'none',
    duckName: 'Ducky',
    enabledModules: {
        'module.imageFilter': true,
        'module.breakReminder': false,
        'module.hideAndSeek': true,
        'module.motivation': true,
    },
    breakInterval: 60,
}

function setAlarm(interval: number) {
    chrome?.alarms.create("screenTimer", {delayInMinutes: interval, periodInMinutes: interval} );
}

function setAlarmWithooutInterval() {
    chrome?.storage?.sync.get(['settings.breakInterval'], (results: any) => {
       setAlarm(Number(results['settings.breakInterval']));
    });
}

function clearAlarm() {
    console.log('CLEARING');

    chrome?.alarms?.clearAll();
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleAwake: (state) => {
            chrome?.runtime?.sendMessage({
                action: 'setAwake',
                value: !state.awake,
            }).then(() => {});

            if (state.enabledModules['module.imageFilter'] !== false) setTimeout(() => chrome?.tabs?.reload(), 200);
            if (state.enabledModules['module.breakReminder']) {
                chrome?.storage?.sync?.get(['settings.enabledModules.module.breakReminder'], (results: any) => {
                    console.log(results);
                    if (results['settings.enabledModules.module.breakReminder']) {
                        if (state.awake) {
                            // If goes to sleep
                            clearAlarm();
                        }
                        else {
                            setAlarmWithooutInterval();
                        }
                    }
                });
            }

            chrome?.storage?.sync.set({
                'settings.awake': !state.awake,
            }).then(() => {});

            state.awake = !state.awake;
        },
        setDuckType: (state, action: PayloadAction<DuckType>) => {
            chrome?.storage?.sync.set({
                'settings.duckType': action.payload,
            }).then(() => {});

            state.duckType = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            chrome?.storage?.sync.set({
                'settings.name': action.payload,
            }).then(() => {});

            state.duckName = action.payload;
        },
        toggleModuleEnabled: (state, action: PayloadAction<ModuleKey>) => {
            const toSet: any = {};
            toSet['settings.enabledModules.' + action.payload] = !state.enabledModules[action.payload];
            chrome?.storage?.sync.set(toSet).then(() => {});

            if (action.payload === 'module.imageFilter' || action.payload === 'module.hideAndSeek') setTimeout(() => chrome?.tabs?.reload(), 200);

            if (action.payload === 'module.breakReminder') {
                chrome?.storage?.sync?.get(['settings.awake'], (results: any) => {
                    console.log(results);
                    if (results['settings.awake']) {
                        if (state.enabledModules[action.payload]) {
                            // If goes to sleep
                            clearAlarm();
                        }
                        else {
                            setAlarmWithooutInterval();
                        }
                    }
                });
            }


            state.enabledModules[action.payload] = !state.enabledModules[action.payload];
        },
        setBreakInterval: (state, action: PayloadAction<number>) => {
            chrome?.storage?.sync.set({
                'settings.breakInterval': action.payload
            }).then(() => {});



            chrome?.storage?.sync?.get(['settings.awake', 'settings.enabledModules.module.breakReminder'], (results: any) => {
                if (results['settings.awake'] && results['settings.enabledModules.module.breakReminder']) {
                    setAlarm(Number(action.payload));
                }
            });

            state.breakInterval = action.payload;
        },
        initialiseValues: (state, action: PayloadAction<SettingsState>) => {
            state.awake = action.payload.awake === undefined ? true : action.payload.awake;
            state.duckType = action.payload.duckType || 'none';
            state.duckName = action.payload.duckName || 'Ducky';
            state.enabledModules = {
                'module.imageFilter': action.payload.enabledModules["module.imageFilter"] === undefined ? true : action.payload.enabledModules["module.imageFilter"],
                'module.breakReminder': action.payload.enabledModules["module.breakReminder"] === undefined ? false : action.payload.enabledModules["module.breakReminder"],
                'module.hideAndSeek': action.payload.enabledModules["module.hideAndSeek"] === undefined ? true : action.payload.enabledModules["module.hideAndSeek"],
                'module.motivation': action.payload.enabledModules["module.motivation"] === undefined ? true : action.payload.enabledModules["module.motivation"],
            };
            state.breakInterval = action.payload.breakInterval || 60;
        },
    },
});

export const { toggleAwake, setDuckType, initialiseValues, setName, setBreakInterval, toggleModuleEnabled } = settingsSlice.actions;
export const selectAwake = (state: RootState) => state.settings.awake;
export const selectDuckType = (state: RootState) => state.settings.duckType;
export const selectDuckName = (state: RootState) => state.settings.duckName;
export const selectEnabledModules = (state: RootState) => state.settings.enabledModules;
export const selectBreakInterval = (state: RootState) => state.settings.breakInterval;

export default settingsSlice.reducer;