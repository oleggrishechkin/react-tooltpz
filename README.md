## React Tooltpz
[![NPM version](https://img.shields.io/npm/v/react-tooltpz.svg?style=flat)](https://www.npmjs.com/package/react-tooltpz)
![NPM license](https://img.shields.io/npm/l/react-tooltpz.svg?style=flat)
[![NPM total downloads](https://img.shields.io/npm/dt/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)

See simple [demo](https://oleggrishechkin.github.io/react-tooltpz)

### Delicious tooltip component with zero dependencies

- Find visible position and align automatically 
- Hover, Click and Focus logic out of the box
- Extendable (support custom tooltip logic)
- Portal to document.body
- Support multi tooltips
- With outside click
- No extra DOM nodes
- Lightweight

## Getting Started

### Install:

```shell script
npm install --save react-tooltpz
```

### Import:

```javascript
import { TooltipParent, Tooltip, useHoverTooltip } from 'react-tooltpz';
```

### Use:

```javascript
<TooltipParent tooltips={[useHoverTooltip]}>
    {({ innerRef, tooltipsProps, ...rest }) => (
        <button {...rest} className={theme.button} ref={innerRef}>
            {'Try hover, click and focus'}
        </button>
    )}
    <Tooltip position="bottom" align="center">
        {({ innerRef, parentSize, tooltipSize, setOpened, ...rest }) => (
            <div {...rest} className={theme.tooltip} ref={innerRef}>
                {'Hovered'}
            </div>
        )}
    </Tooltip>
</TooltipParent>
```

## Components

## `TooltipParent`

Render parent

#### Props

name             |type                          |default|description
-----------------|------------------------------|-------|-----------
**innerRef**     |object                        |null   |parent ref
**tooltips**     |array of functions            |[]     |tooltips `opened` logic
**children**     |({ innerRef, ...rest }) => jsx|null   |parent render function

## `Tooltip`

Render tooltip

#### Props

name         |type                                                          |default|description
-------------|--------------------------------------------------------------|-------|-----------
**innerRef** |object                                                        |null   |tooltip ref
**parentRef**|object                                                        |null   |parent ref
**margin**   |number                                                        |4      |margin between parent and tooltip
**position** |one of [bottom, top, left, right]                             |bottom |tooltip position
**align**    |one of [start, center, end]                                   |start  |tooltip align
**positions**|array of [bottom, top, left, right] or null                   |null   |supported tooltip positions
**aligns**   |array of [start, center, end] or null                         |null   |supported tooltip aligns
**children** |({ innerRef, style, parentSize, tooltipSize, ...rest }) => jsx|null   |tooltip render function
**style**    |object                                                        |null   |tooltip style

## Hooks

## `useHoverTolltip`

open tooltip by hover

## `useClickTolltip`

open tooltip by click

## `useFocusTolltip`

open tooltip by focus

## Building Your Own Hooks

Hooks can accept `object` with props

name             |type            |description
-----------------|----------------|-----------
**parentRef**    |object          |parent ref
**tooltipRef**   |object          |tooltip ref
**parentProps**  |object          |merged parent props from previous hooks
**tooltipsProps**|array of objects|tooltips props from previous hooks

and should return `array` with two elements

index|type            |description
-----|----------------|-----------
0    |object          |parent props
1    |object          |tooltip props

tooltip props required props

name     |type    |description
---------|--------|-----------
opened   |bool    |tooltip `opened` state
setOpened|function|set tooltip `opened` state

#### Example

```
const useSimpleClickTooltip = () => {
    const [opened, setOpened] = useState(false);
    const onClick = useCallback(() => {
        setOpened((value) => !value);
    });

    return [{ onClick }, { opened, setOpened }];
};
```
