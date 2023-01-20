import { lineHeightPercentToNumeric} from "../src/helpers";
import {expect, test} from "vitest";

test("stringWithPxToNumeric", () => {
   const a = lineHeightPercentToNumeric("200%");
   expect(a).toBe(2);


   const b = lineHeightPercentToNumeric("120%");
   expect(b).toBe(1.2);
});
