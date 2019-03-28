const {kvs} = require('./');
const assert = require('assert');

kvs.host = 'localhost';
kvs.port = 1338;
kvs.token = process.env.KVS_TOKEN;

async function run() {
  await kvs.deleteDb('kvs_tests');
  await kvs.deleteDb('kvs_tests2');
  assert.equal('{}', await kvs.list('kvs_tests'));
  assert.equal('{}', await kvs.list('kvs_tests2'));
  const key1 = `als;lae;rlgajwe;afiwejflaSCefa'fawef;awefawefjew;f,W;WO/3//3 ?LA#(#R#O`
  const value1 = 'a less annoying value';
  await kvs.set('kvs_tests', key1, value1);
  assert.equal(JSON.stringify({[key1]:value1}), await kvs.list('kvs_tests'));
  assert.equal('{}', await kvs.list('kvs_tests2'));
  console.log('tests were successful');
}

run();
