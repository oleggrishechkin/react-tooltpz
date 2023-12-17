# React Tooltpz

[![NPM version](https://img.shields.io/npm/v/react-tooltpz.svg?style=flat)](https://www.npmjs.com/package/react-tooltpz)
![NPM license](https://img.shields.io/npm/l/react-tooltpz.svg?style=flat)
[![NPM total downloads](https://img.shields.io/npm/dt/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)

Low-level component for creating menus, tooltips, hints, dropdown and other popups

## 💬 Flexible Tooltip Components with zero dependencies

- Automatically find best position
- With Portal
- No extra DOM nodes
- Tiny

Try [demo](https://codesandbox.io/s/react-tooltpz-q5dvz)

## Basic Usage:

```typescript jsx
import { useState } from 'react';
import { Tooltip } from 'react-tooltpz';

type Props = {
    title: string;
    tooltip: string;
};

const TitleWithHoverTooltip = ({
  title,
  tooltip,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      {title}
      {opened && (
        <Tooltip parentRef={ref}>
          {({ ref, style }) => (
            <div ref={ref} style={style}>
              {tooltip}
            </div>
          )}
        </Tooltip>
      )}
    </div>
  );
};
```

## Installation:

```shell script
npm install --save react-tooltpz
```

## Importing:

```javascript
import { Tooltip } from 'react-tooltpz';
```

## Advanced usage

### Using parent width

```typescript jsx
import { useState } from 'react';
import { Tooltip } from 'react-tooltpz';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    options?: string[];
    onChange?: (nextValue: string) => void;
};

const Autocomplete = ({
  ...inputProps,
  options,
  onChange,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        {...inputProps}
        ref={ref}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {focused && !!options?.length && (
        <Tooltip parentRef={ref}>
          {({ ref, style }, { parentRect }) => (
            <div
              ref={ref}
              style={{
                ...style,
                width: parentRect?.width,
              }}
            >
              {options.map((option) => (
                <div
                  onClick={() => onChange(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </Tooltip>
      )}
    </>
  );
};
```

## API

### Tooltip

**Props**

```typescript
type Props = {
  parentRef: MutableRefObject<AnyWithGetBoundingClientRect / null>;
  innerRef?: MutableRefObject<AnyWithGetBoundingClientRect / null>;
  margin?: number;
  position?: Position;
  align?: Align;
  allowedPositions?: Position[];
  children?: (
          props: { ref: MutableRefObject<AnyWithGetBoundingClientRect / null>; style: CSSProperties },
          additionalData?: { parentRect: Rect / null; tooltipRect: Rect / null },
  ) => ReactNode;
  style?: CSSProperties;
  zIndex?: number;
  portalNode?: HTMLElement;
  withParentRect?: boolean;
  withTooltipRect?: boolean;
};
```

| name                 | type                                                                                                                                                                              | default  | description                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **parentRef**        | MutableRefObject<AnyWithGetBoundingClientRect / null>                                                                                                                             | required | Tooltip ref object.<br>It can be any object with `current` prop.<br>`current` prop should be `null` or any object with `getBoundingClientRect` method |
| **innerRef**         | MutableRefObject<AnyWithGetBoundingClientRect / null>                                                                                                                             | -        | Tooltip ref object.<br>Similar to **parentRef**                                                                                                       |
| **margin**           | number                                                                                                                                                                            | 4        | Margin between parent and tooltip                                                                                                                     |
| **position**         | 'bottom' / 'top' / 'left' / 'right'                                                                                                                                               | 'bottom' | Tooltip position                                                                                                                                      |
| **align**            | 'start' / 'center' / 'end'                                                                                                                                                        | 'start'  | Tooltip align                                                                                                                                         |
| **allowedPositions** | ('bottom' / 'top' / 'left' / 'right')[]                                                                                                                                           | []       | Tooltip allowed positions array. Empty value means all positions are allowed.                                                                         |
| **children**         | (props: { ref: MutableRefObject<AnyWithGetBoundingClientRect / null>; style: CSSProperties },additionalData?: { parentRect: Rect / null; tooltipRect: Rect / null }) => ReactNode | -        | Tooltip render function                                                                                                                               |
| **style**            | CSSProperties                                                                                                                                                                     | -        | Tooltip style object                                                                                                                                  |
| **zIndex**           | number                                                                                                                                                                            | 0        | Tooltip default z-index                                                                                                                               |
| **portalNode**       | HTMLElement                                                                                                                                                                       | -        | second parameter for `ReadDOM.createPortal`                                                                                                           |
| **withParentRect**   | boolean                                                                                                                                                                           | -        | If true `parentRect` prop of second parameter of `children` will be updated                                                                           |
| **withTooltipRect**  | boolean                                                                                                                                                                           | -        | If true `tooltipRect` prop of second parameter of `children` will be updated                                                                          |

---

### PortalNodeContext

provide portalNode to `Tooltip`

```typescript
export const PortalNodeContext: React.Context<HTMLElement | null>;
```

---

### ZIndexContext

provide zIndex to `Tooltip`

```typescript
export const ZIndexContext: React.Context<number>;
```
