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
        this.url = `${this.Auth.getHost()}/fmi/rest/api/global/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
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

        return requestify.put(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === '0')
                    return true;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = GlobalAPI;