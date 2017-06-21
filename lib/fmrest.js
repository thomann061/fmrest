const requestify = require('requestify');
const Auth = require('./auth.js');

class Fmrest {
    constructor({ user, password, host, solution, layout }) {

        this.user = user;
        this.password = password;
        this.host = host;
        this.solution = solution;
        this.layout = layout;
        this.Auth = new Auth();
    }

    login() {
        return this.Auth.login({ 
            user: this.user, 
            password: this.password, 
            host: this.host, 
            solution: this.solution, 
            layout: this.layout 
        });
    }
}

module.exports = Fmrest;