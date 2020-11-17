import styles from './text-field.module.scss';
import BaseField, { Props as BaseFieldProps } from '../base-field/base-field';
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

type Props = Omit<BaseFieldProps, 'children'> & {
    name: string;
    min?: number;
    placeholder?: string;
    type: 'text'|'number'|'url';
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};

export default function TextField(props: Props) {
    const {
        name,
        min,
        type,
        value,
        setValue,
        error = '',
        placeholder = ' ',
        ...fieldProps
    } = props;

    const [errorMessage, setErrorMessage] = useState(error);
    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const OnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('');
        const newValue = event.target.value;
        setValue(newValue);
    };

    return (
        <BaseField {...fieldProps} error={errorMessage}>
            <input
                className={styles.input}
                name={name}
                min={min}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={OnChange}
            />
        </BaseField>
    );
};
