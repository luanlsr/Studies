const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS
} = require('../helpers/helpers');

app.use(bodyParser.json());
const rescue = require('express-rescue');
const service = require('../services/saleService');


const createController = rescue(async (req, res) => {
  const {productId, quantity} = req.body;
  
  const saleCreated = await service.create(productId, quantity);
  if (saleCreated.err) return res.status(HTTP_NO_BODY_STATUS)
    .json(saleCreated);

  return res.status(HTTP_OK_STATUS).json(saleCreated);
});


// const findById = rescue(async(req, res) => {
//   const { id } = req.params;

//   const getProductsById = await service.findById(id);
//   if (getProductsById.err) return res.status(HTTP_NO_BODY_STATUS)
//     .json(getProductsById);

//   // console.log(getProductsById);
//   return res.status(HTTP_OK_STATUS).json(getProductsById);
// });


// const updateById = rescue(async(req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const updateProduct = await service.updateById(id, name, quantity);
//   if (updateProduct.err) return res.status(HTTP_NO_BODY_STATUS)
//     .json(updateProduct);

//   console.log(updateProduct);
//   return res.status(HTTP_OK_STATUS).json(updateProduct);
// });


// const deleteById = rescue(async(req, res) => {
//   const { id } = req.params;

//   const deleteProduct = await service.deleteById(id);
//   if (deleteProduct.err) return res.status(HTTP_NO_BODY_STATUS)
//     .json(deleteProduct);

//   return res.status(HTTP_OK_STATUS).json(deleteProduct);
// });


// const getAll = rescue(async(_req, res) => {
//   const getAllProducts = await service.getAll();
//   return res.status(HTTP_OK_STATUS).json({products: getAllProducts});
// });

module.exports = {
  createController,
  // updateById,
  // getAll,
  // findById,
  // deleteById
};


