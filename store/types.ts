import type { Action, ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type { RootState } from './index';
export type { Store } from './index';
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
