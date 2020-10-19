const fs = require('fs');

const cat = async path => {
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  })
}

const readOneWire = async () => {
  console.log(await cat(`/sys/devices/w1_bus_master1/w1_master_slave_count`));
}

readOneWire();