const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'receipt-processor',
  brokers: ['kafka-container:9092'],
});

module.exports = kafka;
