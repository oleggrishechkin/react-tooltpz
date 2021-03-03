import { useState, useRef, useEffect } from 'react';
import computeTooltipCoords from './computeTooltipCoords';
import { Coords, Size, Position, Align, RefObject } from './types';

interface UseTooltipOptions {
    margin?: number;
    position?: Position;
    align?: Align;
}

interface UseTooltip {
    (parentRef: RefObject, tooltipRef: RefObject, options: UseTooltipOptions): [Coords, Size, Size];
}

const useTooltip: UseTooltip = (parentRef, tooltipRef, { margin = 4, position = 'bottom', align = 'start' } = {}) => {
    const [coords, setCoords] = useState<Coords>(null);
    const [parentSize, setParentSize] = useState<Size>(null);
    const [tooltipSize, setTooltipSize] = useState<Size>(null);
    const stepRef = useRef<VoidFunction>(() => null);

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
                align
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
        let frameId: number;
        const frame = () => {
            frameId = requestAnimationFrame(frame);
            stepRef.current();
        };

        frame();

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return [coords, parentSize, tooltipSize];
};

export default useTooltip;
