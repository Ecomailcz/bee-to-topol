

import {
    TopolSocialBlock, TopolSocialElement
} from "../TopolTemplateTypes";
import { Module, BeeSocialIcon} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";

export const convertSocialBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolSocialBlock => {

    //@ts-expect-error
    const icons = beeBlock.descriptor.iconsList.icons as BeeSocialIcon[];

    const socialBlockElements: TopolSocialElement[] = [];

    icons.forEach(icon => {
        socialBlockElements.push(convertSocialBlockElement(icon));
    });

    return {
        tagName: "mj-social",
        attributes: {
            padding: `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            "text-mode": "false",
            // @ts-expect-error social descriptor not typed
            "icon-size": beeBlock.descriptor.computedStyle.iconsDefaultWidth + "px",
            // @ts-expect-error social descriptor not typed
            align: beeBlock.descriptor.computedStyle["text-align"],
            containerWidth: COLUMN_WIDTH,
            // @ts-expect-error social descriptor not typed
            "icon-padding": beeBlock.descriptor.computedStyle.padding.split(" ")[1], //0 12px 0 12px => 12px
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        children: socialBlockElements,
        style: "rounded", //fall back to default rounded style
        uid: uuidv4()
    }
}

const convertSocialBlockElement = (icon: BeeSocialIcon): TopolSocialElement => {
    return {
        tagName: "mj-social-element",
        attributes: {
            "name": icon.name,
            "href": icon.image.href,
            "src": icon.image.src,
            "alt": icon.image.alt,

            "background-color": "transparent"
        }
    }
}