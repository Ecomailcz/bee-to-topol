import {WebFont, Module} from "./BeeTemplateTypes";

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


type responsiveClass = "hide_on_desktop" | "hide_on_mobile" | undefined;

export const resolveResponsiveCssClass = (beeBlock: Module): responsiveClass => {
    if(!beeBlock.descriptor.computedStyle){
        return undefined;
    }

    if (beeBlock.descriptor.computedStyle.hideContentOnDesktop) {
        return "hide_on_desktop";
    }
    if (beeBlock.descriptor.computedStyle.hideContentOnMobile) {
        return "hide_on_mobile";
    }
    return undefined;
}
