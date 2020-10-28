const { Database, aql } = require('arangojs');
const config = require('./config.js');

//Connect to DB
const db = new Database(config);

//Connect to collections
const users = db.collection('users');
const restaurants = db.collection('restaurant');
const reviews = db.collection('reviews');
const edge = db.collection('edge');


//Export
module.exports = {
  db,
  users,
  restaurants,
  reviews,
  edge,
  aql
}
