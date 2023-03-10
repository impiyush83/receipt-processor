/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
const kafka = require('../core/lib/kafka');

const consumer = kafka.consumer({ allowAutoTopicCreation: true, groupId: '1' });
const kafkaTopics = require('../core/constants/kafka-topics');
const logger = require('../core/lib/logger');
const utils = require('../core/lib/util');
const processedRecieptsMemory = require('../in-memory/processed-receipts');

const calculateReceiptPoints = (receiptId, receipt) => {
  const parsedReceipt = JSON.parse(receipt);
  logger.info(`calculateReceiptPoints receiptID ${receiptId}`);

  // 1

  let retailerAlphanumericCounter = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'retailer')) {
    retailerAlphanumericCounter = utils.alphanumericCount(parsedReceipt.retailer);
  }

  logger.info(`calculateReceiptPoints retailerAlphanumericCounter ${retailerAlphanumericCounter}`);

  // 2

  let noChangePoints = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'total')) {
    const total = parseFloat(parsedReceipt.total.trim());
    const change = total - parseInt(parsedReceipt.total.trim());
    if (change === 0.00) {
      noChangePoints = 50;
    }
  }
  logger.info(`calculateReceiptPoints noChangePoints ${noChangePoints}`);

  // 3

  let point25multiplier = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'total')) {
    if ((parseFloat(parsedReceipt.total.trim()) % 0.25) === 0) {
      point25multiplier = 25;
    }
  }

  logger.info(`calculateReceiptPoints point25multiplier ${point25multiplier}`);

  // 4

  let itemsCountPoints = 0;

  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'items')) {
    itemsCountPoints = parsedReceipt.items.length > 1
      ? parsedReceipt.items.length % 2 === 0
        ? (parsedReceipt.items.length / 2) * 5
        : ((parsedReceipt.items.length - 1) / 2) * 5
      : 0;
  }
  logger.info(`calculateReceiptPoints point25multiplier ${itemsCountPoints}`);

  // 5

  let trimmedItemDescriptionLengthPoints = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'items')) {
    parsedReceipt.items.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(item, 'shortDescription')) {
        const trimmedItemDescriptionLength = item.shortDescription.trim().length;
        let itemTotal = 0;
        if (trimmedItemDescriptionLength && trimmedItemDescriptionLength % 3 === 0) {
          itemTotal = parseFloat(item.price.trim()) * 0.2;
        }
        trimmedItemDescriptionLengthPoints += Math.ceil(itemTotal);
      }
    });
  }

  logger.info(`calculateReceiptPoints trimmedItemDescriptionLengthPoints ${trimmedItemDescriptionLengthPoints}`);

  // 6 - Purchase Date Odd
  let oddPurchaseDatePoints = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'purchaseDate')) {
    oddPurchaseDatePoints = parseInt(parsedReceipt.purchaseDate.trim().split('-')[2]) % 2 ? 6 : 0;
  }

  logger.info(`calculateReceiptPoints oddPurchaseDatePoints ${oddPurchaseDatePoints}`);

  // 7 - Purchase Time

  let purchaseTimePoints = 0;
  if (Object.prototype.hasOwnProperty.call(parsedReceipt, 'purchaseTime')) {
    purchaseTimePoints = parseInt(parsedReceipt.purchaseTime.trim().split(':')[0]) >= 14 && parseInt(parsedReceipt.purchaseTime.trim().split(':')[0]) <= 16
      ? parseInt(parsedReceipt.purchaseTime.trim().split(':')[1]) > 0 && parseInt(parsedReceipt.purchaseTime.trim().split(':')[1]) < 60
        ? 10 : 0
      : 0;
  }

  logger.info(`calculateReceiptPoints purchaseTimePoints ${purchaseTimePoints}`);

  const totalPoints = retailerAlphanumericCounter
  + purchaseTimePoints
  + oddPurchaseDatePoints
  + trimmedItemDescriptionLengthPoints
  + point25multiplier
  + itemsCountPoints
  + noChangePoints;

  logger.info(`calculateReceiptPoints totalPoints ${totalPoints}`);

  processedRecieptsMemory[receiptId] = totalPoints;
  return totalPoints;
};

const worker = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopics.receiptPointsCalculator, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const messageValue = message.value;
        logger.info(`event consumer message value ${messageValue}`);
        calculateReceiptPoints(message.key, messageValue);
      } catch (error) {
        logger.error('worker error', error);
      }
    },
  });
};

module.exports = worker;
