const {
  HTTP_NO_BODY_STATUS,
  isString,
  isNumber,
  isLengthLetterThan,
  isLengthMoreThan,
} = require('../helpers/helpers');

const five = 5;
const one = 1;

const validations = (name, quantity, exists) => {
  // if (exists) {
  //   return {
  //     error: {
  //       code: 'alreadyExists',
  //       message: 'Product already exists',
  //     },
  //   };
  // }
  
  switch (true) {
  // case exists: return {
  // error: {
  //     code: 'alreadyExists',
  //     message: 'Product already exists',
  //   },
  // };

  case isString(name): return {
    code: HTTP_NO_BODY_STATUS, 
    message: '"name" must be a String'
  };
      
  case isLengthLetterThan(name, five): return {
    code: HTTP_NO_BODY_STATUS, 
    message: '"name" length must be at least 5 characters long'
  };

  case isNumber(quantity): return {
    code: HTTP_NO_BODY_STATUS, 
    message: '"quantity" must be a number'
  };

  case isLengthMoreThan(quantity, one): return {
    code: HTTP_NO_BODY_STATUS, 
    message: '"quantity" must be larger than or equal to 1'
  };

  default: {}
  }
};

module.exports = {
  validations
};
