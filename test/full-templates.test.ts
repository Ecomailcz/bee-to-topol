import {expect, test, vi} from "vitest";
import convertor from "../src/convertor";
import template1 from '../src/bee-templates/full-templates/1.json';
import july from '../src/bee-templates/full-templates/4th-of-july-2.json';
import hoursOnly from '../src/bee-templates/full-templates/24-hours-only.json';
import review2020 from '../src/bee-templates/full-templates/2020-in-review.json';
import dadGift from '../src/bee-templates/full-templates/a-gift-daddy-will-love.json';
import momGift from '../src/bee-templates/full-templates/a-gift-for-mom-a-gift-for-you.json';

vi.mock('uuid', () => {
    return {
        v4: () => 'mocked-uuid'
    }
});

test('match snapshot for full template 1', () => {
    // @ts-expect-error
    const converted = convertor(template1);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for 4th of july template', () => {
    // @ts-expect-error
    const converted = convertor(july);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for 24 hours only template', () => {
    // @ts-expect-error
    const converted = convertor(hoursOnly);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for 2020 in review template', () => {
    // @ts-expect-error
    const converted = convertor(review2020);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for "a gift daddy will love" template', () => {
    // @ts-expect-error
    const converted = convertor(dadGift);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for "a gift for mom a gift for you" template', () => {
    // @ts-expect-error
    const converted = convertor(momGift);
    expect(converted.template).toMatchSnapshot();
});

