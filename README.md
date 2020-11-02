# React Tooltpz
[![NPM version](https://img.shields.io/npm/v/react-tooltpz.svg?style=flat)](https://www.npmjs.com/package/react-tooltpz)
![NPM license](https://img.shields.io/npm/l/react-tooltpz.svg?style=flat)
[![NPM total downloads](https://img.shields.io/npm/dt/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-tooltpz.svg?style=flat)](https://npmcharts.com/compare/react-tooltpz?minimal=true)

Low-level components for creating menus, tooltips, hints, dropdown and other popups

## Flexible Tooltip Components with zero dependencies

- Automatically find best position
- Hover, Click and Focus logic out of the box
- Support custom logic
- Portal to document.body
- No extra DOM nodes
- Lightweight (2.8kb minified+gzipped)

Try [demo](https://oleggrishechkin.github.io/react-tooltpz)

## Getting Started

- ### Installation:

    ```shell script
    npm install --save react-tooltpz
    ```

- ### Importing:

    ```javascript
    import { TooltipParent, Tooltip, useHoverTooltip } from 'react-tooltpz';
    ```
    
    You also can import directly what you want 
    
    ```javascript
    import TooltipParent from 'react-tooltpz/lib/TooltipParent';
    import Tooltip from 'react-tooltpz/lib/Tooltip';
    import useHoverTooltip from 'react-tooltpz/lib/useHoverTooltip';
    ```

- ### Basic Usage:

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

- ### TooltipParent

    **Props**
    
    name             |type                                                                 |default |description
    -----------------|---------------------------------------------------------------------|--------|-----------
    **innerRef**     |object                                                               |null    |Parent `ref` object
    **tooltip**      |function (react hook)                                                |required|Tooltip `opened` logic
    **children**     |({ innerRef, ...rest }, { opened, setOpened, ...tooltipRest }) => jsx|null    |Parent render function

- ### Tooltip

    **Props**
    
    name          |type                                                                          |default      |description
    --------------|------------------------------------------------------------------------------|-------------|-----------
    **innerRef**  |object                                                                        |null         |Tooltip `ref` object
    **parentRef** |object                                                                        |null         |Parent `ref` object
    **zIndex**    |number                                                                        |0            |Tooltip default `z-index`
    **margin**    |number                                                                        |4            |Margin between parent and tooltip
    **position**  |one of [_bottom_, _top_, _left_, _right_]                                     |_bottom_     |Tooltip position
    **align**     |one of [_start_, _center_, _end_]                                             |_start_      |Tooltip align
    **children**  |({ innerRef, style, ...rest }, { parentSize, tooltipSize, setOpened } ) => jsx|null         |Tooltip render function
    **style**     |object                                                                        |null         |Tooltip `style`
    **setOpened** |(opened) => void                                                              |null         |Tooltip `opened` change function
    **portalNode**|DOM node                                                                      |document.body|Container for `ReadDOM.createPortal`

## Logic hooks

- ### useHoverTooltip

    open tooltip by a mouse enter and close by mouse leave

- ### useClickTooltip

    open tooltip by a click and close by a click and outside click

- ### useFocusTooltip

    open tooltip by focus and close by blur

## Write your own logic hook

- ### API

    ```javascript
    const [
        parentProps,
        { opened, setOpened, ...tooltipProps }
    ] = useMyOwnLogicHook({ parentRef, tooltipRef });
    ```
    
    Accepts: `object` with `parentRef` and `tooltipRef` props
    
    Returns: `array` with `parentProps` and `tooltipProps` items
    
    *`tooltipProps` required `opened` and `setOpened` props

- ### Usage

    ```javascript
    const useSimpleClickTooltip = () => {
        const [opened, setOpened] = useState(false);
        const onClick = useCallback(() => {
            setOpened((value) => !value);
        });
    
        return [{ onClick }, { opened, setOpened }];
    };
    ```
    
    *You should use `useCallback`, `useMemo` and `useRef` hooks to prevent unnecessary re renders
