import { useState, useCallback } from 'react';
import { SetOpened } from './types';

interface UseFocusTooltip {
    (...args: Array<any>): [
        { onFocus: EventHandlerNonNull; onBlur: EventHandlerNonNull },
        { opened: boolean; setOpened: SetOpened }
    ];
}

const useFocusTooltip: UseFocusTooltip = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const onFocus = useCallback<EventHandlerNonNull>(() => {
        setOpened(true);
    }, []);
    const onBlur = useCallback<EventHandlerNonNull>(() => {
        setOpened(false);
    }, []);

    return [
        { onFocus, onBlur },
        { opened, setOpened }
    ];
};

export default useFocusTooltip;
