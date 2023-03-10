const ReceiptSchema = {
  type: 'object',
  required: ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'],
  properties: {
    retailer: {
      type: 'string',
    },
    purchaseDate: {
      type: 'string',
    },
    purchaseTime: {
      type: 'string',
    },
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['shortDescription', 'price'],
        properties: {
          shortDescription: {
            type: 'string',
          },
          price: {
            type: 'string',
            pattern: '^\\d+\\.\\d{2}$',
          },
        },
      },
    },
    total: {
      type: 'string',
      pattern: '^\\d+\\.\\d{2}$',
    },
  },
};

module.exports = ReceiptSchema;
