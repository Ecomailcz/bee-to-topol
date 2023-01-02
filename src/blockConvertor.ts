import {
    TopolBlock,
    TopolButtonBlock,
    TopolDividerBlock, TopolGifBlock,
    TopolImageBlock, TopolRawBlock, TopolSocialBlock, TopolSocialElement, TopolSpacerBlock,
    TopolTextBlock,
    TopolVideoBlock
} from "./TopolTemplateTypes";
import {BeeSocialIcon, Module} from "./BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';

let COLUMN_WIDTH = 600;

export const convertBlock = (beeBlock: Module, columnWidth: number): { block: TopolBlock, notConvertedBlock: Module } => {

    COLUMN_WIDTH = columnWidth;

    let block: TopolBlock;
    let notConvertedBlock: Module;

    switch (beeBlock.type) {
        case 'mailup-bee-newsletter-modules-text':
            block = convertTextBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-heading':
            block = convertTextBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-button':
            block = convertButtonBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-video':
            block = convertVideoBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-divider':
            block = convertDividerBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-image':
            block = convertImageBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-spacer':
            block = convertSpacerBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-html':
            block = convertHtmlBlock(beeBlock);
            break;
        case 'mailup-bee-newsletter-modules-social':
            block = convertSocialBlock(beeBlock);
            break;
        // gif is represented as image addon
        case 'mailup-bee-newsletter-modules-addon':
            // @ts-ignore
            if (beeBlock.contentType === "image") {
                block = convertGifBlock(beeBlock);
            }
            break;
        default:
            notConvertedBlock = beeBlock;
            break;

    }

    return {
        //@ts-ignore
        block: block,
        //@ts-ignore
        notConvertedBlock: notConvertedBlock
    }
}

type responsiveClass = "hide_on_desktop" | "hide_on_mobile" | undefined;

const resolveResponsiveCssClass = (beeBlock: Module): responsiveClass => {
    if (beeBlock.descriptor.computedStyle.hideContentOnDesktop) {
        return "hide_on_desktop";
    }
    if (beeBlock.descriptor.computedStyle.hideContentOnMobile) {
        return "hide_on_mobile";
    }
    return undefined;
}

const convertTextBlock = (beeBlock: Module): TopolTextBlock => {
    return {
        tagName: "mj-text",
        attributes: {
            align: "left",
            padding: `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-ignore missing proper Text Types...
            "line-height": beeBlock.descriptor.text.style['line-height'] || 1,
            containerWidth: COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock),
        },
        // @ts-ignore missing proper Text Types...
        content: `<div style="color:${beeBlock.descriptor.text.style.color};">${beeBlock.descriptor.text.html}</div>` || "",
        uid: uuidv4()
    }
}

const convertButtonBlock = (beeBlock: Module): TopolButtonBlock => {
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

const convertDividerBlock = (beeBlock: Module): TopolDividerBlock => {
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

const convertVideoBlock = (beeBlock: Module): TopolVideoBlock => {
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

const convertImageBlock = (beeBlock: Module): TopolImageBlock => {

    // @ts-expect-error image descriptor not typed
    const classesArray = beeBlock.descriptor.computedStyle.class.split(" ");

    let fluidOnMobile: "true" | "false" = "false";

    if (classesArray.includes("fullwidthOnMobile")) {
        fluidOnMobile = "true";
    }

    return {
        tagName: "mj-image",
        attributes: {
            // @ts-expect-error image descriptor not typed
            "src": beeBlock.descriptor.image.src,
            // @ts-expect-error image descriptor not typed
            "alt": beeBlock.descriptor.image.alt,
            // @ts-expect-error image descriptor not typed
            "href": beeBlock.descriptor.image.href,
            "padding": `${beeBlock.descriptor.style["padding-top"]} ${beeBlock.descriptor.style["padding-right"]} ${beeBlock.descriptor.style["padding-bottom"]} ${beeBlock.descriptor.style["padding-left"]}`,
            // @ts-expect-error image descriptor not typed
            "width": beeBlock.descriptor.computedStyle.width,
            "fluid-on-mobile": fluidOnMobile,
            "containerWidth": COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        uid: uuidv4()
    }
}

const convertGifBlock = (beeBlock: Module): TopolGifBlock => {
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

const convertSpacerBlock = (beeBlock: Module): TopolSpacerBlock => {
    return {
        tagName: "mj-spacer",
        attributes: {
            // @ts-expect-error spacer descriptor not typed
            "height": beeBlock.descriptor.spacer.style.height,
            containerWidth: COLUMN_WIDTH,
            "css-class": resolveResponsiveCssClass(beeBlock)
        },
        uid: uuidv4()
    }
}

const convertHtmlBlock = (beeBlock: Module): TopolRawBlock => {
    return {
        tagName: "mj-raw",
        "attributes": {
            "containerWidth": COLUMN_WIDTH
        },
        // @ts-expect-error html descriptor not typed
        content: beeBlock.descriptor.html.html,
        uid: uuidv4()
    }
}

const convertSocialBlock = (beeBlock: Module): TopolSocialBlock => {

    //@ts-ignore
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