import classnames from 'classnames';
import styles from './section-title.module.scss';

type Props = {
    children: string;
    mode?: 'left'
};

export default function SectionTitle(props: Props) {
    const classes = classnames(styles.title, styles[props.mode || '']);

    return (
        <h2 className={classes}>
            {props.children}
        </h2>
    );
};
