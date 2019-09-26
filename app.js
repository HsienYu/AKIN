const Gpio = require('pigpio').Gpio;

const led = new Gpio(18, { mode: Gpio.OUTPUT });

let dutyCycle = 0;
let counterIncrement = 1;

setInterval(() => {

    dutyCycle = dutyCycle + counterIncrement;
    if (dutyCycle == 254) {
        counterIncrement = -counterIncrement;
    } else if (dutyCycle == 0) {
        counterIncrement = counterIncrement * -1;
    }
    //led.pwmWrite(dutyCycle);
    console.log(dutyCycle);

}, 50);