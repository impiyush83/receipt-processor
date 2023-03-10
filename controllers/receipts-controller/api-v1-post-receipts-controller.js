const logger = require('winston');
const responseHandler = require('../../core/lib/response-handler');
const services = require('../../services');

const apiV1PostReceiptsController = {};

apiV1PostReceiptsController.processReceipts = async (req, res) => {
  try {
    const response = await services.receiptsService.apiV1PostReceiptsService.processReceipts(
      req.body,
    );
    responseHandler.respond(response, res);
  } catch (error) {
    logger.error('error msg', error);
    responseHandler.handleError(error, res);
  }
};

module.exports = apiV1PostReceiptsController;
