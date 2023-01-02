import {expect, test, vi} from "vitest";
import convertor from "../src/convertor";
import simpleTemplate1 from '../src/bee-templates/simple-templates/simple-template.json';
import simpleTemplateWithButton from '../src/bee-templates/simple-templates/simple-template-with-button.json';
import simpleTemplateWithTwoButtons from '../src/bee-templates/simple-templates/simple-template-with-two-buttons.json';

vi.mock('uuid', () => {
    return {
        v4: () => 'mocked-uuid'
    }
});

test('match snapshot for simple template 1', () => {
    const converted = convertor(simpleTemplate1);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for simple template with button', () => {
    // @ts-expect-error
    const converted = convertor(simpleTemplateWithButton);
    expect(converted.template).toMatchSnapshot();
});

test('match snapshot for simple template with two buttons', () => {
    // @ts-expect-error
    const converted = convertor(simpleTemplateWithTwoButtons);
    expect(converted.template).toMatchSnapshot();
});
