class Request {

    constructor() {

        this.request = {};
        this.field = '';
        this.value = '';
        this.isOmitted = false;
        return this;
    }

    where(field) {
        
        this.field = field;
        return this;
    }

    is(value) {

        this.value = value;
        let obj = {};
        obj[this.field] = this.value;
        Object.assign(this.request, obj);
        return this;
    }

    omit() {

        this.isOmitted = true;
        return this;
    }

    toObj() {

        if(this.isOmitted)
            Object.assign(this.request, {omit: 'true'});
        return this.request;
    }
}

module.exports = Request;