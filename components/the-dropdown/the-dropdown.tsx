import styles from './the-dropdown.module.scss';
import classnames from 'classnames';
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';

type Props = {
    className?: string,
    children: JSX.Element|string|Array<JSX.Element|string>,
    defaultOpen?: boolean,
    summary: JSX.Element|string|Array<JSX.Element|string>,
};

export default function TheDropdown(props: Props) {
    const classes = classnames(props.className, styles.dropdown);
    const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);
    const toggle = (enforce?: boolean) => setIsOpen(enforce ?? !isOpen);
    const summaryClickHandler = (event: ReactMouseEvent) => {
        event.preventDefault();
        toggle();
    };

    /** Возвращает true, если клик произошел за пределами dropdown */
    const detectOuterClick = (event: MouseEvent): boolean => {
        const target = event.target as HTMLDetailsElement|null;
        if (!target) return false;
        return !target.closest(`.${styles.dropdown}`);
    };

    const documentClickHandler = (event: MouseEvent) => {
        if (!isOpen) return;
        if (detectOuterClick(event)) setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', documentClickHandler);
        return () => document.removeEventListener('click', documentClickHandler);
    }, [isOpen]);

    return (
        <details className={classes} open={isOpen}>
            <summary className={styles.summary} onClick={summaryClickHandler}>
                {props.summary}
            </summary>
            <div className={styles.content}>
                {props.children}
            </div>
        </details>
    );
}
