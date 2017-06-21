const requestify = require('requestify');

class Auth {

    constructor({ user, password, host, solution, layout }) {

        this.url = host + "/fmi/rest/api/auth/" + solution;
        this.token = null;
        this.data = {
            "user": user,
            "password": password,
            "layout": layout
        };
    }

    login() {

        return requestify.post(this.url, this.data)
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                this.token = body.token;
                return body.token;
            })
            .catch(err => {
                console.log(err);
            });
    }

    logout() {

        const headers = {      
            "headers": {
                "FM-Data-token": this.token
            }
        };

        return requestify.delete(this.url, headers, null)
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