const kafka = require('../../core/lib/kafka');
const { v4: uuidv4 } = require('uuid');
const kafkaTopics = require('../../core/constants/kafka-topics');

const apiV1GetPointsService = {};

apiV1GetPointsService.processReceipts = async (receipt) => {
  const producer = kafka.producer({
    allowAutoTopicCreation: true,
  });
  const receiptId = uuidv4();
  await producer.connect();
  await producer.send({
    topic: kafkaTopics.receiptPointsCalculator,
    messages: [{
      key: receiptId,
      value: JSON.stringify(receipt)
    }],
  });
  return {
    "id": receiptId
  };
};

module.exports = apiV1GetPointsService;
