import { useState, useCallback } from 'react';

const useHoverTooltip = () => {
    const [opened, setOpened] = useState(false);
    const onMouseEnter = useCallback(() => {
        setOpened(true);
    }, []);
    const onMouseLeave = useCallback(() => {
        setOpened(false);
    }, []);

    return [{ onMouseEnter, onMouseLeave }, { opened, setOpened }];
};

export default useHoverTooltip;
