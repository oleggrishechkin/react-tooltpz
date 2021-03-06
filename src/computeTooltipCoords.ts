import { Align, Position, Coords } from './types';

const computePositionCoords = (
    { top, right, bottom, left, width, height }: ClientRect,
    { width: tooltipWidth, height: tooltipHeight }: ClientRect,
    { margin, position, align }: { margin: number; position: Position; align: Align }
): Coords | null => {
    switch (position) {
        case 'bottom': {
            switch (align) {
                case 'start':
                    return {
                        top: bottom + margin,
                        left: Math.min(Math.max(left, 0), document.documentElement.clientWidth - tooltipWidth)
                    };
                case 'center':
                    return {
                        top: bottom + margin,
                        left: Math.min(
                            Math.max(left + Math.round(width / 2) - Math.round(tooltipWidth / 2), 0),
                            document.documentElement.clientWidth - tooltipWidth
                        )
                    };
                case 'end':
                    return {
                        top: bottom + margin,
                        left: Math.min(
                            Math.max(right - tooltipWidth, 0),
                            document.documentElement.clientWidth - tooltipWidth
                        )
                    };
                default:
                    return null;
            }
        }
        case 'top': {
            switch (align) {
                case 'start':
                    return {
                        top: top - margin - tooltipHeight,
                        left: Math.min(Math.max(left, 0), document.documentElement.clientWidth - tooltipWidth)
                    };
                case 'center':
                    return {
                        top: top - margin - tooltipHeight,
                        left: Math.min(
                            Math.max(left + Math.round(width / 2) - Math.round(tooltipWidth / 2), 0),
                            document.documentElement.clientWidth - tooltipWidth
                        )
                    };
                case 'end':
                    return {
                        top: top - margin - tooltipHeight,
                        left: Math.min(
                            Math.max(right - tooltipWidth, 0),
                            document.documentElement.clientWidth - tooltipWidth
                        )
                    };
                default:
                    return null;
            }
        }
        case 'right': {
            switch (align) {
                case 'start':
                    return {
                        top: Math.min(Math.max(top, 0), document.documentElement.clientHeight - tooltipHeight),
                        left: right + margin
                    };
                case 'center':
                    return {
                        top: Math.min(
                            Math.max(top + Math.round(height / 2) - Math.round(tooltipHeight / 2), 0),
                            document.documentElement.clientHeight - tooltipHeight
                        ),
                        left: right + margin
                    };
                case 'end':
                    return {
                        top: Math.min(
                            Math.max(bottom - tooltipHeight, 0),
                            document.documentElement.clientHeight - tooltipHeight
                        ),
                        left: right + margin
                    };
                default:
                    return null;
            }
        }
        case 'left': {
            switch (align) {
                case 'start':
                    return {
                        top: Math.min(Math.max(top, 0), document.documentElement.clientHeight - tooltipHeight),
                        left: left - margin - tooltipWidth
                    };
                case 'center':
                    return {
                        top: Math.min(
                            Math.max(top + Math.round(height / 2) - Math.round(tooltipHeight / 2), 0),
                            document.documentElement.clientHeight - tooltipHeight
                        ),
                        left: left - margin - tooltipWidth
                    };
                case 'end':
                    return {
                        top: Math.min(
                            Math.max(bottom - tooltipHeight, 0),
                            document.documentElement.clientHeight - tooltipHeight
                        ),
                        left: left - margin - tooltipWidth
                    };
                default:
                    return null;
            }
        }
        default:
            return null;
    }
};

const isPositionAllowed = (
    { top, right, bottom, left }: ClientRect,
    { width: tooltipWidth, height: tooltipHeight }: ClientRect,
    { margin, position }: { margin: number; position: Position }
): boolean => {
    switch (position) {
        case 'bottom': {
            return (
                bottom + tooltipHeight + margin <= document.documentElement.clientHeight &&
                tooltipWidth <= document.documentElement.clientWidth
            );
        }
        case 'top': {
            return tooltipHeight + margin <= top && tooltipWidth <= document.documentElement.clientWidth;
        }
        case 'right': {
            return (
                right + tooltipWidth + margin <= document.documentElement.clientWidth &&
                tooltipHeight <= document.documentElement.clientHeight
            );
        }
        case 'left': {
            return tooltipWidth + margin <= left && tooltipHeight <= document.documentElement.clientHeight;
        }
        default: {
            return false;
        }
    }
};

const computeTooltipCoords = (
    parentNormalizedRect: ClientRect,
    tooltipSize: ClientRect,
    { margin, position, align }: { margin: number; position: Position; align: Align }
): Coords | null => {
    const preferredCoords = computePositionCoords(parentNormalizedRect, tooltipSize, { margin, position, align });

    switch (position) {
        case 'bottom': {
            return (
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'bottom' }) &&
                    preferredCoords) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'top' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, { margin, position: 'top', align })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'right' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'right',
                        align: 'start'
                    })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'left' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'left',
                        align: 'start'
                    })) ||
                preferredCoords
            );
        }
        case 'top': {
            return (
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'top' }) &&
                    preferredCoords) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'bottom' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, { margin, position: 'bottom', align })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'right' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'right',
                        align: 'end'
                    })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'left' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'left',
                        align: 'end'
                    })) ||
                preferredCoords
            );
        }
        case 'right': {
            return (
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'right' }) &&
                    preferredCoords) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'left' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, { margin, position: 'left', align })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'bottom' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'bottom',
                        align: 'start'
                    })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'top' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'top',
                        align: 'start'
                    })) ||
                preferredCoords
            );
        }
        case 'left': {
            return (
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'left' }) &&
                    preferredCoords) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'right' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, { margin, position: 'right', align })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'bottom' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'bottom',
                        align: 'end'
                    })) ||
                (isPositionAllowed(parentNormalizedRect, tooltipSize, { margin, position: 'top' }) &&
                    computePositionCoords(parentNormalizedRect, tooltipSize, {
                        margin,
                        position: 'top',
                        align: 'end'
                    })) ||
                preferredCoords
            );
        }
        default: {
            return preferredCoords;
        }
    }
};

export default computeTooltipCoords;
