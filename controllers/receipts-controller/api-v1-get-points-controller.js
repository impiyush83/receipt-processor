const logger = require('winston');
const responseHandler = require('../../core/lib/response-handler');
const services = require('../../services');
const InvalidParameterError = require('../../core/lib/errors/invalid-parameter');

const apiV1GetPointsController = {};

apiV1GetPointsController.getPoints = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new InvalidParameterError('Request id parameter missing');
    }
    const response = await services.receiptsService.apiV1GetPointsService.getPoints(
      req.params.id,
    );
    responseHandler.respond(response, res);
  } catch (error) {
    logger.error('error msg', error);
    responseHandler.handleError(error, res);
  }
};

module.exports = apiV1GetPointsController;
