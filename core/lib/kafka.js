const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'receipt-processor',
    brokers: ['kafka:9092'],
})

module.exports = kafka;