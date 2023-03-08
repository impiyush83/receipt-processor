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

app.use('/', routes);

app.get('/health', (req, res) => {
    res.status(200).json({'message': 'Service Up & Running'});
});

app.get('/', (req, res) => {
    res.status(200).json({'message': 'OK'});
});

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});

app.use((req, res, next) => {
    res.status(404).json({'message': 'Invalid Route'});
});

// error handler
// The `next` var needs to be left below to ensure express picks this function as error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error('Error caught by error handler: ', err);
    responseHandler.handleError(err, res);
});