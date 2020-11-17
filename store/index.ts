import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { dispensesReducer } from './dispenses';
import { executionsReducer } from './executions';
import { eventsReducer } from './events';
import { offersReducer } from './offers';
import { offersCreateReducer } from './offers-create';
import { userReducer } from './user';

let store: ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof store.getState>;
export type Store = ReturnType<typeof createStore>;

export function createStore(preloadedState?: object) {
    return configureStore({
        preloadedState,
        devTools: process.env.NODE_ENV === 'development',
        reducer: {
            dispenses: dispensesReducer,
            executions: executionsReducer,
            events: eventsReducer,
            offers: offersReducer,
            offersCreate: offersCreateReducer,
            user: userReducer,
        },
    });
}

export function useStore(preloadedState: RootState) {
    const store = useMemo(() => createStore(preloadedState), [preloadedState]);
    return store;
};
