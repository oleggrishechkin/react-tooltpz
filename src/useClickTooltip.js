import { useState, useCallback } from 'react';
import useOutsideClick from './useOutsideClick';

const useClickTooltip = ({ parentRef }) => {
    const [opened, setOpened] = useState(false);
    const onClick = useCallback(() => {
        setOpened((value) => !value);
    }, []);
    const onOutsideClick = useCallback(
        (event) => {
            if (parentRef.current && parentRef.current.contains(event.target)) {
                return;
            }

            setOpened(false);
        },
        [parentRef]
    );
    const { onMouseDown, onTouchStart } = useOutsideClick(onOutsideClick);

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
