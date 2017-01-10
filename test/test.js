console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n');
var autoDefaults = require('../dist/bundle').default;
var validator = require('is-my-json-valid');
var Schema = require('./schema');

const validate = validator(Schema);

var data = {
  users: [{
    name: 'Harm',
    city: 'Berlin'
  }]
};

data = autoDefaults(Schema, data);

validate(data, { verbose: true, greedy: true  });
console.log('\n\n-------\n\n');
console.log(validate.errors === null ? 'Validates!' : validate.errors);
console.log('\n\n-------');
console.log('result = ', JSON.stringify(data));
console.log('-------\n\n');
