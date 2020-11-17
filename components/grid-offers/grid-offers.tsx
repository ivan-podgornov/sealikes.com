import styles from './grid-offers.module.scss';

type Props = {
    left: () => JSX.Element;
    right: (props: { className: string }) => JSX.Element;
};

export default function GridOffers(props: Props) {
    const { left: Left, right: Right } = props;

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Left />
            </div>
            <Right className={styles.right} />
        </div>
    );
};
