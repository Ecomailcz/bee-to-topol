import {
    TopolSpacerBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';
import { resolveResponsiveCssClass } from "../helpers";


export const convertSpacerBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolSpacerBlock => {
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
