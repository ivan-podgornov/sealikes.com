import cookie from 'next-cookies';
import PageIndex from '../components/page-index/page-index';
import PageOffers from '../components/page-offers/page-offers';
import { GetServerSidePropsContext as Context } from 'next';
import { PageProps } from './_document';
import { getServerSideProps as getIndexSsrProps } from '../components/page-index/page-index';
import { getServerSideProps as getOffersSsrProps } from '../components/page-offers/page-offers';

type SsrPropsResult = PageProps & {
    props: PageProps['props'] & {
        componentName: 'index'|'offers',
    },
};

export default function PageMain(props: SsrPropsResult['props']) {
    const Component = props.componentName === 'index' ? PageIndex : PageOffers;
    return <Component />;
};

export async function getServerSideProps(context: Context): Promise<SsrPropsResult> {
    const cookies = cookie(context);
    const defaultProps = 'token' in cookies
        ? await getOffersSsrProps(context)
        : getIndexSsrProps(context);

    return {
        props: {
            ...defaultProps.props,
            componentName: 'token' in cookies ? 'offers' : 'index',
        },
    };
}
