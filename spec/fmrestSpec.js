const Fmrest = require('../lib/fmrest.js');

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
});