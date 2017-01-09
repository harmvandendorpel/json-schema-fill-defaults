var autoDefaults = require('../dist/bundle').default;
var validator = require('is-my-json-valid');
var Schema = require('./schema');

const validate = validator(Schema);

const data = {
};

autoDefaults(data, Schema);

validate(data);

console.log(validate.errors);

console.log('\n\n-------');
console.log(data);
console.log('-------\n\n');