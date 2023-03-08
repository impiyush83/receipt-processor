const logger = require('winston');
const responseHandler = require('../../core/lib/response-handler');

const apiV1GetPointsService = {};

apiV1GetPointsService.processReciepts = async (req, res) => {
  try {
    responseHandler.respond(response, res);
  } catch (error) {
    logger.error('Error', error);
    responseHandler.handleError(error, res);
  }
};

module.exports = apiV1GetPointsService;
