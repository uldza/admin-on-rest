export default children => (data = {}, defaultValue = {}) => {
    const defaultValueFromChildren = children
        .map(child => ({ source: child.props.source, defaultValue: child.props.defaultValue }))
        .reduce((prev, next) => {
            if (next.defaultValue != null) {
                prev[next.source] = next.defaultValue; // eslint-disable-line no-param-reassign
            }
            return prev;
        }, {});
    return { ...defaultValue, ...defaultValueFromChildren, ...data };
};
