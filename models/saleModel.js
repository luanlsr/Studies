const connection = require('./connection');
const {ObjectID} = require('mongodb');

const create = async (itensSold) => {
  
  const sale = await connection()
    .then((db) => db.collection('sales').insertMany([{
      itensSold
    }]));
  // console.log(sale);
  // console.log(arrayOfSales);

  return {
    _id: Object.values(sale.insertedIds).toString(),
    itensSold
  };
};

const getAll = async () => {
  const itensSold = connection()
    .then((db) => db.collection('sales').find().toArray());
  return itensSold
  ;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const sales = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectID(id)}));

  return sales;
};

const updateById = async (id, productId, quantity) => {
  const db = await connection();
  const sales = await db.collection('sales')
    .updateOne({_id: ObjectID(id)}, {$set: {productId, quantity}});
  const findOne = findById(id);
  return findOne;
};

// const findByName = async (name) => {
//   return connection()
//     .then((db) => db.collection('sales').findOne({
//       name,
//     })
//       .then((result) => (result)));
// };


// const deleteById = async (id) => {
//   if (!ObjectID.isValid(id)) {
//     return null;
//   }
//   const db = await connection();
//   const products = await db.collection('sales')
//     .deleteOne({_id: ObjectID(id)});
//   return products;
// };

module.exports = {
  create,
  getAll,
  findById,
  // findByName,
  updateById,
  // deleteById
};
