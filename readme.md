# BEE to Topol templates convertor

## Supported BEE modules


| Module                                | Support                                   |
| ------------------------------------- | ----------------------------------------- |
| mailup-bee-newsletter-modules-text    | ✅                                        |
| mailup-bee-newsletter-modules-heading | ✅                                        |
| mailup-bee-newsletter-modules-button  | ✅                                        |
| mailup-bee-newsletter-modules-video   | ✅                                        |
| mailup-bee-newsletter-modules-divider | ✅                                        |
| mailup-bee-newsletter-modules-image   | ✅                                        |
| mailup-bee-newsletter-modules-spacer  | ✅                                        |
| mailup-bee-newsletter-modules-html    | ✅                                        |
| mailup-bee-newsletter-modules-social  | ✅                                        |
| mailup-bee-newsletter-modules-addon   | ✅                                        |
| mailup-bee-newsletter-modules-menu    | ❌ &nbsp;&nbsp;[see - custom convertor](#custom-module-convertors) |
| mailup-bee-newsletter-modules-icons   | ❌ &nbsp;&nbsp;[see - custom convertor](#custom-module-convertors) |


### 🛠️ Currently WIP

- Roles and permissions


## How to run the tool

### Prerequisites

- Node 20+

### Installation

```
pnpm run install
```

Create folder `bee-templates` add all your templates to the folder (currently doesn't support folder nesting PR welcomed).

Now run

```
pnpm run convert
```

Templates are converted and added to folder topol-templates.

## Custom Module Convertors

When working with not supported modules, you can add your own convertor.

### Example:

```ts
const {template, warnings} = convert(template, {
        convertors: [{
            key: "mailup-bee-newsletter-modules-icons",
            convert: (block, columnWidth, uuid ) => {
                
                return {
                    tagName: "mj-raw",
                    "attributes": {
                        "containerWidth": columnWidth
                    },
                    // Some custom HTML conversion here
                    content: block.customIdentifierUsedHere,
                    uid: uuid
                }
            }
        }]
});
```

## Known issues

Nothing at the moment.

## Development

Run tests: mostly snapshot tests, and simple unit tests

```
pnpm run test
```

Test coverage

```
pnpm run coverage
```