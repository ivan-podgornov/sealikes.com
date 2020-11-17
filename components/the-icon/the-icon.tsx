import classnames from 'classnames';
import styles from './the-icon.module.scss';

const requireIcon = require.context('./assets/', false, /\.svg$/);

type Icon = {
    url: string;
    viewBox: string;
};

const icons = {} as { [key: string]: Icon };

requireIcon.keys().forEach((key) => {
    const name = key.slice(2, key.length - 4);
    icons[name] = requireIcon(key).default;
});

type Props = {
    className?: string;
    name: string;
};

export default function TheIcon(props: Props) {
    const icon = icons[props.name];
    const [,, height, width] = icon.viewBox.split(' ');
    const classes = classnames(props.className, styles.icon);

    return (
        <svg
            className={classes}
            height={height}
            width={width}
            viewBox={icon.viewBox}
        >
            <use xlinkHref={`/_next${icon.url}`} />
        </svg>
    );
};
