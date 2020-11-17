import jwtDecode from 'jwt-decode';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import { AppThunk } from './types';
import type {
    JwtPayload,
    Incognito,
    NetworkType,
    User,
} from '@social-exchange/types';

type State = User & Incognito & { token: string };
const initialState: State = {
    id: 0,
    balance: 0,
    name: 'unknown',
    photo: '',
    token: '',
    type: 'vk' as NetworkType,
    uid: 0,
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        auth(state, action: PayloadAction<string>) {
            const jwtPayload: JwtPayload = jwtDecode(action.payload);
            return { ...state, ...jwtPayload, token: action.payload };
        },

        update(state, action: PayloadAction<User>) {
            return { ...state, ...action.payload };
        },

        reset() {
            return initialState;
        },

        giveHearts(state, action: PayloadAction<number>) {
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        },

        takeHearts(state, action: PayloadAction<number>) {
            return {
                ...state,
                balance: state.balance - action.payload,
            };
        },
    },
});

export const { reducer: userReducer } = userSlice;

export const load = (): AppThunk => async (dispatch) => {
    const user = await dispatch(api.users.get());
    dispatch(userSlice.actions.update(user));
};
