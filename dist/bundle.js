'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoDefaults;
function forOwn(object, callback) {
  Object.keys(object).map(function (key) {
    return callback(object[key], key, object);
  });
}

function autoDefaults(schema, data) {
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
    var result = {};
    forOwn(schemaNode.properties, function (propertySchema, propertyName) {
      if (propertySchema.required || dataNode[propertyName] !== undefined) {
        var nodeValue = dataNode !== undefined ? dataNode[propertyName] : undefined;
        result[propertyName] = processNode(propertySchema, nodeValue, propertyName);
      }
    });
    return result;
  }

  function processArray(schemaNode, dataNode) {
    if (dataNode === undefined) return undefined;
    var result = [];

    for (var i = 0; i < dataNode.length; i++) {
      result.push(processNode(schemaNode.items, dataNode[i]));
    }
    return result;
  }

  return processNode(schema, data);
}
