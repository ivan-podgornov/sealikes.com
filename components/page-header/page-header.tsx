import styles from './page-header.module.scss';
import PageNavigation from '../page-navigation/page-navigation';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';
import TheLogo from '../the-logo/the-logo';
import UserInfo from '../user-info/user-info';
import { Fragment, useState } from 'react';

export default function PageHeader() {
    const [checked, toggle] = useState(false);
    const changeHandler = () => toggle(!checked);

    return (
        <Fragment>
            <input
                className={styles.input}
                checked={checked}
                type="checkbox"
                id="header-toggler"
                onChange={changeHandler}
                tabIndex={-1}
                hidden
                aria-hidden
            />
            <header className={styles.header}>
                <TheLogo mode="primary" />
                <PageNavigation className={styles.navigation} />
                <UserInfo className={styles.user} />
            </header>
            <TheButton
                className={styles.toggler}
                component="label"
                htmlFor="header-toggler"
                mode="action"
                type="button"
                aria-hidden
            >
                <TheIcon name="menu" />
            </TheButton>
        </Fragment>
    );
};
