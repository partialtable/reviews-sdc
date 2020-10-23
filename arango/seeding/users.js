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


//Helper Functions
const generateRandomPhotoUrl = () => {
  let url = 'https://www.example.com/';
  let random = (1 + Math.floor(Math.random() * 999));
  return url + random.toString();
}

//Main Script
const main = async () => {
  //CSV Generator
  const genUserCSV = async () => {
    await writer.pipe(fs.createWriteStream('users.csv'));
    //Set amount of records here
    for (let i = 0; i < 1500000; i++) {
      //Status trackers
      if (i === 0) { console.log('Seeding Started...'); console.log(`\__________/`.rainbow); }
      else if (i === 10000) { console.log(`\$_________/`.rainbow); }
      else if (i === 100000) { console.log(`\$$________/`.rainbow); }
      else if (i === 250000) { console.log(`\$$$_______/`.rainbow); }
      else if (i === 500000) { console.log(`\$$$$______/`.rainbow); }
      else if (i === 750000) { console.log(`\$$$$$_____/`.rainbow); }
      else if (i === 1000000) { console.log(`\$$$$$$_____/`.rainbow); }
      else if (i === 1100000) { console.log(`\$$$$$$$___/`.rainbow); }
      else if (i === 1200000) { console.log(`\$$$$$$$$__/`.rainbow); }
      else if (i === 1300000) { console.log(`\$$$$$$$$$_/`.rainbow); }
      else if (i === 1499999) { console.log(`\$$$$$$$$$$/`.rainbow); }
      //Write to CSV file
      writer.write({
        _id: idKey,
        _key: idKey,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        location: faker.address.city(),
        avatar_url: generateRandomPhotoUrl()
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
      const { stdout, stderr } = await exec(`arangoimport --file "/Users/pepe/pepe/HR/SDC/review-sdc/users.csv" --type csv --collection "users" --server.database ${auth.name} --server.password ${auth.password}`);
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
    await fs.unlink("/Users/pepe/pepe/HR/SDC/review-sdc/users.csv", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File [ users.csv ] deleted'.red);
      }
    });
  }

  //Generate CSV
  await genUserCSV();
  //Copy
  const imported = await importCSV();
  //Delete file
  const deleted = await deleteCSV();
  //Status check
  if (imported === true && deleted === true) {
    console.log('File imported, and CSV deleted after import.'.green);
  } else {
    console.log('Error in one of the scripts'.red);
  }
}

main();