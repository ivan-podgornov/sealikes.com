import classnames from 'classnames';
import TheButton, { Props as ButtonProps } from '../the-button/the-button';
import { useRef } from 'react';

type Props = ButtonProps & {
    className?: string;
    place: 'header'|'first-screen'|'how-works';
};

interface UloginInitOptions {
    display: string;
    fields: Array<string>;
    redirect_uri: string;
};

interface Ulogin {
    customInit: (id: string, options: UloginInitOptions) => void;
    setStateListener: (
        id: string,
        type: string,
        listener: () => void,
    ) => void;
};

declare const uLogin: Ulogin;

export default function LoginButton(props: Props) {
    const { place, className, ...buttonProps } = props;
    const id = `login-button-${place}`;
    const classes = classnames(className);
    const element = useRef<HTMLDivElement>(null);

    const clickHandler = () => {
        const script = document.createElement('script');
        document.body.appendChild(script);
        script.async = true;
        script.src = '//ulogin.ru/js/ulogin.js';
        script.onload = () => {
            uLogin.setStateListener(id, 'ready', () => {
                if (element.current) {
                    const button = element.current.querySelector('button');
                    if (button) button.click();
                }
            });

            const host = encodeURI(process.env.NEXT_PUBLIC_SITE_URL as string);
            const api = process.env.NEXT_PUBLIC_API_URL as string;
            uLogin.customInit(id, {
                display: 'buttons',
                fields: ['first_name', 'last_name', 'photo'],
                redirect_uri: `${api}/auth?host=${host}`,
            });
        };
    };

    return (
        <div className={classes} id={id} ref={element}>
            <TheButton
                data-uloginbutton="vkontakte"
                onClick={clickHandler}
                {...buttonProps}
            >
                {props.children}
            </TheButton>
        </div>
    );
};
