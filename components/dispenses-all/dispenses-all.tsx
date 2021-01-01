import classnames from 'classnames';
import styles from './dispenses-all.module.scss';
import DispensesType from '../dispenses-type/dispenses-type';
import TheIcon from '../the-icon/the-icon';
import { OfferType } from '@social-exchange/types';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { check } from 'store/executions';

export default function DispensesAll() {
    type Tab = {
        text: string;
        type: OfferType;
    };

    const tabs: Array<Tab> = [
        { text: 'Обмен лайками', type: OfferType.likes },
        { text: 'Обмен репостами', type: OfferType.reposts },
        { text: 'Обмен подписчиками', type: OfferType.friends },
        { text: 'Обмен участниками', type: OfferType.followers },
    ];

    const [active, activate] = useState(tabs[0].text);
    const clickHandler = (event: MouseEvent, tab: string) => {
        event.preventDefault();
        activate(tab);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        const focusHandler = () => dispatch(check());
        window.addEventListener('focus', focusHandler);
        return window.removeEventListener.bind(null, 'focus', focusHandler);
    }, []);

    return (
        <article>
            <header>
                <ul className={styles.tabs} role="tablist">
                    {tabs.map((tab, i) => (
                        <li
                            key={i}
                            className={styles.tab}
                            role="presentation"
                        >
                            <a
                                id={`tab-${tab.type}`}
                                href={`#${tab.type}`}
                                role="tab"
                                aria-selected={tab.text === active}
                                onClick={(e) => clickHandler(e, tab.text)}
                                className={classnames(
                                    styles.link,
                                    { [styles.active]: tab.text === active }
                                )}
                            >
                                {tab.text}
                                <TheIcon
                                    className={styles['tab-icon']}
                                    name={tab.type}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </header>
            {tabs.map((tab, i) => (
                <section
                    key={i}
                    id={tab.type}
                    role="tabpanel"
                    aria-labelledby={`tab-${tab.type}`}
                    hidden={tab.text !== active}
                    className={classnames(
                        styles.section,
                        { [styles.current]: tab.text === active }
                    )}
                >
                    <DispensesType type={tab.type} />
                </section>
            ))}
        </article>
    );
};
