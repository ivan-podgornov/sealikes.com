import Link from 'next/link';
import classnames from 'classnames';
import styles from './the-logo.module.scss';
import LogoImage from './assets/logo.svg';

type Props = {
    mode?: 'primary';
};

export default function TheLogo(props: Props) {
    const classes = [styles.logo];
    if (props.mode) classes.push(styles[props.mode]);

    return (
        <Link href="/">
            <a className={classnames(classes)}>
                <img
                    className={styles.image}
                    src={LogoImage}
                    alt="Логотип sealikes.com"
                />
                <span className={styles.text}>Sealikes</span>
            </a>
        </Link>
    );
};
