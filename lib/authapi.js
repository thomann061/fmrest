const requestify = require('requestify');

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
     * @param {string} obj.solution - solution
     * @param {string} obj.layout - layout
     */
    constructor({ user, password, host, solution, layout }) {

        this.solution = solution;
        this.host = host;
        this.layout = layout;
        this.user = user;
        this.password = password;
        this.url = `${host}/fmi/rest/api/auth/${solution}`;
        this.token = null;
        this.data = {
            "user": this.user,
            "password": this.password,
            "layout": this.layout
        };
        this.options = { 
            "headers": {} 
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
     * Get the solution
     * @return {string} the solution
     */
    getSolution() {
        return this.solution;
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
     */
    login() {

        return requestify.post(this.url, this.data)
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                this.token = body.token;
                this.options.headers['FM-Data-Token'] = this.token;
                return body.token;
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Logout of Filemaker Server Data API
     * @return {Promise} Promise resolved with boolean
     */
    logout() {

        return requestify.delete(this.url, this.options)
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
}

module.exports = AuthAPI;