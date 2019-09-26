const osc = require("osc");

const Gpio = require('pigpio').Gpio;

const led = new Gpio(18, { mode: Gpio.OUTPUT });

let dutyCycle = 0;
let counterIncrement = 1;


/****************
 * OSC Over UDP *
 ****************/

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    if (oscMessage.address == '/play') {
        setInterval(() => {

            dutyCycle = dutyCycle + counterIncrement;
            if (dutyCycle == 254) {
                counterIncrement = -counterIncrement;
            } else if (dutyCycle == 0) {
                counterIncrement = counterIncrement * -1;
            }
            led.pwmWrite(dutyCycle);
            //console.log(dutyCycle);

        }, 50);
        console.log('strip light goes up and down');
    }

    if (oscMessage.address == '/stop') {
        led.pwmWrite(0);
        console.log('strip light stop');
    }
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();