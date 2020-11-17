import styles from './index-header.module.scss';
import LayoutPositioner from '../layout-positioner/layout-positioner';
import LoginButton from '../login-button/login-button';
import TheLogo from '../the-logo/the-logo';

export default function IndexHeader() {
    return (
        <LayoutPositioner component="header" className={styles.header}>
            <TheLogo />
            <LoginButton
                className={styles.login}
                mode="accent"
                place="header"
                type="button"
            >
                Войти
            </LoginButton>
        </LayoutPositioner>
    );
};
