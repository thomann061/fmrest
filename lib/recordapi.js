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
        this.url = `${this.Auth.getHost()}/fmi/data/v1/databases/${this.Auth.getDatabase()}/layouts/${this.Auth.getLayout()}/records`;
    }

    /**
     * Create a Record
     * @param {Object} json - a json object with field-value pairs
     * @return {Promise} - A promise that resolves with a res
     */
    create(json) {

        if(json === undefined)
            json = { 'fieldData': '{}' };
        else
            json = { 'fieldData': json };

        return requestify.post(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .catch(err => {
                return JSON.parse(err.body);
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
            .catch(err => {
                return JSON.parse(err.body);
            });
    }

    /**
     * Edit a Record
     * @param {number} id - filemakers internal record id
     * @param {Object} json - a json object with field-value pairs
     * @param {number} modId - the last modification id
     * @return {Promise} - A promise that resolves with a res
     */
    edit(id, json, modId) {

        if(json === undefined)
            json = { 'fieldData': '{}' };
        else {
            json = { 'fieldData': json };
            if(modId !== undefined)
                json.modId = modId;
        }

        return requestify.request(`${this.url}/${id}`, {
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

    /**
     * Helper function to help parse Portal objects
     * into a form-encoded string to be used in a GET request
     * @param {Array} portals - An Array of {@link Portal} Objects
     * @return {string} - form-encoded string 
     */
    createPortalQueries(portals) {

        let names = portals.map(el => {
            let obj = el.toObj();
            return `"${obj.name}"`;
        });
        
        let options = portals.map(el => {
            let obj = el.toObj();
            let options = '';
            if(obj.offset !== null)
                options += `&_offset.${obj.name}=${obj.offset}`;
            if(obj.limit !== null)
                options += `&_limit.${obj.name}=${obj.limit}`; 
            return options;
        });

        let portalQueries = `[${[...names]}]${[...options].join('')}`;

        return portalQueries;
    }

    /**
     * Get a Record
     * @param {number} id - filemakers internal record id
     * @param {Array} portals - An Array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with a res
     */
    get(id, portals) {
        
        let url = '';

        if(Array.isArray(portals)) {
            let portalQueries = this.createPortalQueries(portals);
            url = `${this.url}/${id}?portal=${portalQueries}`;
        } else // no portals
            url = `${this.url}/${id}`;

        return requestify.get(url, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .catch(err => {
                return JSON.parse(err.body);
            });
    }

    /**
     * Get All Records
     * @param {Object} obj - An object
     * @param {number} obj.offset - starting point of records to return
     * @param {number} obj.limit - how many records should be returned
     * @param {Array} obj.sorts - An array of {@link Sort} Objects
     * @param {Array} obj.portals - An array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with a res
     * 
     */
    getAll({ limit, offset, sorts, portals } = {}) {

        let url = '';
        let params = [];

        if(offset !== undefined)
            params.push(`_offset=${offset}`);

        if(limit !== undefined)
            params.push(`_limit=${limit}`);

        if(Array.isArray(sorts)) {

            let s = sorts.map(el => el.toString());
            params.push(`_sort=[${s}]`);
        }

        if(Array.isArray(portals)) {

            let portalQueries = this.createPortalQueries(portals);
            params.push(`portal=${portalQueries}`);
        }

        if(params.length > 0)
            url = `${this.url}?${params.join('&')}`;
        else
            url = `${this.url}`;
        
        return requestify.get(url, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .catch(err => {
                return JSON.parse(err.body);
            });
    }

    
}

module.exports = RecordAPI;