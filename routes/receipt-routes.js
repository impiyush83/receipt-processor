const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/{id}/points', controller.receiptsController.apiV1GetPointsController.getPoints);

router.post('/process', controller.receiptsController.apiV1PostReceiptsController.processReceipts);

module.exports = router;
