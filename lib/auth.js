const requestify = require('requestify');

class Auth {

    login({ user, password, host, solution, layout }) {

        const url = host + "/fmi/rest/api/auth/" + solution;

        const data = {
            "user": user,
            "password": password,
            "layout": layout
        }

        return requestify.post(url, data)
                        .then(res => {
                            return JSON.parse(res.body);
                        })
                        .then(body => {
                            return body.token;
                        })
                        .catch(err => {
                            console.log(err);
                        });
    }
}

module.exports = Auth;