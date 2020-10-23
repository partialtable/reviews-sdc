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
let revId = 5000001;

//Main Script
const main = async () => {
  //CSV Generator
  const genUserCSV = async () => {
    await writer.pipe(fs.createWriteStream('edge.csv'));
    //Set amount of records here
    for (let i = 0; i < 5000000; i++) {
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
      let randomUsr = 1 + Math.floor(Math.random() * 1499998);
      let usr = `users/${randomUsr}`;
      let rev = `reviews/${revId}`
      writer.write({
        _to: usr,
        _from: rev
      });
      //Increment Key
      revId++;
    }
    console.log(`CSV Generation complete, generated ${idKey} records.`.blue);
    console.log('Moving onto importing, please allow a few seconds to connect...'.blue);
  }

  //Bash Script Executor
  const importCSV = async () => {
    console.log('Importing...'.red);
    try {
      const { stdout, stderr } = await exec(`arangoimport --file "/Users/pepe/pepe/HR/SDC/review-sdc/edge.csv" --type csv --collection "users" --server.database ${auth.name} --server.password ${auth.password}`);
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
    await fs.unlink("/Users/pepe/pepe/HR/SDC/review-sdc/edge.csv", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File [ edge.csv ] deleted'.red);
      }
    });
  }

  //Generate CSV
  await genUserCSV();
  //Copy
  const imported = await importCSV();
  //Delete file
  const deleted = await deleteCSV();
  if (imported && deleted) {
    console.log('Seeding completed'.green);
  } else {
    console.log('ERR Check scripts'.red);
  }
}

main();