import { Fragment } from 'react';

type Props = {
    children?: string|JSX.Element|Array<string|JSX.Element>,
};

export default function DefaultHead(props: Props) {
    return (
        <Fragment>
            <meta charSet="utf-8" />
            <meta name="theme-color" content="#3895F5" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3895f5" />
            <meta name="msapplication-TileColor" content="#2d89ef" />
            <title>Sealikes - продвижение ВКонтакте</title>
            {props.children}
        </Fragment>
    );
}
