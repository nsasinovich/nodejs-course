import fs from 'fs';
import path from 'path';
import { pathToDirectory } from 'config';
import parse from 'csv-parse';
import parseSync from 'csv-parse/lib/sync';

const parserOptions = { columns: true };

class Importer {
    import(fileName) {
        return new Promise(function(resolve, reject) {
            const parser = parse(parserOptions);
            const filePath = path.join(pathToDirectory, fileName);
            const reader = fs.createReadStream(filePath);

            const parsedContent = [];
            let chunk;

            parser.on('error', reject);
            parser.on('finish', () => resolve(parsedContent));
            parser.on('readable', () => {
                while (chunk = parser.read()) {
                    parsedContent.push(chunk);
                }
            });

            reader.pipe(parser);
        });
    }

    importSync(fileName) {
        const filePath = path.join(pathToDirectory, fileName)
        const fileContent = fs.readFileSync(filePath, 'utf8');

        return parseSync(fileContent, parserOptions);
    }

    subscribeToUpdate(emitter, event, isSync = false) {
        if (isSync) {
            emitter.on(event,  fileName => this.importSync(fileName));
        } else {
            emitter.on(event, fileName => this.import(fileName));
        }
    }
}

export default Importer;
