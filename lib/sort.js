/**
 * Class representing a Filemaker Sort
 */
class Sort {

    /**
     * Create a new Sort
     * @param {string} field - a field name from filemaker
     * @param {string} sort - a sort order (ascend, descend or value list name)
     * @return {Sort} - this object
     */
    constructor(field, order) {

        this.sort = {};
        this.sort.fieldName = field;
        this.sort.sortOrder = order;
        return this;
    }

    /**
     * Return the sort object
     * @return {Object} - an obj with fieldName and sortOrder keys
     */
    toObj() {

        return this.sort;
    }

    /**
     * Return a stringified sort object
     * @return {Object} - a stringified sort object
     */
    toString() {

        return JSON.stringify(this.sort);
    }
}

module.exports = Sort;