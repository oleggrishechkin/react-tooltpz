import React from 'react';
import { Tooltip, TooltipParent, useHoverTooltip, useClickTooltip, useFocusTooltip } from '../src';
import './App.css';

const App = () => (
    <div className="app">
        <header className="header">
            <h1>{'React Tooltpz'}</h1>
        </header>
        <main className="main">
            <TooltipParent tooltip={useHoverTooltip}>
                {({ innerRef, ...rest }, { opened }) => (
                    <span {...rest} className="parent" ref={innerRef}>
                        {opened ? 'Try avoid me' : 'Try hover me'}
                    </span>
                )}
                <Tooltip align="center">
                    {({ innerRef, ...rest }) => (
                        <span {...rest} className="tooltip" ref={innerRef}>
                            {'Hovered'}
                        </span>
                    )}
                </Tooltip>
            </TooltipParent>
            <TooltipParent tooltip={useClickTooltip}>
                {({ innerRef, ...rest }, { opened }) => (
                    <span {...rest} className="parent" ref={innerRef}>
                        {opened ? 'Try click outside me' : 'Try click me'}
                    </span>
                )}
                <Tooltip align="center">
                    {({ innerRef, ...rest }) => (
                        <span {...rest} className="tooltip" ref={innerRef}>
                            {'Clicked'}
                        </span>
                    )}
                </Tooltip>
            </TooltipParent>
            <TooltipParent tooltip={useFocusTooltip}>
                {({ innerRef, ...rest }, { opened }) => (
                    <span tabIndex={-1} {...rest} className="parent" ref={innerRef}>
                        {opened ? 'Try blur me' : 'Try focus me'}
                    </span>
                )}
                <Tooltip align="center">
                    {({ innerRef, ...rest }) => (
                        <span {...rest} className="tooltip" ref={innerRef}>
                            {'Focused'}
                        </span>
                    )}
                </Tooltip>
            </TooltipParent>
        </main>
    </div>
);

export default App;
