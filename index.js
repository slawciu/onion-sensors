const fs = require('fs');
const { sendMeasurements } = require('./api');
const { saveReadingsToCsv } = require('./storage');
const { loadConfiguration } = require('./config');

const cat = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  })
}

const oneWire = {
  bus: {
    getNumberOfDevices: async () => {
      try {
        const result = await cat(`/sys/devices/w1_bus_master1/w1_master_slave_count`);
        return Number(result);

      } catch (e) {
        console.log("One wire is disabled.");
        return 0;
      }
    },
    getDevicesIds: async () => {
      const result = await cat(`/sys/devices/w1_bus_master1/w1_master_slaves`);
      return result.split('\n').filter(deviceId => deviceId !== '');
    }
  },
  sensor: {
    temperature: {
      getReading: async deviceId => {
        const reading = await cat(`/sys/devices/w1_bus_master1/${deviceId}/w1_slave`);;
        
        const value = Number(reading.substr(reading.indexOf('t=')+2))/1000; 
        return {
          timestamp: new Date().getTime(),
          value,
          deviceId
        };
      }
    }
  }
}
const main = async () => {
  while (1) {

    const numberOfDevices = await oneWire.bus.getNumberOfDevices();
    console.log(`Detected ${numberOfDevices} device${numberOfDevices > 1 ? 's' : ''}`);
    const deviceIds = await oneWire.bus.getDevicesIds();
    console.log(deviceIds);
    const temperatureReadingsPromises = deviceIds.map(deviceId => {
      return oneWire.sensor.temperature.getReading(deviceId);
    });

    const temperatureReadings = await Promise.all(temperatureReadingsPromises);
    temperatureReadings.forEach(reading => {
      console.log(`[${new Date().toISOString()}]: ${reading.deviceId}: ${reading.value}`);
    })
    
    await sendMeasurements(temperatureReadings[0].value, temperatureReadings[1].value);
    
    const config = loadConfiguration();
    saveReadingsToCsv(config.deviceName, temperatureReadings[0].value, temperatureReadings[1].value)
    await new Promise(resolve => setTimeout(resolve, 30*000));
  }
}

main();