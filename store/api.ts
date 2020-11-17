import type { AppThunk, RootState } from './types';
import {
    ApiClient,
    Endpoints,
    Methods,
    Options,
    Response,
    endpoints,
} from '@social-exchange/api-client';

class ReduxApiClient {
    dispenses = this.getEndpointFunctions('dispenses');
    events = this.getEndpointFunctions('events');
    executions = this.getEndpointFunctions('executions');
    offers = this.getEndpointFunctions('offers');
    users = this.getEndpointFunctions('users');

    private readonly client = new ApiClient();

    private getEndpointFunctions<E extends keyof Endpoints>(endpoint: E) {
        type EndpointFunctions = {
            [method in Methods<E>]: (params?: Options<E, method>)
                => AppThunk<Promise<Response<E, method>>>
        };

        const methods = endpoints[endpoint] as Array<Methods<E>>;
        return methods.reduce((functions, method) => {
            const fn = (params?: Options<E, Methods<E>>) =>
                this.getThunk(endpoint, method, params);
            return { ...functions, [method]: fn.bind(this) };
        }, {} as EndpointFunctions);
    }

    private getThunk<E extends keyof Endpoints, M extends Methods<E>>(
        endpoint: E,
        method: M,
        params?: Options<E, M>,
    ): AppThunk<Promise<Response<E, M>>> {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const tokenSelector = (state: RootState) => state.user.token as string;

        return async (dispatch, getState) => {
            const token = tokenSelector(getState());
            const options = { baseURL, token };
            return this.client.call(endpoint, method, options, params);
        };
    }
}

export const api = new ReduxApiClient();
