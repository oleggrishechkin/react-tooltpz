import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { computeTooltipCoords } from './computeTooltipCoords';
import { Coords, Position, Align, AnyWithGetBoundingClientRect, Rect } from './types';
import { unsafeShallowEqual } from './unsafeShallowEqual';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { domRectToRect } from './domRectToRect';

export const useTooltipCoords = ({
    parentRef,
    tooltipRef,
    margin = 4,
    position = 'bottom',
    align = 'start',
    allowedPositions = [],
    withParentRect,
    withTooltipRect,
}: {
    parentRef: MutableRefObject<AnyWithGetBoundingClientRect | null>;
    tooltipRef: MutableRefObject<AnyWithGetBoundingClientRect | null>;
    margin?: number;
    position?: Position;
    align?: Align;
    allowedPositions?: Position[];
    withParentRect?: boolean;
    withTooltipRect?: boolean;
}) => {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [parentRect, setParentRect] = useState<Rect | null>(null);
    const [tooltipRect, setTooltipRect] = useState<Rect | null>(null);
    const stepRef = useRef(() => {});

    useIsomorphicLayoutEffect(() => {
        stepRef.current = () => {
            if (!parentRef.current || !tooltipRef.current) {
                if (parentRect) {
                    setParentRect(null);
                }

                if (tooltipRect) {
                    setTooltipRect(null);
                }

                if (coords) {
                    setCoords(null);
                }

                return;
            }

            const parentNormalizedRect = domRectToRect(parentRef.current.getBoundingClientRect());
            const tooltipNormalizedRect = domRectToRect(tooltipRef.current.getBoundingClientRect());
            const isParentRectEqual = unsafeShallowEqual(parentNormalizedRect, parentRect);

            if (
                !isParentRectEqual ||
                unsafeShallowEqual(
                    {
                        width: tooltipNormalizedRect.width,
                        height: tooltipNormalizedRect.height,
                    },
                    tooltipRect && {
                        width: tooltipRect.width,
                        height: tooltipRect.height,
                    },
                )
            ) {
                const nextCoords = computeTooltipCoords(parentNormalizedRect, tooltipNormalizedRect, {
                    margin,
                    position,
                    align,
                    allowedPositions,
                });

                if (!unsafeShallowEqual(coords, nextCoords)) {
                    setCoords(nextCoords);
                }
            }

            if (withParentRect && !isParentRectEqual) {
                setParentRect(parentNormalizedRect);
            }

            if (withTooltipRect && !unsafeShallowEqual(tooltipRect, tooltipNormalizedRect)) {
                setTooltipRect(tooltipNormalizedRect);
            }
        };
    }, []);
    useEffect(() => {
        let frameId: any;
        const frame = (): void => {
            frameId = requestAnimationFrame(frame);
            stepRef.current();
        };

        frame();

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return {
        coords,
        parentRect,
        tooltipRect,
    };
};
