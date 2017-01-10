function forOwn(object, callback) {
  Object.keys(object).map(key => callback(object[key], key, object));
}

export default function autoDefaults(schema, data) {
  console.log('input data = ', JSON.stringify(data));
  function processNode(schemaNode, dataNode, propertyName) {
    switch (schemaNode.type) {
      case 'object':
        return processObject(schemaNode, dataNode);

      case 'array':
        return processArray(schemaNode, dataNode);

      default:
        return dataNode || schemaNode.default;
    }
  }

  function processObject(schemaNode, dataNode) {
    const result = {};
    forOwn(schemaNode.properties, (propertySchema, propertyName) => {
      if (propertySchema.required || dataNode[propertyName] !== undefined) {
        const nodeValue = dataNode !== undefined ? dataNode[propertyName] : undefined;
        result[propertyName] = processNode(propertySchema, nodeValue, propertyName);
      }
    });
    return result;
  }

  function processArray(schemaNode, dataNode) {
    if (dataNode === undefined) return undefined;
    const result = [];

    for (let i = 0; i < dataNode.length; i++) {
      result.push(processNode(schemaNode.items, dataNode[i]));
    }
    return result;
  }

  return processNode(schema, data);
}
