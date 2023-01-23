import {
    TopolBlock,
     TopolGifBlock,
    TopolImageBlock, TopolRawBlock, TopolSocialBlock, TopolSocialElement, TopolSpacerBlock,
} from "./TopolTemplateTypes";
import {BeeSocialIcon, Module} from "./BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';

import { convertButtonBlock } from './blocks/button';
import { convertTextBlock, convertHeadingBlock, convertParagraphBlock } from "./blocks/text";
import { convertDividerBlock } from "./blocks/divider";
import { convertVideoBlock } from "./blocks/video";
import { convertImageBlock } from "./blocks/image";
import { convertGifBlock} from "./blocks/gif";
import { convertSpacerBlock } from "./blocks/spacer";
import { convertHtmlBlock } from "./blocks/html";
import { convertSocialBlock } from "./blocks/social";

let COLUMN_WIDTH = 600;

export const convertBlock = (beeBlock: Module, columnWidth: number): { block: TopolBlock, notConvertedBlock: Module } => {

    COLUMN_WIDTH = columnWidth;

    let block: TopolBlock;
    let notConvertedBlock: Module;

    switch (beeBlock.type) {
        case 'mailup-bee-newsletter-modules-text':
            block = convertTextBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-heading':
            block = convertHeadingBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-paragraph':
            block = convertParagraphBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-button':
            block = convertButtonBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-video':
            block = convertVideoBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-divider':
            block = convertDividerBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-image':
            block = convertImageBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-spacer':
            block = convertSpacerBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-html':
            block = convertHtmlBlock(beeBlock, COLUMN_WIDTH);
            break;
        case 'mailup-bee-newsletter-modules-social':
            block = convertSocialBlock(beeBlock, COLUMN_WIDTH);
            break;
        // gif is represented as image addon
        case 'mailup-bee-newsletter-modules-addon':
            // @ts-expect-error
            if (beeBlock.contentType === "image") {
                block = convertGifBlock(beeBlock, COLUMN_WIDTH);
            }
            break;
        default:
            notConvertedBlock = beeBlock;
            break;
    }

    return {
        //@ts-expect-error
        block: block,
        //@ts-expect-error
        notConvertedBlock: notConvertedBlock
    }
}
