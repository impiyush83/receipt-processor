const ApplicationError = require('./application-error');

class BadRequest extends ApplicationError {
  constructor(message, code = null, param = null, metadata = {}) {
    const errorJson = [
      {
        message: message || 'Bad Request',
        code,
        param,
        metadata,
      },
    ];

    super(errorJson, 400, 'Bad Request');
  }
}

module.exports = BadRequest;
