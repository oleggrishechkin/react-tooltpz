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

## Getting Started

- ### Basic Usage:

    ```javascript
    import { useState } from 'react';
    import { Tooltip } from 'react-tooltpz';
    
    const TitleWithHoverTooltip = ({ title, tooltip }) => {
        const [opened, setOpened] = useState(false);
        const ref = useRef();

        return (
            <div
                ref={ref}
                onMouseEnter={() => setOpened(true)}
                onMouseLeave={() => setOpened(false)}
            >
                {title}
                {opened &&
                    <Tooltip parentRef={ref}>
                        {({ innerRef, style }) => (
                            <div ref={innerRef} style={style}>
                                {tooltip}
                            </div>
                        )}
                    </Tooltip>
                }
            </div>
        )
    };
    
    export default TitleWithHoverTooltip;
    ```

- ### Installation:

    ```shell script
    npm install --save react-tooltpz
    ```

- ### Importing:

    ```javascript
    import { Tooltip } from 'react-tooltpz';
    ```
    
    You also can import directly what you want 
    
    ```javascript
    import Tooltip from 'react-tooltpz/lib/Tooltip';
    import useOutsideClick from 'react-tooltpz/lib/useOutsideClick';
    ```

## API

### Tooltip

Compute a tooltip coords and render tooltip with `PortalNodeContext` and `ZIndexContext` 
Prefer this component instead of directly use `useTooltip` hook

**Props**

name          |type                                                                          |default      |description
--------------|------------------------------------------------------------------------------|-------------|-----------
**parentRef** |{ current: { getBoundingClientRect } }                                        |required     |Tooltip ref object.<br>It can be any object with `current` prop.<br>`current` prop should be `null` or any object with `getBoundingClientRect` method
**innerRef**  |{ current: { getBoundingClientRect } }                                        |-            |Tooltip ref object.<br>Similar to **parentRef**
**zIndex**    |number                                                                        |0            |Tooltip default z-index
**margin**    |number                                                                        |4            |Margin between parent and tooltip
**position**  |'bottom' / 'top' / 'left' / 'right'                                           |'bottom'     |Tooltip position
**align**     |'start' / 'center' / 'end'                                                    |'start'      |Tooltip align
**children**  |({ innerRef, style }, { parentRect, tooltipRect } ) => ReactNode              |-            |Tooltip render function
**style**     |object                                                                        |-            |Tooltip style object
**portalNode**|HTMLElement                                                                   |-            |second parameter for `ReadDOM.createPortal`

---

### Portal
Create a portal with `PortalNodeContext`. Prefer this component instead of directly use `createPortal`

**Props**

name          |type       |default      |description
--------------|-----------|-------------|-----------
**children**  |ReactNode  |-            |first parameter for `ReadDOM.createPortal`
**portalNode**|HTMLElement|-            |second parameter for `ReadDOM.createPortal`

___

### PortalNodeContext

provide portalNode to `Tooltip` and `Portal`

___

### ZIndexContext

provide zIndex to `Tooltip`

___

### useTooltip

Compute a tooltip coords

Parameters:
- parentRef: similar to `Tooltip` **parentRef**
- tooltipRef: similar to `Tooltip` **innerRef**
- options?: `{ margin?, position?, align? }`

Returns array with:

- coords: `{ top, left } | null`
- parentRect: `{ top, left, bottom, right, width, height } | null`
- tooltipRect: `{ top, left, bottom, right, width, height } | null`

### useOutsideClick
    
Handle a click outside of element with portal support

```javascript
const onMouseDownOrTouchStart = useOutsideClick(onOutsideClick);
```

Parameters:
- onOutsideClick?: `(event): void` - "onOutsideClick" handler

Returns:
- onMouseDownOrTouchStart: `(event): void` - onMouseDown or onTouchStart handler
