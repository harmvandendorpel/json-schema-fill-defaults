const Schema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            required: true
          },
          city: {
            type: 'string',
            required: true
          },
          enabled: {
            type: 'boolean',
            required: true,
            default: true
          }
        }
      }
    }
  }
};

module.exports = Schema;

