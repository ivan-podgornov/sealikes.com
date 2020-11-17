import classnames from 'classnames';
import styles from './layout-positioner.module.scss';

type Props = {
    children: string|JSX.Element|JSX.Element[];
    className?: string;
    component?: 'div'|'header'|'section';
};

export default function LayoutPositioner(props: Props) {
    const { component: Component = 'div', ...otherProps } = props;
    const classes = classnames(otherProps.className, styles.positioner);

    return (
        <Component className={classes}>
            {otherProps.children}
        </Component>
    );
};
