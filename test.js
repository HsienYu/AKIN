
var count = 254;
var counterIncrement = -1;
var counter = setInterval(timer, 50);

function timer() {
    count = count + counterIncrement;
    if (count == 0 || count == 254) {
        counterIncrement = -counterIncrement;
    }
    console.log(count);
}