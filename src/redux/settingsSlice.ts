import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SettingsState {
    awake: boolean;
};

const initialState: SettingsState = {
    awake: false,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setAwake: (state: SettingsState, action: PayloadAction<boolean>) => {
            state.awake = action;
        },
    }
})