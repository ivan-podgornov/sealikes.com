import styles from './events-list.module.scss';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';
import OfferExecuted from '../offer-executed/offer-executed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { read } from 'store/events';
import type {
    ExchangeEvent,
    EventTypes,
} from '@social-exchange/api-client/dist/events';

export default function EventsList() {
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.list);
    const remove = (event: ExchangeEvent<EventTypes>) => {
        dispatch(read(event.id));
    };

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Уведомления</h2>
                <span className={styles.counter}>
                    {events.length}
                </span>
            </header>
            {events.length > 0 && (
                <ul className={styles.list}>
                    {events.map((event) => (
                        <li key={event.id} className={styles.item}>
                            <OfferExecuted {...event.details} />
                            <TheButton
                                className={styles.close}
                                onClick={() => remove(event)}
                                mode="icon"
                                type="button"
                            >
                                <TheIcon name="close" />
                            </TheButton>
                        </li>
                    ))}
                </ul>
            )}
            {events.length === 0 && (
                <p className={styles.empty}>
                    Новых уведомлений нет
                </p>
            )}
        </article>
    );
}
