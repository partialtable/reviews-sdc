//We can try to do 1.5mil at first
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();
const faker = require('faker');
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

//Config
const auth = require('./seedingConfig.js');

//helper functions
const generateRandomPhotoUrl = (url = 'https://www.example.com', num = (1 + Math.floor(Math.random() * 999))) => url + num.toString();
const randomBool = (random = Math.floor(Math.random() * 10)) => random % 2 === 0 ? true : false;

//Modular seed function
const seed = async (documentCount, csvName, collectionName, type, basePath = "/Users/pepe/pepe/HR/SDC/reviews-sdc/") => {
  //Create the CSV
  const createCSV = async (name = csvName) => {
    await writer.pipe(fs.createWriteStream(`${name}`));
    console.log(`Starting seeding @ ${name}`.bold);
    for (let i = 0; i < documentCount; i++) {
      const status = i === 1000 ? true : i === 10000 ? true : i === 100000 ? true : i === 500000 ? true : i === 999999 ? true : i === 1499999 ? true : i === 2000000 ? true : i === 2499999 ? true : false;
      if (status) {
        console.log(`Seeded ${i} / ${documentCount} records...`.blue);
      }
      if (type === 'users') {
        writer.write({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          location: faker.address.city(),
          avatar_url: generateRandomPhotoUrl()
        });
      } else if (type === 'restaurants') {
        const five = Math.random();
        const four = Math.random() * (1 - five);
        const three = Math.random() * (1 - (five + four));
        const two = Math.random() * (1 - (five + four + three));
        const one = Math.random() * (1 - (five + four + three + two));
        writer.write({
          name: faker.company.companyName(),
          num_of_reviews: Math.floor(Math.random() * 400),
          food_rating: (Math.random() * 5).toFixed(2),
          service_rating: (Math.random() * 5).toFixed(2),
          ambiance_rating: (Math.random() * 5).toFixed(2),
          overall_rating: (Math.random() * 5).toFixed(2),
          noise_level: faker.random.arrayElement(['do not recall', 'quiet', 'moderate', 'energetic']),
          one_star_percent: one.toFixed(2),
          two_star_percent: two.toFixed(2),
          three_star_percent: three.toFixed(2),
          four_star_percent: four.toFixed(2),
          five_star_percent: five.toFixed(2),
          would_recommend: randomBool(),
        });
      } else if (type === 'reviews') {
        writer.write({
          create_date: new Date(),
          description: faker.lorem.paragraph(),
          rating_food: (Math.random() * 5).toFixed(2),
          rating_service: (Math.random() * 5).toFixed(2),
          rating_ambience: (Math.random() * 5).toFixed(2),
          rating_overall: (Math.random() * 5).toFixed(2),
          noise_level: faker.random.arrayElement(['do not recall', 'quiet', 'moderate', 'energetic']),
          would_recommend: randomBool()
        });
      } else if (type === 'edge-reviews-users') {
        let reviewsDoc = `reviews/${i+1}`;
        let usersDoc = `users/${(1 + Math.floor(Math.random() * 999999))}`;
        writer.write({
          _to: usersDoc,
          _from: reviewsDoc
        });
      } else if (type === 'edge-restaurant-reviews') {
        let reviewsDoc = `reviews/${i+1}`;
        let restaurantDoc = `restaurants/${i+1}`;
        writer.write({
          _to: reviewsDoc,
          _from: restaurantDoc
        });
      }
    }
    console.log('CSV Generated, moving to import...'.green);
  }
  
  //Import Script
  const importCSV = async (path = basePath + csvName) => {
    console.log('Importing...'.bold);
    try {
      const { stdout, stderr } = await exec(`arangoimport --file ${path} --type csv --collection ${collectionName} --server.endpoint ${auth.ip} --server.database ${auth.name} --server.password ${auth.password}`);
      if (stdout) { console.log(`Output: ${stdout}`.green); }
      if (stderr) { console.log(`Err: ${stderr}`.red); }
    } catch (err) {
      console.log(`${err}`.red);
    }
  }

  //Delete File
  const deleteCSV = async (path = basePath + csvName) => {
    await fs.unlink(path, (err) => {
      if (err) {
        console.error(`${err}`.red);
      } else {
        console.log('File Deleted!'.green);
      }
    });
  }

  await createCSV();
  setTimeout(async () => { await importCSV(); setTimeout(async () => { await deleteCSV() }, 10000) }, 10000);
}

module.exports = seed;