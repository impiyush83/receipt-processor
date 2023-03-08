const utils = {};

utils.base64Encode = (data) => Buffer.from(JSON.stringify(data)).toString('base64');

module.exports = utils;
