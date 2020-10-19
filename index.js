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
      console.log(await cat(`/sys/devices/w1_bus_master1/w1_master_slave_count`));
    }
  }
}
const main = async () => {
  const numberOfDevices = await oneWire.bus.getNumberOfDevices();
  console.log(numberOfDevices);
}

main();