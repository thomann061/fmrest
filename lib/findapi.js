const requestify = require('requestify');

/**
 * Class representing a Find API
 */
class FindAPI {

    /**
     * Create a new Find API
     * @param {AuthAPI} Auth - Authorization to the API 
     */
    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/find/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    /**
     * Execute the find
     * @param {Object} obj - An object
     * @param {Array} obj.requests - An array of {@link Request} Objects
     * @param {Array} obj.sorts - An array of {@link Sort} Objects
     * @param {number} obj.offset - starting point of records to return
     * @param {number} obj.range - how many records should be returned
     * @param {Array} obj.portals - An array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with multiple records
     * 
     */
    exec({ requests, sorts, offset, range, portals } = {}) {

        let body = {};
        
        if(Array.isArray(requests)) {
            let r = requests.map(el => el.toObj());
            body.query = [...r];
        }
        
        if(Array.isArray(sorts)) {
            let s = sorts.map(el => el.toObj());
            body.sort = [...s];
        }
        
        if(offset !== undefined)
            body.offset = offset.toString();

        if(range !== undefined)
            body.range = range.toString();

        if(Array.isArray(portals)) {
            let portalNames = [];

            portals.forEach(el => {
                let obj = el.toObj();

                if(obj.offset !== null) {
                    let key = `offset.${obj.name}`;
                    body[key] = obj.offset.toString();
                }

                if(obj.range !== null) {
                    let key = `range.${obj.name}`;
                    body[key] = obj.range.toString();
                }

                portalNames.push(obj.name);
            });

            body.portal = [...portalNames];
        }

        let json = body;

        return requestify.post(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === '0')
                    return body.data;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = FindAPI;