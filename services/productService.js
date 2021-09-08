// const { validate } = require('@hapi/joi/lib/base')
const productsModel = require('../models/productModel');
// const schema = require('../schemas/productSchema');

const {
  HTTP_NO_BODY_STATUS,
  HTTP_CREATED_STATUS,
  isString,
  isNumber,
  isLengthLetterThan,
  isLengthMoreThan,
} = require('../helpers/helpers');

const five = 5;
const one = 1;

const create = async (name, quantity) => {
  const exists = await productsModel.findByName(name);
  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  switch (true) {
  // case exists: return {
  // error: {
  //     code: 'alreadyExists',
  //     message: 'Product already exists',
  //   },
  // };
  
  case isString(name): return {
    err: {
      code: 'invalid_data', 
      message: '"name" must be a String'
    }
  };
      
  case isLengthLetterThan(name, five): return {
    err: {
      code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long'
    }
  };

  case isNumber(quantity): return {
    err: {
      code: 'invalid_data', 
      message: '"quantity" must be a number'
    }
  };

  case isLengthMoreThan(quantity, one): return {
    err: {
      code: 'invalid_data', 
      message: '"quantity" must be larger than or equal to 1'
    }
  };

  default: {}
  }

  const productsService = await productsModel.create(name, quantity);
  return productsService;
};

const findById = async (id) => {
  const getProductsById = await productsModel.findById(id);
  if (getProductsById === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return getProductsById;
};


const getAll = async () => {
  const getAllProducts = await productsModel.getAll();
  return getAllProducts;
};

const updateById = async (id, name, quantity) => {
  const getProductsById = await productsModel.updateById(id, name, quantity);
  
  switch (true) { 
  case isString(name): return {
    err: {
      code: 'invalid_data', 
      message: '"name" must be a String'
    }
  };
      
  case isLengthLetterThan(name, five): return {
    err: {
      code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long'
    }
  };

  case isNumber(quantity): return {
    err: {
      code: 'invalid_data', 
      message: '"quantity" must be a number'
    }
  };

  case isLengthMoreThan(quantity, one): return {
    err: {
      code: 'invalid_data', 
      message: '"quantity" must be larger than or equal to 1'
    }
  };

  default: {}
  }
  return getProductsById;
};

const deleteById = async (id) => {
  const deleteProduct = await productsModel.deleteById(id);
  if (deleteProduct === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return deleteProduct;
};


module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById
};
