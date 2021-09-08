// const { validate } = require('@hapi/joi/lib/base')
const salesModel = require('../models/saleModel');
// const schema = require('../schemas/productSchema');

const {
  HTTP_NO_BODY_STATUS,
  HTTP_CREATED_STATUS,
  // isString,
  isNumber,
  isLengthLetterThan,
  isLengthMoreThan,
  isLengthEqualsTo
} = require('../helpers/helpers');

const five = 5;
const zero = 0;
const code = 'invalid_data';
const message = 'Wrong product ID or invalid quantity';
const returned  = {
  err: {
    code, 
    message
  }
};

const create = async (productId,quantity) => {

  switch (true) {

  case isLengthMoreThan(quantity, zero): return returned;

  case isLengthEqualsTo(quantity, zero): return returned;

  case isNumber(quantity): return returned;

  default: {}
  }

  const saleService = await salesModel.create(productId, quantity);
  return saleService;
};

// const findById = async (id) => {
//   const getSalesById = await salesModel.findById(id);
//   if (getSalesById === null) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong id format',
//       },
//     };
//   }
//   return getSalesById;
// };

// const updateById = async (id, name, quantity) => {
//   const updateSalesById = await salesModel.findById(id, name, quantity);
  
//   switch (true) { 
//   case isString(name): return {
//     err: {
//       code: 'invalid_data', 
//       message: '"name" must be a String'
//     }
//   };
      
//   case isLengthLetterThan(name, five): return {
//     err: {
//       code: 'invalid_data', 
//       message: '"name" length must be at least 5 characters long'
//     }
//   };

//   case isNumber(quantity): return {
//     err: {
//       code: 'invalid_data', 
//       message: '"quantity" must be a number'
//     }
//   };

//   case isLengthMoreThan(quantity, one): return {
//     err: {
//       code: 'invalid_data', 
//       message: '"quantity" must be larger than or equal to 1'
//     }
//   };

//   default: {}
//   }
//   return updateSalesById;
// };

// const getAll = async () => {
//   const getAllSales = await salesModel.getAll();
//   return getAllSales;
// };

// const deleteById = async (id) => {
//   const deleteSale = await salesModel.deleteById(id);
//   if (deleteSale === null) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong id format',
//       },
//     };
//   }
//   return deleteSale;
// };


module.exports = {
  create,
  // updateById,
  // getAll,
  // findById,
  // deleteById
};
