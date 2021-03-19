import { useRef, useEffect, useCallback } from 'react';

const useOutsideClick = (onOutsideClick: EventHandlerNonNull | null): EventHandlerNonNull => {
    const clickedRef = useRef<boolean>(false);
    const outsideClickRef = useRef<EventHandlerNonNull | null>(null);

    outsideClickRef.current = onOutsideClick;

    const onMouseDownOrTouchStart = useCallback<EventHandlerNonNull>(() => {
        clickedRef.current = true;
    }, []);

    useEffect(() => {
        const onDocumentMouseDownOrTouchStart = (event: Event): void => {
            if (clickedRef.current || event.defaultPrevented || !outsideClickRef.current) {
                clickedRef.current = false;

                return;
            }

            setTimeout(() => {
                if (!clickedRef.current && outsideClickRef.current) {
                    outsideClickRef.current(event);
                }
            }, 0);
        };

        window.addEventListener('mousedown', onDocumentMouseDownOrTouchStart);
        window.addEventListener('touchstart', onDocumentMouseDownOrTouchStart);

        return () => {
            window.removeEventListener('mousedown', onDocumentMouseDownOrTouchStart);
            window.removeEventListener('touchstart', onDocumentMouseDownOrTouchStart);
        };
    }, []);

    return onMouseDownOrTouchStart;
};

export default useOutsideClick;
