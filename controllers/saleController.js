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

const findById = rescue(async(req, res) => {
  const { id } = req.params;

  const getProductsById = await service.findById(id);
  if (getProductsById.err) return res.status(HTTP_NO_BODY_STATUS)
    .json(getProductsById);

  // console.log(getProductsById);
  return res.status(HTTP_OK_STATUS).json(getProductsById);
});

const updateById = rescue(async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await service.updateById(id, name, quantity);
  if (updateProduct.err) return res.status(HTTP_NO_BODY_STATUS)
    .json(updateProduct);

  console.log(updateProduct);
  return res.status(HTTP_OK_STATUS).json(updateProduct);
});

const deleteById = rescue(async(req, res) => {
  const { id } = req.params;

  const deleteProduct = await service.deleteById(id);
  if (deleteProduct.err) return res.status(HTTP_NO_BODY_STATUS)
    .json(deleteProduct);

  return res.status(HTTP_OK_STATUS).json(deleteProduct);
});

const getAll = rescue(async(_req, res) => {
  const getAllProducts = await service.getAll();
  return res.status(HTTP_OK_STATUS).json({products: getAllProducts});
});

const createController = rescue(async (req, res) => {
  const {name, quantity} = req.body;

  const productsCreated = await service.create(name, quantity);
  if (productsCreated.err) return res.status(HTTP_NO_BODY_STATUS)
    .json(productsCreated);

  return res.status(HTTP_CREATED_STATUS).json(productsCreated);
});

module.exports = {
  createController,
  getAll,
  findById,
  updateById,
  deleteById
};


