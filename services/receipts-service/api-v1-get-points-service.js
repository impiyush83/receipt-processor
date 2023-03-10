const processedReceipts = require('../../in-memory/processed-receipts');
const NotFoundError = require('../../core/lib/errors/not-found');
const logger = require('../../core/lib/logger');

const apiV1GetPointsService = {};

apiV1GetPointsService.getPoints = async (receiptId) => {
  if (!Object.prototype.hasOwnProperty.call(processedReceipts, receiptId)) {
    throw new NotFoundError(`Receipt Id : ${receiptId} Invalid receipt Id`);
  }
  logger.info(`Get points service for receiptID ${receiptId}`);
  return {
    points: processedReceipts[receiptId],
  };
};

module.exports = apiV1GetPointsService;
