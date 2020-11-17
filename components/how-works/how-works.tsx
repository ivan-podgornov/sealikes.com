import { useState, useEffect } from 'react';
import classnames from 'classnames';
import LayoutPositioner from '../layout-positioner/layout-positioner';
import LoginButton from '../login-button/login-button';
import PrimaryParagraph from '../primary-paragraph/primary-paragraph';
import SectionTitle from '../section-title/section-title';
import Image from './assets/likes.svg';
import styles from './how-works.module.scss';

export default function HowWorks() {
    const [active, activate] = useState(0);
    const items = [
        'Авторизоваться на сайте',
        'Заработать или купить баллы',
        'Добавить соответствующее задание',
    ];

    useEffect(() => {
        setTimeout(() => {
            const newActive = active === items.length - 1 ? 0 : active + 1;
            activate(newActive);
        }, 2000);
    }, [active]);

    return (
        <section id="how-it-works" className={styles.container}>
            <LayoutPositioner className={styles.content}>
                <SectionTitle mode="left">
                    Как это работает
                </SectionTitle>
                <PrimaryParagraph>
                    Чтобы начать получать лайки, репосты или подписчиков, нужно:
                </PrimaryParagraph>
                <ol className={styles.list}>
                    {items.map((text, i) => (
                        <li
                            key={i}
                            className={classnames(
                                styles.item,
                                { [styles.active]: active === i },
                            )}
                        >
                            <span>{text}</span>
                        </li>
                    ))}
                </ol>
                <LoginButton
                    mode="primary"
                    place="how-works"
                    size="big"
                    type="button"
                >
                    Войти
                </LoginButton>
                <img
                    className={styles.image}
                    src={Image}
                    alt="Лайки, репосты, подписчики"
                />
            </LayoutPositioner>
        </section>
    );
};
