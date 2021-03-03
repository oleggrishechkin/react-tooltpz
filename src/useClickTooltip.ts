import { useState, useCallback } from 'react';
import useOutsideClick from './useOutsideClick';
import { RefObject, SetOpened } from './types';

interface UseFocusTooltip {
    (props: { parentRef: RefObject }): [
        { onClick: EventHandlerNonNull },
        { opened: boolean; setOpened: SetOpened; onMouseDown: EventHandlerNonNull; onTouchStart: EventHandlerNonNull }
    ];
}

const useClickTooltip: UseFocusTooltip = ({ parentRef }) => {
    const [opened, setOpened] = useState<boolean>(false);
    const onClick = useCallback<EventHandlerNonNull>(() => {
        setOpened((value) => !value);
    }, []);
    const { onMouseDown, onTouchStart } = useOutsideClick((event) => {
        if (parentRef.current?.contains(event.target as Node)) {
            return;
        }

        setOpened(false);
    });

    return [
        { onClick },
        {
            opened,
            setOpened,
            onMouseDown,
            onTouchStart
        }
    ];
};

export default useClickTooltip;
