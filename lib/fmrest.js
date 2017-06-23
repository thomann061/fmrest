const requestify = require('requestify');
const AuthAPI = require('./authapi.js');
const RecordAPI = require('./recordapi.js');
const FindAPI = require('./findapi.js');
const GlobalAPI = require('./globalapi.js');
const Request = require('../lib/request.js');
const Sort = require('../lib/sort.js');
const Global = require('../lib/global.js');
const Portal = require('../lib/portal.js');

class Fmrest {
    constructor({ user, password, host, solution, layout }) {

        this.Auth = new AuthAPI({ user, password, host, solution, layout });
        this.Record = new RecordAPI(this.Auth);
        this.Find = new FindAPI(this.Auth);
        this.Global = new GlobalAPI(this.Auth);
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

    getRecord(id, portals) {
        return this.Record.get(id, portals);
    }

    getAllRecords() {
        return this.Record.getAll();
    }

    find({requests, sorts, offset, range, portal}) {
        return this.Find.exec({requests, sorts, offset, range, portal});
    }

    setGlobals(globals) {
        return this.Global.exec(globals);
    }

    createRequest() {
        return new Request();
    }

    createSort(field, order) {
        return new Sort(field, order);
    }

    createGlobal(field, value) {
        return new Global(field, value);
    }

    createPortal(name, offset, range) {
        return new Portal(name, offset, range);
    }
}

module.exports = Fmrest;