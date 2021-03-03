import { Props, AnyFunction } from './types';

interface MergeProps {
    (propsArray: Array<Props>): Props;
}

interface Handlers {
    [propName: string]: Array<AnyFunction>;
}

const mergeProps: MergeProps = (propsArray = []) => {
    const result: Props = {};
    const handlers: Handlers = {};

    propsArray.forEach((props) => {
        const propNames = Object.keys(props || {});

        propNames.forEach((propName) => {
            if (propName.startsWith('on')) {
                if (!props[propName]) {
                    return;
                }

                if (handlers[propName]) {
                    handlers[propName].push(props[propName]);

                    return;
                }

                handlers[propName] = [props[propName]];

                return;
            }

            result[propName] = props[propName];
        });
    });

    Object.keys(handlers).forEach((handlerName) => {
        const handler: AnyFunction = (...args) => {
            handlers[handlerName].forEach((handler) => {
                handler(...args);
            });
        };

        result[handlerName] = handler;
    });

    return result;
};

export default mergeProps;
