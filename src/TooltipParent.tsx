import { useRef, Fragment, MutableRefObject, cloneElement, ReactNode, ReactElement, FC } from 'react';
import mergeProps from './mergeProps';
import { SetOpened, RefObject } from './types';

interface TooltipParentProps {
    innerRef?: MutableRefObject<HTMLElement | null>;
    tooltip: (props?: {
        parentRef?: RefObject;
        tooltipRef?: RefObject;
    }) => [{ [propName: string]: any }, { opened: boolean; setOpened: SetOpened }];
    children: [
        (
            | ((
                  parentProps: { [propName: string]: any; innerRef?: RefObject },
                  tooltipProps: { [propName: string]: any; setOpened: SetOpened; opened: boolean }
              ) => ReactNode)
            | null
            | undefined
        ),
        ReactElement | null | undefined
    ];
}

const TooltipParent: FC<TooltipParentProps> = ({ innerRef = null, tooltip, children, ...rest }) => {
    const ref = useRef<HTMLElement | null>(null);
    const parentRef = innerRef || ref;
    const tooltipRef = useRef<HTMLElement | null>(null);
    const [parentProps, tooltipProps] = tooltip({
        parentRef,
        tooltipRef
    });
    const { opened, ...tooltipRest } = tooltipProps;
    const [parentElement, tooltipElement] = children;

    return (
        <Fragment>
            {!!parentElement && parentElement(mergeProps([rest, parentProps, { innerRef: parentRef }]), tooltipProps)}
            {opened &&
                !!tooltipElement &&
                cloneElement(
                    tooltipElement,
                    mergeProps([tooltipElement.props, { innerRef: tooltipRef, parentRef }, tooltipRest])
                )}
        </Fragment>
    );
};

export default TooltipParent;
