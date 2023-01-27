export type TopolSection = {
    tagName: "mj-section",
    attributes: {
        "full-width": boolean,
        "padding": string,
        "background-color"?: string,
        "border-top"?: string,
        "border-right"?: string,
        "border-left"?: string,
        "border-bottom"?: string,
        "in-group"?: boolean, //do not stack on mobile
        "background-url"?: string,
        "background-size"?: string,
        "background-repeat"?: string,
        "css-class"?: "hide_section_on_desktop" | "hide_section_on_mobile",
    },
    children: TopolColumn[],
    layout: number,
    backgroundColor?: null | string,
    backgroundImage?: null | string,
    paddingTop: number | string,
    paddingBottom: number | string,
    paddingLeft: number | string,
    paddingRight: number | string,
    uid: string
}
export type TopolColumn = {
    tagName: "mj-column",
    attributes: {
        "width": string,
        "vertical-align": "top",
        "border-right"?: string;
        "border-top"?: string;
        "border-left"?: string;
        "border-bottom"?: string;
        "background-color"?: string;
        "border-radius"?: string
        "padding"?: string;
    },

    children: TopolBlock[],
    uid: string
}

export interface TopolBlock {
    tagName: string,
    uid: string
}

export interface TopolTextBlock extends TopolBlock {
    tagName: "mj-text",
    attributes: {
        align: "left" | "center" | "right",
        padding: string,
        "line-height": number,
        containerWidth: number,
        "css-class"?: "hide_on_mobile" | "hide_on_desktop",
    },
    content: string;
}

export interface TopolImageBlock extends TopolBlock {
    tagName: "mj-image",
    attributes: {
        "src": string;
        "padding": string;
        "fluid-on-mobile": "true" | "false"; //not boolean because of MJML
        "alt": string;
        "href": string;
        "containerWidth": number,
        "title"?: string;
        "align"?: string;
        "width"?: number,
        "css-class"?: "hide_on_mobile" | "hide_on_desktop",
    },
}

export interface TopolButtonBlock extends TopolBlock {
    tagName: "mj-button",
    attributes: {
        "align": string;
        "background-color": string;
        "color": string;
        "border-radius": string;
        "font-size": string;
        "padding": string;
        "inner-padding": string;
        "href": string;
        "font-family": string;
        "containerWidth": number;
        "width"?: number;
        "border"?: string;
        "line-height"?: number;
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
    },
    content: string;
}

export interface TopolGifBlock extends TopolBlock {
    tagName: "mj-gif";
    "attributes": {
        "src": string;
        "padding": string;
        "alt": string;
        "href": string;
        "containerWidth": number;
        "align"?: string;
        "width"?: number;
        "widthPercent"?: number,
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
    };
}

export interface TopolDividerBlock extends TopolBlock {
    tagName: "mj-divider";
    "attributes": {
        "border-color": string;
        "border-style": string;
        "border-width": string;
        "padding-top": string;
        "padding-right": string;
        "containerWidth": number;
        "padding": string;
        "container-background-color"?: string;
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
        "padding-bottom"?: "20px"; //questionable TBD
        "padding-left"?: "25px"; //questionable TBD
    },
}

export interface TopolSpacerBlock extends TopolBlock {
    tagName: "mj-spacer";
    "attributes": {
        "height": string;
        "containerWidth": number;
        "container-background-color"?: string;
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
    }
}

export interface TopolRawBlock extends TopolBlock {
    tagName: "mj-raw";
    "attributes": {
        "containerWidth": number;
    };
    content: string;
}

export interface TopolVideoBlock extends TopolBlock {
    tagName: "mj-image";
    isVideo: true;
    attributes: {
        "src": string;
        "alt": string;
        "padding": string;
        "width": string;
        "href": string;
        "containerWidth": number;
        "videoSrc"?: string;
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
    };
}

export interface TopolSocialBlock extends TopolBlock {
    tagName: "mj-social";
    attributes: {
        padding: string;
        "text-mode": "false";
        "icon-size": string;
        align: string;
        containerWidth: number;
        "icon-padding"?: string;
        "css-class"?: "hide_on_mobile" | "hide_on_desktop";
    },
    children: TopolSocialElement[];
    style?: string; //e. g. ikony-black/roundedblack, this should probably fall back to default social icons
}

export interface TopolSocialElement {
    tagName: "mj-social-element";
    attributes: {
        "src": string;
        "name": string;
        "alt": string;
        "href": string;
        "background-color": string
    }
}

export type TopolTemplate = {
    tagName: "mj-global-style",
    attributes: {
        "h1:color": string,
        "h1:font-family": string
        "h2:color": string,
        "h2:font-family": string,
        "h3:color": string,
        "h3:font-family": string,
        ":color": string,
        ":font-family": string,
        ":line-height": string,
        "a:color": string,
        "button:background-color": string,
        "containerWidth": number,
        "fonts": string,
        "mj-text": {
            "line-height": number;
            "font-size": number;
            "font-family"?: string;
        },
        "mj-button": {
            "font-family"?: string;
            "background-color"?: string;
            "color"?: string;
        }
    },
    children: [
        {
            tagName: "mj-body",
            attributes: {
                "background-color": string,
                containerWidth: number
            },
            children: TopolSection[]
        }
    ],
    "style": {
        "h1": {
            "font-family": string,
            "font-size": string
        },
        "h2": {
            "font-size": string,
            "font-family": string
        },
        "h3": {
            "font-size": string,
            "font-family": string
        },
        "p": {
            "font-size": string,
            "font-family": string
        },
        "ul": {
            "font-size": string,
            "font-family": string
        },
        "li": {
            "font-size": string,
            "font-family": string
        },
        "ol": {
            "font-size": string,
            "font-family": string
        },
        "a": {
            "color": string
        }
    },
    "fonts": string[]
}
