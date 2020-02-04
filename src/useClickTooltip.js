import { useState } from 'react';
import useMethod from './useMethod';
import useOutsideClick from './useOutsideClick';

export default ({ parentRef }) => {
    const [opened, setOpened] = useState(false);
    const onClick = useMethod(() => {
        setOpened((value) => !value);
    });
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
