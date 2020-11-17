import classnames from 'classnames';
import PrimaryParagraph from '../primary-paragraph/primary-paragraph';
import SecondaryParagraph from '../secondary-paragraph/secondary-paragraph';
import styles from './the-feature.module.scss';

type Props = {
    className?: string;
    component?: 'li'|'div';
    content: string;
    image: string;
    title: string;
};

export default function TheFeature(props: Props) {
    const {
        content, image, title,
        component: Component = 'div',
    } = props;

    return (
        <Component className={classnames(props.className, styles.feature)}>
            <img className={styles.image} src={image} alt={title} />
            <PrimaryParagraph className={styles.title}>
                {title}
            </PrimaryParagraph>
            <SecondaryParagraph className={styles.content}>
                {content}
            </SecondaryParagraph>
        </Component>
    );
};
