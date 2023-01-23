import {
    TopolTextBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass, lineHeightPercentToNumeric } from "../helpers";

export const convertTextBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolTextBlock => {
    return {
        tagName: "mj-text",
        attributes: {
            align: "left",
            padding: `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error missing proper Text Types...
            "line-height": lineHeightPercentToNumeric(beeBlock.descriptor.text.style['line-height']) || 1,
            containerWidth: COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        // @ts-expect-error missing proper Text Types...
        content: `<div style="color:${beeBlock.descriptor.text.style.color};">${beeBlock.descriptor.text.html}</div>` || "",
        uid: uuidv4()
    }
}

export const convertHeadingBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolTextBlock => {


    function composeStyles() {

        let styles = '';

        //@ts-expect-error
        if(beeBlock.descriptor.heading.style.color) {
            //@ts-expect-error
            styles += `color:${beeBlock.descriptor.heading.style.color};`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.heading.style['font-size']) {
            //@ts-expect-error
            styles += `font-size:${beeBlock.descriptor.heading.style['font-size']};`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.heading.style['font-family']) {
            //@ts-expect-error
            styles += `font-family:${beeBlock.descriptor.heading.style['font-family']};`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.heading.style['font-weight']) {
            //@ts-expect-error
            styles += `font-weight:${beeBlock.descriptor.heading.style['font-weight']};`;
        }


        //@ts-expect-error
        if(beeBlock.descriptor.heading.style['text-align']) {
            //@ts-expect-error
            styles += `text-align:${beeBlock.descriptor.heading.style['text-align']};`;
        }
        
       return styles;    
    }


    function createContent() {
        //@ts-expect-error
        if(beeBlock.descriptor.heading.text) {
            //@ts-expect-error
            return `<p><span style="${composeStyles()}">${beeBlock.descriptor.heading.text }</span></p>`
        }
    
        return ""
    }

    return {
        tagName: "mj-text",
        attributes: {
            align: "left",
            padding: `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error missing proper Text Types...
            "line-height": lineHeightPercentToNumeric(beeBlock.descriptor.heading.style['line-height']) || 1,
            containerWidth: COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        content: createContent(),
        uid: uuidv4()
    }
}

export const convertParagraphBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolTextBlock => {


    function composeStyles() {

        let styles = '';

        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.style.color) {
            //@ts-expect-error
            styles += `color:${beeBlock.descriptor.paragraph.style.color};`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.style['font-size']) {
            //@ts-expect-error
            styles += `font-size:${beeBlock.descriptor.paragraph.style['font-size']};`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.style['font-family']) {
            //@ts-expect-error
            styles += `font-family:"${beeBlock.descriptor.paragraph.style['font-family']}";`;
        }

        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.style['font-weight']) {
            //@ts-expect-error
            styles += `font-weight:${beeBlock.descriptor.paragraph.style['font-weight']};`;
        }


        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.style['text-align']) {
            //@ts-expect-error
            styles += `text-align:${beeBlock.descriptor.paragraph.style['text-align']};`;
        }

       return styles;    
    }

    function createContent() {
        //@ts-expect-error
        if(beeBlock.descriptor.paragraph.html) {
            //@ts-expect-error
            const replacedParagraphTag = beeBlock.descriptor.paragraph.html.replace(/<p>/g, "<span>").replace(/<\/p>/g, "</span>");            
            return `<p><span style="${composeStyles()}">${replacedParagraphTag}</span></p>` || ""
        }

        return "";
    }

    return {
        tagName: "mj-text",
        attributes: {
            align: "left",
            padding: `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error missing proper Text Types...
            "line-height": lineHeightPercentToNumeric(beeBlock.descriptor.paragraph.style['line-height']) || 1,
            containerWidth: COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        content: createContent(),
        uid: uuidv4()
    }
}