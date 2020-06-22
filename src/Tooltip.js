import React, { useMemo, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import useTooltip from './useTooltip';
import ZIndexContext from './ZIndexContext';

const Tooltip = ({
    innerRef = null,
    parentRef = null,
    zIndex = 0,
    margin = 4,
    position = 'bottom',
    align = 'start',
    children = null,
    style = null,
    setOpened = null,
    ...rest
}) => {
    const ref = useRef(null);
    const tooltipRef = innerRef || ref;
    const [coords, parentSize, tooltipSize] = useTooltip(parentRef, tooltipRef, { margin, position, align });
    const contextZIndex = useContext(ZIndexContext);
    const styleZIndex = (zIndex || 0) + (contextZIndex || 0);
    const tooltipStyle = useMemo(
        () => ({
            ...style,
            position: 'fixed',
            zIndex: styleZIndex,
            top: 0,
            left: 0,
            ...(coords ? {} : { opacity: 0 }),
            ...coords
        }),
        [coords, style, styleZIndex]
    );

    return (
        <ZIndexContext.Provider value={styleZIndex + 1}>
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
                document.body
            )}
        </ZIndexContext.Provider>
    );
};

export default Tooltip;
