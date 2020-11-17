import classnames from 'classnames';
import styles from './the-tooltip.module.scss';
import {
    useEffect,
    useRef,
} from 'react';

type Props = {
    className?: string;
    children: string|JSX.Element|Array<string|JSX.Element>;
};

export default function TheTooltip(props: Props) {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const classes = classnames(props.className, styles.tooltip);

    const setPosition = () => {
        const tooltip = tooltipRef.current as HTMLSpanElement;
        const windowWidth = document.documentElement.clientWidth;
        const tooltipRect = tooltip.getBoundingClientRect();
        const { left, width } = tooltipRect;

        if (left + width / 2 + width < windowWidth) {
            tooltip.classList.add(styles.center);
        }
    }

    useEffect(() => {
        const tooltip = tooltipRef.current as HTMLSpanElement;
        const container = tooltip.parentElement as HTMLElement;
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        container.classList.add(styles.container);
        setPosition();
    });

    return (
        <span className={classes} ref={tooltipRef}>
            {props.children}
        </span>
    );
};
