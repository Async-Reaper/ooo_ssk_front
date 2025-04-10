const path = require('path');

module.exports = {
    template: require('./template.icon'),
    indexTemplate: require('./template.index'),
    memo: true,
    typescript: true,
    icon: true,
    replaceAttrValues: {
        '#4E5361': '{color}',
        '1em': '{size}',
    },
    svgo: true,
    svgoConfig: {
        plugins: [{ removeXMLNS: true }],
    },
    jsx: {
        babelConfig: {
            // plugins: [path.resolve(__dirname, './plugins/babel-plugin-unique-id')]
        },
    },
};
