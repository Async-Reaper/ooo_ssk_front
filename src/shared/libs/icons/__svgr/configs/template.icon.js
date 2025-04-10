// @ts-check
/**
 * @param {any} opts
 */
function defaultTemplate(
   // @ts-ignore
    { template },
    opts,
    {
        // @ts-ignore
        imports, interfaces, componentName, props, jsx, exports,
    },
) {
    const plugins = ['jsx', 'typescript'];

    const typeScriptTpl = template.smart({ plugins });

    const _componentName = {
        type: 'Identifier',
        name: `${componentName.name.replace('Svg', '')}Icon`,
    };

    return typeScriptTpl.ast`
    import * as React from 'react';
    import { SVGAttributes } from 'react';
    ${'\n'}

    export const ${_componentName} = React.memo(({size = 24, color = '#4E5361', ...props}: SVGAttributes<SVGElement> & {size?: number}) => {
      return ${jsx};
    });
`;
}

module.exports = defaultTemplate;
