import { useState } from 'react';
import useMethod from './useMethod';

export default () => {
    const [opened, setOpened] = useState(false);
    const onMouseEnter = useMethod(() => {
        setOpened(true);
    });
    const onMouseLeave = useMethod(() => {
        setOpened(false);
    });

    return [
        { onMouseEnter, onMouseLeave },
        { opened, setOpened }
    ];
};
