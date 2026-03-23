export const success = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

export const error = (message = 'An error occurred', statusCode = 500) => ({
  success: false,
  message,
  statusCode
});

export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json(success(data, message));
};

export const sendError = (res, message = 'An error occurred', statusCode = 500) => {
  res.status(statusCode).json(error(message, statusCode));
};
