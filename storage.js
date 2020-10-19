var csvWriter = require('csv-write-stream');

const saveReadingsToCsv = (device, reading01, reading02) => {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream('./data/aparmtent_env-local.csv'))
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

