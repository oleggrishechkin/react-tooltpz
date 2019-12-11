import { useState } from 'react';
import useMethod from './useMethod';
import decorateHandler from './decorateHandler';

export default ({ parentProps }) => {
    const [opened, setOpened] = useState(false);
    const onFocus = useMethod(
        decorateHandler('onFocus', parentProps, () => {
            setOpened(true);
        })
    );
    const onBlur = useMethod(
        decorateHandler('onBlur', parentProps, () => {
            setOpened(false);
        })
    );

    return [
        { onFocus, onBlur },
        { opened, setOpened }
    ];
};
