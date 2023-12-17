export const unsafeShallowEqual = <Type extends Record<string, any>>(source?: Type | null, target?: Type | null) => {
    if (!source || !target) {
        return false;
    }

    for (const key in source) {
        if (source[key] !== target[key]) {
            return false;
        }
    }

    return true;
};
