const requestify = require('requestify');
const Request = require('./request.js');

class FindAPI {

    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/find/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    exec(request) {
        
        let query;
        if(Array.isArray(request)) {
            let r = request.map(el => el.toObj());
            query = { query: [...r] };
        } else
            query = { query: [request.toObj()] };

        let json = query;

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

module.exports = FindAPI;