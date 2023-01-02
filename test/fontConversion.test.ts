
import { convertFonts} from "../src/helpers";
import {expect, test} from "vitest";
import {WebFont} from "../src/BeeTemplateTypes";

test("font conversion", () => {

    const webFonts: WebFont[] = [
        {
            "name": "Cabin",
            "fontFamily": "'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif",
            "url": "https://fonts.googleapis.com/css?family=Cabin"
        },
        {
            "name": "Roboto",
            "fontFamily": "'Roboto', Tahoma, Verdana, Segoe, sans-serif",
            "url": "https://fonts.googleapis.com/css?family=Roboto"
        },
        {
            "name": "Montserrat",
            "fontFamily": "'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif",
            "url": "https://fonts.googleapis.com/css?family=Montserrat"
        }
    ];

    const convertedFonts = convertFonts(webFonts);
    expect(convertedFonts).toMatchInlineSnapshot(`
      [
        "'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif",
        "'Roboto', Tahoma, Verdana, Segoe, sans-serif",
        "'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif",
      ]
    `);
});


