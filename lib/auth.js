const requestify = require('requestify');

class Auth {

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

    getHost() {
        return this.host;
    }

    getLayout() {
        return this.layout;
    }

    getSolution() {
        return this.solution;
    }

    getOptions() {
        return this.options;
    }

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

module.exports = Auth;