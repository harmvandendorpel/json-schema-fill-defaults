const Schema = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    slot1: {
      type: 'object',
      required: true,
      properties: {
        enabled: {
          type: 'boolean',
          required: true,
          default: true
        }
      }
    }
  }
};

module.exports = Schema;
