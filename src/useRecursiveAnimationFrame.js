import { useRef, useEffect } from 'react';

const useRecursiveAnimationFrame = (step = () => {}) => {
    const stepRef = useRef(step);

    stepRef.current = step;

    useEffect(() => {
        let frameId = 0;
        const frame = () => {
            frameId = requestAnimationFrame(frame);
            stepRef.current();
        };

        frame();

        return () => cancelAnimationFrame(frameId);
    }, []);
};

export default useRecursiveAnimationFrame;
