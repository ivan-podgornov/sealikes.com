import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import type { AppThunk, RootState } from './types';

import {
    Dispense,
    Dispenses,
    TypedDispenses,
    OfferType,
} from '@social-exchange/types';

const initialState: Dispenses = {
    likes:      { list: [], reachLimit: false, type: 'likes' as OfferType.likes },
    reposts:    { list: [], reachLimit: false, type: 'reposts' as OfferType.reposts },
    followers:  { list: [], reachLimit: false, type: 'followers' as OfferType.followers },
    subscribes: { list: [], reachLimit: false, type: 'subscribes' as OfferType.subscribes },
};

export const dispensesSlice = createSlice({
    initialState,
    name: 'dispenses',
    reducers: {
        set(state, action: PayloadAction<Dispenses>) {
            return action.payload;
        },

        add(state, action: PayloadAction<TypedDispenses<OfferType>>) {
            const typeDispenses = state[action.payload.type];
            const list = typeDispenses.list.concat(action.payload.list);
            const reachLimit = action.payload.reachLimit;
            const type = action.payload.type;

            return {
                ...state,
                [type]: { list, reachLimit, type },
            };
        },

        merge(state, action: PayloadAction<Dispenses>) {
            return (Object.keys(action.payload) as OfferType[])
                .reduce((dispenses, key) => ({
                    ...dispenses,
                    [key]: {
                        list: state[key].list.concat(action.payload[key].list),
                        reachLimit: action.payload[key].reachLimit,
                        type: key,
                    },
                }), state);
        },

        mergeType(state, action: PayloadAction<TypedDispenses<OfferType>>) {
            const type = action.payload.type;
            return {
                ...state,
                [type]: {
                    type,
                    list: state[type].list.concat(action.payload.list),
                    reachLimit: action.payload.reachLimit,
                },
            };
        },

        remove(state, action: PayloadAction<number[]>) {
            const toRemove = action.payload;
            return (Object.keys(state) as OfferType[])
                .reduce((dispenses, key) => {
                    const list = dispenses[key].list
                        .filter((dispense) => !toRemove.includes(dispense.id));
                    return {
                        ...dispenses,
                        [key]: { ...dispenses[key], list },
                    };
                }, state);
        },
    },
});

export const { reducer: dispensesReducer } = dispensesSlice;

export const load = (): AppThunk<Promise<void>> => async (dispatch) => {
    const dispenses = await dispatch(api.dispenses.get());
    dispatch(dispensesSlice.actions.set(dispenses));
};

export const removeByOfferId = (offerId: number): AppThunk => {
    const selectDispensesByOfferId = (offerId: number) => (state: RootState) => {
        return (Object.keys(state.dispenses) as Array<OfferType>)
            .reduce<Dispense[]>(
                (all, type) => all.concat(state.dispenses[type].list),
                [],
            )
            .filter((dispense) => dispense.offer.id === offerId);
    };

    return async (dispatch, getState) => {
        const dispenses = selectDispensesByOfferId(offerId)(getState());
        const ids = dispenses.map((dispense) => dispense.id);
        dispatch(dispensesSlice.actions.remove(ids));
    };
};
