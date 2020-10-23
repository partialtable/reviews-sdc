const { Database, aql } = require('arangojs');
const config = require('./config.js');

//Connect to DB
const db = new Database(config);

//Connect to collections
const users = db.collection('users');
const restaurants = db.collection('restaurants');
const reviews = db.collection('reviews');
const edge = db.collection('edge');

//Export
module.exports = {
  users,
  restaurants,
  reviews,
  edge
}
