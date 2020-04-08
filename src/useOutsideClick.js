import { useRef, useEffect, useCallback } from 'react';

const useOutsideClick = (onOutsideClick) => {
    const clickedRef = useRef(false);
    const onDocumentMouseDown = useCallback(
        (event) => {
            if (clickedRef.current || event.defaultPrevented || !onOutsideClick) {
                clickedRef.current = false;

                return;
            }

            setTimeout(() => {
                if (!clickedRef.current) {
                    onOutsideClick(event);
                }
            }, 0);
        },
        [onOutsideClick]
    );
    const onMouseDown = useCallback(() => {
        clickedRef.current = true;
    }, []);

    useEffect(() => {
        window.addEventListener('mousedown', onDocumentMouseDown);
        window.addEventListener('touchstart', onDocumentMouseDown);

        return () => {
            window.addEventListener('mousedown', onDocumentMouseDown);
            window.addEventListener('touchstart', onDocumentMouseDown);
        };
    }, [onDocumentMouseDown]);

    return {
        onMouseDown,
        onTouchStart: onMouseDown
    };
};

export default useOutsideClick;
