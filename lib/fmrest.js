const requestify = require('requestify');
const Auth = require('./auth.js');
const RecordAPI = require('./record.js');

class Fmrest {
    constructor({ user, password, host, solution, layout }) {

        this.Auth = new Auth({ user, password, host, solution, layout });
        this.Record = new RecordAPI(this.Auth);
    }

    login() {
        return this.Auth.login();
    }

    logout() {
        return this.Auth.logout();
    }

    createRecord(json) {
        if(json === undefined)
            json = { "data": "{}" };
        else
            json = { "data": json };
        return this.Record.create(json);
    }

    deleteRecord(id) {
        return this.Record.delete(id);
    }

    editRecord(id, json, modId) {
        if(json === undefined)
            json = { "data": "{}" };
        else {
            json = { "data": json };
            if(modId !== undefined)
            json.modId = modId;
        }
        return this.Record.edit(id, json);
    }

    getRecord(id) {
        return this.Record.get(id);
    }

    getAllRecords() {
        return this.Record.getAll();
    }
}

module.exports = Fmrest;