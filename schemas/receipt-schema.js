const ReceiptSchema = {
  type: 'object',
  required: ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'],
  properties: {
    retailer: {
      type: 'string',
    },
    purchaseDate: {
      type: 'string',
      pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    },
    purchaseTime: {
      type: 'string',
      pattern: '^([01][0-9]|2[0-3]):[0-5][0-9]$',
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
