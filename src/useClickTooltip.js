import { useState } from 'react';
import useMethod from './useMethod';
import useOutsideClick from './useOutsideClick';
import decorateHandler from './decorateHandler';

export default ({ parentRef, parentProps }) => {
    const [opened, setOpened] = useState(false);
    const onClick = useMethod(
        decorateHandler('onClick', parentProps, () => {
            setOpened((value) => !value);
        })
    );
    const { onMouseDown, onTouchStart } = useOutsideClick((event) => {
        if (parentRef.current && parentRef.current.contains(event.target)) {
            return;
        }

        setOpened(false);
    });

    return [{ onClick }, { opened, setOpened, onMouseDown, onTouchStart }];
};
