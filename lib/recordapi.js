const rp = require('request-promise');

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

        return rp({
                uri: this.url, 
                method: 'POST',
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

    /**
     * Delete a Record
     * @param {number} id - filemakers internal record id
     * @return {Promise} - A promise that resolves with a boolean
     */
    delete(id) {

        return rp({
                uri: `${this.url}/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: this.Auth.tokenString,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(res => {
                return res;
            })
            .catch(res => {
                return res.error;
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

        return rp({
                uri: `${this.url}/${id}`,
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

        return rp({
                uri: url,
                method: 'GET',
                headers: {
                    Authorization: this.Auth.tokenString,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(body => {
                return body;
            })
            .catch(res => {
                return res.error;
            });
    }

    /**
     * Get All Records
     * @param {Object} obj - An object
     * @param {Number} obj.offset - starting point of records to return
     * @param {Number} obj.limit - how many records should be returned
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
        
        return rp({
                uri: url,
                method: 'GET',
                headers: {
                    Authorization: this.Auth.tokenString,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(body => {
                return body;
            })
            .catch(res => {
                return res.error;
            });
    }

    /**
     * Upload a File To a Container Field
     * @param {string} file - a binary/plain text file
     * @param {string} recordId - which record to upload file to
     * @param {string} containerFieldName - the container fields name
     * @param {string} containerFieldRep - the container fields repitition
     * @return {Promise} - A promise that resolves with a res
     */
    uploadFile({ file, recordId, containerFieldName, containerFieldRep = 1 } = {}) {

        let url = `${this.url}/${recordId}/containers/${containerFieldName}/${containerFieldRep}`;

        return rp({
            uri: url,
            method: 'POST',
            headers: {
                Authorization: this.Auth.tokenString,
                'Content-Type': 'multipart/form-data'
            },
            formData: {
                upload: file
            },
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

module.exports = RecordAPI;