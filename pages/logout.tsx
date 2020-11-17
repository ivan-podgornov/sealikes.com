import type { GetServerSidePropsContext as Context } from 'next';

export function getServerSideProps(context: Context) {
    const YEAR_IN_MS = 3.154e+10;
    const expires = new Date(Date.now() - YEAR_IN_MS).toUTCString();

    context.res.writeHead(302, {
        'location': '/',
        'set-cookie': `token=0; Expires=${expires}; HttpOnly`,
    }).end();

    return { props: {} };
};

export default function PageLogout() {
    return <span>Выход</span>;
};
