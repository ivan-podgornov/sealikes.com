import classnames from 'classnames';
import dynamic from 'next/dynamic';
import styles from './custom-select.module.scss';
import BaseField from '../base-field/base-field';
import { Fragment } from 'react';
import type { Props } from './types';

const DynamicSelect = dynamic(
    () => import('./component'),
    { ssr: false },
);

export default function CustomSelect(props: Props) {
    const {
        className,
        onChange,
        options,
        placeholder = ' ',
        selected,
        ...fieldProps
    } = props;

    const classes = classnames(props.className, styles.container);

    return (
        <Fragment>
            <noscript className={classes}>
                <BaseField {...fieldProps}>
                    <select className={styles.input} name={props.name}>
                        {options.map((option, i) => (
                            <option
                                key={i}
                                value={option.value}
                                selected={selected === option}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
                </BaseField>
            </noscript>
            <DynamicSelect {...props} />
        </Fragment>
    );
};
