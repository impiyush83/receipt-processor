/* eslint-disable no-undef */
const response = {};
const logger = require('winston');
const { ValidationError } = require('express-json-validator-middleware');
const { ApplicationError, InternalServerError, BadRequestError } = require('./errors');

response.handleError = (error, res) => {
  let errorObj = error;
  logger.error('Request failed: ', error);
  if (!(error instanceof ApplicationError)) {
    errorObj = new InternalServerError(errorObj);
  }

  if (error instanceof ValidationError) {
    logger.error('Error caught by error handler: ', error);
    errorObj = new BadRequestError('Invalid receipt', code = null, param = null, metadata = {
      reason: error.validationErrors,
    });
  }

  res.status(errorObj.httpCode).json(errorObj.errors);
};

response.respond = (
  data,
  res,
  statusCode = 200,
) => (
  res.status(statusCode).json(data)
);

module.exports = response;
