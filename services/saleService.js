// const { validate } = require('@hapi/joi/lib/base')
const salesModel = require('../models/saleModel');
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

const create = async (productId, quantity) => {

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
      message: '"Wrong product ID or invalid quantity"'
    }
  };

  default: {}
  }

  const saleService = await salesModel.create(name, quantity);
  return saleService;
};

const findById = async (id) => {
  const getSalesById = await salesModel.findById(id);
  if (getSalesById === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return getSalesById;
};

const updateById = async (id, name, quantity) => {
  const updateSalesById = await salesModel.findById(id, name, quantity);
  
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
  return updateSalesById;
};

const getAll = async () => {
  const getAllSales = await salesModel.getAll();
  return getAllSales;
};

const deleteById = async (id) => {
  const deleteSale = await salesModel.deleteById(id);
  if (deleteSale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return deleteSale;
};


module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById
};
