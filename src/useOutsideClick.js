import { useRef } from 'react';
import useEvent from './useEvent';
import useMethod from './useMethod';
import decorateHandler from './decorateHandler';

export default (onOutsideClick, handlers) => {
    const clickedRef = useRef(false);
    const onDocumentMouseDown = (event) => {
        if (clickedRef.current || event.defaultPrevented || !onOutsideClick) {
            clickedRef.current = false;

            return;
        }

        setTimeout(() => {
            if (!clickedRef.current) {
                onOutsideClick(event);
            }
        }, 0);
    };

    useEvent(window, 'mousedown', onDocumentMouseDown);
    useEvent(window, 'touchstart', onDocumentMouseDown);

    return {
        onMouseDown: useMethod(
            decorateHandler('onMouseDown', handlers, () => {
                clickedRef.current = true;
            })
        ),
        onTouchStart: useMethod(() => {
            decorateHandler('onTouchStart', handlers, () => {
                clickedRef.current = true;
            });
        })
    };
};
