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
  function setDefault(schemaNode) {
    if (schemaNode.required && schemaNode.default !== undefined) {
      return schemaNode.default;
    }
    return undefined;
  }

  function complementSchema(node, schemaNode) {
    switch (schemaNode.type) {
      case 'object':
        forOwn(schemaNode.properties, function (schemaChildNode, childNodeName) {
          if (node[childNodeName] === undefined) {
            var defaultValue = setDefault(schemaChildNode);
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
        node.forEach(function (item) {
          return complementSchema(item, schemaNode.items);
        });
        break;

      default:
        node = setDefault(schemaNode); // eslint-disable-line no-param-reassign
    }
  }

  complementSchema(data, schema);
}
