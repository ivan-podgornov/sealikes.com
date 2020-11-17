import styles from './offer-base.module.scss';
import classnames from 'classnames';
import { Offer } from '@social-exchange/types';

type Props = {
    className?: string,
    children: string|JSX.Element|Array<string|JSX.Element>,
    offer: Offer,
    onClick?: () => void,
    title: string,
};

export default function OfferBase(props: Props) {
    const className = classnames(props.className, styles.offer);

    return (
        <div className={className}>
            <img
                className={styles.image}
                src={props.offer.cover}
                height="48"
                width="48"
                aria-hidden
            />
            <div>
                <a
                    className={styles.title}
                    href={props.offer.link}
                    onClick={props.onClick}
                    target="_blank"
                >
                    {props.title}
                </a>
                {props.children}
            </div>
        </div>
    );
}
