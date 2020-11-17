import classnames from 'classnames';
import styles from './base-field.module.scss';
import { Fragment, HTMLAttributes } from 'react';

export type Props = {
    attrs?: HTMLAttributes<HTMLLabelElement|HTMLDivElement>,
    className?: string,
    children: string|JSX.Element|Array<string|JSX.Element>,
    error?: string,
    label: string,
};

export default function BaseField(props: Props) {
    const classes = classnames(props.className, styles.field, {
        [styles.error]: props.error && props.error.length > 0,
    });

    return (
        <Fragment>
            <label className={classes} {...props.attrs}>
                {props.children}
                <span className={styles.label}>
                    {props.label}
                </span>
            </label>
            {props.error && (
                <span className={styles['error-message']}>
                    {props.error}
                </span>
            )}
        </Fragment>
    );
};
