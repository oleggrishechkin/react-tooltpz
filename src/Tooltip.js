/* eslint-disable react/prop-types */
import React, { useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';
import useTooltip from './useTooltip';
import useInnerRef from './useInnerRef';
import { POSITIONS, ALIGNS } from './constants';
import ZIndexContext from './ZIndexContext';

const Tooltip = ({
    innerRef = null,
    parentRef = null,
    zIndex = 0,
    margin = 4,
    position = POSITIONS[0],
    align = ALIGNS[0],
    positions = null,
    aligns = null,
    children = null,
    style = null,
    ...rest
}) => {
    const tooltipRef = useInnerRef(innerRef);
    const [coords, parentSize, tooltipSize] = useTooltip(parentRef, tooltipRef, {
        margin,
        position,
        align,
        positions,
        aligns
    });
    const contextZIndex = useContext(ZIndexContext);
    const styleZIndex = (zIndex || 0) + (contextZIndex || 0);
    const extraStyle = useMemo(
        () => ({
            ...style,
            position: 'absolute',
            zIndex: styleZIndex,
            ...(coords ? {} : { opacity: 0 }),
            ...coords
        }),
        [coords, style, styleZIndex]
    );

    return (
        <ZIndexContext.Provider value={styleZIndex + 1}>
            {ReactDOM.createPortal(
                !!children &&
                    children({
                        ...rest,
                        innerRef: tooltipRef,
                        style: extraStyle,
                        parentSize,
                        tooltipSize
                    }),
                document.body
            )}
        </ZIndexContext.Provider>
    );
};

export default Tooltip;
