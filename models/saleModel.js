const connection = require('./connection');
const {ObjectID} = require('mongodb');

const create = async (productId, quantity) => {
  const {insertedId} = await connection()
    .then((db) => db.collection('sales').insertMany({
      productId,
      quantity,
    }));
  return {
    _id: insertedId,
    itensSold: [
      productId,
      quantity,
    ]
  };
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => (result));
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const products = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectID(id)}));
  // console.log(products);
  // .then((result) => result);
  return products;
};

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection('sales').findOne({
      name,
    })
      .then((result) => (result)));
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  const products = await db.collection('sales')
    .updateOne({_id: ObjectID(id)}, {$set: {name, quantity}});
  return products;
};

const deleteById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const db = await connection();
  const products = await db.collection('sales')
    .deleteOne({_id: ObjectID(id)});
  return products;
};

module.exports = {
  getAll,
  findByName,
  create,
  findById,
  updateById,
  deleteById
};
