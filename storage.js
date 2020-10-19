const csvWriter = require('csv-write-stream');
const fs = require('fs');

const saveReadingsToCsv = (device, reading01, reading02) => {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream('./data/apartment_env-local.csv', {flags: 'a'}))
  writer.write({
    time: new Date().getTime(),
    device,
    reading01,
    reading02,
  })
  writer.end();
}

module.exports = {
  saveReadingsToCsv
}

