const Config = require('./config.js');
const Requestify = require('requestify');

class Auth {

    login(solution, layout, user, password) {

        const url = Config.url + "/auth/" + solution;

        const data = {
            "user": user,
            "password": password,
            "layout": layout
        }

        return Requestify.post(url, data)
                         .then(res => {
                            return JSON.parse(res.body);
                         })
                         .then(body => {
                             return body.token;
                         })
                         .catch(err => {
                            console.log(err.body);
                         });
    }
}

module.exports = Auth;