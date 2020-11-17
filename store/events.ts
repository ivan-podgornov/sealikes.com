import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiEventListener } from '@social-exchange/api-client/dist/event-listener';
import type { PublicExchangeEvent } from '@social-exchange/types';
import { api } from './api';
import { dispensesSlice, removeByOfferId } from './dispenses';
import { resolveExecutionEvent } from './offers';
import type { AppThunk } from './types';

const initialState = {
    list: [] as Array<PublicExchangeEvent<'offer-executed'>>,
};

export const eventsSlice = createSlice({
    initialState,
    name: 'events',
    reducers: {
        add(state, action: PayloadAction<PublicExchangeEvent<'offer-executed'>>) {
            const list = state.list.concat([action.payload]);
            return { ...state, list };
        },

        remove(state, action: PayloadAction<number>) {
            const list = state.list
                .filter((event) => event.id !== action.payload);
            return { ...state, list };
        },
    },
});

export const { reducer: eventsReducer } = eventsSlice;

export const listenEvents = (): AppThunk => async (dispatch, getState) => {
    const host = process.env.NEXT_PUBLIC_API_URL as string;
    const eventListener = new ApiEventListener({
        baseURL: host,
        token: getState().user.token,
    });

    eventListener.on('execution', (event) => {
        dispatch(resolveExecutionEvent(event));
        setTimeout(() => dispatch(removeByOfferId(event.details.offerId)), 1000);
    });

    eventListener.on('dispenses', (event) => {
        dispatch(dispensesSlice.actions.set(event.details));
    });

    eventListener.on('invalidate-dispense', (event) => {
        dispatch(dispensesSlice.actions.remove([event.details.dispenseId]));
    });

    eventListener.on('offer-executed', (event) => {
        dispatch(eventsSlice.actions.add(event));
    });
};

export const read = (eventId: number): AppThunk => async (dispatch) => {
    await dispatch(api.events.put({
        uriParam: eventId,
        read: true,
    }));

    dispatch(eventsSlice.actions.remove(eventId));
};
