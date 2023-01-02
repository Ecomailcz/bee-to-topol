import fs from 'fs';
import path from 'path';
import convert from "./convertor";

const beePath = path.join(__dirname, '..', 'bee-templates');
const topolPath = path.join(__dirname, '..', 'topol-templates');

/*
*  This is a simple script to convert Bee templates to Topol templates
*  It will read all the files in the bee-templates folder and convert them to Topol templates
*  The converted templates will be saved in the topol-templates folder
*/
if (fs.existsSync(beePath)) {


    if(!fs.existsSync(topolPath)) {
        fs.mkdirSync(topolPath);
    }


    fs.readdir(beePath, (err, files) => {
        if (err) {
            console.error("Unable to scan directory: " + err);
            return;
        }

        files.forEach((file) => {
            fs.readFile(path.join(beePath, file), 'utf8', (err, data) => {

                if (err) {
                    console.error("Unable to read file: " + err);
                    return;
                }

                const { template: convertedTemplate, warnings } = convert(JSON.parse(data), {
                    
                        // See documentation for more info
                        
                        // convertors: [{
                        //     key: "mailup-bee-newsletter-modules-icons",
                        //     convert: (block, columnWidth, uuid ) => {
                        //         console.log("Custom transformer applied...");

                        //         return {
                        //             tagName: "mj-raw",
                        //             "attributes": {
                        //                 "containerWidth": columnWidth
                        //             },
                        //             // Some custom HTML conversion here
                        //             //@ts-expect-error
                        //             content: block.descriptor.html.html,

                        //             uid: uuid
                        //         }
                        //     }
                        // }]
                });

                if(warnings.length > 0) {
                    console.log(`Warnings in: "${file}"`, warnings);
                }
                

                fs.writeFile(path.join(topolPath, file), JSON.stringify(convertedTemplate), 'utf8', (err) => {
                    if (err) {
                        console.error("Unable to write file: " + err);
                        return;
                    }
                });
            });
        });
    });
} else {
    console.error("Unable to find directory: " + beePath);
}
