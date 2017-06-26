const requestify = require('requestify');

class RecordAPI {

    constructor(Auth) {

        this.Auth = Auth;
        this.url = `${this.Auth.getHost()}/fmi/rest/api/record/${this.Auth.getSolution()}/${this.Auth.getLayout()}`;
    }

    create(json) {

        return requestify.post(this.url, json, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                
                return body.recordId;
            })
            .catch(err => {
                console.log(err);
            });
    }

    delete(id) {

        return requestify.delete(`${this.url}/${id}`, this.Auth.getOptions())
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

    edit(id, json) {

        return requestify.put(`${this.url}/${id}`, json, this.Auth.getOptions())
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

    createPortalQueries(portals) {

        let names = portals.map(el => {
            let obj = el.toObj();
            return '"' + obj.name + '"';
        });
        let options = portals.map(el => {
            let obj = el.toObj();
            let options = '';
            if(obj.offset !== null)
                options += `&offset.${obj.name}=${obj.offset}`;
            if(obj.range !== null)
                options += `&range.${obj.name}=${obj.range}`; 
            return options;
        });

        let portalQueries = '[' + [...names] + ']' + [...options].join("");

        return portalQueries;
    }

    get(id, portals) {
        
        let url = '';

        if(Array.isArray(portals)) {

            let portalQueries = this.createPortalQueries(portals);
            url = `${this.url}/${id}?portal=${portalQueries}`;
        }   else // no portals
                url = `${this.url}/${id}`;

        return requestify.get(url, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return body.data;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAll({ range, offset, sorts, portals } = {}) {

        let url = '';
        let params = [];

        if(offset !== undefined)
            params.push(`offset=${offset}`);

        if(range !== undefined)
            params.push(`range=${range}`);

        if(Array.isArray(sorts)) {

            let s = sorts.map(el => el.toString());
            params.push(`sort=[${s}]`);
        }

        if(Array.isArray(portals)) {

            let portalQueries = this.createPortalQueries(portals);
            params.push(`portal=${portalQueries}`);
        }

        if(params.length > 0)
            url = `${this.url}?${params.join("&")}`;
        else
            url = `${this.url}`;
        
        return requestify.get(url, this.Auth.getOptions())
            .then(res => {
                return JSON.parse(res.body);
            })
            .then(body => {
                if(body.errorCode === "0")
                    return body.data;
                return undefined;
            })
            .catch(err => {
                console.log(err);
            });
    }

    
}

module.exports = RecordAPI;