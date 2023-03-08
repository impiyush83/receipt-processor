const kafka = require('../core/lib/kafka');
const consumer = kafka.consumer({ groupId: 'test-group' })
const kafkaTopics = require('../core/constants/kafka-topics');

await consumer.connect()
await consumer.subscribe({ topic: kafkaTopics.receiptPointsCalculator, fromBeginning: true })

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log("Hello world");
    },
})