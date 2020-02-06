import { useState } from 'react';
import computeTooltipCoords from './computeTooltipCoords';
import useRecursiveAnimationFrame from './useRecursiveAnimationFrame';
import { POSITIONS, ALIGNS } from './constants';

const useTooltip = (
    parentRef = null,
    tooltipRef = null,
    { margin = 4, position = POSITIONS[0], align = ALIGNS[0], positions = null, aligns = null } = {}
) => {
    const [coords, setCoords] = useState(null);
    const [parentSize, setParentSize] = useState(null);
    const [tooltipSize, setTooltipSize] = useState(null);

    useRecursiveAnimationFrame(() => {
        if (!parentRef.current || !tooltipRef.current) {
            return;
        }

        const parentRefRect = parentRef.current.getBoundingClientRect();
        const tooltipRefRect = parentRef.current.getBoundingClientRect();
        const nextParentSize = {
            width: parentRefRect.width,
            height: parentRefRect.height
        };
        const nextTooltipSize = {
            width: tooltipRefRect.width,
            height: tooltipRefRect.height
        };
        const nextCoords = computeTooltipCoords(
            {
                top: parentRefRect.top + window.pageYOffset,
                right: parentRefRect.right + window.pageXOffset,
                bottom: parentRefRect.bottom + window.pageYOffset,
                left: parentRefRect.left + window.pageXOffset,
                width: parentRefRect.width,
                height: parentRefRect.height
            },
            nextTooltipSize,
            {
                margin,
                position,
                align,
                positions,
                aligns
            }
        );

        if (
            !nextParentSize ||
            !parentSize ||
            nextParentSize.width !== parentSize.width ||
            nextParentSize.height !== parentSize.height
        ) {
            setParentSize(nextParentSize);
        }

        if (
            !nextTooltipSize ||
            !tooltipSize ||
            nextTooltipSize.width !== tooltipSize.width ||
            nextTooltipSize.height !== tooltipSize.height
        ) {
            setTooltipSize(nextTooltipSize);
        }

        if (!nextCoords || !coords || nextCoords.top !== coords.top || nextCoords.left !== coords.left) {
            setCoords(nextCoords);
        }
    });

    return [coords, parentSize, tooltipSize];
};

export default useTooltip;
