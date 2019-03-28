# @nyan.sh/sdk

A Node.js SDK for <a href="https://nyan.sh">https://nyan.sh</a>

See also: <a href="https://docs.nyan.sh">https://docs.nyan.sh</a>

## Installation

```
npm i --save @nyan.sh/sdk
```

## Usage

All functions return promises.

### `kvs`

```
const {kvs} = require('@nyan.sh/sdk');

kvs.token = 'paste your token from https://app.nyan.sh/#/settings';

await kvs.set('dbname', 'key', 'value');
console.log(kvs.get('dbname', 'key')); // 'value'
```

#### `kvs.set(database name, key name, value)`

`database name` - any string that does not begin with a backtick ``` ` ```, does not need to already exist

`key name` - any string that does not begin with a backtick ``` ` ```

`value` - any string

#### `kvs.get(database name, key name)`

Returns a string, or null if the database or key is not found.

#### `kvs.delete(database name, key name)`

#### `kvs.list(database name)`

Returns a stringified JSON object containing the key-value pairs for the requested database.

#### `kvs.listDbs()`

Returns a newline-delimited list of database names.

#### `kvs.deleteDb(database name)`

## License

MIT
