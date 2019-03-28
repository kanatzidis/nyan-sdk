const {kvs} = require('./');
const assert = require('assert');

kvs.host = 'localhost';
kvs.port = 1338;
kvs.token = process.env.KVS_TOKEN;

async function run() {

  // clear test dbs
  await kvs.deleteDb('kvs_tests');
  await kvs.deleteDb('kvs_tests2');
  assert.equal('{}', await kvs.list('kvs_tests'));
  assert.equal('{}', await kvs.list('kvs_tests2'));

  // define test k-v pairs
  const key1 = `als;lae;rlgajwe;afiwejflaSCefa'fawef;awefawefjew;f,W;WO/3//3 ?LA#(#R#O`
  const value1 = 'a less annoying value';
  const key2 = 'a sane key';
  const value2 = '1032u0qfjeafS#OP{"3q;';
  const key3 = 'users.myusername.token';
  const value3 = kvs.token;

  // set, list, get
  await kvs.set('kvs_tests', key1, value1);
  assert.equal(JSON.stringify({[key1]:value1}), await kvs.list('kvs_tests'));
  assert.equal('{}', await kvs.list('kvs_tests2'));
  await kvs.set('kvs_tests2', value1, key1);
  assert.equal(key1, await kvs.get('kvs_tests2', value1));
  assert.equal(null, await kvs.get('kvs_tests', 'fakekeyname'));

  // list dbs
  assert.deepEqual(['kvs_tests', 'kvs_tests2'], (await kvs.listDbs()).split('\n').sort());

  // set, delete
  await kvs.set('kvs_tests2', key2, value2);
  await kvs.set('kvs_tests2', key3, value3);
  assert.deepEqual(
    {
      [value1]:key1,
      [key2]:value2,
      [key3]:value3
    },
    JSON.parse(await kvs.list('kvs_tests2'))
  );
  await kvs.delete('kvs_tests2', key2);
  assert.deepEqual(
    {
      [value1]:key1,
      [key3]:value3
    },
    JSON.parse(await kvs.list('kvs_tests2'))
  );

  // delete db
  await kvs.deleteDb('kvs_tests');
  await kvs.deleteDb('kvs_tests2');
  assert.equal('{}', await kvs.list('kvs_tests'));
  assert.equal('{}', await kvs.list('kvs_tests2'));

  console.log('tests were successful');
}

run();
