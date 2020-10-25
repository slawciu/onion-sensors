const csv = require('csv-parser');
const fs = require('fs');
const { sendMeasurements } = require('./api');


const main = async () => {

  const data = []

  fs.createReadStream('2020-10-20apartment_env-local.csv')
    .pipe(csv())
    .on('data', (row) => {
      // await sendMeasurements(row.reading01, row.reading02, row.time)
      // await new Promise(resolve => setTimeout(resolve, 1*1000));
  
      data.push(row); 
      console.log(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      const promises = data.map(row => {
        return sendMeasurements(row.reading01, row.reading02, row.time)
    });
  
    console.log("send data");
  
    await Promise.all(promises)
    });
  
 
}

main();