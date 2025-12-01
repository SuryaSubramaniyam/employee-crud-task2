export default (err, req, res, next) => {
  // If http-errors used, err.status/statusCode available
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Additional details (validation etc.)
  const details = err.details || undefined;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    status,
    message,
    ...(details ? { details } : {})
  });
};
