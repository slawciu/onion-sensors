const fs = require('fs');

const cat = async path => {
  const data = await fs.readFile(path);
  return data;
}

const readOneWire = async () => {
  console.log(await cat(`/sys/devices/w1_bus_master1/w1_master_slave_count`));
}

readOneWire();