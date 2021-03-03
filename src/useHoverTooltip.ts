import { useState, useCallback } from 'react';
import { SetOpened } from './types';

interface UseHoverTooltip {
    (...args: Array<any>): [
        { onMouseEnter: EventHandlerNonNull; onMouseLeave: EventHandlerNonNull },
        { opened: boolean; setOpened: SetOpened }
    ];
}

const useHoverTooltip: UseHoverTooltip = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const onMouseEnter = useCallback<EventHandlerNonNull>(() => {
        setOpened(true);
    }, []);
    const onMouseLeave = useCallback<EventHandlerNonNull>(() => {
        setOpened(false);
    }, []);

    return [
        { onMouseEnter, onMouseLeave },
        { opened, setOpened }
    ];
};

export default useHoverTooltip;
