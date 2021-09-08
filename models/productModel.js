const connection = require('./connection');
const {ObjectID} = require('mongodb');

const create = async (name, quantity) => {
  const {insertedId} = await connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity,
    }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => (result));
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const products = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectID(id)}));
  // console.log(products);
  // .then((result) => result);
  return products;
};

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({
      name,
    })
      .then((result) => (result)));
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  const products = await db.collection('products')
    .updateOne({_id: ObjectID(id)}, {$set: {name, quantity}});
  const findOne = findById(id);
  return findOne;
};

const deleteById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const db = await connection();
  const products = await db.collection('products')
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
