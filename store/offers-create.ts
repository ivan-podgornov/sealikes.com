import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { OfferConstructorOptions } from '@social-exchange/types';
import type { ValidationError } from '@social-exchange/api-client/dist/errors/validation-error';
import { api } from './api';
import { userSlice } from './user';
import { offersSlice } from './offers';
import type { AppThunk } from './types';

type ValidationErrors = ValidationError['errors'];

const initialState = {
    countError: '',
    linkError: '',
    typeError: '',
};

export const offersCreateSlice = createSlice({
    initialState,
    name: 'offers-create',
    reducers: {
        clearErrors() {
            return { ...initialState };
        },

        resolveValidationError(state, action: PayloadAction<ValidationErrors>) {
            return {
                countError: action.payload.count || '',
                linkError: action.payload.link || '',
                typeError: action.payload.type || '',
            };
        },
    },
});

export const { reducer: offersCreateReducer } = offersCreateSlice;

type Result = Promise<boolean>;
export const create = (options: OfferConstructorOptions): AppThunk<Result> => {
    return async (dispatch) => {
        try {
            dispatch(offersCreateSlice.actions.clearErrors());
            const response = await dispatch(api.offers.post(options));
            const offers = [response.offer];

            dispatch(offersSlice.actions.add(offers));
            dispatch(userSlice.actions.takeHearts(response.price));
            return true;
        } catch (error) {
            if (error.name === 'ValidationError') {
                const action = offersCreateSlice.actions.resolveValidationError;
                dispatch(action(error.errors));
                return false;
            }

            throw error;
        }
    };
};
