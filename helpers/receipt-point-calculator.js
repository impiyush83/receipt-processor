/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
const utils = require('../core/lib/util');
const logger = require('../core/lib/logger');

const calculateReceiptPoints = (parsedReceipt) => {
  // 1

  const retailerAlphanumericCounter = utils.alphanumericCount(parsedReceipt.retailer);

  logger.info(`calculateReceiptPoints retailerAlphanumericCounter ${retailerAlphanumericCounter}`);

  // 2

  let noChangePoints = 0;
  const total = parseFloat(parsedReceipt.total.trim());
  const change = total - parseInt(parsedReceipt.total.trim(), 10);
  if (change === 0.00) {
    noChangePoints = 50;
  }
  logger.info(`calculateReceiptPoints noChangePoints ${noChangePoints}`);

  // 3

  let point25multiplier = 0;
  if ((parseFloat(parsedReceipt.total.trim()) % 0.25) === 0) {
    point25multiplier = 25;
  }

  logger.info(`calculateReceiptPoints point25multiplier ${point25multiplier}`);

  // 4

  // eslint-disable-next-line no-nested-ternary
  const itemsCountPoints = parsedReceipt.items.length > 1
    ? parsedReceipt.items.length % 2 === 0
      ? (parsedReceipt.items.length / 2) * 5
      : ((parsedReceipt.items.length - 1) / 2) * 5
    : 0;
  logger.info(`calculateReceiptPoints point25multiplier ${itemsCountPoints}`);

  // 5

  let trimmedItemDescriptionLengthPoints = 0;
  parsedReceipt.items.forEach((item) => {
    const trimmedItemDescriptionLength = item.shortDescription.trim().length;
    let itemTotal = 0;
    if (trimmedItemDescriptionLength && trimmedItemDescriptionLength % 3 === 0) {
      itemTotal = parseFloat(item.price.trim()) * 0.2;
    }
    trimmedItemDescriptionLengthPoints += Math.ceil(itemTotal);
  });

  logger.info(`calculateReceiptPoints trimmedItemDescriptionLengthPoints ${trimmedItemDescriptionLengthPoints}`);

  // 6 - Purchase Date Odd
  const oddPurchaseDatePoints = parseInt(parsedReceipt.purchaseDate.trim().split('-')[2]) % 2 ? 6 : 0;

  logger.info(`calculateReceiptPoints oddPurchaseDatePoints ${oddPurchaseDatePoints}`);

  // 7 - Purchase Time

  const purchaseTimePoints = parseInt(parsedReceipt.purchaseTime.trim().split(':')[0]) >= 14 && parseInt(parsedReceipt.purchaseTime.trim().split(':')[0]) <= 16
    ? parseInt(parsedReceipt.purchaseTime.trim().split(':')[1]) > 0 && parseInt(parsedReceipt.purchaseTime.trim().split(':')[1]) < 60
      ? 10 : 0
    : 0;

  logger.info(`calculateReceiptPoints purchaseTimePoints ${purchaseTimePoints}`);

  const totalPoints = retailerAlphanumericCounter
    + purchaseTimePoints
    + oddPurchaseDatePoints
    + trimmedItemDescriptionLengthPoints
    + point25multiplier
    + itemsCountPoints
    + noChangePoints;

  logger.info(`calculateReceiptPoints totalPoints ${totalPoints}`);

  return totalPoints;
};

module.exports = calculateReceiptPoints;
