import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {DuckType} from "../types/DuckType";

interface SettingsState {
    awake: boolean;
    duckType: DuckType;
    duckName: string;
}

const initialState: SettingsState = {
    awake: false,
    duckType: 'none',
    duckName: 'Ducky',
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
        initialiseValues: (state, action: PayloadAction<SettingsState>) => {
            state.awake = action.payload.awake === undefined ? true : action.payload.awake;
            state.duckType = action.payload.duckType || 'none';
            state.duckName = action.payload.duckName || 'Ducky';
        },
    },
});

export const { toggleAwake, setDuckType, initialiseValues, setName } = settingsSlice.actions;
export const selectAwake = (state: RootState) => state.settings.awake;
export const selectDuckType = (state: RootState) => state.settings.duckType;
export const selectDuckName = (state: RootState) => state.settings.duckName;

export default settingsSlice.reducer;