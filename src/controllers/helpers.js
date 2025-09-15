
export const badRequest = (body) => ({
  statusCode: 400,
  body,
});
export const createdRequest = (body) => ({
  statusCode: 201,
  body,
});
export const internalServer = () => ({
  statusCode: 500,
  body: {
    message: 'Internal server error',
  },
});