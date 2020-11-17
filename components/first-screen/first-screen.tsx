import LayoutPositioner from '../layout-positioner/layout-positioner';
import LoginButton from '../login-button/login-button';
import SocialImage from './assets/social.svg';
import styles from './first-screen.module.scss';

export default function FirstScreen() {
    return (
        <section className={styles.screen}>
            <LayoutPositioner className={styles.content}>
                <h1 className={styles.heading}>
                    Бесплатное продвижение ВКонтакте
                </h1>
                <img
                    className={styles.image}
                    src={SocialImage}
                    alt="Социальные сети"
                />
                <p className={styles.paragraph}>
                    Быстрая и безопасная накрутка лайков, репостов, подписчиков
                    для аккаунтов и групп ВКонтакте.
                </p>
                <div className={styles.buttons}>
                    <LoginButton
                        className={styles.login}
                        mode="accent"
                        place="first-screen"
                        size="big"
                        type="button"
                    >
                        Продвигать
                    </LoginButton>
                    <a className={styles.more} href="#how-it-works">
                        Узнать больше →
                    </a>
                </div>
            </LayoutPositioner>
        </section>
    );
};
