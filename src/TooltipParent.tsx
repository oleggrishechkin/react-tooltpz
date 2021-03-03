import {
    useRef,
    Fragment,
    ReactChildren,
    Children,
    MutableRefObject,
    cloneElement,
    ReactNode,
    ReactElement,
    FC
} from 'react';
import mergeProps from './mergeProps';
import { SetOpened, Props, RefObject } from './types';

interface TooltipParentProps {
    innerRef?: MutableRefObject<HTMLElement | null>;
    tooltip: (props?: {
        parentRef?: RefObject;
        tooltipRef?: RefObject;
    }) => [{ [propName: string]: any }, { opened: boolean; setOpened: SetOpened }];
    children?: ReactChildren;
}

const TooltipParent: FC<TooltipParentProps> = ({ innerRef = null, tooltip, children = null, ...rest }) => {
    const ref = useRef<HTMLElement | null>(null);
    const parentRef = innerRef || ref;
    const tooltipRef = useRef<HTMLElement | null>(null);
    const [parentProps, tooltipProps] = tooltip({
        parentRef,
        tooltipRef
    });
    const { opened, ...tooltipRest } = tooltipProps;
    const [parentElement, tooltipElement] = Children.toArray(children) as [
        (parentProps: Props, tooltipProps: Props) => ReactNode | null | undefined,
        ReactElement | null | undefined
    ];

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
