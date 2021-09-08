const schema = require('../schemas/productSchema');

const validateProduct = (req, res, next) => {
  const {name, quantity} = req.body;
  
  const validations = schema.validations(name, quantity);
  if (validations) return res.status(validations)
    .json(validations);

  next();
};

module.exports = {
  validateProduct
};
