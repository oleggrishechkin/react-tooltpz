import { useState, useCallback } from 'react';

const useFocusTooltip = () => {
    const [opened, setOpened] = useState(false);
    const onFocus = useCallback(() => {
        setOpened(true);
    }, []);
    const onBlur = useCallback(() => {
        setOpened(false);
    }, []);

    return [{ onFocus, onBlur }, { opened, setOpened }];
};

export default useFocusTooltip;
