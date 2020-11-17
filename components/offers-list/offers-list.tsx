import classnames from 'classnames';
import styles from './offers-list.module.scss'
import OfferComponent from '../offer-component/offer-component';
import OffersAdd from '../offers-add/offers-add';
import TheButton from '../the-button/the-button';
import TheCard from '../the-card/the-card';
import TheIcon from '../the-icon/the-icon';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/types';

type Props = {
    className?: string;
};

export default function OffersMy(props: Props) {
    const classes = classnames(props.className, styles.container);
    const offers = useSelector((state: RootState) => state.offers.list);
    const [isOpenAdd, toggleAdd] = useState(false);
    const openAdd = toggleAdd.bind(null, true);

    const closeAdd = () => {
        toggleAdd(false);
        if (document.location.hash === '#dialog-offers-add') {
            document.location.hash = '';
        }
    }

    useEffect(() => {
        if (document.location.hash === '#dialog-offers-add') {
            openAdd();
        };
    }, []);

    return (
        <Fragment>
            <TheCard className={classes} component="aside">
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        Мои задания
                    </h2>
                    <label>
                        <span className={styles['new-title']}>
                            Новое задание
                        </span>
                        <TheButton
                            className={styles['new-button']}
                            component="a"
                            href="#dialog-offers-add"
                            mode="action"
                            type="button"
                            onClick={openAdd}
                            aria-label="Добавить задание"
                            role="button"
                        >
                            <TheIcon name="plus" />
                        </TheButton>
                    </label>
                </header>
                <section>
                    {offers.length > 0 && (
                        <ul className={styles.list}>
                            {offers.map((offer, i) => (
                                <OfferComponent
                                    key={i}
                                    className={styles.item}
                                    component="li"
                                    offer={offer}
                                />
                            ))}
                        </ul>
                    )}
                    {offers.length === 0 && (
                        <div className={styles.empty}>
                            <p>
                                Пока что, у Вас нет активных заданий. Нажмите на
                                кнопку "Новое задание", чтобы добавить.
                            </p>
                        </div>
                    )}
                </section>
            </TheCard>
            <OffersAdd close={closeAdd} isOpen={isOpenAdd} />
        </Fragment>
    );
};
