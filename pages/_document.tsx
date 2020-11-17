import cookie from 'next-cookies';
import DefaultHead from '../components/default-head/default-head';
import { RootState, createStore } from '../store';

import type {
    GetServerSidePropsResult,
    GetServerSidePropsContext as Context,
} from 'next';

import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document'

export type PageProps = GetServerSidePropsResult<{
    initialReduxState?: RootState,
}>;

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <DefaultHead />
                </Head>
                <body className="no-js">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }

    static async getInitialProps(context: DocumentContext) {
        const initialProps = await Document.getInitialProps(context)
        return { ...initialProps }
    }
};

export function getDefaultSsrProps(context: Context): PageProps {
    const store = createStore();
    const cookies = cookie(context);

    if ('token' in cookies) {
        try {
            store.dispatch({ type: 'user/auth', payload: cookies.token });
        } catch (error) {
            const past = new Date(15);
            const token = `token=""; Expires=${past}; SameSite=Strict`;
            context.res.statusCode = 302;
            context.res.setHeader('location', '/');
            context.res.setHeader('set-cookie', token);
            return { props: {} };
        }
    }

    return {
        props: {
            initialReduxState: store.getState(),
        },
    };
};

export const getServerSideProps = getDefaultSsrProps;
