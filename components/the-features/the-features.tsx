import LayoutPositioner from '../layout-positioner/layout-positioner';
import PrimaryParagraph from '../primary-paragraph/primary-paragraph';
import SecondaryParagraph from '../secondary-paragraph/secondary-paragraph';
import SectionTitle from '../section-title/section-title';
import TheFeature from '../the-feature/the-feature';
import styles from './the-features.module.scss';

import LikesImage from './assets/likes.svg';
import RepostsImage from './assets/reposts.svg';
import SubscribersImage from './assets/subscribers.svg';

export default function TheFeatures() {
    const features = [
        {
            content: 'Получи сотни репостов для твоей публикации!',
            image: RepostsImage,
            title: 'Обмен репостами',
        },
        {
            content: 'Получи тысячи лайков для твоей авы, фото!',
            image: LikesImage,
            title: 'Обмен лайками',
        },
        {
            content: 'Получи тысячи друзей или подписчиков для твоей странички!',
            image: SubscribersImage,
            title: 'Обмен подписчиками',
        },
    ];

    return (
        <LayoutPositioner className={styles.features} component="section">
            <SectionTitle>
                Возможности
            </SectionTitle>
            <PrimaryParagraph className={styles.subtitle}>
                Попробуй бесплатно <br />прямо сейчас
            </PrimaryParagraph>
            <SecondaryParagraph className={styles.paragraph}>
                В процессе продвижения достигается наилучшее качество, поскольку
                имитируется реальное поведение человека в социальной сети.
            </SecondaryParagraph>
            <ul className={styles.list}>
                {features.map((feature, i) => (
                    <TheFeature
                        className={styles.item}
                        component="li"
                        key={i}
                        {...feature}
                    />
                ))}
            </ul>
        </LayoutPositioner>
    );
};
