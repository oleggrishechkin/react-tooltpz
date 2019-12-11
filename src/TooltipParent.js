/* eslint-disable react/prop-types */
import React, { useRef, Fragment } from 'react';
import useInnerRef from './useInnerRef';

const TooltipParent = ({ innerRef = null, tooltips, children = null, ...rest }) => {
    const parentRef = useInnerRef(innerRef);
    const tooltipRefs = [];
    let parentProps = rest;
    let tooltipsProps = [];

    for (let index = 0; index < tooltips.length; ++index) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const tooltipRef = useRef(null);
        const [parent, tooltip] = tooltips[index]({
            parentRef,
            tooltipRef,
            parentProps,
            tooltipsProps
        });

        tooltipRefs[index] = tooltipRef;
        parentProps = { ...parentProps, ...parent };
        tooltipsProps = tooltipsProps.slice();
        tooltipsProps[index] = tooltip;
    }

    if (!children) {
        return false;
    }

    return (
        <Fragment>
            {!!children[0] && children[0]({ ...parentProps, innerRef: parentRef, tooltipsProps })}
            {tooltipsProps.map(
                (props, index) =>
                    !!props.opened &&
                    !!children[index + 1] &&
                    React.cloneElement(children[index + 1], {
                        ...props,
                        key: index,
                        innerRef: tooltipRefs[index],
                        parentRef
                    })
            )}
        </Fragment>
    );
};

export default TooltipParent;
