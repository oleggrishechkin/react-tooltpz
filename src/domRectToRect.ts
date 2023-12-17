import { Rect } from './types';

export const domRectToRect = (rect: Rect): Rect => ({
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
});
