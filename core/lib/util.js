const isAlphanumeric = require('is-alphanumeric');

const utils = {};

utils.base64Encode = (data) => Buffer.from(JSON.stringify(data)).toString('base64');

utils.alphanumericCount = (key) => {
  let alphanumericCounter = 0;
  for (let i = 0; i < key.length; i += 1) {
    if (isAlphanumeric(key[i])) {
      alphanumericCounter += 1;
    }
  }
  return alphanumericCounter;
};

module.exports = utils;
