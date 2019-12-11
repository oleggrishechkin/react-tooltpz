import React from 'react';
import { Tooltip, TooltipParent, useHoverTooltip, useClickTooltip, useFocusTooltip } from '../src';
import theme from './App.module.css';

const App = () => (
    <div className={theme.app}>
        <header className={theme.header}>
            <h1>{'React Tooltpz'}</h1>
        </header>
        <main className={theme.main}>
            <TooltipParent tooltips={[useHoverTooltip, useClickTooltip, useFocusTooltip]}>
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
                <Tooltip position="top" align="center">
                    {({ innerRef, parentSize, tooltipSize, setOpened, ...rest }) => (
                        <div {...rest} className={theme.tooltip} ref={innerRef}>
                            {'Clicked'}
                        </div>
                    )}
                </Tooltip>
                <Tooltip position="right" align="center">
                    {({ innerRef, parentSize, tooltipSize, setOpened, ...rest }) => (
                        <div {...rest} className={theme.tooltip} ref={innerRef}>
                            {'Focused'}
                        </div>
                    )}
                </Tooltip>
            </TooltipParent>
        </main>
    </div>
);

export default App;
