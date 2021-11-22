export const hasMinChars = (str, min) => {
    return str.length >= min;
}

export const hasMinMaxChars = (str, min, max) => {
    return str.length >= min && str.length <= max;
}



