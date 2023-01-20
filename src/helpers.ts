import {WebFont} from "./BeeTemplateTypes";

export const convertFonts = (beeFonts: WebFont[]): string[] => {
    return beeFonts.map(font => {
        return font.fontFamily;
    });
};

export const stringWithPxToNumeric = (str: string): number => {
    return parseInt(str.replace("px", ""));
}

export const lineHeightPercentToNumeric = (str: string): number => {
    return parseInt(str.replace("%", "")) / 100;
}