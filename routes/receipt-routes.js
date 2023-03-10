const { Validator } = require('express-json-validator-middleware');

const express = require('express');

const controller = require('../controllers');

const receiptSchema = require('../schemas/receipt-schema');

const { validate } = new Validator();

const router = express.Router();

router.get('/:id/points', controller.receiptsController.apiV1GetPointsController.getPoints);

router.post('/process', validate({ body: receiptSchema }), controller.receiptsController.apiV1PostReceiptsController.processReceipts);

module.exports = router;
