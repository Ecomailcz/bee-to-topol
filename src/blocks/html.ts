
import {
    TopolRawBlock,
} from "../TopolTemplateTypes";
import { Module} from "../BeeTemplateTypes";
import {v4 as uuidv4} from 'uuid';

export const convertHtmlBlock = (beeBlock: Module, COLUMN_WIDTH: number): TopolRawBlock => {
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