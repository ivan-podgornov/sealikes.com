import type { Offer, PublicExchangeEvent } from '@social-exchange/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import { userSlice } from './user';
import type { AppThunk, RootState } from './types';

type State = {
    list: Offer[],
};

type ReplaceOptions = {
    offer: Offer,
    newOffer?: Offer,
};

const initialState: State = {
    list: [],
};

export const offersSlice = createSlice({
    initialState,
    name: 'offers',
    reducers: {
        add(state, action: PayloadAction<Offer[]>) {
            const list = state.list.concat(action.payload);
            return { ...state, list };
        },

        replace(state, action: PayloadAction<ReplaceOptions>) {
            const list = [...state.list];
            const oldOffer = action.payload.offer;
            const index = list.findIndex((offer) => offer.id === oldOffer.id);
            if (index === -1) {
                throw new Error('Нельзя заменить задание которого нет');
            }

            const replace = action.payload.newOffer
                ? list.splice.bind(list, index, 1, action.payload.newOffer)
                : list.splice.bind(list, index, 1);
            replace();

            return { ...state, list };
        },
    },
});

export const { reducer: offersReducer } = offersSlice;


export const load = (): AppThunk<Promise<void>> => async (dispatch) => {
    const offers = await dispatch(api.offers.get());
    dispatch(offersSlice.actions.add(offers));
};

type ExecutionEvent = PublicExchangeEvent<'execution'>;
export const resolveExecutionEvent = (event: ExecutionEvent): AppThunk => {
    const selectOfferById = (id: number) => (state: RootState) => {
        return state.offers.list.find((offer) => offer.id === id);
    };

    return (dispatch, getState) => {
        const offer = selectOfferById(event.details.offerId)(getState());
        if (!offer) return;
        const countExecutions = offer.countExecutions + 1;
        if (countExecutions >= offer.count) {
            dispatch(offersSlice.actions.replace({ offer }));
            return;
        }

        const newOffer: Offer = { ...offer, countExecutions };
        dispatch(offersSlice.actions.replace({ offer, newOffer }));
    };
};

export const update = (offer: Offer, params: Partial<Offer>): AppThunk => {
    return async (dispatch) => {
        const newOffer = await dispatch(api.offers.put({
            uriParam: offer.id,
            ...params,
        }));

        dispatch(offersSlice.actions.replace({ offer, newOffer }));
    };
};

export const remove = (offer: Offer): AppThunk => async (dispatch) => {
    const { compensation } = await dispatch(api.offers.delete({
        uriParam: offer.id,
    }));

    dispatch(offersSlice.actions.replace({ offer }));
    dispatch(userSlice.actions.giveHearts(compensation));
};
