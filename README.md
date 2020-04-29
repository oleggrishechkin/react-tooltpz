## React Tooltpz
[![NPM version](https://img.shields.io/npm/v/react-tooltpz.svg?style=flat)](https://www.npmjs.com/package/react-tooltpz)
![NPM license](https://img.shields.io/npm/l/react-tooltpz.svg?style=flat)
[![NPM total downloads](https://img.shields.io/npm/dt/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)

Try [demo](https://oleggrishechkin.github.io/react-tooltpz)

### Flexible Tooltip Components with zero dependencies

- Automatically find best position
- Hover, Click and Focus logic out of the box
- Support custom logic
- Portal to document.body
- No extra DOM nodes
- Lightweight (2.8kb minified+gzipped)

## Getting Started

#### Installation:

```shell script
npm install --save react-tooltpz
```

#### Importing:

```javascript
import { TooltipParent, Tooltip, useHoverTooltip } from 'react-tooltpz';
```

You also can import directly what you want 

```javascript
import TooltipParent from 'react-tooltpz/lib/TooltipParent';
import Tooltip from 'react-tooltpz/lib/Tooltip';
import useHoverTooltip from 'react-tooltpz/lib/useHoverTooltip';
```
#### Basic Usage:

```javascript
import React from 'react';
import { TooltipParent, Tooltip, useHoverTooltip } from 'react-tooltpz';

const TitleWithTooltip = ({ title, tooltip }) => (
    <TooltipParent tooltip={useHoverTooltip}>
        {({ innerRef, ...rest }) => (
            <div {...rest} ref={innerRef}>
                {title}
            </div>
        )}
        <Tooltip>
            {({ innerRef, ...rest }) => (
                <div {...rest} ref={innerRef}>
                    {tooltip}
                </div>
            )}
        </Tooltip>
    </TooltipParent>
);

export default TitleWithTooltip;
```

## Components

## `TooltipParent`

### Props

name             |type                                                                 |default|description
-----------------|---------------------------------------------------------------------|-------|-----------
**innerRef**     |object                                                               |null   |parent ref
**tooltip**      |function (react hook)                                                |-      |tooltip `opened` logic
**children**     |({ innerRef, ...rest }, { opened, setOpened, ...tooltipRest }) => jsx|null   |parent render function

## `Tooltip`

### Props

name         |type                                                                          |default|description
-------------|------------------------------------------------------------------------------|-------|-----------
**innerRef** |object                                                                        |null   |tooltip ref
**parentRef**|object                                                                        |null   |parent ref
**zIndex**   |number                                                                        |0      |tooltip default zIndex
**margin**   |number                                                                        |4      |margin between parent and tooltip
**position** |one of [bottom, top, left, right]                                             |bottom |tooltip position
**align**    |one of [start, center, end]                                                   |start  |tooltip align
**children** |({ innerRef, style, ...rest }, { parentSize, tooltipSize, setOpened } ) => jsx|null   |tooltip render function
**style**    |object                                                                        |null   |tooltip style
**setOpened**|(opened) => void                                                              |null   |set tooltip `opened` state

## Logic hooks

- ### `useHoverTolltip`

    open tooltip by mouse enter and close by mouse leave

- ### `useClickTolltip`

    open tooltip by click and close by click and outside click

- ### `useFocusTolltip`

    open tooltip by focus and close by blur

## Write your own logic hook

```javascript
const [parentProps, { opened, setOpened, ...tooltipProps }] = useMyOwnLogicHook({ parentRef, tooltipRef });
```

- Accepts `object` with `parentRef` and `tooltipRef` props

- Returns `array` with `parentProps` and `tooltipProps` items

- `tooltipProps` required `opened` and `setOpened` props


### Example

```javascript
const useSimpleClickTooltip = () => {
    const [opened, setOpened] = useState(false);
    const onClick = useCallback(() => {
        setOpened((value) => !value);
    });

    return [{ onClick }, { opened, setOpened }];
};
```

You should use `useCallback`, `useMemo` and `useRef` hooks to prevent unnecessary re renders
