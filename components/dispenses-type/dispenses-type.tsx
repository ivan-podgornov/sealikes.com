import classnames from 'classnames';
import styles from './dispenses-type.module.scss';
import DispenseComponent from '../dispense-component/dispense-component';
import TheCard from '../the-card/the-card';
import type { Dispense, OfferType } from '@social-exchange/types';
import { useSelector } from 'react-redux';
import type { RootState } from 'store/types';

type Props<OT extends OfferType> = {
    type: OT,
};

export default function DispensesType<OT extends OfferType>(props: Props<OT>) {
    const typeDispenses = useSelector((state: RootState) => (
        state.dispenses[props.type]
    ));

    const dispenses = typeDispenses.list as Array<Dispense<OT>>;

    return (
        <TheCard>
            <header className={styles.header}>
                <span className={styles.caption}>Задание</span>
                <span className={classnames(styles.caption, styles.status)}>
                    Статус
                </span>
            </header>
            {dispenses.length > 0 && (
                <ul className={styles.list}>
                    {dispenses.map((dispense, i) => (
                        <DispenseComponent
                            className={styles.item}
                            key={i}
                            dispense={dispense}
                            component="li"
                        />
                    ))}
                </ul>
            )}
            {dispenses.length === 0 && typeDispenses.reachLimit && (
                <p className={styles.empty}>
                    Вы исчерпали суточный лимит выполнений этого типа заданий.
                    Вы можете продолжить выполнять доступные задания в других
                    блоках.
                </p>
            )}
            {dispenses.length === 0 && !typeDispenses.reachLimit && (
                <p className={styles.empty}>
                    Подождите немного…<br />
                    Новые предложения появятся в ближайшее время.
                </p>
            )}
        </TheCard>
    );
};
