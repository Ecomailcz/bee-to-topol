import {
    TopolVideoBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";

export const convertVideoBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolVideoBlock => {
    return {
        tagName: "mj-image",
        isVideo: true,
        attributes: {
            // @ts-expect-error video descriptor not typed
            "src": beeBlock.descriptor.video.thumbSrc,
            // @ts-expect-error video descriptor not typed
            "alt": beeBlock.descriptor.video.thumbAlt,
            "padding": `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error video descriptor not typed
            "width": beeBlock.descriptor.video.width,
            // @ts-expect-error video descriptor not typed
            "href": beeBlock.descriptor.video.src,
            "containerWidth": COLUMN_WIDTH,
            // @ts-expect-error video descriptor not typed
            "videoSrc": beeBlock.descriptor.video.src,
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        uid: uuidv4()
    }
}