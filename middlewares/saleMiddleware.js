const schema = require('../schemas/productSchema');

const validateSale = (req, res, next) => {
  const {productId, quantity} = req.body;
  
  const validations = schema.validations(productId, quantity);
  if (validations) return res.status(validations)
    .json(validations);

  next();
};

module.exports = {
  validateSale
};
