import { MutableRefObject } from 'react';
import * as CSS from 'csstype';

export type Coords = { top: number; left: number };

export type ObjectWithGetBoundingClientRect = { getBoundingClientRect: () => ClientRect };

export type RefWithGetBoundingClientRect = MutableRefObject<ObjectWithGetBoundingClientRect | null>;

export type Position = 'bottom' | 'top' | 'right' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Style = CSS.Properties<string | number>;
