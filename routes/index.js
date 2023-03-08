const express = require('express');

const router = express.Router();
const ReceiptRoutes = require('./receipt-routes');

router.use('/receipts', ReceiptRoutes);

module.exports = router;
