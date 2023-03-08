const errorFormatter = {};

errorFormatter.formatError = (errors, parameterPrefix) => {
  const formattedErrors = [];
  if (errors) {
    Object.keys(errors).forEach((key) => {
      errors[key].forEach((errorString) => {
        formattedErrors.push({
          message: errorString,
          param: (parameterPrefix && `${parameterPrefix}.${key}`) || key,
        });
      });
    });
  }

  return formattedErrors;
};

module.exports = errorFormatter;
