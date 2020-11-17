import FirstScreen from '../first-screen/first-screen';
import HowWorks from '../how-works/how-works';
import IndexHeader from '../index-header/index-header';
import PageFooter from '../page-footer/page-footer';
import TheFeatures from '../the-features/the-features';
import { Fragment } from 'react';
import {
    PageProps,
    getDefaultSsrProps,
} from '../../pages/_document';

import type {
    GetServerSidePropsContext as Context,
    GetServerSidePropsResult,
} from 'next';

type SsrProps = GetServerSidePropsResult<PageProps>;

export function getServerSideProps(context: Context): SsrProps {
    const props = getDefaultSsrProps(context);

    if ('token' in context.query) {
        const YEAR_IN_MS = 3.154e+10;
        const value = `token=${context.query.token}`;
        const expires = new Date(Date.now() + YEAR_IN_MS).toUTCString();
        const cookie = `${value}; Expires=${expires}; HttpOnly`;

        context.res.writeHead(302, {
            'location': '/',
            'set-cookie': cookie,
        }).end();
    }

    return { props };
};

export default function PageIndex() {
    return (
        <Fragment>
            <IndexHeader />
            <main>
                <article>
                    <FirstScreen />
                    <HowWorks />
                    <TheFeatures />
                </article>
            </main>
            <PageFooter />
        </Fragment>
    );
};
