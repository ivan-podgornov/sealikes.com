import OffersAddComponent from './component';
import type { NetworkType, OfferType } from '@social-exchange/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'store/types';
import { create } from 'store/offers-create';
import type { Props } from './types';
import type { Option } from '../custom-select/types';

export default function OffersAdd(props: Props) {
    const dispatch = useDispatch();
    const [type, setType] = useState<Option|null>(null);
    const typeError = useSelector((state: RootState) => state.offersCreate.typeError);
    const [link, setLink] = useState('');
    const linkError = useSelector((state: RootState) => state.offersCreate.linkError);
    const [count, setCount] = useState('');
    const countError = useSelector((state: RootState) => state.offersCreate.countError);

    const close = () => {
        setCount('');
        setLink('');
        setType(null);
        props.close();
    };

    const OnClickCreate = async () => {
        const networkType = 'vk' as NetworkType;
        const offerType = (type ? type.value : '') as OfferType;
        const options = {
            link,
            networkType,
            count: parseInt(count, 10) || 0,
            type: offerType,
        };

        const ok = await dispatch(create(options));
        if (typeof ok === 'boolean' && ok) close();
    };

    const data = {
        count, setCount, countError,
        link, setLink, linkError,
        type, setType, typeError,
        price: calculatePrice(count, type),
        onClickCreate: OnClickCreate,
    };

    return <OffersAddComponent {...data} {...props} close={close} />;
};

function calculatePrice(count: string, type: Option|null) {
    if (type === null) return 0;
    const countNum = parseInt(count);
    if (isNaN(countNum)) return 0;

    const priceList = {
        likes: 1,
        reposts: 2,
        followers: 3,
        subscribes: 4,
    } as { [key: string]: number };

    if (type.value in priceList === false) return 0;
    const onePrice = priceList[type.value];
    return onePrice * countNum;
}
