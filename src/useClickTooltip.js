import { useState, useCallback } from 'react';
import useOutsideClick from './useOutsideClick';

const useClickTooltip = ({ parentRef }) => {
    const [opened, setOpened] = useState(false);
    const onClick = useCallback(() => {
        setOpened((value) => !value);
    }, []);
    const { onMouseDown, onTouchStart } = useOutsideClick((event) => {
        if (parentRef.current && parentRef.current.contains(event.target)) {
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
