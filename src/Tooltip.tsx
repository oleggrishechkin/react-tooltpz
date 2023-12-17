import { useMemo, useContext, useRef, ReactNode, ReactElement, CSSProperties, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { useTooltipCoords } from './useTooltipCoords';
import { ZIndexContext } from './ZIndexContext';
import { AnyWithGetBoundingClientRect, Position, Align, Rect } from './types';
import { PortalNodeContext } from './PortalNodeContext';

type Props = {
    parentRef: MutableRefObject<AnyWithGetBoundingClientRect | null>;
    innerRef?: MutableRefObject<AnyWithGetBoundingClientRect | null>;
    margin?: number;
    position?: Position;
    align?: Align;
    allowedPositions?: Position[];
    children?: (
        props: { ref: MutableRefObject<AnyWithGetBoundingClientRect | null>; style: CSSProperties },
        additionalData?: { parentRect: Rect | null; tooltipRect: Rect | null },
    ) => ReactNode;
    style?: CSSProperties;
    zIndex?: number;
    portalNode?: HTMLElement;
    withParentRect?: boolean;
    withTooltipRect?: boolean;
};

export const Tooltip = ({
    parentRef,
    innerRef,
    margin = 4,
    position = 'bottom',
    align = 'start',
    allowedPositions,
    children,
    style,
    zIndex = 0,
    portalNode,
    withParentRect,
    withTooltipRect,
}: Props): ReactElement => {
    const contextZIndex = useContext(ZIndexContext);
    const contextPortalNode = useContext(PortalNodeContext);
    const ref = useRef<AnyWithGetBoundingClientRect | null>(null);
    const tooltipRef = innerRef || ref;
    const { coords, parentRect, tooltipRect } = useTooltipCoords({
        parentRef,
        tooltipRef,
        margin,
        position,
        align,
        allowedPositions,
        withParentRect,
        withTooltipRect,
    });
    const tooltipPortalNode = portalNode || contextPortalNode;
    const tooltipZIndex = (zIndex || 0) + (contextZIndex || 0);
    const tooltipStyle = useMemo<CSSProperties>(
        () => ({
            ...style,
            position: 'fixed',
            zIndex: tooltipZIndex,
            top: 0,
            left: 0,
            ...(coords ? {} : { opacity: 0 }),
            ...coords,
        }),
        [coords, style, tooltipZIndex],
    );

    return (
        <>
            {children && tooltipPortalNode && (
                <ZIndexContext.Provider value={tooltipZIndex + 1}>
                    <PortalNodeContext.Provider value={tooltipPortalNode}>
                        {createPortal(
                            children(
                                {
                                    ref: tooltipRef,
                                    style: tooltipStyle,
                                },
                                { parentRect, tooltipRect },
                            ),
                            tooltipPortalNode,
                        )}
                    </PortalNodeContext.Provider>
                </ZIndexContext.Provider>
            )}
        </>
    );
};
