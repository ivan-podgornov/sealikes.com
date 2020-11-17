import classnames from 'classnames';
import styles from './the-card.module.scss';

type Props = {
    children: string|JSX.Element|false|Array<string|JSX.Element|false>;
    className?: string;
    component?: 'div'|'section'|'article'|'aside'|'dialog';
};

export default function TheCard(props: Props) {
    const { component: Component = 'div' } = props;
    const classes = classnames(props.className, styles.card);

    return (
        <Component className={classes}>
            {props.children && props.children}
        </Component>
    );
};
