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
    likes:     { list: [], reachLimit: false, type: OfferType.likes },
    reposts:   { list: [], reachLimit: false, type: OfferType.reposts },
    friends:   { list: [], reachLimit: false, type: OfferType.friends },
    followers: { list: [], reachLimit: false, type: OfferType.followers },
};

export const dispensesSlice = createSlice({
    initialState,
    name: 'dispenses',
    reducers: {
        set(state, action: PayloadAction<Dispenses>) {
            return action.payload;
        },

        add<OT extends OfferType>(state: Dispenses, action: PayloadAction<TypedDispenses<OT>>) {
            const typeDispenses = state[action.payload.type];
            const list = (typeDispenses.list as Array<Dispense<OT>>).concat(action.payload.list);
            const reachLimit = action.payload.reachLimit;
            const type = action.payload.type;

            return {
                ...state,
                [type]: { list, reachLimit, type },
            };
        },

        remove(state, action: PayloadAction<number[]>) {
            const toRemove = action.payload;
            return (Object.keys(state) as OfferType[])
                .reduce((dispenses, key) => {
                    const list = (dispenses[key].list as Array<Dispense>)
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
