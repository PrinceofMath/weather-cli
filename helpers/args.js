const getArgs = (args) => {
    const [, , ...rest] = args;
    const res = {};

    rest.forEach((arg, index, array) => {
        if (arg.startsWith("-")) {
            const key = arg.slice(1);
            const value = array[index + 1];
            if (value && !value.startsWith("-")) {
                res[key] = value;
            } else {
                res[key] = true;
            }
        }
    });

    return res;
};

export { getArgs };
