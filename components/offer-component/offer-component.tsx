import classnames from 'classnames';
import styles from './offer-component.module.scss';
import ConfirmRemove from '../confirm-remove/confirm-remove';
import OfferBase from '../offer-base/offer-base';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';
import TheTooltip from '../the-tooltip/the-tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update, remove } from 'store/offers';
import type { Offer, OfferStatus } from '@social-exchange/types';

type Props = {
    className?: string,
    component?: 'div'|'li';
    offer: Offer;
};

export default function OfferComponent(props: Props) {
    const types = {
        likes: 'лайки',
        reposts: 'репосты',
        followers: 'подписчики',
        subscribes: 'участники',
    };

    const { offer, component: Component = 'div' } = props;
    const linkText = `тип: ${types[offer.type]}`;
    const [wantRemove, setWantRemove] = useState(false);
    const [status, setStatus] = useState<OfferStatus>(offer.status);
    const newStatus = (status === 'active' ? 'pause' : 'active') as OfferStatus;
    const icon = status === 'pause' ? 'resume' : 'pause';
    const tooltip = status === 'pause'
        ? 'Продолжить выполнение' : 'Поставить на паузу';

    const dispatch = useDispatch();
    const pauseResumeHandler = () => {
        const action = update(offer, { status: newStatus });
        dispatch(action);
        setStatus(newStatus);
    };

    const removeHandler = () => {
        dispatch(remove(offer));
        setWantRemove(false);
    };

    return (
        <Component className={classnames(props.className, styles.container)}>
            <OfferBase offer={offer} title={linkText}>
                <div className={styles.executions}>
                    Выполнений: {offer.countExecutions} / {offer.count}
                </div>
            </OfferBase>
            <div className={styles.actions}>
                {(status === 'active' || status === 'pause') && (
                    <TheButton
                        type="button"
                        mode="icon"
                        onClick={pauseResumeHandler}
                    >
                        <TheIcon name={icon} />
                        <TheTooltip>
                            {tooltip}
                        </TheTooltip>
                    </TheButton>
                )}
                <TheButton
                    type="button"
                    mode="icon"
                    onClick={setWantRemove.bind(null, true)}
                >
                    <TheIcon name="close" />
                    <TheTooltip>Удалить</TheTooltip>
                </TheButton>
            </div>
            <ConfirmRemove
                name="confirm-offer-remove"
                open={wantRemove}
                title="Подтверждение"
                onClose={setWantRemove.bind(null, false)}
                onConfirm={removeHandler}
            >
                <p>
                    В случае удаления задания, мы вернём Вам сердечки за
                    недостающие выполнения. Вы уверены, что хотите
                    удалить задание?
                </p>
            </ConfirmRemove>
        </Component>
    );
};
