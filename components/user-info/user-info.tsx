import classnames from 'classnames';
import styles from './user-info.module.scss';
import ModalPayment from '../modal-payment/modal-payment';
import TheIcon from '../the-icon/the-icon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { load } from 'store/user';

type Props = {
    className?: string;
};

export default function UserInfo(props: Props) {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const [isOpenPayment, togglePayment] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const close = togglePayment.bind(null, false);
    const changeRouteHandler = () => setIsLoaded(false);

    useEffect(() => {
        if (document.location.hash === '#payment-create') {
            togglePayment(true);
        };

        router.events.on('routeChangeComplete', changeRouteHandler);
        return () => {
            router.events.off('routeChangeComplete', changeRouteHandler);
        };
    }, []);

    useEffect(() => {
        if (isLoaded === true) return;
        setIsLoaded(true);
        dispatch(load());
    }, [isLoaded]);

    return (
        <div className={classnames(props.className, styles.user)}>
            {!user.photo && (
                <span className={styles.image}>
                    {user.name.slice(0, 2)}
                </span>
            )}
            {user.photo && (
                <img
                    className={styles.image}
                    src={user.photo}
                    height="43"
                    width="48"
                />
            )}
            <span className={styles.name}>
                {user.name}
            </span>
            <span className={styles.balance}>
                {user.balance}{' '}
                <TheIcon className={styles.like} name="like" />
            </span>{' '}
            <a
                href="#payment-create"
                className={styles.buy}
                onClick={() => togglePayment(true)}
                role="button"
            >
                Пополнить
            </a>
            <ModalPayment open={isOpenPayment} onClose={close} />
        </div>
    );
};
