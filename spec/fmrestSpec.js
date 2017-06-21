const Fmrest = require('../lib/fmrest.js');

describe('fmrest', () => {

    let filemaker;

    beforeAll(() => {

        filemaker = new Fmrest({
            user: "admin",
            password: "admin",
            host: "http://localhost",
            solution: "db",
            layout: "db"
        });
    });

    it('should login and return a token', (done) => {

        filemaker.login()
            .then(token => {
                expect(token).toBeDefined();
                console.log("Token: " + token);
                done();
            });
    });
});