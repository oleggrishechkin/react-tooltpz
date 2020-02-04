import { useState } from 'react';
import useMethod from './useMethod';

export default () => {
    const [opened, setOpened] = useState(false);
    const onFocus = useMethod(() => {
        setOpened(true);
    });
    const onBlur = useMethod(() => {
        setOpened(false);
    });

    return [
        { onFocus, onBlur },
        { opened, setOpened }
    ];
};
