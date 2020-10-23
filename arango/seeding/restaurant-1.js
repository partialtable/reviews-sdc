//Dependencies
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();
const faker = require('faker');
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//DB Info
const auth = require('./seedingConfig.js');

//Counters
let idKey = 1;
let resCounter = 1;


//Helper functions
const randomBool = (random = Math.floor(Math.random() * 10)) => random % 2 === 0 ? true : false;

//Main Script
const main = async () => {
  //CSV Generator
  const genUserCSV = async () => {
    await writer.pipe(fs.createWriteStream('restaurant.csv'));
    //Set amount of records here
    for (let i = 0; i < 2500000; i++) {
      //Status trackers
      if (i === 0) { console.log('Seeding Started...'); console.log(`\__________/`.rainbow); }
      else if (i === 10000) { console.log(`\$_________/`.rainbow); }
      else if (i === 100000) { console.log(`\$$________/`.rainbow); }
      else if (i === 250000) { console.log(`\$$$_______/`.rainbow); }
      else if (i === 500000) { console.log(`\$$$$______/`.rainbow); }
      else if (i === 750000) { console.log(`\$$$$$_____/`.rainbow); }
      else if (i === 1000000) { console.log(`\$$$$$$_____/`.rainbow); }
      else if (i === 1250000) { console.log(`\$$$$$$$___/`.rainbow); }
      else if (i === 1499999) { console.log(`\$$$$$$$$__/`.rainbow); }
      else if (i === 2000000) { console.log(`\$$$$$$$$$_/`.rainbow); }
      else if (i === 2499999) { console.log(`\$$$$$$$$$$/`.rainbow); }
      //Write to CSV file
      writer.write({
        _key: idKey,
        _id: idKey,
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
      //Increment Key
      idKey++;
    }
    console.log(`CSV Generation complete, generated ${idKey} records.`.blue);
    console.log('Moving onto importing, please allow a few seconds to connect...'.blue);
  }

  //Bash Script Executor
  const importCSV = async () => {
    console.log('Importing...'.red);
    try {
      const { stdout, stderr } = await exec(`arangoimport --file "/Users/pepe/pepe/HR/SDC/review-sdc/restaurant.csv" --type csv --collection "users" --server.database ${auth.name} --server.password ${auth.password}`);
      console.log(`stdout --> ${stdout}`.blue);
      console.log(`stderr --> ${stderr}`.blue);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Delete file to clear space (Optional on box's with more storage)
  const deleteCSV = async () => {
    await fs.unlink("/Users/pepe/pepe/HR/SDC/review-sdc/restaurant.csv", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File [ restaurant.csv ] deleted'.red);
      }
    });
  }

  //Run the next chain
  const runNext = async () => {
    try {
      const { stdout, stderr } = await exec('npm run seed-res-1');
      console.log(`stdout --> ${stdout}`.green);
      console.log(`stderr --> ${stderr}`.red);
    } catch (err) {
      console.log(err);
    }
  }

  //Generate CSV
  await genUserCSV();
  //Copy
  const imported = await importCSV();
  //Delete file
  const deleted = await deleteCSV();
  //Move onto new docs
  const next = await runNext();
  if (imported && deleted && next) {
    console.log('Seeding completed'.green);
  } else {
    console.log('ERR Check scripts'.red);
  }
}

main();