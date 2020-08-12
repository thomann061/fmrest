const fetch = require('node-fetch');

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
        this.url = `${this.Auth.getHost()}/fmi/data/v1/databases/${this.Auth.getDatabase()}/layouts/${this.Auth.getLayout()}/_find`;
    }

    /**
     * Execute the find
     * @param {Object} obj - An object
     * @param {Array} obj.requests - An array of {@link Request} Objects
     * @param {Array} obj.sorts - An array of {@link Sort} Objects
     * @param {number} obj.offset - starting point of records to return
     * @param {number} obj.limit - how many records should be returned
     * @param {Array} obj.portals - An array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with multiple records
     *
     */
    exec({ requests, sorts, offset, limit, portals } = {}) {

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

        if(limit !== undefined)
            body.limit = limit.toString();

        if(Array.isArray(portals)) {
            let portalNames = [];

            portals.forEach(el => {
                let obj = el.toObj();

                if(obj.offset !== null) {
                    let key = `offset.${obj.name}`;
                    body[key] = obj.offset.toString();
                }

                if(obj.limit !== null) {
                    let key = `limit.${obj.name}`;
                    body[key] = obj.limit.toString();
                }

                portalNames.push(obj.name);
            });

            body.portal = [...portalNames];
        }

        let json = body;

        return fetch(this.url, {
                method: 'post',
                headers: {
                    Authorization: this.Auth.tokenString,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })
            .then(body => body.json())
            .then(body => {
                return body;
            })
            .catch(res => {
                return res.error;
            });
    }

}

module.exports = FindAPI;