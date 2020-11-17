import classnames from 'classnames';
import styles from './custom-select.module.scss';
import BaseField from '../base-field/base-field';

import {
    KeyboardEvent,
    useEffect,
    useState,
    useRef,
} from 'react';

import {
    Context,
    Option,
    Props,
} from './types';

export default function CustomSelectComponent(props: Props) {
    const {
        className,
        onChange,
        options,
        selected,
        error = '',
        placeholder = ' ',
        ...fieldProps
    } = props;

    const [errorMessage, setErrorMessage] = useState(error);
    useEffect(() => setErrorMessage(error), [error]);

    const [isOpen, setIsOpen] = useState(false);
    const classes = classnames(props.className, styles.container, {
        [styles.open]: isOpen,
    });

    const optionsId = `custom-select-${props.name}-options`;
    const containerRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const toggle = (enforce?: boolean) => {
        setErrorMessage('');
        const newIsOpen = typeof enforce === 'boolean' ? enforce : !isOpen;
        setTimeout(setIsOpen.bind(null, newIsOpen), 0);
    };

    const args: Context = {
        containerRef,
        isOpen,
        options,
        optionsRef,
        optionsId,
        selected,

        onChange,
        toggle,
    };

    const changeHandler = getChangeHandler(args);
    const keyDownHandler = getKeyDownHandler(args);
    useEffect(documentFocusEffect(args), [isOpen]);

    return (
        <div
            className={classes}
            ref={containerRef}
            role="combobox"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-owns={optionsId}
            aria-label={selected ? selected.text : ''}
            onClick={() => toggle()}
            onKeyDown={keyDownHandler}
        >
            <BaseField
                className={styles.field}
                {...fieldProps}
                error={errorMessage}
            >
                <span className={styles.input} aria-hidden>
                    {selected ? selected.text : ''}
                </span>
                <input
                    className="visually-hidden"
                    type="text"
                    name={props.name}
                    placeholder={placeholder}
                    value={selected ? selected.value : ''}
                    tabIndex={-1}
                    readOnly
                />
            </BaseField>
            <ul
                id={optionsId}
                ref={optionsRef}
                role="listbox"
                className={classnames(
                    styles.options,
                    { [styles.visible]: isOpen },
                )}
            >
                {options.map((option, i) => (
                    <li
                        className={styles.option}
                        key={i}
                        data-value={option.value}
                        role="option"
                        tabIndex={-1}
                        aria-selected={option === selected}
                        onClick={() => changeHandler(option)}
                        onKeyDown={keyDownHandler}
                    >
                        {option.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Ставит на document слушатель события focus, который закрывает select,
 * если фокус произошел вне select'a.
 */
function documentFocusEffect(context: Context) {
    const focusHandler = getFocusHandler(context);

    return () => {
        if (!context.isOpen) return;
        document.addEventListener('focus', focusHandler, true);
        return () => {
            document.removeEventListener('focus', focusHandler, true);
        };
    };
}

function getChangeHandler(context: Context) {
    const { onChange, toggle } = context;

    return (option: Option) => {
        toggle(false);
        if (onChange) onChange(option);
    };
}

function getFocusHandler(context: Context) {
    return (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(`.${styles.container}`)) {
            context.toggle(false);
        }
    };
}

enum Keys {
    ENTER = 13,
    SPACE = 32,
    ARROW_DOWN = 40,
    ARROW_UP = 38,
};

function getKeyDownHandler(context: Context) {
    const { containerRef } = context;

    return (event: KeyboardEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const container = containerRef.current as HTMLDivElement;

        if (target === container) return OnContainerKeyDown(context, event);
        if (target.closest(`.${styles.option}`)) {
            return OnOptionKeyDown(context, event);
        }
    };
}

function OnContainerKeyDown(context: Context, event: KeyboardEvent) {
    const currentOptionIndex = context.options
        .findIndex((option) => {
            if (context.selected === null) return false;
            return option.value === context.selected.value;
        });

    if (event.which === Keys.ENTER || event.which === Keys.SPACE) {
        event.preventDefault();
        context.toggle(!context.isOpen);
        setTimeout(() => {
            if (context.optionsRef.current) {
                const num = currentOptionIndex === -1 ? 0 : currentOptionIndex;
                const options = context.optionsRef.current as HTMLUListElement;
                (options.children[num] as HTMLElement).focus();
            }
        }, 0);

        return;
    }

    if (event.which === Keys.ARROW_DOWN || event.which === Keys.ARROW_UP) {
        event.preventDefault();
        const changeHandler = getChangeHandler(context);

        if (event.which === Keys.ARROW_DOWN) {
            const next = (currentOptionIndex + 1 > context.options.length - 1)
                ? 0 : currentOptionIndex + 1;
            changeHandler(context.options[next]);
            return;
        }

        if (event.which === Keys.ARROW_UP) {
            const previous = (currentOptionIndex - 1 < 0)
                ? context.options.length - 1 : currentOptionIndex - 1;
            changeHandler(context.options[previous]);
            return;
        }
    }
}

function OnOptionKeyDown(context: Context, event: KeyboardEvent) {
    const options = context.optionsRef.current as HTMLUListElement;
    const currentOptionIndex = Array.from(options.children)
        .findIndex((option) => option === event.target);

    if (event.which === Keys.ARROW_DOWN || event.which === Keys.ARROW_UP) {
        event.preventDefault();
        const next = event.which === Keys.ARROW_DOWN
            ? Math.min(currentOptionIndex + 1, options.children.length - 1)
            : Math.max(currentOptionIndex - 1, 0);

        (options.children[next] as HTMLElement).focus();
        return;
    }

    if (event.which === Keys.ENTER) {
        const changeHandler = getChangeHandler(context);
        const option = context.options[currentOptionIndex];
        changeHandler(option);
        (context.containerRef.current as HTMLDivElement).focus();
        return;
    }
}
