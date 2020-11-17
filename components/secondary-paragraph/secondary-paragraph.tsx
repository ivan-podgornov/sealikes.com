import classnames from 'classnames';
import styles from './secondary-paragraph.module.scss';

type Props = {
    children: string;
    className?: string;
};

export default function SecondaryParagraph(props: Props) {
    return (
        <p className={classnames(props.className, styles.paragraph)}>
            {props.children}
        </p>
    );
};
