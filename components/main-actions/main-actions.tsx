import classnames from 'classnames';
import styles from './main-actions.module.scss';
import EventsList from '../events-list/events-list';
import TheButton from '../the-button/the-button';
import TheDropdown from '../the-dropdown/the-dropdown';
import TheIcon from '../the-icon/the-icon';
import TheTooltip from '../the-tooltip/the-tooltip';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

export default function MainActions() {
    const events = useSelector((state: RootState) => state.events.list);
    const eventsSummaryClasses = classnames({
        [styles.unread]: events.length > 0,
    });

    return (
        <div>
            <TheDropdown
                className={styles.action}
                summary={(
                    <TheButton
                        className={eventsSummaryClasses}
                        component="div"
                        type="button"
                        mode="action"
                    >
                        <TheIcon name="events" />
                        <TheTooltip>Уведомления</TheTooltip>
                    </TheButton>
                )}
            >
                <EventsList />
            </TheDropdown>
            <TheButton
                className={styles.action}
                component="a"
                href="/logout"
                type="button"
                mode="action"
                aria-label="Выход"
            >
                <TheIcon name="logout" />
                <TheTooltip>Выход</TheTooltip>
            </TheButton>
        </div>
    );
};
