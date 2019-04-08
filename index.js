const https = require('https');
const http = require('http');
const qs = require('querystring');

const API = {};

async function kvs({database, key, value, del, ttl}, options={}) {
  if(typeof ttl !== 'number') ttl = 0;
  if(database !== undefined && typeof database !== 'string') database = database.toString();
  if(key !== undefined && typeof key !== 'string') key = key.toString();
  if(value !== undefined && typeof value !== 'string') {
    if(typeof value === 'object') value = JSON.stringify(value);
    else value = value.toString();
  }
  if(database && database[0] === '`') throw new Error('Database names cannot start with `');
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

  const headers = {};

  if(API.kvs.token) headers['X-Api-Key'] = API.kvs.token;
  if(ttl) headers['X-Kvs-Ttl'] = ttl

  return request({
    hostname: API.kvs.host,
    port: API.kvs.port,
    headers: headers,
    path: API.kvs.prefix + (database ? `/${encodeURIComponent(database)}` : '') + (key ? `/${encodeURIComponent(key)}` : '') + query,
    body: value,
    method
  });
}

async function request(options) {

  return new Promise((resolve, reject) => {
    var request = options.port == 443
      ? https.request(Object.assign(options, {port: 443}), handleResponse)
      : http.request(options, handleResponse);
    function handleResponse(response) {
      var data = '';

      response.on('error', reject);

      response.on('data', d => data += d);

      response.on('end', () => resolve(response.headers['content-type'] === 'application/json' ? JSON.parse(data) : (data || null)));
    };

    request.on('error', reject);

    request.end(options.body);
  });
}

API.kvs = {
  host: 'kvs.nyan.sh',
  port: '443',
  prefix: '',
  listDbs: async () => {
    return kvs({});
  },
  list: async (database, {keys}={}) => {
    return kvs({database}, {keys});
  },
  get: async (database, key) => {
    return kvs({database,key});
  },
  set: async (database, key, data, ttl=0) => {
    return kvs({database,key,value:data,ttl});
  },
  delete: async (database, key) => {
    return kvs({database,key,del:true});
  },
  deleteDb: async(database) => {
    return kvs({database,del:true});
  }
};


module.exports = API;
