import { Align, Coords, Position, Rect } from './types';

const computePositionCoords = (
    { top, right, bottom, left, width, height }: Rect,
    { width: tooltipWidth, height: tooltipHeight }: Pick<Rect, 'width' | 'height'>,
    { margin, position, align }: { margin: number; position: Position; align: Align },
): Coords | null => {
    switch (position) {
        case 'bottom': {
            switch (align) {
                case 'start':
                    return {
                        top: bottom + margin,
                        left: Math.min(Math.max(left, 0), document.documentElement.clientWidth - tooltipWidth),
                    };
                case 'center':
                    return {
                        top: bottom + margin,
                        left: Math.min(
                            Math.max(left + Math.round(width / 2) - Math.round(tooltipWidth / 2), 0),
                            document.documentElement.clientWidth - tooltipWidth,
                        ),
                    };
                case 'end':
                    return {
                        top: bottom + margin,
                        left: Math.min(
                            Math.max(right - tooltipWidth, 0),
                            document.documentElement.clientWidth - tooltipWidth,
                        ),
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
                        left: Math.min(Math.max(left, 0), document.documentElement.clientWidth - tooltipWidth),
                    };
                case 'center':
                    return {
                        top: top - margin - tooltipHeight,
                        left: Math.min(
                            Math.max(left + Math.round(width / 2) - Math.round(tooltipWidth / 2), 0),
                            document.documentElement.clientWidth - tooltipWidth,
                        ),
                    };
                case 'end':
                    return {
                        top: top - margin - tooltipHeight,
                        left: Math.min(
                            Math.max(right - tooltipWidth, 0),
                            document.documentElement.clientWidth - tooltipWidth,
                        ),
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
                        left: right + margin,
                    };
                case 'center':
                    return {
                        top: Math.min(
                            Math.max(top + Math.round(height / 2) - Math.round(tooltipHeight / 2), 0),
                            document.documentElement.clientHeight - tooltipHeight,
                        ),
                        left: right + margin,
                    };
                case 'end':
                    return {
                        top: Math.min(
                            Math.max(bottom - tooltipHeight, 0),
                            document.documentElement.clientHeight - tooltipHeight,
                        ),
                        left: right + margin,
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
                        left: left - margin - tooltipWidth,
                    };
                case 'center':
                    return {
                        top: Math.min(
                            Math.max(top + Math.round(height / 2) - Math.round(tooltipHeight / 2), 0),
                            document.documentElement.clientHeight - tooltipHeight,
                        ),
                        left: left - margin - tooltipWidth,
                    };
                case 'end':
                    return {
                        top: Math.min(
                            Math.max(bottom - tooltipHeight, 0),
                            document.documentElement.clientHeight - tooltipHeight,
                        ),
                        left: left - margin - tooltipWidth,
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
    { top, right, bottom, left }: Rect,
    { width: tooltipWidth, height: tooltipHeight }: Pick<Rect, 'width' | 'height'>,
    { margin, position, allowedPositions }: { margin: number; position: Position; allowedPositions: Position[] },
) => {
    if (allowedPositions.length && !allowedPositions.includes(position)) {
        return false;
    }

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

const POSITION_OPTIONS = {
    bottom: [
        { position: 'bottom' },
        { position: 'top' },
        { position: 'right', align: 'start' },
        { position: 'left', align: 'start' },
    ],
    top: [
        { position: 'top' },
        { position: 'bottom' },
        { position: 'right', align: 'end' },
        { position: 'left', align: 'end' },
    ],
    right: [
        { position: 'right' },
        { position: 'left' },
        { position: 'bottom', align: 'start' },
        { position: 'top', align: 'start' },
    ],
    left: [
        { position: 'right' },
        { position: 'left' },
        { position: 'bottom', align: 'end' },
        { position: 'top', align: 'end' },
    ],
} as const;

export const computeTooltipCoords = (
    parentRect: Rect,
    tooltipDimensions: Pick<Rect, 'width' | 'height'>,
    {
        margin,
        position,
        align,
        allowedPositions,
    }: { margin: number; position: Position; align: Align; allowedPositions: Position[] },
) => {
    const positionsOptions = POSITION_OPTIONS[position];

    for (const positionOption of positionsOptions) {
        if (
            isPositionAllowed(parentRect, tooltipDimensions, {
                margin,
                position: positionOption.position,
                allowedPositions,
            })
        ) {
            return computePositionCoords(parentRect, tooltipDimensions, {
                margin,
                align,
                ...positionOption,
            });
        }
    }

    return computePositionCoords(parentRect, tooltipDimensions, {
        margin,
        position,
        align,
    });
};
