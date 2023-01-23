export interface Container {
    style: {
        "background-color": string;
        "background-image": string;
        "background-position": string;
        "background-repeat": string;
        "background-size": string;
    };
}

export interface ComputedStyle {
    align: string;
    linkColor: string;
    messageBackgroundColor: string;
    messageWidth: string;
}

export interface Content {
    computedStyle: ComputedStyle;
    style: {
        color: string;
        "font-family": string;
    };
}

export interface WebFont {
    fontFamily: string;
    name: string;
    url: string;
    family?: string;
    fontName?: string;
}

export interface Body {
    container: Container;
    content: Content;
    type: string;
    webFonts: WebFont[];
}

export interface IconSpacing {
    "padding-bottom": string;
    "padding-left": string;
    "padding-right": string;
    "padding-top": string;
}

export interface Icon {
    alt: string;
    height: string;
    href: string;
    image: string;
    target: string;
    text: string;
    textPosition: string;
    title: string;
    width: string;
}

export interface IconsList {
    icons: Icon[];
}

export interface Descriptor {
    computedStyle: {
        hideContentOnDesktop: boolean;
        hideContentOnMobile: boolean;
        iconHeight: string;
        iconSpacing: IconSpacing;
        itemSpacing: string;
        itemsSpacing: string;
    };
    iconsList: IconsList;
    style: {
        color: string;
        "font-family": string;
        "font-size": string;
        "padding-bottom": string;
        "padding-left": string;
        "padding-right": string;
        "padding-top": string;
        "text-align": string;
    };
}

export interface Module {
    descriptor: Descriptor;
    locked: boolean;
    type: string;
    uuid: string;
}

export interface ButtonModule extends Module {
    type: "mailup-bee-newsletter-modules-button",
    descriptor: Descriptor & {
        button: {
            "href": string;
            "label": string;
            "style": {
                "background-color": string;
                "border-bottom": string;
                "border-left": string;
                "border-radius": string;
                "border-right": string;
                "border-top": string;
                "color": string;
                "direction": string;
                "font-family": string;
                "font-size": string;
                "line-height": string;
                "max-width": string;
                "padding-bottom": string;
                "padding-left": string;
                "padding-right": string;
                "padding-top": string;
                "width": string;
                "font-weight": string;
            };
        }
    }
}


export interface Column {
    "grid-columns": number;
    modules: Module[];
    style: {
        "background-color": string;
        "border-bottom": string;
        "border-left": string;
        "border-right": string;
        "border-top": string;
        "padding-bottom": string;
        "padding-left": string;
        "padding-right": string;
        "padding-top": string;
    };
    uuid: string;
}

export interface Row {
    columns: Column[];
    container: {
        style: {
            "background-color": string;
            "background-image": string;
            "background-position": string;
            "background-repeat": string;
        };
    };
    content: {
        computedStyle: {
            hideContentOnDesktop: boolean;
            hideContentOnMobile: boolean;
            rowColStackOnMobile: boolean;
        };
        style: {
            "background-size"?: string;
            "background-color": string;
            "background-image": string;
            "background-position": string;
            "background-repeat": string;
            color: string;
            width: string;
        };
    };
    locked: boolean;
    type: string;
    uuid: string;
}

export interface Template {
    name: string;
    type: string;
    version: string;
}

export interface Page {
    body: Body;
    description: string;
    rows: Row[];
    template: Template;
    title: string;
}

export interface BeeTemplate {
    page: Page;
}


export interface BeeSocialIcon {
    id: string;
    name: string;
    text: string;
    type: "follow" | "custom";
    image: {
        alt: string;
        src: string;
        href: string;
        prefix: string;
        title: string;
    }
}

