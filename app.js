const express = require('express');

const app = express();
const port = process.env.PORT || 7070;
const bodyParser = require('body-parser');
const requestLogger = require('morgan');
const responseHandler = require('./core/lib/response-handler');
const requestParser = require('./core/lib/request-parser');
const logger = require('./core/lib/logger');
const routes = require('./routes/index');

app.use(requestLogger('common', { stream: logger.stream }));

app.use(bodyParser.json());

app.use(requestParser());

app.use('/v1', routes);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send(200, 'Ok');
});

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});

app.use((err, req, res) => {
    responseHandler.handleError(err, res);
});
