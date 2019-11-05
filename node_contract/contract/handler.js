const sdk = require('dragonchain-sdk');

/**
 * One quick note on Logging from within a smart contract.
 * Never use STDOUT for logs. Always use STDERR to allow
 * dragonchain to split "output" and "logs" to diff streams.
 *
 * Remember:
 * `console.error` = log
 * `console.log` = output
 */

const log = (string) => console.error(`STDERR: ${string}`);

module.exports = async input => {
  // Lets create a dragonchain client to read some data from the blockchain.
  const client = await sdk.createClient();

  // Anyone calling your dragonchain may put a payload here which you can use
  // to drive your logic. In our case, we dont care about input. But it's here
  // when you need it.
  log(JSON.parse(input).payload);

  // Lets prep our output as an object literal. It can be anything, but when
  // we use valid JSON as output it allows us the ability to modify different
  // keys at once. In our case we only have one key ('myCounter'), but this is
  // really useful as your contracts grow in complexity.
  let output = {};

  // Here we are asking the Dragonchain to return a string value by its storage key.
  const { response, status } = await client.getSmartContractObject({ key: 'myCounter' });

  // If this request fails to locate anything it will return a status of 404
  // which just means we can assign this as 0 because all good things are 0 based.
  // ...I'm looking at YOU lua... ;)
  let myCounter = Number(status === 404 ? 0 : response);
  myCounter += 1;
  output = { myCounter };

  // One last log to show the result of our logic in the logs.
  // We can easily see the logs from our smart contract via STDOUT when testing,
  // or by using DCTL like so: `dctl contract logs <myContractId> --tail 100`.
  log(`Call Count: ${myCounter}`);

  // Note: There is no SET-SmartContractObject function in the SDK by-design.
  // You must allow the blockchain to save state to ensure consistency
  // of reads and writes between invocations.
  return output;
};
