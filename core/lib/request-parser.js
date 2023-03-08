const _ = require('lodash');
const validator = require('./validator');
const { ValidationError } = require('./errors');

module.exports = () => (req, res, next) => {
  req.query_data = {
    filter: {},
    cursor: null,
    limit: null,
    include: [],
    sort: [],
  };

  if (!_.isNull(req.query.cursor) && !_.isEmpty(req.query.cursor)) {
    req.query_data.cursor = req.query.cursor;
  }

  if (!_.isNull(req.query.limit) && !_.isEmpty(req.query.limit)) {
    req.query_data.limit = parseInt(req.query.limit, 10);
  }

  if (!_.isNull(req.query.filter) && !_.isEmpty(req.query.filter)) {
    Object.keys(req.query.filter).forEach((key) => {
      req.query_data.filter[key] = req.query.filter[key].split(',').map((value) => value.trim());
    });
  }

  if (!_.isNull(req.query.include) && !_.isEmpty(req.query.include)) {
    req.query_data.include = req.query.include.split(',').map((value) => value.trim());
  }

  if (!_.isNull(req.query.sort) && !_.isEmpty(req.query.sort)) {
    const sortParams = req.query.sort.split(',').map((value) => value.trim());
    sortParams.forEach((sortParameter) => {
      if (sortParameter[0] === '-') {
        req.query_data.sort.push({
          order: 'DESC',
          key: sortParameter.substring(1, sortParameter.length),
        });
      } else {
        req.query_data.sort.push({
          order: 'ASC',
          key: sortParameter,
        });
      }
    });
  }

  const errors = validator.validate(req.query_data, {
    limit: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: (value) => {
          if (value <= 0) {
            return 'param.lessThanOrEqualToZero';
          }
          return 'param.notNumber';
        },
      },
    },
  });
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  next();
};
