import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { CheckResult } from '@social-exchange/types';
import { api } from './api';
import { dispensesSlice } from './dispenses';
import { userSlice } from './user';
import { AppThunk } from './types';

export type Execution = {
    dispenseId: number,
    status: 'wait'|'check'|'ok',
};

type StatusSetterOptions = {
    executions: Execution[],
    status: Execution['status'],
};

const initialState = {
    list: [] as Execution[],
};

export const executionsSlice = createSlice({
    initialState,
    name: 'executions',
    reducers: {
        add(state, action: PayloadAction<number>) {
            const dispenseId = action.payload;
            const isThere = state.list
                .find((execution) => execution.dispenseId === dispenseId);
            if (isThere) return;

            const execution: Execution = { dispenseId, status: 'wait' };
            const list = state.list.concat([execution]);
            return { ...state, list };
        },

        setStatus(state, action: PayloadAction<StatusSetterOptions>) {
            const status = action.payload.status;
            const list = action.payload.executions.reduce((list, execution) => {
                const index = list.findIndex((item) => (
                    item.dispenseId === execution.dispenseId
                    && item.status !== status
                ));
                const newExecution: Execution = { ...execution, status };
                list.splice(index, 1, newExecution);
                return list;
            }, [...state.list]);

            return { ...state, list };
        },

        remove(state, action: PayloadAction<number[]>) {
            const list = state.list.filter((execution) => {
                return !action.payload.includes(execution.dispenseId);
            });

            return { ...state, list };
        },
    },
});

export const { reducer: executionsReducer } = executionsSlice;

export const check = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const waiting = state.executions.list
        .filter((execution) => execution.status === 'wait');
    if (!waiting.length) return;

    const setStatus = executionsSlice.actions.setStatus;
    dispatch(setStatus({ executions: waiting, status: 'check' }));

    const dispensesIds = waiting.map((execution) => execution.dispenseId);
    const check = await dispatch(api.executions.post({ dispensesIds }));
    const findCorrespondingAction = findCorrespondingExecutions(check.results);
    const { success, failed } = dispatch(findCorrespondingAction);

    dispatch(setStatus({ executions: success, status: 'ok' }));
    dispatch(setStatus({ executions: failed, status: 'wait' }));
    dispatch(userSlice.actions.giveHearts(check.reward));

    const successIds = success.map((execution) => execution.dispenseId);
    setTimeout(() => {
        dispatch(executionsSlice.actions.remove(successIds));
        dispatch(dispensesSlice.actions.remove(successIds));
    }, 1000);
};

type CorrespondingExecutions = { success: Execution[], failed: Execution[] };
const findCorrespondingExecutions =
    (results: CheckResult[]): AppThunk<CorrespondingExecutions> => {
        const findResultByDispenseId = (id: number) => {
            return results.find((result) => result.dispenseId === id);
        };

        return (dispatch, getState) => {
            const state = getState();
            const success = state.executions.list
                .filter((execution) => {
                    const result = findResultByDispenseId(execution.dispenseId);
                    return result ? result.status : false;
                });
            const failed = state.executions.list
                .filter((execution) => !success.includes(execution));
            return { success, failed };
        };
    };
