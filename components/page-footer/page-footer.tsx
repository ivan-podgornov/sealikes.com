import styles from './page-footer.module.scss';
import LayoutPositioner from '../layout-positioner/layout-positioner';
import TheLogo from '../the-logo/the-logo';

export default function PageFooter() {
    return (
        <footer className={styles.footer}>
            <LayoutPositioner>
                <TheLogo />
                <p className={styles.copyright}>
                    © Продвижение в соцсетях — My Likes 2020.
                </p>
            </LayoutPositioner>
        </footer>
    );
};
