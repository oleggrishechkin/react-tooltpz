const decorateHandler = (handlerName = '', handlers = {}, func = () => {}) => (...args) => {
    if (handlers[handlerName]) {
        handlers[handlerName](...args);
    }

    return func(...args);
};

export default decorateHandler;
