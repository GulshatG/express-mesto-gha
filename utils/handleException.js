const mongoose = require('mongoose');

module.exports = (err, res) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404)
      .send({ message: err.message });
  } else if (err instanceof mongoose.Error.ValidationError || mongoose.Error.CastError) {
    res.status(400)
      .send({ message: err.message });
  } else {
    res.status(500)
      .send({ message: err.message });
  }
};
