/**
 * Class representing a portal in filemaker
 */
class Portal {

    /**
     * Create a new Portal
     * @param {string} name - a portal's name from filemaker
     * @param {number} offset - starting point of records to return
     * @param {number} range - how many records should be returned
     * @return {Portal} - this Object
     */
    constructor(name, offset = null, range = null) {

        this.name = name;
        this.offset = offset;
        this.range = range;
        return this;
    }

    /**
     * Returns an object with name, offset, range
     * @return {Object} - an Object
     */
    toObj() {

        let obj = {};
        obj.name = this.name;
        obj.offset = this.offset;
        obj.range = this.range;
        return obj;
    }
}

module.exports = Portal;