import styles from './modal-payment.module.scss';
import ModalWindow, { Props as ModalProps } from '../modal-window/modal-window';
import TextField from '../text-field/text-field';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

type Props = {
    onClose: ModalProps['onClose'];
    open: ModalProps['open'];
};

export default function ModalPayment(props: Props) {
    const defaultValue = 500;
    const [count, setCount] = useState(defaultValue.toString());
    const price = ((parseInt(count) || 0) / 10).toFixed(1);
    const action = `${process.env.NEXT_PUBLIC_API_URL}/payments`;
    const account = useSelector((state: RootState) => state.user.id);

    return (
        <ModalWindow
            name="payment-create"
            title="Пополнение счёта"
            {...props}
        >
            <form action={action} method="POST">
                <p className={styles.paragraph}>
                    Для более быстрого продвижения своей группы или страницы, Вы
                    можете заказать сердечки через эту форму.
                </p>
                <input type="hidden" name="account" value={account} />
                <TextField
                    label="Количество сердечек"
                    min={100}
                    name="count"
                    type="number"
                    value={count}
                    setValue={setCount}
                />
                <div className={styles.footer}>
                    <TheButton mode="primary-block" size="medium" type="submit">
                        Оплатить
                    </TheButton>
                    <span className={styles.price}>
                        Цена:{' '}
                        <span>
                            {price}
                            <TheIcon name="rouble" />
                        </span>
                    </span>
                </div>
            </form>
        </ModalWindow>
    );
};
