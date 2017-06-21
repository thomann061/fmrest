const requestify = require('requestify');
const Auth = require('./auth.js');

class Fmrest {
    constructor({ user, password, host, solution, layout }) {

        this.Auth = new Auth({ user, password, host, solution, layout });
    }

    login() {
        return this.Auth.login();
    }

    logout() {
        return this.Auth.logout();
    }
}

module.exports = Fmrest;