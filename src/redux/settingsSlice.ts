import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {DuckType} from "../types/DuckType";

interface SettingsState {
    awake: boolean;
    duckType: DuckType;
}

const initialState: SettingsState = {
    awake: false,
    duckType: 'none',
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
        initialiseValues: (state, action: PayloadAction<SettingsState>) => {
            state.awake = action.payload.awake === undefined ? true : action.payload.awake;
            state.duckType = action.payload.duckType || 'none';
        },
    },
});

export const { toggleAwake, setDuckType, initialiseValues } = settingsSlice.actions;
export const selectAwake = (state: RootState) => state.settings.awake;
export const selectDuckType = (state: RootState) => state.settings.duckType;

export default settingsSlice.reducer;