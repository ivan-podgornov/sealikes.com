import { Props as BaseFieldProps } from '../base-field/base-field';
import { RefObject } from 'react';

export type Option = {
    text: string;
    value: string;
};

export type Props = Omit<BaseFieldProps, 'children'> & {
    name: string,
    onChange?: (option: Option) => void,
    options: Option[],
    placeholder?: string,
    selected: Option|null,
};

export type Context = {
    containerRef: RefObject<HTMLDivElement>,
    isOpen: boolean,
    options: Props['options'],
    optionsRef: RefObject<HTMLUListElement>,
    optionsId: string,
    selected: Option|null,

    onChange: Props['onChange'],
    toggle: (enforce: boolean) => void,
};
