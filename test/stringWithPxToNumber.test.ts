import {stringWithPxToNumeric} from "../src/helpers";
import {expect, test} from "vitest";

test("stringWithPxToNumeric", () => {
   const expectedNumber = stringWithPxToNumeric("10px");
   expect(expectedNumber).toBe(10);
});
