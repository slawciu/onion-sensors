var axios = require('axios');

const sendMeasurements = async (temperature1, temperature2) => {
  const data = `sensors device=${process.env.DEVICE_NAME},reading01=${temperature1},reading02=${temperature2}`;

  var config = {
    method: 'post',
    url: `${process.env.API_URL}/write?db=${process.env.INFLUX_DATABASE}`,
    headers: { 
      'Authorization': `Basic ${process.env.API_URL}`, 
      'Content-Type': 'text/plain'
    },
    data : data
  };

  await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
};

module.exports = {
  sendMeasurements
}