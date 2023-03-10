// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');

const { describe, it } = require('mocha');
const ReceiptBuilder = require('./data-builders/receipt');
const ItemBuilder = require('./data-builders/item');

const calculateReceiptPoints = require('../helpers/receipt-point-calculator');

describe('Reciept points calculator', async () => {
  describe('when reciept is empty', () => {
    it('should return 0 points', async () => {
      const receiptBuilder = new ReceiptBuilder();
      const receiptData = receiptBuilder.build();

      const points = calculateReceiptPoints(receiptData);

      expect(points).to.be.equal(0);
    });
  });

  describe('when reciept is example 1', () => {
    it('should return 28 points', async () => {
      const receiptBuilder = new ReceiptBuilder();
      const receiptData = receiptBuilder
        .withRetailer('Target')
        .withPurchaseDate('2022-01-01')
        .withPurchaseTime('13:01')
        .withItems([
          new ItemBuilder()
            .withShortDescription('Mountain Dew 12PK')
            .withPrice('6.49')
            .build(),
          new ItemBuilder()
            .withShortDescription('Emils Cheese Pizza')
            .withPrice('12.25')
            .build(),
          new ItemBuilder()
            .withShortDescription('Knorr Creamy Chicken')
            .withPrice('1.26')
            .build(),
          new ItemBuilder()
            .withShortDescription('Doritos Nacho Cheese')
            .withPrice('3.35')
            .build(),
          new ItemBuilder()
            .withShortDescription('   Klarbrunn 12-PK 12 FL OZ  ')
            .withPrice('12.00')
            .build(),
        ])
        .withTotal('35.35')
        .build();

      const points = calculateReceiptPoints(receiptData);

      expect(points).to.be.equal(28);
    });
  });
});
