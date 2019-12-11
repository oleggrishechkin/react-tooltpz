import { useRef } from 'react';

const useInnerRef = (innerRef) => {
    const ref = useRef(null);

    return innerRef || ref;
};

export default useInnerRef;
