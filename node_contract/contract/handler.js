'use strict'

module.exports = (input, callback) => {
    console.error('This is a log');
    const returnValue = `Hello from NodeJS contract: ${input}`;
    callback(undefined, returnValue);
}
