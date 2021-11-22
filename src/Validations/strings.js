export const hasMinChars = (str, min) => {
    return str.length >= min;
}

export const hasMinMaxChars = (str, min, max) => {
    return str.length >= min && str.length <= max;
}

export const isNotEmpty = (str) => {
    return str && str.length !== 0;
}

