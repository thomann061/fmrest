/**
 * Commented out so travis ci build passes
 * Use these tests in your own environment.
 */

// const Fmrest = require('../lib/fmrest.js');

// describe('fmrest', () => {

//     const filemaker = new Fmrest({
//         user: "user",
//         password: "pass",
//         host: "host",
//         database: "db",
//         auth: "fmid", // basic or fmid
//     //  layout: "db"  // optional at time of login
//     });

//     filemaker.setLayout('db'); // need to supply layout eventually

//     beforeAll( async () => {

//         //login
//         await filemaker.login()
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { token } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(token).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             });
//     });

//     afterAll( async () => {
        
//         //logout
//         await filemaker.logout()
//             .then(body => {
//                 let { messages } = body;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 //console.log(JSON.stringify(body, null, 3));
//             });
//     });

//     it('should create a record with default values', async () => {

//         await filemaker.createRecord()
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { recordId } = response;
//                 let { modId } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(recordId).toBeDefined();
//                 expect(modId).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             });
//     });

//     it('should create a record with specified values', async () => {

//         const values = {
//             "name": "Bill",
//             "address": "102 park ave",
//             "date": "6/21/2017"
//         }

//         await filemaker.createRecord(values)
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { recordId } = response;
//                 let { modId } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(recordId).toBeDefined();
//                 expect(modId).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should delete a record', async () => {

//         await filemaker.deleteRecord(1)
//             .then(body => {
//                 let { messages } = body;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 //console.log(JSON.stringify(body, null, 3));
//             });
//     });

//     it('should edit a record', async () => {

//         const values = {
//             "name": "James",
//             "address": "105 lake dr",
//             "date": "6/22/2017"
//         }

//         await filemaker.editRecord(3, values)
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { modId } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(modId).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should get a record', async () => {

//         await filemaker.getRecord(3)
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should get a record with portal data as well', async () => {

//         let portal1 = filemaker.createPortal('portal1', 1, 2);

//         let portal2 = filemaker.createPortal('portal2', 1, 2);

//         await filemaker.getRecord(3, [portal1, portal2])
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             });
//     });

//     it('should get all records', async () => {

//         await filemaker.getAllRecords()
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should get all records with optional values', async () => {

//         let portal1 = filemaker.createPortal('portal1');
//         let portal2 = filemaker.createPortal('portal2');
//         let sort1 = filemaker.createSort('name', 'ascend');
//         let sort2 = filemaker.createSort('address', 'ascend');

//         await filemaker
//             .getAllRecords({
//                 offset: 1,
//                 range: 10,
//                 sorts: [sort1, sort2],
//                 portals: [portal1, portal2]
//             })
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform a find', async () => {

//         let request = filemaker.createRequest();
//         request.where('name').is('=bill');

//         await filemaker.find({requests: [request]})
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform a find with multiple requests', async () => {

//         let request = filemaker.createRequest();
//         request.where('name').is('=bill');

//         let request2 = filemaker.createRequest();
//         request2.where('name').is('=james');

//         await filemaker.find({requests: [request, request2]})
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform a find with omit request', async () => {

//         let request = filemaker.createRequest().where('name').is('*');

//         let request2 = filemaker.createRequest().where('address').is('102*');

//         await filemaker.find({requests: [request, request2.omit()]})
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform multiple finds with sort parameter', async () => {

//         let request = filemaker.createRequest().where('name').is('*');

//         let request2 = filemaker.createRequest().where('address').is('102*');

//         let sort = filemaker.createSort('name', 'ascend');

//         await filemaker
//             .find({
//                 requests: [request, request2], 
//                 sorts: [sort]
//             })
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform multiple finds with multiple sort parameters', async () => {

//         let request = filemaker.createRequest().where('name').is('*');

//         let request2 = filemaker.createRequest().where('address').is('102*');

//         let sort = filemaker.createSort('name', 'ascend');

//         let sort2 = filemaker.createSort('address', 'descend');

//         await filemaker
//             .find({
//                 requests: [request, request2], 
//                 sorts: [sort, sort2]
//             })
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should perform a find with all optional params', async () => {

//         let request = filemaker.createRequest().where('name').is('*');

//         let sort = filemaker.createSort('name', 'ascend');

//         let portal1 = filemaker.createPortal('portal1', 1, 1);

//         await filemaker
//             .find({
//                 requests: [request],
//                 sorts: [sort],
//                 offset: 2,
//                 limit: 10,
//                 portals: [portal1]
//             })
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should set a global(s) parameter', async () => {

//         let global1 = filemaker.createGlobal('db::global1', 'aValue');
//         let global2 = filemaker.createGlobal('db::global2', 'anotherValue');

//         await filemaker
//             .setGlobals([global1, global2])
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { data } = response;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(data).toBeDefined();
//                 console.log(JSON.stringify(body, null, 3));
//             })
//     });

//     it('should upload a file into a container field', async () => {

//         const containerFieldName = 'container';
//         const containerFieldRep = '1';
//         const recordId = '3';
//         const fs = require('fs');
//         const file = fs.createReadStream(`${__dirname}/filemaker_logo_vert.png`);

//         await filemaker
//             .uploadFile({ file, recordId, containerFieldName, containerFieldRep })
//             .then(body => {
//                 let { messages } = body;
//                 let { response } = body;
//                 let { code } = messages[0];
//                 expect(code).toBe('0');
//                 expect(response).toBeDefined();
//                 //console.log(JSON.stringify(body, null, 3));
//             })
//     });
// });