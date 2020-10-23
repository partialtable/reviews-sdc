const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); --> No frontend yet
const { db, users, restaurants, reviews, edge, aql } = require('../arango/index.js');

//Set up server
const app = express();
const PORT = 3000;

//Set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true }));


//Set up port
app.listen(PORT, () => console.log(`Listening @ ${PORT}`));

//////////////////// GET ROUTES ///////////////////////////

//Get a specific user
app.get('/api/users/:userId', async (req, res) => {
  try {
    args = {
      document: `users/${req.params.userId}`
    };
    let data = await db.query(aql`
      RETURN DOCUMENT(${args.document})
    `);
    let json = {};
    for await (let key of data) {
      json['1'] = key;
    }
    res.json(json);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Get a specific restaurant
app.get('/api/restuarant/:resId', async (req, res) => {
  try {
    args= {
      document: `restaurant/${req.params.resId}`
    };
    let data = await db.query(aql`
      RETURN DOCUMENT(${args.document})
    `);
    let json = {};
    for await (let key of data) {
      json['1'] = key;
    }
    res.json(json);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Get all reviews from a restuarant + user info
app.get('/api/restaurant/:resId/reviews', async (req, res) => {
  try {
    args = {
      document: `restaurant/${req.params.resId}`
    }
    let data = await db.query(aql`
      FOR review in 1..2 OUTBOUND
      ${args.document} ${edge}
      RETURN review
    `);
    let json = {};
    let i = 1;
    for await (let key of data) {
      json[`${i}`] = key;
      i++;
    }
    res.json(json);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});
