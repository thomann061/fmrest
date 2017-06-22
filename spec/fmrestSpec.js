const Fmrest = require('../lib/fmrest.js');
const Request = require('../lib/request.js');

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

        filemaker.find(request)
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

        filemaker.find([request, request2])
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });

    it('should perform a find with omit request', (done) => {

        let request = new Request().where('name').is('*');

        let request2 = new Request().where('address').is('102*');

        filemaker.find([request, request2.omit()])
            .then(records => {
                expect(records).toBeDefined();
                done();
            })
    });
});