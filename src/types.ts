export type Rect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};

export type Coords = { top: number; left: number };

export type AnyWithGetBoundingClientRect = { getBoundingClientRect: () => Rect };

export type Position = 'bottom' | 'top' | 'right' | 'left';

export type Align = 'start' | 'center' | 'end';
