# Onion Sensors

This repository contains some code to read sensors readings connected to the Omega Onion device.

## Setup

Connect to your omega and put the code in there (scp or git). Fill `startup.sh` with proper values and add `startup.sh` and `setup.sh` to startup scripts:

```
vi /etc/rc.local
```

add here:

```
sh ~/onion-sensors/setup.sh
```

and

```
sh ~/onion-sensors/startup.sh
```

## OneWire

Connect OneWire devices to GPIO of your choice (mine is 19) and run the command:

```
insmod w1-gpio-custom bus0=0,19,0
```

the following folder will become available

```
/sys/devices/w1_bus_master1
```

To remove a One-Wire Master and restore GPIO, just run:

```
rmmod w1-gpio-custom
```

First let’s check to see if there are any slave devices at all:

```
cat /sys/devices/w1_bus_master1/w1_master_slave_count
```

Read sensors' device ids

```
cat /sys/devices/w1_bus_master1/w1_master_slaves
```

Reading from an attached One-Wire device is very simple, just run the following:

```
cat /sys/devices/w1_bus_master1/<DeviceID>/w1_slave
```

Human readable format

```
awk -F= '/t=/ {printf "%.03f\n", \$2/1000}' /sys/devices/w1_bus_master1/<DeviceID>/w1_slave
```

## Development

Install packages on Onion device:

```
node --max_old_space_size=64 $(which npm) install <package-name>
```
