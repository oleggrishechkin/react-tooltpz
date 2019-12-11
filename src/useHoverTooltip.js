import { useState } from 'react';
import useMethod from './useMethod';
import decorateHandler from './decorateHandler';

export default ({ parentProps }) => {
    const [opened, setOpened] = useState(false);
    const onMouseEnter = useMethod(
        decorateHandler('onMouseEnter', parentProps, () => {
            setOpened(true);
        })
    );
    const onMouseLeave = useMethod(
        decorateHandler('onMouseLeave', parentProps, () => {
            setOpened(false);
        })
    );

    return [
        { onMouseEnter, onMouseLeave },
        { opened, setOpened }
    ];
};
