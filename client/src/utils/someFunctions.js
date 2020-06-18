export const flb = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const capitalize = str => {
    return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()});
}