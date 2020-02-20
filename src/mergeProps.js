export default (propsArray = []) => {
    const result = {};
    const handlers = {};

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
        result[handlerName] = (...args) => {
            handlers[handlerName].forEach((handler) => {
                handler(...args);
            });
        };
    });

    return result;
};
