const errors = {};

errors.ApplicationError = require('./application-error');
errors.InternalServerError = require('./internal-server-error');
errors.NotFound = require('./not-found');
errors.ValidationError = require('./validation-error');
errors.Unauthorized = require('./unauthorized');
errors.BadRequestError = require('./bad-request');

module.exports = errors;
