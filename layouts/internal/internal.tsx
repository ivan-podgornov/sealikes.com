import styles from './internal.module.scss';
import MainActions from '../../components/main-actions/main-actions';
import PageHeader from '../../components/page-header/page-header';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenEvents } from 'store/events';

type Props = {
    children: string|JSX.Element|Array<string|JSX.Element>;
    title: string;
};

export default function LayoutInternal(props: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.remove('no-js');
        dispatch(listenEvents());
    }, []);

    return (
        <Fragment>
            <PageHeader />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {props.title}
                    </h1>
                    <MainActions />
                </div>
                {props.children}
            </main>
        </Fragment>
    );
};
