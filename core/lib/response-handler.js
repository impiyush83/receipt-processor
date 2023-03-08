const response = {};
const logger = require('winston');
const { ApplicationError, InternalServerError } = require('./errors');

response.handleError = (error, res) => {
  let errorObj = error;
  logger.error('Request failed: ', error);
  if (!(error instanceof ApplicationError)) {
    errorObj = new InternalServerError(errorObj);
  }

  res.status(errorObj.httpCode).json(errorObj.errors);
};

response.respond = (
  data,
  res,
  statusCode = 200,
) => (
  res.status(statusCode).json(data)
);

response.respondCreated = (
  location,
  data,
  res,
) => {
  res.setHeader('Location', location);
  res.status(201).json(data);
};

response.downloadFile = (res, fileData, fileName, fileType, downloadType = 'attachment') => {
  res.setHeader('Content-disposition', `${downloadType}; filename="${fileName}"`);
  res.set('Content-Type', fileType);
  res.status(200).send(fileData);
};

response.downloadFileStream = (res, fileStream, fileName, fileType) => {
  res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  res.set('Content-Type', fileType);
  fileStream.pipe(res);
};

module.exports = response;
