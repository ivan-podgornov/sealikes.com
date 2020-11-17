import classnames from 'classnames';
import styles from './the-button.module.scss';
import {
    KeyboardEvent,
    MouseEvent,
} from 'react';

export type Props = {
    component?: 'button'|'label'|'a'|'div';
    children: string|JSX.Element|JSX.Element[];
    className?: string;
    href?: string;
    htmlFor?: string;
    onClick?: (event?: MouseEvent) => void;
    type: 'submit'|'button';
    mode: 'accent'|'primary'|'action'|'icon'|'primary-block';
    role?: string;
    size?: 'big'|'medium';
};

export default function TheButton(props: Props) {
    const {
        component: Component = 'button',
        children,
        mode,
        className,
        size = '',
        ...attrs
    } = props;

    const classes = classnames(
        className,
        styles.button,
        styles[mode],
        styles[size],
    );

    const OnKeyDown = (event: KeyboardEvent) => {
        if (event.which === 32) { // Space
            if (props.component === 'a' && props.role === 'button') {
                if (props.onClick) props.onClick();
            }
        }
    };

    return (
        <Component
            className={classes}
            onKeyDown={OnKeyDown}
            {...attrs}
        >
            {children}
        </Component>
    );
};
