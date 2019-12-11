import { useEffect } from 'react';
import useMethod from './useMethod';

const useEvent = (target, type, func = () => {}) => {
    const onEvent = useMethod(func);

    useEffect(() => {
        target.addEventListener(type, onEvent);

        return () => target.removeEventListener(type, onEvent);
    }, [onEvent, target, type]);
};

export default useEvent;
