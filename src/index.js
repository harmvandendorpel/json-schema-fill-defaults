function forOwn(object, callback) {
  Object.keys(object).map(key => callback(object[key], key, object));
}

export default function autoDefaults(data, schema) {
  function setDefault(schemaNode) {
    if (schemaNode.required && schemaNode.default !== undefined) {
      return schemaNode.default;
    }
    return undefined;
  }

  function complementSchema(node, schemaNode) {
    switch (schemaNode.type) {
      case 'object':
        forOwn(schemaNode.properties, (schemaChildNode, childNodeName) => {
          if (node[childNodeName] === undefined) {
            const defaultValue = setDefault(schemaChildNode);
            if (defaultValue !== undefined) {
              node[childNodeName] = defaultValue; // eslint-disable-line no-param-reassign
            }
          }

          if (node[childNodeName] !== undefined) {
            complementSchema(node[childNodeName], schemaChildNode);
          }
        });
        break;

      case 'array':
        if (node.constructor === Array) {
          node.forEach(item =>
            complementSchema(item, schemaNode.items)
          );
        } else {
          node = setDefault(schemaNode); // eslint-disable-line no-param-reassign
        }
        break;

      default:
        node = setDefault(schemaNode); // eslint-disable-line no-param-reassign
    }
  }

  complementSchema(data, schema);
}
