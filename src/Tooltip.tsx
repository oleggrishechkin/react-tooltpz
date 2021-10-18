import { Fragment, useMemo, useContext, useRef, ReactNode, ReactElement, CSSProperties } from 'react';
import useTooltip from './useTooltip';
import ZIndexContext from './ZIndexContext';
import { RefWithGetBoundingClientRect, ObjectWithGetBoundingClientRect, Position, Align, Rect } from './types';
import Portal from './Portal';

interface TooltipProps {
    parentRef: RefWithGetBoundingClientRect;
    innerRef?: RefWithGetBoundingClientRect;
    zIndex?: number;
    margin?: number;
    position?: Position;
    align?: Align;
    children?: (
        props: { innerRef: RefWithGetBoundingClientRect; style: CSSProperties },
        additionalData?: { parentRect: Rect | null; tooltipRect: Rect | null }
    ) => ReactNode;
    style?: CSSProperties;
    portalNode?: HTMLElement;
}

const Tooltip = ({
    parentRef,
    innerRef,
    zIndex = 0,
    margin = 4,
    position = 'bottom',
    align = 'start',
    children,
    style,
    portalNode
}: TooltipProps): ReactElement => {
    const contextZIndex = useContext(ZIndexContext);
    const ref = useRef<ObjectWithGetBoundingClientRect>(null);
    const tooltipRef = innerRef || ref;
    const [coords, parentRect, tooltipRect] = useTooltip(parentRef, tooltipRef, { margin, position, align });
    const tooltipZIndex = (zIndex || 0) + (contextZIndex || 0);
    const tooltipStyle = useMemo<CSSProperties>(
        () => ({
            ...style,
            position: 'fixed',
            zIndex: tooltipZIndex,
            top: 0,
            left: 0,
            ...(coords ? {} : { opacity: 0 }),
            ...coords
        }),
        [coords, style, tooltipZIndex]
    );

    return (
        <Fragment>
            {typeof children === 'function' && (
                <ZIndexContext.Provider value={tooltipZIndex + 1}>
                    <Portal portalNode={portalNode}>
                        {children(
                            {
                                innerRef: tooltipRef,
                                style: tooltipStyle
                            },
                            { parentRect, tooltipRect }
                        )}
                    </Portal>
                </ZIndexContext.Provider>
            )}
        </Fragment>
    );
};

// eslint-disable-next-line import/no-default-export
export default Tooltip;
