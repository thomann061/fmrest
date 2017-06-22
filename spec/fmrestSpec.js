const Fmrest = require('../lib/fmrest.js');
const Request = require('../lib/request.js');
const Sort = require('../lib/sort.js');
const Global = require('../lib/global.js');

describe('fmrest', () => {

    const filemaker = new Fmrest({
        user: "admin",
        password: "admin",
        host: "http://localhost",
        solution: "db",
        layout: "db"
    });

    beforeAll((done) => {

        //login
        filemaker.login()
            .then(token => {
                expect(token).toBeDefined();
                done();
            });

    });

    afterAll((done) => {
        
        //logout
        filemaker.logout()
            .then(isLoggedOut => {
                expect(isLoggedOut).toBe(true);
                done();
            });
    });

    // it('should create a record with default values', (done) => {

    //     filemaker.createRecord()
    //         .then(id => {
    //             expect(id).toBeDefined();
    //             done();
    //         })
    // });

    // it('should create a record with specified values', (done) => {

    //     const values = {
    //         "name": "Bill",
    //         "address": "102 park ave",
    //         "date": "6/21/2017"
    //     }

    //     filemaker.createRecord(values)
    //         .then(id => {
    //             expect(id).toBeDefined();
    //             done();
    //         })
    // });

    // it('should delete a record', (done) => {

    //     filemaker.deleteRecord(2)
    //         .then(isDeleted => {
    //             expect(isDeleted).toBe(true);
    //             done();
    //         })
    // });

    // it('should edit a record', (done) => {

    //     const values = {
    //         "name": "James",
    //         "address": "105 lake dr",
    //         "date": "6/22/2017"
    //     }

    //     filemaker.editRecord(2, values)
    //         .then(isEdited => {
    //             expect(isEdited).toBe(true);
    //             done();
    //         })
    // });

    it('should get a record', (done) => {

        filemaker.getRecord(18)
            .then(record => {
                expect(record).toBeDefined();
                done();
            })
    });

    it('should get all records', (done) => {

        filemaker.getAllRecords()
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform a find', (done) => {

        let request = new Request();
        request.where('name').is('=bill');

        filemaker.find({requests: [request]})
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform a find with multiple requests', (done) => {

        let request = new Request();
        request.where('name').is('=bill');

        let request2 = new Request();
        request2.where('name').is('=james');

        filemaker.find({requests: [request, request2]})
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform a find with omit request', (done) => {

        let request = new Request().where('name').is('*');

        let request2 = new Request().where('address').is('102*');

        filemaker.find({requests: [request, request2.omit()]})
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform multiple finds with sort parameter', (done) => {

        let request = new Request().where('name').is('*');

        let request2 = new Request().where('address').is('102*');

        let sort = new Sort('name', 'ascend');

        filemaker
            .find({
                requests: [request, request2], 
                sorts: [sort]
            })
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform multiple finds with multiple sort parameters', (done) => {

        let request = new Request().where('name').is('*');

        let request2 = new Request().where('address').is('102*');

        let sort = new Sort('name', 'ascend');

        let sort2 = new Sort('address', 'descend');

        filemaker
            .find({
                requests: [request, request2], 
                sorts: [sort, sort2]
            })
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform a find with all optional params', (done) => {

        let request = new Request().where('name').is('*');

        let sort = new Sort('name', 'ascend');

        filemaker
            .find({
                requests: [request],
                sorts: [sort],
                offset: '1',
                range: '10',
                portal: ['portal1']
            })
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should set a global(s) parameter', (done) => {

        let global1 = new Global('global1', 'aValue');
        let global2 = new Global('global2', 'anotherValue');

        filemaker
            .setGlobals([global1, global2])
            .then(isSet => {
                expect(isSet).toEqual(true);
                done();
            })
    });
});