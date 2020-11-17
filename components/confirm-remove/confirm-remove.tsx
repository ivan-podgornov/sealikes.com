import ModalWindow, { Props as ModalProps } from '../modal-window/modal-window';
import TheButton from '../the-button/the-button';
import { Fragment } from 'react';

type Props = ModalProps & {
    onConfirm: () => void,
};

export default function ConfirnRemove(props: Props) {
    const { children, onConfirm, ...modalProps } = props;

    return (
        <ModalWindow {...modalProps}>
            <Fragment>
                {children}
                <TheButton
                    mode="accent"
                    size="medium"
                    type="button"
                    onClick={onConfirm}
                >
                    Да, удалить
                </TheButton>
            </Fragment>
        </ModalWindow>
    );
};
