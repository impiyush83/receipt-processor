const logger = require('winston');
const responseHandler = require('../core/lib/response-handler');

const apiV1GetPointsService = {};

apiV1GetPointsService.getPoints = async (req, res) => {
  try {
    responseHandler.respond(response, res);
  } catch (error) {
    logger.error('error msg', error);
    responseHandler.handleError(error, res);
  }
};

module.exports = apiV1GetPointsService;
