const express = require('express');

const router = express.Router();
const RecieptRoutes = require('./reciept-routes');

router.use('/reciepts', RecieptRoutes);

module.exports = router;
