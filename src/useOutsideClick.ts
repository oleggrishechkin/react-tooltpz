import { useRef, useEffect, useCallback } from 'react';

const useOutsideClick = (onOutsideClick: EventListener): ((...args: any[]) => void) => {
    const clickedRef = useRef<boolean>(false);
    const outsideClickRef = useRef<((evt: Event) => void) | null>(null);

    outsideClickRef.current = onOutsideClick;

    const onMouseDownOrTouchStart = useCallback<(...args: any[]) => void>(() => {
        clickedRef.current = true;
    }, []);

    useEffect(() => {
        const onDocumentMouseDownOrTouchStart: EventListener = (event): void => {
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

// eslint-disable-next-line import/no-default-export
export default useOutsideClick;
