const express = require('express');
// const {validateProduct} = require('../middlewares/productMiddleware');

const router = express.Router();

const {
  getAll,
  createController,
  findById,
  updateById,
  deleteById
} = require('../controllers/productController');

router.get('/', getAll);

router.post('/', createController);

router.get('/:id', findById);

router.put('/:id', updateById);

router.delete('/:id', deleteById);




module.exports = router;
