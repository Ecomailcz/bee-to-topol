import { assert, expect, test, vi } from 'vitest'
import buttonTemplate from "./testing-bee-templates/separated-blocks/button.json";
import dividerTemplate from "./testing-bee-templates/separated-blocks/divider.json";
import gifTemplate from "./testing-bee-templates/separated-blocks/gif.json";
import imageTemplate from "./testing-bee-templates/separated-blocks/image.json";
// import textTemplate from "./testing-bee-templates/separated-blocks/text.json";
import videoTemplate from "./testing-bee-templates/separated-blocks/video.json";
import socialTemplate from "./testing-bee-templates/separated-blocks/social.json";
import spacerTemplate from "./testing-bee-templates/separated-blocks/spacer.json";

import convertor from "../src/convertor";
// Edit an assertion and save to see HMR in action

vi.mock('uuid', () => {
  return {
    v4: () => 'mocked-uuid'
  }
});

test('match snapshot for button template', () => {
  // @ts-expect-error
  const converted = convertor(buttonTemplate);
  expect(converted.template).toMatchSnapshot();
});

test('match snapshot for divider template', () => {
  // @ts-expect-error
  const converted = convertor(dividerTemplate);

  expect(converted.template).toMatchSnapshot();
});

test('match snapshot for gif template', () => {
    // @ts-expect-error
    const converted = convertor(gifTemplate);

    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for image template', () => {
    // @ts-expect-error
    const converted = convertor(imageTemplate);

    expect(converted.template).toMatchSnapshot();
});

// test('match snapshot for text template', () => {
//     // @ts-expect-error
//     const converted = convertor(textTemplate);
//
//     expect(converted).toMatchSnapshot();
// });

test('match snapshot for video template', () => {
    // @ts-expect-error
    const converted = convertor(videoTemplate);

    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for social template', () => {
    // @ts-expect-error
    const converted = convertor(socialTemplate);

    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for spacer template', () => {
  // @ts-expect-error
  const converted = convertor(spacerTemplate);

  expect(converted.template).toMatchSnapshot();
});