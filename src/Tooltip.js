import React, { useMemo, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import useTooltip from './useTooltip';
import ZIndexContext from './ZIndexContext';
import PortalNodeContext from './PortalNodeContext';

const Tooltip = ({
    innerRef = null,
    parentRef,
    zIndex = 0,
    margin = 4,
    position = 'bottom',
    align = 'start',
    children = null,
    style = null,
    setOpened = null,
    portalNode = null,
    ...rest
}) => {
    const ref = useRef(null);
    const tooltipRef = innerRef || ref;
    const [coords, parentSize, tooltipSize] = useTooltip(parentRef, tooltipRef, { margin, position, align });
    const contextZIndex = useContext(ZIndexContext);
    const contextPortalNode = useContext(PortalNodeContext);
    const tooltipZIndex = (zIndex || 0) + (contextZIndex || 0);
    const tooltipStyle = useMemo(
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
            {ReactDOM.createPortal(
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
