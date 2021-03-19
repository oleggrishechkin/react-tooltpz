import { useMemo, useContext, useRef, ReactNode } from 'react';
import useTooltip from './useTooltip';
import ZIndexContext from './ZIndexContext';
import { RefWithGetBoundingClientRect, ObjectWithGetBoundingClientRect, Style, Position, Align } from './types';
import Portal from './Portal';

interface TooltipProps {
    parentRef: RefWithGetBoundingClientRect;
    innerRef?: RefWithGetBoundingClientRect;
    zIndex?: number;
    margin?: number;
    position?: Position;
    align?: Align;
    children?: (
        props: { innerRef: RefWithGetBoundingClientRect; style: Style },
        additionalData?: { parentRect: ClientRect | null; tooltipRect: ClientRect | null }
    ) => ReactNode;
    style?: Style;
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
}: TooltipProps): ReactNode => {
    const contextZIndex = useContext(ZIndexContext);
    const ref = useRef<ObjectWithGetBoundingClientRect | null>(null);
    const tooltipRef = innerRef || ref;
    const [coords, parentRect, tooltipRect] = useTooltip(parentRef, tooltipRef, { margin, position, align });
    const tooltipZIndex = (zIndex || 0) + (contextZIndex || 0);
    const tooltipStyle = useMemo<Style>(
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
        typeof children === 'function' && (
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
        )
    );
};

export default Tooltip;
