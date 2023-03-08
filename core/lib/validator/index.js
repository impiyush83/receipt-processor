const moment = require('moment');
const validate = require('validate.js');
const errorFormatter = require('./formatter');

const validator = {};

validator.validate = (attributes, constraints, options) => errorFormatter.formatError(validate(attributes, constraints, options), (options && options.parameter_prefix) || '');

module.exports = validator;
