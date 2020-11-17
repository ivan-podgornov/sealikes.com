import styles from './dispense-component.module.scss';
import classnames from 'classnames';
import OfferBase from '../offer-base/offer-base';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';
import TheTooltip from '../the-tooltip/the-tooltip';
import type { Dispense, Offer } from '@social-exchange/types';
import { useDispatch, useSelector } from 'react-redux';
import { Execution, executionsSlice } from 'store/executions';
import type { RootState } from 'store/types';

type Props = {
    className?: string,
    component?: 'div'|'li',
    dispense: Dispense,
};

export default function DispenseComponent(props: Props) {
    const { component: Component = 'div' } = props;
    const { offer } = props.dispense as { offer: Offer };
    const execution = useSelector((state: RootState) => {
        return state.executions.list
            .find((execution) => execution.dispenseId === props.dispense.id);
    });

    const translate = (execution?: Execution) => {
        const translates = {
            'check': 'Проверка',
            'ok': 'Выполнено',
            'wait': 'Ожидает',
        } as { [key in Execution['status']]: string };
        return execution ? translates[execution.status] : 'Ожидает';
    };

    const status = translate(execution);
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(executionsSlice.actions.add(props.dispense.id));
    };

    const replaceHandler = () => {
        console.log('replace');
    };

    return (
        <Component className={classnames(props.className, styles.dispense)}>
            <OfferBase
                offer={offer}
                title={props.dispense.title}
                onClick={clickHandler}
            >
                <div className={styles.reward}>
                    Награда: {props.dispense.reward}
                    <TheIcon name="like" />
                </div>
            </OfferBase>
            <TheButton
                className={styles.renew}
                mode="icon"
                type="button"
                onClick={replaceHandler}
            >
                <TheIcon name="renew" />
                <TheTooltip>Заменить задание</TheTooltip>
            </TheButton>
            <div className={styles['status-container']}>
                <span className={styles['status-text']}>
                    {status}
                </span>
            </div>
        </Component>
    );
}
