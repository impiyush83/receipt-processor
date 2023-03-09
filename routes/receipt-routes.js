const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.post('/{id}/points', controller.receiptsController.apiV1GetPointsController.getPoints);

router.get('/process', controller.receiptsController.apiV1PostReceiptsController.processReceipts);

module.exports = router;
