import classnames from 'classnames';
import styles from './primary-paragraph.module.scss';

type Props = {
    className?: string;
    children: string|JSX.Element|Array<string|JSX.Element>;
};

export default function PrimaryParagraph(props: Props) {
    return (
        <p className={classnames(props.className, styles.paragraph)}>
            {props.children}
        </p>
    );
};
