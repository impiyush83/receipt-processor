const kafka = require('../core/lib/kafka');
const consumer = kafka.consumer({allowAutoTopicCreation: true, groupId: '1'})
const kafkaTopics = require('../core/constants/kafka-topics');
const logger = require('../core/lib/logger');
const isAlphanumeric = require('is-alphanumeric');

const calculateReceiptPoints = async (receiptId, receipt) => {
    const parsedReceipt = JSON.parse(receipt);
    logger.info(`calculateReceiptPoints receiptID ${receiptId}`);
    const retailer = parsedReceipt.retailer;

}




const worker = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: kafkaTopics.receiptPointsCalculator, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const messageValue = message.value
                logger.info(`event consumer message value ${messageValue}`);
                await calculateReceiptPoints(message.key, messageValue);
            } catch (error) {
                logger.error('worker error', error);
            }
        },
    })
}

module.exports = worker;

