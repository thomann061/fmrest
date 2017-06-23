class Portal {

    constructor(name, offset = null, range = null) {

        this.name = name;
        this.offset = offset;
        this.range = range;
        return this;
    }

    toObj() {

        let obj = {};
        obj.name = this.name;
        obj.offset = this.offset;
        obj.range = this.range;
        return obj;
    }
}

module.exports = Portal;