import { useRef, useCallback } from 'react';

const useMethod = (func = () => {}) => {
    const funcRef = useRef(func);

    funcRef.current = func;

    return useCallback((...args) => funcRef.current(...args), []);
};

export default useMethod;
