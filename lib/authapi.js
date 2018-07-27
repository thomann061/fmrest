const requestify = require('requestify');
const base64 = require('base-64');

/**
 * Class representing Authorization
 */
class AuthAPI {

    /**
     * Create an Authorization object
     * @param {Object} obj - An object
     * @param {string} obj.user - username
     * @param {string} obj.password - password
     * @param {string} obj.host - host
     * @param {string} obj.database - database
     * @param {string} obj.layout - layout
     */
    constructor({ user, password, host, database, layout }) {

        this.database = database;
        this.host = host;
        this.layout = layout;
        this.user = user;
        this.password = password;
        this.url = `${host}/fmi/data/v1/databases/${database}/sessions`;
        this.token = null;
        this.options = { 
            'headers': {} 
        };
    }

    /**
     * Get the hostname
     * @return {string} the host
     */
    getHost() {
        return this.host;
    }

    /**
     * Get the layout
     * @return {string} the layout
     */
    getLayout() {
        return this.layout;
    }

    /**
     * Set the layout
     * @param {string} the layout
     */
    setLayout(layout) {
        this.layout = layout;
    }

    /**
     * Get the database
     * @return {string} the database
     */
    getDatabase() {
        return this.database;
    }

    /**
     * Get the options (headers)
     * @return {Object} the options
     */
    getOptions() {
        return this.options;
    }

    /**
     * Get the token
     * @return {string} the token
     */
    getToken() {
        return this.token;
    }

    /**
     * Login to Filemaker Server Data API
     * @return {Promise} Promise resolved with the token
     * Success Response:
     * {
     *   "response": {
     *     "token": 823c0f48bb80f2187bde6f3859dabd4dcf8ea43be420dfeadf34
     *   },
     *   "messages":[{"code":"0","message":"OK"}]
     * }
     */
    login() {

        // encode user and password for login
        let encodedUserAndPassword = base64.encode(`${this.user}:${this.password}`);

        return requestify.request(this.url, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encodedUserAndPassword}`,
                    'Content-Type': `application/json`                        
                },
                body: {} // requires an empty body
            })
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                let { messages } = body;
                let { code } = messages[0];
                let { response } = body;
                let { token } = response;
                if(code === '0') { // OK
                    this.token = token;
                    this.options.headers[`Authorization`] = `Bearer ${this.token}`;
                }
                return body;
            })
            .catch(err => {
                return JSON.parse(err.body);
            });
    }

    /**
     * Logout of Filemaker Server Data API
     * @return {Promise} Promise resolved with boolean
     * Success Response:
     * {
     *    "response":{},
     *    "messages":[{"code":"0","message":"OK"}]
     * }
     */
    logout() {

        return requestify.request(`${this.url}/${this.getToken()}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': `application/json`                        
                }
            })
            .then(res => {
                return JSON.parse(res.body);
            })
            .catch(err => {
                return JSON.parse(err.body);
            });
    }
}

module.exports = AuthAPI;