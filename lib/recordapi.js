const requestify = require('requestify');

/**
 * Class representing a Record API
 */
class RecordAPI {

    /**
     * Create a new Record API
     * @param {AuthAPI} Auth - Authorization to the API 
     */
    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/record/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    /**
     * Create a Record
     * @param {Object} json - a json object with field-value pairs
     * @return {Promise} - A promise that resolves with a record id
     */
    create(json) {

        if(json === undefined)
            json = { "data": "{}" };
        else
            json = { "data": json };

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

    /**
     * Delete a Record
     * @param {number} id - filemakers internal record id
     * @return {Promise} - A promise that resolves with a boolean
     */
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

    /**
     * Edit a Record
     * @param {number} id - filemakers internal record id
     * @param {Object} json - a json object with field-value pairs
     * @param {number} modId - the last modification id
     * @return {Promise} - A promise that resolves with a record id
     */
    edit(id, json, modId) {

        if(json === undefined)
            json = { "data": "{}" };
        else {
            json = { "data": json };
            if(modId !== undefined)
            json.modId = modId;
        }

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

    /**
     * Helper function to help parse Portal objects
     * into a form-encoded string to be used in a GET request
     * @param {Array} portals - An Array of {@link Portal} Objects
     * @return {string} - form-encoded string 
     */
    createPortalQueries(portals) {

        let names = portals.map(el => {
            let obj = el.toObj();
            return '"' + obj.name + '"';
        });
        let options = portals.map(el => {
            let obj = el.toObj();
            let options = '';
            if(obj.offset !== null)
                options += `&offset.${obj.name}=${obj.offset}`;
            if(obj.range !== null)
                options += `&range.${obj.name}=${obj.range}`; 
            return options;
        });

        let portalQueries = '[' + [...names] + ']' + [...options].join("");

        return portalQueries;
    }

    /**
     * Get a Record
     * @param {number} id - filemakers internal record id
     * @param {Array} portals - An Array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with a record
     */
    get(id, portals) {
        
        let url = '';

        if(Array.isArray(portals)) {

            let portalQueries = this.createPortalQueries(portals);
            url = `${this.url}/${id}?portal=${portalQueries}`;
        }   else // no portals
                url = `${this.url}/${id}`;

        return requestify.get(url, this.Auth.getOptions())
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

    /**
     * Get All Records
     * @param {Object} obj - An object
     * @param {number} obj.offset - starting point of records to return
     * @param {number} obj.range - how many records should be returned
     * @param {Array} obj.sorts - An array of {@link Sort} Objects
     * @param {Array} obj.portals - An array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with multiple records 
     * 
     */
    getAll({ range, offset, sorts, portals } = {}) {

        let url = '';
        let params = [];

        if(offset !== undefined)
            params.push(`offset=${offset}`);

        if(range !== undefined)
            params.push(`range=${range}`);

        if(Array.isArray(sorts)) {

            let s = sorts.map(el => el.toString());
            params.push(`sort=[${s}]`);
        }

        if(Array.isArray(portals)) {

            let portalQueries = this.createPortalQueries(portals);
            params.push(`portal=${portalQueries}`);
        }

        if(params.length > 0)
            url = `${this.url}?${params.join("&")}`;
        else
            url = `${this.url}`;
        
        return requestify.get(url, this.Auth.getOptions())
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