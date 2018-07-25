const requestify = require('requestify');

/**
 * Class representing Globals
 */
class GlobalAPI {

    /**
     * Create a new Global API
     * @param {AuthAPI} Auth - Authorization to the API 
     */
    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/data/v1/databases/${this.Auth.getDatabase()}/globals`;
        this.globalObj = {};
    }

    /**
     * Execute or set the globals in filemaker
     * @param {Array} globals - An Array {@link Global} Objects
     * @return {Promise} - A promise that reolves to a boolean
     */
    exec(globals) {

        let body = {};
        body.globalFields = {};

        if(Array.isArray(globals)) {
            globals.map(el => {
                return Object.assign(body.globalFields, el.toObj());
            });   
        }

        let json = body;

        return requestify.request(this.url, {
            method: 'PATCH',
            headers: this.Auth.getOptions().headers,
            body: json
            })
            .then(res => {
                return JSON.parse(res.body);
            })
            .catch(err => {
                return JSON.parse(err.body);
            });
    }

}

module.exports = GlobalAPI;