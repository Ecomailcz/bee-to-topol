import {
    TopolDividerBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";

export const convertDividerBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolDividerBlock => {
    return {
        tagName: "mj-divider",
        attributes: {
            // @ts-expect-error divider descriptor not typed
            "border-color": beeBlock.descriptor.divider.style['border-top'].split(" ")[2],
            // @ts-expect-error divider descriptor not typed
            "border-style": beeBlock.descriptor.divider.style['border-top'].split(" ")[1],
            // @ts-expect-error divider descriptor not typed
            "border-width": beeBlock.descriptor.divider.style['border-top'].split(" ")[0],

            //maybe not needed?
            "padding-top": beeBlock.descriptor.style["padding-top"],
            "padding-right": beeBlock.descriptor.style["padding-right"],

            "containerWidth": COLUMN_WIDTH,

            "padding": `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        uid: uuidv4()
    }
}