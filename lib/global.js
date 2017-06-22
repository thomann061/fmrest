class Global {

    constructor(field, value) {

        this.global = {};
        this.global[field] = value;
        return this;
    }

    toObj() {

        return this.global;
    }
}

module.exports = Global;