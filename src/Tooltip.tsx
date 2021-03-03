import { useMemo, useContext, useRef, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import useTooltip from './useTooltip';
import ZIndexContext from './ZIndexContext';
import PortalNodeContext from './PortalNodeContext';
import { Size, RefObject, Style, SetOpened, Position, Align } from './types';

interface TooltipProps {
    innerRef?: RefObject;
    parentRef: RefObject;
    zIndex?: number;
    margin?: number;
    position?: Position;
    align?: Align;
    children?: (
        parentProps: { [propName: string]: any; innerRef: RefObject; style: Style },
        additionalData?: { parentSize: Size; tooltipSize: Size; setOpened: SetOpened }
    ) => ReactNode;
    style?: Style;
    setOpened: SetOpened;
    portalNode?: HTMLElement;
}

const Tooltip: FC<TooltipProps> = ({
    innerRef = null,
    parentRef,
    zIndex = 0,
    margin = 4,
    position = 'bottom',
    align = 'start',
    children = null,
    style = null,
    setOpened,
    portalNode = null,
    ...rest
}) => {
    const ref = useRef<HTMLElement | null>(null);
    const tooltipRef = innerRef || ref;
    const [coords, parentSize, tooltipSize] = useTooltip(parentRef, tooltipRef, { margin, position, align });
    const contextZIndex = useContext(ZIndexContext);
    const contextPortalNode = useContext(PortalNodeContext);
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
        <ZIndexContext.Provider value={tooltipZIndex + 1}>
            {createPortal(
                !!children &&
                    children(
                        {
                            ...rest,
                            innerRef: tooltipRef,
                            style: tooltipStyle
                        },
                        { parentSize, tooltipSize, setOpened }
                    ),
                portalNode || contextPortalNode
            )}
        </ZIndexContext.Provider>
    );
};

export default Tooltip;
