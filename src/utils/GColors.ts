export enum GColors {
    PRIMARY_FONT = "var(--col-font)",
    SECONDARY_FONT = "var(--col-secondary-font)",
    PRIMARY_COLOR = "var(--col-primary)",
    SECONDARY_COLOR = "var(--col-secondary)",
    TERTIARY_COLOR = "var(--col-tertiary)",
    QUATERNARY_COLOR = "var(--col-quaternary)",
    DANGER_COLOR = "var(--col-danger)",
    WHITE_COLOR = "var(--col-white)",
    FOOTER_FONT_COLOR = "var(--col-footer-font)",
    LIGHTGRAY_COLOR = "var(--col-lightgray)",
    DARKGRAY_COLOR = "var(--col-darkgray)",
}

export function variableNameOf(color: GColors) {
    return color.slice(4, color.length - 1)
}

export function isDark(variable: string, hasVarAhead: boolean) {
    // If variable hasVarAhead should be like this var(--col-primary), otherwise should be --col-primary
    if (typeof document === "undefined") {
        return true;
    }
    const variableName = hasVarAhead ? variableNameOf(variable as GColors) : variable;

    let color:any = getComputedStyle(document.documentElement)
        .getPropertyValue(variableName);

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    return (hsp < 127.5) && hsp !== 0
}