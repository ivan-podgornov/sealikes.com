import styles from './offers-add.module.scss';
import CustomSelect from '../custom-select/custom-select';
import Instructions from './instructions';
import ModalWindow from '../modal-window/modal-window';
import TextField from '../text-field/text-field';
import TheButton from '../the-button/the-button';
import TheIcon from '../the-icon/the-icon';

import type { Dispatch, SetStateAction } from 'react';
import { OfferType } from '@social-exchange/types';
import type { Props as DefaultProps } from './types';
import type { Option } from '../custom-select/types';

type Props = DefaultProps & {
    count: string, setCount: Dispatch<SetStateAction<string>>,
    countError: string,
    link: string, setLink: Dispatch<SetStateAction<string>>,
    linkError: string,
    type: Option|null, setType: Dispatch<SetStateAction<Option|null>>,
    typeError: string,
    price: number,
    onClickCreate: () => void|Promise<void>,
};

export default function OffersAddComponent(props: Props) {
    const typeOptions = [
        { text: 'Лайки', value: OfferType.likes },
        { text: 'Репосты', value: OfferType.reposts },
        { text: 'Подписчики', value: OfferType.friends },
        { text: 'Участники', value: OfferType.followers },
    ];

    return (
        <ModalWindow
            name="offers-add"
            title="Добавить задание"
            onClose={props.close}
            open={props.isOpen}
        >
            <ol className={styles.list}>
                <li className={styles.item}>
                    <details
                        className={styles.dropdown}
                        open={props.type === null}
                    >
                        <summary className={styles.summary}>
                            Выберите тип задания
                            {props.type && (
                                <TheIcon name="status-ok" />
                            )}
                        </summary>
                        <CustomSelect
                            label="Тип задания"
                            name="type"
                            error={props.typeError}
                            onChange={props.setType}
                            options={typeOptions}
                            selected={props.type}
                        />
                    </details>
                </li>
                <li className={styles.item}>
                    <details
                        className={styles.dropdown}
                        open={props.type !== null}
                    >
                        <summary className={styles.summary}>
                            Оформить заказ
                        </summary>
                        <Instructions />
                        <div className={styles.field}>
                            <TextField
                                error={props.linkError}
                                label="Ссылка"
                                name="link"
                                type="url"
                                value={props.link}
                                setValue={props.setLink}
                            />
                        </div>
                        <div className={styles.field}>
                            <TextField
                                error={props.countError}
                                label="Количество выполнений"
                                name="count"
                                min={0}
                                type="number"
                                value={props.count}
                                setValue={props.setCount}
                            />
                        </div>
                    </details>
                </li>
            </ol>
            <div className={styles.footer}>
                <TheButton
                    mode="primary-block"
                    size="medium"
                    type="button"
                    onClick={props.onClickCreate}
                >
                    Оформить заказ
                </TheButton>
                <span className={styles.price}>
                    Цена:{' '}
                    <span>
                        {props.price}
                        <TheIcon name="like" />
                    </span>
                </span>
            </div>
        </ModalWindow>
    );
};
