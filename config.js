const loadConfiguration = () => {
  const apiUrlIndex = process.argv.indexOf('--api-url');
  const deviceNameIndex = process.argv.indexOf('--device-name');
  const influxDatabaseIndex = process.argv.indexOf('--influx-database');
  const basicAuthTokenIndex = process.argv.indexOf('--basic-auth-token');
  const readingFrequencyIndex = process.argv.indexOf('--read-every-s')
  return {
    apiUrl: process.argv[apiUrlIndex + 1],
    deviceName: process.argv[deviceNameIndex + 1],
    influxDatabase: process.argv[influxDatabaseIndex + 1],
    basicAuthToken: process.argv[basicAuthTokenIndex + 1],
    readingFrequency: Number(process.argv[readingFrequencyIndex + 1]),
  }
}

module.exports = {
  loadConfiguration
}