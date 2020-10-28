const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); --> No frontend yet
const { db, users, restaurants, reviews, edge, aql } = require('../arango/index.js');
const { format } = require('path');
const newrelic = require('newrelic');
//Clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  //Set up server
const app = express();
const PORT = 3000;
app.locals.newrelic = newrelic;
//Set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true }));


//Set up port
app.listen(PORT, () => console.log(`Listening @ ${PORT}`));

app.use(express.static(path.join(__dirname, '../public/')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

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
app.get('/api/restaurant/:resId', async (req, res) => {
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

//////////////////// POST ROUTES ///////////////////////////

//Create a user 
app.post('/api/users', async (req, res) => {
  try {
    const { first_name, last_name, avatar_url, location } = req.body;
    args = {
      firstName: first_name,
      lastName: last_name,
      avatar: avatar_url,
      location: location
    }
    console.log(`INSERT { firstName: ${args.firstName}, lastName: ${args.lastName}, avatar: ${args.avatar}, location: ${args.location} }`)
    let data = await db.query(aql`
      INSERT { firstName: ${args.firstName}, lastName: ${args.lastName}, avatar: ${args.avatar}, location: ${args.location} }
      INTO ${users}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Create a restaurant
app.post('/api/restaurant', async (req, res) => {
  try {
    const { 
      name, 
      num_of_reviews, 
      food_rating, 
      service_rating, 
      ambiance_rating, 
      overall_rating, 
      five_star_percent, 
      four_star_percent, 
      three_star_percent, 
      two_star_percent, 
      one_star_percent, 
      noise_level, 
      would_recommend 
    } = req.body;
    console.log(`INSERT { name: ${name}, num_of_reviews: ${num_of_reviews}, food_rating: ${food_rating}, service_rating: ${service_rating}, ambience_rating: ${ambiance_rating}, overall_rating: ${overall_rating}, five_star: ${five_star_percent}, four_star: ${four_star_percent}, three_star: ${three_star_percent}, two_star: ${two_star_percent}, one_star: ${one_star_percent}, noise_level: ${noise_level}, would_recommend: ${would_recommend} }`)
    let data = await db.query(aql`
    INSERT { name: ${name}, num_of_reviews: ${num_of_reviews}, food_rating: ${food_rating}, service_rating: ${service_rating}, ambience_rating: ${ambiance_rating}, overall_rating: ${overall_rating}, five_star: ${five_star_percent}, four_star: ${four_star_percent}, three_star: ${three_star_percent}, two_star: ${two_star_percent}, one_star: ${one_star_percent}, noise_level: ${noise_level}, would_recommend: ${would_recommend} }
      INTO ${restaurants}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Create a review
app.post('/api/restaurant/:resId/reviews', async (req, res) => {
  try {
    const {
      review_id,
      create_date,
      description,
      rating_overall,
      rating_food,
      rating_service,
      rating_ambience,
      noise_level,
      would_recommend
    } = req.body;
    const { resId } = req.params;
    let data = await db.query(aql`
      INSERT { review_id: ${review_id}, create_date: ${create_date}, description: ${description}, rating_overall: ${rating_overall}, rating_food: ${rating_food}, rating_service: ${rating_service}, rating_ambience: ${rating_ambience}, noise_level: ${noise_level}, would_recommend: ${would_recommend} }
      INTO {restaurant}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//////////////////// UPDATE ROUTES ///////////////////////////

//Helper functions
const formatInsertData = (obj) => {
  let result = {};
  for (let key in obj) {
    if (obj.key !== '') {
      result.key = obj.key;
    }
  }
  return result;
}


//Update a user
app.patch('/api/users/:userId', async (req, res) => {
  try {
    let keys = {
      first_name: req.body.first_name || '',
      last_name: req.body.last_name || '',
      avatar_url: req.body.avatar_url || '',
      location: req.body.location || ''
    };
    let args = {
      document: `users/${req.params.userId}` 
    };
    let insertData = formatInsertData(keys);
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.document})
      UPDATE doc WITH ${insertData} IN ${users}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Update a restaurant
app.patch('/api/restaurant/:resId', async (req, res) => {
  try {
    let keys = {
      name: req.body.name || '',
      num_of_reviews: req.body.num_of_reviews || '',
      food_rating: req.body.food_rating || '',
      service_rating: req.body.service_rating || '',
      ambience_rating: req.body.ambience_rating || '',
      overall_rating: req.body.overall_rating || '',
      five_star: req.body.five_star || '',
      four_star: req.body.four_star || '',
      three_star: req.body.three_star || '',
      two_star: req.body.two_star || '',
      one_star: req.body.one_star || '',
      noise_level: req.body.noise_level || '',
      would_recommend: req.body.would_recommend || ''
    };
    let args = {
      document: `restaurant/${req.params.resId}`
    };
    let inserData = formatInsertData(keys);
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.document})
      UPDATE doc WITH ${inserData} in ${restaurants}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Update a review
app.patch('/api/restaurant/:resId/reviews/:revId', async (req, res) => {
  try {
    let keys = {
      create_date: req.body.create_date || '',
      description: req.body.description || '',
      rating_overall: req.body.rating_overall || '',
      rating_food: req.body.rating_food || '',
      rating_service: req.body.rating_service || '',
      rating_ambience: req.body.rating_ambience || '',
      noise_level: req.body.noise_level || '',
      would_recommend: req.body.would_recommend || ''
    }
    let args = {
      resDoc: `restaurant/${req.params.resId}`,
      revDoc: `reviews/${req.params.revId}`
    }
    let insertData = formatInsertData(keys);
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.revDoc})
      UPDATE doc WITH ${insertData} IN ${reviews}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//////////////////// DELETE ROUTES ///////////////////////////

//Delete a specific restaurant
app.delete('/api/restaurant/:resId', async (req, res) => {
  try {
    let args = {
      document: `restaurant/${req.params.resId}`
    }
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.document})
      REMOVE doc IN ${restaurants}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Delete a specific user
app.delete('/api/users/:userId', async (req, res) => {
  try {
    args = {
      document: `users/${req.params.userId}`
    }
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.document})
      REMOVE doc IN ${users}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

//Delete a specific review
app.delete('/api/restaurant/:resId/reviews/:revId', async (req, res) => {
  try {
    const args = {
      document: `reviews/${req.params.revId}`
    }
    let data = await db.query(aql`
      LET doc = DOCUMENT(${args.document})
      REMOVE doc IN ${reviews}
    `);
    if (data) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
}
