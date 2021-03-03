import { MutableRefObject } from 'react';
import * as CSS from 'csstype';

export interface CoordsObject {
    top: number;
    left: number;
}

export type Coords = CoordsObject | null;

export interface SizeObject {
    width: number;
    height: number;
}

export type Size = SizeObject | null;

export type RefObject = MutableRefObject<HTMLElement | null>;

export type Position = 'bottom' | 'top' | 'right' | 'left';

export type Align = 'start' | 'center' | 'end';

export interface NormalizedRectObject {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
}

export interface Props {
    [propName: string]: any;
}

export interface AnyFunction {
    (...args: Array<any>): any;
}

export type Style = CSS.Properties<string | number>;

export interface SetOpened {
    (opened: boolean): void;
}

export interface VoidFunction {
    (): void;
}
