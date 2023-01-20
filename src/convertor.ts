import {TopolBlock, TopolColumn, TopolSection, TopolTemplate} from "./TopolTemplateTypes";
import {BeeTemplate, Row, Column, WebFont, Module} from "./BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import {convertBlock} from "./blockConvertor";
import {stringWithPxToNumeric, convertFonts} from "./helpers";

type ConvertorWarningMessage = {
    message: "unknown-module-type";
    type: string;
}

type Transformer = {
    key: string;
    convert: (block: Module, columnWidth: number, uuid: string) => TopolBlock;
}

type convertorOptions = {
    convertors?: Transformer[];
}

const warnings: ConvertorWarningMessage[] = []

export default (beeTemplate: BeeTemplate, options?: convertorOptions) => {

    const TEMPLATE_WIDTH = stringWithPxToNumeric(beeTemplate.page.body.content.computedStyle.messageWidth)

    const convertColumn = (column: Column, columnWidth: number, columnWidthPercentage: string): TopolColumn => {

        const blocks: TopolBlock[] = [];

        column.modules.forEach(module => {

            const { block, notConvertedBlock} = convertBlock(module, columnWidth);

            if (notConvertedBlock !== undefined) {
                if(options !== undefined && options.convertors !== undefined) {
                    options.convertors.forEach(convertor => {
                        if(module.type === convertor.key) {
                            const transformedBlock = convertor.convert(notConvertedBlock, columnWidth, uuidv4());
                            blocks.push(transformedBlock);
                        }
                    })
                } else {
                    warnings.push({
                        message: "unknown-module-type",
                        type: module.type
                    })
                }

                return;
            }

            if(block !== undefined) {
                blocks.push(block);
            }
        });
        
        function getPadding() {
            let leftPadding = '0px';
            let rightPadding = '0px';
            let topPadding = '0px';
            let bottomPadding = '0px';

            if(column.style["padding-bottom"]) {
                bottomPadding = column.style["padding-bottom"];
            }
            if(column.style["padding-left"]) {
                leftPadding = column.style["padding-left"];
            }
            if(column.style["padding-right"]) {
                rightPadding = column.style["padding-right"];
            }
            if(column.style["padding-top"]) {
                topPadding = column.style["padding-top"];
            }

            return `${topPadding} ${rightPadding} ${bottomPadding} ${leftPadding}`;
        }

        return {
            tagName: "mj-column",
            attributes: {
                width: columnWidthPercentage,
                "vertical-align": "top",
                "background-color": column.style["background-color"],
                "border-bottom": column.style["border-bottom"],
                "border-top": column.style["border-top"],
                "border-left": column.style["border-left"],
                "border-right": column.style["border-right"],
                "padding": getPadding(),
            },
            children: blocks,
            uid: uuidv4()
        }
    }

    const convertSection = (row: Row): TopolSection => {
        const columns: TopolColumn[] = [];

        if (row.columns.length === 0) {
            throw new Error("Row must have at least one column, invalid template syntax.");
        }

        const columnWidth = TEMPLATE_WIDTH / row.columns.length;

        const columnWidthPercentage = 100 / row.columns.length + "%";

        row.columns.forEach(column => {
            columns.push(convertColumn(column, columnWidth, columnWidthPercentage));
        });

        const getCssClass = () => {
            if (!row.content.computedStyle) {
                return undefined;
            }

            if (row.content.computedStyle.hideContentOnDesktop) {
                return "hide_section_on_desktop";
            }
            if (row.content.computedStyle.hideContentOnMobile) {
                return "hide_section_on_mobile";
            }  

            return undefined;
        }

        const getBackgroundUrl = () => {

            if(row.content.style["background-image"]){
                const rowStyleBgImage = row.content.style["background-image"]
                .replace("url('", "")
                .replace("')", "");

                if (rowStyleBgImage !== "none") {
                    return rowStyleBgImage;
                }   
            }

            if(!row.container.style["background-image"]){
                return 'none';
            }

            return row.container.style["background-image"]
                .replace("url('", "")
                .replace("')", "");

        }

        const getBackgroundColor = () => {
            const rowStyleBgColor = row.content.style["background-color"];

            if (rowStyleBgColor !== "transparent") {
                return rowStyleBgColor;
            }

            return row.container.style["background-color"];
        }

        return {
            tagName: "mj-section",
            attributes: {
                "full-width": false,
                "background-color": getBackgroundColor(),
                //this will be always 0px, padding is set only on columns
                padding: "0px 0px 0px 0px", 
                "css-class": getCssClass(),
                "background-url": getBackgroundUrl(),
                // "background-position": row.content.style["background-position"], //TBD
                "background-size": row.content.style["background-size"],
                "background-repeat": row.content.style["background-repeat"],
                "in-group": row.content.computedStyle && !row.content.computedStyle.rowColStackOnMobile
            },
            children: columns,
            layout: 1,
            backgroundColor: null,
            backgroundImage: null,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            uid: uuidv4(),
        }
    }

    const convertSections = (rows: Row[]) => {
        const sections: TopolSection[] = [];

        rows.forEach(row => {
            sections.push(convertSection(row));
        })

        return sections;
    }


    const getBgColor = () => {
        if (beeTemplate.page.body.content.computedStyle.messageBackgroundColor !== "transparent") {
            return beeTemplate.page.body.content.computedStyle.messageBackgroundColor;
        }

        if (beeTemplate.page.body.container.style["background-color"]) {
            return beeTemplate.page.body.container.style["background-color"];
        }

        return "transparent";
    }

    const topolTemplate: TopolTemplate = {
        tagName: "mj-global-style",
        attributes: {
            "h1:color": "#000",
            "h1:font-family": "Helvetica, sans-serif",
            "h2:color": "#000",
            "h2:font-family": "Ubuntu, Helvetica, Arial, sans-serif",
            "h3:color": "#000",
            "h3:font-family": "Ubuntu, Helvetica, Arial, sans-serif",
            ":color": beeTemplate.page.body.content.style.color,
            ":font-family": beeTemplate.page.body.content.style["font-family"],
            ":line-height": "1.5",
            "a:color": beeTemplate.page.body.content.computedStyle.linkColor,
            "button:background-color": "#e85034",
            "containerWidth": TEMPLATE_WIDTH,
            "fonts": beeTemplate.page.body.content.style["font-family"],
            "mj-text": {
                "line-height": 1.5,
                "font-size": 15
            },
            "mj-button": [],
        },
        children: [
            {
                tagName: "mj-body",
                attributes: {
                    "background-color": getBgColor(),
                    "containerWidth": stringWithPxToNumeric(beeTemplate.page.body.content.computedStyle.messageWidth)
                },
                children: convertSections(beeTemplate.page.rows),
            }
        ],

        "style": {
            "h1": {
                "font-family": "\"Cabin\", sans-serif",
                "font-size": "22px"
            },
            "h2": {
                "font-size": "17px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "h3": {
                "font-size": "13px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "p": {
                "font-size": "11px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "ul": {
                "font-size": "11px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "li": {
                "font-size": "11px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "ol": {
                "font-size": "11px",
                "font-family": "Ubuntu, Helvetica, Arial"
            },
            "a": {
                "color": beeTemplate.page.body.content.computedStyle.linkColor
            }
        },
        fonts: convertFonts(beeTemplate.page.body.webFonts),
    }

    return {
        template: topolTemplate,
        warnings: warnings,
    }
}