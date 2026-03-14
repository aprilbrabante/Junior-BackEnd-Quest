function timer(startTime) {
    const endTime = Date.now();
    // endTime - startTime gives the elapsed time in milliseconds between start and end.
    // Dividing by 1000 converts it to seconds, because there are 1000 milliseconds in 1 second.
    // .toFixed(2) rounds the result to 2 decimal places
    return ((endTime - startTime) / 1000).toFixed(2);
}

module.exports = timer;