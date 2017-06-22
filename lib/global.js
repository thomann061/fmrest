const requestify = require('requestify');

class GlobalAPI {

    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/global/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    exec({ requests, sorts, offset, range, portal } = {}) {

        let body = {};
        
        if(Array.isArray(requests)) {
            let r = requests.map(el => el.toObj());
            body.query = [...r];
        }
        
        if(Array.isArray(sorts)) {
            let s = sorts.map(el => el.toObj());
            body.sort = [...s];
        }

        body.offset = offset;

        body.range = range;

        if(Array.isArray(portal))
            body.portal = portal;

        let json = body;

        return requestify.post(this.url, json, this.Auth.getOptions())
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

module.exports = GlobalAPI;