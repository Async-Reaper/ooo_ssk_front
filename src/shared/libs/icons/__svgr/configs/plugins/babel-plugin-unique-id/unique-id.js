module.exports = ({types: t, template}, opts) => {
  const getAttributeValue = value => {
    return t.jsxExpressionContainer(template.ast(value).expression);
  };

  const replaceId = path => {
    const valuePath = path.get('value');
    const originalId = valuePath.node.value;

    valuePath.replaceWith(getAttributeValue('`${_id}_' + originalId + '`'));
  };

  const isFillWithUrl = path => {
    const valuePath = path.get('value');
    return valuePath.node.value.includes('url(#');
  };

  const replaceFill = path => {
    const valuePath = path.get('value');
    const originalFill = valuePath.node.value;

    const originalId = originalFill.replace('url(#', '').replace(')', '');

    valuePath.replaceWith(
      getAttributeValue('`url(#${_id}_' + originalId + ')`')
    );
  };

  return {
    visitor: {
      JSXAttribute(path) {
        const {
          node: {
            type: nodeType,
            name: {name, type},
          },
        } = path;

        if (nodeType !== 'JSXAttribute' || type !== 'JSXIdentifier') {
          return;
        }

        if (name === 'id') {
          replaceId(path);
        }

        if (name === 'fill' && isFillWithUrl(path)) {
          replaceFill(path);
        }
      },
    },
  };
};
