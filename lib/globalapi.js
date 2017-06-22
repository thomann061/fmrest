const requestify = require('requestify');

class GlobalAPI {

    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/global/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
        this.globalObj = {};
    }

    exec(globals) {

        let body = {};
        body.globalFields = {};

        if(Array.isArray(globals)) {
            globals.map(el => {
                return Object.assign(body.globalFields, el.toObj());
            });   
        }

        let json = body;

        return requestify.put(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return true;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = GlobalAPI;