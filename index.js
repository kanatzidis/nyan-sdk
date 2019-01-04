const https = require('https');
const qs = require('querystring');

const API = {};

async function kvs({database, key, value, del}, options={}) {
  if(typeof database !== 'string') database = database.toString();
  if(key !== undefined && typeof key !== 'string') key = key.toString();
  if(value !== undefined && typeof value !== 'string') {
    if(typeof value === 'object') value = JSON.stringify(value);
    else value = value.toString();
  }
  if(database[0] === '`') throw new Error('Database names cannot start with `');
  if(key && key[0] === '`') throw new Error('Keys cannot start with `');

  var method = del ? 'DELETE'
    : (value === undefined
      ? 'GET' : 'PUT')

  var query = '';

  if(method === 'GET' && !key && options.keys) {
    query = options.keys === true
      ? '?keys'
      : `?keys=${options.keys.map(k => qs.escape(k)).join(',')}`
  }

  return request({
    hostname: API.kvs.host,
    headers: API.kvs.token ? { Authorization: API.kvs.token } : {},
    path: API.kvs.prefix + `/${database}` + (key ? `/${key}` : '') + query,
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

      response.on('end', () => console.log(data) || resolve(response.headers['content-type'] === 'application/json' ? JSON.parse(data) : data));
    });

    request.on('error', reject);

    request.end(options.body);
  });
}

API.kvs = {
  host: 'kvs.nyan.sh',
  prefix: '',
  list: async (database, {keys}) => {
    return kvs({database}, {keys});
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
