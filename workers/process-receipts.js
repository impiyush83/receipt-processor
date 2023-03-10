/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
const kafka = require('../core/lib/kafka');

const consumer = kafka.consumer({ allowAutoTopicCreation: true, groupId: '1' });
const kafkaTopics = require('../core/constants/kafka-topics');
const logger = require('../core/lib/logger');
const calculateReceiptPoints = require('../helpers/receipt-point-calculator');
const processedRecieptsMemory = require('../in-memory/processed-receipts');

const worker = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopics.receiptPointsCalculator, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const messageValue = message.value;
        logger.info(`event consumer message value ${messageValue}`);
        const parsedReceipt = JSON.parse(messageValue);
        const points = calculateReceiptPoints(parsedReceipt);
        processedRecieptsMemory[message.key] = points;
      } catch (error) {
        logger.error('worker error', error);
      }
    },
  });
};

module.exports = worker;
