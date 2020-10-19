insmod w1-gpio-custom bus0=0,19,0

# the following folder will become available
# /sys/devices/w1_bus_master1

# Removing a One-Wire Master
# rmmod w1-gpio-custom

# First let’s check to see if there are any slave devices at all:
# cat /sys/devices/w1_bus_master1/w1_master_slave_count

# read sensors' device ids
# cat /sys/devices/w1_bus_master1/w1_master_slaves

# Reading from an attached One-Wire device is very simple, just run the following:
# cat /sys/devices/w1_bus_master1/<DeviceID>/w1_slave

# awk -F= '/t=/ {printf "%.03f\n", $2/1000}' /sys/devices/w1_bus_master1/<DeviceID>/w1_slave