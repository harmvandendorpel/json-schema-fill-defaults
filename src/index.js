function forOwn(object, callback) {
  Object.keys(object).map(key => callback(object[key], key, object));
}

export default function autoDefaults(data, schema) {
  function processNode(schemaNode, dataNode) {
    switch (schemaNode.type) {
      case 'object':
        return processObject(schemaNode, dataNode); // eslint-disable-line no-use-before-define

      case 'array':
        return processArray(schemaNode, dataNode); // eslint-disable-line no-use-before-define

      default:
        if (dataNode !== undefined) return dataNode;
        if (schemaNode.default !== undefined) return schemaNode.default;
        return undefined;
    }
  }

  function processObject(schemaNode, dataNode) {
    const result = {};

    forOwn(schemaNode.properties, (propertySchema, propertyName) => {
      if (
        propertySchema.required ||
        (dataNode !== undefined && dataNode[propertyName] !== undefined)) {
        const nodeValue = dataNode !== undefined ? dataNode[propertyName] : undefined;
        result[propertyName] = processNode(propertySchema, nodeValue);
      }
    });

    if (dataNode) {
      forOwn(dataNode, (propertyValue, propertyName) => {
        if (result[propertyName] === undefined && propertyValue !== undefined) {
          result[propertyName] = propertyValue;
        }
      });
    }
    return result;
  }

  function processArray(schemaNode, dataNode) {
    if (dataNode === undefined) {
      if (schemaNode.default) {
        return schemaNode.default;
      }

      return undefined;
    }

    const result = [];

    for (let i = 0; i < dataNode.length; i++) {
      result.push(processNode(schemaNode.items, dataNode[i]));
    }
    return result;
  }

  return processNode(schema, data);
}
