const requestify = require('requestify');

class RecordAPI {

    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/record/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    create(json) {

        return requestify.post(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                
                return body.recordId;
            })
            .catch(err => {
                console.log(err);
            });
    }

    delete(id) {

        return requestify.delete(`${this.url}/${id}`, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return true;
                return false;
            })
            .catch(err => {
                console.log(err);
            });
    }

    edit(id, json) {

        return requestify.put(`${this.url}/${id}`, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return true;
                return false;
            })
            .catch(err => {
                console.log(err);
            });
    }

    get(id) {

        return requestify.get(`${this.url}/${id}`, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return body.data;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAll() {

        return requestify.get(this.url, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return body.data;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = RecordAPI;