import { POSITIONS, ALIGNS } from './constants';

const computeCoords = (
    { top, right, bottom, left, width, height },
    { width: tooltipWidth, height: tooltipHeight },
    { margin, position, align }
) => {
    switch (position) {
        case 'bottom': {
            switch (align) {
                case 'start':
                    return {
                        top: bottom + margin,
                        left
                    };
                case 'center':
                    return {
                        top: bottom + margin,
                        left: left + Math.round(width / 2) - Math.round(tooltipWidth / 2)
                    };
                case 'end':
                    return {
                        top: bottom + margin,
                        left: right - tooltipWidth
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
                        left
                    };
                case 'center':
                    return {
                        top: top - margin - tooltipHeight,
                        left: left + Math.round(width / 2) - Math.round(tooltipWidth / 2)
                    };
                case 'end':
                    return {
                        top: top - margin - tooltipHeight,
                        left: right - tooltipWidth
                    };
                default:
                    return null;
            }
        }
        case 'right': {
            switch (align) {
                case 'start':
                    return {
                        top,
                        left: right + margin
                    };
                case 'center':
                    return {
                        top: top + Math.round(height / 2) - Math.round(tooltipHeight / 2),
                        left: right + margin
                    };
                case 'end':
                    return {
                        top: bottom - tooltipHeight,
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
                        top,
                        left: left - margin - tooltipWidth
                    };
                case 'center':
                    return {
                        top: top + Math.round(height / 2) - Math.round(tooltipHeight / 2),
                        left: left - margin - tooltipWidth
                    };
                case 'end':
                    return {
                        top: bottom - tooltipHeight,
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

export default (parentNormalizedRect, tooltipSize, { margin, position, align, positions, aligns }) => {
    const initCoords = computeCoords(parentNormalizedRect, tooltipSize, { margin, position, align });

    if (
        initCoords.top >= 0 &&
        initCoords.left >= 0 &&
        initCoords.top + tooltipSize.height <= document.documentElement.clientHeight &&
        initCoords.left + tooltipSize.width <= document.documentElement.clientWidth
    ) {
        return initCoords;
    }

    const initPositionIndex = POSITIONS.indexOf(position);
    const initAlignIndex = ALIGNS.indexOf(align);
    let positionIndex = (initPositionIndex + 1) % POSITIONS.length;
    let alignIndex = (initPositionIndex + 1) % ALIGNS.length;

    while (positionIndex !== initPositionIndex && alignIndex !== initAlignIndex) {
        if (
            (!positions || positions.includes(POSITIONS[positionIndex])) &&
            (!aligns || aligns.includes(ALIGNS[positionIndex]))
        ) {
            const coords = computeCoords(parentNormalizedRect, tooltipSize, {
                margin,
                position: POSITIONS[positionIndex],
                align: ALIGNS[alignIndex]
            });

            if (
                coords.top >= 0 &&
                coords.left >= 0 &&
                coords.top + tooltipSize.height <= document.documentElement.clientHeight &&
                coords.left + tooltipSize.width <= document.documentElement.clientWidth
            ) {
                return coords;
            }
        }

        alignIndex = (alignIndex + 1) % ALIGNS.length;

        if (alignIndex === 0) {
            positionIndex = (positionIndex + 1) % POSITIONS.length;
        }
    }

    return initCoords;
};
