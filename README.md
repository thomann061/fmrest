# FMREST
[![Build Status](https://travis-ci.org/thomann061/fmrest.svg?branch=master)](https://travis-ci.org/thomann061/fmrest)
[![npm version](https://badge.fury.io/js/fmrest.svg)](https://badge.fury.io/js/fmrest)

A javascript wrapper for Filemaker's Data API (REST API)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install Filemaker Server 16 and enable the Data API.  To do my testing I disabled the https protocol on Filemaker's IIS server.  I have also supplied my testing file - db.fmp12.

## Running the tests

Run all tasks including tests:

```javascript
npm i gulp-cli -g
gulp
```

Run only tests:

```javascript
jasmine
```

Note: fmrestSpec.js is commented out, uncomment when you have a filemaker server 16 environment setup.

## API Code Samples

Almost every function returns a Promise except createRequest, createGlobal and createSort.

### Configuration

```javascript
npm install fmrest


const Fmrest = require('fmrest');


// Set configuration
const filemaker = new Fmrest({
    user: "admin",
    password: "admin",
    host: "http://localhost",
    solution: "db",
    layout: "db"
});
```

### Authentication

```javascript
// Login
filemaker
    .login()
    .then(token => {
        console.log(token);
    });


// Logout
filemaker
    .logout()
    .then(isLoggedOut => {
        console.log(isLoggedOut);
    });
```

### Records

```javascript
// Create Record
const values = {
    "name": "Bill",
    "address": "102 park ave",
    "date": "6/21/2017"
}

filemaker
    .createRecord(values) // if empty, creates record w/ default values
    .then(id => {
        console.log(id);
    });


// Delete Record
filemaker
    .deleteRecord(2) // supply with Filemaker's unique interal recordID
    .then(isDeleted => {
        console.log(isDeleted);
    })


// Edit Record
const values2 = {
    "name": "James",
    "address": "105 lake dr",
    "date": "6/22/2017"
}

filemaker
    .editRecord(2, values2)
    .then(isEdited => {
        console.log(isEdited);
    })


// Get Record
filemaker
    .getRecord(3)
    .then(record => {
        console.log(record);
    })


// Get Record w/ Portal Data
let portal1 = filemaker
    .createPortal('portal1', 1, 2); // (portal name, offset, range)
                                    // offset and range are optional
let portal2 = filemaker
    .createPortal('portal2', 1, 2);

filemaker
    .getRecord(3, [portal1, portal2])
    .then(record => {
        console.log(record);
    });


// Get All Records
filemaker
    .getAllRecords()
    .then(records => {
        console.log(records);
    })


// Get All Records w/ Portal Data, sorting, offset and range
let portal1 = filemaker
    .createPortal('portal1');

let sort1 = filemaker
    .createSort('name', 'ascend');

filemaker
    .getAllRecords({
        offset: 1,
        range: 10,
        sorts: [sort1],
        portals: [portal1]
    })
    .then(records => {
        console.log(records);
    });
```

### Finds

```javascript
// Find Records
let request = filemaker
    .createRequest()
    .where('name').is('=bill');

filemaker
    .find({requests: [request]})
    .then(records => {
        console.log(records);
    })


// Find w/ multiple requests
let request = filemaker
    .createRequest()
    .where('name').is('=bill')
    .where('address').is('102*');

let request2 = filemaker
    .createRequest()
    .where('name').is('=james');

filemaker               // Append .omit() to make the request omit records
    .find({requests: [request.omit(), request2]})
    .then(records => {
        console.log(records);
    })


// Find w/ multiple requests and sorting
let request = filemaker
    .createRequest()
    .where('name').is('*');

let request2 = filemaker
    .createRequest()
    .where('address')
    .is('102*');

let sort = filemaker
    .createSort('name', 'ascend');

let sort2 = filemaker
    .createSort('address', 'descend');

filemaker
    .find({
        requests: [request, request2],
        sorts: [sort, sort2]
    })
    .then(records => {
        console.log(records);
    })


// Find w/ all optional parameters
let request = filemaker
    .createRequest()
    .where('name').is('*');

let sort = filemaker
    .createSort('name', 'ascend');

filemaker
    .find({
        requests: [request],
        sorts: [sort],      // optional
        offset: '1',        // optional
        range: '10',        // optional
        portal: ['portal1'] // optional
    })
    .then(records => {
        console.log(records);
    })
```

### Set Global Fields

```javascript
// Set Global Fields
let global1 = filemaker
    .createGlobal('global1', 'aValue');

let global2 = filemaker
    .createGlobal('global2', 'anotherValue');

filemaker
    .setGlobals([global1, global2])
    .then(isSet => {
        console.log(isSet);
    })
```

## TODO

- [x] Add ability to get portal data with getRecord
- [x] Add ability to get portal data with getAllRecords
- [ ] Global fields were not actually "setting" for me
- [ ] Add offset and range parameters for portals under Find (eg. offset.Portal1)

## Resources

[Filemaker Data API Guide](https://fmhelp.filemaker.com/docs/16/en/restapi/)

[Better API Guide here if you have Filemaker Server 16 installed](http://localhost/fmi/rest/apidoc/)

## Contributing / Code of Conduct

Please read [CONTRIBUTING.md](https://github.com/thomann061/fmrest/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/thomann061/fmrest/blob/master/CODE_OF_CONDUCT.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details