var axios = require('axios');
var {loadConfiguration} = require('./config');

const sendMeasurements = async (temperature1, temperature2) => {
  const config = loadConfiguration();
  
  const data = `sensors device=${config.deviceName},reading01=${temperature1},reading02=${temperature2}`;

  var requestConfig = {
    method: 'post',
    url: `${config.apiUrl}/write?db=${config.influxDatabase}`,
    headers: { 
      'Authorization': `Basic ${config.basicAuthToken}`, 
      'Content-Type': 'text/plain'
    },
    data : data
  };

  await axios(requestConfig)
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