/**
 * Represents a global field
 */
class Global {

    /**
     * Set a field, value pair
     * @param {string} field - a field name from filemaker
     * @param {string} value - the fields value
     * @return {Global} - this object
     */
    constructor(field, value) {

        this.global = {};
        this.global[field] = value;
        return this;
    }

    /**
     * Returns an object with field, value pair
     * @return {Object} - an Object
     */
    toObj() {

        return this.global;
    }
}

module.exports = Global;