/* eslint-disable react/prop-types */
import React, { useMemo, Fragment } from 'react';
import ReactDOM from 'react-dom';
import useTooltip from './useTooltip';
import useInnerRef from './useInnerRef';
import { POSITIONS, ALIGNS } from './constants';

const Tooltip = ({
    innerRef = null,
    parentRef = null,
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
    const extraStyle = useMemo(
        () => ({
            ...style,
            position: 'absolute',
            ...(coords ? {} : { opacity: 0 }),
            ...coords
        }),
        [coords, style]
    );

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default Tooltip;
