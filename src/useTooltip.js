import { useState, useRef, useEffect } from 'react';
import computeTooltipCoords from './computeTooltipCoords';

const useTooltip = (
    parentRef = null,
    tooltipRef = null,
    { margin = 4, position = 'bottom', align = 'start', positions = null, aligns = null } = {}
) => {
    const [coords, setCoords] = useState(null);
    const [parentSize, setParentSize] = useState(null);
    const [tooltipSize, setTooltipSize] = useState(null);
    const stepRef = useRef(() => {});

    stepRef.current = () => {
        if (!parentRef.current || !tooltipRef.current) {
            if (!parentRef.current && !!parentSize) {
                setParentSize(null);
            }

            if (!tooltipRef.current && !!tooltipSize) {
                setTooltipSize(null);
            }

            if (coords) {
                setCoords(null);
            }

            return;
        }

        const parentRefRect = parentRef.current.getBoundingClientRect();
        const tooltipRefRect = tooltipRef.current.getBoundingClientRect();
        const nextCoords = computeTooltipCoords(
            {
                top: parentRefRect.top + window.pageYOffset,
                right: parentRefRect.right + window.pageXOffset,
                bottom: parentRefRect.bottom + window.pageYOffset,
                left: parentRefRect.left + window.pageXOffset,
                width: parentRefRect.width,
                height: parentRefRect.height
            },
            {
                width: tooltipRefRect.width,
                height: tooltipRefRect.height
            },
            {
                margin,
                position,
                align,
                positions,
                aligns
            }
        );

        if (!parentSize || parentRefRect.width !== parentSize.width || parentRefRect.height !== parentSize.height) {
            setParentSize({
                width: parentRefRect.width,
                height: parentRefRect.height
            });
        }

        if (
            !tooltipSize ||
            tooltipRefRect.width !== tooltipSize.width ||
            tooltipRefRect.height !== tooltipSize.height
        ) {
            setTooltipSize({
                width: tooltipRefRect.width,
                height: tooltipRefRect.height
            });
        }

        if (!nextCoords || !coords || nextCoords.top !== coords.top || nextCoords.left !== coords.left) {
            setCoords(nextCoords);
        }
    };

    useEffect(() => {
        let frameId = 0;
        const frame = () => {
            frameId = requestAnimationFrame(frame);
            stepRef.current();
        };

        frame();

        return () => cancelAnimationFrame(frameId);
    }, []);

    return [coords, parentSize, tooltipSize];
};

export default useTooltip;
