const fs = require('fs');

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
      const result = await cat(`/sys/devices/w1_bus_master1/w1_master_slave_count`);
      return Number(result);
    },
    getReading: async deviceId => {
      const result = await cat(`/sys/devices/w1_bus_master1/${deviceId}/w1_slave`);
      return result;
    },
    getDevicesIds: async () => {
      const result = await cat(`/sys/devices/w1_bus_master1/w1_master_slaves`);
      return result.split('\n').filter(deviceId => deviceId !== '');
    }
  },
  sensor: {
    temperature: {
      getReading: async deviceId => {
        const reading = await this.bus.getReading(deviceId);
        return reading;
      }
    }
  }
}
const main = async () => {
  const numberOfDevices = await oneWire.bus.getNumberOfDevices();
  console.log(`Detected ${numberOfDevices} device${numberOfDevices > 1 ? 's' : ''}`);
  const deviceIds = await oneWire.bus.getDevicesIds();
  console.log(deviceIds);
  const temperatureReadingsPromises = deviceIds.map(deviceId => {
    const value = await oneWire.sensor.temperature.getReading(deviceId);
    return {
      deviceId,
      value
    }
  });

  const temperatureReadings = await Promise.all(temperatureReadingsPromises);
  temperatureReadings.forEach(reading => {
    console.log(`${reading.deviceId}: ${reading.value}`);
  })
}

main();