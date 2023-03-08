const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.post('/{id}/points', controller.recieptsController.apiV1GetPointsController.getPoints);

router.get('/process', controller.recieptsController.apiV1PostRecieptsController.processReciepts);

module.exports = router;
