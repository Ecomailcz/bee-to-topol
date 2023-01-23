
import {
    TopolButtonBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";

export const convertButtonBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolButtonBlock => {

    return {
        tagName: "mj-button",
        attributes: {
            "align": beeBlock.descriptor.style["text-align"] || "center",
            // @ts-expect-error button descriptor not typed
            "background-color": beeBlock.descriptor.button.style['background-color'],
            // @ts-expect-error button descriptor not typed
            "color": beeBlock.descriptor.button.style['color'],
            // @ts-expect-error button descriptor not typed
            "border-radius": beeBlock.descriptor.button.style['border-radius'],
            // @ts-expect-error button descriptor not typed
            "font-size": beeBlock.descriptor.button.style['font-size'],
            "padding": `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error button descriptor not typed
            "inner-padding": `${beeBlock.descriptor.button.style['padding-top']} ${beeBlock.descriptor.button.style['padding-right']} ${beeBlock.descriptor.button.style['padding-bottom']} ${beeBlock.descriptor.button.style['padding-left']}`,
            // @ts-expect-error button descriptor not typed
            "href": `${beeBlock.descriptor.button.href}`,
            // @ts-expect-error button descriptor not typed
            "border": beeBlock.descriptor.button.style['border-top'],
            "font-family": "Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif",
            "containerWidth": COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        // @ts-expect-error button descriptor not typed
        content: beeBlock.descriptor.button.label,
        uid: uuidv4()
    }
}