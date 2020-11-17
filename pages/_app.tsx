import '../assets/styles/global.scss';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};
