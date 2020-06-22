import React, { useRef, Fragment } from 'react';
import mergeProps from './mergeProps';

const TooltipParent = ({ innerRef = null, tooltip, children = null, ...rest }) => {
    const ref = useRef(null);
    const parentRef = innerRef || ref;
    const tooltipRef = useRef(null);
    const [parentProps, tooltipProps] = tooltip({
        parentRef,
        tooltipRef
    });
    const { opened, ...tooltipRest } = tooltipProps;
    const [parentElement, tooltipElement] = children;

    return (
        <Fragment>
            {!!parentElement &&
                parentElement(mergeProps([rest, parentProps, { innerRef: parentRef }]), { ...tooltipProps, opened })}
            {!!opened &&
                !!tooltipElement &&
                React.cloneElement(
                    tooltipElement,
                    mergeProps([tooltipElement.props, { innerRef: tooltipRef, parentRef }, tooltipRest])
                )}
        </Fragment>
    );
};

export default TooltipParent;
