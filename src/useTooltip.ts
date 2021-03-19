import { useState, useRef, useEffect } from 'react';
import computeTooltipCoords from './computeTooltipCoords';
import { Coords, Position, Align, RefWithGetBoundingClientRect } from './types';

const normalizeRect = (rect: ClientRect): ClientRect => ({
    top: rect.top + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: rect.width,
    height: rect.height
});

const shallowEqual = <Type extends Record<string, any>>(source?: Type | null, target?: Type | null): boolean => {
    if (!source || !target) {
        return false;
    }

    return Object.keys(source).every((key) => source[key] !== target[key]);
};

const useTooltip = (
    parentRef: RefWithGetBoundingClientRect,
    tooltipRef: RefWithGetBoundingClientRect,
    {
        margin = 4,
        position = 'bottom',
        align = 'start'
    }: {
        margin?: number;
        position?: Position;
        align?: Align;
    } = {}
): [Coords | null, ClientRect | null, ClientRect | null] => {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [parentRect, setParentRect] = useState<ClientRect | null>(null);
    const [tooltipRect, setTooltipRect] = useState<ClientRect | null>(null);
    const stepRef = useRef<() => void>(() => {});

    stepRef.current = () => {
        if (!parentRef.current || !tooltipRef.current) {
            if (!parentRef.current && !!parentRect) {
                setParentRect(null);
            }

            if (!tooltipRef.current && !!tooltipRect) {
                setTooltipRect(null);
            }

            if (coords) {
                setCoords(null);
            }

            return;
        }

        const parentNormalizedRect = normalizeRect(parentRef.current.getBoundingClientRect());
        const tooltipNormalizedRect = normalizeRect(tooltipRef.current.getBoundingClientRect());
        const nextCoords = computeTooltipCoords(parentNormalizedRect, tooltipNormalizedRect, {
            margin,
            position,
            align
        });

        if (!shallowEqual(parentRect, parentNormalizedRect)) {
            setParentRect(parentNormalizedRect);
        }

        if (!shallowEqual(tooltipRect, tooltipNormalizedRect)) {
            setTooltipRect(tooltipNormalizedRect);
        }

        if (!shallowEqual(coords, nextCoords)) {
            setCoords(nextCoords);
        }
    };

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

    return [coords, parentRect, tooltipRect];
};

export default useTooltip;
