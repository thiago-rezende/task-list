/* error middleware */
const error = () => (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(400).json({
    error: {
      name: err.name,
      message: err.message,
    },
  });
};

module.exports = error;
