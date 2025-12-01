import createError from 'http-errors';

export default function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return next(createError(400, message));
    }

    req.body = value; // sanitized body
    next();
  };
}
