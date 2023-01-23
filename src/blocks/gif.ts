
import {
    TopolGifBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";

export const convertGifBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolGifBlock => {
    return {
        tagName: "mj-gif",
        attributes: {
            // @ts-expect-error image descriptor not typed
            "src": beeBlock.descriptor.image.src,
            // @ts-expect-error image descriptor not typed
            "alt": beeBlock.descriptor.image.alt,
            // @ts-expect-error image descriptor not typed
            "href": beeBlock.descriptor.image.href,
            "padding": `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error image descriptor not typed
            "width": beeBlock.descriptor.image.width,
            "containerWidth": COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        uid: uuidv4()
    }
}