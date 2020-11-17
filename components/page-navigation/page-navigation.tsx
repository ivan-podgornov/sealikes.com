import classnames from 'classnames';
import styles from './page-navigation.module.scss';
import Link from 'next/link';
import TheIcon from '../the-icon/the-icon';
import { useRouter } from 'next/router';

type Props = {
    className?: string;
};

export default function PageNavigation(props: Props) {
    const router = useRouter();
    const pages = [
        {
            href: '/',
            icon: 'offers',
            text: 'Биржа заданий',
        },
    ];

    return (
        <nav className={classnames(props.className)}>
            {pages.map((page, i) => {
                const classes = [styles.link];
                if (page.href === router.pathname) classes.push(styles.active);

                return (
                    <Link href={page.href} key={i}>
                        <a className={classnames(classes)}>
                            <TheIcon className={styles.icon} name={page.icon} />
                            <span className={styles.text}>{page.text}</span>
                        </a>
                    </Link>
                );
            })}
        </nav>
    );
};
