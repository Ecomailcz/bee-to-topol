import {expect, test, vi} from "vitest";
import convertor from "../src/convertor";
import template1 from '../src/bee-templates/full-templates/1.json';

vi.mock('uuid', () => {
    return {
        v4: () => 'mocked-uuid'
    }
});

test('match snapshot for full template 1', () => {
    // @ts-expect-error
    const converted = convertor(template1);

    expect(converted.warnings).toMatchInlineSnapshot(`
      [
        {
          "message": "unknown-module-type",
          "type": "mailup-bee-newsletter-modules-icons",
        },
        {
          "message": "unknown-module-type",
          "type": "mailup-bee-newsletter-modules-menu",
        },
      ]
    `);

    expect(converted.template).toMatchSnapshot();
});

