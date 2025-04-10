// @ts-check
const path = require('path');
const snakeCase = require('lodash/snakeCase');

const replaceMap = {};

const importStatement = (/** @type {any} */ name, /** @type {any} */ exportName, /** @type {any} */ baseName) => `import {${name} as ${exportName}} from './${baseName}';`;

/**
 * @param {any[]} filePaths
 */
function defaultIndexTemplate(filePaths) {
   /**
     * @type {any[]}
     */
    const baseNames = [];
   /**
     * @type {string[]}
     */
    const importNames = [];
   /**
     * @type {any[]}
     */
    const exportsNames = [];

    filePaths.forEach((filePath) => {
        const basename = path.basename(filePath, path.extname(filePath));
        baseNames.push(basename);
        importNames.push(`${basename}Icon`);
        exportsNames.push(snakeCase(basename));
    });

    const imports = importNames
        .map((n, i) => importStatement(n, exportsNames[i], baseNames[i]))
        .join('\n');

    const types = exportsNames
       // @ts-ignore
        .map((n) => replaceMap[n] ?? n)
        .map((n) => `  | '${n}'`)
        .join('\n');

    return `import * as React from 'react';
import {SVGAttributes} from 'react';
${imports}

export type IconName =
${types};

export const iconSet: {
  [key in IconName]: React.FC<SVGAttributes<SVGElement> & {size?: number}>;
} = {
  ${exportsNames
        .map((n) => {
           // @ts-ignore
            if (replaceMap[n]) {
               // @ts-ignore
                return `"${replaceMap[n]}": ${n}`;
            }

            return n;
        })
        .join(',\n  ')},
};
`;
}

module.exports = defaultIndexTemplate;
