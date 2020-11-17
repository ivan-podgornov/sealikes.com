import styles from './modal-window.module.scss';
import ResizeObserver from 'resize-observer-polyfill';
import TheButton from '../the-button/the-button';
import TheCard from '../the-card/the-card';
import TheIcon from '../the-icon/the-icon';
import { useRouter } from 'next/router';

import {
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useState,
    useRef,
} from 'react';

export type Props = {
    children: string|JSX.Element|Array<string|JSX.Element>;
    name: string;
    onClose?: () => void;
    open?: boolean;
    title: string;
};

export default function ModalWindow(props: Props) {
    const router = useRouter();
    const dialogId = `dialog-${props.name}`;
    const contentId = `dialog-${props.name}-describe`;
    const titleId = `dialog-${props.name}-title`;
    const { open = false } = props;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [lastActive, setLastActive] = useState<HTMLElement|null>(null);

    /** Если пользователь жмёт ESCAPE, закрывает модальное окно */
    const KeyDownHandler = (event: KeyboardEvent) => {
        const ESCAPE = 27;
        if (event.which === ESCAPE && props.onClose) {
            props.onClose();
        }
    };

    const CloseHandler = (event?: MouseEvent) => {
        if ('pushState' in history) {
            const hashPos = document.location.href.indexOf('#');
            const to = hashPos === -1 ? document.location.href.length : hashPos;
            const href = document.location.href.slice(0, to);
            document.location.hash = '';
            history.pushState('', document.title, href);
            if (event) event.preventDefault();
        }

        if (props.onClose) {
            const container = dialogRef.current as HTMLDialogElement;
            const contentEl = container
                .querySelector(`.${styles.content}`) as HTMLElement;
            contentEl.style.marginTop = '';
            setTimeout(props.onClose, 300);
        }
    };

    /** Если фокус выходит из модального окна, устанавливает его на окно */
    const FocusHandler = (event: FocusEvent) => {
        if (!dialogRef.current || !event.target) return;
        const target = event.target as HTMLElement;

        if (!target.closest(`#${dialogId}`)) {
            event.stopPropagation();
            dialogRef.current.focus();
        }
    };

    const ResizeHandler = (container: HTMLElement, content: HTMLElement) => {
        const top = (container.offsetHeight - content.offsetHeight) / 2;
        content.style.marginTop = `${Math.max(top, 40)}px`;
    };

    useEffect(() => {
        const container = dialogRef.current as HTMLDialogElement;
        const content = container
            .querySelector(`.${styles.content}`) as HTMLElement;
        const handler = () => ResizeHandler(container, content);
        const observer = new ResizeObserver(handler);

        if (open) {
            document.addEventListener('focus', FocusHandler, true);
            document.body.style.overflow = 'hidden';
            ResizeHandler(container, content);
            observer.observe(content);
        }

        return () => {
            document.removeEventListener('focus', FocusHandler, true);
            document.body.style.overflow = '';
            content.style.marginTop = '';
            observer.disconnect();
        };
    }, [open === true]);

    useEffect(() => {
        if (open && document.activeElement) {
            setLastActive(document.activeElement as HTMLElement);
            if (dialogRef.current) dialogRef.current.focus();
            return;
        }

        if (lastActive) {
            lastActive.focus();
        }
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.modal}
            id={dialogId}
            open={open}
            tabIndex={open ? 0 : -1}
            aria-describedby={contentId}
            aria-hidden={!open}
            aria-labelledby={titleId}
            onKeyDown={KeyDownHandler}
        >
            <TheCard className={styles.content}>
                <TheButton
                    className={styles.close}
                    component="a"
                    href={router.pathname}
                    mode="icon"
                    type="button"
                    role="button"
                    aria-label="Закрыть окно"
                    onClick={CloseHandler}
                >
                    <TheIcon name="close" />
                </TheButton>
                <h2 className={styles.title} id={titleId}>
                    {props.title}
                </h2>
                <div id={contentId}>
                    {props.children}
                </div>
            </TheCard>
        </dialog>
    );
};
