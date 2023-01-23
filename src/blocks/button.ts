
import {
    TopolButtonBlock,
} from "../TopolTemplateTypes";
import { ButtonModule } from "../BeeTemplateTypes";
import { v4 as uuidv4 } from 'uuid';
import { resolveResponsiveCssClass, lineHeightPercentToNumeric } from "../helpers";
import { parse } from 'node-html-parser';


const prepareForTopolSupportedHtml = (html: string): string => {
    const h = parse(html);

    return h.firstChild.childNodes[0].toString().replaceAll("<p", "<div").replaceAll("</p>", "</div>");
}

export const convertButtonBlock = (beeBlock: ButtonModule, COLUMN_WIDTH: number): TopolButtonBlock => {

    prepareForTopolSupportedHtml(beeBlock.descriptor.button.label);

    const getInnerPadding = () => {

        const top = beeBlock.descriptor.button.style["padding-top"]

        const bottom = beeBlock.descriptor.button.style["padding-bottom"];

        return `${top} ${beeBlock.descriptor.button.style["padding-right"]} ${bottom} ${beeBlock.descriptor.button.style["padding-left"]}`;
    }

    return {
        tagName: "mj-button",
        attributes: {
            "align": beeBlock.descriptor.style["text-align"] || "center",
            "background-color": beeBlock.descriptor.button.style['background-color'],
            "color": beeBlock.descriptor.button.style['color'],
            "border-radius": beeBlock.descriptor.button.style['border-radius'],
            "font-size": beeBlock.descriptor.button.style['font-size'],
            "inner-padding": getInnerPadding(), 
            "padding": `${beeBlock.descriptor.style['padding-top']} ${beeBlock.descriptor.style['padding-right']} ${beeBlock.descriptor.style['padding-bottom']} ${beeBlock.descriptor.style['padding-left']}`,
            "href": `${beeBlock.descriptor.button.href}`,
            "line-height": lineHeightPercentToNumeric(beeBlock.descriptor.button.style['line-height']),
            "border": beeBlock.descriptor.button.style['border-top'],
            "font-family": "Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif",
            "containerWidth": COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        content: prepareForTopolSupportedHtml(beeBlock.descriptor.button.label),
        uid: uuidv4()
    }
}