// @ts-check

const mongoose = require('mongoose');
const schema = require('./schema/index');

const db = mongoose.connection;
const model = (() => {
  db.on('error', console.error);
  db.on('open', () => {
    /* eslint-disable no-console */
    console.log('Connecting mongodb!');
  });

  // mongodb 서버와 연결
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.qemkv.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
  );

  const schemaModel = {};
  Object.keys(schema).forEach((key) => {
    schemaModel[key] = mongoose.model(key, schema[key]);
  });

  return schemaModel;
})();

module.exports = model;
