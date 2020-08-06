const fetch = require('node-fetch');
const base64 = require('base-64');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

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
     * @param {string} obj.auth - authentication type
     * @param {string} obj.layout - layout
     */
    constructor({ auth, user, password, host, database, layout }) {

        this.database = database;
        this.host = host;
        this.layout = layout;
        this.auth = auth;
        this.user = user;
        this.password = password;
        this.url = `${host}/fmi/data/v1/databases/${database}/sessions`;
        this.token = null;
        this.tokenRefresh = null;
        this.tokenString = null;
        this.cognitoPool = 'us-west-2_NqkuZcXQY';
        this.cognitoClient = '4l9rvl4mv5es1eep1qe97cautn';
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
     * Get the token
     * @return {string} the token
     */
    getToken() {
        return this.token;
    }

    /**
     * Login to Filemaker Server Data API
     * @return {Promise} Promise resolved with the token
     * Success Response for Basic Auth:
     * {
     *   "response": {
     *     "token": 823c0f48bb80f2187bde6f3859dabd4dcf8ea43be420dfeadf34
     *   },
     *   "messages":[{"code":"0","message":"OK"}]
     * }
     *
     */
    login() {

        // Authorize with Filemaker ID servers
        if(this.auth === 'fmid') {
            const authenticationData = {
                Username : this.user,
                Password : this.password,
            };
            const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            const poolData = { UserPoolId : this.cognitoPool,
                ClientId : this.cognitoClient
            };
            const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            const userData = {
                Username : this.user,
                Pool : userPool
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            const congintoPromise =  new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        this.token = result.idToken.jwtToken;
                        this.tokenRefresh = result.refreshToken.token;
                        resolve(result);
                    },
                    onFailure: function(err) {
                        reject(err);
                    },
                });
            });

            return congintoPromise.then(result => {
                let token = result.idToken.jwtToken;
                return fetch(this.url, {
                    method: 'post',
                    headers: {
                        Authorization: `FMID ${token}`,
                        'Content-Type': `application/json`
                    },
                    body: {} // requires an empty body
                })
                .then(body => body.json())
                .then(body => {
                    let { messages } = body;
                    let { code } = messages[0];
                    let { response } = body;
                    let { token } = response;
                    if(code === '0') { // OK
                        this.token = token;
                        this.tokenString = `Bearer ${this.token}`;
                    }
                    return body;
                })
                .catch(res => {
                    return res.error;
                });
            }).catch(error => {
                return error;
            });
        }

        // Basic Authorization
        if(this.auth === '' || this.auth === 'basic')  {
            // encode user and password for login
            let encodedUserAndPassword = base64.encode(`${this.user}:${this.password}`);

            return fetch(this.url, {
                    method: 'post',
                    headers: {
                        'Authorization': (`Basic ${encodedUserAndPassword}`),
                        'Content-Type': 'application/json'
                    },
                    body: "{}" // requires an empty body
                })
                .then(body => body.json())
                .then(body => {
                    let { messages } = body;
                    let { code } = messages[0];
                    let { response } = body;
                    let { token } = response;
                    if(code === '0') { // OK
                        this.token = token;
                        this.tokenString = `Bearer ${this.token}`;
                    }
                    return body;
                })
                .catch(res => {
                    return res.error;
                });
        }
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

        return fetch((`${this.url}/${this.getToken()}`), {
                method: 'delete',
                headers: {
                    'Content-Type': `application/json`
                }
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

module.exports = AuthAPI;