/* eslint-disable react/prop-types */
import React, { useRef, Fragment } from 'react';
import useInnerRef from './useInnerRef';
import mergeProps from './mergeProps';
import { DEFAULT_PARENT_PROPS, DEFAULT_TOOLTIP_PROPS } from './constants';

const TooltipParent = ({ innerRef = null, tooltips, children = null, ...rest }) => {
    const parentRef = useInnerRef(innerRef);
    const tooltipRefs = [];
    const parentProps = [rest];
    const tooltipsProps = [];

    for (let index = 0; index < tooltips.length; ++index) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const tooltipRef = useRef(null);
        const [parent, tooltip] = tooltips[index]({
            parentRef,
            tooltipRef
        });

        tooltipRefs[index] = tooltipRef;
        parentProps.push(parent || DEFAULT_PARENT_PROPS);
        tooltipsProps.push(tooltip || DEFAULT_TOOLTIP_PROPS);
    }

    if (!children) {
        return false;
    }

    return (
        <Fragment>
            {!!children[0] && children[0]({ ...mergeProps(parentProps), innerRef: parentRef }, { tooltipsProps })}
            {tooltipsProps.map(
                ({ opened, ...props }, index) =>
                    !!opened &&
                    !!children[index + 1] &&
                    React.cloneElement(children[index + 1], {
                        ...mergeProps([children[index + 1].props, props]),
                        key: index,
                        innerRef: tooltipRefs[index],
                        parentRef
                    })
            )}
        </Fragment>
    );
};

export default TooltipParent;
