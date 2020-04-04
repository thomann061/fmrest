const rp = require('request-promise');

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

        let json = { "globalFields": 
                        { 
                            "db::global1": "aValue", 
                            "db::global2": "anotherValue"
                        }
                    }

        return rp({
            uri: this.url,
            method: 'PATCH',
            headers: {
                Authorization: this.Auth.tokenString,
                'Content-Type': 'application/json'
            },
            body: json,
            json: true
            })
            .then(body => {
                return body;
            })
            .catch(res => {
                return res.error;
            });
    }

}

module.exports = GlobalAPI;