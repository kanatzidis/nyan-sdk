const https = require('https');

const API = {};

async function kvs({database, key, value, del}) {
  if(typeof database !== 'string') database = database.toString();
  if(key !== undefined && typeof key !== 'string') key = key.toString();
  if(value !== undefined && typeof value !== 'string') {
    if(typeof value === 'object') value = JSON.stringify(value);
    else value = value.toString();
  }
  if(database[0] === '`') throw new Error('Database names cannot start with `');
  if(key[0] === '`') throw new Error('Keys cannot start with `');

  var method = del ? 'DELETE'
    : (value === undefined
      ? 'GET' : 'PUT')

  return request({
    hostname: API.kvs.host,
    headers: { Authorization: API.kvs.token },
    path: `/${database}` + (key ? `/${key}` : ''),
    body: value,
    method
  });
}

async function request(options) {
  console.log(JSON.stringify(options));

  return new Promise((resolve, reject) => {
    var request = https.request(Object.assign(options, {port: 443}), response => {
      var data = '';

      response.on('error', reject);

      response.on('data', d => data += d);

      response.on('end', () => resolve(data));
    });

    request.on('error', reject);

    request.end(options.body);
  });
}

API.kvs = {
  host: 'kvs.nyan.sh',
  list: async (database) => {
    return kvs({database});
  },
  get: async (database, key) => {
    return kvs({database,key});
  },
  set: async (database, key, data) => {
    return kvs({database,key,value:data});
  },
  delete: async (database, key) => {
    return kvs({database,key,del:true});
  }
};


module.exports = API;
