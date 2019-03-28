# @nyan.sh/sdk

A Node.js SDK for https://nyan.sh

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

```
await kvs.get('dbname', 'key');
```

#### `kvs.set(database name, key name, value)`

```
await kvs.set('dbname', 'key', 'value');
```

#### `kvs.set(database name, key name, value)`

```
await kvs.set('dbname', 'key', 'value');
```

#### `kvs.set(database name, key name, value)`

```
await kvs.set('dbname', 'key', 'value');
```

#### `kvs.set(database name, key name, value)`

```
await kvs.set('dbname', 'key', 'value');
```

## License

MIT
