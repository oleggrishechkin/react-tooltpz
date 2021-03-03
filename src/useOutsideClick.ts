import { useRef, useEffect, useCallback } from 'react';

interface UseOutsideClick {
    (onOutsideClick: EventHandlerNonNull): {
        onMouseDown: EventHandlerNonNull;
        onTouchStart: EventHandlerNonNull;
    };
}

const useOutsideClick: UseOutsideClick = (onOutsideClick) => {
    const clickedRef = useRef(false);
    const outsideClickRef = useRef<EventHandlerNonNull>(() => null);

    outsideClickRef.current = onOutsideClick;

    const onMouseDown = useCallback<EventHandlerNonNull>(() => {
        clickedRef.current = true;
    }, []);

    useEffect(() => {
        const onDocumentMouseDown: EventHandlerNonNull = (event) => {
            if (clickedRef.current || event.defaultPrevented || !outsideClickRef.current) {
                clickedRef.current = false;

                return;
            }

            setTimeout(() => {
                if (!clickedRef.current) {
                    outsideClickRef.current(event);
                }
            }, 0);
        };

        window.addEventListener('mousedown', onDocumentMouseDown);
        window.addEventListener('touchstart', onDocumentMouseDown);

        return () => {
            window.removeEventListener('mousedown', onDocumentMouseDown);
            window.removeEventListener('touchstart', onDocumentMouseDown);
        };
    }, []);

    return {
        onMouseDown,
        onTouchStart: onMouseDown
    };
};

export default useOutsideClick;
