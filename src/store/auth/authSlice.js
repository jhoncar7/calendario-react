import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // authenticated , not-authenticated
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.errorMessage = undefined;
            state.user = {};
            state.status = 'checking';
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.errorMessage = undefined;
            state.user = payload;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.errorMessage = payload;
            state.user = {};
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;