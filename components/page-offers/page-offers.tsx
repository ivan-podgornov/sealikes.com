import LayoutInternal from '../../layouts/internal/internal';
import GridOffers from '../grid-offers/grid-offers';
import DispensesAll from '../dispenses-all/dispenses-all';
import OffersList from '../offers-list/offers-list';
import type { GetServerSidePropsContext as Context } from 'next';
import { createStore } from 'store';
import { load as loadDispenses } from 'store/dispenses';
import { load as loadOffers } from 'store/offers';
import { PageProps, getDefaultSsrProps } from '../../pages/_document';

export default function PageOffers() {
    return (
        <LayoutInternal title="Биржа заданий">
            <GridOffers left={DispensesAll} right={OffersList} />
        </LayoutInternal>
    );
};

export async function getServerSideProps(context: Context): Promise<PageProps> {
    const defaultProps = getDefaultSsrProps(context);
    const store = createStore(defaultProps.props.initialReduxState);

    await Promise.all([
        store.dispatch(loadDispenses()),
        store.dispatch(loadOffers()),
    ]);

    return {
        props: {
            initialReduxState: store.getState(),
        },
    };
}
