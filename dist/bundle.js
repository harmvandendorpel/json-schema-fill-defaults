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

function autoDefaults(data, schema) {
  function processNode(schemaNode, dataNode) {
    switch (schemaNode.type) {
      case 'object':
        return processObject(schemaNode, dataNode);

      case 'array':
        return processArray(schemaNode, dataNode);

      default:
        if (dataNode !== undefined) return dataNode;
        if (schemaNode.default !== undefined) return schemaNode.default;
        return undefined;
    }
  }

  function processObject(schemaNode, dataNode) {
    var result = {};
    forOwn(schemaNode.properties, function (propertySchema, propertyName) {
      if (propertySchema.required || dataNode !== undefined && dataNode[propertyName] !== undefined) {
        var nodeValue = dataNode !== undefined ? dataNode[propertyName] : undefined;
        result[propertyName] = processNode(propertySchema, nodeValue);
      }
    });
    return result;
  }

  function processArray(schemaNode, dataNode) {
    if (dataNode === undefined) {
      if (schemaNode.default) {
        return schemaNode.default;
      }

      return undefined;
    }

    var result = [];

    for (var i = 0; i < dataNode.length; i++) {
      result.push(processNode(schemaNode.items, dataNode[i]));
    }
    return result;
  }

  return processNode(schema, data);
}
