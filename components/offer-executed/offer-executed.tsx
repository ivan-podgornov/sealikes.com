import styles from './offer-executed.module.scss';
import OfferBase from '../offer-base/offer-base';
import TheIcon from '../the-icon/the-icon';
import { Offer } from '@social-exchange/types';

type Props = {
    offer: Offer,
};

export default function OfferExecuted(props: Props) {
    return (
        <OfferBase offer={props.offer} title={props.offer.link}>
            <span className={styles.text}>Задание выполнено</span>
            <TheIcon className={styles.icon} name="tick" />
        </OfferBase>
    );
}
